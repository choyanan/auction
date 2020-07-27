import { Component, OnInit } from '@angular/core';
import { logging } from '../shared/log.service2';
import { Logger } from '../shared/log2';

@Component({
  selector: 'app-log-test',
  templateUrl: './log-test.component.html',
  styleUrls: ['./log-test.component.css'],
})
export class LogTestComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  getUserId(): string {
    return '1';
  }

  testLog() {
    logging
      .configure({
        minLevels: {
          '': 'info',
          warnx: 'warn',
          debugx: 'debug',
          errorx: 'error',
        },
      })
      .registerConsoleLogger();
    logging.registerUserId(this.getUserId());
    let logger: Logger = logging.getLogger('debugx.HTTP Request');
    let logger2: Logger = logging.getLogger('warnx.http.component');
    // logger.trace('GET', 'api/assets/' ,json.stringfy(query_params));
    let query_params = [{ id: 1, asset: 'CI10' }];
    logger.info('GET', 'api/assets/', JSON.stringify(query_params));
  }
}
