var ansi_up = new AnsiUp();
const car = document.getElementById("output");

function AddText(strg){
    var convert = new Convert();
    f = ansi_up.ansi_to_html(strg); // Convert ANSI to HTML
    car.innerHTML = car.innerHTML + htmlSnippet; // if car is "binglien", then adding "binglein" (as strg) would make "binglienbinglein"
}

function LOAD(){
    // Start reading stuff
    document.getElementById("ld1").remove(); // Remove that button !!!
    AddText("ST-LOAD");
}

document.getElementById("ld1").addEventListener("click", LOAD());