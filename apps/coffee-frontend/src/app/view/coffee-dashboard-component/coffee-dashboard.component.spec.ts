import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoffeeDashboardComponent } from './coffee-dashboard.component';
import { CoffeeSelectionComponent } from '../coffee-selection-component/coffee-selection.component';
import { CustomizationComponentComponent } from '../customization-component/customization-component.component';
import { BrewComponentComponent } from '../brew-component/brew-component.component';
import { GenericDialogComponent } from '../../shared/generic-dialog-component/generic-dialog.component';
import { ResourceService } from '../../services/resource.service';
import { OrderService } from '../../services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import { MatButton } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CoffeeDashboardComponent', () => {
  let component: CoffeeDashboardComponent;
  let fixture: ComponentFixture<CoffeeDashboardComponent>;
  let resourceService: jest.Mocked<ResourceService>;
  let orderService: jest.Mocked<OrderService>;
  let dialog: jest.Mocked<MatDialog>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    resourceService = {
      getResources: jest.fn(),
      useResources: jest.fn(),
    } as unknown as jest.Mocked<ResourceService>;

    orderService = {
      createOrder: jest.fn(),
    } as unknown as jest.Mocked<OrderService>;

    dialog = {
      open: jest.fn().mockReturnValue({
        afterClosed: () => of(true),
      }),
    } as unknown as jest.Mocked<MatDialog>;

    router = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      imports: [
        CoffeeDashboardComponent,
        CoffeeSelectionComponent,
        CustomizationComponentComponent,
        BrewComponentComponent,
        MatAccordion,
        MatExpansionPanel,
        MatButton,
        GenericDialogComponent,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ResourceService, useValue: resourceService },
        { provide: OrderService, useValue: orderService },
        { provide: MatDialog, useValue: dialog },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CoffeeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should check machine status and set status to "Machine is ready"', async () => {
    resourceService.getResources.mockReturnValue(of({
      almond: 20,
      skimmed: 20,
      soy: 20,
      whole: 20,
      sugar: 20,
      coffeeBean: 20,
      message: ''
    }));

    component.checkMachineStatus();
    fixture.detectChanges();

    await fixture.whenStable();

    expect(component.machineStatus()).toBe('Machine is ready');
  });

  it('should handle coffee selection and filter customization options', () => {
    component.handleCoffeeSelection('Espresso');
    fixture.detectChanges();
    expect(component.selectedCoffee()).toBe('Espresso');
    expect(component.showMilkType()).toBe(false);
  });

  it('should update customization data on handleCustomization', () => {
    const customizationData = {
      'Milk Type': 'Almond',
      'Cup Size': 'Large',
      'Sugar Level': 'Medium',
      milkAmount: 0.45,
      sugarAmount: 0.2,
    };
    component.handleCustomization(customizationData);
    fixture.detectChanges();

    expect(component.customizationData()).toEqual({
      milkType: 'Almond',
      cupSize: 'Large',
      sugarLevel: 'Medium',
      milkAmount: '0.45',
      sugarAmount: '0.2',
    });
  });

  it('should navigate to login on admin login', () => {
    component.onAdminLogin();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should reset the coffee machine and open a dialog', () => {
    component.resetCoffeeMachine();
    fixture.detectChanges();

    expect(component.step()).toBe(0);
    expect(component.selectedCoffee()).toBe(null);
    expect(dialog.open).toHaveBeenCalledWith(GenericDialogComponent, expect.objectContaining({
      data: expect.objectContaining({
        title: 'Hello there!',
        message: expect.stringContaining('Enjoy your'),
      }),
    }));
  });
});
