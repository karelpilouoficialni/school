# Spendly

Jednoduchá webová aplikace pro evidenci příjmů a výdajů. Školní projekt Webové technologie 2026/2027.

## Spuštění

Stačí otevřít `index.html` v prohlížeči. Žádný server, knihovny ani backend nejsou potřeba. Data se ukládají do `localStorage`, takže přežijí obnovení stránky (F5).

## Funkce

- přidávání, zobrazení, úprava a mazání transakcí (s potvrzením)
- správa kategorií (druhý formulář)
- vyhledávání, filtrování a řazení záznamů
- souhrn: příjmy, výdaje a bilance
- export a import CSV

## Formát CSV

Soubor používá UTF-8, oddělovač `;` a uvozovky kolem textových polí. První řádek je hlavička:

```
id;datum;typ;kategorie;popis;castka
```

Příklad řádku:

```
1;2026-01-15;prijem;Mzda;"Práce, leden";25000
```

Při importu se kontroluje hlavička, datové typy, duplicity a vadné řádky. Přepsání existujících záznamů se vždy nechá potvrdit uživatelem.

## Využití AI

AI (OpenCode) byla použita především k vytvoření HTML a CSS. U JavaScriptu byla využita jen trochu, hlavně k vysvětlení kódu ve chvílích, kdy jsem se zasekl a nevěděl, jak dál. Každý krok jsem si sám ověřil a upravil, rozumím každému řádku a umím ho u obhajoby vysvětlit.

## Testovací data

Složka `test-data/` obsahuje soubory `validni.csv`, `chybne.csv` a `specialni-znaky.csv`. Doplní se v posledním kroku.

<details>
<summary>TO DO, plán kroků</summary>

- [x] 1. Struktura projektu, prázdné soubory, README
- [x] 2. HTML kostra: formulář, tabulka, místo pro souhrn
- [x] 3. Základní CSS (rozložení, responzivita)
- [x] 4. JS: pole transakcí a přidání záznamu (bez validace)
- [x] 5. Vykreslení tabulky přes DOM (textContent) + prázdný stav
- [x] 6. Uložení a načtení z localStorage
- [x] 7. Mazání s potvrzením
- [x] 8. Úprava záznamu
- [ ] 9. Validace formuláře (povinná pole, rozsahy, pravidlo navíc)
- [x] 10. Souhrn: příjmy, výdaje, bilance
- [ ] 11. Filtrování, vyhledávání, řazení
- [ ] 12. Druhý formulář (kategorie)
- [ ] 13. CSV export
- [ ] 14. CSV import s kontrolou chyb a duplicit
- [ ] 15. test-data, README, finální úpravy vzhledu a přístupnosti

</details>
