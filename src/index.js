import "./style.css";
const gameObject = () => {
  const Gameboard = () => {
    const missed = [];
    const shipPos = {};
    const place = (name, start, end) => {
      shipPos[name] = [];
      for (let i = start; i <= end; i++) {
        shipPos[name].push(i);
      }
      return Ship(end - start);
    };
    const receiveAttack = (x, y) => {
      if (shipPos.includes([x, y])) {
        Ship().toHit();
      } else {
        missed.push();
      }
    };
    return { place, receiveAttack,shipPos };
  };
  const Ship = (len) => {
    const position = [];
    for (let i = 0; i < len; i++) {
      position[i] = false;
    }
    const toHit = (num) => {
      position[num - 1] = true;
    };
    const isSunk = () => position.every((el) => !el);
    return { isSunk, toHit };
  };
  // const Player = () => {
  //   let n = 0;
  //   const toggle = (num) =>  2 % num;
  //   let state = toggle(n += 1);
  // };
  const comp = () => {
    let visited = [];
    let attack = Math.floor(Math.random() * 100) + 1;
    while(visited.includes(attack)){
      attack = Math.floor(Math.random() * 100) + 1;
    }
    visited.push(attack);
    document.querySelector(`#gird1 > blocks${attack}`);
  }
  return {Ship,Gameboard}
}
export {gameObject}
  

