import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOpeningDrawer } from './job-opening-drawer';

describe('JobOpeningDrawer', () => {
  let component: JobOpeningDrawer;
  let fixture: ComponentFixture<JobOpeningDrawer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobOpeningDrawer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobOpeningDrawer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
