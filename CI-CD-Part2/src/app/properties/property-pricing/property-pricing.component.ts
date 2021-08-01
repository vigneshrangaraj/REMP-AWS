import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-property-pricing',
  templateUrl: './property-pricing.component.html',
  styleUrls: ['./property-pricing.component.css']
})
export class PropertyPricingComponent implements OnInit {
  @Input() result: string;

  constructor() { }

  ngOnInit(): void {
  }

}
