//alert("OK");
const nadpis = document.getElementById("Nadpis");
nadpis.textContent = "Opakování..."



const vysledek = document.getElementById("vysledek");
let a = 10;
let b = 5;
let soucet = a + b;

vysledek.textContent = "Výsledek: " + soucet;



let intNumber = 10;
let stringNumber = "10";

if (intNumber == stringNumber)
{
    pozor.textContent = "Jsou stejne"
} else {
    pozor.textContent = "Nejsou stejne"
}

if (intNumber === stringNumber)
{
        pozorSpravne.textContent = "Jsou stejne"
} 
else
{
        pozorSpravne.textContent = "Nejsou stejne"
}



const cyklusFor = document.getElementById("cyklusFor");
const cyklusWhile = document.getElementById("cyklusWhile");

let retezec = "";
for (let i = 1; i <= 10; i++)
{
    retezec += "<p> Cislo: " + i + "</p>";
}
cyklusFor.innerHTML = retezec;


retezec = "";
let i = 30;
while (i > 1) {
    retezec += "<p> Cislo: " + i + "</p>";
    i -= 3;
}
cyklusWhile.innerHTML = retezec;