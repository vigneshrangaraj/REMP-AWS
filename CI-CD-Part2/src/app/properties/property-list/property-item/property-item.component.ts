import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Property} from "../../property.model";
import {PropertyService} from "../../property.service";
import {NotificationsService} from "../../../notifications/notifications.service";
import {Notification, TYPES} from "../../../notifications/notification.model";
import {StemService} from "../../../map/stem.service";

declare var $:any;

@Component({
  selector: 'app-property-item',
  templateUrl: './property-item.component.html',
  styleUrls: ['./property-item.component.css']
})
export class PropertyItemComponent implements OnInit {
  @Input() property: Property;
  @Input() i: number;

  @Output() propertyWasEdited = new EventEmitter<string>();

  constructor(private propertyService: PropertyService,
              private notificationsService: NotificationsService,
              private stemService: StemService) {

  }

  ngOnInit(): void {

  }

  collapseAccordion(wasSaved) {
    this.propertyWasEdited.emit();
    if (wasSaved) {
      $("#collapse"+this.i).collapse('hide');
    }
  }

  takeToProperty() {
    StemService.panToLocation(this.property.lat, this.property.lng);
  }

  openProperty() {
    this.stemService.openProperty(this.property._id);
  }

  deleteProperty(propId) {
    this.propertyService.deleteProperty(this.property._id)
      .subscribe(() => {
        this.notificationsService.pushNotifications(
          new Notification(TYPES.success, "Success", "Property was deleted successfully!")
        );
        $('#confirmDelete'+ propId).modal('hide');
        this.propertyWasEdited.emit();
      }, error => {
        this.notificationsService.pushNotifications(
          new Notification(TYPES.danger, "Error", error.message)
        )
      })
  }

}
