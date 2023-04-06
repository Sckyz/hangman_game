let words;
let lives = 6;
const tries = [];
const successfulTries = [];
const failedTries = [];
const reg = /^[ça-z]*$/;
let arr1 = []
const arr2 = []
const INDEX_OF_INVALID_VALUE = -1
const toCleanStuffs = {
    btn: document.getElementById('addword'),
    wordInput: document.getElementById('wordInp'),
    button: document.getElementById('addbtn'),
    input: document.getElementById('inptext'),
    result: document.getElementById('res'),
    trash: document.getElementById('pa'),
    livesCount: document.getElementById('mylives')
}

// To fill target word
function addToArray() {
    words = toCleanStuffs.wordInput.value;
    arr1 = words.split("")
    if (!reg.test(toCleanStuffs.wordInput.value) || toCleanStuffs.wordInput.value === "") {
        alert('Invalid value, please try adding a letter');
        cleanField();
        return
    }
    cleanField();
    createSpan();
}

// to add a try in somewhere
function add() {
    const answer = toCleanStuffs.input.value;
    cleanField();
    if (!reg.test(answer) || (answer.trim() === "")) {
        alert('Invalid value, please try adding a letter');
        cleanField();
        return
    }
    if (inTries(answer)) {
        window.alert('This letter was already tested, please try another one')
        cleanField();
        return
    }
    tries.push(answer)
    if (inWords(answer)) {
        showLetters(answer)
        isAlive();
        return
    }
    lives--
    failedTries.push(answer)
    toCleanStuffs.trash.append(answer)
    isAlive();
}

/**
 * Verify if `letter` is inside of `arr` 
 * @param {string[]} arr 
 * @param {string} letter 
 * @returns {boolean}
 */
function checkIfInside(arr, letter) {
    // const count = arr.filter((element) => letter == element).length // 8 "(número de vezes que `letter` ocorre em `arr`)"
    // console.log(count)
    const some = arr.includes(letter)
    return some
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
    return checkIfInside(words.split(''), char)
}

function isEqual(letter) {
    return letter === toCleanStuffs.input.value;
}

function createSpan() {
    words.split('').forEach(letter => {
        let dash = document.createElement('div')
        let span = document.createElement('span')
        toCleanStuffs.result.append(dash)
        dash.appendChild(span)
        span.textContent = letter
        span.setAttribute("style", "visibility: hidden")
        dash.setAttribute("style", "border-bottom: 1px solid black; margin: 3px; display: inline;");
    });
}

function showLetters(trier) {
    for (const elements of document.querySelectorAll("span")) {
        if (elements.textContent.includes(trier)) {
            elements.style.visibility = 'visible';
            arr2.push(elements.textContent)
        }
    }
}

function cleanField() {
    toCleanStuffs.input.value = ""
    toCleanStuffs.wordInput.value = ""
}

function isAlive() {
    toCleanStuffs.livesCount.innerHTML = "Chances left:  " + lives;
    if (failedTries.length > 5) {
        lost();
    }
    areEqual(arr1, arr2);
}

function areEqual(array1, array2) {
    if (array1.length === array2.length) {
        won();
    }
};

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

function won() {
    const winner = document.getElementById('notif');
    winner.innerHTML = "CONGRATS, YOU DON'T SUCK!"
    document.body.append(winner);
    changeBackgroundColor("#13D513");
    return cleanAlltrashes()
}

function lost() {
    const error = document.getElementById('notif2');
    error.innerHTML = "CONGRATS, YOU SUCK!"
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