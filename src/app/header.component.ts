import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameState } from './models/game-state.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() gameState: GameState;
  @Output() gameStatusChanged: EventEmitter<GameState>;


  constructor() {
    this.gameStatusChanged = new EventEmitter<GameState>();
  }

  ngOnInit(): void {
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
      case 'stopped':
        visible = this.gameState == GameState.InProgress || this.gameState == GameState.Paused;
        break;
    }
    return visible;
  }

  public isButtonDisabled(button: string){
    let disabled: boolean;
    switch (button) {
      case 'start':
        disabled = this.gameState == GameState.InProgress || this.gameState == GameState.Paused;
        break;
      case 'pause':
      case 'resume':
        disabled = this.gameState == GameState.NotStarted || this.gameState == GameState.Stopped;
        break;
      case 'stopped':
        disabled = this.gameState == GameState.NotStarted || this.gameState == GameState.Stopped;
        break;
    }
    return disabled;
  }

  public btnClick(button: string) {
   switch(button){
      case 'start':
        this.gameStatusChanged.emit(GameState.InProgress);
        break;
      case 'pause':
        this.gameStatusChanged.emit(GameState.Paused);
        break;
      case 'resume':
        this.gameStatusChanged.emit(GameState.InProgress);
        break;
      case 'stopped':
        this.gameStatusChanged.emit(GameState.NotStarted);
        break;
    }
  }
  
}
