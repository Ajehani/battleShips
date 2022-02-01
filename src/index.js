import { createBoard } from "./dom.js";
import "./style.css";
(function () {
  createBoard();
  // createBoard().populate(1);
  // createBoard().populate(2);
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
    return { place, receiveAttack };
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
  const Player = () => {
    let nu = 0;
    const toggle = (num) => {
      return 2 % num;
    };
    let state = toggle((nu += 1));
  };
})();
