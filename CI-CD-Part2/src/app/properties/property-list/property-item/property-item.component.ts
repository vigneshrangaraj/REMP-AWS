import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';
import {Property} from "../../property.model";

@Component({
  selector: 'app-property-item',
  templateUrl: './property-item.component.html',
  styleUrls: ['./property-item.component.css']
})
export class PropertyItemComponent implements OnInit {
  @Output() propertyClicked = new EventEmitter<void>();
  @Input() property: Property;

  constructor() {

  }

  ngOnInit(): void {

  }

  onPropertyClick() {
    this.propertyClicked.emit();
  }

}
