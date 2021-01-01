/*********************************************************************
 * Creates and returns a map.
 * @param {*} mapDivId The div id of the map.
 */
function setUp(mapDivId) {
    var mymap = L.map(mapDivId).setView([8, 0], 2)
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW1pcmdoMTEiLCJhIjoiY2thbDcwcnd5MG41YzMxbHNxZ2piaXVibCJ9.6oBTzgsH-91i8n8NKS3YaA', {
        maxZoom: 18,
        minZoom: 1,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYW1pcmdoMTEiLCJhIjoiY2thbDcwcnd5MG41YzMxbHNxZ2piaXVibCJ9.6oBTzgsH-91i8n8NKS3YaA'
    }).addTo(mymap)
    return mymap
}

/**
 * Returns an icon for markers.
 * @param {*} url The image url.
 * @param {*} size The size of the icon.
 * @param {*} anchor The point of the icon which will correspond to marker's location.
 * @param {*} popUpAnchor The point from which the popup should open relative to the iconAnchor.
 */
function createIcon(url, size = [40, 40] , anchor = [20, 40], popUpAnchor = [-3, -76]) {
    return L.icon({
        iconUrl: url,
        iconSize: size,
        iconAnchor: anchor,
        popupAnchor: popUpAnchor 
    })
}

/**
 * Creates and returns a marker to the map.
 * @param {*} point The point on the map [latitude, longitude].
 * @param {*} mymap The map.
 * @param {*} iconImg The icon of the marker.
 * @param {*} callback On click callback.
 */
function addMarker(point, mymap, iconImg = -1, callback = function(){}) {
    if (iconImg == -1)
        return L.marker(point).addTo(mymap).on('click', callback)
    return L.marker(point, { icon: iconImg }).addTo(mymap).on('click', callback)
}

/**
 * Changes the size and the anchor of marker.
 * @param {*} marker The marker.
 * @param {*} newSize The new size.
 * @param {*} newAnchor The new anchor.
 */
function changeMarkerSize(marker, newSize, newAnchor) {
    var icon = marker.options.icon
    icon.options.iconSize = newSize
    icon.options.iconAnchor = newAnchor
    marker.setIcon(icon)
}

/**
 * Deletes the marker from the map.
 * @param {*} marker The marker.
 * @param {*} mymap The map.
 */
function deleteMarker(marker, mymap) {
    mymap.removeLayer(marker)
}


// Creates a map
var map = setUp('mapid')

// Creates an icon
var icon = createIcon("https://icons-for-free.com/iconfiles/png/512/marker-131994967950423839.png")

// Adds a marker
var m = addMarker([0,0], map, icon, () => changeMarkerSize(m, [80, 80], [40, 80]))

// changes the marker size
// changeMarkerSize(m, [80, 80], [40, 80])

// delete sthe marker
// deleteMarker(m, map)
