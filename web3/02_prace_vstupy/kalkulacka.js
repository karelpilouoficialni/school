//console.log("jaja test before");

let num1 = document.getElementById("number1");
let num2 = document.getElementById("number2");
let but = document.getElementById("button");
let res = document.getElementById("result");

function calc() {
    //console.log("calc test");
    let total = parseInt(num1.value) + parseInt(num2.value);
    res.textContent = total;
}

but.addEventListener("click", calc);