import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import './leaflet-sidebar';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map;

  constructor() { }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 27.994402, -81.760254 ],
      zoom: 7
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    var sidebar = L.control.sidebar({ container: 'sidebar', autopan: true })
      .addTo(this.map)
      .open('area');

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void { this.initMap(); }

}
