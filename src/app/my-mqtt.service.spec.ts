import { TestBed } from '@angular/core/testing';

import { MyMqttService } from './my-mqtt.service';

describe('MyMqttService', () => {
  let service: MyMqttService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyMqttService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
