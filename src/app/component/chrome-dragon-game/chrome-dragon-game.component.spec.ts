import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChromeDragonGameComponent } from './chrome-dragon-game.component';

describe('ChromeDragonGameComponent', () => {
  let component: ChromeDragonGameComponent;
  let fixture: ComponentFixture<ChromeDragonGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChromeDragonGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChromeDragonGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
