var Convert = require('ansi-to-html');
const consolearea = document.getElementById("Crea");

function AddText(strg){
    var convert = new Convert();
    f = convert.toHtml(strg); // Convert ANSI to HTML
    // some DOM shit
    console.log(f);    
}

function LOAD(){
    // Start reading stuff
    document.getElementById("ld1").remove(); // Remove that button !!!
    AddText("ST-LOAD");
}

document.getElementById("ld1").addEventListener("click", LOAD());