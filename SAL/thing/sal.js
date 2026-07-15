import { AnsiUp } from './ansi_up.js';
var ansi_up = new AnsiUp();
const car = document.getElementById("output");
let inp = "";
let currtext = "";
let files = {};

let dict = {
    OSType: "Yek", // Yek... hamnurber.
    version: "1.0.2" // these two are hardcoded. You can only change them with special commands :P
}; // 1.0.0 didn't even have input, and 1.0.1 had echo only.

function AddText(strg){
    let f = ansi_up.ansi_to_html(strg); // Convert ANSI to HTML
    currtext = currtext + f; // if car is "binglien", then adding "binglein" (as strg) would make "binglienbinglein"
}

function save(){
    localStorage.setItem("dict", JSON.stringify(dict));
    localStorage.setItem("files", JSON.stringify(files));
}

function load(){
    let loaded = localStorage.getItem("dict");
    let loadedFiles = localStorage.getItem("files");
    if (loadedFiles) {
        files = JSON.parse(loadedFiles);
    }
    if (loaded) {
        dict = JSON.parse(loaded);
    }
}

AddText("Starting Load...");

load();

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
    let ninQuote = false;

    for (const f of opes) {
        if (!ninQuote) {
            if (f.startsWith("'") || f.startsWith('"')) {
                temp = f.slice(1);
                ninQuote = true;

                // handles: 'hello'
                if (f.endsWith("'") || f.endsWith('"')) {
                    ret.push(temp.slice(0,-1)); // removes the quote
                    temp = "";
                    ninQuote = false;
                }
            } else {
                ret.push(f);
            }
        } else {
            temp += " " + f;

            if (f.endsWith("'") || f.endsWith('"')) {
                ret.push(temp.slice(0,-1)); // removes the quote
                temp = "";
                ninQuote = false;
            }
        }
    }

    if (ninQuote) {
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
            AddText(`Welcome to MAN. This says everything about SAL.
Arguments are read normally:
"command op op "string op" --flag flag-input -r "string flag input""
simple.
help prints the commands, man prints a guide on commands
you can also set variables by using "variable = value" and get them by using "variable"
for example, "version" will return the version of SAL, and "version = 1.0.3" will set the version to 1.0.3, though this value is readonly and cannot be changed. 
You can also use "variables" to see all variables.

`)
            break;
        case "help":
            AddText("Available commands:\n");
            AddText("echo: Echoes the input back to the terminal.\n");
            AddText("clear: Clears the terminal.\n");
            AddText("variables: Displays all variables.\n");
            AddText("rmvar: Removes a variable. Usage: rmvar <variable_name>\n");
            AddText("backup: Creates a backup of the current variables and files.\n");
            AddText("man: Displays the manual.\n");
            AddText("help: Displays this help message.\n");
            break;
        case "variables":
            for (const [key, value] of Object.entries(dict)) {
              AddText(key + ": " + value + "\n");
            }
            break;
        case "rmvar":
            if (getarg(strg, 1) in dict){
                delete dict[getarg(strg, 1)];
            } else {
                AddText("Variable not found: " + getarg(strg, 1) + "\n");
            }
            break;
        case "backup":
            let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dict));
            let downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", "backup.json");
            document.body.appendChild(downloadAnchorNode); // required for firefox
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
            // thank you ProstoNekitos/burning_dumpster for this code.
            break;
        default:
            if(getarg(strg, 0) in dict){
                if(getarg(strg,1) == undefined){
                    AddText(dict[getarg(strg, 0)] + "\n")
                } else {
                    switch(getarg(strg,1)){
                        case "=":
                            if (getarg(strg, 0) == "version" || getarg(strg, 0) == "OSType") { // hardcoded
                                AddText("You cannot edit a readonly value. You have to change it via other methods.\n")
                            } else {
                                dict[getarg(strg, 0)] = getarg(strg, 2)
                            }
                            break;

                    }
                }
            } else {
                if (getarg(strg,1) == "="){
                    dict[getarg(strg, 0)] = getarg(strg, 2)
                } else {
                    AddText("Unknown command or variable:" + " " + opcode + "\n");
                }
            }
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

AddText("\n\x1b[38;5;196mWARNING: This is a very early version of SAL. It is not stable and may have bugs. Please report any issues to the developer.\x1b[0m");
AddText("\n\x1b[38;5;196mWARNING: Your browser may delete your files and folders. Please backup your data by using <em>backup</em> before using this terminal.\x1b[0m");

window.addEventListener("beforeunload", save);