import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { Property } from "./property.model";
import { Observable } from "rxjs";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient) { }

  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`/api/properties`);
  }

  predictProperty(property: FormGroup): Observable<any> {
    return this.http.post<any>(`/api/predict`, property.value);
  }

  editProperty(property: FormGroup, resultProp: string): Observable<any> {
    property.value["result"] = resultProp.toString();
    return this.http.post<any>(`/api/properties/editProp`, property.value)
  }

  editPropertyLocation(_id: string, lat: number, lng: number): Observable<any> {
    return this.http.post<any>(`/api/properties/editProp`, { _id: _id, lat: lat, lng: lng});
  }

  createProperty(property: FormGroup, resultProp: string): Observable<any> {
    property.value["result"] = resultProp.toString();
    delete property.value._id;
    return this.http.post<any>(`/api/properties/createProp`, property.value);
  }

  deleteProperty(_id: string): Observable<any> {
    return this.http.post<any>(`/api/properties/deleteProp`, {_id: _id})
  }

}
