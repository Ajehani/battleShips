import "./style.css";
//things
// add vertical for enemy ai beginning phase
const createBoard = () => {
  const board = document.querySelector("#board");
  const nav = document.querySelector("nav");
  let align = false;
  let shipCord = [];
  const navText = {
    5: "Place Your Battle Ship",
    4: "Place Your Submarine",
    3: "Place Your Boat",
    2: "Place Your raft",
    1: "fin",
  };
  const round = (num,mode = 1) => {
      switch(mode){
        case 1:
          return num - num % 10;
        case 2:
          return num + (10 - num % 10);
        case 3:
          if(num % 10 >= 5){
            return num + (10 - num % 10);
          } else{
            return num - num % 10;
          }
      }
  };
  const populate = (num) => {
    const grid = document.createElement("div");
    grid.className = "grid";
    grid.id = `grid${num}`;
    board.appendChild(grid);
    for (let i = 0; i < 100; i++) {
      grid.innerHTML += `<div class="blocks ex${num}" id="blocks${i + 1}"></div>`;
    } if(num === 1){ // add chosen spots
      console.log(shipCord)
        for(let i = 0; i < shipCord.length; i++){
          document.querySelector(`#blocks${shipCord[i]}.ex1`).style = "background-Color : blue;";
          document.querySelector(`#blocks${shipCord[i]}.ex1`).textContent = i;
        }
     }
     if(num === 1 || num===0){
      board.innerHTML+= `<button> Toggle </button>`;
      document.querySelector("button").addEventListener('click', () => align = align === false ? true : false);
     }
  };
  const rob = () => {
    let guesses = [];
    let enemyCord = [];
    let trail = 6;
    for(let i = 0; i < 5; i++){
      let num = Math.floor(Math.random() * 100) + 1;
      let pos = Math.round(Math.random() * 1);
      if(pos===0){
        while(enemyCord.includes(num) || num % 10 > 10 - trail + 1 || num % 10 === 0){
          num = Math.floor(Math.random() * 100) + 1;
        }
        for(let j = num; j < num + trail ; j++){
          enemyCord.push(document.querySelector(`#blocks${j}.ex2`));
        }
      } else{
        while(enemyCord.includes(num) || round(num) > 100 - trail * 10){
          num = Math.floor(Math.random() * 100) + 1;
        }
        for(let j = num; j < num + 10*trail ; j+=10){
          enemyCord.push(document.querySelector(`#blocks${j}.ex2`));
        }
      }
      trail -= 1;
    }
    console.log(enemyCord);
    enemyCord.forEach(el => el.style = "background-Color : red;"); //comment me out!
    let vicin = null;
    document.querySelectorAll(`#grid2 > div`).forEach((block) => block.addEventListener("click", (e) => {
      if(enemyCord.includes(e.target)){
        block.style = "background-Color : orange; pointer-events : none;";
        enemyCord.splice(enemyCord.indexOf(e.target),1);
      } else {  
        block.style = "background-Color : aquamarine; pointer-events : none";
      }
      if(enemyCord.length === 0){
        nav.textContent = "You Win!";
        document.body.innerHTML += "<div id='overlay'></div>"
      } //check for win, next is computer turn
      if(enemyCord.length > 0){
          let guess = Math.floor(Math.random() * 100) + 1; //computer turn 
          if(vicin !== null){
            if(shipCord.includes(vicin + 1)) guess = vicin + 1;
            else if(shipCord.includes(vicin - 1)) guess = vicin - 1;
            else {
              while(guesses.includes(guess)){ // run the same thing
                guess = Math.floor(Math.random() * 100) + 1;
              }
            }
            console.log("special:",guess);
            vicin = null; //reset
          } else {
            while(guesses.includes(guess)){
              guess = Math.floor(Math.random() * 100) + 1;
            }
          }
        document.querySelectorAll(".ex1").forEach(el => {
          if(el.id == `blocks${guess}`){
            el.style.backgroundColor = "orange";
            if(shipCord.includes(guess)){ //computer point
              shipCord.splice(shipCord.indexOf(guess),1);
              vicin = parseInt(guess);
              console.log(vicin);
              el.style.backgroundColor = "red";
            }
          }
        })
        guesses.push(guess);
        if(shipCord.length === 0){ //check for computer's dub condition
          nav.textContent = "You Lose!";
          document.body.innerHTML += "<div id='overlay'></div>";
        }
      }
    }))
  }
  const select = (mode,chunkCount) => {
    let count = 0;
    const hover = (() => {
      document.querySelectorAll("#grid0 > div").forEach(el => el.addEventListener("mouseover",() => {
        let number = parseInt(String(el.id).match(/\d/g).join(""));
        if(!align){      
          if (number % 10 <= (10 - parseInt(chunkCount) + 1) && number % 10 !== 0 ) {
            for(let i = number; i < number + chunkCount ; i++){
              document.querySelector(`#blocks${i}`).classList.add('tagged');
            }
          }
        } else {
          if(round(number) <= (100 - parseInt(chunkCount) * 10)) {
            for(let i = number; i < number + chunkCount * 10 ; i += 10) {
              document.querySelector(`#blocks${i}`).classList.add('tagged');
            } 
          } 
        }  
      }))
      document.querySelectorAll("#grid0 > div").forEach(el => el.addEventListener("mouseout",() => { 
        let number = parseInt(String(el.id).match(/\d/g).join("")); 
        if(!align){     
          if (number % 10 <= (10 - parseInt(chunkCount) + 1) && number % 10 !== 0 ) {
            for(let i = number ; i < number + chunkCount; i++){
              document.querySelector(`#blocks${i}`).classList.remove('tagged');
            }
          }  
        } else{
          if(round(number) <= (100 - parseInt(chunkCount) * 10)) {
            for(let i = number; i < number + chunkCount * 10 ; i += 10) {
              document.querySelector(`#blocks${i}`).classList.remove('tagged');
            } 
          } 
        }
      }))
    })();
    const doIt = (b) => {
      document.querySelector("#grid0").style = "cursor : crosshair;" // idk if i need this
      let number = parseInt(String(b.id).match(/\d/g).join(""));     
      let through = false;   
      if (((number % 10 <= (10 - parseInt(chunkCount) + 1) && number % 10 !== 0) || (round(number / 10) <= 100 - parseInt(chunkCount) * 10)) && !shipCord.includes(number)){ 
        //fix condition so as to not allow used positions, or intersection for that matter
        let chunk = [];
        if(!align){
          if ((number % 10 <= (10 - parseInt(chunkCount) + 1) && number % 10 !== 0)){
            nav.textContent = navText[chunkCount-1];
            for (let i = number; i < number + parseInt(chunkCount); i++) {
              chunk.push(i);
            }
            through = true;
          }
        } else {
          if(round(number) <= 100 - parseInt(chunkCount) * 10) {
            nav.textContent = navText[chunkCount-1];
            for (let i = number; i < number + parseInt(chunkCount) * 10; i += 10) {
              chunk.push(i);
            }
            through = true;
          }
        }
        if(through){
          chunk.forEach(el => {
            let chunkPart = document.querySelector(`#blocks${String(el)}`);
            chunkPart.style = "background-Color : teal; pointer-events : none;";
            shipCord.push(el);
          });
          count += 1;
          chunkCount -= 1;
        }
      } else {
        document.querySelector(`#blocks${number}`).style = "cursor : not-allowed;";
      }
  }
  const blocks = document.querySelectorAll(`#grid${0} > div`);
  blocks.forEach((block) => block.addEventListener(`${mode}`, function work(el){
    if(count === 5){
      document.querySelectorAll(`#grid0 > div`).forEach((block) => block.removeEventListener(`${mode}`,work));
      nav.textContent = "Game Begin!";
      document.querySelector("#grid0").remove();
      populate(1);
      populate(2);
      rob();
    }
    if(count <= 4){
      doIt(el.target);
    }
  }));
};
  (function initialise(){
    nav.textContent = "Place Your Carrier";
    populate(0);
    select("click",6);
  })();
  return {shipCord,navText};
};
createBoard();
