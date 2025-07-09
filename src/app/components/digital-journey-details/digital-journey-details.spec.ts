import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalJourneyDetails } from './digital-journey-details';

describe('DigitalJourneyDetails', () => {
  let component: DigitalJourneyDetails;
  let fixture: ComponentFixture<DigitalJourneyDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigitalJourneyDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitalJourneyDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
