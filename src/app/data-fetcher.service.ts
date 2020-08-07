import * as io from 'socket.io-client';
import {ReplaySubject, Subject} from "rxjs";

export class Statistics {
  constructor(
    public max: number,
    public min: number,
    public avg: number
  ) {}
}

export class Message {
  constructor(
    public mac: string,
    public battery: number,
    public bpm: number,
    public timestamp: number,
    public statistics: Statistics
  ) {}
}

export class DataFetcherService {
  private socket: SocketIOClient.Socket;

  private listeners = {};

  public devicesChanged: Subject<string[]> = new Subject<string[]>();

  constructor() {
    this.socket = io('http://localhost:3000');
    this.socket.on('update', (message: Message) => {
      const id = message.mac;

      if (!this.listeners[id]) {
        this.listeners[id] = new ReplaySubject<Message>();

        const ids = Object.keys(this.listeners);
        this.devicesChanged.next(ids);
      }

      this.listeners[id].next(message);
    });
  }

  listenOnDevice(deviceMac: string): ReplaySubject<Message> {
    return this.listeners[deviceMac];
  }
}
