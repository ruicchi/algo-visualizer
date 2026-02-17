import React, { useState, useEffect } from "react";
import "./SortingVisualizer.css";

const SortingVisualizerLogic = () => {
  //notes: this is my programming diary | all functions are arrow functions, 'cause i think it's more intuitive to use than normal ones. 

  //# Visualizer Logic is here 
  
  //* initializing empty array for random array generator
  const [array, setArray] = useState([]);

  //* State for progress speed and animation speed, using percentage for easier understanding
  const [progressSpeed, setProgressSpeed] = useState(50);
  const [arraySize, setArraySize] = useState(20);

  //* Handlers for sliders
  const handleSpeedChange = (event) => {
    setProgressSpeed(event.target.value);
  };
  const handleArraySize = (event) => {
    setArraySize(event.target.value);
  };

  //todo: array mapper to have styles on numbers | not yet working | planning to make it on another file
  // const arrayBars = array.map((value, index) => (
  //     <div
  //       key={index}
  //       className="arrayBar"
  //       style={{ height: `${value * 3}px` }}
  //     >
  //       <span>{value}</span>
  //       <span className="indexLabel">{index}</span>
  //     </div>
  //   ));

  //! There has to be logic that generates an array if size is changed, this is useEffect

  //* Random array creator | numbers from 10 to 409
  const generateNewArray = () => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      const randomValue = Math.floor(Math.random() * 400) + 10;
      newArray.push(randomValue);
    }
    setArray(newArray);
  };

  return (
    <div className="SortingVisualizer">
      {/* //# Visual UI is here*/}

      {/* //study this array container*/}
      {/* <div className = 'arrayContainer'>
        {arrayBars}
      </div> */}

      {/* //* buttons */}
      <h1>Sorting Visualizer</h1>
        <button className='btn random' onClick={generateNewArray}>randomize</button>
        <button className='btn play'>play</button>
        <button className='btn pause'>pause</button>
        <button className='btn stop'>stop</button>
        <button className='btn seekLeft'>seek left</button>
        <button className='btn seekRight'>seek right</button>

        {/* //debug: Show array as text */}
        <p>Array: {JSON.stringify(array)}</p>

        {/* //* algorithm selector | planning to add more*/}
        <button className='btn bubble'>bubble sort</button>
        <button className='btn merge'>merge sort</button>
        
        {/* //* slider for progress speed, planning to have thresholds or marks*/}
        <div className='slider progressSpeed'>
          <label>Progress Speed: {progressSpeed}%</label>
          <input 
            type = 'range' 
            min = '1'
            max = '100'
            value = {progressSpeed} 
            onChange={handleSpeedChange}
          />
        </div>

        {/* //* slider for array size*/}
        <div className='slider arraySize'>
          <label>Array size: {arraySize}</label>
          <input 
            type = 'range'
            min = '4'
            max = '100'
            value = {arraySize} 
            onChange={handleArraySize}
          />
        </div>
    </div>
  );
};

export default SortingVisualizerLogic;