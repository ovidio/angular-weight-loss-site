import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbListModule, NbDatepickerModule } from '@nebular/theme';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    FormsModule,
    NbCardModule,
    NbListModule,
    NbDatepickerModule,
    GoogleMapsModule,
  ],
})
export class MapModule { }
