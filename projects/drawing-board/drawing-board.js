const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let draw_color = "black";
let draw_width = "2";
let painting = false;

let restore_array = [];
let index = -1;

window.addEventListener("load", () => {
    canvas.height = window.innerHeight - 100;
    canvas.width = window.innerWidth - 60;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    canvas.addEventListener("touchstart", start, false);
    canvas.addEventListener("mousedown", start, false);
    canvas.addEventListener("touchmove", draw, false);
    canvas.addEventListener("mousemove", draw, false);

    canvas.addEventListener("touchend", stop, false);
    canvas.addEventListener("mouseup", stop, false);
    canvas.addEventListener("mouseout", stop, false);

})

window.addEventListener("resize", () => {
    canvas.height = window.innerHeight - 100;
    canvas.width = window.innerWidth - 60;
})

function start(e){
    painting = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    e.preventDefault();
}

function draw(e){
    if(!painting) return;
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = draw_color;
    ctx.lineWidth = draw_width;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    e.preventDefault();
}

function stop(e){
    if(!painting) return;
    ctx.stroke();
    ctx.closePath();
    painting = false;
    e.preventDefault();
    if(e.type != "mouseout"){
        restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
    }
   
}

function clear_canvas(){
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    restore_array = [];
    index = -1;
}

function undo_last(){
    if(index <= 0){
        clear_canvas();
    }else{
        index -= 1;
        restore_array.pop();
        ctx.putImageData(restore_array[index], 0, 0);
    }
}