import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-brew-component',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './brew-component.component.html',
  styleUrls: ['./brew-component.component.css']
})
export class BrewComponentComponent {
  @Output() brewingStarted = new EventEmitter<void>();
  @Output() brewingCompleted = new EventEmitter<void>();
  brewing = signal<boolean>(false);
  progress = signal<number>(0);
  hasBrewed = signal<boolean>(false);

  startBrewing() {
    this.brewing.set(true);
    this.hasBrewed.set(false);
    this.progress.set(0);

    this.brewingStarted.emit();

    const interval = setInterval(() => {
      this.progress.update(p => p + 10);
      if (this.progress() >= 100) {
        clearInterval(interval);
        this.brewing.set(false);
        this.hasBrewed.set(true);
        this.brewingCompleted.emit();
      }
    }, 1000);
  }


  isBrewing(): boolean {
    return this.brewing();
  }
}
