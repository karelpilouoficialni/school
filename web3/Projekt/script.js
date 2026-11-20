// Pole pro všechny transakce
let transakce = [];

// ID záznamu, který zrovna upravujeme. null znamená nový záznam.
let upravovaneId = null;

// Získáme formulář a vstupní pole
const formular = document.getElementById("formularTransakce");
const datumInput = document.getElementById("datum");
const typInput = document.getElementById("typ");
const kategorieInput = document.getElementById("kategorie");
const popisInput = document.getElementById("popis");
const castkaInput = document.getElementById("castka");

// Místa v HTML, kam vkládáme výsledky
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

// Klíč pro localStorage
const KLIC = "ucetnictvi_transakce";

// Uloží data do localStorage
function ulozData() {
    try {
        localStorage.setItem(KLIC, JSON.stringify(transakce));
    } catch (chyba) {
        console.error("Data se nepodařilo uložit.", chyba);
    }
}

// Načte data z localStorage
function nactiData() {
    try {
        const ulozenaData = localStorage.getItem(KLIC);
        if (ulozenaData !== null) {
            transakce = JSON.parse(ulozenaData);
            if (!Array.isArray(transakce)) {
                transakce = [];
            }
        }
    } catch (chyba) {
        transakce = [];
        console.error("Data se nepodařilo načíst.", chyba);
    }
}

// Zobrazí hlášku, chybu obarví červeně
function zobrazZpravu(text, jeChyba) {
    zprava.textContent = text;
    if (jeChyba) {
        zprava.className = "zprava chyba";
    } else {
        zprava.className = "zprava";
    }
}

// Najde záznam podle ID, když nenajde, vrátí null
function najdiTransakci(id) {
    for (let i = 0; i < transakce.length; i++) {
        if (transakce[i].id === id) {
            return transakce[i];
        }
    }
    return null;
}

// Vyplní formulář hodnotami záznamu
function naplFormular(polozka) {
    datumInput.value = polozka.datum;
    typInput.value = polozka.typ;
    kategorieInput.value = polozka.kategorie;
    popisInput.value = polozka.popis;
    castkaInput.value = polozka.castka;
}

// Přepne formulář do režimu úpravy
function zacniUpravu(id) {
    const polozka = najdiTransakci(id);
    if (polozka === null) {
        return;
    }

    upravovaneId = id;
    naplFormular(polozka);
    tlacitkoOdeslat.textContent = "Uložit změny";
    tlacitkoZrusit.hidden = false;
    zobrazZpravu("Upravuješ záznam. Ulož změny nebo úpravu zruš.");
}

// Vrátí formulář do režimu přidávání
function ukonciUpravu() {
    upravovaneId = null;
    formular.reset();
    tlacitkoOdeslat.textContent = "Přidat záznam";
    tlacitkoZrusit.hidden = true;
}

// Smaže záznam, jen když to uživatel potvrdí
function smazatTransakci(id) {
    const potvrzeni = confirm("Opravdu chceš smazat tento záznam?");
    if (!potvrzeni) {
        return;
    }

    for (let i = 0; i < transakce.length; i++) {
        if (transakce[i].id === id) {
            transakce.splice(i, 1);
            break;
        }
    }

    ulozData();
    vykresliTabulku();
    zobrazZpravu("Záznam byl smazán.");
}

// Převede datum z YYYY-MM-DD na dd-mm-yyyy
function formatujDatum(datum) {
    const rok = datum.substring(0, 4);
    const mesic = datum.substring(5, 7);
    const den = datum.substring(8, 10);
    return den + "-" + mesic + "-" + rok;
}

// Spočítá příjmy, výdaje a bilanci
function aktualizujSouhrn() {
    let prijmy = 0;
    let vydaje = 0;

    for (let i = 0; i < transakce.length; i++) {
        if (transakce[i].typ === "prijem") {
            prijmy = prijmy + transakce[i].castka;
        } else {
            vydaje = vydaje + transakce[i].castka;
        }
    }

    souhrnPrijmy.textContent = prijmy + " Kč";
    souhrnVydaje.textContent = vydaje + " Kč";
    souhrnBilance.textContent = (prijmy - vydaje) + " Kč";
}

// Vykreslí všechny záznamy do tabulky
function vykresliTabulku() {
    tabulkaTelo.textContent = "";
    tabulka.hidden = transakce.length === 0;
    prazdnyStav.hidden = transakce.length > 0;
    pocetZaznamu.textContent = "(" + transakce.length + ")";

    for (let i = 0; i < transakce.length; i++) {
        const polozka = transakce[i];
        const radek = tabulkaTelo.insertRow();

        let typText = "Výdaj";
        if (polozka.typ === "prijem") {
            typText = "Příjem";
        }

        let castkaText = "-" + polozka.castka + " Kč";
        if (polozka.typ === "prijem") {
            castkaText = "+" + polozka.castka + " Kč";
        }

        const hodnoty = [
            formatujDatum(polozka.datum),
            typText,
            polozka.kategorie,
            polozka.popis,
            castkaText
        ];

        for (let j = 0; j < hodnoty.length; j++) {
            const bunka = radek.insertCell();
            bunka.textContent = hodnoty[j];
            if (j === 1) {
                bunka.className = "typ " + polozka.typ;
            }
            if (j === 4) {
                bunka.className = "castka " + polozka.typ;
            }
        }

        const bunkaAkce = radek.insertCell();
        bunkaAkce.className = "akce";
        const idProHtml = parseInt(polozka.id, 10);
        bunkaAkce.innerHTML = '<button type="button" id="upravit' + idProHtml + '" class="upravit">Upravit</button>' +
            '<button type="button" id="smazat' + idProHtml + '" class="smazat">Smazat</button>';
        document.getElementById("upravit" + idProHtml).addEventListener("click", function () {
            zacniUpravu(polozka.id);
        });
        document.getElementById("smazat" + idProHtml).addEventListener("click", function () {
            smazatTransakci(polozka.id);
        });
    }

    aktualizujSouhrn();
}

// Zkontroluje, jestli jsou všechny údaje vyplněné
function overFormular() {
    if (datumInput.value === "") {
        zobrazZpravu("Vyplň datum.", true);
        return false;
    }
    if (typInput.value === "") {
        zobrazZpravu("Vyber typ.", true);
        return false;
    }
    if (kategorieInput.value === "") {
        zobrazZpravu("Vyplň kategorii.", true);
        return false;
    }
    if (popisInput.value === "") {
        zobrazZpravu("Vyplň popis.", true);
        return false;
    }

    const castka = parseInt(castkaInput.value, 10);
    if (castkaInput.value === "" || castka <= 0) {
        zobrazZpravu("Částka musí být větší než 0.", true);
        return false;
    }

    return true;
}

// Přidá nový záznam nebo uloží úpravu
function odeslatFormular(udalost) {
    // Formulář běžně obnoví stránku, tomu zabráníme (muhahahaha)
    udalost.preventDefault();

    if (!overFormular()) {
        return;
    }

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
        castka: parseInt(castkaInput.value, 10)
    };

    if (upravovaneId !== null) {
        for (let i = 0; i < transakce.length; i++) {
            if (transakce[i].id === upravovaneId) {
                transakce[i] = zaznam;
                break;
            }
        }
        zobrazZpravu("Záznam byl upraven.");
        ukonciUpravu();
    } else {
        transakce.push(zaznam);
        zobrazZpravu("Záznam byl přidán.");
        formular.reset();
    }

    ulozData();
    vykresliTabulku();
}

// Zruší úpravu a vyčistí formulář
function zrusitUpravu() {
    ukonciUpravu();
    zobrazZpravu("Úprava byla zrušena.");
}

formular.addEventListener("submit", odeslatFormular);
tlacitkoZrusit.addEventListener("click", zrusitUpravu);

nactiData();
vykresliTabulku();
