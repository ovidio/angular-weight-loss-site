import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NutritionRoutingModule } from './nutrition-routing.module';
import { NutritionComponent } from './nutrition.component';


@NgModule({
  declarations: [NutritionComponent],
  imports: [
    CommonModule,
    NutritionRoutingModule
  ]
})
export class NutritionModule { }
