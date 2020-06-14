import { GaEventDirective } from './ga-event.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NgxGoogleAnalyticsModule } from '../ngx-google-analytics.module';
import { GaEventCategoryDirective } from './ga-event-category.directive';
import { GoogleAnalyticsService } from '../services/google-analytics.service';
import { Component } from '@angular/core';
import { GaAction } from '../types/ga-action.type';
import { GaBind } from '../types/ga-bind.type';

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
    `
  })
  class HostComponent {
    gaAction: GaAction | string;
    gaLabel: string;
    label: string;
    gaValue: number;
    gaInteraction: boolean;
    gaBind: GaBind = 'click';
    gaEvent: GaAction | string;
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
    // gaEvent = new GaEventDirective(gaCategory, TestBed.get(GoogleAnalyticsService));
  });

  it('should create an instance', () => {
    debugger;
    const gaEvent = fixture
      .debugElement
      .query(i => (i.nativeElement as HTMLButtonElement).classList.contains('test-1'))
      .injector
      .get(GaEventDirective);
    expect(gaEvent).toBeTruthy();
  });

  it('should call `trigger` on click event', () => {
    const ga: GoogleAnalyticsService = TestBed.get(GoogleAnalyticsService),
          spyOnGa = spyOn(ga, 'event'),
          input = fixture.debugElement.query(e => (e.nativeElement as HTMLButtonElement).classList.contains('test-click'));

    fixture.detectChanges();
    input.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(spyOnGa).toHaveBeenCalledWith('test-1', undefined, undefined, undefined, undefined);
  });

  it('should call `trigger` on focus event', () => {
    const ga: GoogleAnalyticsService = TestBed.get(GoogleAnalyticsService),
          spyOnGa = spyOn(ga, 'event'),
          input = fixture.debugElement.query(e => (e.nativeElement as HTMLButtonElement).classList.contains('test-focus'));

    fixture.detectChanges();
    input.triggerEventHandler('focus', null);
    fixture.detectChanges();

    expect(spyOnGa).toHaveBeenCalledWith('test-2', undefined, undefined, undefined, undefined);
  });

  it('should call `trigger on blur event`', () => {
    const ga: GoogleAnalyticsService = TestBed.get(GoogleAnalyticsService),
          spyOnGa = spyOn(ga, 'event'),
          input = fixture.debugElement.query(e => (e.nativeElement as HTMLButtonElement).classList.contains('test-blur'));

    fixture.detectChanges();
    input.triggerEventHandler('blur', null);
    fixture.detectChanges();

    expect(spyOnGa).toHaveBeenCalledWith('test-3', undefined, undefined, undefined, undefined);
  });

  it('should warn a message when try to call a event w/o gaEvent/gaAction value', () => {
    const ga: GoogleAnalyticsService = TestBed.get(GoogleAnalyticsService),
          spyOnConsole = spyOn(console, 'warn'),
          input = fixture.debugElement.query(e => (e.nativeElement as HTMLButtonElement).classList.contains('test-category'));

    fixture.detectChanges();
    input.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(spyOnConsole).toHaveBeenCalled();
  });

  it('should grab gaAction and pass to event trigger', () => {
    const ga: GoogleAnalyticsService = TestBed.get(GoogleAnalyticsService),
          action = 'action-t',
          spyOnGa = spyOn(ga, 'event'),
          input = fixture.debugElement.query(e => (e.nativeElement as HTMLButtonElement).classList.contains('test-category'));

    host.gaAction = action;
    fixture.detectChanges();
    input.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(spyOnGa).toHaveBeenCalledWith(action, 'test-4', undefined, undefined, undefined);
  });

  it('should grab gaEvent and pass to event trigger', () => {
    const ga: GoogleAnalyticsService = TestBed.get(GoogleAnalyticsService),
          action = 'action-t',
          spyOnGa = spyOn(ga, 'event'),
          input = fixture.debugElement.query(e => (e.nativeElement as HTMLButtonElement).classList.contains('test-category'));

    host.gaEvent = action;
    fixture.detectChanges();
    input.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(spyOnGa).toHaveBeenCalledWith(action, 'test-4', undefined, undefined, undefined);
  });

  it('should grab gaCategory and pass to event trigger', () => {
    const ga: GoogleAnalyticsService = TestBed.get(GoogleAnalyticsService),
          action = 'action-t',
          spyOnGa = spyOn(ga, 'event'),
          input = fixture.debugElement.query(e => (e.nativeElement as HTMLButtonElement).classList.contains('test-category'));

    host.gaAction = action;
    fixture.detectChanges();
    input.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(spyOnGa).toHaveBeenCalledWith(action, 'test-4', undefined, undefined, undefined);
  });

  it('should grab gaLabel and pass to event trigger', () => {
    const ga: GoogleAnalyticsService = TestBed.get(GoogleAnalyticsService),
          action = 'action-t',
          label = 'label-t',
          spyOnGa = spyOn(ga, 'event'),
          input = fixture.debugElement.query(e => (e.nativeElement as HTMLButtonElement).classList.contains('test-category'));

    host.gaAction = action;
    host.gaLabel = label;
    fixture.detectChanges();
    input.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(spyOnGa).toHaveBeenCalledWith(action, 'test-4', label, undefined, undefined);
  });

  it('should grab label and pass to event trigger', () => {
    const ga: GoogleAnalyticsService = TestBed.get(GoogleAnalyticsService),
          action = 'action-t',
          label = 'label-t',
          spyOnGa = spyOn(ga, 'event'),
          input = fixture.debugElement.query(e => (e.nativeElement as HTMLButtonElement).classList.contains('test-category'));

    host.gaAction = action;
    host.label = label;
    fixture.detectChanges();
    input.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(spyOnGa).toHaveBeenCalledWith(action, 'test-4', label, undefined, undefined);
  });

  it('should grab gaValue and pass to event trigger', () => {
    const ga: GoogleAnalyticsService = TestBed.get(GoogleAnalyticsService),
          action = 'action-t',
          value = 40,
          spyOnGa = spyOn(ga, 'event'),
          input = fixture.debugElement.query(e => (e.nativeElement as HTMLButtonElement).classList.contains('test-category'));

    host.gaAction = action;
    host.gaValue = value;
    fixture.detectChanges();
    input.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(spyOnGa).toHaveBeenCalledWith(action, 'test-4', undefined, value, undefined);
  });

  it('should grab gaInteraction and pass to event trigger', () => {
    const ga: GoogleAnalyticsService = TestBed.get(GoogleAnalyticsService),
          action = 'action-t',
          gaInteraction = true,
          spyOnGa = spyOn(ga, 'event'),
          input = fixture.debugElement.query(e => (e.nativeElement as HTMLButtonElement).classList.contains('test-category'));

    host.gaAction = action;
    host.gaInteraction = gaInteraction;
    fixture.detectChanges();
    input.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(spyOnGa).toHaveBeenCalledWith(action, 'test-4', undefined, undefined, gaInteraction);
  });

});
