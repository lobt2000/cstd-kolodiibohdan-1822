import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsInfoComponent } from './controls-info.component';

describe('ControlsInfoComponent', () => {
  let component: ControlsInfoComponent;
  let fixture: ComponentFixture<ControlsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
