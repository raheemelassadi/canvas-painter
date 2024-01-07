let isDrawing = false;
let x = 0;
let y = 0;
let colorPicker;
let strokeStyle = "black";
const defaultColor = "#000000";
const myPics = document.getElementById("myPics");
const context = myPics.getContext("2d");
const reset = document.getElementById("reset");

window.addEventListener("load", startup, false);

// event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.

// Add the event listeners for mousedown, mousemove, and mouseup
myPics.addEventListener("mousedown", (e) => {
  x = e.offsetX;
  y = e.offsetY;
  isDrawing = true;
});

myPics.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = e.offsetX;
    y = e.offsetY;
  }
});

window.addEventListener("mouseup", (e) => {
  if (isDrawing) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = 0;
    y = 0;
    isDrawing = false;
  }

  reset.addEventListener("click", function () {
    context.clearRect(0, 0, myPics.width, myPics.height);
  });
});

function drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  context.strokeStyle = strokeStyle;
  context.lineWidth = 1;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}

function startup() {
  colorPicker = document.querySelector("#color-picker");
  colorPicker.value = defaultColor;
  colorPicker.addEventListener("input", updateFirst, false);
  colorPicker.select();
}

function updateFirst(event) {
  if (strokeStyle) {
    strokeStyle = event.target.value;
  }
}

//screenshot and download function
document.querySelector("#download").addEventListener("click", function () {
  html2canvas(document.querySelector(".specific"), {
    onrendered: function (canvas) {
      // document.body.appendChild(canvas);
      return Canvas2Image.saveAsPNG(canvas);
    },
  });
});
