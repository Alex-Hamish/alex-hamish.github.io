import { AnsiUp } from './ansi_up.js';
var ansi_up = new AnsiUp();
const car = document.getElementById("output");
let inp = "";
let currtext = "";


function AddText(strg){
    let f = ansi_up.ansi_to_html(strg); // Convert ANSI to HTML
    currtext = currtext + f; // if car is "binglien", then adding "binglein" (as strg) would make "binglienbinglein"
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

function getarg(strg, pos){ // pos is the position (starting from 0), so if you want the command, use pos = 0. strings also shoudl work
    let opes = strg.split(" ");
    let ret = [];

    let temp = "";
    let inQuote = false;

    for (const f of opes) {
        if (!inQuote) {
            if (f.startsWith("'") || f.startsWith('"')) {
                temp = f;
                inQuote = true;

                // handles: 'hello'
                if (f.endsWith("'") || f.endsWith('"')) {
                    ret.push(temp);
                    temp = "";
                    inQuote = false;
                }
            } else {
                ret.push(f);
            }
        } else {
            temp += " " + f;

            if (f.endsWith("'") || f.endsWith('"')) {
                ret.push(temp);
                temp = "";
                inQuote = false;
            }
        }
    }

    if (inQuote) {
        AddText("\nWarning: Unmatched quote in input string.");
    } else {
        return ret[pos];
    }
    // im craving some chicken nuggets rn
}

AddText("\nLoaded\x1b[38;5;82m getarg \x1b[0m");

AddText("\nLoaded\x1b[38;5;82m important functions \x1b[0m");

AddText("\nStarting Load:\x1b[38;5;82m cmds \x1b[0m");

function comm(strg){
    let opes = strg.split(' ');
    let opcode = opes[0];
    let flags = getflags(strg);
    switch(opcode){
        case "echo":
            AddText(getarg(strg, 1) + "\n");
            break;
        case "clear":
            currtext = "";
            break;
        case "man":
            AddText(`
Welcome to MAN. This says everything about SAL.
Arguments are read normally:
"command op op "string op" --flag flag input -r "string flag input""
simple.
help prints the commands, man prints a guide on commands                
                `)
            break;
        case "help":
            AddText("Available commands:\n");
            AddText("echo: Echoes the input back to the terminal.\n");
            AddText("clear: Clears the terminal.\n");
            AddText("help: Displays this help message.\n");
            break;
        default:
            AddText("Unknown command: " + opcode + "\n");
    }
}

AddText("\nDone Load:\x1b[38;5;82m cmds \x1b[0m");

AddText("\nStarting Load:\x1b[38;5;82m input \x1b[0m");

AddText("\n") // important
const input = document.getElementById("input");

document.addEventListener("click", function(){
    input.focus();
    car.innerHTML = currtext + "\n" + inp;
});

input.addEventListener("keydown", e => {
    console.log(e.key);

    // Prevent the browser from typing into the textarea
    e.preventDefault();
    if(e.key == "Enter"){
        AddText(inp + "\n"); // Add the input to the output
        comm(inp); // command shit
        inp = "";
    } else if (e.key == "Backspace") {
        inp = inp.slice(0, -1);
    } else if (e.key.length === 1) {
        if (e.ctrlKey){
            inp = inp + "^" + e.key;
        } else {
            inp = inp + e.key;
        }
    }

    car.innerHTML = currtext + inp;
    // Send the key to your terminal
});
