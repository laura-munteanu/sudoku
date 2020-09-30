import { Component, OnInit } from '@angular/core';
import { GameState } from './models';
import { MaterialModule } from './shared/material.module';


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
  public originalDisplayGame: any[][] = [];
  public gameCellState: any[][] = [];
  public gameState: GameState;
  public gamePaused: boolean;
  public blockCellState: string;
  public gameOver: boolean;


  ngOnInit() {
    this.initEmptyGame();
  }

  private initEmptyGame() {
    this.game = [
      [, , , , , , , ,],
      [, , , , , , , ,],
      [, , , , , , , ,],
      [, , , , , , , ,],
      [, , , , , , , ,],
      [, , , , , , , ,],
      [, , , , , , , ,],
      [, , , , , , , ,],
      [, , , , , , , ,],
    ];
    this.setDisplayGame();
    this.gameState = GameState.NotStarted;
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

    this.createGameByLevel();
    this.setDisplayGame();
    this.gameState = GameState.InProgress;
  }

  private createGameByLevel() {
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
    this.originalDisplayGame = [];
    this.gameCellState = [];
    for (let i = 0; i < 9; i++) {
      const indexLine = Math.floor(i / 3) * 3;
      const indexColumn = (i % 3) * 3;
      const block = [];
      const blockCellState = [];
      for (let r = indexLine; r < indexLine + 3; r++) {
        for (let c = indexColumn; c < indexColumn + 3; c++) {
          block.push(this.game[r][c] ? this.game[r][c] : '');
          blockCellState.push('normal');
        }
      }
      this.displayGame.push(block);
      this.originalDisplayGame.push(block.slice());
      this.gameCellState.push(blockCellState);
    }
    console.log('current game', this.displayGame);
    console.log('original game', this.originalDisplayGame);
  }


  public changeGameStatus(buttonName: string) {
    this.gamePaused = false;
    switch (buttonName) {
      case 'start':
        this.generate();
        this.gameState = GameState.InProgress;
        break;
      case 'pause':
        this.gameState = GameState.Paused;
        this.gamePaused = true;
        break;
      case 'resume':
        this.gameState = GameState.InProgress;
        break;
      case 'stop':
        this.gameState = GameState.NotStarted;
        break;
    }
  }


  public updateGameValues(event, numberBlock, numberCell) {
    this.displayGame[numberBlock][numberCell] = event.target.value ? +event.target.value : '';
    let checkedValues = [];

    //check block 
    for (let i = 0; i < 9; i++) {
      if (i != numberCell) {
        checkedValues.push(this.displayGame[numberBlock][i]);
      }
    }
    let result = this.hasDuplicates(checkedValues, this.displayGame[numberBlock][numberCell]);
    if (result) {
      this.gameCellState[numberBlock][numberCell] = 'error';
      return;
    }

    //check line: golesc array
    checkedValues = [];
    let x = 6;
    if (numberBlock >= 0 && numberBlock <= 2) {
      x = 0;
    }
    else if (numberBlock >= 3 && numberBlock <= 5) {
      x = 3;
    }

    let y = 6;
    if (numberCell >= 0 && numberCell <= 2) {
      y = 0;
    }
    else if (numberCell >= 3 && numberCell <= 5) {
      y = 3;
    }

    for (let i = x; i < x + 3; i++) {
      for (let j = y; j < y + 3; j++) {
        if (i != numberBlock || j != numberCell) {
          checkedValues.push(this.displayGame[i][j]);
        }
      }
    }
    result = this.hasDuplicates(checkedValues, this.displayGame[numberBlock][numberCell]);
    if (result) {
      this.gameCellState[numberBlock][numberCell] = 'error';
      return;
    }


    //check column
    checkedValues = [];
    let c = 2
    if (numberBlock % 3 == 0) {
      c = 0;
    }
    else if (numberBlock % 3 == 1) {
      c = 1;
    }

    let d = 2;
    if (numberCell % 3 == 0) {
      d = 0;
    }
    else if (numberCell % 3 == 1) {
      d = 1;
    }

    for (let i = c; i < 9; i = i + 3) {
      for (let j = d; j < 9; j = j + 3) {
        if (i != numberBlock || j != numberCell) {
          checkedValues.push(this.displayGame[i][j]);
        }
      }
    }
    result = this.hasDuplicates(checkedValues, this.displayGame[numberBlock][numberCell]);
    if (result) {
      this.gameCellState[numberBlock][numberCell] = 'error';
      return;
    }

    // duplicates not found for any of the cases 
    this.gameCellState[numberBlock][numberCell] = 'normal';

    this.gameOver = this.checkGameOver(this.displayGame, this.gameCellState);
    if (this.gameOver == false) {
      window.alert('game is over');
    }
  }

  private hasDuplicates(values: any[], currentValue): boolean {
    for (let i = 0; i < values.length; i++) {
      if ((values[i] == currentValue) && currentValue != '') {
        return true;
      }
    }
    return false;
  }

  private checkGameOver(game: any[][], gameCellState): boolean {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (game[i][j] == '' || gameCellState[i][j] == 'error') {
          return true;
        }
      }
    }
    return false;
  }


  public selectCell(numberBlock, numberCell) {
    //reset the state of the entire martrix
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.gameCellState[i][j] != 'error') {
          this.gameCellState[i][j] = 'normal';
        }
      }
    }

    if (this.originalDisplayGame[numberBlock][numberCell]) {
      return;
    }

    //mark clicked cell as selected
    if (this.gameCellState[numberBlock][numberCell] != 'error') {
      this.gameCellState[numberBlock][numberCell] = 'selected';
    }

    //mark block as highlighted
    for (let i = 0; i < 9; i++) {
      if (i != numberCell && this.gameCellState[numberBlock][i] != 'error') {
        this.gameCellState[numberBlock][i] = 'highlighted';
      }
    }

    //mark line as highlighted
    let x = 6;
    if (numberBlock >= 0 && numberBlock <= 2) {
      x = 0;
    }
    else if (numberBlock >= 3 && numberBlock <= 5) {
      x = 3;
    }

    let y = 6;
    if (numberCell >= 0 && numberCell <= 2) {
      y = 0;
    }
    else if (numberCell >= 3 && numberCell <= 5) {
      y = 3;
    }

    for (let i = x; i < x + 3; i++) {
      for (let j = y; j < y + 3; j++) {
        if ((i != numberBlock || j != numberCell) && this.gameCellState[i][j] != 'error') {
          this.gameCellState[i][j] = 'highlighted';
        }
      }
    }

    //mark column as highlighted
    let c = 2
    if (numberBlock % 3 == 0) {
      c = 0;
    }
    else if (numberBlock % 3 == 1) {
      c = 1;
    }

    let d = 2;
    if (numberCell % 3 == 0) {
      d = 0;
    }
    else if (numberCell % 3 == 1) {
      d = 1;
    }

    for (let i = c; i < 9; i = i + 3) {
      for (let j = d; j < 9; j = j + 3) {
        if ((i != numberBlock || j != numberCell) && this.gameCellState[i][j] != 'error') {
          this.gameCellState[i][j] = 'highlighted';
        }
      }
    }
  }

  public numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keycode;
    if (charCode < 49 || charCode > 57) {
      return false;
    }
    return true;
  }
}
