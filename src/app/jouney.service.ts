import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Journey} from './Journey.model';
import journeyData from './journeyData.json';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class JouneyService {
  constructor(private http: HttpClient) {

   }

  public getJSON(): Observable<Journey[]> {
    const  data: Journey[] = journeyData ;
    return Observable.create( (observer) => {
      observer.next(data);
      observer.error('Error');

    });
   }

   getDepartureStationList(data: Journey[]): string[] {
    const stations: string[] = [];
    if (data.length > 0) {
     data.forEach( (journey) => {
       stations.push(journey.DepartStation);
      });
     return _.sortBy([...new Set(stations)]);
    }
    return stations;
   }

   getRoutesFromStation(station: string, data: Journey[]) {
    let possibleDestations: Journey[] = [];
    const stations: string[] = [];
    const  nextStopStation =  _.filter(data, (journey) => journey.DepartStation === station);
    possibleDestations = possibleDestations.concat(nextStopStation);
    console.log(possibleDestations);
    nextStopStation.forEach( (row) => {
      const changeStations =  _.filter(data,
       (journey) => journey.DepartStation === row.ArriveStation && journey.ArriveStation !== station);
      possibleDestations = possibleDestations.concat(changeStations);
    });
    possibleDestations.forEach( (journey) => {
     stations.push(journey.ArriveStation);
    });
    return _.sortBy([...new Set(stations)]);
   }

   getjourneyDetails(start: string, end: string, data: Journey[]): Journey[] {
    let stations: Journey[] = [];
    let possibleStations = data.filter( record => record.DepartStation === start && record.ArriveStation === end);
    if (possibleStations.length === 1) {
      stations = possibleStations;
    } else {
      possibleStations = data.filter( record => record.DepartStation === start || record.ArriveStation === end);
      for ( let i = 0; i < possibleStations.length; i ++) {
        const previous = possibleStations[i - 1];
        const current = possibleStations[i];
        if (previous &&  previous.ArriveStation === current.DepartStation) {
          stations.push(previous);
          stations.push(current);
        }
      }
    }
    return stations;
  }
}
