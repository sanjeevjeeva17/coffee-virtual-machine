import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { GenericCardComponent } from '../../shared/generic-card-component/generic-card.component';

@Component({
  selector: 'app-customization-component',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardTitle, GenericCardComponent],
  templateUrl: './customization-component.component.html',
  styleUrls: ['./customization-component.component.scss'],
})
export class CustomizationComponentComponent {
  @Input() customizationOptions: { title: string, choices: string[] }[] = [];
  selectedOptions: { [key: string]: string | number } = {};
  @Output() allOptionsSelected = new EventEmitter<{ [key: string]: string | number }>();

  public onSelectOption(optionTitle: string, choice: string): void {
    this.selectedOptions[optionTitle] = choice;

    // Calculate amounts based on the chosen options
    if (optionTitle === 'Cup Size') {
      this.selectedOptions['milkAmount'] = this.getMilkAmount(choice);
    }
    if (optionTitle === 'Sugar Level') {
      this.selectedOptions['sugarAmount'] = this.getSugarAmount(choice);
    }

    const allOptionsSelected = this.customizationOptions.every(option => this.selectedOptions[option.title] !== undefined);

    if (allOptionsSelected) {
      console.log('All options selected:', this.selectedOptions);
      this.allOptionsSelected.emit({ ...this.selectedOptions });
    }
  }

  public getMilkAmount(cupSize: string): number {
    switch (cupSize) {
      case 'Medium':
        return 0.3;
      case 'Large':
        return 0.45;
      default:
        return 0.1;
    }
  }

  public getSugarAmount(sugarLevel: string): number {
    switch (sugarLevel) {
      case 'None':
        return 0;
      case 'Low':
        return 0.1;
      case 'Medium':
        return 0.2;
      case 'High':
        return 0.3;
      default:
        return 0;
    }
  }

  public resetSelections(): void {
    this.selectedOptions = {};
  }
}
