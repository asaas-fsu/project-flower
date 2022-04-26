var data;

fetch("/students", {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(function(response) {
    console.log('got data: ', response);
})
.catch(function(error) {
    console.log(error);
});





// Check for instructor cookie before returning grade data