let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const downoad = document.querySelector('.download')
const redo = document.querySelector('.redo')
const undo = document.querySelector('.undo')
let pencilColor = document.querySelectorAll('.pencil-color');
let pencilWidth = document.querySelector('.pencil-width');
let eraserWidth = document.querySelector('.eraser-width');
console.log(redo) 
let tool = canvas.getContext("2d");
tool.strokeStyle = "red"
tool.lineWidth = "3"  
let mousedown = false;
let currentPencilColor ;
let currentPencilWidth;

let undoRedoTracker = [];
let trackIdx = 0;

canvas.addEventListener('mousedown',(e)=>{
    // beginPath({x:e.clientX,y:e.clientY});
    mousedown = true;
    let data = {x:e.clientX,y:e.clientY};
    socket.emit('beginPath',data);
})

canvas.addEventListener('mousemove',(e)=>{
   if(mousedown){
    let data = {x:e.clientX,y:e.clientY};
    socket.emit('drawStroke',data);
    }
})

canvas.addEventListener('mouseup',(e)=>{
    mousedown = false;
    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    trackIdx = undoRedoTracker.length-1;
})

undo.addEventListener('click',(e)=>{
    if(trackIdx > 0){
        trackIdx--;
    }  
    let data = {
        trackIdx,
        undoRedoTracker
    }
    socket.emit('redoundo', data);
    // undoRedoFunc();
})
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
redo.addEventListener('click',(e)=>{
    if(trackIdx < undoRedoTracker.length-1){
        trackIdx++;
    }
    let data = {
        trackIdx,
        undoRedoTracker
    }
    socket.emit('redoundo', data);
    //  undoRedoFunc();
})

function undoRedoFunc(trackObj){
    let trackIdx = trackObj.trackIdx;
    let undoRedoTracker = trackObj.undoRedoTracker;
    let  img = new Image();
    img.src = undoRedoTracker[trackIdx];
     img.onload = (e)=>{
         tool.drawImage(img,0,0,canvas.width, canvas.height);
     }
}

function beginPath(e){
    tool.beginPath();
    tool.moveTo(e.x,e.y);
}

function drawStroke(e){
    tool.lineTo(e.x,e.y);
    tool.stroke();
}

pencilColor.forEach((colorEl)=>{
    colorEl.addEventListener('click',(e)=>{
        let color = colorEl.classList[0];
        let data = { color};
        socket.emit('pencilColor',data);
    })
    
})

function changePencilColor(pencilColorObj){
    let color = pencilColorObj.color;
    tool.strokeStyle = color;
    currentPencilColor = color;
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
pencilWidth.addEventListener('change',(e)=>{
    // tool.lineWidth = pencilWidth.value;
    // currentPencilWidth = pencilWidth.value;
    let data =  {
        width:pencilWidth.value,
        currPencilWidth:pencilWidth.value
    }
     socket.emit('pencilWidth',data)
})

function changePencilWidth(pencilWidthObj){
    let width = pencilWidthObj.width;
    let currPencilWidth = pencilWidthObj.currPencilWidth;
    tool.lineWidth = width;
    currentPencilWidth = currPencilWidth;
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
eraserWidth.addEventListener('change',(e)=>{
    // tool.lineWidth = eraserWidth.value;
    width = eraserWidth.value;
     let data = {width}
     socket.emit('eraserWidth',data);
})

function changeEraserWidth(eraserObj){
    let width = eraserObj.width;
    tool.lineWidth = width;
    
}

//-------------------------------------------------------------------------------------------------------------------------------------

eraser.addEventListener('click',(e)=>{
    let data = {
        eraserFlag
    }    
    socket.emit('colorandwidth',data)
})

function colorAndWidth(eraserObj){
    let eraserFlag = eraserObj.eraserFlag
    if(eraserFlag){
           tool.strokeStyle = 'white';
           tool.lineWidth = eraserWidth.value;
       }else{
           tool.strokeStyle = currentPencilColor;
           tool.lineWidth = currentPencilWidth;
       }
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
downoad.addEventListener('click',(e)=>{
    let url = canvas.toDataURL();
    let a = document.createElement('a');
    a.href = url;
    a.download = "board.jpg";
    a.click();
})

socket.on('beginPath',(data)=>{
    beginPath(data);
})

socket.on('drawStroke',(data)=>{
    drawStroke(data);
})

socket.on('redoundo',(data)=>{
    undoRedoFunc(data);
})

socket.on('colorandwidth',(data)=>{
    colorAndWidth(data)
})

socket.on('pencilWidth',(data)=>{
  changePencilWidth(data)
})

socket.on('pencilColor',(data)=>{
  changePencilColor(data)
})

socket.on('eraserWidth',(data)=>{
 changeEraserWidth(data)
})