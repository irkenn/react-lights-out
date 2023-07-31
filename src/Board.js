import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard(nrows, ncols));

  function createBoard(nRows, nColumns) {
    /** creates a board of  nrows high and ncols wide, each cell randomly lit or unlit (true/false) */
    let initialBoard = [];
    for( let i=0; i<nRows; i++){
      let columns = [];
      for (let j=0; j<nColumns; j++){
        if(Math.random() > 0.5){
            columns.push(true);
        }
        else {
          columns.push(false);
        }
      }
      initialBoard.push(columns);
    }    
    return initialBoard;
  }
    // ****** I don't know how to access the board from state
  function hasWon(board){
    // Checks the board and returns true is all cells are true, returns false at the moment it finds a false one
      for ( let row of board){
          let result = row.every(column => column === true);
          if (result === false){
            return false;
          }
        }
      return true; 
    }
  

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      // So "2-3" is the coordenates format that will be passed to this function, the first line
      // converts it to an array with two values inside [2, 3]

      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => { // This another way of defining 'function flipCell(y, x, boardCopy){'
        
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) { //This ensures that the selection is within the array
          boardCopy[y][x] = !boardCopy[y][x]; // This toggles the value of the "cell"
        }
      };

      // Makes a deep copy of the oldBoard
      const newBoard = [];
      for(let arr of oldBoard){
        let newArr = arr.slice();
        newBoard.push(newArr);
      }

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard);
      flipCell(y-1, x, newBoard);
      flipCell(y+1, x, newBoard);
      flipCell(y, x-1, newBoard);
      flipCell(y, x+1, newBoard);
      
      return newBoard
    });
  }

  // let initalArray = createBoard(nrows, ncols);
  // console.log(initalArray);
  // populateBoard(initalArray)
  // if the game is won, just show a winning msg & render nothing else
  
  
  // This renders the board

  return (
    <div>
        {hasWon(board) ? (
        <h1>You won!</h1> 
        ) : ( 
          <table>
            <tbody>
              {board.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((value, colIndex) => (
                    <Cell key={colIndex} isLit={value} flipCellsAroundMe={() => flipCellsAround(`${rowIndex}-${colIndex}`)}/>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
  );
  // TODO

  // make table board

  // TODO
}

export default Board;
