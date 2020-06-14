import { InjectionToken, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Check if this environment can access Window object and return window or null if false.
 */
export function getWindow(platformId: any) {
  return (isPlatformBrowser(platformId))
    ? window : null;
}

/**
 * Provide DOM Window reference or null if the environment is not a Browser.
 */
export const NGX_WINDOW = new InjectionToken<Window>('ngx-window', {
  providedIn: 'root',
  factory: () => getWindow(inject(PLATFORM_ID)),
});
