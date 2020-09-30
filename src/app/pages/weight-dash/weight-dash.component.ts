import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as dayjs from 'dayjs';

@Component({
  selector: 'ngx-weight-dash',
  templateUrl: './weight-dash.component.html',
  styleUrls: ['./weight-dash.component.scss'],
})
export class WeightDashComponent implements OnInit {
  lineData: any;
  barData: any;
  dbWeightsObject: any;
  dbCaloriesObject: any;
  caloriesAllotedArr: Array<number> = [2680, 2680, 2680, 2680, 2680, 2680, 2680];
  doneLoading: boolean = false;
  weightLoading: boolean = false;
  caloriesLoading: boolean = false;

  constructor(angularFireDB: AngularFireDatabase) {
    this.dbWeightsObject = angularFireDB.object('weight');
    this.dbCaloriesObject = angularFireDB.object('calories');
  }

  ngOnInit(): void {
    this.dbWeightsObject.snapshotChanges().subscribe(item => {
      const dbValues = item.payload.val();
      const keyword = 'weight';

      const datesAsKey = this.getDatesByKey(dbValues, -7);
      const weightArr = this.getDBObjectValuesInArray(dbValues, -7, keyword);

      this.lineData = {
        title: 'Hello',
        labels: datesAsKey,
        datasets: [{
          data: weightArr,
          label: 'Weight At a Glance - Last 7 days',
          borderColor: '#bae755',
          pointBackgroundColor: '#55bae7',
          pointBorderColor: '#55bae7',
          pointHoverBackgroundColor: '#55bae7',
          pointHoverBorderColor: '#55bae7',
        }],
      };

      this.weightLoading = true;
      this.isEverythingLoaded();
    });

    this.dbCaloriesObject.snapshotChanges().subscribe(item => {
      const dbValues = item.payload.val();
      const keyword = 'calories';

      const datesAsKey = this.getDatesByKey(dbValues, -7);
      const caloriesArr = this.getDBObjectValuesInArray(dbValues, -7, keyword);

      this.barData = {
        labels: datesAsKey,
        datasets: [{
          data: caloriesArr,
          label: 'Calories Consumed',
          backgroundColor: '#DC143C',
        }, {
          data: this.caloriesAllotedArr,
          label: 'Calories Alloted',
          backgroundColor: '#0000FF',
        }],
      };

      this.caloriesLoading = true;
      this.isEverythingLoaded();
    });
  }

  isEverythingLoaded() {
    if (this.weightLoading && this.caloriesLoading) {
      this.doneLoading = true;
    }
  }

  getDatesByKey(dates: any, numOfDays: number) {
    return Object.keys(dates).slice(numOfDays).map(val => dayjs(val).format('MM/DD'));
  }

  getDBObjectValuesInArray(dbObject: any, numDays: number, keyword: string) {
    return Object.values(dbObject).slice(numDays).map(val => val[keyword]);
  }
}
