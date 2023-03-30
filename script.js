const words = 'honey';
const tries = [];
const successfulTries = [];
const failedTries = [];
const toCleanStuffs = {
    button: document.getElementById('addbtn'),
    input: document.getElementById('inptext'),
    result: document.getElementById('res'),
    trash: document.getElementById('pa'),
    livesCount: document.getElementById('mylives')
}
const INDEX_OF_INVALID_VALUE = -1

const reg = /^[ça-z]*$/;

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

function isEqual(letter) {
    return letter === toCleanStuffs.input.value;
}

function createSpan() {
    const letters = words.split("")
    letters.forEach(letter => {
        let span = document.createElement('span')
        span.textContent = letter
        toCleanStuffs.result.append(span)
        span.setAttribute("id", letter)
        span.setAttribute("style", "visibility: hidden")
        // console.log(toCleanStuffs.input)
        // showLetters(letter)
    });
}

// function showLetters() {
//     if (toCleanStuffs.input.value == letters[0] && letters[0].style.visibility == "hidden") {
//         letter.setAttribute("style", "visibility: visible")
//         console.log(letter);
//     }
// }
createSpan();
function add() {
    if (!reg.test(toCleanStuffs.input.value) || (toCleanStuffs.input.value.trim() === "")) {
        alert('Invalid value, please try adding a letter');
        cleanField();
        return
    }
    if (inTries(toCleanStuffs.input.value)) {
        window.alert('This letter was already tested, please try another one')
        cleanField();
        return
    }
    if (toCleanStuffs.input.value == "h") {
        const some = document.getElementById("h")
        console.log(some);
        some.style.visibility = "visible";
    }
    tries.push(toCleanStuffs.input.value)
    const answer = toCleanStuffs.input.value
    cleanField();
    if (inWords(answer)) {
        successfulTries.push(answer)
        // toCleanStuffs.result.append(answer)
        isAlive();
        return
    }
    lives--
    failedTries.push(answer)
    toCleanStuffs.trash.append(answer)
    isAlive();
}

function cleanField() {
    toCleanStuffs.input.value = ""
}

let lives = 6;
function isAlive() {
    toCleanStuffs.livesCount.innerHTML = "Chances left:  " + lives;
    if (failedTries.length > 5) {
        lost();
    }
    if (successfulTries.length === words.length) {
        return won();
    }
}

function won() {
    const winner = document.getElementById('notif');
    winner.innerHTML = "WINNER"
    document.body.append(winner);
    changeBackgroundColor("#13D513");
    return cleanAlltrashes()
}

function cleanAlltrashes() {
    const keys = Object.keys(toCleanStuffs)

    keys.forEach((key) => {
        toCleanStuffs[key].remove()
    })

    document.body.append(playAgainBtn);
}
function changeBackgroundColor(color) {
    document.body.style.background = color
}

function lost() {
    const error = document.getElementById('notif2');
    error.innerHTML = "LOOSER"
    document.body.append(error);
    changeBackgroundColor("#B60606");
    return cleanAlltrashes()
}
const playAgainBtn = document.createElement('button');
playAgainBtn.innerHTML = "Play Again"
playAgainBtn.style.width = "50px";
playAgainBtn.addEventListener('click', function () {
    window.location.reload()
})