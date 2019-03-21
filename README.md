# Quantia spread monitor

> Crypto spread analyzer for Quantia Capital

## About

This project compares the weighted average price of several exchanges for several crypto, and alerts via Telegram when the maximum spread goes beyond the configured value, allowing to set up to five different alert levels. A dashboard and trading panel is available in the [frontend](https://github.com/Vallo/QuantiaSpreadMonitor_Client).

This project uses [Feathers](http://feathersjs.com). 

Work in progress. Demo available: [Frontend](https://200.68.125.222:30443), [Backend](https://200.68.125.222:30030)

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/quantia-spread-monitor-feathers; npm install
    ```
2.1 Configure connection to a database (Postgres used in Demo) 
   ``` 
   feathers g connection
   ```
2.2 Configure authentication and secret 
   ```
   feathers g secret
   feathers g authentication (Username + Password)
   ```
2.3 Configure ssl pem & key locations at ./config/production.json like this:
   ```
   {
     "ssl":{
       "cert":"/path/to/pem",
       "key":"/path/to/key"
     }
  }
  ```
   
3. Start your app

    ```
    npm start
    ```

## License

Copyright (c) 2019

Licensed under the [MIT license](LICENSE).
