var groupList = document.getElementsByClassName("group-list")[0];

setupPage();

function setupPage() {
    fetch("/getGroup", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(function(response) {
        console.log(response);
        groupList.innerHTML = "";
        for (var i = 0; i < response.length; i++) {
            var button = document.createElement("button")
            button.textContent = "Group " + response[i].id;
            button.setAttribute("onClick", "javascript: viewGroup(" + response[i].id + ");")
            groupList.appendChild(button);
        }
    })
    .catch(function(error) {
        console.log(error);
        alert("Error occured when fetching groups: Error message: " + error);
    });
}

function viewGroup(id) {
    console.log(id);
    groupList.innerHTML = "";
    try {
        fetch("/getGroup?" + new URLSearchParams({
            groupID : id
        }), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(function(response) {
            console.log(response);
            var exitButton = document.createElement("button");
            exitButton.textContent = "Exit";
            exitButton.setAttribute("onClick", "javascript: setupPage();");
            groupList.appendChild(exitButton);
        })
        .catch(function(error) {
            console.log(error);
            alert("Error loading group. Error message: " + error);
        });
    }
    catch (exception) {
        alert(exception);
        setupPage();
    }
}



// This retrieves the number from the input field and creates sections.
function getData() {
    var data = [];
    var arrayDiv = [];
    var numGroups = 0;
    
    data[0] = document.getElementsByName('input')[0].value;

    numGroups = data[0];
    console.log(numGroups);

    // for (var i = 0; i < numGroups; i++) {
    //     arrayDiv[i] = document.createElement('div');
    //     arrayDiv[i].id = 'block' + i;
    //     arrayDiv[i].style.backgroundColor = 'white';
    //     arrayDiv[i].className = 'block' + i;
    //     arrayDiv[i].textContent = "Group";
    //     groupList.appendChild(arrayDiv[i]);
    // }
}
  
  var x = getData(); // When this is executed there will be no values in the input.