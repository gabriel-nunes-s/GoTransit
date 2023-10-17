let startCoords;
let endCoords;
let map;
let userLocation;
let busMarker;
let directionsRenderer;

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

    directionsRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});
    var routesLink = document.getElementById("rotas-link");
    var modal = document.getElementById("myModal");

    routesLink.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        modal.style.display = "flex";
        modal.style.justifyContent = "flex-start";
        modal.style.alignItems = "center";

        routeForm.addEventListener("submit", async function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();

            if (directionsRenderer){
                directionsRenderer.setMap(null);
                directionsRenderer.setDirections({ routes: [] });
            }

            if (busMarker){
                busMarker.setMap(null);
                busMarker = null;
            }

            const directionsService = new google.maps.DirectionsService();

            let rawStartCoords = await geocodeLocation(document.getElementById("origem").value);
            let rawEndCoords = await geocodeLocation(document.getElementById("destino").value);

            const nearestStartPoint = await calculateNearestPoint(await getPoints(), rawStartCoords, 500);
            if (nearestStartPoint) {
                startCoords = new google.maps.LatLng(nearestStartPoint.latitude, nearestStartPoint.longitude);
            } else {
                window.alert("Não há pontos de ônibus dentro do raio de 500 metros da localização fornecida.");
                return;
            }

            const nearestEndPoint = await calculateNearestPoint(await getPoints(), rawEndCoords, 500);
            if (nearestEndPoint) {
                endCoords = new google.maps.LatLng(nearestEndPoint.latitude, nearestEndPoint.longitude);
            } else {
                window.alert("Não há pontos de ônibus dentro do raio de 500 metros da localização fornecida.");
                return;
            }

            directionsRenderer.setMap(map);

            await calculateAndDisplayRoute(directionsService, directionsRenderer, "True");

        });
    });

    document.getElementById("closeModal").addEventListener("click", function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        modal.style.display = "none";
    });

});

async function calculateNearestPoint(points, targetLocation, maxDistance) {
    let nearestPoint = null;
    nearestDistance = maxDistance;

    for (const point of points) {
        const distance = google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(point.latitude, point.longitude),
            targetLocation
        );

        if (distance < nearestDistance) {
            nearestPoint = point;
            nearestDistance = distance;
        }
    }
    return nearestPoint;
}


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
                    icon: "img/whitebus.png",
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

                    document.getElementById("go-to-point").addEventListener("click",  async function (event){
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(async function(position) {
                                const directionsService = new google.maps.DirectionsService();

                                if (directionsRenderer){
                                    directionsRenderer.setMap(null);
                                    directionsRenderer.setDirections({ routes: [] });
                                }

                                if (userLocation){
                                    console.log("salve")
                                    userLocation.setMap(null);
                                    userLocation = null;
                                }

                                directionsRenderer.setMap(map);

                                startCoords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                                endCoords = new google.maps.LatLng(point.latitude, point.longitude);

                                map.setCenter(startCoords);
                                userLocation = new google.maps.Marker({
                                    position: startCoords,
                                    map: map,
                                    title: "Sua Localização"
                                });

                                await calculateAndDisplayRoute(directionsService, directionsRenderer, "False");
                            }, function(error) {
                                console.error('Erro ao obter localização do usuário:', error);
                            });
                        } else {
                            console.error('Geolocalização não é suportada neste navegador.');
                        }
                    });
                });
                window.initMap = initMap;
            })
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

async function calculateAndDisplayRoute(directionsService, isBus) {
    try {
        const routeResult = await calculateRoute(directionsService);
        if (routeResult){
            const routeCoordinates = getRouteCoordinates(routeResult);
            if (isBus === "True") {
                await busMovement(routeCoordinates);
            }
            directionsRenderer.setDirections(routeResult);
        }else {
            window.alert("Não foi possível encontrar uma rota de ônibus para a localização desejada. Sentimos muito!");
        }
    } catch (error) {
        console.error("Erro ao calcular rota:", error);
        window.alert("Erro ao calcular rota.");
    }
}

async function calculateRoute(directionsService) {
    if (!startCoords || !endCoords){
        return null;
    }

    return new Promise((resolve, reject) => {
        directionsService.route({
            origin: startCoords,
            destination: endCoords,
            travelMode: 'DRIVING'
        }, (response, status) => {
            if (status === 'OK') {
                resolve(response);
            } else {
                reject(new Error('Não foi possível encontrar uma rota.'));
            }
        });
    });
}

function getRouteCoordinates(route) {
    const routeCoordinates = [];
    const legs = route.routes[0].legs;

    for (const leg of legs) {
        for (const step of leg.steps) {
            const path = step.path;
            
            for (const point of path) {
                routeCoordinates.push({
                    latitude: point.lat(),
                    longitude: point.lng()
                });
            }
        }
    }
    return routeCoordinates;
}

function busMovement(routeCoordinates) {
    let progress = 0;
    let previousTimestamp;

    function moveBus(timestamp) {
        if (!previousTimestamp) {
            previousTimestamp = timestamp;
        }

        const timeDiff = timestamp - previousTimestamp;
        const distance = (timeDiff / 1000) * 2; // Define uma velocidade de 4 metros por segundo

        progress += distance;

        if (progress >= routeCoordinates.length) {
            // Ônibus chegou ao destino, não faz nada
            return;
        }

        const newPosition = routeCoordinates[Math.floor(progress)];
        updateBusMarkerPosition(newPosition);

        previousTimestamp = timestamp;

        requestAnimationFrame(moveBus);
    }

    requestAnimationFrame(moveBus);
}

function updateBusMarkerPosition(position) {
    if (!busMarker) {
        busMarker = new google.maps.Marker({
            position: new google.maps.LatLng(position.latitude, position.longitude),
            map: map,
            icon: "img/bus.png",
            title: 'Ônibus em Movimento'
        });
    } else {
        busMarker.setPosition(new google.maps.LatLng(position.latitude, position.longitude));
    }
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
