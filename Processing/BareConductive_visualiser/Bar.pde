//thanks  P.Maguire for the  id parsing and efficiency tips when craeting this Class. 
class Bar {

  int x, y, w;
  float h;
  int r, g, b;
  color c;
  int id;

  Bar(int _id, int _x, int _y, int _w, float _h) {
    id=_id;
    x=_x;
    y=_y;
    w=_w;
    h=_h;
  }
  //where  to display ...parse height to control via incoming data. 
  void display() {
    float h = proximity[id];//id will become i in the for loop when decalred. 
    noStroke();
    fill(c);
    rect(x, y, w, h);
  }


  //cpontrol color on/off switch
  void setCol(int _r, int _g, int _b)
  {
    r=_r;
    g=_g;
    b=_b;
    c= color(r, g, b);
  }

  void touchCheck() {
    if (lastStatus[id] == 0 && status[id] == 1) {
      println("Electrode " + id + " was touched");
      lastStatus[id] = 1;
      setCol(105, 152, 146);
    } else if (lastStatus[id] == 1 && status[id] == 0) {
      println("Electrode " + id + " was released");
      lastStatus[id] = 0;
      setCol(200, 200, 200);
    }
  }
}

void displayAllBars() {
  for (Bar b : bars) {
    b.display();
  }
}

void displayTouch() {
  for (Bar b : bars) {
    b.touchCheck();
  }
}
