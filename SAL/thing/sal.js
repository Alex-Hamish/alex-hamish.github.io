import { AnsiUp } from './ansi_up.js';
var ansi_up = new AnsiUp();
const car = document.getElementById("output");
let inp = "";
let currtext = "";
let files = {};
let examplefile = {
    "name": "example.exa", // the file ext exa is a custom file extension. it can be up to 4 chars.
    "magicword": "!exa-1!", // because this is a file, it has a magicword. this is used to identify the file in the files object. it can be anything, but it should be unique.
    "content": "This is an example file." // exa is a txt confirmed.
}
let examplefile2 = {
    "name": "zipfile.zip",
    "magicword": "!zip!", // zip files are folder files. unzip literally just changes the magic word and the name.
    "content": {
        "file1.txt": {
            "name": "file1.txt",
            "magicword": "!txt!", // it's often just the file extension, but it can be anything. just make sure it's unique.
            "content": "This is a text file inside a zip file to show that SAL can handle zip files."
        },
        "folder": {
            "name": "folder",
            "magicword": "!f!", // FOLDER! (folder magicword)
            "content": {
                "file2.txt": {
                    "name": "file2.txt",
                    "magicword": "!txt2!",
                    "content": "This is a text file inside a folder inside a zip file to show that SAL can handle zip files."
                }
            }
        }
    }
}

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
    } else {
        files[examplefile.magicword] = examplefile;
        files[examplefile2.magicword] = examplefile2;
    }
    if (loaded) {
        dict = JSON.parse(loaded);
    }
}

function waitForKey() {
    return new Promise(resolve => {
        function onKey(e) {
            document.removeEventListener("keydown", onKey);
            resolve(e.key); // Returns the key that was pressed
        }

        document.addEventListener("keydown", onKey);
    });
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

function yesno(){
    // this is a thingy that gets y/n prompts
    let a = waitForKey();
    if (a == "y" || a == "Y"){
        return true;
    } else {
        return false;
    }
}

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
            AddText("save: Saves the current variables and files to localStorage.\n");
            AddText("load: Loads the variables and files from localStorage.\n");
            AddText("loadbackup: Loads a backup of the current variables and files from a JSON file.\n");
            AddText("cat: Displays the content of a file. Usage: cat <file_name>\n");
            AddText("ls: Lists all files.\n");
            AddText("unzip: Unzips a zip file into a folder. Usage: unzip <zip_file_name>\n");
            AddText("zip: Zips a folder into a zip file. Usage: zip <folder_name>\n");
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
        case "save":
            save();
            AddText("Saved variables and files to localStorage.\n");
            break;
        case "load":
            load();
            AddText("Loaded variables and files from localStorage.\n");
            break;
        case "loadbackup":
            let inputElement = document.createElement('input');
            inputElement.type = 'file';
            inputElement.accept = '.json';
            inputElement.addEventListener('change', (event) => {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const backupData = JSON.parse(e.target.result);
                        if (backupData.dict && backupData.files) {
                            dict = backupData.dict;
                            files = backupData.files;
                            AddText("Backup loaded successfully.\n");
                        } else {
                            AddText("Invalid backup file format.\n");
                        }
                    } catch (error) {
                        AddText("Error loading backup: " + error.message + "\n");
                    }
                };
                reader.readAsText(file);
            });
            inputElement.click();
            break;
        case "cat":
            let fileToCat = getarg(strg, 1);
            let found = false;
            for (const [key, file] of Object.entries(files)) {
                if (file.name === fileToCat) {
                    if (file.magicword === "!zip!" || file.magicword === "!f!") {
                        AddText("Cannot cat a folder or zip file. Use unzip or navigate into the folder.\n");
                    } else {
                        AddText(file.content + "\n");
                    }
                    found = true;
                    break;
                }
            }
            if (!found) {
                AddText("File not found: " + fileToCat + "\n");
            }
            break;
        case "ls":
            for (const [key, file] of Object.entries(files)) {
                AddText(file.name + "\n");
            }
            break;
        case "unzip":
            let fileToUnzip = getarg(strg, 1);
            let foundUnzip = false;
            for (const [key, file] of Object.entries(files)) {
                if (file.name === fileToUnzip) {
                    if (file.magicword === "!zip!") {
                        files[file.magicword] = "!f!"; // change magicword to folder
                        files[file.name] = file.slice(0, -4); // remove .zip from name
                        AddText("Unzipped " + fileToUnzip + " into a folder.\n");
                    } else {
                        AddText("File is not a zip file: " + fileToUnzip + "\n");
                    }
                    foundUnzip = true;
                    break;
                }
            }
            if (!foundUnzip) {
                AddText("File not found: " + fileToUnzip + "\n");
            }
            break;
        case "zip":
            let fileToZip = getarg(strg, 1);
            let foundZip = false;
            for (const [key, file] of Object.entries(files)) {
                if (file.name === fileToZip) {
                    if (file.magicword === "!f!") {
                        files[file.magicword] = "!zip!"; // change magicword to zip
                        files[file.name] = file.name + ".zip"; // add .zip to name
                        AddText("Zipped " + fileToZip + " into a zip file.\n");
                    } else {
                        AddText("File is not a folder: " + fileToZip + "\n");
                    }
                    foundZip = true;
                    break;
                }
            }   
            if (!foundZip) {
                AddText("File not found: " + fileToZip + "\n");
            }
            break;
        case "debug":
            if (getarg(strg, 1) == "#0[[FILE]]") {
                AddText("Are you sure? This will add the example files. (y/n)\n");
                yesno().then(yn => {
                    if (yn) {
                        files[examplefile.magicword] = examplefile;
                        files[examplefile2.magicword] = examplefile2;
                        AddText("Example files added.\n");
                    } else {
                        AddText("Operation cancelled.\n");
                    }
                });

            } else {
                AddText("Unknown debug command: " + getarg(strg, 1) + "\n");
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
AddText("\n\x1b[38;5;196mWARNING: These warnings warn you about potential risks other than this warning that warns you about warnings warning you about risks (say that five times fast).\x1b[0m");

AddText("\n"); // because of the warnings, we need a new line before the input


window.addEventListener("beforeunload", save);