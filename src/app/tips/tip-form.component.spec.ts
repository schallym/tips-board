import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipFormComponent } from './tip-form.component';

describe('TipFormComponent', () => {
  let component: TipFormComponent;
  let fixture: ComponentFixture<TipFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
