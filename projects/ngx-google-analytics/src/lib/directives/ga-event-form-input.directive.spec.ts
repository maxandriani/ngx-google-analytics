import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxGoogleAnalyticsModule } from '../ngx-google-analytics.module';
import { GoogleAnalyticsService } from '../services/google-analytics.service';
import { NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN } from '../tokens/ngx-google-analytics-settings-token';
import { GaEventCategoryDirective } from './ga-event-category.directive';
import { GaEventFormInputDirective } from './ga-event-form-input.directive';
import { GaEventDirective } from './ga-event.directive';

describe('GaEventFormInputDirective', () => {

	@Component({
		selector: 'ga-host',
		template: `<input gaEvent="teste">`
	})
	class HostComponent { }

	let gaEventFormInput: GaEventFormInputDirective,
		gaEvent: GaEventDirective,
		gaCategory: GaEventCategoryDirective,
		host: HostComponent,
		fixture: ComponentFixture<HostComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NgxGoogleAnalyticsModule
			],
			declarations: [
				HostComponent
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HostComponent);
		host = fixture.componentInstance;
		fixture.detectChanges();
	});

	beforeEach(() => {
		gaCategory = new GaEventCategoryDirective();
		gaEvent = new GaEventDirective(gaCategory, TestBed.inject(GoogleAnalyticsService), TestBed.inject(NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN), fixture.elementRef);
		gaEventFormInput = new GaEventFormInputDirective(gaEvent);
	});

	it('should create an instance', () => {
		expect(gaEventFormInput).toBeTruthy();
	});

	it('should update gaBind when input is updated', () => {
		gaEventFormInput.gaBind = 'click';
		expect(gaEvent.gaBind).toBe('click');
	});

	it('should use `focus` as a default gaBind', () => {
		expect(gaEvent.gaBind).toBe('focus');
	});

	it('should call `GoogleAnalyticsService.event()` on trigger focus at input', () => {
		const ga: GoogleAnalyticsService = TestBed.inject(GoogleAnalyticsService),
			spyOnGa = spyOn(ga, 'event'),
			input = fixture.debugElement.query(e => e.name === 'input');

		fixture.detectChanges();
		input.nativeElement.dispatchEvent(new FocusEvent('focus'));
		fixture.detectChanges();

		expect(spyOnGa).toHaveBeenCalledWith('teste', jasmine.any(Object));
	});
});
