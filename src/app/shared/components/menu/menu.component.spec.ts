import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should check resize', () => {
    let event = {
      target: {
        innerWidth: 1200
      }
    }
    event.target.innerWidth = 1200
    component.onResize(event)
    expect(component.width).toEqual(1200);
  });

  it('should resize menu by click', () => {
    component.resizeClick()
    expect(component.checkTurn).toBeTrue();
  });

  it('should open burger menu', () => {
    component.openBurgerMenu()
    expect(component.isOpenMenu).toBeTrue();
  });
});
