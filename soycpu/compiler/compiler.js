// AAAAAAH
// this is tire ing AAA



const mem = new Uint8Array(65536);;
let regs = {"F1":0,"F2":0,"F3":0,"F4":0,"F5":0,"F6":0,"F7":0,"F8":0};
let pc = 0;
let running = true;
function overflow(num) {
    let a = num;
    while (a > 255){
        a -= 255;
    }
    return a;
};
function exe(line) {
    let instrs = line.split(" ");
    let opcode = instrs[0];
    let s1 = parseInt(instrs[1], 16);
    let s2 = parseInt(instrs[2], 16);
    switch(opcode) {
        case "CLS":
            regs = {"F1":0,"F2":0,"F3":0,"F4":0,"F5":0,"F6":0,"F7":0,"F8":0};
            break;
        case "MOV":
            reg[instrs[1]] = s2;
            reg[instrs[1]] = overflow(reg[instrs[1]]);
            break;
        case "ADD":
            reg[instrs[1]] += s2;
            reg[instrs[1]] = overflow(reg[instrs[1]]);
            break;
        case "SUB":
            reg[instrs[1]] -= s2;
            reg[instrs[1]] = overflow(reg[instrs[1]]);
            break;
        case "COP":
            reg[instrs[1]] = ref[instrs[2]];
            reg[instrs[1]] = overflow(reg[instrs[1]]);
            break;
        case "HLT":
            running = false;
            pc = 0
            break;
        case "JMP":
            pc = s1;
            break;
        case JYZ:
            if (reg[instrs[1]] == 0){
                pc = s2;
            }
            break;
        case JNZ:
            if (reg[instrs[1]] != 0){
                pc = s2;
            }
            break;
        case INC:
            reg[instrs[1]] =+ 1
            break;
        case DEC:
            reg[instrs[1]] =- 1
            break;
    // WORK PLEASE
    break;
}
}

function compile(){
    
}