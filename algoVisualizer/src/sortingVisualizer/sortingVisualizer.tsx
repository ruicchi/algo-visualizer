// import React, { useState } from "react";
import "./SortingVisualizer.css";

const SortingVisualizerLogic: React.FC = () => {
  // Visualizer Logic is here 
  // const [sliderValue, setSliderValue] = useState(50);
  
  return (
    <div className="SortingVisualizer">
      {/* Visual UI is here*/}

      {/* buttons */}
      <h1>Sorting Visualizer</h1>
        <button className='btn random'>randomize</button>
        <button className='btn play'>play</button>

        {/* slider for progress speed */}
        {/* <div className="slider-container">
          <label>Array Size: {sliderValue}</label>
          <input
            type="range"
            min={10}
            max={100}
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
          />
        </div> */}

        {/* slider for animation speed, planning to have thresholds or marks* /}
        {/* <div className="slider-container">
          <label>Array Size: {sliderValue}</label>
          <input
            type="range"
            min={10}
            max={100}
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
          />
        </div> */}

        {/* algorithm selector planning to add more*/}
        <button className='btn bubble'>bubble sort</button>
        <button className='btn merge'>merge sort</button>
        
    </div>
  );
};

export default SortingVisualizerLogic;