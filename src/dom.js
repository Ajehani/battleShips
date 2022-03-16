import "./style.css";
import { gameObject } from "./index.js";
const createBoard = () => {
  const game = gameObject();
  const board = document.querySelector("#board");
  const nav = document.querySelector("nav");
  // const gameboard = game.Gameboard();
  // const player = game.Player();
  let shipCord = [];
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
    } if (num === 2) {
      document.querySelectorAll(`#grid${num}>div`).forEach((block) => block.addEventListener("click", () => block.style = "background-Color:aquamarine;"));
    }
  };
  const select = (mode,chunkCount) => {
    let count = 0;
    const doIt = (b) => {
      if(count > 3){
        document.querySelectorAll(`#grid${0} > div`).forEach((block) => block.removeEventListener(`${mode}`,work));
        nav.textContent = "Selection Complete";
        populate(1);
        populate(2);
        document.querySelector("#grid0").remove();
      }
      document.querySelector("#grid0").style = "cursor : crosshair;";
      let number = parseInt(String(b.id).match(/\d/g).join(""));        
      if ( number % 10 <= (10 - parseInt(chunkCount)+1) && number % 10!==0 ) {
        count += 1;
        chunkCount -= 1;
        nav.textContent = navText[chunkCount];
        let chunk = [];
        for (let i = number; i < number + parseInt(chunkCount); i++) {
          chunk.push(i);
        }
        chunk.forEach(el => {
          let chunkPart = document.querySelector(`#blocks${String(el)}`);
          chunkPart.style = "background-Color:teal";
        });
        shipCord.push([number,number+chunkCount])
      } else {
        document.querySelector(`#blocks${number}`).style = "cursor:not-allowed;";
      }
  }
  function work(el){
    doIt(el.target);
  }
  const blocks = document.querySelectorAll(`#grid${0}>div`);
  blocks.forEach((block) => block.addEventListener(`${mode}`, work));
};
  (function initialise(){
    nav.textContent = "Place Your Carrier";
    populate(0);
    select("click",6);
    for(let i = 3; i >= 0; i--){
      console.log(board.shipCord[i])
      board.place(board.navText[i+2],board.shipCord[i][0],board.shipCord[i][1])
    }
    console.log(board.shipPos);
  })();
  return {shipCord,navText};
};
createBoard();
