
const xMiddleRatio = 0.568;
const yMiddleRatio = 0.417;

let locationgenericIcon = L.Icon.extend({
    options: {
        shadowUrl: '../assets/blank-pic.png',

        iconSize: [70, 70], // size of the icon
        shadowSize: [50, 64], // size of the shadow
       
        iconAnchor: [35, 35], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    }
});

const deselectedLocationIcon = new locationGenericIcon({ iconUrl: '../assets/plane2.webp' }),
    selectedLocationIcon = new locationGenericIcon({ iconUrl: '../assets/plane-selected.png' });

class Map {
    constructor() {
        //initialize map and its fields
        this.mymap = L.map('mapid').setView([51.505, -0.09], 2);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidW5kdmlrIiwiYSI6ImNrYWg3amZiNDBkcjcyeW81d3JibHRyaTgifQ.67Dwm_vni6DbznyF0bB1ZA', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'your.mapbox.access.token'
        }).addTo(this.mymap);
        this.mymap.on('click', this.onMapClick,this);
        this.polySegments = [];
        this.selected = null;
        this.selectedId = -1;
        this.locations = {};
        this.colors = [ 'black']
    }
}