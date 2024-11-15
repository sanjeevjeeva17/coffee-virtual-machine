import { ResourceDtoModel } from '../schema/dto/resourceDto.model';
import { ResourceValue } from '../schema/model/resourceValue';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ResourceHelperService {
 // max values for the coffee machine
private maxValues = {
    milkTypes: 2,
    sugar: 1,
    coffeeBean: 1
  };

private calculateResourcePercentages(resources: ResourceDtoModel): ResourceValue {
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

public checkResourceStatus(resources: ResourceDtoModel): ResourceValue {
    const percentages = this.calculateResourcePercentages(resources);

    const allZero = Object.values(resources).every(value => value === 0);
    if (allZero) {
      return { ...percentages, message: 'All resources are depleted. Please reload resources.' };
    }
    return { ...percentages, message: 'Resource levels in percentages.' };
  }
}
