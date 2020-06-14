import { InjectionToken, inject } from '@angular/core';
import { NGX_WINDOW } from './ngx-window-token';
import { GtagFn } from '../types/gtag.type';
import { DataLayer } from '../types/data-layer.type';
import { NGX_DATA_LAYER } from './ngx-data-layer-token';

/**
 * Check if there is some global function called gtag on Window object, or create an empty function to doesn't brake codes...
 */
export function getGtagFn(window: Window, dataLayer: DataLayer): GtagFn {
  return (window)
    ? window['gtag'] = window['gtag'] || function () {
        dataLayer.push(arguments as any);
      }
    : null;
}

/**
 * Provides an injection token to access Google Analytics Gtag Function
 */
export const NGX_GTAG_FN = new InjectionToken<GtagFn>('ngx-gtag-fn', {
  providedIn: 'root',
  factory: () => getGtagFn(inject(NGX_WINDOW), inject(NGX_DATA_LAYER))
});
