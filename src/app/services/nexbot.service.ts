import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NexbotService {

  constructor(private http: HttpClient) { }

  kbEndpoint = '/knowledgebases/8917a79c-f542-4359-9e80-81d55eb05e3d/generateAnswer';
  kbToken = 'EndpointKey e02efcf8-e8a2-43e7-8887-275cb1070ae0';
  baseUrl = 'https://atk-nexbot-service.azurewebsites.net/qnamaker';

  getAnswerBack(question: string): Observable<any> {
    const httpHeader = new HttpHeaders({'Content-Type': 'application/json', Authorization: this.kbToken});
    return this.http.post(this.baseUrl + this.kbEndpoint, { question } , {headers: httpHeader} );
  }

}
