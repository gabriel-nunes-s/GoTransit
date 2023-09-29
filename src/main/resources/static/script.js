var startLocation;
var endLocation;
let map;
var directionsRenderer

const mapStyle = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        icon: null,
        stylers: [{ color: "#d59563" }, {visibility: "on"}],
    },
    {
        featureType: "poi",
        elementType: "labels.icon",
        stylers: [{ color: "#d59563" }, {visibility: "off"}],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f"}, {visibility: "off"}],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
    },
    {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
    }];

document.addEventListener('DOMContentLoaded', function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    var routesLink = document.getElementById("rotas-link");
    var modal = document.getElementById("myModal");

    routesLink.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        modal.style.display = "block";

        routeForm.addEventListener("submit", async function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();

            if (directionsRenderer){
                directionsRenderer.setMap(null);
            }

            const directionsService = new google.maps.DirectionsService();
            directionsRenderer = new google.maps.DirectionsRenderer();


            startLocation = document.getElementById("origem").value;
            endLocation = document.getElementById("destino").value;

            directionsRenderer.setMap(map);

            await calculateAndDisplayRoute(directionsService, directionsRenderer);

        });
    });

    document.getElementById("closeModal").addEventListener("click", function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        modal.style.display = "none";
    });

});

function getPoints() {
    return fetch('http://localhost:8080/api/gotransit/ponto/')
        .then(response => response.json())
        .then(data => {
            return data.map(point => ({
                latitude: point.latitude,
                longitude: point.longitude,
                nome: point.nome,
                onibus: point.onibus,
                horarioOnibus: point.horarioOnibus,
            }));
        })
        .catch(error => {
            console.error('Erro:', error);
            throw error;
        });
}

async function initMap() {
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const irece = new google.maps.LatLng(-11.301846710502705, -41.84689850909277);
    const mapOptions = {
        center: irece,
        zoom: 16,
        styles: mapStyle,
        mapTypeControl: false
    };

    map = new Map(document.getElementById("map"), mapOptions);

    getPoints()
        .then(points => {
            points.forEach(point => {
                const pointOptions = {
                    position: { lat: point.latitude, lng: point.longitude },
                    map,
                    icon: "img/whitepin.png",
                    title: point.nome
                };
                const beachMarker = new google.maps.Marker(pointOptions);

                beachMarker.addListener("click", () => {
                    const div = document.querySelector("div[class*='informacoes']");
                    div.style.display = "block";

                    document.getElementById("nome-do-ponto").innerText = point.nome;
                    if (point.horarioOnibus && point.onibus) {
                        const time = point.horarioOnibus.split(",");
                        const timeFirstBus = time[0];
                        const timeSecondBus = time[1];

                        const buses = point.onibus.split(",");
                        const firstBus = buses[0];
                        const secondBus = buses[1];


                        document.getElementById("horario-primeiro-onibus").innerText = timeFirstBus || "N/A";
                        document.getElementById("primeiro-onibus").innerText = firstBus || "N/A";

                        document.getElementById("horario-segundo-onibus").innerText = timeSecondBus || "N/A";
                        document.getElementById("segundo-onibus").innerText = secondBus || "N/A";
                    } else {
                        document.getElementById("horario-primeiro-onibus").innerText = "N/A";
                        document.getElementById("primeiro-onibus").innerText = "N/A";

                        document.getElementById("horario-segundo-onibus").innerText = "N/A";
                        document.getElementById("segundo-onibus").innerText = "N/A";
                    }

                    document.getElementById("fechar-informacoes").addEventListener("click", function() {
                        div.style.display ="none";
                    });
                });

                window.initMap = initMap;

            })
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

async function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    let startCoords = await geocodeLocation(startLocation);
    let endCoords = await geocodeLocation(endLocation);

    // Encontrar pontos de ônibus próximos ao destino
    let nearbyBusStops = await getNearbyBusStops(endCoords);

    if (nearbyBusStops.length > 0) {
        // Se houver pontos de ônibus próximos, mostrar a rota até o primeiro ponto de ônibus encontrado
        const nearestBusStop = nearbyBusStops[0];
        const nearestBusStopCoords = new google.maps.LatLng(nearestBusStop.latitude, nearestBusStop.longitude);
        const route = await directionsService.route({
            origin: startCoords,
            destination: nearestBusStopCoords,
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.METRIC
        });

        directionsRenderer.setDirections(route);
    } else {
        // Se não houver pontos de ônibus próximos, encontrar a rota até o ponto de ônibus mais próximo
        const nearestBusStop = findNearestBusStop(endCoords);

        if (nearestBusStop) {
            const nearestBusStopCoords = new google.maps.LatLng(nearestBusStop.latitude, nearestBusStop.longitude);
            const route = await directionsService.route({
                origin: startCoords,
                destination: nearestBusStopCoords,
                travelMode: 'DRIVING',
                unitSystem: google.maps.UnitSystem.METRIC
            });

            directionsRenderer.setDirections(route);
        } else {
            // Se não houver pontos de ônibus próximos, mostrar a rota direta até o destino
           window.alert("Não foi possível encontrar uma rota de ônibus para a localização desejada. Sentimos muito!");
        }
    }
}

function findNearestBusStop(destination) {
    // Encontrar o ponto de ônibus mais próximo do destino
    let nearestBusStop = null;
    let nearestDistance = Infinity;

    getPoints().then(points => {points.forEach(point => {
        const distance = google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(point.latitude, point.longitude),
            destination
        );
        if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestBusStop = point;
        }
    })});
    return nearestBusStop;
}

function geocodeLocation(locationName) {
    return new Promise((resolve, reject) => {
        if (typeof locationName !== 'string' || locationName.trim() === '') {
            reject(new Error('Localização inválida.'));
        } else {
            var geocoder = new google.maps.Geocoder();

            geocoder.geocode({'address': locationName}, function (results, status) {
                if (status === 'OK' && results[0]) {
                    var location = results[0].geometry.location;
                    resolve(location);
                } else {
                    window.alert('Não foi possível encontrar as coordenadas para: ' + locationName +
                        '\nDica: Adicione o nome da cidade');
                    reject(new Error('Não foi possível encontrar as coordenadas.'));
                }
            });
        }
    });
}

async function getNearbyBusStops(endCoords) {
    const points = await getPoints();
    const nearbyBusStops = [];

    points.forEach(point => {
        const distance = google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(point.latitude, point.longitude),
            endCoords
        );

        if (distance < 500) {
            nearbyBusStops.push(point);
        }
    });

    return nearbyBusStops;
}
