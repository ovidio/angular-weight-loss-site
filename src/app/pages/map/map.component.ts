import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FitbitService } from '../../@core/utils/fitbit.service';
 import * as parse from 'tcx';

@Component({
  selector: 'ngx-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  fitbitOAuthUrl = 'https://www.fitbit.com/oauth2/authorize'
                  + '?response_type=token&client_id=22BSPK'
                  + '&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2F'
                  + 'pages%2Fmap&scope=activity%20location'
                  + '&expires_in=604800';
  fitbitToken: string;
  constructor(
      private router: Router,
      private fitbit: FitbitService,
    ) {}

  ngOnInit(): void {
    const urlRoute = this.router.url;
    if (urlRoute.includes('token')) {
      this.fitbitToken = this.extractToken(urlRoute);
      this.fitbit.getFitbitActivity(this.fitbitToken, new Date()).subscribe(result => {
        // console.log('raw activity', result);
        this.fitbit.getFitbitLocatinData(this.fitbitToken, result.activities[7].tcxLink).subscribe(res => {
          // console.log('tcx: ', res);
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(res, 'application/xml');
          const parsedTcx = parse(xmlDoc);
          // console.log('parsed: ', parsedTcx);
        });
      });
    }
    // console.log('fitbitToken: ', this.fitbitToken);
  }

  fitbitAuth(): void {
  document.location.href = this.fitbitOAuthUrl;
  }

  extractToken(rt): string {
    const firstPass = rt.split('#');

    const secondPass = firstPass[1].split('&');

    const thirdPass = secondPass[0].split('=');

    return thirdPass[1];
  }
}
