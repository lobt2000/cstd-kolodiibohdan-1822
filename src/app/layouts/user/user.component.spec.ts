import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check resize bigger', () => {
    event.target['innerWidth'] = 1200
    component.onResize(event)
    component.checkSizeOfEvent = false;
    expect(component.menuWidth).toEqual(270);
  });

  it('should check resize', () => {
    event.target['innerWidth'] = 700
    component.onResize(event)
    component.checkSizeOfEvent = true;
    expect(component.menuWidth).toEqual(270);
  });

  it('should check on resize value', () => {
    component.onResizeValue(true)
    expect(component.menuWidth).toEqual(70);
  });
});
