import "./style.css";
const createBoard = () => {
  const board = document.querySelector("#board");
  const nav = document.querySelector("nav");
  let shipCord = [];
  let enemyCord = [];
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
    } if(num === 1){
        for(let i = 0; i < shipCord.length; i++){
          for(let j = shipCord[i][0]; j <= shipCord[i][1]; j++){
            // console.log(j,document.querySelector(`#grid1 > #blocks${j}`));
            // document.querySelector(`#gird1 > #blocks${j}`).textContent = "1"
          }
        }
    } else if(num === 2){
        let trail = 6;
        for(let i = 0; i < 3; i++){
          let num = Math.floor(Math.random(101));
          while(enemyCord.includes(num)){
            num = Math.floor(Math.random(101));
          }
          for(let j = num; j <= num + trail ; j++){
            console.log(document.querySelector(`.ex2#blocks${j}`));
            //que es la problema?
            enemyCord.push(document.querySelector(`#grid2 > #blocks${j}`));
          }
          trail -= 1;
        }
      document.querySelectorAll(`#grid2 > div`).forEach((block) => block.addEventListener("click", (e) => {
          console.log(enemyCord);
        if(enemyCord.includes(e.target)){
            block.style = "background-Color : red;";
            enemyCord.splice(enemyCord.indexOf(e.target),1)
            //remove from enemy coordinates
        } else{  
            block.style = "background-Color : aquamarine;";
        }
        // ai
      }))
    }
  };
  const select = (mode,chunkCount) => {
    let count = 0;
    const doIt = (b) => {
      document.querySelector("#grid0").style = "cursor:crosshair;"
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
        shipCord.push([number,number+chunkCount]);
      } else {
            document.querySelector(`#blocks${number}`).style = "cursor:not-allowed;";
      }
  }
  const blocks = document.querySelectorAll(`#grid${0}>div`);
  blocks.forEach((block) => block.addEventListener(`${mode}`, function work(el){
    if(count == 3){
      document.querySelectorAll(`#grid${0} > div`).forEach((block) => block.removeEventListener(`${mode}`,work));
      nav.textContent = "Selection Complete";
      document.querySelector("#grid0").remove();
      populate(1);
      populate(2);
    }
    if(count < 3){
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
