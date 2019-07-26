/*Bare Conductive Visualiser */
/**
 * https://github.com/j3nsykes/bareConductive_visualiser
 * by Jen Sykes
 * adapted and converted for p5.js from original here
 * https://github.com/BareConductive/simple_touch_board_sketch
 * 
 * Adaptations include recieving FDAT data  and creating a Class to 
 * visualise touch/release interactions 
 * adapted Processing version here 
 * https://github.com/j3nsykes/bareConductive_visualiser
 */
/**
*   utilises the 
 *  p5.serialport
 *  https://github.com/vanevery/p5.serialport
 *
 */
var serial; // variable to hold an instance of the serialport library
var portName = '/dev/tty.usbmodem14321'; // fill in your serial port name here
var inString; // input string from serial port
var splitString = []; // input string array after splitting
let status = [];
let lastStatus = [];
let filteredData = [];
let proximity=[]
let mapData = [];
var firstElectrode = 1; //start at one ignore first String
var lastElectrode = 7; //use if you do not want all electrodes in use. 
var numElectrodes = 13; //one higher to  include data string
let bars = [];

function setup() {
  createCanvas(650, 800); // make the canvas

  //////SERIAL INFO///////////////////////
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing
  var options = {
    baudrate: 57600
  }; // change the data rate to whatever you wish
  serial.open(portName, options);

  //////DATA AND VISUAL INFO///////////////////////
  // Create objects  
  for (var i = firstElectrode; i < lastElectrode; i++) {
    //parse i  into the id parameter 
    bars[i] = new Bar(i, 10+(i * 80), 50, 50, height);
    bars[i].setCol(200, 200, 200);
    lastStatus[i] = 0;
  }


  textAlign(LEFT);
  textSize(16);
}



/////////////////// SERIAL COMMS  //////////////////////////////////
//get the serial information!!!
function serialEvent() {

  inString = serial.readStringUntil('\r\n'); //new line feed 

  //is there a string?
  if (inString.length > 0) {
    splitString = splitTokens(inString, ': ');
    //console.log(splitString);

  }

}
//get the data  and do something with it....
function processData() {

  //recieve and processs the different data.
  for (var i = firstElectrode; i < numElectrodes; i++) {

    //if the String begins with FDAT (filtered data / proximity) 
    if (splitString[0] === 'FDAT') {
      filteredData[i] = parseInt(trim(splitString[i])); //make whole number
      //map into visual parameters. 
      proximity[i] = map(filteredData[i], 0, 1023, 0, height);
      //print(proximity);
    }

    //if the String begins with TOUCH
    if (splitString[0] === 'TOUCH') {
      //parse into int. 
      status[i] = parseInt(trim(splitString[i]));


    }
  }

}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}
// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    print(i + " " + portList[i]);
  }
}

////////////////////  ACTION !!!!!!  //////////////////////////////////
function draw() {
  // grey background
  background(80);
  processData();
  //comment  in to display text of filttered data
  //debug();

  //display  electrode visuals. 
  displayAllBars();
  displayTouch();

}

function debug() {

  //text display the data. 
  for (var i = firstElectrode; i < lastElectrode; i++) {
    fill(255);

    text('PROXIMITY ' + " E" + (i-1) + ": " + filteredData[i], 50, 450 + (i * 30), 600, 50);
  }
}
///////////////////////////BAR VISUALS//////////////////////////////////
//Bar class so we can control individual visuals of the touch electrodes.
//references P.Maguire's method of using id to parse each electrode's data into the class.
class Bar {


  constructor(id, x, y, w, h) {

    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.c = color(this.r, this.g, this.b);
    this.id = id;
  }

  //change colour of individual bar when touched
  setCol(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;

    this.c = color(this.r, this.g, this.b);

  }

  display() {

    this.h = proximity[this.id];

    noStroke();
    fill(this.c);
    rect(this.x, this.y, this.w, height-this.h);
  }

  touchCheck() {
    //take serial touch data to control colour of bars. 
    if (lastStatus[this.id] == 0 && status[this.id] == 1) {
      print("Electrode " + this.id + " was touched");
      lastStatus[this.id] = 1;
      this.setCol(105, 152, 146);
    } else if (lastStatus[this.id] == 1 && status[this.id] == 0) {
      print("Electrode " + this.id + " was released");
      lastStatus[this.id] = 0;
      this.setCol(200, 200, 200);
    }
  }
}

function displayAllBars() {
  //iterate through all the bars to display

  bars.forEach(b => {
    b.display();
  });
}

function displayTouch() {
  //iterate through all touch checks of bars. 
  bars.forEach(b => {
    b.touchCheck();
  });
}