import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupApplicationComponent } from './group-application.component';

describe('GroupApplicationComponent', () => {
  let component: GroupApplicationComponent;
  let fixture: ComponentFixture<GroupApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
