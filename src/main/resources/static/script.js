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

function loadMapScenario() {
    const map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        center: new Microsoft.Maps.Location(-11.301846710502705, -41.84689850909277),
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        zoom: 15
    });

    getPontos()
        .then(pontos => {
            pontos.forEach(ponto => {
                const location = new Microsoft.Maps.Location(ponto.latitude, ponto.longitude);
                const pushpin = new Microsoft.Maps.Pushpin(location, {
                    icon: './img/ponto.png'
                });
                map.entities.push(pushpin);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}
