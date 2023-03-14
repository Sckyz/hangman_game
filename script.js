const forca = ['m', 'a', 'c'];
const tries = [];
const result = document.getElementById('res');
const text = document.getElementById('inptext');
const trash = document.getElementById('pa');

function isEqual(letter, index, list) {
    console.log(list)
    return letter === document.getElementById('inptext').value;
}

function add(event) {
    if (text.value == "") {
        alert('Por favor, insira uma letra!');
        return
    }
    const some = text.value
    if (forca.find(isEqual)) {
        let correct = result.append(some);
        tries.push(text.value);
        cleanField();
        return
    }
    let incorrect = trash.append(some);
    tries.push(text.value);
    cleanField();
}

function cleanField() {
    text.value = ""
}