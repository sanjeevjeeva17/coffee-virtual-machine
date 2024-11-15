import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomizationComponentComponent } from './customization-component.component';
import { GenericCardComponent } from '../../shared/generic-card-component/generic-card.component';

describe('CustomizationComponentComponent', () => {
  let component: CustomizationComponentComponent;
  let fixture: ComponentFixture<CustomizationComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomizationComponentComponent, GenericCardComponent], // Import the standalone components
    }).compileComponents();

    fixture = TestBed.createComponent(CustomizationComponentComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit allOptionsSelected when all options are selected', () => {
    component.customizationOptions = [
      { title: 'Cup Size', choices: ['Small', 'Medium', 'Large'] },
      { title: 'Sugar Level', choices: ['None', 'Low', 'Medium', 'High'] },
    ];
    fixture.detectChanges();

    // Replace the emit function with a Jest mock
    component.allOptionsSelected.emit = jest.fn();

    component.onSelectOption('Cup Size', 'Medium');
    component.onSelectOption('Sugar Level', 'Medium');

    expect(component.allOptionsSelected.emit).toHaveBeenCalledWith({
      'Cup Size': 'Medium',
      'Sugar Level': 'Medium',
      milkAmount: 0.3,
      sugarAmount: 0.2,
    });
  });

  it('should calculate correct milk amount based on cup size', () => {
    expect(component.getMilkAmount('Small')).toBe(0.1);
    expect(component.getMilkAmount('Medium')).toBe(0.3);
    expect(component.getMilkAmount('Large')).toBe(0.45);
  });

  it('should calculate correct sugar amount based on sugar level', () => {
    expect(component.getSugarAmount('None')).toBe(0);
    expect(component.getSugarAmount('Low')).toBe(0.1);
    expect(component.getSugarAmount('Medium')).toBe(0.2);
    expect(component.getSugarAmount('High')).toBe(0.3);
  });

  it('should reset selections when resetSelections is called', () => {
    component.selectedOptions = {
      'Cup Size': 'Large',
      'Sugar Level': 'High',
      milkAmount: 0.45,
      sugarAmount: 0.3,
    };

    component.resetSelections();

    expect(component.selectedOptions).toEqual({});
  });

  it('should update selectedOptions when onSelectOption is called', () => {
    component.customizationOptions = [{ title: 'Cup Size', choices: ['Small', 'Medium', 'Large'] }];
    fixture.detectChanges();

    component.onSelectOption('Cup Size', 'Large');
    expect(component.selectedOptions['Cup Size']).toBe('Large');
    expect(component.selectedOptions['milkAmount']).toBe(0.45);
  });
});
