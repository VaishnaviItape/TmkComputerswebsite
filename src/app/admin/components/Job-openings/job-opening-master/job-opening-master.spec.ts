import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOpeningMaster } from './job-opening-master';

describe('JobOpeningMaster', () => {
  let component: JobOpeningMaster;
  let fixture: ComponentFixture<JobOpeningMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobOpeningMaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobOpeningMaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
