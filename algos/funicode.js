// funicode is a qr-like code.
// it is in 32x32 format normally
const textinput = document.getElementById("funitext");
const sumbit = document.getElementById("sumbit");
const choice = document.getElementById("v-select");
let currversion = "";

sumbit.addEventListener("click", function(){
    console.log("funicode in the making");
    if (choice.value == ""){
        console.warn("No version. Automatically setting it to v1.0.0");
        currversion = "1.0.0";
    } else {
        currversion = choice.value;
    }
    makefunicode(textinput.innerHTML);
    console.log("funicode has been made")


});

function makefunicode(text){
    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    canvas.width = 32;
    canvas.height = 32;

    ctx.lineWidth = 1;
    ctx.strokeStyle = "white";
    ctx.strokeRect(1, 1, 6, 6);



    console.log("added thingy")
    // Display it
    document.body.appendChild(canvas);
}