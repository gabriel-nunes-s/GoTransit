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

function getPontos() {
    return fetch('http://localhost:8080/api/gotransit/ponto/')
        .then(response => response.json())
        .then(data => {
            return data.map(ponto => ({
                latitude: ponto.latitude,
                longitude: ponto.longitude,
                nome: ponto.nome,
                onibus: ponto.onibus,
                horarioOnibus: ponto.horarioOnibus,
            }));
        })
        .catch(error => {
            console.error('Erro:', error);
            throw error;
        });
}

let map;

async function initMap() {
    //@ts-ignore
    const directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    const { Map } = await google.maps.importLibrary("maps");
    const irece = new google.maps.LatLng(-11.301846710502705, -41.84689850909277);
    const mapOptions = {
        center: irece,
        zoom: 16,
        styles: mapStyle,
        mapTypeControl: false
    };

    map = new Map(document.getElementById("map"), mapOptions);
    directionsRenderer.setMap(map);

    const onChangeHandler = function () {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    };

    document.getElementById("start").addEventListener("change", onChangeHandler);
    document.getElementById("end").addEventListener("change", onChangeHandler);

    getPontos()
        .then(pontos => {
            pontos.forEach(ponto => {
                const pointOptions = {
                    position: { lat: ponto.latitude, lng: ponto.longitude },
                    map,
                    icon: "img/whitepin.png",
                    title: ponto.nome
                };
                const beachMarker = new google.maps.Marker(pointOptions);

                beachMarker.addListener("click", () => {
                    const div = document.querySelector("div[class*='informacoes']");
                    div.style.display = "block";

                    //console.log(ponto.horario_onibus);

                    document.getElementById("nome-do-ponto").innerText = ponto.nome;
                    if (ponto.horarioOnibus && ponto.onibus) {
                        const horarios = ponto.horarioOnibus.split(",");
                        const horarioPrimeiroOnibus = horarios[0];
                        const horarioSegundoOnibus = horarios[1];

                        const onibusus = ponto.onibus.split(",");
                        const primeiroOnibus = onibusus[0];
                        const segundoOnibus = onibusus[1];


                        document.getElementById("horario-primeiro-onibus").innerText = horarioPrimeiroOnibus || "N/A";
                        document.getElementById("primeiro-onibus").innerText = primeiroOnibus || "N/A";

                        document.getElementById("horario-segundo-onibus").innerText = horarioSegundoOnibus || "N/A";
                        document.getElementById("segundo-onibus").innerText = segundoOnibus || "N/A";
                    } else {
                        document.getElementById("horario-primeiro-onibus").innerText = "N/A";
                        document.getElementById("primeiro-onibus").innerText = "N/A";

                        document.getElementById("horario-segundo-onibus").innerText = "N/A";
                        document.getElementById("segundo-onibus").innerText = "N/A";
                    }

                    // document.getElementById("horario-primeiro-onibus").innerText = horarioPrimeiroOnibus;
                    // document.getElementById("horario-segundo-onibus").innerText = horarioSegundoOnibus;
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
    const startLocation = document.getElementById("start").value;
    const endLocation = document.getElementById("end").value;
    let startCoords;
    let endCoords;

    try {
        startCoords = await geocodeLocation(startLocation);
        endCoords = await geocodeLocation(endLocation);

        if (startCoords && endCoords) {
            const route = await directionsService.route({
                origin: startCoords,
                destination: endCoords,
                travelMode: 'DRIVING',
                unitSystem: google.maps.UnitSystem.METRIC
            });

            directionsRenderer.setDirections(route);
        } else {
            window.alert("Não foi possível encontrar as coordenadas para os locais fornecidos.");
        }

    } catch (e) {
        window.alert("Ocorreu um erro ao calcular a rota: " + e.message);
    }
}

function geocodeLocation(locationName) {
    return new Promise((resolve, reject) => {
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ 'address': locationName }, function(results, status) {
            if (status === 'OK' && results[0]) {
                var location = results[0].geometry.location;
                resolve(location);
            } else {
                console.log('Não foi possível encontrar as coordenadas para: ' + locationName);
                reject(new Error('Não foi possível encontrar as coordenadas.'));
            }
        });
    });
}


