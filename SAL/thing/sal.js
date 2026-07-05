import { AnsiUp } from './ansi_up.js';
var ansi_up = new AnsiUp();
const car = document.getElementById("output");

function AddText(strg){
    let f = ansi_up.ansi_to_html(strg); // Convert ANSI to HTML
    car.innerHTML = car.innerHTML + f; // if car is "binglien", then adding "binglein" (as strg) would make "binglienbinglein"
}

function LOAD(){
    // Start reading stuff
    document.getElementById("ld1").remove(); // Remove that button !!!
    AddText("Starting Load...");
    AddText("\nStarting Load:\x1b[38;5;91m COMMANDS");
}

document.getElementById("ld1").addEventListener("click", function(){
    LOAD();
})