import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoffeeSelectionComponent } from './coffee-selection.component';
import { GenericCardComponent } from '../../shared/generic-card-component/generic-card.component';
import { By } from '@angular/platform-browser';

describe('CoffeeSelectionComponent', () => {
  let component: CoffeeSelectionComponent;
  let fixture: ComponentFixture<CoffeeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoffeeSelectionComponent, GenericCardComponent], // Import the standalone component and any required child components
    }).compileComponents();

    fixture = TestBed.createComponent(CoffeeSelectionComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display coffee options', () => {
    component.coffeeOptions = ['Espresso', 'Latte', 'Cappuccino'];
    fixture.detectChanges();

    const coffeeOptionsElements = fixture.debugElement.queryAll(By.css('app-generic-card'));
    expect(coffeeOptionsElements.length).toBe(3);

    const optionTexts = coffeeOptionsElements.map(el => el.nativeElement.textContent.trim());
    expect(optionTexts).toEqual(['Espresso', 'Latte', 'Cappuccino']);
  });

  it('should set selectedCoffee and emit event when a coffee is selected', () => {
    component.coffeeOptions = ['Espresso', 'Latte', 'Cappuccino'];
    fixture.detectChanges();

    // Replace the emit function with a Jest mock function
    component.coffeeSelected.emit = jest.fn();

    component.onSelectCoffee('Latte');
    fixture.detectChanges();

    expect(component.selectedCoffee).toBe('Latte');
    expect(component.coffeeSelected.emit).toHaveBeenCalledWith('Latte');
  });


  it('should correctly update the selected coffee when a coffee is clicked', () => {
    component.coffeeOptions = ['Espresso', 'Latte'];
    fixture.detectChanges();

    component.onSelectCoffee('Latte');
    fixture.detectChanges();

    expect(component.selectedCoffee).toBe('Latte');
  });

});
