var mainSection = document.getElementsByClassName("mainsection")[0];
var completedPolls;

mainSection.innerHTML = "";
setupPage();

function setupPage() {
    var polls;
    fetch("/getPoll", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(function(response) {
        console.log(typeof response);
        console.log(response);
        polls = response;

        fetch("/getPollResponse", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(function(response) {
            console.log(response);
            completedPolls = response;
    
            var uncompletedPolls = polls.filter(poll => {
                return completedPolls.find(completedPoll => completedPoll.poll_id === poll.poll_id) === undefined
            })
            mainSection.innerHTML = "";
            if (polls.length > 0) {
                if (uncompletedPolls.length > 0) {
                    var uncompletedText = document.createElement("h1");
                    uncompletedText.textContent = "Uncompleted Polls";
                    mainSection.appendChild(uncompletedText);
                    for (var i = 0; i < uncompletedPolls.length; i++) {
                        var button = document.createElement("button")
                        button.textContent = uncompletedPolls[i].poll_name;
                        button.setAttribute("onClick", "javascript: loadPoll(" + uncompletedPolls[i].poll_id + ");")
                        mainSection.appendChild(button);
                    }
                }
                if (completedPolls.length > 0) {
                    var completedText = document.createElement("h1");
                    completedText.textContent = "Completed Polls";
                    mainSection.appendChild(completedText);
                    for (var i = 0; i < completedPolls.length; i++) {
                        var button = document.createElement("button")
                        button.textContent = completedPolls[i].poll_name;
                        button.setAttribute("onClick", "javascript: loadCompletedPoll(" + completedPolls[i].poll_id + ");")
                        mainSection.appendChild(button);
                    }
                }
            }
            else {
                var noPollsText = document.createElement("h1");
                noPollsText.textContent = "No polls have been created yet.";
                mainSection.appendChild(noPollsText);
            }
        })
        .catch(function(error) {
            console.log(error);
            alert("Error loading polls. Error message: " + error);
        });
    })
    .catch(function(error) {
        console.log(error);
        alert("Error loading polls. Error message: " + error);
    });
}

function loadCompletedPoll(id) {
    var responses = JSON.parse(completedPolls.find(poll => poll.poll_id === id).response);
    console.log(responses);
    mainSection.innerHTML = "";
    console.log(typeof responses);
    for (var i = 0; i < responses.length; i++) {
        var questionText = document.createElement("p");
        questionText.textContent = "Question: " + responses[i].question;
        mainSection.appendChild(questionText);
        var answerText = document.createElement("p");
        answerText.textContent = "Answer: " + responses[i].answer;
        mainSection.appendChild(answerText);
        mainSection.appendChild(document.createElement("br"));
    }
    var exitButton = document.createElement("button");
    exitButton.textContent = "Exit";
    exitButton.setAttribute("onClick", "javascript: setupPage();");
    mainSection.appendChild(exitButton);
}

function loadPoll(id) {
    console.log(id);
    mainSection.innerHTML = "";
    fetch("/getPoll?" + new URLSearchParams({
        pollID : id
    }), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(function(response) {
        console.log(response);
        var pollName = response.poll_name;
        var pollData = JSON.parse(response.poll_data);
        var pollNameText = document.createElement("h1");
        pollNameText.innerHTML = pollName;
        pollNameText.className = "pollName";
        mainSection.appendChild(pollNameText);
        for (var i = 0; i < pollData.length; i++) {
            var questionDiv = document.createElement("div");
            questionDiv.className = "question";
            var questionText = document.createElement("p");
            questionText.textContent = pollData[i].question;
            questionDiv.appendChild(questionText);
            if (pollData[i].answers.length > 0) {
                for (var j = 0; j < pollData[i].answers.length; j++) {
                    var answerRadioButton = document.createElement("input");
                    answerRadioButton.type = "radio";
                    answerRadioButton.name = i;
                    questionDiv.appendChild(answerRadioButton);
                    var answerText = document.createElement("label");
                    answerText.textContent = pollData[i].answers[j];
                    questionDiv.appendChild(answerText);
                    questionDiv.appendChild(document.createElement("br"));
                }
            }
            else {
                var answerInput = document.createElement("input");
                answerInput.placeholder = "Answer";
                answerInput.type = "text";
                questionDiv.appendChild(answerInput);
            }
            mainSection.appendChild(questionDiv);
        }
        var submitButton = document.createElement("button");
        submitButton.textContent = "Submit";
        submitButton.setAttribute("onClick", "javascript: submit(" + id + ");");
        mainSection.appendChild(submitButton);
    })
    .catch(function(error) {
        console.log(error);
        alert("Error loading poll. Error message: " + error);
    });
}

function submit(id) {
    console.log("submit");
    var text = "{ \"pollID\": " + '"' + id + '"' + ", \"response\": [";
    var divs = document.getElementsByClassName("question");
    for (var i = 0; i < divs.length; i++) {
        text = text + "{ \"question\": ";
        var children = divs[i].children;
        console.log(children);
        text = text + '"' + children[0].textContent + '"' + ", \"answer\": ";
        console.log("Quetion text: " + children[0].textContent); // questions text

        if (children.length > 2) {
            for (var j = 1; j < children.length; j += 3) {
                if (children[j].checked) {
                    text = text + '"' + children[j+1].textContent + '"';
                    console.log("Selected answer: " + children[j+1].textContent); // selected answer
                }
            }
        }
        else {
            text = text + '"' + children[1].value + '"';
            console.log("Selected Answer: " + children[1].value)
        }
        if (i === divs.length - 1) {
            text = text + "}";
        }
        else {
            text = text + "},";
        }
    }
    text = text + "]}";
    console.log(text);
    try {
    console.log(JSON.parse(text));
    var data = JSON.parse(text);
    
    fetch("/submitPoll", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(function(response) {
        console.log('got data');
    })
    .catch(function(error) {
        console.log(error);
        throw "Error occured when submitting poll: Error message: " + error;
    });

    console.log("test");

    setupPage();
    }
    catch(exception) {
        if (exception instanceof SyntaxError) {
            alert("Error submitting. Make sure all questions are answered.");
        }
        else {
            alert(exception);
        }
    }
}