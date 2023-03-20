const words = ['a', 'b', 'c'];
const tries = [];
const successfulTries = [];
const failedTries = [];
const input = document.getElementById('inptext');
const result = document.getElementById('res');
const trash = document.getElementById('pa');
const lives = document.getElementById('mylives');

const INDEX_OF_INVALID_VALUE = -1

function isLetter(char) {
    return (char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z');
}

function checkIfInside(arr, letter) {
    return arr.indexOf(letter) != INDEX_OF_INVALID_VALUE
}

function inTries(char) {
    return checkIfInside(tries, char)
}

function inRightAnswers(char) {
    return checkIfInside(successfulTries, char)
}

function inWrongAnswers(char) {
    return checkIfInside(failedTries, char)
}

function inWords(char) {
    return checkIfInside(words, char)
}

function isEqual(letter, _index, list) {
    return letter === document.getElementById('inptext').value;
}


function add() {
    if (!isLetter(input.value) || (input.value.trim() === "")) {
        alert('Valor inválido, por favor, insira uma LETRA!');
        cleanField();
        return
    }
    if (inTries(input.value)) {
        window.alert('Letra repetida, tente outra!')
        cleanField();
        return
    }
    tries.push(input.value)
    if (words.includes(input.value)) {
        successfulTries.push(input.value)
        const answer = input.value
        if (words.find(isEqual)) {
            let correct = result.append(answer);
            cleanField();
            return
        }
    }
    failedTries.push(input.value)
    const answer = input.value
    trash.append(answer)
    cleanField();
}
 
function cleanField() {
    input.value = ""
}

function win() {
    if (successfulTries.length == words.length) {
        const winner = document.getElementById('notif');
        winner.innerHTML = "WINNER"
        document.body.append(winner);
        document.body.style.background = "#13D513";
        return
    }
}

function fail() {
    if (failedTries.length > 5) {
        const error = document.getElementById('notif2');
        error.innerHTML = "LOOSER"
        document.body.append(error);
        document.body.style.background = "#B60606";
        return
    }
}