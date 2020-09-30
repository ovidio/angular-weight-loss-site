import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WeightDashRoutingModule } from './weight-dash-routing.module';
import { WeightDashComponent } from './weight-dash.component';
import { ChartsModule } from '../charts/charts.module';



@NgModule({
  declarations: [
    WeightDashComponent,
  ],
  providers: [],
  imports: [
    WeightDashRoutingModule,
    ChartsModule,
    CommonModule,
  ],
})
export class WeightDashModule { }
