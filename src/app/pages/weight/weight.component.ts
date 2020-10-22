import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormControl } from '@angular/forms';
import * as dayjs from 'dayjs';

import { Weight } from '../../shared/models/weight.model';

@Component({
  selector: 'ngx-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss'],
})

export class WeightComponent implements OnInit {
  doneLoading: boolean = false;
  dbWeightsObject: any;
  dbPush;
  dbWeightArray: Array<Weight> = [];
  formControl = new FormControl(new Date);
  ngModelDate = new Date();
  weightInput = 300;

  constructor(angularFireDB: AngularFireDatabase) {
    this.dbWeightsObject = angularFireDB.object('weight');
  }

  ngOnInit(): void {
    this.dbWeightsObject.snapshotChanges().subscribe(item => {
      this.dbWeightArray = [];
      const dbValues = item.payload.val();
      this.getDateAndWeight(dbValues);
      this.doneLoading = true;
    });


  }

  /**
   * This method takes in a dbObject and pushes the values (date and weight) to
   * the dbWeightArray which is formatted to display properly.
   */
  getDateAndWeight(dates: any) {
    const keys = Object.keys(dates).sort(this.dateStrSort);

    for (const key of keys) {
      this.dbWeightArray.push({
        date: dayjs(key).format('MM/DD'),
        weight: dates[key]['weight'],
      });
    }
  }

  /**
   * This method takes the user input and pushes it to the Firebase DB
   */
  saveWeight() {
    const formattedDate = dayjs(this.ngModelDate).format('YYYY-MM-DD');

    this.dbWeightsObject.update({
      [formattedDate]: {
        weight: this.weightInput,
      },
    });
  }

  dateStrSort(a, b) {
    if (a < b) {
      return 1;
    }
    if (a > b) {
      return -1;
    }

    return 0;
  }
}
