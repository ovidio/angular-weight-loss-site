import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbListModule, NbDatepickerModule } from '@nebular/theme';

import { NutritionRoutingModule } from './nutrition-routing.module';
import { NutritionComponent } from './nutrition.component';


@NgModule({
  declarations: [NutritionComponent],
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbListModule,
    NbDatepickerModule,
    NutritionRoutingModule,
  ],
})
export class NutritionModule { }
