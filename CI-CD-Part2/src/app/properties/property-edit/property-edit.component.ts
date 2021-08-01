import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Property} from "../property.model";
import {PropertyService} from "../property.service";
import {NotificationsService} from "../../notifications/notifications.service";
import {Notification, TYPES} from "../../notifications/notification.model";
import {StemService} from "../../map/stem.service";
import {Pin} from "../pin.model";

@Component({
  selector: 'app-property-edit',
  templateUrl: './property-edit.component.html',
  styleUrls: ['./property-edit.component.css'],
  providers: [StemService]
})
export class PropertyEditComponent implements OnInit {
  myForm: FormGroup;
  @Input() prop: Property;

  calculated: boolean = false;
  calculating: boolean = false;

  submitted: boolean = false;
  submitting: boolean = false;

  setLatLoc: boolean = false;

  latlng;
  pin: Pin = StemService.pin;

  @Output() propWasSaved = new EventEmitter<boolean>();

  constructor( private fb: FormBuilder,
               private propertyService: PropertyService,
               private notificationsService: NotificationsService,
               private stemService: StemService ) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      _id: [''],
      address: ['', Validators.required],
      photo: [''],
      lotArea: ['', Validators.required],
      basement: ['', Validators.required],
      livingArea: ['', Validators.required],
      baths: ['', Validators.required],
      rooms: ['', Validators.required],
      bedRooms: ['', Validators.required],
      deck: ['', Validators.required],
      firstFloor: ['', Validators.required],
      secondFloor: ['', Validators.required],
      carsGarage: ['', Validators.required]
    });

    this.myForm.patchValue(this.prop);

    this.onChanges();
  }

  onChanges(): void {
    this.myForm.valueChanges.subscribe(val => {
      this.calculated = false;
    });
  }

  activateLatLng(): void {
    this.setLatLoc = true;
    this.stemService.enableDropPin();
  }

  deactivateLatLng(): void {
    this.setLatLoc = false;
    this.stemService.disableDropPin();
  }

  getLatLng(): void {
    this.latlng = StemService.pinMarker.getLatLng();
    this.propertyService.editPropertyLocation(this.prop._id, this.latlng.lat, this.latlng.lng)
      .subscribe(() => {
        this.stemService.removeProperty(this.prop._id);
        this.submitted = true;
        this.propWasSaved.emit(true);
        this.deactivateLatLng();
        this.notificationsService.pushNotifications(
          new Notification(TYPES.success,
            "Success",
            "Location for property is changed successfully!")
        )
      }, error => {
        this.notificationsService.pushNotifications(
          new Notification(TYPES.danger,
            "Error",
            error.message)
        )
      })
  }

  onSubmit(form: FormGroup): void {
    this.submitting = true;
    this.propertyService.editProperty(form, this.prop.result)
      .subscribe(() => {
        this.submitted = true;
        this.submitting = false;
        this.propWasSaved.emit(true);
        this.notificationsService.pushNotifications(
          new Notification(TYPES.success,
            "Success",
            "Property was edited successfully!")
        )
      }, error => {
        this.notificationsService.pushNotifications(
          new Notification(TYPES.danger,
            "Error",
            error.message)
        )
      })
  }

  onCalculate(form: FormGroup): void {
    this.calculating = true;
    this.propertyService.predictProperty(form)
      .subscribe(
        (data) => {
          this.prop.result = data.data;
          this.calculated = true;
          this.calculating = false;
        },
        error => {
          this.notificationsService.pushNotifications(
            new Notification(TYPES.danger,
              "Error",
                  error.message)
          )
        }

      );
  }

}
