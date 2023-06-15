AOS.init();
(function() {
    'use strict'
    // Map 
    const map = L.map('map').setView([40.863428, -124], 10);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    
    const marker1 = L.marker([40.857345, -124.053789]).addTo(map);
    marker1.bindPopup('<b>Woozy in the forest</b><br><p>12/26/22</p><br><img src="images/woozy-forest.jpg">');
});