// funicode is a qr-like code.
// it is in 32x32 format normally
const textinput = document.getElementById("funitext");
const sumbit = document.getElementById("sumbit");
const choice = document.getElementById("v-select");
let image = new Image();
let currversion = "";

sumbit.addEventListener("click", function(){
    console.log("funicode in the making");
    if (choice.value == ""){
        console.warn("No version. Automatically setting it to v1.0.0");
        currversion = "1.0.0";
    } else {
        currversion = choice.value;
    }
    makefunicode(textinput.value);
    console.log("funicode has been made")


});

function makefunicode(text){
    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    canvas.width = 32;
    canvas.height = 32;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 32, 32);

    // Draw the funicode
    ctx.lineWidth = 0;
    ctx.strokeStyle = "white";
    if (currversion == "1.0.0") {
        image.src = `v1.0.0.png`;
    } else if (currversion == "c1.0.0") {
        image.src = `c1.0.0.png`;
    }
    // i need to get the length of the text and then if it's bigger than 24*32 then 24*64 and go up by 32 until it fits
    let width = 32;
    for (let i = 0; i < text.length*8; i++) {
        canvas.height = width;
        ctx.drawImage(image, 0, width);
        if (i > width) {
            width += 32;
        }
    }


    console.log("added thingy");
    // Display it
    document.body.appendChild(canvas);
}