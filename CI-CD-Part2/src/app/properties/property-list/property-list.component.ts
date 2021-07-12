import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Property} from "../property.model";

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  @Output() propertyWasSelected = new EventEmitter<Property>();
  properties: Property[] = [
    new Property("07/01/2021", "https://media.istockphoto.com/vectors/ticket-icon-vector-id925179234", "Transformer", 12, 23,45,67
    , 54, 4, 6, 6,6, 6),
    new Property("07/01/2021", "https://media.istockphoto.com/vectors/ticket-icon-vector-id925179234", "Lateral", 12, 23,45,67
      , 54, 4, 6, 6,6, 6),
    new Property("07/01/2021", "https://media.istockphoto.com/vectors/ticket-icon-vector-id925179234", "Lateral", 12, 23,45,67
      , 54, 4, 6, 6,6, 6),
    new Property("07/01/2021", "https://media.istockphoto.com/vectors/ticket-icon-vector-id925179234", "Overhead", 12, 23,45,67
      , 54, 4, 6, 6,6, 6),
    new Property("07/01/2021", "https://media.istockphoto.com/vectors/ticket-icon-vector-id925179234", "Underground", 12, 23,45,67
      , 54, 4, 6, 6,6, 6),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onPropClicked(property: Property) {
    this.propertyWasSelected.emit(property);
  }

}
