import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { ResourceValue } from '../../schema/model/resourceValue';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-resource-overview',
  standalone: true,
  imports: [CommonModule, MatCardTitle, MatCard, MatProgressBarModule, MatButton],
  templateUrl: './resource-overview.component.html',
  styleUrls: ['./resource-overview.component.css'],
})
export class ResourceOverviewComponent {
  @Input() resources: ResourceValue = {
    almond: 0,
    skimmed: 0,
    soy: 0,
    whole: 0,
    sugar: 0,
    coffeeBean: 0,
    message: '',
  };
  @Output() loadResourcesEvent = new EventEmitter<void>();

  protected loadResources(): void {
    this.loadResourcesEvent.emit();
  }
}
