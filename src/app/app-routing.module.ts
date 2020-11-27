import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TestPageAComponent } from './test-page-a/test-page-a.component';
import { TestPageBComponent } from './test-page-b/test-page-b.component';

const routes: Routes = [
  {
    path: 'page-1',
    component: TestPageAComponent
  },
  {
    path: 'page-2',
    component: TestPageBComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
