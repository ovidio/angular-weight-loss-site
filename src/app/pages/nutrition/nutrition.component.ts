import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as dayjs from 'dayjs';

@Component({
  selector: 'ngx-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.scss'],
})
export class NutritionComponent implements OnInit {
  doneLoading: boolean = false;
  dbCaloriesObject: any;
  dbCaloriesArray: Array<any> = [];
  ngModelDate = new Date();
  calConsumed = 2680;

  constructor(angularFireDB: AngularFireDatabase) {
    this.dbCaloriesObject = angularFireDB.object('calories');
  }

  ngOnInit(): void {
    this.dbCaloriesObject.snapshotChanges().subscribe(item => {
      this.dbCaloriesArray = [];
      const dbValues = item.payload.val();
      this.getCaloriesByDate(dbValues);
      this.doneLoading = true;
    });
  }

  getCaloriesByDate(calories: any) {
    const keys = Object.keys(calories).sort(this.dateStrSort);

    for (const key of keys) {
      this.dbCaloriesArray.push({
        date: dayjs(key).format('MM/DD'),
        calories: calories[key]['calories'],
      });
    }
  }

  saveCalories() {
    const formattedDate = dayjs(this.ngModelDate).format('YYYY-MM-DD');

    this.dbCaloriesObject.update({
      [formattedDate]: {
        calories: this.calConsumed,
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
