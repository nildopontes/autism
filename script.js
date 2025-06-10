function startTouch(event){
   console.log('start');
   let element = $(event.target.id);
   element.dataset.refX = event.changedTouches[0].clientX;
   element.dataset.refY = event.changedTouches[0].clientY;
   element.style.zIndex = 2;
   playSound('touch.mp3');
   element.dataset.moving = 'yes';
   event.preventDefault();
}
function px2vw(px){
   return parseInt(px / (window.innerWidth / 100), 10);
}
function moveTouch(event){
   console.log('move');
   let element = $(event.target.id);
   let refX = parseInt(element.dataset.refX, 10);
   let refY = parseInt(element.dataset.refY, 10);
   let initX = parseInt(element.dataset.initX, 10);
   let initY = parseInt(element.dataset.initY, 10);
   if(element.dataset.moving == 'yes'){
      element.style.left = `calc(${initX}vw + ${event.changedTouches[0].clientX}px - ${refX}px)`;
      element.style.top = `calc(${initY}vh + ${event.changedTouches[0].clientY}px - ${refY}px)`;
   }
}
function endTouch(event){
   console.log('end');
   let element = $(event.target.id);
   let x = parseInt(window.getComputedStyle(element).left, 10);
   let y = parseInt(window.getComputedStyle(element).top, 10);
   let initX = parseInt(element.dataset.initX, 10);
   let initY = parseInt(element.dataset.initY, 10);
   let successX = parseInt(element.dataset.successX, 10);
   let successY = parseInt(element.dataset.successY, 10);
   element.dataset.moving = 'no';
   if(distanceBetweenPoints(x, y, parseInt(window.getComputedStyle($(`${event.target.id}Shadow`)).left, 10), parseInt(window.getComputedStyle($(`${event.target.id}Shadow`)).top, 10)) > 30){ // fail
      registerAnimation(`${event.target.id}-animation`, x, y, initX, initY);
      registerClassAnimation(`${event.target.id}-animation-class`, `${event.target.id}-animation`);
      addAnimation(element, `${event.target.id}-animation-class`, initX, initY);
   }else{ // sucess
      registerAnimation(`${event.target.id}-animation`, x, y, successX, successY);
      registerClassAnimation(`${event.target.id}-animation-class`, `${event.target.id}-animation`);
      addAnimation(element, `${event.target.id}-animation-class`, successX, successY);
      element.removeEventListener('touchstart', startTouch, false);
      element.removeEventListener('touchend', endTouch, false);
      element.removeEventListener('touchmove', moveTouch, false);
      playSound(element.dataset.soundSuccess);
      step++;
   }
   element.style.zIndex = 1;
}
function registerClassAnimation(className, animationName){
   let style = `.${className}{
      animation-duration:0.4s;
      animation-name:${animationName};
      animation-fill-mode:none;
      z-index:2;
   }`;
   let mySheet = $('animation').sheet;
   return mySheet.insertRule(style);
}
function registerAnimation(name, currentLeft, currentTop, newLeft, newTop){
   let style = `@keyframes ${name}{
      from{
         left:${currentLeft}px;
         top:${currentTop}px;
      }
      to{
         left:${newLeft}vw;
         top:${newTop}vh;
      }
   }`;
   let mySheet = $('animation').sheet;
   mySheet.insertRule(style);
}
function addAnimation(element, className, newLeft, newTop){
   element.classList.add(className);
   element.style.left = `${newLeft}vw`;
   element.style.top = `${newTop}vh`;
}
function distanceBetweenPoints(x1, y1, x2, y2){
   let dx = x2 - x1;
   let dy = y2 - y1;
   return Math.sqrt(dx**2 + dy**2);
}
function playSound(name){
   var sound = new Audio(name);
   sound.addEventListener('canplaythrough', () => sound.play());
}
function $(id){
   return document.getElementById(id);
}
/*
imgName (String): nome da imagem, deve ser único e será usado como base para a definição das classes CSS.
imgSrc (String): endereço da imagem do objeto.
soundSuccessSrc (String): endereço do áudio que será tocado em caso de sucesso.
endY (Interger): Posição final do objeto no eixo Y.
startY (Interger): Posição inicial do objeto no eixo Y.
*/
function createObject(imgName, imgSrc, soundSuccessSrc, startY, endY){
   let object = document.createElement('img');
   let shadow = document.createElement('img');
   object.setAttribute('src', imgSrc);
   object.setAttribute('id', imgName);
   object.dataset.successY = endY;
   object.dataset.initY = startY;
   object.dataset.moving = 'no';
   object.dataset.soundSuccess = soundSuccessSrc;
   object.style.top = `${startY}vh`;
   object.style.height = '25vh';
   object.addEventListener('touchstart', startTouch);
   object.addEventListener('touchend', endTouch);
   object.addEventListener('touchmove', moveTouch);
   object.addEventListener('animationend', e => {
      let element = $(e.target.id);
      element.classList.remove(`${event.target.id}-animation-class`);
      let mySheet = $('animation').sheet;
      mySheet.deleteRule(0);
      mySheet.deleteRule(0);
      if(step == stepQuantity){
         success();
      }
   });
   object.addEventListener('load', () => {
      $('wrap').appendChild(object);
      let endX = parseInt((150 - px2vw(parseFloat(window.getComputedStyle(object).width))) / 2, 10);
      shadow.style.left = `${endX}vw`;
      object.dataset.successX = endX;
      let startX = parseInt((50 - px2vw(parseFloat(window.getComputedStyle(object).width))) / 2, 10);
      object.style.left = `${startX}vw`;
      object.dataset.initX = startX;
      $('wrap').appendChild(shadow);
   });
   
   shadow.setAttribute('id', `${imgName}Shadow`);
   shadow.setAttribute('src', imgSrc);
   shadow.style.top = `${endY}vh`;
   shadow.style.height = '25vh';
   shadow.style.filter = 'contrast(0%) opacity(0.4)';
   stepQuantity++;
}
function start(){
   $('wrap').requestFullscreen().then(() => {
      if(!screen.orientation.type.includes('landscape')){
         screen.orientation.lock('landscape').catch(err => {
            /*Decidir aqui o que fazer se for necessário girar a tela e o acesso for negado*/
         });
      }
      $('cover').close();
   });
}
function success(){
   $('alert').showModal();
   stepQuantity = 0;
   step = 0;
   removeAll();
   loadNewLevel();
}
function removeAll(){
   let objects = document.querySelectorAll('#wrap img');
   objects.forEach(obj => obj.remove());
}
function mix(){
   let arr = [5, 40, 70];
   for(let i = 2; i > 0; i--){
     const j = Math.floor(Math.random() * (i + 1));
     [arr[i], arr[j]] = [arr[j], arr[i]];
   }
   return arr;
}
function genNumbers(){
   let numbers = new Set();
   while(true){
      numbers.add(Math.floor(Math.random() * 88)); // 88 is total of images
      if(numbers.size == 3) break;
   }
   return [...numbers];
}
function loadNewLevel(){
   let posY = mix();
   let seeds = genNumbers();
   createObject(`img${seeds[0]}`, `img${seeds[0]}.png`, 'audio.mp3', posY[1], posY[0]);
   createObject(`img${seeds[1]}`, `img${seeds[1]}.png`, 'audio.mp3', posY[2], posY[1]);
   createObject(`img${seeds[2]}`, `img${seeds[2]}.png`, 'audio.mp3', posY[0], posY[2]);
}