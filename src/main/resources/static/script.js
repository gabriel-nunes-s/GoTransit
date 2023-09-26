var mapStyle = [
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
                nome: ponto.nome
            }));
        })
        .catch(error => {
            console.error('Erro:', error);
            throw error; // Rejeita a Promise em caso de erro
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


    getPontos()
        .then(pontos => {
            pontos.forEach(ponto => {
                const pointOptions = {
                    position: { lat: ponto.latitude, lng: ponto.longitude },
                    map,
                    icon: "img/ponto.png",
                    title: ponto.nome
                };
                console.log(ponto.nome);

                const beachMarker = new google.maps.Marker(pointOptions);
                window.initMap = initMap;

            })
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

// function initMap() {
//     var directionsService = new google.maps.DirectionsService();
//     var directionsRenderer = new google.maps.DirectionsRenderer();
//     var chicago = new google.maps.LatLng(41.850033, -87.6500523);
//     var mapOptions = {
//         zoom:7,
//         center: chicago
//     }
//     var map = new google.maps.Map(document.getElementById('map'), mapOptions);
//     directionsRenderer.setMap(map);
// }
//
// function calcRoute() {
//     var start = document.getElementById('start').value;
//     var end = document.getElementById('end').value;
//     var request = {
//         origin: start,
//         destination: end,
//         travelMode: 'DRIVING'
//     };
//     directionsService.route(request, function(result, status) {
//         if (status == 'OK') {
//             directionsRenderer.setDirections(result);
//         }
//     });
// }

// {
//     origin: 'Chicago, IL',
//         destination: 'Los Angeles, CA',
//     waypoints: [
//     {
//         location: 'Joplin, MO',
//         stopover: false
//     },{
//         location: 'Oklahoma City, OK',
//         stopover: true
//     }],
//     provideRouteAlternatives: false,
//     travelMode: 'DRIVING',
//     drivingOptions: {
//     departureTime: new Date(/* now, or future date */),
//         trafficModel: 'pessimistic'
// },
// unitSystem: google.maps.UnitSystem.IMPERIAL
// }
