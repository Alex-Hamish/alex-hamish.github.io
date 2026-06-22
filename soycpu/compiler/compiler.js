// AAAAAAH
// this is tire ing AAA



const mem = new Uint8Array(65536);;
let regs = {"F1":0,"F2":0,"F3":0,"F4":0,"F5":0,"F6":0,"F7":0,"F8":0};
let pc = 0;
let running = true;

function exe(instrs) {
    instrs = line.split(" ");
    opcode = instrs[0];
    switch(opcode) {
        case "CLS":
            regs = {"F1":0,"F2":0,"F3":0,"F4":0};
            break;
        case "MOV":
            reg[instrs[1]] = instrs[2];
            break;
        case "ADD":
            reg[instrs[1]] += instrs[2];
            break;
        case "SUB":
            reg[instrs[1]] -= instrs[2];
            break;
        case "COP":
            reg[instrs[1]] = ref[instrs[2]];
            break;
        case "HLT":
            break asmsi;
    // WORK PLEASE
    break;
}
}