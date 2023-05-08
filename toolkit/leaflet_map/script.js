(function () {
    'use strict';
    console.log('reading js');

    // Map 
    const map = L.map('map').setView([40.863428, -124], 10);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let age_then;
    // Forest
    const marker1 = L.marker([40.857345, -124.053789]).addTo(map);
    marker1.bindPopup('<b>Woozy in the forest</b><br><p>12/26/22</p><br><img src="images/woozy-forest.jpg">');
    marker1.addEventListener('click', function () {
        age_then = 269;
        console.log(age_then);
    });

    // River
    const marker2 = L.marker([40.857345, -123.992684]).addTo(map);
    marker2.bindPopup('<b>Woozy at the river</b><br><p>08/08/22</p><br><img src="images/woozy-river.jpg">');
    marker2.addEventListener('click', function () {
        age_then = 129;
        console.log(age_then);
    });

    // Beach 
    const marker3 = L.marker([41.001459, -124.116099]).addTo(map);
    marker3.bindPopup('<b>Woozy at the beach</b><br><p>08/06/22</p><br><img src="images/woozy-beach.jpg">');
    marker3.addEventListener('click', function () {
        age_then = 127;
        console.log(age_then);
    });

    const myChart = document.getElementById('myChart');
    new Chart(myChart, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'age in days',
                data: [403, age_then],
            }],
            labels: ['How old Woozy is today', 'How old Woozy was on this day'],
        }
    });
})();