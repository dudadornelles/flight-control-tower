# flight control tower

Flight control tower is a tool that parses your [Flightjs](http://flightjs.github.io/) project and plots its component/events architecture.

## usage

Install it:

```sh
npm install -g flight-control-tower
```

Run with:

```sh
flight-control-tower <app folder> <output html file>
```

The app folder will be scanned for all flightjs components, parse them and spit out an html file with a graph that represents the components and events for the app's architecture.

## example

```sh
npm install -g flight-control-tower
git clone https://github.com/flightjs/example-app
cd example-app
flight-control-tower app/ control-tower.html
```

Open control-tower.html and you should see something like this:

![flightjs/example-app architecture](http://i.imgur.com/XlJzgXD.jpg)

## license

Licensed under the MIT License

