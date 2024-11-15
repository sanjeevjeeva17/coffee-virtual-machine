import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenericDialogComponent } from './generic-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../schema/model/dialogData.model';
import { By } from '@angular/platform-browser';

describe('GenericDialogComponent', () => {
  let component: GenericDialogComponent;
  let fixture: ComponentFixture<GenericDialogComponent>;
  let dialogRef: Partial<MatDialogRef<GenericDialogComponent>>;
  let mockData: DialogData;

  beforeEach(async () => {
    mockData = {
      title: 'Test Dialog',
      message: 'This is a test message',
      onAction: jest.fn(), // Use Jest's mocking function
    };

    dialogRef = {
      close: jest.fn(), // Mock only the close method with Jest
    };

    await TestBed.configureTestingModule({
      imports: [GenericDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: MatDialogRef, useValue: dialogRef as MatDialogRef<GenericDialogComponent> },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GenericDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the provided data', () => {
    const titleElement = fixture.debugElement.query(By.css('h1'));
    const messageElement = fixture.debugElement.query(By.css('p'));

    expect(titleElement.nativeElement.textContent).toContain(mockData.title);
    expect(messageElement.nativeElement.textContent).toContain(mockData.message);
  });

  it('should close the dialog when close method is called', () => {
    component.close();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should call onAction and close the dialog when onAction is called', () => {
    component.onAction();
    expect(mockData.onAction).toHaveBeenCalled();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should close the dialog without calling onAction if onAction is not provided', () => {
    component.data.onAction = undefined;
    component.onAction();

    expect(dialogRef.close).toHaveBeenCalled();
  });

});
