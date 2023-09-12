function loadMapScenario() {
    const map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        /* No need to set credentials if already passed in URL */
        center: new Microsoft.Maps.Location(-11.301846710502705, -41.84689850909277),
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        zoom: 16
    });
    var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), {
        icon: './img/ponto.png',
        anchor: new Microsoft.Maps.Point(-11.141482228589659, -42.031757296523615)
    });
    map.entities.push(pushpin);
}
