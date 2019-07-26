# BareConductive_visualiser
Processing and P5.js code for visualising BareConductive board serial input. 

## Processing
This is an adaptation of the code provided by Bare Conductive [**here**](https://github.com/BareConductive/simple_touch_board_sketch)

This version also includes serial input of FDAT (filtered data) too in order to visualise proximity. 
In addition a Bar Class was created to visualise touch and release interactions. 

## P5.js
This code is converted from the Processing version into javascript. In order to use the Bare Conductive board with P5.js you must include the **p5-serial library** found [**here**](https://github.com/p5-serial/p5.serialport)

- Follow the guidelines detailed to enable interaction between Serial and p5.js
- You can use the serial App or node.js to do this. 
- You'll likely have to change the name of the serial port in the examples to the one your Arduino is using.


