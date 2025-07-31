import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDrawer } from './client-drawer';

describe('ClientDrawer', () => {
  let component: ClientDrawer;
  let fixture: ComponentFixture<ClientDrawer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDrawer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDrawer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
