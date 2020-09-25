import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeightDashRoutingModule } from './weight-dash-routing.module';
import { WeightDashComponent } from './weight-dash.component';


@NgModule({
  declarations: [WeightDashComponent],
  imports: [
    CommonModule,
    WeightDashRoutingModule,
  ],
})
export class WeightDashModule { }
