import { NgModule } from '@angular/core';

import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [],
  imports: [
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule
  ],
  exports: [
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule

  ]
})
export class MaterialModule { }
