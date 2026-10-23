let kalendar = document.getElementById("kalendar");
let kalendarTlacitko = document.getElementById("kalendarTlacitko");
let vysledekKalendar = document.getElementById("vysledekKalendar");

function vypisKalendar() {
    if (!kalendar.value) {
        alert("Zadejte datum!");
        return;
    }

    let datum = kalendar.value; 
    let rok = parseInt(datum.substring(0, 4));
    let mesic = parseInt(datum.substring(5, 7));
    let dny = new Date(rok, mesic, 0).getDate(); 
    let vystup = "";

    for (let j = 1; j <= mesic; j++) {
            for (let i = 1; i <= dny; i++) {
        vystup += "<p>" + i + "." + mesic + "." + rok + "</p>";
    }
    }

    vysledekKalendar.innerHTML = vystup;
}




kalendarTlacitko.addEventListener("click", vypisKalendar);