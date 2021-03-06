import { Component, OnInit} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as dayjs from 'dayjs';

import { Activity } from '../../shared/models/activity.model';

@Component({
  selector: 'ngx-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  doneLoading: boolean = false;
  dbActivitiesObject: any;
  dbExerciseArray: Array<Activity> = [];
  ngModelDate = new Date();
  lenOfActivityInput = 0;
  intenOfActivityInput = 1;

  constructor(angularFireDB: AngularFireDatabase) {
    this.dbActivitiesObject = angularFireDB.object('activity');
  }

  ngOnInit(): void {
    this.dbActivitiesObject.snapshotChanges().subscribe(item => {
      this.dbExerciseArray = [];
      const dbValues = item.payload.val();
      this.getExerciseByDate(dbValues);
      this.doneLoading = true;
    });


  }

    /**
   * This method takes in a dbObject and pushes a formatted object to the
   * dbExerciseArray to be displayed properly
   */
  getExerciseByDate(activity: any) {
    const keys = Object.keys(activity).sort(this.dateStrSort);

    for (const key of keys) {
      this.dbExerciseArray.push({
        date: dayjs(key).format('MM/DD'),
        length: activity[key]['len_of_exer'],
        level: activity[key]['level_exer'],
      });
    }
  }

  /**
   * This method adds the user input to the Firebase DB
   */
  saveExercise() {
    const formattedDate = dayjs(this.ngModelDate).format('YYYY-MM-DD');

    this.dbActivitiesObject.update({
      [formattedDate]: {
        len_of_exer: this.lenOfActivityInput,
        level_exer: this.intenOfActivityInput,
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
