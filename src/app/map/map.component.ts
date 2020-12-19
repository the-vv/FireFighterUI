import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ServerService } from '../server.service'
import 'ol/ol.css';
import mapboxgl from 'mapbox-gl';
import { AlertService } from '@full-fledged/alerts';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  constructor(
    public socketServer: ServerService,
    private alertService: AlertService
  ) { }

  marker: any
  map: any;
  mapShown = false;

  ngOnInit() {
    this.socketServer.mapboxKey.then((key) =>{
      this.socketServer.location.subscribe(loc => {
        var data = [loc['latitude'], loc['longitude']]
        console.log(data);
        if (this.mapShown) {
          this.map.setCenter(data.reverse())
          this.marker.setLngLat(data)
        }
        else {
          this.setMap(data, key);
          this.alertService.info('Located')
          this.mapShown = true;
        }
      })    
    })
  }

  ngAfterViewInit() {
  }

  setMap(loc: any, key: any) {
    mapboxgl.accessToken = key;
    // mapboxgl.accessToken = key
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-streets-v11',
      center: loc.reverse(),
      zoom: 16
    });
    this.marker = new mapboxgl.Marker({
      color: "#ff3333",
      draggable: false
    })
      .setLngLat(loc)
      .addTo(this.map);
  }

}
