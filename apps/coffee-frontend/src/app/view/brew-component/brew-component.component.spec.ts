import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrewComponentComponent } from './brew-component.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { fakeAsync, tick } from '@angular/core/testing';

describe('BrewComponentComponent', () => {
  let component: BrewComponentComponent;
  let fixture: ComponentFixture<BrewComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrewComponentComponent, MatButtonModule, MatProgressBarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BrewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit brewingStarted and start the brewing process', fakeAsync(() => {
    jest.spyOn(component.brewingStarted, 'emit');
    component.startBrewing();
    fixture.detectChanges();

    expect(component.brewing()).toBe(true);
    expect(component.progress()).toBe(0);
    expect(component.brewingStarted.emit).toHaveBeenCalled();

    // Simulate the interval passing time
    tick(5000); // Simulate 5 seconds
    expect(component.progress()).toBeGreaterThan(0);
    expect(component.brewing()).toBe(true);

    tick(5000); // Simulate another 5 seconds
    fixture.detectChanges();

    expect(component.progress()).toBe(100);
    expect(component.brewing()).toBe(false);
    expect(component.hasBrewed()).toBe(true);
  }));

  it('should emit brewingCompleted when brewing finishes', fakeAsync(() => {
    jest.spyOn(component.brewingCompleted, 'emit');

    component.startBrewing();
    fixture.detectChanges();

    tick(10000); // Simulate 10 seconds for brewing to complete
    fixture.detectChanges();

    expect(component.brewingCompleted.emit).toHaveBeenCalled();
    expect(component.progress()).toBe(100);
    expect(component.brewing()).toBe(false);
    expect(component.hasBrewed()).toBe(true);
  }));

  it('should return true when isBrewing() is called during brewing', () => {
    component.brewing.set(true);
    expect(component.isBrewing()).toBe(true);
  });

  it('should return false when isBrewing() is called and brewing is not active', () => {
    component.brewing.set(false);
    expect(component.isBrewing()).toBe(false);
  });
});
