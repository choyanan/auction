import { Injectable } from '@angular/core';

import {
  LogPublisher,
  LogConsole,
  LogLocalStorage,
  LogPublisherConfig,
} from './log-publishers';
import { Observable } from 'rxjs';

const PUBLISHERS_FILE = '/src/app/assets/log-publishers.json';

@Injectable()
export class LogPublishersService {
  constructor() {
    // Build publishers arrays
    this.buildPublishers();
  }

  // Public properties
  publishers: LogPublisher[] = [];

  // Build publishers array
  buildPublishers(): void {
    // Create instance of LogConsole Class
    this.publishers.push(new LogConsole());
    // Create instance of LogLocalStorage Class
    this.publishers.push(new LogLocalStorage());
  }

  private handleErrors(error: any): Observable<any> {
    let errors: string[] = [];
    let msg: string = '';

    msg = 'Status: ' + error.status;
    msg += ' - Status Text: ' + error.statusText;
    if (error.json()) {
      msg += ' - Exception Message: ' + error.json().exceptionMessage;
    }
    errors.push(msg);

    console.error('An error occurred', errors);

    return Observable.throw(errors);
  }

  // getLoggers(): Observable<LogPublisherConfig[]> {
  //   return this.http
  //     .get(PUBLISHERS_FILE)
  //     .map((response) => response.json())
  //     .catch(this.handleErrors);
  // }
}
