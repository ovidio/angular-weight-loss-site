import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'weight-dash',
      loadChildren: () => import('./weight-dash/weight-dash.module')
      .then(m => m.WeightDashModule),
    },
    { path: 'weight',
      loadChildren: () => import('./weight/weight.module')
        .then(m => m.WeightModule),
    },
    {
      path: 'activity',
      loadChildren: () => import('./activity/activity.module')
        .then(m => m.ActivityModule),
    },
    {
      path: 'nutrition',
      loadChildren: () => import('./nutrition/nutrition.module')
        .then(m => m.NutritionModule),
    },
    {
      path: '',
      redirectTo: 'weight-dash',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
