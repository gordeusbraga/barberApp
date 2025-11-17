import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSchedulesComponent } from './manage-schedules';

describe('ManageSchedules', () => {
  let component: ManageSchedulesComponent;
  let fixture: ComponentFixture<ManageSchedulesComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSchedulesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ManageSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
