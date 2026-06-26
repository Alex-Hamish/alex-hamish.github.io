// AAAAAAH
// this is tire ing AAA



let mem = new Uint8Array(65536); // mem changes
let stack = []; // stack :p.

let regs = {"F1":0,"F2":0,"F3":0,"F4":0,"F5":0,"F6":0,"F7":0,"F8":0};
let pc = 0;
let running = true;
const asms = document.getElementById("asms") // never chaners
const memi = document.getElementById("txtw");
function overflow(num) {
    let a = num;
    while (a > 255) {
        a -= 255;
    }
    return a;
}

function exe(line) {
    console.log(line);
    let instrs = line.split(" ");
    let opcode = instrs[0];
    let s1 = parseInt(instrs[1], 16);
    let s2 = parseInt(instrs[2], 16);

    switch (opcode) {
        case "CLS":
            regs = {"F1":0,"F2":0,"F3":0,"F4":0,"F5":0,"F6":0,"F7":0,"F8":0};
            break;
        case "MOV":
            regs[instrs[1]] = overflow(s2);
            break;
        case "ADD":
            regs[instrs[1]] = overflow(regs[instrs[1]] + s2);
            break;
        case "SUB":
            regs[instrs[1]] = overflow(regs[instrs[1]] - s2);
            break;
        case "COP":
            regs[instrs[1]] = overflow(ref[instrs[2]]);
            break;
        case "HLT":
            running = false;
            break;
        case "JMP":
            pc = s1;
            break;
        case "JYZ":
            if (regs[instrs[1]] === 0) {
                pc = s2;
            }
            break;
        case "JNZ":
            if (regs[instrs[1]] !== 0) {
                pc = s2;
            }
            break;
        case "INC":
            regs[instrs[1]] = overflow(regs[instrs[1]] + 1);
            break;
        case "DEC":
            regs[instrs[1]] = overflow(regs[instrs[1]] - 1);
            break;
        case "SYS":
            // reserved for future use
            // also a ground for my sanity to be questioned
            // FUCK
            // i think i have autism
            // i am really into planes.
            // i have a lot of knowledge about planes.
            // have you heard of the Boeing 747?
            // lego made a lego set with the 747 and the space shuttle and i built it so yippee!
            // hapsburmger
            // yeah ok i need to fucking actually do shit
        case "SKP":
            pc += s1;
            break;
        case "SKR":
            pc += regs[instrs[1]];
            break;
        case "SKB":
            pc -= s1;
            break;
        case "SBR":
            pc -= regs[instrs[1]];
            break;
        case "ADR":
            regs[instrs[1]] = overflow(regs[instrs[2]] + regs[instrs[3]]);
            break;
        case "SBR":
            regs[instrs[1]] = overflow(regs[instrs[2]] - regs[instrs[3]]);
            break;
        case "MUL":
            regs[instrs[1]] = overflow(regs[instrs[2]] * s2);
            break;
        case "DIV":
            regs[instrs[1]] = overflow(parseInt(regs[instrs[2]] / s2));
            break;
        case "MLR":
            regs[instrs[1]] = overflow(regs[instrs[2]] * regs[instrs[3]]);
            break;
        case "DVR":
            regs[instrs[1]] = overflow(parseInt(regs[instrs[2]] / regs[instrs[3]]));
            break;
        case "POP":
            regs[instrs[1]] = stack.pop();
            break;
        case "PSH":
            stack.push(regs[instrs[1]]);
            break;
        case "SWP":
            let temp = regs[instrs[1]];
            regs[instrs[1]] = regs[instrs[2]];
            regs[instrs[2]] = temp;
            break;
        case "FLP":
            // flip the bits of the register
            regs[instrs[1]] = overflow(~regs[instrs[1]]);
            break;
        case "COM":
            // comment thingy
            break;
        case "SOY":
            // soy the register
            regs[instrs[1]] = 0xFF;
            break;
        case "BLAHAJ":
            // i love the blahaaj shark plushie from ikea
            break;
        case "BSL":
            // bit shift left
            regs[instrs[1]] = overflow(regs[instrs[1]] << s2);
            break;
        case "BSR":
            // bit shift right
            regs[instrs[1]] = overflow(regs[instrs[1]] >> s2);
            break;
        case "AND":
            regs[instrs[1]] = overflow(regs[instrs[2]] & regs[instrs[3]]);
            break;
        case "ORR":
            regs[instrs[1]] = overflow(regs[instrs[2]] | regs[instrs[3]]);
            break;
        case "XOR":
            regs[instrs[1]] = overflow(regs[instrs[2]] ^ regs[instrs[3]]);
            break;
        case "NOT":
            regs[instrs[1]] = overflow(~regs[instrs[2]]);
            break;
        default:
            console.error(`Unknown opcode: ${opcode}`);
            running = false;
            break;
    }
}

function compile(){
    regs = {"F1":0,"F2":0,"F3":0,"F4":0,"F5":0,"F6":0,"F7":0,"F8":0};
    pc = 0;
    running = true;
    console.log(asms.value);
    let lines = asms.value.trim().split(/\r?\n/).filter(Boolean);

    while (running && pc < lines.length) {
        const prevPc = pc;
        exe(lines[pc]);

        if (running && pc === prevPc) {
            pc += 1;
        }

        console.log(regs["F1"] + " " + regs["F2"] + " " + regs["F3"] + " " + regs["F4"] + " " + regs["F5"] + " " + regs["F6"] + " " + regs["F7"] + " " + regs["F8"]);
    }
}

const btn = document.getElementById("copmepi");

document.addEventListener("DOMContentLoaded", () => {
  if (btn) {
    btn.addEventListener("click", compile); 
  }
});
