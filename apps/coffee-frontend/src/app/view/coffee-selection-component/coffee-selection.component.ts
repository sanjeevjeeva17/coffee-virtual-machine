import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { GenericCardComponent } from '../../shared/generic-card-component/generic-card.component';

@Component({
  selector: 'app-coffee-selection',
  standalone: true,
  imports: [CommonModule, MatButton, MatCardTitle, MatCard, GenericCardComponent],
  templateUrl: './coffee-selection.component.html',
  styleUrls: ['./coffee-selection.component.css'],
})
export class CoffeeSelectionComponent {
  @Input() coffeeOptions: string[] = [];
  @Input() selectedCoffee: string | null = null;
  @Output() coffeeSelected = new EventEmitter<string>();

  onSelectCoffee(coffee: string) {
    this.selectedCoffee = coffee;
    this.coffeeSelected.emit(coffee);
  }
}
