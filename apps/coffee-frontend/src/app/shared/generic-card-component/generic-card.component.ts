import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-generic-card',
  templateUrl: 'generic-card.component.html',
  standalone: true,
  imports: [
    MatCard,
    NgClass,
    MatCardTitle
  ],
  styleUrls: ['./generic-card.component.scss']
})
export class GenericCardComponent {
  @Input() title = '';
  @Input() selected = false;
  @Output() cardSelected = new EventEmitter<void>();

  onCardClick(): void {
    this.cardSelected.emit();
  }

  handleCardKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onCardClick();
    }
  }
}
