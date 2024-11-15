import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenericCardComponent } from './generic-card.component';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { DebugElement } from '@angular/core';
import { spyOn } from 'jest-mock';

describe('GenericCardComponent', () => {
  let component: GenericCardComponent;
  let fixture: ComponentFixture<GenericCardComponent>;
  let cardElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, GenericCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GenericCardComponent);
    component = fixture.componentInstance;
    cardElement = fixture.debugElement.query(By.css('mat-card'));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title input', () => {
    component.title = 'Test Card Title';
    fixture.detectChanges();
    const titleElement = cardElement.query(By.css('mat-card-title'));
    expect(titleElement.nativeElement.textContent).toContain('Test Card Title');
  });

  it('should emit cardSelected event when card is clicked', () => {
    const emitSpy = spyOn(component.cardSelected, 'emit');
    cardElement.triggerEventHandler('click', null);
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit cardSelected event when Enter key is pressed', () => {
    const emitSpy = spyOn(component.cardSelected, 'emit');
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    cardElement.triggerEventHandler('keydown', event);
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit cardSelected event when Space key is pressed', () => {
    const emitSpy = spyOn(component.cardSelected, 'emit');
    const event = new KeyboardEvent('keydown', { key: ' ' });
    cardElement.triggerEventHandler('keydown', event);
    expect(emitSpy).toHaveBeenCalled();
  });
});
