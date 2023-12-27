import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownlinkComponent } from './downlink.component';

describe('DownlinkComponent', () => {
  let component: DownlinkComponent;
  let fixture: ComponentFixture<DownlinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DownlinkComponent]
    });
    fixture = TestBed.createComponent(DownlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
