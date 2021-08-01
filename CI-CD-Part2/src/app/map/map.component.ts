import { Component, OnInit } from '@angular/core';
import { StemService } from "./stem.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor( private stemService : StemService ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.stemService.initMap();
  }

}
