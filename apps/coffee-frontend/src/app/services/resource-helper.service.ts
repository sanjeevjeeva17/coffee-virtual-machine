import { ResourceDto } from '../schema/dto/resourceDto';
import { ResourceValue } from '../schema/model/resourceValue';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root', // Ensure the service is provided at the root level
})
export class ResourceHelperService {
private maxValues = {
    milkTypes: 2, // Maximum capacity in liters for all types of milk
    sugar: 1, // Maximum capacity in kilograms for sugar
    coffeeBean: 1
  };

private calculateResourcePercentages(resources: ResourceDto): ResourceValue {
    return {
      almond: (resources.almond / this.maxValues.milkTypes) * 100,
      skimmed: (resources.skimmed / this.maxValues.milkTypes) * 100,
      soy: (resources.soy / this.maxValues.milkTypes) * 100,
      whole: (resources.whole / this.maxValues.milkTypes) * 100,
      sugar: (resources.sugar / this.maxValues.sugar) * 100,
      coffeeBean: (resources.coffeeBean / this.maxValues.sugar) * 100,
      message: '',
    };
  }

public checkResourceStatus(resources: ResourceDto): ResourceValue {
    const percentages = this.calculateResourcePercentages(resources);

    const allZero = Object.values(resources).every(value => value === 0);
    if (allZero) {
      return { ...percentages, message: 'All resources are depleted. Please reload resources.' };
    }
    return { ...percentages, message: 'Resource levels in percentages.' };
  }
}
