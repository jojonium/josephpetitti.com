/* (C) 2024, 2025 Joseph Petitti | https://josephpetitti.com/license.txt */

const home = {
  minZoom: 6,
  maxZoom: 12,
  lineWidthFrom: 8,
  lineWidthTo: 1.5
};

const doneIcon = L.icon({
  iconUrl: '/images/marker-icon-green.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const toDoIcon = L.icon({
  iconUrl: '/images/marker-icon-grey.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const doneIcon2 = L.icon({
  iconUrl: '/images/marker-icon-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const toDoIcon2 = L.icon({
  iconUrl: '/images/marker-icon-grey.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const hikingCS = {color: "#2c2"};

const paddlingCS = {color: "#66f"};

const adjustCircleStyle = (map, summitsGroup) => {
  function scale(value, inputMin, inputMax, outputFrom, outputTo) {
    return ((outputTo - outputFrom) * (value - inputMin) / (inputMax - inputMin)) + outputFrom;
  }

  const newWeight = scale(map.getZoom(), home.minZoom, home.maxZoom, home.lineWidthFrom, home.lineWidthTo);
  summitsGroup.eachLayer((layer) => {
    layer.setStyle({weight: newWeight});
  });
}

window.addEventListener("load", () => {
  const container = document.getElementById("map-container");
  if (!container) {
    console.error("Couldn't get map container div");
    return;
  }

  if (!L) {
    console.error("Couldn't find Leaflet, is it loaded?");
    return;
  }

  // Create figure to hold the map.
  const fig = document.createElement("figure");
  fig.classList.add("full-width");
  fig.style.margin = 0;
  const mapDiv = document.createElement("div");
  mapDiv.style.height = "500px";
  mapDiv.style.width = "100%";
  mapDiv.style.zIndex = "0";
  mapDiv.id = "mapDiv";
  mapDiv.innerHTML = '';
  fig.appendChild(mapDiv);
  container.appendChild(fig);

  const bounds = new L.LatLngBounds();
  const summits4kGroup = L.layerGroup();
  const summits52WavGroup = L.layerGroup();
  const hikingTracks = L.layerGroup();
  const paddlingTracks = L.layerGroup();

  fetch("/assets/hiking.json?v=27")
    .then(response => response.json())
    .then(data => {
      for (const {points, name} of data) {
        L.polyline(points, hikingCS)
          .bindTooltip(name)
          .on('mouseover', function () {
            this.setStyle({weight: 6, color: "blue"});
          }).on('mouseout', function () {
            this.setStyle({weight: 3, ...hikingCS});
          })
          .addTo(hikingTracks);
      }
    })
    .catch(error => {
      console.error('Error fetching hiking tracks: ', error);
    });

  fetch("/assets/paddling.json")
    .then(response => response.json())
    .then(data => {
      for (const {points, name} of data) {
        L.polyline(points, paddlingCS)
          .bindTooltip(name)
          .on('mouseover', function () {
            this.setStyle({weight: 6, color: "blue"});
          }).on('mouseout', function () {
            this.setStyle({weight: 3, ...paddlingCS});
          })
          .addTo(paddlingTracks);
      }
    })
    .catch(error => {
      console.error('Error fetching tracks: ', error);
    });

  const baseLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    minZoom: home.minZoom,
    maxZoom: home.maxZoom,
    attribution: '&copy; <a href="https://esri.com" target="_blank" rel="noopener noreferrer">Esri</a> and others'
  });

  for (const {name, lat, lng, done} of fourKFooters) {
    L.marker([lat, lng], {icon: done ? doneIcon : toDoIcon})
      .bindTooltip(name)
      .bindPopup(`<b>${name}</b>${done ? "<br>Completed" : ""}`)
      .addTo(summits4kGroup);
    bounds.extend(L.latLng(lat, lng));
  }

  for (const {name, lat, lng, done} of ftwav) {
    L.marker([lat, lng], {icon: done ? doneIcon2 : toDoIcon2})
      .bindTooltip(name)
      .bindPopup(`<b>${name}</b>${done ? "<br>Completed" : ""}`)
      .addTo(summits52WavGroup);
    bounds.extend(L.latLng(lat, lng));
  }

  const myMap = L.map("mapDiv", {
    layers: [baseLayer, summits4kGroup, hikingTracks, paddlingTracks]
  });
  myMap.attributionControl.setPrefix(
    '<a href="https://leafletjs.com" target="_blank" rel="noreferrer noopener" title="A JavaScript library for interactive maps">Leaflet</a>'
  );
  myMap.fitBounds(bounds);

  L.control.layers({"ESRI": baseLayer}, {
    "4,000-footers": summits4kGroup,
    "52 With a View": summits52WavGroup,
    "Hiking": hikingTracks,
    "Paddling": paddlingTracks
  }).addTo(myMap);

  const doneCount = fourKFooters.filter(({done}) => done).length;
  const figCaption = document.createElement("figcaption");
  figCaption.innerText = `${doneCount} of the Northeast ${fourKFooters.length} 4,000-footers completed`;
  fig.appendChild(figCaption);
});

/** @type {{name: string, lat: number, lng: number}[], done: boolean} */
const fourKFooters = [
  /* Maine */
  {name: "Mount Katahdin, Baxter Peak ME", lat: 45.9044, lng: -68.9213, done: false},
  {name: "Mount Katahdin, Hamlin Peak ME", lat: 45.9242, lng: -68.9276, done: false},
  {name: "Sugarloaf Mountain ME", lat: 45.0318, lng: -70.3131, done: false},
  {name: "Crocker Mountain ME", lat: 45.0471, lng: -70.3828, done: false},
  {name: "Old Speck Mountain ME", lat: 44.5709, lng: -70.9545, done: true},
  {name: "North Brother ME", lat: 45.9572, lng: -68.9854, done: false},
  {name: "Mount Bigelow, West Peak, ME", lat: 45.1469, lng: -70.2879, done: false},
  {name: "Saddleback Mountain ME", lat: 44.9365, lng: -70.5046, done: false},
  {name: "Mount Bigelow, Avery Peak, ME", lat: 45.1467, lng: -70.2753, done: false},
  {name: "Mount Abraham ME", lat: 44.9728, lng: -70.3264, done: false},
  {name: "South Crocker Mountain ME", lat: 45.0362, lng: -70.3765, done: false},
  {name: "Saddleback Mountain, The Horn, ME", lat: 44.9511, lng: -70.4875, done: false},
  {name: "Mount Redington ME", lat: 45.0251, lng: -70.3884, done: false},
  {name: "Spaulding Mountain ME", lat: 45.0029, lng: -70.3338, done: false},

  /* New Hampshire */
  {name: "Mount Washington NH", lat: 44.2705, lng: -71.3033, done: true},
  {name: "Mount Adams NH", lat: 44.3206, lng: -71.2916, done: true},
  {name: "Mount Jefferson NH", lat: 44.3042, lng: -71.3167, done: true},
  {name: "Mount Monroe NH", lat: 44.2551, lng: -71.3215, done: true},
  {name: "Mount Madison NH", lat: 44.3288, lng: -71.2767, done: true},
  {name: "Mount Lafayette NH", lat: 44.1607, lng: -71.6444, done: true},
  {name: "Mount Lincoln NH", lat: 44.1488, lng: -71.6446, done: true},
  {name: "South Twin NH", lat: 44.1876, lng: -71.5548, done: true},
  {name: "Carter Dome NH", lat: 44.2674, lng: -71.1791, done: true},
  {name: "Mount Moosilauke NH", lat: 44.0234, lng: -71.8315, done: true},
  {name: "Mount Eisenhower NH", lat: 44.2406, lng: -71.3504, done: true},
  {name: "North Twin NH", lat: 44.2026, lng: -71.5583, done: true},
  {name: "Mount Bond NH", lat: 44.1529, lng: -71.5312, done: true},
  {name: "Mount Carrigain NH", lat: 44.0936, lng: -71.4468, done: true},
  {name: "Middle Carter NH", lat: 44.3031, lng: -71.1676, done: true},
  {name: "West Bond NH", lat: 44.1548, lng: -71.5436, done: true},
  {name: "Mount Garfield NH", lat: 44.1872, lng: -71.6107, done: true},
  {name: "Mount Liberty NH", lat: 44.1158, lng: -71.6422, done: true},
  {name: "South Carter NH", lat: 44.2898, lng: -71.1762, done: true},
  {name: "Wildcat Mountain NH", lat: 44.259, lng: -71.2015, done: true},
  {name: "North Hancock NH", lat: 44.0838, lng: -71.4938, done: true},
  {name: "South Kinsman NH", lat: 44.123, lng: -71.7366, done: true},
  {name: "Mount Field NH", lat: 44.1965, lng: -71.4332, done: true},
  {name: "Mount Osceola NH", lat: 44.0016, lng: -71.5356, done: true},
  {name: "Mount Flume NH", lat: 44.1088, lng: -71.6281, done: true},
  {name: "South Hancock NH", lat: 44.0733, lng: -71.4869, done: true},
  {name: "Mount Pierce NH", lat: 44.2268, lng: -71.3657, done: true},
  {name: "North Kinsman NH", lat: 44.1334, lng: -71.7368, done: true},
  {name: "Mount Willey NH", lat: 44.1836, lng: -71.4208, done: true},
  {name: "Bondcliff NH", lat: 44.1406, lng: -71.5409, done: true},
  {name: "Mount Zealand NH", lat: 44.18, lng: -71.5216, done: true},
  {name: "North Tripyramid NH", lat: 43.9732, lng: -71.4428, done: true},
  {name: "Mount Cabot NH", lat: 44.5061, lng: -71.4145, done: true},
  {name: "East Osceola NH", lat: 44.0061, lng: -71.5206, done: true},
  {name: "Middle Tripyramid NH", lat: 43.9646, lng: -71.4401, done: true},
  {name: "Cannon Mountain NH", lat: 44.1567, lng: -71.6986, done: true},
  {name: "Mount Hale NH", lat: 44.2217, lng: -71.512, done: true},
  {name: "Mount Jackson NH", lat: 44.2032, lng: -71.3755, done: true},
  {name: "Mount Tom NH", lat: 44.2104, lng: -71.446, done: true},
  {name: "Wildcat D NH", lat: 44.2495, lng: -71.2233, done: true},
  {name: "Mount Moriah NH", lat: 44.3403, lng: -71.1316, done: true},
  {name: "Mount Passaconaway NH", lat: 43.9548, lng: -71.381, done: true},
  {name: "Owl's Head MountainNH", lat: 44.1443, lng: -71.6051, done: true},
  {name: "Galehead Mountain NH", lat: 44.185, lng: -71.5734, done: true},
  {name: "Mount Whiteface NH", lat: 43.934, lng: -71.4059, done: true},
  {name: "Mount Waumbek NH", lat: 44.4326, lng: -71.4171, done: true},
  {name: "Mount Isolation NH", lat: 44.2148, lng: -71.3093, done: true},
  {name: "Mount Tecumseh NH", lat: 43.9667, lng: -71.5565, done: true},

  /* New York */
  {name: "Mount Marcy NY", lat: 44.1128, lng: -73.9237, done: true},
  {name: "Algonquin Peak NY", lat: 44.1436, lng: -73.9867, done: false},
  {name: "Mount Haystack NY", lat: 44.1058, lng: -73.9004, done: false},
  {name: "Mount Skylight NY", lat: 44.0994, lng: -73.9312, done: true},
  {name: "Whiteface Mountain NY", lat: 44.3658, lng: -73.903, done: false},
  {name: "Dix Mountain NY", lat: 44.0823, lng: -73.7865, done: false},
  {name: "Gray Peak NY", lat: 44.1113, lng: -73.9361, done: true},
  {name: "Iroquois Peak NY", lat: 44.1368, lng: -73.9981, done: false},
  {name: "Basin Mountain NY", lat: 44.1212, lng: -73.8865, done: false},
  {name: "Gothics NY", lat: 44.1278, lng: -73.8574, done: false},
  {name: "Mount Colden NY", lat: 44.127, lng: -73.9595, done: true},
  {name: "Giant Mountain NY", lat: 44.1612, lng: -73.7202, done: false},
  {name: "Nippletop NY", lat: 44.0891, lng: -73.8163, done: true},
  {name: "Santanoni Peak NY", lat: 44.0825, lng: -74.1309, done: false},
  {name: "Mount Redfield NY", lat: 44.0953, lng: -73.9492, done: false},
  {name: "Wright Peak NY", lat: 44.1516, lng: -73.9795, done: false},
  {name: "Saddleback Mountain NY", lat: 44.1264, lng: -73.8751, done: false},
  {name: "Panther Peak NY", lat: 44.0984, lng: -74.1322, done: false},
  {name: "Table Top Mountain NY", lat: 44.1403, lng: -73.9161, done: false},
  {name: "Rocky Peak Ridge (RPR) NY", lat: 44.1542, lng: -73.7054, done: false},
  {name: "Macomb Mountain NY", lat: 44.0517, lng: -73.7802, done: false},
  {name: "Armstrong Mountain NY", lat: 44.1345, lng: -73.8498, done: false},
  {name: "Hough Peak NY", lat: 44.0695, lng: -73.7778, done: false},
  {name: "Seward Mountain NY", lat: 44.1598, lng: -74.1993, done: true},
  {name: "Mount Marshall NY", lat: 44.1276, lng: -74.0112, done: false},
  {name: "Allen Mountain NY", lat: 44.0708, lng: -73.9398, done: false},
  {name: "Big Slide Mountain NY", lat: 44.1822, lng: -73.8709, done: false},
  {name: "Esther Mountain NY", lat: 44.3872, lng: -73.8897, done: false},
  {name: "Upper Wolf Jaw Mountain NY", lat: 44.1404, lng: -73.8453, done: false},
  {name: "Lower Wolf Jaw Mountain NY", lat: 44.1481, lng: -73.8331, done: false},
  {name: "Street Mountain NY", lat: 44.1794, lng: -74.027, done: true},
  {name: "Phelps Mountain NY", lat: 44.1569, lng: -73.9215, done: false},
  {name: "Donaldson Mountain NY", lat: 44.154, lng: -74.2112, done: true},
  {name: "Seymour Mountain NY", lat: 44.1577, lng: -74.1726, done: true},
  {name: "Sawteeth NY", lat: 44.1145, lng: -73.8503, done: false},
  {name: "Cascade Mountain NY", lat: 44.2186, lng: -73.8602, done: true},
  {name: "South Dix NY", lat: 44.0599, lng: -73.7744, done: false},
  {name: "Porter Mountain NY", lat: 44.2124, lng: -73.8539, done: true},
  {name: "Mount Colvin NY", lat: 44.0943, lng: -73.8346, done: true},
  {name: "Mount Emmons NY", lat: 44.1437, lng: -74.214, done: true},
  {name: "Dial Mountain NY", lat: 44.1062, lng: -73.7966, done: true},
  {name: "Grace Peak NY", lat: 44.065, lng: -73.7572, done: false},
  {name: "Blake Peak NY", lat: 44.0813, lng: -73.845, done: true},
  {name: "Cliff Mountain NY", lat: 44.1033, lng: -73.9751, done: true},
  {name: "Nye Mountain NY", lat: 44.1872, lng: -74.0238, done: true},
  {name: "Couchsachraga Peak NY", lat: 44.0961, lng: -74.1607, done: false},
  {name: "Slide Mountain NY", lat: 41.9986, lng: -74.3864, done: false},
  {name: "Hunter Mountain NY", lat: 42.1779, lng: -74.2304, done: false},

  /* Vermont */
  {name: "Mount Mansfield VT", lat: 44.5437, lng: -72.8143, done: false},
  {name: "Killington Peak VT", lat: 43.6045, lng: -72.8202, done: false},
  {name: "Camels Hump VT", lat: 44.3196, lng: -72.8863, done: false},
  {name: "Mount Ellen VT", lat: 44.1604, lng: -72.9294, done: false},
  {name: "Mount Abraham VT", lat: 44.1204, lng: -72.9362, done: false}
];

/** @type {{name: string, lat: number, lng: number}[], done: boolean} */
const ftwav = [
  {name: "Sandwich (Dome) Mountain NH", lat: 43.9001, lng: -71.4981, done: true},
  {name: "Mount Starr King NH", lat: 44.4345, lng: -71.4329, done: true},
  {name: "Mount Webster NH", lat: 44.1946, lng: -71.3885, done: true},
  {name: "The Horn NH", lat: 44.5179, lng: -71.4002, done: false},
  {name: "Shelburne Moriah Mountain NH", lat: 44.3532, lng: -71.0988, done: true},
  {name: "Sugarloaf Mountain (Stratford) NH", lat: 44.7443, lng: -71.4678, done: false},
  {name: "North Baldface NH", lat: 44.2429, lng: -71.0869, done: true},
  {name: "Mount Success NH", lat: 44.4714, lng: -71.039, done: false},
  {name: "South Baldface NH", lat: 44.2309, lng: -71.0779, done: true},
  {name: "Mount Martha (Cherry Mountain) NH", lat: 44.3309, lng: -71.4992, done: true},
  {name: "Jennings Peak NH", lat: 43.9111, lng: -71.5107, done: true},
  {name: "Mount Chocorua NH", lat: 43.9543, lng: -71.2733, done: true},
  {name: "Stairs Mountain NH", lat: 44.1551, lng: -71.3184, done: true},
  {name: "Mount Avalon NH", lat: 44.2064, lng: -71.4268, done: true},
  {name: "Mount Resolution NH", lat: 44.1475, lng: -71.314, done: true},
  {name: "North Percy Peak NH", lat: 44.6631, lng: -71.4351, done: false},
  {name: "Mount Magalloway NH", lat: 45.0635, lng: -71.1624, done: false},
  {name: "Mount Tremont NH", lat: 44.0534, lng: -71.357, done: false},
  {name: "Three Sisters, Middle Sister NH", lat: 43.9648, lng: -71.2702, done: true},
  {name: "Mount Kearsarge North (Chatham) NH", lat: 44.1056, lng: -71.0942, done: false},
  {name: "Smarts Mountain NH", lat: 43.8255, lng: -72.0381, done: true},
  {name: "North Moat Mountain NH", lat: 44.0431, lng: -71.2146, done: false},
  {name: "Mount Monadnock NH", lat: 42.8615, lng: -72.1081, done: true},
  {name: "Imp Face NH", lat: 44.3211, lng: -71.1898, done: false},
  {name: "Mount Cardigan NH", lat: 43.6496, lng: -71.9144, done: true},
  {name: "Mount Crawford NH", lat: 44.1367, lng: -71.3324, done: true},
  {name: "Mount Paugus, South Peak NH", lat: 43.9463, lng: -71.328, done: false},
  {name: "North Doublehead NH", lat: 44.1677, lng: -71.1302, done: false},
  {name: "Eagle Crag NH", lat: 44.2538, lng: -71.072, done: false},
  {name: "Mount Parker NH", lat: 44.1234, lng: -71.2984, done: true},
  {name: "Mount Shaw NH", lat: 43.7438, lng: -71.2745, done: true},
  {name: "Rogers Ledge NH", lat: 44.5501, lng: -71.3619, done: false},
  {name: "South Doublehead NH", lat: 44.1608, lng: -71.1306, done: false},
  {name: "Eastman Mountain NH", lat: 44.2156, lng: -71.062, done: false},
  {name: "Mount Kearsarge (South) NH", lat: 43.3834, lng: -71.8571, done: true},
  {name: "Mount Cube (South Peak) NH", lat: 43.8857, lng: -72.0235, done: true},
  {name: "Stinson Mountain NH", lat: 43.8348, lng: -71.779, done: false},
  {name: "Mount Willard NH", lat: 44.204, lng: -71.4133, done: false},
  {name: "Black Mountain (Benton) NH", lat: 44.0745, lng: -71.9224, done: true},
  {name: "South Moat Mountain NH", lat: 44.0175, lng: -71.1935, done: true},
  {name: "Dickey Mountain NH", lat: 43.923, lng: -71.5787, done: false},
  {name: "Potash Mountain NH", lat: 43.9821, lng: -71.3909, done: false},
  {name: "Table Mountain NH", lat: 44.0318, lng: -71.2625, done: false},
  {name: "Blueberry Mountain (Benton) NH", lat: 44.0194, lng: -71.905, done: false},
  {name: "Mount Israel NH", lat: 43.8456, lng: -71.4723, done: false},
  {name: "Welch Mountain NH", lat: 43.919, lng: -71.576, done: false},
  {name: "Mount Roberts NH", lat: 43.7565, lng: -71.3258, done: true},
  {name: "Mount Hayes NH", lat: 44.4157, lng: -71.1603, done: false},
  {name: "Mount Pemigewasset NH", lat: 44.0978, lng: -71.699, done: true},
  {name: "Hedgehog Mountain (Albany) NH", lat: 43.9742, lng: -71.3672, done: false},
  {name: "Middle Sugarloaf NH", lat: 44.2517, lng: -71.5176, done: false},
  {name: "Pine Mountain (Gorham) NH", lat: 44.3659, lng: -71.2152, done: false},
  {name: "Mount Morgan NH", lat: 43.8039, lng: -71.5662, done: true},
  {name: "Mount Percival NH", lat: 43.8096, lng: -71.5571, done: true}
];

