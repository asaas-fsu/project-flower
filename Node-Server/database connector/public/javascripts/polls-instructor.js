var mainSection = document.getElementsByClassName("mainsection")[0];

var questionCount = 0;

var createQuestionButton = document.createElement("button");
createQuestionButton.textContent = "Create Question";
var submitButton = document.createElement("button");
submitButton.textContent = "Submit"

function createPoll() {
    var testInput = document.createElement("input");
    testInput.placeholder = "test";
    mainSection.appendChild(testInput);

    
    mainSection.innerHTML = "";
    mainSection.appendChild(createQuestionButton);
    mainSection.appendChild(submitButton);
}

createQuestionButton.onclick = function(event) {
    questionCount++;
    var questionDiv = document.createElement("div");
    questionDiv.className = "test";
    var questionInput = document.createElement("input");
    questionInput.placeholder = "Question";
    questionInput.type = "text";
    questionDiv.appendChild(questionInput);
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

submitButton.onclick = function(event) {
    var text = "";
    var divs = document.getElementsByClassName("test");
    for (var i = 0; i < divs.length; i++) {
        var children = divs[i].children;
        console.log(children[0].value); // questions text

        var answerInputs = divs[i].querySelectorAll(".answer");
        for (var j = 0; j < answerInputs.length; j++) {
            console.log(answerInputs[j].value);
        }

        for (var j = 2; j < children.length; j += 3) {
            if (children[j].checked) {
                console.log(children[j+1].value); // correct answer
            }
        }
    }
    console.log(text);
}