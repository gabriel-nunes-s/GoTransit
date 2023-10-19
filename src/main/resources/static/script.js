let startCoords;
let endCoords;
let map;
let userLocation;
let busMarker;
let busMarkerFlag = true; // true = coloca o ponto na tela; false = não cria um novo ponto.
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

function restartRenderer() {
    if (directionsRenderer) {
        directionsRenderer.setMap(null);
        directionsRenderer.setDirections({ routes: [] });
    }
}

function restartBusMarker(markerFlag){
    if (busMarker){
        busMarker.setMap(null);
        busMarkerFlag = markerFlag;
        busMarker = null;
    }
}

function restartUserLocation(){
    if (userLocation){
        userLocation.setMap(null);
        userLocation = null;
    }
}

document.addEventListener('DOMContentLoaded', function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    directionsRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});
    var routesLink = document.getElementById("rotas-link");
    var modal = document.getElementById("myModal");
    let cleanButton = document.getElementById("clean-routes");

    cleanButton.addEventListener("click", function() {
        console.log("opa");
        restartRenderer();
        restartBusMarker(false);
        restartUserLocation();
    });

    routesLink.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        modal.style.display = "flex";
        modal.style.justifyContent = "flex-start";
        modal.style.alignItems = "center";

        routeForm.addEventListener("submit", async function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();

            restartRenderer();
            restartBusMarker(true);

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

            await calculateAndDisplayRoute(directionsService, "True");
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
                id: point.id,
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
                    createBusList(point);

                    document.getElementById("fechar-informacoes").addEventListener("click", function() {
                        div.style.display ="none";

                    });

                    document.getElementById("go-to-point").addEventListener("click",  async function (){
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(async function(position) {
                                const directionsService = new google.maps.DirectionsService();

                                restartRenderer();
                                restartBusMarker(false);
                                restartUserLocation();

                                directionsRenderer.setMap(map);

                                startCoords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                                endCoords = new google.maps.LatLng(point.latitude, point.longitude);

                                map.setCenter(startCoords);
                                userLocation = new google.maps.Marker({
                                    position: startCoords,
                                    map: map,
                                    title: "Sua Localização"
                                });

                                await calculateAndDisplayRoute(directionsService, "False");
                            }, function(error) {
                                console.error('Erro ao obter localização do usuário:', error);
                            });
                        } else {
                            console.error('Geolocalização não é suportada neste navegador.');
                        }
                    });

                    document.getElementsByClassName('onibus-selecionado').addEventListener('click', async function () {
                        const busId = busButton.getAttribute('data-bus-id');
                        await showBusRoute(busId);
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
        restartBusMarker(false);
        restartRenderer();

        const routeResult = await calculateRoute(directionsService);
        directionsRenderer.setMap(map);

        if (routeResult){
            const routeCoordinates = getRouteCoordinates(routeResult);

            if (isBus === "True") {
                restartUserLocation();
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
    busMarkerFlag = true;

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
    if (!busMarker && busMarkerFlag) {
        busMarker = new google.maps.Marker({
            position: new google.maps.LatLng(position.latitude, position.longitude),
            map: map,
            icon: "img/bus.png",
            title: 'Ônibus em Movimento'
        });
    } else if (busMarkerFlag) {
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

async function showBusRoute(busId) {
    // Obtenha os dados da rota do ônibus com base no ID (ou outro identificador)
    const busRouteData = await getBusRouteData(busId);

    if (busRouteData) {
        // Limpe qualquer rota anterior
        restartRenderer();
        restartBusMarker(false);

        const waypoints = busRouteData.map(coord => ({
            location: coord,
            stopover: true
        }));

        // Crie uma solicitação de rota usando a API Directions
        const request = {
            origin: waypoints[0].location,
            destination: waypoints[waypoints.length - 1].location,
            waypoints: waypoints.slice(1, waypoints.length - 1),
            travelMode: 'DRIVING', // Use o modo de viagem apropriado
        };

        // Crie um objeto DirectionsService e faça a solicitação
        const directionsService = new google.maps.DirectionsService();
        directionsRenderer.setMap(map);
        directionsService.route(request, function (result, status) {
            if (status === 'OK') {
                restartUserLocation();
                directionsRenderer.setDirections(result);
            } else {
                console.error('Erro ao obter a rota do ônibus:', status);
            }
        });

        // Centralize o mapa na rota
        const bounds = new google.maps.LatLngBounds();
        for (const coord of busRouteData) {
            bounds.extend(coord);
        }
        map.fitBounds(bounds);
    }
}

function createBusList(point){
    // Se há dados de ônibus, crie a lista de botões
    if (point) {
        const busList = document.getElementById('informacoesPonto');

        // Limpar qualquer conteúdo anterior na lista
        busList.innerHTML = '';

        // Criando uma lista não ordenada (ul)
        const ul = document.createElement('ul');

        // Criando botões para cada ônibus e adicione-os à lista
        const li = document.createElement('li');
        const busButton = document.createElement('button');
        const p = document.createElement('p');
        const img = document.createElement('img');
        busButton.textContent = point.onibus;
        busButton.setAttribute('data-bus-id', point.onibus); 
        busButton.classList.add('bus-button');

        p.textContent = point.horarioOnibus;
        p.classList.add('horario-onibus');
        img.src = './img/green-bus-icon.svg';
        img.classList.add('onibus-img');
        li.classList.add('onibus-selecionado');

        // Adicione um ouvinte de evento ao botão para mostrar a rota quando clicado
        li.addEventListener('click', function() {
            showBusRoute(point.onibus);
        });

        li.appendChild(img);
        li.appendChild(busButton);
        li.appendChild(p);
        ul.appendChild(li);
        
        ul.style.display = "flex";

        busList.appendChild(ul); // Adicione a lista à sua página
    }
}

async function getBusRouteData(busId) {
    const coordinates = [];

    const points = await getPoints();

    points.forEach(point => {
        if (point.onibus === busId) {
            coordinates.push(new google.maps.LatLng(point.latitude, point.longitude));
        }
    });

    return coordinates;
}
