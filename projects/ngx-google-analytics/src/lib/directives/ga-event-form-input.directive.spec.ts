import { GaEventFormInputDirective } from './ga-event-form-input.directive';
import { TestBed } from '@angular/core/testing';
import { NgxGoogleAnalyticsModule } from '../ngx-google-analytics.module';

describe('GaEventFormInputDirective', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxGoogleAnalyticsModule
      ]
    }).compileComponents();
  });

  it('should create an instance', () => {
    const directive = TestBed.get(GaEventFormInputDirective);
    expect(directive).toBeTruthy();
  });
});
