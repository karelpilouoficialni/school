//console.log("jaja test before");

let num1 = document.getElementById("number1");
let num2 = document.getElementById("number2");
let but = document.getElementById("button");
let res = document.getElementById("result");

function calc() {
    //console.log("calc test");
    let total1 = parseInt(num1.value) + parseInt(num2.value);
    let total2 = parseInt(num1.value) - parseInt(num2.value);
    let total3 = parseInt(num1.value) * parseInt(num2.value);
    let total4 = parseInt(num1.value) / parseInt(num2.value);

    res.textContent = "Soucet: " + total1 + " Rozdil: " + total2 + " Soucin: " + total3 + " Podil: " + total4;
}

but.addEventListener("click", calc);