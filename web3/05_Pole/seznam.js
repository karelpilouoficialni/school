let jmena = [
  "Pavel",
  "Ondřej",
  "Zdeněk",
  "Josef",
  "Michal",
  "Marek",
  "Aneta",
  "Adéla",
  "Petr",
  "Michaela",
  "Martina",
  "Štěpána",
];

//Získání elementů z HTML souboru
const jmenaVypis = document.getElementById("jmenaVypis");
const jmenaSetrizena = document.getElementById("jmenaSetrizena");
const jmenaSetrizenaVCestine = document.getElementById(
  "jmenaSetrizenaVCestine",
);
const jmenaSetrizenaObracene = document.getElementById(
  "jmenaSetrizenaObracene",
);
const vlozeniPrvku = document.getElementById("vlozeniPrvku");
const odstraneniPrvku = document.getElementById("odstraneniPrvku");
const odstraneniPrvkuNaIndexu = document.getElementById(
  "odstraneniPrvkuNaIndexu",
);

jmenaVypis.innerHTML = jmena;

jmenaSetrizena.innerHTML = jmena.sort();

function porovnejJmena(a, b) {
  return a.localeCompare(b, "cs", { sensitivity: "base" });
}

jmenaSetrizenaVCestine.innerHTML = jmena.sort(porovnejJmena);
jmenaSetrizenaObracene.innerHTML = jmena.sort(porovnejJmena).reverse();

jmena.push("Martin");
vlozeniPrvku.innerHTML = jmena;

jmena.pop();
jmena.pop();
jmena.pop(); // => odstraní poslední prvek
odstraneniPrvku.innerHTML = jmena;

jmena.splice(3, 1); // => odstraní prvek na indexu 3; => kolikátý prvek chci odstranit
odstraneniPrvkuNaIndexu.innerHTML = jmena;