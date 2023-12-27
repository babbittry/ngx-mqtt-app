import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UplinkComponent } from './uplink.component';

describe('UplinkComponent', () => {
  let component: UplinkComponent;
  let fixture: ComponentFixture<UplinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UplinkComponent]
    });
    fixture = TestBed.createComponent(UplinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
