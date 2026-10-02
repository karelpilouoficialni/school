//console.log("Podminky.");
let butAvg = document.getElementById("buttonAvg");
let inpAvg = document.getElementById("inputAvg");
let resAvg = document.getElementById("resultAvg");

function rate() {
    let number = parseFloat(inpAvg.value);
    //alert(number);

    if (!number || number < 1 || number > 5) {
        resAvg.textContent = "Zadal si neplatnou hodnotu.";
        resAvg.style.color = "red";
    } else if (number < 1.5) {
        resAvg.textContent = "Prospel s vyznamenanim.";
        resAvg.style.color = "green";
    } else if (number < 4.5) {
        resAvg.textContent = "Prospel.";
        resAvg.style.color = "blue";
    } else {
        resAvg.textContent = "Neprospel.";
        resAvg.style.color = "orange";
    }
}

butAvg.addEventListener("click", rate);

let buttWeek = document.getElementById("buttonWeek");
let inpWeek = document.getElementById("inputWeek");
let resWeek = document.getElementById("resultWeek");

function getDay() {
    alert("Ok")
}
buttWeek.addEventListener("click", getDay);