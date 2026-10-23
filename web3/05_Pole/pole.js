//Dva způsoby deklarace

const ovoce = document.getElementById("ovoce");
const zelenina = document.getElementById("zelenina");
const foreachOvoce = document.getElementById("foreachOvoce");
const foreachZelenina = document.getElementById("foreachZelenina");

let poleOvoce = new Array();
poleOvoce[0] = "Banán";
poleOvoce[1] = "Jablko";
poleOvoce[2] = "Pomeranč";

let poleZeleniny = ["Okurek", "Rajče", "Cuketa"];

//alert(poleOvoce);
//alert(poleZeleniny);

//POLE
let ovoceString = "";

for (let i = 0; i < poleOvoce.length; i++) {
  ovoceString += "<p>" + poleOvoce[i] + "</p>";
}

ovoce.innerHTML = ovoceString;

//KLASICKY CYKLUS
let zeleninaString = "";

for (let i = 0; i < poleZeleniny.length; i++) {
  zeleninaString += "<p>" + poleZeleniny[i] + "</p>";
}
zelenina.innerHTML = zeleninaString;

//FOREACH
let ovocePomociForeach = "";
for (let prvek of poleOvoce) {
  ovocePomociForeach += "<p>" + prvek + "</p>";
}
foreachOvoce.innerHTML = ovocePomociForeach;

let zeleninaPomociForeach = "";

poleZeleniny.forEach((prvek) => {
  zeleninaPomociForeach += "<p>" + prvek + "</p>";
});
foreachZelenina.innerHTML = zeleninaPomociForeach;

//PRACE S POLI
