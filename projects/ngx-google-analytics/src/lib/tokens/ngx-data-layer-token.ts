import { inject, InjectionToken } from '@angular/core';
import { DataLayer } from '../types/data-layer.type';
import { GaWindow } from './ngx-google-analytics-window';
import { NGX_WINDOW } from './ngx-window-token';

/**
 * Check if there is some global function called gtag on Window object, or create an empty function that doesn't break code...
 */
export function getDataLayerFn(window: GaWindow): DataLayer {
  return (window)
    ? window['dataLayer'] = window['dataLayer'] || []
    : null;
}

/**
 * Provides an injection token to access Google Analytics DataLayer Collection
 */
export const NGX_DATA_LAYER = new InjectionToken<DataLayer>('ngx-data-layer', {
  providedIn: 'root',
  factory: () => getDataLayerFn(inject(NGX_WINDOW))
});
