// Pole pro všechny transakce (později do něj načteme data z localStorage)
let transakce = [];

// ID záznamu, který zrovna upravujeme. null znamená, že přidáváme nový.
let upravovaneId = null;

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
const pocetZaznamu = document.getElementById("pocetZaznamu");
const zprava = document.getElementById("zprava");
const tlacitkoOdeslat = document.getElementById("tlacitkoOdeslat");
const tlacitkoZrusit = document.getElementById("tlacitkoZrusit");

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

// Vyplní formulář hodnotami z existujícího záznamu
function naplFormular(polozka) {
    datumInput.value = polozka.datum;
    typInput.value = polozka.typ;
    kategorieInput.value = polozka.kategorie;
    popisInput.value = polozka.popis;
    castkaInput.value = polozka.castka;
}

// Přepne formulář do režimu úpravy
function zacniUpravu(id) {
    const polozka = transakce.find(function (item) {
        return item.id === id;
    });
    if (!polozka) {
        return;
    }

    upravovaneId = id;
    naplFormular(polozka);
    tlacitkoOdeslat.textContent = "Uložit změny";
    tlacitkoZrusit.hidden = false;
    zobrazZpravu("Upravuješ záznam. Ulož změny nebo úpravu zruš.");
}

// Vrátí formulář zpět do režimu přidávání
function ukonciUpravu() {
    upravovaneId = null;
    formular.reset();
    tlacitkoOdeslat.textContent = "Přidat záznam";
    tlacitkoZrusit.hidden = true;
}

// Zobrazí krátkou hlášku uživateli
function zobrazZpravu(text) {
    zprava.textContent = text;
}

// Smaže záznam, jen když to uživatel potvrdí
function smazatTransakci(id) {
    const potvrzeni = confirm("Opravdu chceš smazat tento záznam?");
    if (!potvrzeni) {
        return;
    }

    // Vytvoříme nové pole bez záznamu s daným id
    transakce = transakce.filter(function (polozka) {
        return polozka.id !== id;
    });

    ulozData();
    vykresliTabulku();
    zobrazZpravu("Záznam byl smazán.");
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

// Převede datum z YYYY-MM-DD na dd-mm-yyyy jen pro zobrazení
function formatujDatum(datum) {
    const casti = datum.split("-");
    const rok = casti[0];
    const mesic = casti[1];
    const den = casti[2];
    return den + "-" + mesic + "-" + rok;
}

// Vykreslí všechny transakce do tabulky
function vykresliTabulku() {
    // Nejdřív smažeme starý obsah těla tabulky
    tabulkaTelo.textContent = "";

    // Když nejsou žádné záznamy, schováme tabulku a ukážeme hlášku
    tabulka.hidden = transakce.length === 0;
    prazdnyStav.hidden = transakce.length > 0;
    pocetZaznamu.textContent = "(" + transakce.length + ")";

    // Pro každý záznam vytvoříme jeden řádek
    transakce.forEach(function (polozka) {
        // insertRow přidá nový řádek na konec tabulky
        const radek = tabulkaTelo.insertRow();

        // Typ převedeme na český text
        let typText = "Výdaj";
        if (polozka.typ === "prijem") {
            typText = "Příjem";
        }

        // U příjmu přidáme plus, u výdaje minus
        let castkaText = "-" + polozka.castka + " Kč";
        if (polozka.typ === "prijem") {
            castkaText = "+" + polozka.castka + " Kč";
        }

        // Hodnoty dáme do polí a pak do buněk
        const hodnoty = [
            formatujDatum(polozka.datum),
            typText,
            polozka.kategorie,
            polozka.popis,
            castkaText
        ];

        hodnoty.forEach(function (hodnota, index) {
            // insertCell přidá buňku, textContent vloží bezpečně jen text
            const bunka = radek.insertCell();
            bunka.textContent = hodnota;

            // Druhá buňka je typ, pátá je částka, obě obarvíme podle typu
            if (index === 1) {
                bunka.className = "typ " + polozka.typ;
            }
            if (index === 4) {
                bunka.className = "castka " + polozka.typ;
            }
        });

        // Buňka Akce s tlačítky na úpravu a smazání
        const bunkaAkce = radek.insertCell();
        bunkaAkce.className = "akce";

        const tlacitkoUpravit = document.createElement("button");
        tlacitkoUpravit.type = "button";
        tlacitkoUpravit.className = "upravit";
        tlacitkoUpravit.textContent = "Upravit";
        tlacitkoUpravit.addEventListener("click", function () {
            zacniUpravu(polozka.id);
        });
        bunkaAkce.append(tlacitkoUpravit);

        const tlacitkoSmazat = document.createElement("button");
        tlacitkoSmazat.type = "button";
        tlacitkoSmazat.className = "smazat";
        tlacitkoSmazat.textContent = "Smazat";
        tlacitkoSmazat.addEventListener("click", function () {
            smazatTransakci(polozka.id);
        });
        bunkaAkce.append(tlacitkoSmazat);
    });

    // Při každém překreslení přepočítáme i souhrn
    aktualizujSouhrn();
}

// Když uživatel odešle formulář, přidáme nebo upravíme záznam
formular.addEventListener("submit", function (udalost) {
    // Formulář běžně obnoví stránku, tomu zabráníme (muhahahaha)
    udalost.preventDefault();

    // Při úpravě necháme původní ID, jinak vygenerujeme nové
    let idZaznamu = Date.now();
    if (upravovaneId !== null) {
        idZaznamu = upravovaneId;
    }

    const zaznam = {
        id: idZaznamu,
        datum: datumInput.value,
        typ: typInput.value,
        kategorie: kategorieInput.value,
        popis: popisInput.value,
        castka: Number(castkaInput.value)
    };

    if (upravovaneId !== null) {
        // Nahradíme záznam se stejným ID novou verzí
        transakce = transakce.map(function (polozka) {
            if (polozka.id === upravovaneId) {
                return zaznam;
            }
            return polozka;
        });
        zobrazZpravu("Záznam byl upraven.");
        ukonciUpravu();
    } else {
        transakce.push(zaznam);
        zobrazZpravu("Záznam byl přidán.");
        formular.reset();
    }

    ulozData();
    vykresliTabulku();
});

// Tlačítko Zrušit úpravu vrátí formulář do původního stavu
tlacitkoZrusit.addEventListener("click", function () {
    ukonciUpravu();
    zobrazZpravu("Úprava byla zrušena.");
});

// Při načtení stránky načteme uložená data a zobrazíme je
nactiData();
vykresliTabulku();
