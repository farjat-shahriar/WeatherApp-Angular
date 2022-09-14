import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Weather } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})

export class ApiserviceService {

  Api_Url = environment.Api_Url;
  Api_Key = environment.Api_Key;
  
  constructor(private http: HttpClient) {}

   forecast(location: any, unit:any): Observable<any> {
    return this.http.get(` https://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&appid=0f3fb9fa31ad3d41f1bb2bd0841c3f2f&units=${unit}&cnt=16`)
  }
   weather(location: any, unit:any): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?appid=0f3fb9fa31ad3d41f1bb2bd0841c3f2f&q=${location}&units=${unit}`)
  }
}

