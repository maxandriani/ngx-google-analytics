import { InjectionToken, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { GaWindow } from './ngx-google-analytics-window';

/**
 * Provide DOM Window reference.
 */
export const NGX_WINDOW = new InjectionToken<GaWindow>('ngx-window', {
  providedIn: 'root',
  factory: () => {
    const { defaultView } = inject(DOCUMENT);

    if (!defaultView) {
      throw new Error('Window is not available');
    }

    return defaultView;
  },
});
