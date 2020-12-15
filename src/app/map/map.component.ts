import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ServerService } from '../server.service'

import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import {
  Circle as CircleStyle,
  Fill,
  // Icon,
  Stroke,
  Style,
} from 'ol/style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import point from 'ol/geom/Point';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  constructor(
    public socketServer: ServerService
  ) { }

  map: any;
  ngOnInit() {
    var location = new Feature({
      geometry: new point(olProj.fromLonLat([7.0785, 51.4614])),
      color:'blue'
    });
    var vectorSource = new VectorSource({
      features: [location],
    });
    this.map = new Map({
      target: 'hotel_map',
      layers: [
        // vectorSource,
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: olProj.fromLonLat([7.0785, 51.4614]),
        zoom: 18
      })
    });
    var layer1 = new VectorLayer({
      source: new VectorSource({
        features: [
          location
        ]
      }),
      style: new Style({
        image: new CircleStyle({
          radius: 10,
          fill: new Fill({color: 'red'}),
          stroke: new Stroke({
            color: 'white',
            width: 4,
          }),
        }),
      }),
    });
    this.map.addLayer(layer1);
  }

  ngAfterViewInit() {    
  }

}
