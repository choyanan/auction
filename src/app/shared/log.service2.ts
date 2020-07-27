import { EventEmitter } from 'events';
import { Logger } from './log2';

export class LogManager extends EventEmitter {
  private options: LogOptions = {
    minLevels: {
      '': 'info',
    },
  };

  private userId = '';

  // Prevent the console logger from being added twice
  private consoleLoggerRegistered: boolean = false;

  public configure(options: LogOptions): LogManager {
    this.options = Object.assign({}, this.options, options);
    return this;
  }
  public registerUserId(userId: string) {
    this.userId = userId;
  }

  public getLogger(module: string): Logger {
    let minLevel = 'none';
    let match = '';

    for (const key in this.options.minLevels) {
      if (module.startsWith(key) && key.length >= match.length) {
        minLevel = this.options.minLevels[key];
        match = key;
      }
    }

    return new Logger(this, module, minLevel, this.userId);
  }

  public onLogEntry(listener: (logEntry: LogEntry) => void): LogManager {
    this.on('log', listener);
    return this;
  }

  public registerConsoleLogger(): LogManager {
    if (this.consoleLoggerRegistered) return this;

    this.onLogEntry((logEntry) => {
      //   const msg = `${logEntry.location} [${logEntry.module}] ${logEntry.message}`;

      let requestType = logEntry.module.substring(
        logEntry.module.lastIndexOf('.') + 1
      );
      const msg = `[${new Date()}][${requestType}][${logEntry.level}][userId:${
        logEntry.userId
      }][${logEntry.location}][${logEntry.message}]`;

      switch (logEntry.level) {
        case 'trace':
          console.trace(msg); //改存储路径
          break;
        case 'debug':
          console.debug(msg);
          break;
        case 'info':
          console.info(msg);
          break;
        case 'warn':
          console.warn(msg);
          break;
        case 'error':
          console.error(msg);
          break;
        default:
          console.log(`{${logEntry.level}} ${msg}`);
      }
    });

    this.consoleLoggerRegistered = true;
    return this;
  }
}

export interface LogEntry {
  level: string;
  module: string;
  location?: string;
  message: string;
  userId?: string;
}

export interface LogOptions {
  minLevels: { [module: string]: string };
}

export const logging = new LogManager();
