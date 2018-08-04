import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Google Maps in Angular 6';

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  latitude: number;
  longitude: number;

  markerTypes = [
    { text: "Parking", value: 0 },
    { text: "Library", value: 1 },
    { text: "Information", value: 2 },
    { text: "Beach Flag", value: 3 },
    { text: "Car", value: 4 },
  ];

  selectedMarkerType: string;
  markers: Array<google.maps.Marker>;

  ngOnInit() {
    this.markers = [];
    this.selectedMarkerType = '0';
    this.latitude = 37.376272;
    this.longitude = -121.849629;
    var mapProp = {
      center: new google.maps.LatLng(this.latitude, this.longitude),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.map.addListener('zoom_changed', () => {
      console.log("current zoom settings: " + this.map.getZoom());
      /* fix based on https://developers.google.com/maps/documentation/javascript/markers#convertingtoicon
       * var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      }; */
    });
    this.putMarker();
  }

  setMapType(mapTypeId: string) {
    this.map.setMapTypeId(mapTypeId)
  }

  setCenter() {
    this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));
    this.putMarker();
  }

  putMarker() {
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.latitude, this.longitude),
      map: this.map,
      icon: this.getMarkerIcon(),
      title: 'You are here'
    });
    new google.maps.Marker
    this.markers.push(marker);
  }

  clearMarkers() {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
    console.log('markers cleared');
  }

  // get mark icon based on user input on the UI
  getMarkerIcon(): string {
    let iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    // convert to int because UI always returns selectedMarkerType as string
    switch (Number(this.selectedMarkerType)) {
      case 0: return iconBase + 'parking_lot_maps.png';
      case 1: return iconBase + "library_maps.png";
      case 2: return iconBase + 'info-i_maps.png';
      case 3: return 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
      case 4: return 'https://d30y9cdsu7xlg0.cloudfront.net/png/468-200.png';
      default: return 'https://d30y9cdsu7xlg0.cloudfront.net/png/468-200.png';
    }
  }

  // put selected marker in the center of the map
  showCustomMarker() {
    this.latitude = this.map.getCenter().lat();
    this.longitude = this.map.getCenter().lng();
    this.putMarker();
  }
}
