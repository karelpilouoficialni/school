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
const souhrnPrijmy = document.getElementById("souhrnPrijmy");
const souhrnVydaje = document.getElementById("souhrnVydaje");
const souhrnBilance = document.getElementById("souhrnBilance");

// Klíč, pod kterým budeme data ukládat do localStorage
const KLIC = "ucetnictvi_transakce";

// Uloží aktuální transakce do localStorage
function ulozData() {
    try {
        localStorage.setItem(KLIC, JSON.stringify(transakce));
    } catch (chyba) {
        console.error("Data se nepodařilo uložit.", chyba);
    }
}

// Načte transakce z localStorage zpět do pole
function nactiData() {
    try {
        const ulozenaData = localStorage.getItem(KLIC);
        if (ulozenaData !== null) {
            transakce = JSON.parse(ulozenaData);
            // Kdyby v úložišti nebylo pole, začneme raději nanovo
            if (!Array.isArray(transakce)) {
                transakce = [];
            }
        }
    } catch (chyba) {
        transakce = [];
        console.error("Data se nepodařilo načíst.", chyba);
    }
}

// Spočítá celkové příjmy, výdaje a bilanci
function aktualizujSouhrn() {
    let prijmy = 0;
    let vydaje = 0;

    transakce.forEach(function (polozka) {
        if (polozka.typ === "prijem") {
            prijmy = prijmy + polozka.castka;
        } else {
            vydaje = vydaje + polozka.castka;
        }
    });

    souhrnPrijmy.textContent = prijmy + " Kč";
    souhrnVydaje.textContent = vydaje + " Kč";
    souhrnBilance.textContent = (prijmy - vydaje) + " Kč";
}

// Vykreslí všechny transakce do tabulky
function vykresliTabulku() {
    // Nejdřív smažeme starý obsah těla tabulky
    tabulkaTelo.textContent = "";

    // Když nejsou žádné záznamy, schováme tabulku a ukážeme hlášku
    tabulka.hidden = transakce.length === 0;
    prazdnyStav.hidden = transakce.length > 0;

    // Pro každý záznam vytvoříme jeden řádek
    transakce.forEach(function (polozka) {
        // insertRow přidá nový řádek na konec tabulky
        const radek = tabulkaTelo.insertRow();

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
            // insertCell přidá buňku, textContent vloží bezpečně jen text
            radek.insertCell().textContent = hodnota;
        });

        // Prázdná buňka pro tlačítka, která přidáme v kroku 7
        radek.insertCell();
    });

    // Při každém překreslení přepočítáme i souhrn
    aktualizujSouhrn();
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
    ulozData();
    vykresliTabulku();

    // Vyčistíme formulář, aby šlo zadat další transakci
    formular.reset();
});

// Při načtení stránky načteme uložená data a zobrazíme je
nactiData();
vykresliTabulku();
