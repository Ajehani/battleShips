import "./style.css";
const logic = () =>{
    let shipCord = [];
    let guesses = [];
    let enemyCord = [];
    let trail = 6;
    //make enemy position
    const epos = () => {
        let num = Math.floor(Math.random() * 100) + 1;
        while(enemyCord.includes(num) || num % 10 > 10 - trail + 1 || num % 10 === 0){
            num = Math.floor(Math.random() * 100) + 1;
        } // gives valid number
        trail -= 1;
        return num;
    }
      const play = () => {
        let vicin = null;
        if(enemyCord.includes(e.target)){
            block.style = "background-Color : orange; pointer-events : none;";
            enemyCord.splice(enemyCord.indexOf(e.target),1)
        } else {  
            block.style = "background-Color : aquamarine; pointer-events : none";
        }
        if(enemyCord.length === 0){
            nav.textContent = "You Win!";
            document.body.innerHTML += "<div id='overlay'></div>"
        } //check for win
        if(enemyCord.length > 0){
            let guess = Math.floor(Math.random() * 100) + 1; //computer turn 
            if(vicin !== null){
                if(shipCord.includes(vicin + 1)) guess = vicin + 1;
                else if(shipCord.includes(vicin - 1)) guess = vicin - 1;
                else{
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
            document.querySelectorAll(".ex1").forEach(el=>{
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
            if(shipCord.length === 0){
                nav.textContent = "You Lose!";
                document.body.innerHTML+="<div id='overlay'></div>";
            }
        }
    }
    return {epos,play}
}
const createBoard = () => {
  const board = document.querySelector("#board");
  const nav = document.querySelector("nav");
  const lg = logic();
  const navText = {
    5: "Place Your Battle Ship",
    4: "Place Your Submarine",
    3: "Place Your Boat",
    2: "Place Your raft",
  };
  const populate = (num) => {
    const grid = document.createElement("div");
    grid.className = "grid";
    grid.id = `grid${num}`;
    board.appendChild(grid);
    for (let i = 0; i < 100; i++) {
      grid.innerHTML += `<div class="blocks ex${num}" id="blocks${i + 1}"></div>`;
    } if(num === 1){ // add chosen spots
        for(let i = 0; i < shipCord.length; i++){
          document.querySelector(`#blocks${shipCord[i]}.ex1`).style = "background-Color : blue;";
          document.querySelector(`#blocks${shipCord[i]}.ex1`).textContent = i;
        }
     }
  };
  const rob = () => {
    let guesses = [];
    let enemyCord = [];
    let trail = 6;
    for(let i = 0; i < 3; i++){
      lg.epos();
      for(let j = num; j < num + trail ; j++){
        enemyCord.push(document.querySelector(`#blocks${j}.ex2`));
      }
      trail -= 1;
    }
    // enemyCord.forEach(el => el.style = "background-Color : red;"); //comment me out!
    let vicin = null;
    document.querySelectorAll(`#grid2 > div`).forEach((block) => block.addEventListener("click", (e) => {
      // console.log(enemyCord);
      if(enemyCord.includes(e.target)){
        block.style = "background-Color : orange; pointer-events : none;";
        enemyCord.splice(enemyCord.indexOf(e.target),1)
      } else {  
        block.style = "background-Color : aquamarine; pointer-events : none";
      }
      if(enemyCord.length === 0){
        nav.textContent = "You Win!";
        document.body.innerHTML += "<div id='overlay'></div>"
      } //check for win
      if(enemyCord.length > 0){
          let guess = Math.floor(Math.random() * 100) + 1; //computer turn 
          if(vicin !== null){
            if(shipCord.includes(vicin + 1)) guess = vicin + 1;
            else if(shipCord.includes(vicin - 1)) guess = vicin - 1;
            else{
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
        document.querySelectorAll(".ex1").forEach(el=>{
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
        if(shipCord.length === 0){
          nav.textContent = "You Lose!";
          document.body.innerHTML+="<div id='overlay'></div>";
        }
      }
    }))
  }
  const select = (mode,chunkCount) => {
    let count = 0;
    const doIt = (b) => {
      document.querySelector("#grid0").style = "cursor : crosshair;" // idk if i need this
      let number = parseInt(String(b.id).match(/\d/g).join(""));        
      if (number % 10 <= (10 - parseInt(chunkCount) + 1) && number % 10 !== 0 ) {
        count += 1;
        chunkCount -= 1;
        nav.textContent = navText[chunkCount];
        let chunk = [];
        for (let i = number; i < number + parseInt(chunkCount); i++) {
          chunk.push(i);
        }
        chunk.forEach(el => {
          let chunkPart = document.querySelector(`#blocks${String(el)}`);
          chunkPart.style = "background-Color : teal";
        });
        for(let i = number; i <= number + chunkCount; i++){
          shipCord.push(i);
        }
      } else {
          document.querySelector(`#blocks${number}`).style = "cursor : not-allowed;";
      }
  }
  const blocks = document.querySelectorAll(`#grid${0} > div`);
  blocks.forEach((block) => block.addEventListener(`${mode}`, function work(el){
    if(count == 3){
      document.querySelectorAll(`#grid0 > div`).forEach((block) => block.removeEventListener(`${mode}`,work));
      nav.textContent = "Game Begin!";
      document.querySelector("#grid0").remove();
      populate(1);
      populate(2);
      rob();
    }
    if(count < 3) doIt(el.target);
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
