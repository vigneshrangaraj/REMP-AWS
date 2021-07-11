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
    new Property("15430 Endeavor Dr", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA_7JU7hSPtjGwPqF_BxKMTWv3FxAxkyHX3g&usqp=CAU", "$156459.0", 12, 23,45,67
    , 54, 4, 6, 6,6, 6),
    new Property("4300 Randolph Way", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA_7JU7hSPtjGwPqF_BxKMTWv3FxAxkyHX3g&usqp=CAU", "$156459.0", 12, 23,45,67
      , 54, 4, 6, 6,6, 6),
    new Property("15430 Endeavor Dr", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA_7JU7hSPtjGwPqF_BxKMTWv3FxAxkyHX3g&usqp=CAU", "$156459.0", 12, 23,45,67
      , 54, 4, 6, 6,6, 6),
    new Property("4300 Randolph Way", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA_7JU7hSPtjGwPqF_BxKMTWv3FxAxkyHX3g&usqp=CAU", "$156459.0", 12, 23,45,67
      , 54, 4, 6, 6,6, 6),
    new Property("15430 Endeavor Dr", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA_7JU7hSPtjGwPqF_BxKMTWv3FxAxkyHX3g&usqp=CAU", "$156459.0", 12, 23,45,67
      , 54, 4, 6, 6,6, 6),
    new Property("4300 Randolph Way", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA_7JU7hSPtjGwPqF_BxKMTWv3FxAxkyHX3g&usqp=CAU", "$156459.0", 12, 23,45,67
      , 54, 4, 6, 6,6, 6),
    new Property("15430 Endeavor Dr", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA_7JU7hSPtjGwPqF_BxKMTWv3FxAxkyHX3g&usqp=CAU", "$156459.0", 12, 23,45,67
      , 54, 4, 6, 6,6, 6),
    new Property("4300 Randolph Way", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA_7JU7hSPtjGwPqF_BxKMTWv3FxAxkyHX3g&usqp=CAU", "$156459.0", 12, 23,45,67
      , 54, 4, 6, 6,6, 6),
    new Property("15430 Endeavor Dr", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA_7JU7hSPtjGwPqF_BxKMTWv3FxAxkyHX3g&usqp=CAU", "$156459.0", 12, 23,45,67
      , 54, 4, 6, 6,6, 6),
    new Property("4300 Randolph Way", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA_7JU7hSPtjGwPqF_BxKMTWv3FxAxkyHX3g&usqp=CAU", "$156459.0", 12, 23,45,67
      , 54, 4, 6, 6,6, 6),
    new Property("15430 Endeavor Dr", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA_7JU7hSPtjGwPqF_BxKMTWv3FxAxkyHX3g&usqp=CAU", "$156459.0", 12, 23,45,67
      , 54, 4, 6, 6,6, 6),
    new Property("4300 Randolph Way", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA_7JU7hSPtjGwPqF_BxKMTWv3FxAxkyHX3g&usqp=CAU", "$156459.0", 12, 23,45,67
      , 54, 4, 6, 6,6, 6),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onPropClicked(property: Property) {
    this.propertyWasSelected.emit(property);
  }

}
