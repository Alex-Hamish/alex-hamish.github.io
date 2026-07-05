import { AnsiUp } from './ansi_up.js';
var ansi_up = new AnsiUp();
const car = document.getElementById("output");

function AddText(strg){
    let f = ansi_up.ansi_to_html(strg); // Convert ANSI to HTML
    car.innerHTML = car.innerHTML + f; // if car is "binglien", then adding "binglein" (as strg) would make "binglienbinglein"
}

function LOAD(){
    // Start reading stuff
    AddText("Starting Load...");
    AddText("\nStarting Load:\x1b[38;5;91m input");
}


const input = document.getElementById("input");

document.addEventListener("click", function(){
    input.focus();
    LOAD();
});

input.addEventListener("keydown", e => {
    console.log(e.key);

    // Prevent the browser from typing into the textarea
    e.preventDefault();

    // Send the key to your terminal
});