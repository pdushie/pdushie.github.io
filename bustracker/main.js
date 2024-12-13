//create map in leaflet and tie it to the div called 'theMap'
const map = L.map('theMap').setView([44.650627, -63.597140], 14);
const busApiUrl = 'https://prog2700.onrender.com/hrmbuses';

// L.marker([44.650690, -63.596537]).addTo(map)
//     .bindPopup('This is a sample popup. You can put any html structure in this including extra bus data. You can also swap this icon out for a custom icon. A png file has been provided for you to use if you wish.')
//     .openPopup();


// Define bus icon
let busIcon = L.icon({
    iconUrl: 'bus.png',
    iconSize: [38,30]
});

let busMarkers = L.layerGroup().addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Talk to the API
async function getBusRoutes() {
    const rawData = await fetch(busApiUrl);
    const busData = await rawData.json();
    return busData;
}

// Fillter and convert bus data to GeoJSON format
async function convertToGeoJson() {
    const unfilteredData = await getBusRoutes();
    // Filter to get buses with route ID between 1 to 10
    let geoJSONData = (unfilteredData.entity.filter(item => parseInt(item.vehicle.trip.routeId) <= 10)
        .map(item => ({
            // GeoJSON format
            "type": "Feature",
            "properties": {
                "name": "Transit Buses",
                "uniqueId": item.id,
                "tripId": item.vehicle.trip.tripId,
                "startDate": item.vehicle.trip.startDate,
                "routeId": item.vehicle.trip.routeId,
                "speed": item.vehicle.position.speed,
                "bearing": item.vehicle.position.bearing,
                "vehicleId": item.vehicle.vehicle.id,
                "label": item.vehicle.vehicle.label,
            },
            "geometry": {
                "type": "Point",
                "coordinates": [item.vehicle.position.latitude, item.vehicle.position.longitude]
            }
        })));
        // Clear previous bus markers
        busMarkers.clearLayers();

        // Loop through GeoJSON formatted data and plot bus markers on the map
    geoJSONData.forEach(item => {
        L.marker(item.geometry.coordinates, {rotationAngle: item.properties.bearing, icon: busIcon})
            .bindPopup("Unique ID:" + item.properties.uniqueId + "<br>" +
                "Trip ID:" + item.properties.tripId + "<br>" +
                "Start Date:" + item.properties.startDate + "<br>" +
                "Route ID:" + item.properties.routeId + "<br>" +
                "Speed:" + item.properties.speed + "<br>" +
                "Bearing:" + item.properties.bearing + "<br>" +
                "Vehicle ID:" + item.properties.vehicleId + "<br>" +
                "Label:" + item.properties.label + "<br>").addTo(busMarkers);
    })
}

// Call the function every 10 seconds
setInterval(() => {
    convertToGeoJson();
}, 10000);
