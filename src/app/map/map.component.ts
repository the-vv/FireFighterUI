import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ServerService } from '../server.service'

import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
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
  }

  ngAfterViewInit() {
    var location = new Feature({
      geometry: new point(olProj.fromLonLat([12.5, 41.9])),
    });
    var vectorSource = new VectorSource({
      features: [],
    });
    this.map = new Map({
      target: 'hotel_map',
      layers: [
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
          new Feature({
            geometry: new point(olProj.fromLonLat([7.0785, 51.4614]))
          })
        ]
      })
    });
    this.map.addLayer(layer1);
  }

}
