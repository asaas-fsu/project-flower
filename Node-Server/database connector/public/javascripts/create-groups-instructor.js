function getData(){
      var data = [];
      data[0] = document.getElementsByName('input')[0].value;
      console.log(data); // Check the console for the values for every click.
  return data;   
  }
  
  var x = getData(); // When this is executed there will be no values in the input.