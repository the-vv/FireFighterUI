import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerBaseComponent } from './controller-base.component';

describe('ControllerBaseComponent', () => {
  let component: ControllerBaseComponent;
  let fixture: ComponentFixture<ControllerBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControllerBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllerBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
