//1) Přístup - méně optimální kód - začne fungovat až po kompletním načtení celé stránky

//Metoda, která se spustí po načtení stránky
/*
window.onload = function () {
  //Metoda, která pomocí ID získá odkazu na referenční objekt - v našem případě konkrétní tag
  let number1 = document.getElementById("number1");
  let number2 = document.getElementById("number2");
  let button = document.getElementById("button");
  let result = document.getElementById("result");

  //Funkce, která se spustí po kliknutí na naše tlačítko
  button.onclick = function () {
    //Převod řetězců ze vstupů na číslo typu Int
    let total = parseInt(number1.value) + parseInt(number2.value);
    //Nastavení kontentu - zobrazení výsledku
    result.textContent = total;
  };
};
*/

//2) Přístup - bezpečnější
//Metoda, která pomocí ID získá odkazu na referenční objekt - v našem případě konkrétní tag
let button = document.getElementById("button");
let number1 = document.getElementById("number1");
let number2 = document.getElementById("number2");
let result = document.getElementById("result");

//Jednoduchá funkce, abychom ji mohli volat pomocí addEventListener
function calc() {
  //Převod řetězců ze vstupů na číslo typu Int
  let total = parseInt(number1.value) + parseInt(number2.value);
  //Nastavení kontentu - zobrazení výsledku
  result.textContent = total;
}

// Posluchač události - čeká až někdo klikne na tlačítko
button.addEventListener("click", calc);
