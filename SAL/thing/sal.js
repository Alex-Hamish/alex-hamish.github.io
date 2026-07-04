const consolearea = document.getElementById("Crea");

function AddText(strg){
    a = document.createElement("p");
    a.innerHTML = strg;
    consolearea.append(a)
}

function LOAD(){
    // Start reading stuff
    AddText("LD-0")
}

document.getElementById("ld1").addEventListener("click", LOAD());