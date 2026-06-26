// AAAAAAH
// this is tire ing AAA



let mem = new Uint8Array(65536); // mem changes

let regs = {"F1":0,"F2":0,"F3":0,"F4":0,"F5":0,"F6":0,"F7":0,"F8":0};
let pc = 0;
let running = true;
const asms = document.getElementById("asms") // never chaners
const memi = document.getElementById("txtw");
function overflow(num) {
    let a = num;
    while (a > 255){
        a -= 255;
    }
    return a;
};
function exe(line) {
    console.log(line);
    let instrs = line.split(" ");
    let opcode = instrs[0];
    let s1 = parseInt(instrs[1], 16);
    let s2 = parseInt(instrs[2], 16);
    switch(opcode) {
        case "CLS":
            regs = {"F1":0,"F2":0,"F3":0,"F4":0,"F5":0,"F6":0,"F7":0,"F8":0};
            break;
        case "MOV":
            regs[instrs[1]] = s2;
            regs[instrs[1]] = overflow(regs[instrs[1]]);
            break;
        case "ADD":
            regs[instrs[1]] += s2;
            regs[instrs[1]] = overflow(regs[instrs[1]]);
            break;
        case "SUB":
            regs[instrs[1]] -= s2;
            regs[instrs[1]] = overflow(regs[instrs[1]]);
            break;
        case "COP":
            regs[instrs[1]] = ref[instrs[2]];
            regs[instrs[1]] = overflow(regs[instrs[1]]);
            break;
        case "HLT":
            running = false;
            break;
        case "JMP":
            pc = s1;
            break;
        case "JYZ":
            if (regs[instrs[1]] == 0){
                pc = s2;
            }
            break;
        case "JNZ":
            if (regs[instrs[1]] != 0){
                pc = s2;
            }
            break;
        case "INC":
            regs[instrs[1]] =+ 1
            break;
        case "DEC":
            regs[instrs[1]] =- 1
            break;
    // WORK PLEASE
    break;
}
}

function compile(){
    regs = {"F1":0,"F2":0,"F3":0,"F4":0,"F5":0,"F6":0,"F7":0,"F8":0};
    pc = 0;
    running = true;
    console.log(asms.value);
    let lines = asms.value.trim().split(/\r?\n/);
    stahp: while(running) {
        while(pc < lines.length) {
            exe(lines[pc]);
            console.log(regs["F1"] + " " + regs["F2"] + " " + regs["F3"] + " " + regs["F4"] + " " + regs["F5"] + " " + regs["F6"] + " " + regs["F7"] + " " + regs["F8"]);

        }
        if (lines[pc].split(" ")[0] == "HLT"){
            running = false;
            break stahp;
        }
    }
}

const btn = document.getElementById("copmepi");

document.addEventListener("DOMContentLoaded", () => {
  if (btn) {
    btn.addEventListener("click", compile); 
  }
});
