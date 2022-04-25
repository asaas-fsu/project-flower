function getData() {
    var data = [];
    var arrayDiv = [];
    var numGroups = 0;
    
    data[0] = document.getElementsByName('input')[0].value;

    var numGroups = data[0];
    console.log(numGroups);

    for (var i = 0; i < numGroups; i++) {
        arrayDiv[i] = document.createElement('div');
        arrayDiv[i].id = 'block' + i;
        arrayDiv[i].style.backgroundColor = 'white';
        arrayDiv[i].className = 'block' + i;
        arrayDiv[i].textContent = "Group";
        document.body.appendChild(arrayDiv[i]);
    }
}
  
  var x = getData(); // When this is executed there will be no values in the input.