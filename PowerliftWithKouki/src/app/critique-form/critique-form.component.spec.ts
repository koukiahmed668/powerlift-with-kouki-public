import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CritiqueFormComponent } from './critique-form.component';

describe('CritiqueFormComponent', () => {
  let component: CritiqueFormComponent;
  let fixture: ComponentFixture<CritiqueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CritiqueFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CritiqueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
