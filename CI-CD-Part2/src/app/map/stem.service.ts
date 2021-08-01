import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import './leaflet-sidebar';
import { MarkerService } from "../marker.service";
import {Pin} from "../properties/pin.model";
import {Property} from "../properties/property.model";

@Injectable({
  providedIn: 'root'
})
export class StemService {

  static map: L.map;
  static pinMarker: L.marker;
  static pin: Pin = new Pin(false);

  propertiesLayers: L.layerGroup = L.layerGroup([], {
    makeBoundsAware: true,
    minZoom: 4,
    maxZoom: 10,
    title: 'Properties',
    mkrGroup: 'Properties',
    getLayerById: function(_id) {
      for (var i in this._layers) {
        if (this._layers[i].options._id === _id) {
          return this._layers[i];
        }
      }
    }
  });
  propertiesMarkers: L.marker[] = [];

  constructor( private markerService : MarkerService ) { }

  initMap() {
    StemService.map = L.map('map', {
      center: [ 27.994402, -81.760254 ],
      zoom: 7
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(StemService.map);

    var sidebar = L.control.sidebar({ container: 'sidebar', autopan: true })
      .addTo(StemService.map)
      .open('autopan');
  }

  enableDropPin() {
    StemService.map.on('click', this.onClick);
  }

  onClick(e) {
      let loc = e.latlng;
      let latlng = [loc.lat, loc.lng];
      StemService.addPinToMap();
      StemService.pinMarker.setLatLng(latlng);
  }

  static panToLocation(lat: number, lng: number) {
    this.map.setView([lat, lng], 50);
  }

  static resetMap() {
    this.map.setView([ 27.994402, -81.760254 ])
  }

  static addPinToMap () {
    if (!this.pin.added) {
      this.pin.added = true;
      this.pinMarker = MarkerService.getPinMarker();
      this.pinMarker.addTo(this.map);
    }
  }

  disableDropPin() {
    StemService.pin.added = false;
    StemService.pinMarker.remove(StemService.map);
    StemService.map.off('click', this.onClick);
  }

  openProperty(_id: string) {
    let marker;
    for (var i in this.propertiesLayers._layers) {
      if (this.propertiesLayers._layers[i]._id === _id) {
        marker = this.propertiesLayers._layers[i];
      }
    }
    marker.openPopup();
  }

  mapProperties(properties: Property[]) {
    this.removeMapProperties();
    properties.forEach((prop) => {
      let propMarker = this.markerService.getPropertyMarker(prop);
      propMarker._id = prop._id;
      this.propertiesMarkers.push(propMarker);
      this.propertiesLayers.addLayer(propMarker);
    });
    this.propertiesLayers.addTo(StemService.map);
  }

  removeProperty(_id: string) {
    let marker;
    for (var i in this.propertiesLayers._layers) {
      if (this.propertiesLayers._layers[i]._id === _id) {
        marker = this.propertiesLayers._layers[i];
      }
    }
    if (marker) this.propertiesLayers.removeLayer(marker);
  }

  removeMapProperties() {
    this.propertiesLayers.clearLayers();
    StemService.map.removeLayer(this.propertiesLayers);
  }
}
