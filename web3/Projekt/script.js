// Pole pro všechny transakce (později do něj načteme data z localStorage)
let transakce = [];

// Získáme formulář a jednotlivá vstupní pole podle jejich id
const formular = document.getElementById("formularTransakce");
const datumInput = document.getElementById("datum");
const typInput = document.getElementById("typ");
const kategorieInput = document.getElementById("kategorie");
const popisInput = document.getElementById("popis");
const castkaInput = document.getElementById("castka");

// Když uživatel odešle formulář, přidáme novou transakci do pole
formular.addEventListener("submit", function (udalost) {
    // Formulář běžně obnoví stránku – tomu zabráníme
    udalost.preventDefault();

    // Vytvoříme nový záznam z hodnot, které uživatel zadal
    const novaTransakce = {
        id: Date.now(), // unikátní ID podle aktuálního času
        datum: datumInput.value,
        typ: typInput.value,
        kategorie: kategorieInput.value,
        popis: popisInput.value,
        castka: Number(castkaInput.value) // převedeme text na číslo
    };

    // Vložíme záznam do pole
    transakce.push(novaTransakce);

    // Vyčistíme formulář, aby šlo zadat další transakci
    formular.reset();

    // Prozatímní kontrola, obsah pole uvidíme v konzoli prohlížeče
    console.log(transakce);
});
