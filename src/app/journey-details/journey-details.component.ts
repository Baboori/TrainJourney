import { Component, OnInit, Input } from '@angular/core';
import { Journey } from '../Journey.model';

@Component({
  selector: 'app-journey-details',
  templateUrl: './journey-details.component.html',
  styleUrls: ['./journey-details.component.css']
})
export class JourneyDetailsComponent implements OnInit {

  @Input() journeyDetails: Journey[] = [];
  constructor() {
    this.journeyDetails = [];
   }

  ngOnInit() {
  }

  totalDuration(): any {
    let total = 0;
    this.journeyDetails.forEach( (journey) => {
      total = total + (+journey.Time);
    });
    return this.timeConvert(total);
  }

  timeConvert(n) {
    let num = n;
    let hours = (num / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return  rhours + ' hour(s) and ' + rminutes + ' minute(s).';
    }
}
