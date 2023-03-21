const words = ['a', 'b', 'c'];
const tries = [];
const successfulTries = [];
const failedTries = [];
const button = document.getElementById('addbtn');
const input = document.getElementById('inptext');
const result = document.getElementById('res');
const trash = document.getElementById('pa');
const livesCount = document.getElementById('mylives');
const INDEX_OF_INVALID_VALUE = -1

function isLetter(char) {
    return (char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z' || char == 'ç');
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
    lost();
    won();
}

function cleanField() {
    input.value = ""
}


function won() {
    if (successfulTries.length == words.length) {
        const winner = document.getElementById('notif');
        winner.innerHTML = "WINNER"
        document.body.append(winner);
        document.body.style.background = "#13D513";
        button.remove();
        input.remove();
        trash.remove();
        livesCount.remove();
        result.remove();
        document.body.append(playAgainBtn);
        return
    }
}

function lost() {
    let lives = document.getElementById('lives');
    if (failedTries.length == 1) {
        lives.innerHTML = 4
    }
    if (failedTries.length == 2) {
        lives.innerHTML = 3
    }
    if (failedTries.length == 3) {
        lives.innerHTML = 2
    }
    if (failedTries.length == 4) {
        lives.innerHTML = 1
    }
    if (failedTries.length == 5) {
        lives.innerHTML = 0
    }
    if (failedTries.length > 5) {
        const error = document.getElementById('notif2');
        error.innerHTML = "LOOSER"
        document.body.append(error);
        document.body.style.background = "#B60606";
        button.remove();
        input.remove();
        trash.remove();
        livesCount.remove();
        result.remove();
        document.body.append(playAgainBtn);
        return
    }
}
const playAgainBtn = document.createElement('button');
playAgainBtn.innerHTML = "Play Again"
playAgainBtn.style.backgroundColor= "grey";
playAgainBtn.style.width = "50px";

playAgainBtn.addEventListener('click', function(){
    window.location.reload()
})