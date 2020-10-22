import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as dayjs from 'dayjs';

@Injectable()
export class FitbitService {
  constructor(private httpClient: HttpClient) {}

  /**
   * This method takes in @param authToken which is given once the user signs in
   * and also takes @param beforeDate which is the date you want to check before
   * This method returns an Observable of activities from the user's fitbit account
   */
  getFitbitActivity(authToken, beforeDate): Observable<any> {
    const formattedBeforeDate = dayjs(beforeDate).format('YYYY-MM-DD');
    const apiUrl = `https://api.fitbit.com/1/user/-/activities/list.json?beforeDate=${formattedBeforeDate}&sort=desc&offset=0&limit=20`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    });

    return this.httpClient.get(apiUrl, {headers: headers});
  }

  /**
   * This method takes in @param authToken which is given once the user signs in
   * as well as @param tcxUrl which is the url from which to retrieve the
   * location data.
   * This method returns an Observable with an XML in tcx format.
   */
  getFitbitLocatinData(authToken, tcxUrl): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/xml',
      'Authorization': `Bearer ${authToken}`,
    });

    return this.httpClient.get(tcxUrl, {headers: headers, responseType: 'text'});
  }
}
