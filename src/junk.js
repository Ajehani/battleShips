const select =  (mode,chunkCount) => {
    document.querySelectorAll(`#grid${0}>div`).forEach( block => {
      const doIt = () => {
        let chunk = [];
        for (let i = number; i < number + parseInt(chunkCount); i++) {
          chunk.push(i);
        }
        chunk.forEach( el => document.querySelector(`#blocks${String(el)}`).style="background-Color:teal");
        console.log("bic chung: "+chunkCount);
        // selections.push([number,number+chunkCount]);
        // select("click",false,chunkCount-1);
      }
      let number = parseInt(String(block.id).match(/\d/g).join(""));
      if(chunkCount<=2){
        block.removeEventListener(doIt())
        block.style = "cursor:not-allowed;"
      }
      else if (number % 10 <= (10-parseInt(chunkCount)+1) && number % 10!==0) {
        block.style = "cursor:crosshair;";
        block.addEventListener(`${mode}`, doIt() )
    } else {
          block.style = "cursor:not-allowed;";
        }
        return [number,number+chunkCount];
    })
    }

    const select = (mode,mouseover,chunkCount) => {
      let count = 0;
      const doIt = (b) => {
        document.querySelector("#grid0").style = "cursor:crosshair;";
        let number = parseInt(String(b.id).match(/\d/g).join(""));        
        if ( number % 10 <= (10-parseInt(chunkCount)+1) && number % 10!==0 ) {
          count+=1;
          chunkCount-=1;
          nav.textContent = navText[chunkCount];
          let chunk = [];
          for (let i = number; i < number + parseInt(chunkCount); i++) {
            chunk.push(i);
          }
          chunk.forEach(el => {
            let chunkPart = document.querySelector(`#blocks${String(el)}`);
            if(mouseover){
              chunkPart.style = "background-Color:teal";
              setTimeout(() => {
                console.log(document.querySelector(`#blocks${String(el)}`));
                chunkPart.style = "background-Color:white";
              },1000);
            } else {
              chunkPart.style = "background-Color:teal";
            }
          });
          shipCord.push([number,number+chunkCount])
        } else {
          document.querySelector(`#blocks${number}`).style = "cursor:not-allowed;";
        }
        if(count > 3){
          document.querySelectorAll(`#grid${0}>div`).forEach((block) => block.removeEventListener(`${mode}`,work));
          nav.textContent = "Selection Complete";
          populate(1);
          populate(2);
          document.querySelector("#grid0").remove();
        } 
    }
    function work(e){
      doIt(e.target);
    }
    const blocks = document.querySelectorAll(`#grid${0}>div`);
    blocks.forEach((block) => block.addEventListener(`${mode}`, work));
  };
    const initialise = (function(){
      nav.textContent = "Place Your Carrier";
      populate(0);
      // populate(1)
      // populate(2)
      // select("mouseover",true,5);
      select("click",false,6);
      const board = createBoard();
      board.init();
      for(let i=3;i>=0;i--){
        console.log(board.shipCord[i])
        board.place(board.navText[i+2],board.shipCord[i][0],board.shipCord[i][1])
      }
      console.log(board.shipPos)
    })();
  
