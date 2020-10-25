import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import piURL from './interfaces/piURL'

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  serverURL = 'https://firefighteronline.herokuapp.com/'
  piServerURL = undefined;

  constructor(
    private http: HttpClient
  ) { 
    this.http.get<piURL>(this.serverURL + 'fire/geturl')
    .subscribe((data) =>{
      if(data.url){
        console.log(data);        
      }else{
        console.log('URL not set');        
      }
    },
    (err) => {
      console.log(err);      
    })
  }
}
