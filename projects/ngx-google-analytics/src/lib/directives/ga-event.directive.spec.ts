import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GaActionEnum } from '../enums/ga-action.enum';
import { NgxGoogleAnalyticsModule } from '../ngx-google-analytics.module';
import { GoogleAnalyticsService } from '../services/google-analytics.service';
import { GaEventDirective } from './ga-event.directive';

describe('GaEventDirective', () => {

  @Component({
    selector: 'ga-host',
    template: `
    <button
      gaEvent="test-1"
      class="test-1 test-click"
      [gaAction]="gaAction"
      [gaLabel]="gaLabel"
      [label]="label"
      [gaValue]="gaValue"
      [gaInteraction]="gaInteraction"></button>
    <button
      gaEvent="test-2"
      class="test-2 test-focus"
      [gaAction]="gaAction"
      [gaLabel]="gaLabel"
      [label]="label"
      [gaValue]="gaValue"
      [gaInteraction]="gaInteraction"
      gaBind="focus"></button>
    <button
      gaEvent="test-3"
      class="test-3 test-blur"
      [gaAction]="gaAction"
      [gaLabel]="gaLabel"
      [label]="label"
      [gaValue]="gaValue"
      [gaInteraction]="gaInteraction"
      gaBind="blur"></button>
    <button
      gaCategory="test-4"
      [gaEvent]="gaEvent"
      class="test-4 test-category"
      [gaAction]="gaAction"
      [gaLabel]="gaLabel"
      [label]="label"
      [gaValue]="gaValue"
      [gaInteraction]="gaInteraction"></button>
    <button
      gaEvent="test-5"
      class="test-5 test-custom"
      [gaAction]="gaAction"
      [gaLabel]="gaLabel"
      [label]="label"
      [gaValue]="gaValue"
      [gaInteraction]="gaInteraction"
      gaBind="custom"></button>
    `
  })
  class HostComponent {
    gaAction: GaActionEnum | string;
    gaLabel: string;
    label: string;
    gaValue: number;
    gaInteraction: boolean;
    gaBind = 'click';
    gaEvent: GaActionEnum | string;
  }

  let fixture: ComponentFixture<HostComponent>,
    host: HostComponent;

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
    // gaCategory = fixture
    //   .debugElement
    //   .query(c => c.classes['test-4'])
    //   .injector
    //   .get(GaEventCategoryDirective);
    // gaEvent = new GaEventDirective(gaCategory, TestBed.inject(GoogleAnalyticsService));
  });

  it('should create an instance', () => {
    const gaEvent = fixture
      .debugElement
      .query(i => (i.nativeElement as HTMLButtonElement).classList.contains('test-1'))
      .injector
      .get(GaEventDirective);
    expect(gaEvent).toBeTruthy();
  });

  it('should call `trigger` on click event', () => {
    const ga: GoogleAnalyticsService = TestBed.inject(GoogleAnalyticsService),
      spyOnGa = spyOn(ga, 'event'),
      input = fixture.debugElement.query(e => (e.nativeElement as HTMLButtonElement).classList.contains('test-click'));

    fixture.detectChanges();
    input.nativeElement.click();
    fixture.detectChanges();

    expect(spyOnGa).toHaveBeenCalledWith('test-1', jasmine.any(Object));
  });

  it('should call `trigger` on focus event', () => {
    const ga: GoogleAnalyticsService = TestBed.inject(GoogleAnalyticsService),
      spyOnGa = spyOn(ga, 'event'),
      input = fixture.debugElement.query(e => (e.nativeElement as HTMLButtonElement).classList.contains('test-focus'));

    fixture.detectChanges();
    input.nativeElement.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    expect(spyOnGa).toHaveBeenCalledWith('test-2', jasmine.any(Object));
  });

  it('should call `trigger on blur event`', () => {
    const ga: GoogleAnalyticsService = TestBed.inject(GoogleAnalyticsService),
      spyOnGa = spyOn(ga, 'event'),
      input = fixture.debugElement.query(e => (e.nativeElement as HTMLButtonElement).classList.contains('test-blur'));

    fixture.detectChanges();
    input.nativeElement.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    expect(spyOnGa).toHaveBeenCalledWith('test-3', jasmine.any(Object));
  });

  it('should call `trigger on custom event`', () => {
    const ga: GoogleAnalyticsService = TestBed.inject(GoogleAnalyticsService),
      spyOnGa = spyOn(ga, 'event'),
      input = fixture.debugElement.query(e => (e.nativeElement as HTMLButtonElement).classList.contains('test-custom'));

    fixture.detectChanges();
    input.nativeElement.dispatchEvent(new CustomEvent('custom'));
    fixture.detectChanges();

    expect(spyOnGa).toHaveBeenCalledWith('test-5', jasmine.any(Object));
  });

  it('should warn a message when try to call a event w/o gaEvent/gaAction value', () => {
    const ga: GoogleAnalyticsService = TestBed.inject(GoogleAnalyticsService),
      spyOnConsole = spyOn(console, 'warn'),
      input = fixture.debugElement.query(e => (e.nativeElement as HTMLButtonElement).classList.contains('test-category'));

    fixture.detectChanges();
    input.nativeElement.click();
    fixture.detectChanges();

    expect(spyOnConsole).toHaveBeenCalled();
  });

  it('should grab gaAction and pass to event trigger', () => {
    const ga: GoogleAnalyticsService = TestBed.inject(GoogleAnalyticsService),
      action = 'action-t',
      spyOnGa = spyOn(ga, 'event'),
      input = fixture.debugElement.query(e => (e.nativeElement as HTMLButtonElement).classList.contains('test-category'));

    host.gaAction = action;
    fixture.detectChanges();
    input.nativeElement.click();
    fixture.detectChanges();

    expect(spyOnGa).toHaveBeenCalledWith(action, jasmine.objectContaining({ category: 'test-4' }));
  });

  it('should grab gaEvent and pass to event trigger', () => {
    const ga: GoogleAnalyticsService = TestBed.inject(GoogleAnalyticsService),
      action = 'action-t',
      spyOnGa = spyOn(ga, 'event'),
      input = fixture.debugElement.query(e => (e.nativeElement as HTMLButtonElement).classList.contains('test-category'));

    host.gaEvent = action;
    fixture.detectChanges();
    input.nativeElement.click();
    fixture.detectChanges();

    expect(spyOnGa).toHaveBeenCalledWith(action, jasmine.objectContaining({ category: 'test-4' }));
  });

  it('should grab gaCategory and pass to event trigger', () => {
    const ga: GoogleAnalyticsService = TestBed.inject(GoogleAnalyticsService),
      action = 'action-t',
      spyOnGa = spyOn(ga, 'event'),
      input = fixture.debugElement.query(e => (e.nativeElement as HTMLButtonElement).classList.contains('test-category'));

    host.gaAction = action;
    fixture.detectChanges();
    input.nativeElement.click();
    fixture.detectChanges();

    expect(spyOnGa).toHaveBeenCalledWith(action, jasmine.objectContaining({ category: 'test-4' }));
  });

  it('should grab gaLabel and pass to event trigger', () => {
    const ga: GoogleAnalyticsService = TestBed.inject(GoogleAnalyticsService),
      action = 'action-t',
      label = 'label-t',
      spyOnGa = spyOn(ga, 'event'),
      input = fixture.debugElement.query(e => (e.nativeElement as HTMLButtonElement).classList.contains('test-category'));

    host.gaAction = action;
    host.gaLabel = label;
    fixture.detectChanges();
    input.nativeElement.click();
    fixture.detectChanges();

    expect(spyOnGa).toHaveBeenCalledWith(action, jasmine.objectContaining({ category: 'test-4', label }));
  });

  it('should grab label and pass to event trigger', () => {
    const ga: GoogleAnalyticsService = TestBed.inject(GoogleAnalyticsService),
      action = 'action-t',
      label = 'label-t',
      spyOnGa = spyOn(ga, 'event'),
      input = fixture.debugElement.query(e => (e.nativeElement as HTMLButtonElement).classList.contains('test-category'));

    host.gaAction = action;
    host.label = label;
    fixture.detectChanges();
    input.nativeElement.click();
    fixture.detectChanges();

    expect(spyOnGa).toHaveBeenCalledWith(action, jasmine.objectContaining({ category: 'test-4', label }));
  });

  it('should grab gaValue and pass to event trigger', () => {
    const ga: GoogleAnalyticsService = TestBed.inject(GoogleAnalyticsService),
      action = 'action-t',
      value = 40,
      spyOnGa = spyOn(ga, 'event'),
      input = fixture.debugElement.query(e => (e.nativeElement as HTMLButtonElement).classList.contains('test-category'));

    host.gaAction = action;
    host.gaValue = value;
    fixture.detectChanges();
    input.nativeElement.click();
    fixture.detectChanges();

    expect(spyOnGa).toHaveBeenCalledWith(action, jasmine.objectContaining({ category: 'test-4', value }));
  });

  it('should grab gaInteraction and pass to event trigger', () => {
    const ga: GoogleAnalyticsService = TestBed.inject(GoogleAnalyticsService),
      action = 'action-t',
      gaInteraction = true,
      spyOnGa = spyOn(ga, 'event'),
      input = fixture.debugElement.query(e => (e.nativeElement as HTMLButtonElement).classList.contains('test-category'));

    host.gaAction = action;
    host.gaInteraction = gaInteraction;
    fixture.detectChanges();
    input.nativeElement.click();
    fixture.detectChanges();

    expect(spyOnGa).toHaveBeenCalledWith(action, jasmine.objectContaining({ category: 'test-4', interaction: gaInteraction }));
  });

});
