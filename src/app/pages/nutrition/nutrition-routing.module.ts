import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NutritionComponent } from './nutrition.component';

const routes: Routes = [{ path: '', component: NutritionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NutritionRoutingModule { }
