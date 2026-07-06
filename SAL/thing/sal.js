import { AnsiUp } from './ansi_up.js';
var ansi_up = new AnsiUp();
const car = document.getElementById("output");
let inp = "";
let currtext = "";


function AddText(strg){
    let f = ansi_up.ansi_to_html(strg); // Convert ANSI to HTML
    currtext = concat(currtext, f); // if car is "binglien", then adding "binglein" (as strg) would make "binglienbinglein"
}

AddText("Starting Load...");

AddText("\nStarting Load:\x1b[38;5;82m important functions \x1b[0m");
function getflags(strg){
    let opes = strg.split(' ');
    opes.splice(0);
    let a = [];
    let j = 0;
    if (opes.length == 0){
        return a;
    }
    for (const verr of opes) {
        if (verr[0] == "-") {
            let derr = verr.substr(1);
            for (char in derr){
                a.push(char)
            }
        }
        if (verr[1] == "-") {
            let derr = verr.substr(2);
            a.push(derr)
        }
        j++;
    }
    return a; 
}

AddText("\nLoaded\x1b[38;5;82m getflags \x1b[0m");

function getaflags(strg, flag){ // flag must be starting with a dash. instead of "a", use "-a"
    let opes = strg.split(' ');
    let tr = false;
    let J = 0;
    for(const f in opes){
        if(f == flag){
            if (opes[J+1][0] == "-"){
                return opes[J+1];
            } else {
                return "";
            }
            break;
        }
        J++;
    }
    if (tr){
        return "";
    }

}

AddText("\nLoaded\x1b[38;5;82m getaflags \x1b[0m");

AddText("\nLoaded\x1b[38;5;82m important functions \x1b[0m");

AddText("\nStarting Load:\x1b[38;5;82m cmds \x1b[0m");

function comm(strg){
    opes = strg.split(' ');
    opcode = opes[0];

    switch(opcode){
        case "echo":
            AddText(opes[1]);
    }
}

AddText("\nDone Load:\x1b[38;5;82m cmds \x1b[0m");

AddText("\nStarting Load:\x1b[38;5;82m input \x1b[0m");

const input = document.getElementById("input");

document.addEventListener("click", function(){
    input.focus();
    car.innerHTML = currtext + "\n" + inp;
});

input.addEventListener("keydown", e => {
    console.log(e.key);

    // Prevent the browser from typing into the textarea
    e.preventDefault();
    if(e == "\x1b"){
        comm(inp);
        inp = "";
    }
    inp = inp + e;

    car.innerHTML = currtext + "\n" + inp;
    // Send the key to your terminal
});