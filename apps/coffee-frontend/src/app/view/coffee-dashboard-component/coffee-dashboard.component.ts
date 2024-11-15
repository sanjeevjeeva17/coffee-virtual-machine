import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  signal, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { CoffeeSelectionComponent } from '../coffee-selection-component/coffee-selection.component';
import { CustomizationComponentComponent } from '../customization-component/customization-component.component';
import { BrewComponentComponent } from '../brew-component/brew-component.component';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { ResourceService } from '../../services/resource.service';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from '../../shared/generic-dialog-component/generic-dialog.component';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-coffee-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatIcon,
    CoffeeSelectionComponent,
    CustomizationComponentComponent,
    BrewComponentComponent,
    MatButton,
  ],
  templateUrl: './coffee-dashboard.component.html',
  styleUrls: ['./coffee-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ResourceService, OrderService],
})
export class CoffeeDashboardComponent implements OnInit {
  @ViewChild(CustomizationComponentComponent) customizationComponent!: CustomizationComponentComponent;

  step = signal<number>(0);
  machineStatus = signal<string>('Checking resources...');
  coffeeOptions = ['Espresso', 'Latte', 'Cappuccino', 'Americano', 'Make Your Own Coffee'];
  selectedCoffee = signal<string | null>(null);
  customizationData = signal<{
    milkType: string;
    cupSize: string;
    sugarLevel: string;
    milkAmount: string;
    sugarAmount: string;
  }>({
    milkType: '',
    cupSize: '',
    sugarLevel: '',
    milkAmount: '0',
    sugarAmount: '0',
  });

  // Add this property
  customizationOptions = [
    { title: 'Milk Type', choices: ['Whole', 'Skim', 'Soy', 'Almond'] },
    { title: 'Cup Size', choices: ['Small', 'Medium', 'Large'] },
    { title: 'Sugar Level', choices: ['None', 'Low', 'Medium', 'High'] },
  ];
  showMilkType = signal<boolean>(true);
  isPreviousButtonDisabled = signal<boolean>(false);

  constructor(private resourceService: ResourceService, private dialog: MatDialog, private router: Router, private orderService: OrderService) {}

  ngOnInit(): void {
    this.checkMachineStatus();
  }

  setStep(index: number): void {
    this.step.set(index);
  }

  nextStep(): void {
    this.step.set(this.step() + 1);
  }

  previousStep(): void {
    if (this.step() > 0) {
      this.step.set(this.step() - 1);
    }
  }

  checkMachineStatus(): void {
    this.resourceService.getResources().subscribe({
      next: (response) => {
        const allResourcesAvailable = Object.entries(response).every(([key, value]) => {
          if (key === 'message') return true;
          return typeof value === 'number' && value > 10;
        });
        this.machineStatus.set(allResourcesAvailable ? 'Machine is ready' : 'resources are not available wait until serviced');
      },
      error: (error) => {
        console.error('Error fetching resources:', error);
        this.machineStatus.set('Error checking resources');
        this.dialog.open(GenericDialogComponent, {
          data: {
            title: 'Error',
            message: 'Failed to load resources. Please try again later.',
          },
        });
      },
    });
  }


  handleCoffeeSelection(coffee: string): void {
    this.selectedCoffee.set(coffee);
    if (coffee === 'Espresso' || coffee === 'Americano') {
      this.customizationOptions = this.customizationOptions.filter(option => option.title !== 'Milk Type');
      this.showMilkType.set(false);
    } else {
      if (!this.customizationOptions.some(option => option.title === 'Milk Type')) {
        this.customizationOptions = [
          { title: 'Milk Type', choices: ['Whole', 'Skim', 'Soy', 'Almond'] },
          ...this.customizationOptions.filter(option => option.title !== 'Milk Type')
        ];
        this.showMilkType.set(true);
      }
    }

    console.log(`Selected coffee type: ${coffee}`);
    this.nextStep();
  }

  handleCustomization(coffeeData: { [key: string]: string | number }): void {
    this.customizationData.update((currentData) => {
      if (coffeeData['Milk Type'] !== undefined) {
        currentData.milkType = coffeeData['Milk Type'] as string;
      }
      if (coffeeData['Cup Size'] !== undefined) {
        currentData.cupSize = coffeeData['Cup Size'] as string;
        currentData.milkAmount = coffeeData['milkAmount'].toString();
      }
      if (coffeeData['Sugar Level'] !== undefined) {
        currentData.sugarLevel = coffeeData['Sugar Level'] as string;
        currentData.sugarAmount = coffeeData['sugarAmount'].toString();
      }
      if (!this.showMilkType()) {
        currentData.milkType = 'No Milk';
        currentData.milkAmount = '0';
      }

      console.log('Updated customization data:', JSON.stringify(currentData));

      return currentData;
    });
    this.nextStep();
  }

  handleBrewingStarted(): void {
    this.isPreviousButtonDisabled.set(true);
    const customization = this.customizationData();
    const coffee = this.selectedCoffee();
    const payload = {
      almond: customization.milkType === 'Almond' ? parseFloat(customization.milkAmount) || 0 : 0,
      soy: customization.milkType === 'Soy' ? parseFloat(customization.milkAmount) || 0 : 0,
      whole: customization.milkType === 'Whole' ? parseFloat(customization.milkAmount) || 0 : 0,
      skimmed: customization.milkType === 'Skim' ? parseFloat(customization.milkAmount) || 0 : 0,
      sugar: parseFloat(customization.sugarAmount) || 0,
      coffeeBean: this.getCoffeeBeanAmount(this.selectedCoffee()),
    };
    this.resourceService.useResources(payload).subscribe({
      next: (response) => {

        const order = {
          coffeeType: coffee,
          size: customization.cupSize,
          sugar: customization.sugarLevel,
          milk:customization.milkType
        }
        this.sendOrderUpdate(order);
        console.log('Resources used successfully:', response);
        this.checkMachineStatus();
      },
      error: (error) => {
        console.error('Error during brewing:', error);
      },
    });
  }

  private getCoffeeBeanAmount(coffeeType: string | null): number {
    switch (coffeeType) {
      case 'Espresso':
        return 0.15;
      case 'Americano':
        return 0.1;
      case 'Cappuccino':
        return 0.12;
      case 'Latte':
        return 0.1;
      default:
        return 0;
    }
  }

  onAdminLogin(): void {
    this.router.navigate(['/login']);
  }

  sendOrderUpdate(orderDetails: any): void {
    this.orderService.createOrder(orderDetails).subscribe({
      next: (response) => {
        console.log('order updated successfully', response)
      }
    });
  }
  resetCoffeeMachine(): void{
    this.showDialog();
    this.step.set(0);
    this.selectedCoffee.set(null);
    this.customizationData.set({
      milkType: '',
      cupSize: '',
      sugarLevel: '',
      milkAmount: '0',
      sugarAmount: '0',
    });
    this.isPreviousButtonDisabled.set(false);

    this.customizationComponent.resetSelections();
  }

  private showDialog():void {

    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {
        title: 'Hello there!',
        message: `Enjoy your ${this.selectedCoffee()}`,
        showActionButton: true,
        actionButtonText: 'Okay',
        showCloseButton: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed', result);
    });
  }
}