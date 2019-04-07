import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatDividerModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { PricingStyle2Component } from 'app/main/pages/pricing/style-2/style-2.component';

const routes = [
  {
    path: 'pricing/style2',
    component: PricingStyle2Component
  }
];

@NgModule({
  declarations: [PricingStyle2Component],
  imports: [
    RouterModule.forChild(routes),

    MatButtonModule,
    MatDividerModule,

    FuseSharedModule
  ]
})
export class PricingModule {}
