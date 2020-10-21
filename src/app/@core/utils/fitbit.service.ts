import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as dayjs from 'dayjs';

@Injectable()
export class FitbitService {
  constructor(private httpClient: HttpClient) {}

  getFitbitActivity(authToken, beforeDate): Observable<any> {
    const formattedBeforeDate = dayjs(beforeDate).format('YYYY-MM-DD');
    const apiUrl = `https://api.fitbit.com/1/user/-/activities/list.json?beforeDate=${formattedBeforeDate}&sort=desc&offset=0&limit=20`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    });

    return this.httpClient.get(apiUrl, {headers: headers});
  }

  getFitbitLocatinData(authToken, tcxUrl): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/xml',
      'Authorization': `Bearer ${authToken}`,
    });

    return this.httpClient.get(tcxUrl, {headers: headers, responseType: 'text'});
  }
}
