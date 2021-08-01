import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PropertyService} from "../property.service";
import {Pin} from "../pin.model";
import {StemService} from "../../map/stem.service";
import {Notification, TYPES} from "../../notifications/notification.model";
import {NotificationsService} from "../../notifications/notifications.service";
import {Property} from "../property.model";

@Component({
  selector: 'app-property-create',
  templateUrl: './property-create.component.html',
  styleUrls: ['./property-create.component.css']
})
export class PropertyCreateComponent implements OnInit {
  calculated: boolean = false;
  calculating: boolean = false;

  submitted: boolean = false;
  submitting: boolean = false;

  myForm: FormGroup;

  estimate: string;

  setLatLoc: boolean = false;

  latlng;
  pin: Pin = StemService.pin;

  newProp: Property;

  @Output() proeprtyWasCreated = new EventEmitter<boolean>();

  constructor( private fb: FormBuilder,
               private propertyService: PropertyService,
               private stemService: StemService,
               private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      _id: [''],
      address: ['', Validators.required],
      lotArea: ['', Validators.required],
      basement: ['', Validators.required],
      photo: ['', Validators.required],
      livingArea: ['', Validators.required],
      baths: ['', Validators.required],
      rooms: ['', Validators.required],
      bedRooms: ['', Validators.required],
      deck: ['', Validators.required],
      firstFloor: ['', Validators.required],
      secondFloor: ['', Validators.required],
      carsGarage: ['', Validators.required]
    });

    this.onChanges();
  }

  onSubmit(form: FormGroup): void {
    this.submitting = true;
    this.propertyService.createProperty(form, this.estimate)
      .subscribe((newProp) => {
        this.submitted = true;
        this.newProp = newProp;
        this.submitting = false;
        this.proeprtyWasCreated.emit(true);
        this.notificationsService.pushNotifications(new Notification(TYPES.success, "Success",
          "Property successfully created"));
      }, error => {
        this.notificationsService.pushNotifications(new Notification(TYPES.danger, "Error",
          error.message));
      })
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
    this.propertyService.editPropertyLocation(this.newProp._id, this.latlng.lat, this.latlng.lng)
      .subscribe(() => {
        this.submitted = true;
        this.deactivateLatLng();
        this.proeprtyWasCreated.emit(true);
        this.notificationsService.pushNotifications(
          new Notification(TYPES.success,
            "Success",
            "Location for property is created successfully!")
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
      .subscribe((data) => {
        this.estimate = data.data;
        this.calculated = true;
        this.calculating = false;
      });
  }

}
