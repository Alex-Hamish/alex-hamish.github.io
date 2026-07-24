// funicode is a qr-like code.
// it is in 32x32 format normally
const textinput = document.getElementById("funitext");
const sumbit = document.getElementById("funiti");

sumbit.addEventListener("click", function(){
    console.log("funicode in the making");
    makefunicode(textinput.innerHTML);


});

function makefunicode(text){
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;

    const ctx = canvas.getContext("2d");

    // Create a blank 32x32 image
    const img = ctx.createImageData(32, 32);

    // Set a pixel
    function setPixel(x, y, r, g, b, a = 255) {
        const i = (y * 32 + x) * 4;
        img.data[i]     = r;
        img.data[i + 1] = g;
        img.data[i + 2] = b;
        img.data[i + 3] = a;
    }

    // Draw whatever you want
    setPixel(0, 0, 255, 0, 0);   // Red
    setPixel(1, 0, 0, 255, 0);   // Green
    setPixel(2, 0, 0, 0, 255);   // Blue

    // Put the pixels onto the canvas
    ctx.putImageData(img, 0, 0);


    canvas.style("ctx.imageSmoothingEnabled = false; width: 128px; height: 128px"); // renders the canvas
    // Display it
    document.getElementById("image").appendChild(canvas);
}