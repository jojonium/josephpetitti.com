/* (C) 2019, 2024 Joseph Petitti | https://josephpetitti.com/license.txt */

if (L) {
  document.getElementById('mapDiv').innerHTML = '';
  const myMap = L.map('mapDiv').setView([22.282, 114.154], 16);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; ' +
        '<a href="https://www.openstreetmap.org/copyright" ' +
        'target="_blank" rel="noreferrer noopener">OpenStreetMap</a>',
      subdomains: ['a', 'b', 'c']
    }
  ).addTo(myMap);

  L.polygon([
    [22.28366, 114.15095],
    [22.27983, 114.15420],
    [22.28463, 114.15649]
  ]).addTo(myMap);

  myMap.attributionControl.setPrefix(
    '<a href="https://leafletjs.com" target="_blank" ' +
    'rel="noreferrer noopener" ' +
    'title="A JavaScript library for interactive maps">Leaflet</a>'
  );


} else {
  console.error("Failed to use Leaflet. Is it loaded properly?");
}

