function getPontos() {
    return fetch('http://localhost:8080/api/gotransit/ponto/')
        .then(response => response.json())
        .then(data => {
            return data.map(ponto => ({
                latitude: ponto.latitude,
                longitude: ponto.longitude
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
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
        center: { lat: -11.301846710502705, lng: -41.84689850909277 },
        zoom: 16,
        styles: [
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
            },
        ],
    });

    getPontos()
        .then(pontos => {
            pontos.forEach(ponto => {
                const beachMarker = new google.maps.Marker({
                    position: { lat: ponto.latitude, lng: ponto.longitude },
                    map,
                    icon: "img/ponto.png",
                    title: "salve"
                });
                window.initMap = initMap;

            })
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}


// function loadMapScenario() {
//     const map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
//         center: new Microsoft.Maps.Location(-11.301846710502705, -41.84689850909277),
//         mapTypeId: Microsoft.Maps.MapTypeId.road,
//         zoom: 15
//     });
//
//     getPontos()
//         .then(pontos => {
//             pontos.forEach(ponto => {
//                 const location = new Microsoft.Maps.Location(ponto.latitude, ponto.longitude);
//                 const pushpin = new Microsoft.Maps.Pushpin(location, {
//                     icon: './img/ponto.png'
//                 });
//                 map.entities.push(pushpin);
//             });
//         })
//         .catch(error => {
//             console.error('Erro:', error);
//         });
// }
