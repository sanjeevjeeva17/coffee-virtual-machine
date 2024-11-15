import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogData } from '../../schema/model/dialogData.model';

@Component({
  selector: 'app-generic-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './generic-dialog.component.html',
  styleUrl: './generic-dialog.component.scss'
})
export class GenericDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<GenericDialogComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  onAction(): void {
    if (this.data.onAction) {
      this.data.onAction();
    }
    this.close();
  }
}
