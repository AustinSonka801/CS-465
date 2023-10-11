import { Component, OnInit } from '@angular/core';
import * as tripsData from '../trips';
//import { Trip } from '../models/trip';
import { TripsService } from '../services/trips.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css']
})
export class TripListingComponent implements OnInit {

  trips = new Array<any>(...tripsData.default);

  //trips: Trip[] = [];

  constructor(private tripsService: TripsService, private router: Router) { }

  ngOnInit(): void {
    this.tripsService.getTrips()
      .subscribe({
        next: results => this.trips.push(...results),
        error: err => console.error(err)
      });
  }

  addTrip() {
    this.router.navigate(['add-trip']);
  }

}
