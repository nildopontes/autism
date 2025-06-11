/* Código de apoio ao desenvolvimento
Gere uma imagem ilustrativa, tipo animação, de um cão. As linhas devem ser uniformes e definidas. As cores devem ser uniformes. O fundo por trás da imagem deve ser branco.
let objNames = {
   0: "lua",
   1: "mamadeira",
   2: "borboleta",
   3: "melancia",
   4: "mochila",
   5: "batom",
   6: "faca",
   7: "sol",
   8: "camisa",
   9: "sol",
   10: "cadeado",
   11: "maçã",
   12: "dado",
   13: "lápis",
   14: "casa",
   15: "bicicleta",
   16: "helicóptero",
   17: "cobra",
   18: "moeda",
   19: "água",
   20: "relógio",
   21: "chinelo",
   22: "ventilador",
   23: "lixeira",
   24: "galinha",
   25: "chave",
   26: "flor",
   27: "vassoura",
   28: "televisão",
   29: "mão",
   30: "árvore",
   31: "moeda",
   32: "cachorro",
   33: "coelho",
   34: "televisão",
   35: "motocicleta",
   36: "casa",
   37: "chupeta",
   38: "caderno",
   39: "flor",
   40: "ônibus",
   41: "barco",
   42: "mochila",
   43: "óculos",
   44: "camisa",
   45: "dado",
   46: "maçã",
   47: "pera",
   48: "chinelo",
   49: "cachorro",
   50: "lâmpada",
   51: "fogo",
   52: "garfo",
   53: "suco",
   54: "boneca",
   55: "laranja",
   56: "motocicleta",
   57: "uvas",
   58: "boneco",
   59: "lâmpada",
   60: "pé",
   61: "bicicleta",
   62: "patins",
   63: "colher",
   64: "celular",
   65: "vassoura",
   66: "livro",
   67: "chave",
   68: "lua",
   69: "lápis de cor",
   70: "peixe",
   71: "uvas",
   72: "bola",
   73: "lua",
   74: "flor",
   75: "cadeado",
   76: "borboleta",
   77: "avião",
   78: "relógio",
   79: "cobra",
   80: "cavalo",
   81: "peixe",
   82: "boneca",
   83: "gato",
   84: "telefone",
   85: "banana",
   86: "carro",
   87: "ventilador",
   88: "letra z",
   89: "número 1",
   90: "número 2",
   91: "número 3",
   92: "número 4",
   93: "número 5",
   94: "número 6",
   95: "número 7",
   96: "número 8",
   97: "número 9",
   98: "letra a",
   99: "letra b",
   100: "letra c",
   101: "letra d",
   102: "letra é",
   103: "letra f",
   104: "letra g",
   105: "vaca",
   106: "boca",
   107: "girafa",
   108: "pirulito",
   109: "porco",
   110: "tartaruga",
   111: "tigre",
   112: "olho",
   113: "elefante",
   114: "nariz",
   115: "leão",
   116: "sorvete",
   117: "rato",
   118: "zebra",
   119: "letra h",
   120: "letra i",
   121: "número 0",
   122: "letra j",
   123: "letra k",
   124: "letra l",
   125: "letra m",
   126: "letra n",
   127: "letra o",
   128: "letra p",
   129: "letra q",
   130: "letra s",
   131: "letra r",
   132: "letra t",
   133: "letra u",
   134: "letra v",
   135: "letra w",
   136: "letra x",
   137: "letra y",
   138: "ferro de passar",
   139: "cadeira",
   140: "pavão",
   141: "pente",
   142: "semáforo",
   143: "pássaro",
   144: "apito",
   145: "flauta",
   146: "barata",
   147: "garrafa",
   148: "poltrona",
   149: "escova de cabelos",
   150: "pato",
   151: "sofá",
   152: "mesa",
   153: "porta retrato",
   154: "violão",
   155: "prendedor de cabelos",
   156: "torneira",
   157: "escova de dentes",
   158: "aranha",
   159: "controle remoto",
   160: "abelha",
   161: "prego",
   162: "formiga",
   163: "alicate",
   164: "alicate",
}
function downloadFile(blob, index){
   let a = document.createElement('a');
   a.style.display = 'none';
   document.body.appendChild(a);
   a.href = window.URL.createObjectURL(blob, {type: "audio/mpeg"});
   a.setAttribute('download', `sound${index}.mp3`);
   a.click();
   window.URL.revokeObjectURL(a.href);
   document.body.removeChild(a);
}
function getAudio(index){
   let url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=pt&q=${objNames[index]}`;
   return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.open('GET', url, true);
      xhr.onreadystatechange = () => {
         if(xhr.readyState == 4){
            if(xhr.status == 200){
               resolve(xhr.response);
            }else{
               reject(`Error: status code ${xhr.status}`);
            }
         }
      }
      xhr.send();
   });
}
for(let i = 0; i < 31; i++) getAudio(i).then(b => downloadFile(b, i)); */
function startTouch(event){
   let element = $(event.target.id);
   element.dataset.refX = event.changedTouches[0].clientX;
   element.dataset.refY = event.changedTouches[0].clientY;
   element.style.zIndex = 2;
   element.dataset.moving = 'yes';
   event.preventDefault();
}
function px2vw(px){
   return parseInt(px / (window.innerWidth / 100), 10);
}
function moveTouch(event){
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
   sound.addEventListener('ended', () => {
      if(step == stepQuantity){
         success();
      }
   });
}
function $(id){
   return document.getElementById(id);
}
/*
index (Interger): id do objeto, faz referência à imagem e som associados ao objeto.
endY (Interger): Posição final do objeto no eixo Y.
startY (Interger): Posição inicial do objeto no eixo Y.
*/
function createObject(index, startY, endY){
   let object = document.createElement('img');
   let shadow = document.createElement('img');
   object.setAttribute('src', `images/img${index}.png`);
   object.setAttribute('id', `img${index}`);
   object.dataset.successY = endY;
   object.dataset.initY = startY;
   object.dataset.moving = 'no';
   object.dataset.soundSuccess = `sounds/sound${index}.mp3`;
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
   
   shadow.setAttribute('id', `img${index}Shadow`);
   shadow.setAttribute('src', `images/img${index}.png`);
   shadow.style.top = `${endY}vh`;
   shadow.style.height = '25vh';
   shadow.style.filter = 'contrast(0%) opacity(0.4)';
   stepQuantity++;
}
/*
Inicia ou resume o jogo
continuing (Boolean): true se o jogo estiver iniciando após uma pausa ou false se for a primeira chamada
*/
function start(continuing){
   $('wrap').requestFullscreen().then(() => {
      if(!screen.orientation.type.includes('landscape')){
         screen.orientation.lock('landscape').then(() => loadNewLevel()).catch(err => {
            /*Decidir aqui o que fazer se for necessário girar a tela e o acesso for negado*/
         });
      }else{
         if(!continuing) loadNewLevel();
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
      numbers.add(Math.floor(Math.random() * 165)); // 165 is total of images
      if(numbers.size == 3) break;
   }
   return [...numbers];
}
function loadNewLevel(){
   let posY = mix();
   let seeds = genNumbers();
   createObject(seeds[0], posY[1], posY[0]);
   createObject(seeds[1], posY[2], posY[1]);
   createObject(seeds[2], posY[0], posY[2]);
}