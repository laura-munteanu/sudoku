import { NgModule } from '@angular/core';

import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
// import { MatDialogRef } from '@angular/material/dialog';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatDialog } from '@angular/material/dialog';




@NgModule({
  declarations: [],
  imports: [
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    // MatDialogRef,
    // MatDialogModule,
    // MatDialog
  ],
  exports: [
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    // MatDialogRef,
    // MatDialogModule,
    // MatDialog

  ]
})
export class MaterialModule { }
