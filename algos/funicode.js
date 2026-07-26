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
    ctx.imageSmoothingEnabled = false;
    canvas.width = 32;
    canvas.height = 32;

    const ctx = canvas.getContext("2d");

    // Create a blank 32x32 image
    const img = ctx.createImageData(32, 32);

    // Set a pixel
    function setPixel(x, y, bit) {
        const i = (y * 32 + x) * 4;
        let a = 255;
        switch (bit){
            case 0:
                img.data[i]     = 0;
                img.data[i + 1] = 0;
                img.data[i + 2] = 0;
                img.data[i + 3] = a;
                break;
            case 1:
                img.data[i]     = a;
                img.data[i + 1] = a;
                img.data[i + 2] = a;
                img.data[i + 3] = a;
                break;
            case 2:
                img.data[i]     = a;
                img.data[i + 1] = 0;
                img.data[i + 2] = 0;
                img.data[i + 3] = a;
                break;
            case 3:
                img.data[i]     = 0;
                img.data[i + 1] = a;
                img.data[i + 2] = 0;
                img.data[i + 3] = a;
                break;
            case 4:
                img.data[i]     = a;
                img.data[i + 1] = a;
                img.data[i + 2] = 0;
                img.data[i + 3] = a;
                break;
            case 5:
                img.data[i]     = 0;
                img.data[i + 1] = 0;
                img.data[i + 2] = a;
                img.data[i + 3] = a;
                break;
            case 6:
                img.data[i]     = a;
                img.data[i + 1] = 0;
                img.data[i + 2] = a;
                img.data[i + 3] = a;
                break;
            case 7:
                img.data[i]     = 0;
                img.data[i + 1] = a;
                img.data[i + 2] = a;
                img.data[i + 3] = a;
                break;
        }
    }
    ctx.lineWidth = 1;
    ctx.strokeRect(1, 1, 6, 6);
    ctx.strokeRect(3, 3, 4, 4);
    
    console.log("added thingy")
    // Display it
    document.body.appendChild(canvas);
}