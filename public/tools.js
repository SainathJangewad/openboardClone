const stickyNoteCont = document.querySelector('.sticky-note-cont');
const stickyNote = document.querySelector('.sticky-note');
const optionsCont = document.querySelector('.options-container');
const toolsCont = document.querySelector('.tools-container');
const pencilCont = document.querySelector('.pencil-tool-container');
const eraserCont = document.querySelector('.eraser-container');
const upload = document.querySelector('.upload');
const pencil = document.querySelector('.pencil');
const eraser = document.querySelector('.eraser');
let pencilFlag = false;
let eraserFlag = false;
let flagBar = true;
optionsCont.addEventListener('click',(e)=>{
    flagBar = !flagBar;
    if(flagBar){
        opeonTools();
    }else{
        closeTools();
    }
});


function opeonTools(){
    let barIcon = optionsCont.children[0];
    barIcon.classList.remove('fa-times');
    barIcon.classList.add('fa-bars');
    toolsCont.style.display = 'flex';
}

function closeTools(){
    toolsCont.style.display = 'none';
    let barIcon = optionsCont.children[0];
    barIcon.classList.add('fa-times');
    barIcon.classList.remove('fa-bars');
    pencilCont.style.display = 'none';
    eraserCont.style.display = 'none';
}

pencil.addEventListener('click',(e)=>{
    console.log(pencil);
    pencilFlag = !pencilFlag;
    if(pencilFlag)
    pencilCont.style.display = 'block';
    else
    pencilCont.style.display = 'none';
});

eraser.addEventListener('click',(e)=>{
    eraserFlag = !eraserFlag;
    if(eraserFlag)
    eraserCont.style.display = 'flex';
    else
    eraserCont.style.display = 'none';
});


upload.addEventListener('click',(e)=>{
    let input = document.createElement('input');
    input.setAttribute('type','file');
    input.click();
    input.addEventListener('change',(e)=>{
        let file = input.files[0];
        let url = URL.createObjectURL(file);
        let template = `<div class="sticky-note-header">
               <div class="maximize">
               </div>
              <div class="remove">
              </div>
              </div>
             <div class="sticky-note-body">
             <img src="${url}" >
           </div> `;       
           stickyNoteGeneral(template);
    })

});

//stop;

function stickyNoteGeneral(template){

        let stickyCont = document.createElement('div');
    stickyCont.setAttribute('class','sticky-note-cont');
    stickyCont.innerHTML =  template;
    document.body.appendChild(stickyCont);

    stickyCont.onmousedown = function(event) {
       dragAndDrop(stickyCont,event);

    };
    
    stickyCont.ondragstart = function() {
        return false;
    };
    let maximize = stickyCont.querySelector('.maximize');
    let remove = stickyCont.querySelector('.remove');
    stickyNoteActions(maximize,remove,stickyCont);
}



stickyNote.addEventListener('click',(e)=>{
    let template = `<div class="sticky-note-header">
               <div class="maximize">
               </div>
              <div class="remove">
              </div>
              </div>
             <div class="sticky-note-body">
              <textarea name="" id="" cols="30" rows="10">
              </textarea>
           </div>

    `;
    stickyNoteGeneral(template);
    
})


   function stickyNoteActions(maximize,remove,cont){
        remove.addEventListener('click',(e)=>{
            cont.remove();
        })
        
        maximize.addEventListener('click',(e)=>{
            let stickyNoteBody = cont.querySelector('.sticky-note-body');
         let display =  getComputedStyle(stickyNoteBody).getPropertyValue('display');
         if(display == 'none') stickyNoteBody.style.display = 'block';
         else
         stickyNoteBody.style.display = 'none';
        });

   }

function dragAndDrop(element,event){
    let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = 'absolute';
  element.style.zIndex = 1000;
  moveAt(event.pageX, event.pageY);

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + 'px';
    element.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the ball on mousemove
  document.addEventListener('mousemove', onMouseMove);

  // drop the ball, remove unneeded handlers
  element.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    element.onmouseup = null;
  };

}























