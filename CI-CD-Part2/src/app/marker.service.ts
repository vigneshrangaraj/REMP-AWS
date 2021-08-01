import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as L from 'leaflet';
import {Property} from "./properties/property.model";

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  props: string = "/assets/example.json";

  propIcon: L.divIcon = L.divIcon({
    className: 'glyph',
    iconSize: [42, 22],
    iconAnchor: [0, 12],
    riseOnHover: true,
    html: '<img src="../assets/property.svg">'
  });

  static pinIcon: L.divIcon = L.divIcon({
    className: 'glyph',
    iconSize: [42, 22],
    iconAnchor: [0, 12],
    riseOnHover: true,
    html: '<i class="fa fa-map-marker fa-4x"></i>'
  });


  constructor(private http: HttpClient) {
  }

  getPropertyMarker(property): L.marker {
    return L.marker([property.lat, property.lng], {
      icon: this.propIcon,
      title: "Property",
      riseOnHover: true
    }).bindPopup(
      `
        <h4> ${property.address} </h4>
        <hr/>
        <strong> Price set </strong>: ${property.result}
        <strong> photo </strong>:
        <img src="${property.photo}" width="300" height="200">
      `
    )
  }

  static getPinMarker(): L.marker {
    return L.marker([0, 0], {
      icon: this.pinIcon,
      title: "TearDown",
      riseOnHover: true
    })
  }

  getPropIcon(property: Property) {
    const newX = Math.round

  }
}
