import { Component, OnInit } from '@angular/core';
import { GameState } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'sudoku';
  public numberOfBlocks: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  public game: any[][] = [];
  public displayGame: any[][] = [];
  public gameState: GameState;


  ngOnInit() {
    this.generate();
  }

  private generate() {
    this.game = [
      [9, 8, 7, 6, 5, 4, 3, 2, 1],
      [2, 4, 6, 1, 7, 3, 9, 8, 5],
      [3, 5, 1, 9, 2, 8, 7, 4, 6],
      [1, 2, 8, 5, 3, 7, 6, 9, 4],
      [6, 3, 4, 8, 9, 2, 1, 5, 7],
      [7, 9, 5, 4, 6, 1, 8, 3, 2],
      [5, 1, 9, 2, 8, 6, 4, 7, 3],
      [4, 7, 2, 3, 1, 9, 5, 6, 8],
      [8, 6, 3, 7, 4, 5, 2, 1, 9]
    ];

    // this.game = [
    //   [, , , , , , , ,],
    //   [, , , , , , , ,],
    //   [, , , , , , , ,],
    //   [, , , , , , , ,],
    //   [, , , , , , , ,],
    //   [, , , , , , , ,],
    //   [, , , , , , , ,],
    //   [, , , , , , , ,],
    //   [, , , , , , , ,],
    // ]
    this.createGameByLevel();
    this.setDisplayGame();
    this.gameState = GameState.InProgress;
  }

  private createGameByLevel() {
    let cells = [];

    for (let j = 0; j < 9; j++) {
      let i = Math.floor(Math.random() * 8);
      this.game[j][i] = '';
      this.game[i][j] = '';
      this.game[i][i] = '';
    }
    for (let i = 0; i < 9; i++) {
      let j = Math.floor(Math.random() * 8);
      this.game[i][j] = '';
      this.game[j][i] = '';
      this.game[j][j] = '';
    }
  }

  private setDisplayGame() {
    this.displayGame = [];
    for (let i = 0; i < 9; i++) {
      const indexLine = Math.floor(i / 3) * 3;
      const indexColumn = (i % 3) * 3;
      const block = [];
      for (let r = indexLine; r < indexLine + 3; r++) {
        for (let c = indexColumn; c < indexColumn + 3; c++) {
          block.push(this.game[r][c]);
        }
      }
      this.displayGame.push(block);
    }
  }


  public changeGameStatus(newState: GameState){
    this.gameState = newState;
  }
  
  // get_row(board, row) {
  //   // Given a board, we can return a single row
  //   return board[row]
  // }

  // a = this.get_row(this.game, 0);

  // get_column(board, column) {
  //   var col = []
  //   for (let row = 0; row < 9; row++) {
  //     col.push(board[row][column]);
  //   }
  //   return col
  // }


  // get_square(board) {
  //   let cells = []
  //   for (let r = 0; r < 9; r++) {
  //     for (let c = 0; c < 9; c++) {
  //       cells.push(board[r][c])
  //     }
  //   }
  //   return cells
  // }
  // s = this.get_square(this.game);



  //generate easy game
  /*start_game(board) {
    board = [
      [9, 8, 7, 6, 5, 4, 3, 2, 1],
      [2, 4, 6, 1, 7, 3, 9, 8, 5],
      [3, 5, 1, 9, 2, 8, 7, 4, 6],
      [1, 2, 8, 5, 3, 7, 6, 9, 4],
      [6, 3, 4, 8, 9, 2, 1, 5, 7],
      [7, 9, 5, 4, 6, 1, 8, 3, 2],
      [5, 1, 9, 2, 8, 6, 4, 7, 3],
      [4, 7, 2, 3, 1, 9, 5, 6, 8],
      [8, 6, 3, 7, 4, 5, 2, 1, 9]
    ]
    this.game = board
    let cells = [];

    for (let j = 0; j < 9; j++) {
      let i = Math.floor(Math.random() * 8);
      board[j][i] = '';
      board[i][j] = '';
      board[i][i] = '';
      // cells.push(board[j][i])
    }
    for (let i = 0; i < 9; i++) {
      let j = Math.floor(Math.random() * 8);
      board[i][j] = '';
      board[j][i] = '';
      board[j][j] = '';
      // cells.push(board[i][j])
    }
    return board
  }
  y = this.start_game;
  */
}
