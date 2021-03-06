import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbListModule, NbDatepickerModule } from '@nebular/theme';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityComponent } from './activity.component';


@NgModule({
  declarations: [ActivityComponent],
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbListModule,
    NbDatepickerModule,
    ActivityRoutingModule,
  ],
})
export class ActivityModule { }
