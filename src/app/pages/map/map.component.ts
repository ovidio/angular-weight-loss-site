import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FitbitService } from '../../@core/utils/fitbit.service';
import * as tcxParse from 'tcx';
import * as dayjs from 'dayjs';
// import  {  } from 'environments/'

@Component({
  selector: 'ngx-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  loading = true;
  fitbitAuthed = false;
  showMap = false;
  fitbitOAuthUrlDev = 'https://www.fitbit.com/oauth2/authorize'
                      + '?response_type=token&client_id=22BSPK'
                      + '&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2F'
                      + 'pages%2Fmap&scope=activity%20location'
                      + '&expires_in=604800';

  fitbitOAuthUrlProd = 'https://www.fitbit.com/oauth2/authorize'
                        + '?response_type=token&client_id=22BZNC'
                        + '&redirect_uri=https%3A%2F%2Fweight-tracking.ovi.link'
                        + '%2Fpages%2Fmap&scope=activity%20location'
                        + '&expires_in=604800';
  fitbitToken: string;
  activityArray: Array<ActivityData>;

  // Google Map Options
  center: any;
  zoom = 15;
  vertices: google.maps.LatLngLiteral[];
  markerPositions: google.maps.LatLngLiteral[];
  urlRoute: string;

  constructor(
    private router: Router,
    private fitbit: FitbitService,
  ) {}

  ngOnInit(): void {
    // Get current route
    this.urlRoute = this.router.url;

    // if route include 'token' then we can assume we've authenticated
    if (this.urlRoute.includes('token')) {
      this.fitbitAuthed = true;
      this.fitbitToken = this.extractToken(this.urlRoute);
      this.getActivityData();
    } else {
      this.loading = false;
    }
  }

  fitbitAuth(): void {
    document.location.href = window.location.host.includes('local')
                            ? this.fitbitOAuthUrlDev
                            : this.fitbitOAuthUrlProd;
  }

  extractToken(rt): string {
    // we're splitting the string at the # symbol to get access to the entire
    // response from Fitbit
    const firstPass = rt.split('#');

    // We're splitting the various url params
    const secondPass = firstPass[1].split('&');

    // Finally, we're splitting the actual token string
    const thirdPass = secondPass[0].split('=');

    return thirdPass[1];
  }

  /**
   * This method retrieves a list of activities. In order to have desc order, we
   * pass it today's date.
   */
  getActivityData(): void {
    this.fitbit.getFitbitActivity(this.fitbitToken, new Date())
    .subscribe(result => {
      this.activityArray = this.formatActivityData(result.activities);
      this.loading = false;
    },
    error => {
      this.loading = false;
    });
  }

  /**
   * This method retrieves the location data of any single activity selected. In
   * order to retrive the data we need the @param tcxLink, which is an API url.
   * Since not every tcxLink has map data (it can return an empty XML file),
   * we're using the index to set the @param mapAvailable property to false
   * within the activity array.
   */
  getLocationData(tcxLink: string, index): void {
    this.showMap = false;
    this.loading = true;

    this.fitbit.getFitbitLocatinData(this.fitbitToken, tcxLink).subscribe(res => {
      /**
       * Fitbit location data returned within an XML file. So we first parse the
       * XML file. Within the XML file the data is in TCX format (which is a
       * format that is used for hiking/walking/running tracking). We parse the
       * TCX format into JSON using tcxParse.
       */
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(res, 'application/xml');
      const parsedTcx = tcxParse(xmlDoc);

      if (parsedTcx.features.length > 0) {
        const startCoord = parsedTcx.features[0].geometry.coordinates[0];
        const lastCoord = parsedTcx.features[0].geometry
          .coordinates[parsedTcx.features[0].geometry.coordinates.length - 1];

        this.center = {
          lat: startCoord[1],
          lng: startCoord[0],
        };

        this.markerPositions = [
          { // start of polyline
            lat: startCoord[1],
            lng: startCoord[0],
          },
          { // end of polyline
            lat: lastCoord[1],
            lng: lastCoord[0],
          },
        ];

        this.vertices = parsedTcx.features[0].geometry.coordinates.map(coords => {
            return {
              lat: coords[1],
              lng: coords[0],
            };
        });

        this.showMap = true;
      } else {
        this.activityArray[index].mapAvailable = false;
        alert('It seems this activity did not have any map data.');
      }

      this.loading = false;
    });
  }

  formatActivityData(data: any): Array<ActivityData> {
    const formattedData = data.map(activity => {
      return {
        date: dayjs(activity.startTime).format('MM/DD'),
        tcxLink: activity.tcxLink,
        activityName: activity.activityName,
        steps: activity.steps,
        duration: this.msToMinAndSec(activity.duration),
        mapAvailable: !!activity.tcxLink,
      };
    });

    return formattedData;
  }

  msToMinAndSec(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    // tslint:disable-next-line: radix
    const seconds = parseInt(((ms % 60000) / 1000).toFixed(0));

    return `${(minutes < 10 ? '0' : '')}${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
  }
}

// type safety
interface ActivityData {
  date: string;
  tcxLink: string;
  activityName: string;
  steps: number;
  duration: string;
  mapAvailable: boolean;
}
