import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbListModule, NbDatepickerModule } from '@nebular/theme';

import { WeightRoutingModule } from './weight-routing.module';
import { WeightComponent } from './weight.component';


@NgModule({
  declarations: [WeightComponent],
  imports: [
    CommonModule,
    FormsModule,
    WeightRoutingModule,
    NbCardModule,
    NbListModule,
    NbDatepickerModule,
  ],
})
export class WeightModule { }
