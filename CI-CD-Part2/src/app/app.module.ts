import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import { MapComponent } from './map/map.component';
import { AuthorisedTopNavComponent } from './layout/authorised/authorised-top-nav/authorised-top-nav.component';
import { AuthorisedSideNavTogglerComponent } from './layout/authorised/authorised-side-nav-toggler/authorised-side-nav-toggler.component';
import { AuthorisedLayoutComponent } from './layout/authorised-layout/authorised-layout.component';
import { AuthorisedSideNavComponent } from './layout/authorised/authorised-side-nav/authorised-side-nav.component';
import { PropertyItemComponent } from './properties/property-list/property-item/property-item.component';
import { PropertyListComponent } from './properties/property-list/property-list.component';
import { PropertiesComponent } from './properties/properties.component';
import { PropertyEditComponent } from './properties/property-edit/property-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PropertyPricingComponent } from './properties/property-pricing/property-pricing.component';
import { PropertyCreateComponent } from './properties/property-create/property-create.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AuthorisedTopNavComponent,
    AuthorisedSideNavTogglerComponent,
    AuthorisedLayoutComponent,
    AuthorisedSideNavComponent,
    PropertyItemComponent,
    PropertyListComponent,
    PropertiesComponent,
    PropertyEditComponent,
    PropertyPricingComponent,
    PropertyCreateComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
