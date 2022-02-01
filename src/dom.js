// import {ship} from './index.js'
const createBoard = () => {
  const board = document.querySelector("#board");
  const nav = document.querySelector("nav");
  const populate = (num) => {
    const grid = document.createElement("div");
    grid.className = "grid";
    grid.id = `grid${num}`;
    board.appendChild(grid);
    for (let i = 0; i < 100; i++) {
      grid.innerHTML += `<div class="blocks ex${num}" id="blocks${i + 1}"></div>`;
    }
    if (num === 2) {
      document.querySelectorAll(`#grid${num}>div`).forEach((block) =>
        block.addEventListener("click", () => {
          block.style = "background-Color:aquamarine;";
        })
      );
    }
  };
  //enbable this for zero
  //call method select twice for mouseover and click functionality
  // once clicked override method to work for less blocks, like 3 and 2
  const select=(mode,temp,chunkCount)=>{
    //select all blocks
    document.querySelectorAll(`#grid${0}>div`).forEach((block) =>{
      // for index < 8 add event listener to toggle hover for next 4 adjacent divs
      // if(index < 8){
      //   let number = parseInt(String(block.id).match(/\d/g).join(""));
      //   document.querySelector(`#blocks${number}`).classList.toggle('init')
      //   document.querySelector(`#blocks${number+1}`).classList.toggle('init')
      //   document.querySelector(`#blocks${number+2}`).classList.toggle('init')
      //   document.querySelector(`#blocks${number+3}`).classList.toggle('init')
      // }
      //decouple chunk count
      //add mouseover and click events
      block.addEventListener(`${mode}`, () => {
        document.querySelector("#grid0").style = "cursor:crosshair;";
        let number = parseInt(String(block.id).match(/\d/g).join(""));
        //check validity
        //could use nextSibling node method
        if (number % 10 <= (10-parseInt(chunkCount)+1) && number % 10!==0) {
          let chunk = [];
          for (let i = number; i < number + parseInt(chunkCount); i++) {
            chunk.push(i);
          }
          chunk.forEach(el => {
            if(temp){
              document.querySelector(`#blocks${String(el)}`).style="background-Color:teal"
              setTimeout(()=>{
                console.log(document.querySelector(`#blocks${String(el)}`));
                document.querySelector(`#blocks${String(el)}`).style="background-Color:white";
              },1000)
            } else{
              document.querySelector(`#blocks${String(el)}`).style="background-Color:teal";
            }
          });
        } else {
          document.querySelector("#grid0").style = "cursor:not-allowed;";
        }
    })
  }
  )};
  //need to allow ships to be dropped in, either drap and drop or just select
  //then need to figure out how to represent block spaces with ship object
  //entonces necessito configurar la jesto en mi webpack

  // eslint-disable-next-line no-unused-vars
  const init = (() => {
    nav.textContent = "Place Your Carrier";
    populate(0);
    select("mouseover",true,5);
    select("click",false,3);
    //rotate 
    //return 4 element array with ship objects
    //wrap in function
    
    // const sidebar = document.createElement("div");
    // sidebar.id = "sidebar";
    // sidebar.innerHTML = `<div id="ship1">4 block</div>
    //   <div id="ship2">3 block</div>
    //   <div id="ship3">3 block</div>
    //   <div id="ship4">2 block</div>`;
    // board.appendChild(sidebar);
    //   document.querySelector("#grid0").remove();
  })();
  // populate(1)
  // populate(2)
};
export { createBoard };
