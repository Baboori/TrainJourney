import { Component, OnInit } from '@angular/core';
import { JouneyService } from './jouney.service';
import { Journey } from './Journey.model';
import * as _ from 'lodash';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'orginalSoftware';
  data: Journey[] ;
  departureStations: string[];
  arrivalStations: string[];
  journeyDetails: Journey[];
  selectedArrivalStation = '';
  constructor( private journeyService: JouneyService) {
  }

  ngOnInit() {
    this.journeyService.getJSON().subscribe( (data) => {
      this.data = data;
    });
    this.departureStations = this.journeyService.getDepartureStationList(this.data);
    this.arrivalStations = this.journeyService.getRoutesFromStation(this.departureStations[0], this.data);
}

loadArrivalStations(station: string) {
 this.arrivalStations = [];
 this.arrivalStations =  this.journeyService.getRoutesFromStation(station, this.data);
 }

setSelectedArrivalStation(station: string) {
  this.selectedArrivalStation = station;
}

search(start: string, end: string) {
 this.journeyDetails = [];
 if ( start !== end) {
  this.journeyDetails = this.journeyService.getjourneyDetails(start, this.selectedArrivalStation, this.data);
 }
}

}
