# HeartBit

Our project is divided in 3 repositories:

- Web Dashboard (this repository): it contains the source code of the Angular app that show the gathered data;
- [MQTT -> WS](https://github.com/slavetto/merano-2020): repository that connects to the MQTT Broker and subscribes to the topic of the hearbeat reading. This server records the data, computes the average of the last 10 minutes and sends the reading to the Angular Dashboard using WebSockets;
- [Bluetooth -> MQTT](https://github.com/SebaCaste/pulse-sensing): code that connects to the MiBand 3 devices using BLE and sends the readings to the MQTT Broker;

