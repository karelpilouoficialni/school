// Pole pro všechny transakce (později do něj načteme data z localStorage)
let transakce = [];

// Získáme formulář a jednotlivá vstupní pole podle jejich id
const formular = document.getElementById("formularTransakce");
const datumInput = document.getElementById("datum");
const typInput = document.getElementById("typ");
const kategorieInput = document.getElementById("kategorie");
const popisInput = document.getElementById("popis");
const castkaInput = document.getElementById("castka");

// Místa v HTML, kam budeme vkládat výsledky
const tabulka = document.getElementById("tabulka");
const tabulkaTelo = document.getElementById("tabulkaTela");
const prazdnyStav = document.getElementById("prazdnyStav");

// Vykreslí všechny transakce do tabulky
function vykresliTabulku() {
    // Nejdřív smažeme starý obsah těla tabulky
    tabulkaTelo.textContent = "";

    // Když nejsou žádné záznamy, schováme tabulku a ukážeme hlášku
    tabulka.hidden = transakce.length === 0;
    prazdnyStav.hidden = transakce.length > 0;

    // Pro každý záznam vytvoříme jeden řádek
    transakce.forEach(function (polozka) {
        const radek = document.createElement("tr");

        // Typ převedeme na český text
        let typText = "Výdaj";
        if (polozka.typ === "prijem") {
            typText = "Příjem";
        }

        // Hodnoty dáme do polí a pak do buněk
        const hodnoty = [
            polozka.datum,
            typText,
            polozka.kategorie,
            polozka.popis,
            polozka.castka + " Kč"
        ];

        hodnoty.forEach(function (hodnota) {
            const bunka = document.createElement("td");
            // textContent je bezpečný, text se nevyhodnotí jako HTML
            bunka.textContent = hodnota;
            radek.appendChild(bunka);
        });

        // Sloupec Akce zatím necháme prázdný, tlačítka přidáme v kroku 7
        const bunkaAkce = document.createElement("td");
        radek.appendChild(bunkaAkce);

        tabulkaTelo.appendChild(radek);
    });
}

// Když uživatel odešle formulář, přidáme novou transakci do pole
formular.addEventListener("submit", function (udalost) {
    // Formulář běžně obnoví stránku, tomu zabráníme (muhahahaha)
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

    // Vložíme záznam do pole a překreslíme tabulku
    transakce.push(novaTransakce);
    vykresliTabulku();

    // Vyčistíme formulář, aby šlo zadat další transakci
    formular.reset();
});

// Při načtení stránky ukážeme prázdný stav
vykresliTabulku();
