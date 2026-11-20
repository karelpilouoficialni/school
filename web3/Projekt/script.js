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

// Převede částku na kladné číslo, 0 znamená neplatnou hodnotu
function upravCastku(hodnota) {
    const text = String(hodnota).replace(",", ".");
    const castka = parseFloat(text);
    if (isNaN(castka) || castka === 0) {
        return 0;
    }
    return Math.abs(castka);
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
            for (let i = 0; i < transakce.length; i++) {
                const castka = upravCastku(transakce[i].castka);
                if (castka === 0) {
                    transakce.splice(i, 1);
                    i--;
                } else {
                    transakce[i].castka = castka;
                }
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

// Převede datum z YYYY-MM-DD na D. M. YYYY
function formatujDatum(datum) {
    if (!datum || typeof datum !== "string" || datum.length < 10) {
        return "–";
    }
    const rok = parseInt(datum.substring(0, 4), 10);
    const mesic = parseInt(datum.substring(5, 7), 10);
    const den = parseInt(datum.substring(8, 10), 10);
    if (isNaN(rok) || isNaN(mesic) || isNaN(den)) {
        return "–";
    }
    return den + ". " + mesic + ". " + rok;
}

// Spočítá příjmy, výdaje a bilanci
function aktualizujSouhrn() {
    let prijmy = 0;
    let vydaje = 0;

    for (let i = 0; i < transakce.length; i++) {
        const castka = upravCastku(transakce[i].castka);
        if (castka > 0) {
            if (transakce[i].typ === "prijem") {
                prijmy = prijmy + castka;
            } else {
                vydaje = vydaje + castka;
            }
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

        const castka = upravCastku(polozka.castka);
        let castkaText = "-" + castka + " Kč";
        if (polozka.typ === "prijem") {
            castkaText = "+" + castka + " Kč";
        }

        let kategorieText = polozka.kategorie;
        if (kategorieText === "" || kategorieText === undefined) {
            kategorieText = "–";
        }

        let popisText = polozka.popis;
        if (popisText === "" || popisText === undefined) {
            popisText = "–";
        }

        const hodnoty = [
            formatujDatum(polozka.datum),
            typText,
            kategorieText,
            popisText,
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

// Zkontroluje kladné číslo, povolí jednu tečku nebo čárku
function obsahujeCislo(text) {
    if (text === "") {
        return false;
    }
    let pocetCislic = 0;
    let pocetDesetinnych = 0;
    for (let i = 0; i < text.length; i++) {
        const znak = text.substring(i, i + 1);
        if (znak === "." || znak === ",") {
            pocetDesetinnych++;
            if (pocetDesetinnych > 1) {
                return false;
            }
        } else if (znak >= "0" && znak <= "9") {
            pocetCislic++;
        } else {
            return false;
        }
    }
    return pocetCislic > 0;
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

    const castka = upravCastku(castkaInput.value);
    if (castkaInput.value === "" || !obsahujeCislo(castkaInput.value) || castka === 0) {
        zobrazZpravu("Částka musí být kladné číslo.", true);
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

    const castka = upravCastku(castkaInput.value);
    if (castka === 0) {
        zobrazZpravu("Částka musí být kladné číslo.", true);
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
        castka: castka
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

// Zablokuje minus, e, plus a jiné neplatné znaky
function zakazatNeplatneZnaky(udalost) {
    const klaves = udalost.key;
    if (klaves === "-" || klaves === "e" || klaves === "E" || klaves === "+") {
        udalost.preventDefault();
        zobrazZpravu("Částka musí být kladné číslo.", true);
        return;
    }
    if (klaves.length === 1 && klaves !== "." && klaves !== "," && (klaves < "0" || klaves > "9")) {
        udalost.preventDefault();
        zobrazZpravu("Částka musí být kladné číslo.", true);
    }
}

// Zkontroluje text vložený z schránky
function overVlozenyText(udalost) {
    const vlozenyText = udalost.clipboardData.getData("text");
    if (!obsahujeCislo(vlozenyText)) {
        udalost.preventDefault();
        zobrazZpravu("Částka musí být kladné číslo.", true);
    }
}

formular.addEventListener("submit", odeslatFormular);
tlacitkoZrusit.addEventListener("click", zrusitUpravu);
castkaInput.addEventListener("keydown", zakazatNeplatneZnaky);
castkaInput.addEventListener("paste", overVlozenyText);

nactiData();
vykresliTabulku();
