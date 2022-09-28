import { Directive, Input } from '@angular/core';

@Directive({
  selector: `[gaEvent][gaCategory],
             [gaCategory]`,
  exportAs: 'gaCategory'
})
export class GaEventCategoryDirective {

  constructor() { }

  @Input() gaCategory!: string;

}
