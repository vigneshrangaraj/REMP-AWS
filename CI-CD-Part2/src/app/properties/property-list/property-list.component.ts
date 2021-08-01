import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Property} from "../property.model";
import {PropertyService} from "../property.service";
import {StemService} from "../../map/stem.service";

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  @Output() propertyWasSelected = new EventEmitter<Property>();
  properties: Property[];
  showNewProperty: boolean = false;

  constructor(private propertyListService: PropertyService,
              private stemService: StemService ) { }

  ngOnInit(): void {
    this.getProperties();
    console.log('Initted');
  }

  onPropClicked(property: Property) {
    this.propertyWasSelected.emit(property);
  }

  newPropertyClicked () {
    this.showNewProperty = true;
  }

  newPropertyCanceled () {
    this.showNewProperty = false;
  }

  getProperties() {
    this.propertyListService.getProperties()
      .subscribe((data: Property[]) => {
        this.properties = [...data];
        this.stemService.mapProperties(this.properties);
      });
  }



  propertyCreated() {
    this.propertyListService.getProperties()
      .subscribe((data: Property[]) => {
        this.properties = [...data];
        this.showNewProperty = false;
      });

  }

}
