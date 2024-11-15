import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourceOverviewComponent } from './resource-overview.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { ResourceValue } from '../../schema/model/resourceValue';

describe('ResourceOverviewComponent', () => {
  let component: ResourceOverviewComponent;
  let fixture: ComponentFixture<ResourceOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ResourceOverviewComponent, // Import the standalone component
        MatCardModule,
        MatProgressBarModule,
        MatButtonModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display progress bars for each resource type', () => {
    component.resources = {
      almond: 50,
      skimmed: 30,
      soy: 40,
      whole: 60,
      sugar: 20,
      coffeeBean: 80,
      message: 'Resource levels are optimal',
    };
    fixture.detectChanges();

    const progressBars = fixture.debugElement.queryAll(By.css('mat-progress-bar'));
    expect(progressBars.length).toBe(6);
  });

  it('should emit loadResourcesEvent when the button is clicked', () => {
    jest.spyOn(component.loadResourcesEvent, 'emit');
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    expect(component.loadResourcesEvent.emit).toHaveBeenCalled();
  });

  it('should render resource message if provided', () => {
    component.resources.message = 'Test message';
    fixture.detectChanges();

    const messageElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(messageElement.textContent).toBe('Test message');
  });
});
