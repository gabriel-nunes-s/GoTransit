function loadMapScenario() {
    const map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        /* No need to set credentials if already passed in URL */
        center: new Microsoft.Maps.Location(-11.301846710502705, -41.84689850909277),
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        zoom: 16
    });
}
