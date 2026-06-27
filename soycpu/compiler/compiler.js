// AAAAAAH
// this is tire ing AAA



let mem = new Uint8Array(65536); // mem changes
let stack = []; // stack :p.

let outputtype = 0
let regs = {"F1":0,"F2":0,"F3":0,"F4":0,"F5":0,"F6":0,"F7":0,"F8":0};
let pc = 0;
let running = true;
const asms = document.getElementById("asms") // never chaners
const memi = document.getElementById("txtw");
const screen = document.getElementById("screen");
function overflow(num) {
    let a = num;
    while (a > 255) {
        a -= 255;
    }
    return a;
}

function exe(line) {
    let instrs = line.split(" ");
    let opcode = instrs[0];
    let s1 = parseInt(instrs[1], 16);
    let s2 = parseInt(instrs[2], 16);

    switch (opcode) {
        case "CLS":
            regs = {"F1":0,"F2":0,"F3":0,"F4":0,"F5":0,"F6":0,"F7":0,"F8":0};
            mem = new Uint8Array(65536);
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
        case "NOP":
            // do nothing
            break;
        case "LOD":
            // load from memory
            regs[instrs[1]] = mem[s2];
            break;
        case "SOR":
            // store to memory
            mem[s1] = regs[instrs[2]];
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
    const ctx = screen.getContext("2d");
    ctx.clearRect(0, 0, screen.width, screen.height);
    let lines = asms.value.trim().split(/\r?\n/).filter(Boolean);
    if(outputtype == 0){
        while (running && pc < lines.length) {
            const prevPc = pc;
            exe(lines[pc]);
            // memi is a <p> element that reads mem bytes 0 to 32 and then displays them in ascii format
            memi.textContent = `${Array.from(mem.slice(0, 32)).map(byte => String.fromCharCode(byte)).join('')}`;
            if (running && pc === prevPc) {
                pc += 1;
            }
        }
    } else if(outputtype == 1){
        while (running && pc < lines.length) {
            const prevPc = pc;
            exe(lines[pc]);
            // screen is a 64x64 <canvas> element that reads mem bytes 0 to 512 and then displays them in b&w pixel format
            // each byte contributes 8 pixels, and every 8 bytes make one row of 64 pixels
            const imageData = ctx.createImageData(64, 64);
            const pixels = imageData.data;

            for (let i = 0; i < 512; i++) {
                const byte = mem[i];
                const row = Math.floor(i / 8);
                const colByte = i % 8;

                for (let bit = 0; bit < 8; bit++) {
                    const x = colByte * 8 + bit;
                    const y = row;
                    const pixelIndex = (y * 64 + x) * 4;
                    const isOn = (byte >> (7 - bit)) & 1;
                    const value = isOn ? 0 : 255; // black for 1, white for 0

                    pixels[pixelIndex] = value;
                    pixels[pixelIndex + 1] = value;
                    pixels[pixelIndex + 2] = value;
                    pixels[pixelIndex + 3] = 255;
                }
            }

            ctx.putImageData(imageData, 0, 0);

            if (running && pc === prevPc) {
                pc += 1;
            }
        }
    }
}

const btn = document.getElementById("copmepi");

document.addEventListener("DOMContentLoaded", () => {
  if (btn) {
    btn.addEventListener("click", compile); 
  }
});

const screeno = document.getElementById("screeno");
const texto = document.getElementById("texto");
const txt = document.getElementById("txt");
const scree = document.getElementById("screenth");


txt.addEventListener("click", function() {
    outputtype = 0
    texto.style.display = "block";
    screeno.style.display = "none";
});

scree.addEventListener("click", function() {
    outputtype = 1
    texto.style.display = "none";
    screeno.style.display = "block";
});