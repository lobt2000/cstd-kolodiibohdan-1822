import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KindergartenListComponent } from './kindergarten-list.component';

describe('KindergartenListComponent', () => {
  let component: KindergartenListComponent;
  let fixture: ComponentFixture<KindergartenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KindergartenListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KindergartenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
