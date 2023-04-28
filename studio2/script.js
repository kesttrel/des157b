(function() {
    'use strict'

    let globalData;
    async function getData() {
        const names = await fetch('data/data.json');
        const data = await names.json();
        console.log(data);
        globalData = data;
        document.querySelector('#picker').innerHTML = createSelectionList(data);
    }
    function createSelectionList(data){
        let html = '<option>What is my name?</option>';
        const dataPoints = Object.keys(data);
        console.log(dataPoints);
        dataPoints.forEach(function(eachPoint){
            html += `<option value="${eachPoint}">${data[eachPoint].time} a.m.</option>`;
        })
        return html;
    }
    document.querySelector('#picker').addEventListener('change', function(){
        const newValue = this.value;
        updateInterface(newValue, globalData);
    });
    function updateInterface(value, jsonData) {
        // let time = document.querySelector('time');
        let time = '';
        time += `At ${jsonData[value].time} a.m. my mom called me ${jsonData[value].name}`;
        time += '';
        document.querySelector('#time').innerHTML = time;
        let name = '';
        name += `${jsonData[value].name}`;
        name += '';
        document.querySelector('#name').innerHTML = name;
        // let name = document.querySelector('#name');
        // name = '<p>';
        // name += `${jsonData[value].name}`;
        // name += '</p>';
    }
    getData();
})();