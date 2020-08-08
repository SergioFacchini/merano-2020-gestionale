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

  resolveName(deviceMac: string) {
    switch(deviceMac) {
      case 'CC:74:2F:87:DC:17':
        return 'Framba';

      case 'E7:DB:74:09:CA:7F':
        return 'Castellan';

      case 'client-0':
        return 'Armando';

      case 'client-1':
        return 'Harold';

      case 'client-2':
        return 'András';

      case 'client-3':
        return 'Oraldo';

      case 'client-4':
        return 'Orlando';

      case 'client-5':
        return 'Araldino';

      default:
        return deviceMac;
    }
  }

  resolvePicture(deviceMac: string) {
    switch(deviceMac) {
      case 'CC:74:2F:87:DC:17':
        return 'framba.jpg';

      case 'E7:DB:74:09:CA:7F':
        return 'sebastiano.jpg';

      case 'client-1':
        return 'image1.jpg';

      case 'client-2':
        return 'image2.jpg';

      case 'client-3':
        return 'image3.jpg';

      case 'client-4':
        return 'image4.jpg';

      case 'client-5':
        return 'image5.jpg';


      default:
        return 'harold.jpg';
    }

  }
}
