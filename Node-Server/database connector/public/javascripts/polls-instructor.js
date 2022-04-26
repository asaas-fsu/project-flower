var mainSection = document.getElementsByClassName("mainsection")[0];

var questionCount = 0;

setupPage();

function setupPage() {
    fetch("/getPoll", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(function(response) {
        console.log(response);
        mainSection.innerHTML = "";
        for (var i = 0; i < response.length; i++) {
            var button = document.createElement("button")
            button.textContent = response[i].poll_name;
            button.setAttribute("onClick", "javascript: viewPoll(" + response[i].poll_id + ");")
            mainSection.appendChild(button);
        }
        var createPollButton = document.createElement("button");
        createPollButton.textContent = "Create Poll";
        createPollButton.setAttribute("onClick", "javascript: createPoll()");
        mainSection.appendChild(createPollButton);
    })
    .catch(function(error) {
        console.log(error);
        alert("Error occured when fetching polls: Error message: " + error);
    });
}

function viewPoll(id) {
    console.log(id);
    mainSection.innerHTML = "";
    try {
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
            var exitButton = document.createElement("button");
            exitButton.textContent = "Exit";
            exitButton.setAttribute("onClick", "javascript: setupPage();");
            mainSection.appendChild(exitButton);
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
                        if (pollData[i].answers[j] === pollData[i].correctAnswer) {
                            answerRadioButton.checked = true;
                        }
                        answerRadioButton.disabled = true;
                        questionDiv.appendChild(answerRadioButton);
                        var answerText = document.createElement("label");
                        answerText.textContent = pollData[i].answers[j];
                        questionDiv.appendChild(answerText);
                        questionDiv.appendChild(document.createElement("br"));
                    }
                }
                else {
                    var freeResponseLable = document.createElement("p");
                    freeResponseLable.textContent = "<Free Response>";
                    questionDiv.appendChild(freeResponseLable);
                }
                mainSection.appendChild(questionDiv);
            }
        })
        .catch(function(error) {
            console.log(error);
            alert("Error loading poll. Error message: " + error);
        });

        // Get responses from students to put in <select>
        fetch("/getPollResponse?" + new URLSearchParams({
            pollID : id
        }), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(function(response) {
            console.log('got data: ' + JSON.stringify(response));
            if (response.length > 0) {
                var studentSelect = document.createElement("select");
                for (var i = 0; i < response.length; i++) {
                    var option = document.createElement("option");
                    option.value = i;
                    option.text = response[i].username;
                    studentSelect.options.add(option);
                }
                mainSection.appendChild(studentSelect);
                var selectStudentButton = document.createElement("button");
                selectStudentButton.textContent = "Select Student's Response";
                selectStudentButton.setAttribute("onClick", "javascript: console.log(\"Test\")");
                mainSection.appendChild(selectStudentButton);
                var responseDiv = document.createElement("div");
                responseDiv.className = "responseDiv";
                mainSection.appendChild(responseDiv);

                selectStudentButton.onclick = function() {
                    displayResponse(response[parseInt(studentSelect.value)]);
                }
            }
        })
        .catch(function(error) {
            console.log(error);
            throw "Error occured when getting student responses: Error message: " + error;
        });
    }
    catch (exception) {
        alert(exception);
        setupPage();
    }
}

function displayResponse(json) {
    console.log(json);
    var responses = JSON.parse(json.response);
    console.log(typeof responses);
    var responseDiv = document.getElementsByClassName("responseDiv")[0];
    responseDiv.innerHTML = "";
    for (var i = 0; i < responses.length; i++) {
        var questionText = document.createElement("p");
        questionText.textContent = "Question: " + responses[i].question;
        responseDiv.appendChild(questionText);
        var answerText = document.createElement("p");
        answerText.textContent = "Answer: " + responses[i].answer;
        responseDiv.appendChild(answerText);
        responseDiv.appendChild(document.createElement("br"));
    }
    mainSection.appendChild(responseDiv);
}

function createPoll() {
    var createQuestionButton = document.createElement("button");
    createQuestionButton.textContent = "Create Question";
    createQuestionButton.setAttribute("onClick", "javascript: createQuestion();")
    var submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.setAttribute("onClick", "javascript: submit();");
    var cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.setAttribute("onClick", "javascript: setupPage();");
    var pollNameInput = document.createElement("input");
    pollNameInput.placeholder = "Poll Name";
    pollNameInput.type = "text";
    pollNameInput.id = "pollName";

    mainSection.innerHTML = "";
    mainSection.appendChild(pollNameInput);
    mainSection.appendChild(createQuestionButton);
    mainSection.appendChild(submitButton);
    mainSection.appendChild(cancelButton);
}

function createQuestion() {
    questionCount++;
    var questionDiv = document.createElement("div");
    questionDiv.className = "question";
    var questionInput = document.createElement("input");
    questionInput.placeholder = "Question";
    questionInput.type = "text";
    questionInput.className = "questionInput";
    questionDiv.appendChild(questionInput);
    var deleteQuestionButton = document.createElement("button");
    deleteQuestionButton.textContent = "Delete question";
    deleteQuestionButton.setAttribute("onClick", "javascript: deleteQuestion(this)")
    questionDiv.appendChild(deleteQuestionButton);
    for (var i  = 0; i < 4; i++) {
        var answerRadioButton = document.createElement("input");
        answerRadioButton.type = "radio";
        answerRadioButton.name = "answerRadioButton" + questionCount;
        var answerInput = document.createElement("input");
        answerInput.type = "text";
        answerInput.className = "answer"
        questionDiv.appendChild(document.createElement("br"));
        questionDiv.appendChild(answerRadioButton);
        questionDiv.appendChild(answerInput);
    }
    mainSection.appendChild(questionDiv);
}

function deleteQuestion(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
}

function submit() {
    var data = getPollData();

    try {
        if (document.getElementById("pollName").value === "") {
            throw "Please enter a poll name";
        }
        for (var i = 0; i < data.questions.length; i++) {
            if (data.questions[i].correctAnswer === undefined && data.questions[i].answers.length > 0) {
                throw "Please select correct answer for question: " + data.questions[i].question;
            }
        }
        fetch("/createPoll", {
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

        setupPage();
    }
    catch(exception) {
        alert(exception);
    }
}

function getPollData() {
    var text = "{ \"pollName\": " + '"' + document.getElementById("pollName").value + '"' + ", \"questions\": [";
    var divs = document.getElementsByClassName("question");
    for (var i = 0; i < divs.length; i++) {
        text = text + "{ \"question\": ";
        var children = divs[i].children;
        text = text + '"' + children[0].value + '"' + ", \"answers\": [";
        console.log(children[0].value); // questions text

        var answerInputs = divs[i].querySelectorAll(".answer");
        for (var j = 0; j < answerInputs.length; j++) {
            if (answerInputs[j].value.length !== 0) {
                if (j !== 0) {
                    text = text + ",";
                }
                text = text + '"' + answerInputs[j].value + '"'; // answer text
            }
            console.log(answerInputs[j].value);
        }

        text = text + "]"

        for (var j = 3; j < children.length; j += 3) {
            if (children[j].checked) {
                text = text + ", \"correctAnswer\": " + '"' + children[j+1].value + '"';
                console.log(children[j+1].value); // correct answer
            }
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
    console.log(JSON.parse(text));
    var data = JSON.parse(text);
    return data;
}