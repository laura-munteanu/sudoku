import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameState } from './models/game-state.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() gameState: GameState;
  @Output() gameStatusChanged: EventEmitter<string>;
  secondsElapsed: number;
  timerDisplay: string;

  private timerId: number;


  constructor() {
    this.gameStatusChanged = new EventEmitter<string>();
  }

  ngOnInit(): void {
    this.secondsElapsed = 0;
    this.setTimerDisplay();
   // this.getTimerDisplayed();
  }

  public isButtonVisible(button: string) {
    let visible: boolean;
    switch (button) {
      case 'start':
        visible = this.gameState == GameState.NotStarted || this.gameState == GameState.Stopped;
        break;
      case 'pause':
        visible = this.gameState != GameState.Paused;
        break;
      case 'resume':
        visible = this.gameState == GameState.Paused;
        break;
      case 'stop':
        visible = this.gameState == GameState.InProgress || this.gameState == GameState.Paused;
        break;
    }
    return visible;
  }

  public isButtonDisabled(button: string) {
    let disabled: boolean;
    switch (button) {
      case 'start':
        disabled = this.gameState == GameState.InProgress || this.gameState == GameState.Paused;
        break;
      case 'pause':
      case 'resume':
        disabled = this.gameState == GameState.NotStarted || this.gameState == GameState.Stopped;
        break;
      case 'stop':
        disabled = this.gameState == GameState.NotStarted || this.gameState == GameState.Stopped;
        break;
    }
    return disabled;
  }

  public btnClick(button: string) {
    switch (button) {
      case 'start':
        this.secondsElapsed = 0;
        this.setTimerDisplay();
        this.startTimer();
        break;
      case 'pause':
        this.stopTimer();
        break;
      case 'resume':
        this.startTimer();
        break;
      case 'stop':
        this.stopTimer();
        break;
    }
    this.gameStatusChanged.emit(button);
  }

  // public getTimerDisplayed() {

  // }

  public startTimer() {
    this.timerId = +(setInterval(() => {
      this.secondsElapsed++;
      this.setTimerDisplay();
    }, 1000));
  }

  public stopTimer() {
    clearInterval(this.timerId);
  }

  private setTimerDisplay(){
    let nbMinutes = Math.floor(this.secondsElapsed / 60);
    let nbSeconds = this.secondsElapsed - (nbMinutes * 60);
    this.timerDisplay = '';
    if ( nbMinutes < 10){
      this.timerDisplay += '0';
    }
    this.timerDisplay += nbMinutes;
    this.timerDisplay += ' : ';
    if (nbSeconds < 10){
      this.timerDisplay += '0';
    }
    this.timerDisplay += nbSeconds;
  }
}

