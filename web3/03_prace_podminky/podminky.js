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

let butWeek = document.getElementById("buttonWeek");
let inpWeek = document.getElementById("inputWeek");
let resWeek = document.getElementById("resultWeek");

function getDay() {
  let day = parseInt(inpWeek.value);
  //alert(day);

  switch (day) {
    case 1:
      resWeek.textContent = "dnes je Pondeli";
      break;
    case 2:
      resWeek.textContent = "dnes je Utery";
      break;
    case 3:
      resWeek.textContent = "dnes je Streda";
      break;
    case 4:
      resWeek.textContent = "dnes je Ctvrtek";
      break;
    case 5:
      resWeek.textContent = "dnes je Patek";
      break;
    default:
      resWeek.textContent = "dnes je Vikend.";
  }
}

butWeek.addEventListener("click", getDay);

let longIf = document.getElementById("longIf");
let shortIf = document.getElementById("shortIf");

let x = 18;
let jePlnolety;

if (x >= 18) {
  jePlnolety = true;
} else {
  jePlnolety = false;
}
longIf.textContent = "X je plnolety: " + jePlnolety;

jePlnolety = x >= 18 ? true : false;
shortIf.textContent = "Zkracene - X je plnolety: " + jePlnolety;
