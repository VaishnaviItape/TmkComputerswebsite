import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Companydrawer } from './companydrawer';

describe('Companydrawer', () => {
  let component: Companydrawer;
  let fixture: ComponentFixture<Companydrawer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Companydrawer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Companydrawer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
