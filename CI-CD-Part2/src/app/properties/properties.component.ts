import { Component, OnInit } from '@angular/core';
import {Property} from "./property.model";

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  selectedProp: Property;

  constructor() { }

  ngOnInit(): void {
  }

}
