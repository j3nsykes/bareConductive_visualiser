//simple touch board example adapted from BareConductive https://github.com/BareConductive/simple_touch_board_sketch
//modified to recieve FDAT  and also visualise the touch release interactions by Jen Sykes

import processing.serial.*;

int xPos = 1;         // horizontal position of the graph
color c= color(255, 0, 0);

Bar [] bars;

void setup() {
  touchBoardSetup();
  size(500, 500);
  background(80);
  //display bars
  bars= new Bar[6];

  for (int i = firstElectrode; i < lastElectrode; i++) {
    //id is now i
    //height is controlled in display of class and now just needs arbitary value in setup.
    bars[i]=new Bar(i, 70+i*60, 50, 50, 50);
    bars[i].setCol(200, 200, 200);
  }
}

void draw() {
  background(80);
  //visualise the data

  displayAllBars();
  displayTouch();
}
