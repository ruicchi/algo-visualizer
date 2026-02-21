import React, { useState, useEffect } from "react";
import "./SortingVisualizer.css";
import bubbleSort from "./BubbleSortLogic";
import generateBubbleSortSteps from "./BubbleSortLogic";
// import mergeSort from './MergeSortLogic';

const SortingVisualizerLogic = () => {
  //notes: this is my programming diary | all functions are arrow functions, 'cause i think it's more intuitive to use than normal ones. 
 
  //# Visualizer Logic is here 

  //* initializing empty array for random array generator
  const [array, setArray] = useState([]);

  //* State for progress speed and animation speed, using percentage for easier understanding
  const [progressSpeed, setProgressSpeed] = useState(50);
  const [arraySize, setArraySize] = useState(15);

  //* Animation states
  const [steps, setSteps] = useState<Step[]>([]); //^ where all sorting steps are
  const [currentStepIndex, setCurrentStepIndex] = useState(0); //^ which step we're on
  const [isPlaying, setIsPlaying] = useState(false); //^ is the animation playing?
  const [comparingIndices, setComparingIndices] = useState<number[]>([]); //^ which bars to highlight?
  const [sortedIndices, setSortedIndices] = useState<number[]>([]); //^ which bars are in final position

  //* State to track which algorithm is selected
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');

  //* handler for play
  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  //* handler for pause
  const handlePauseClick = () => {
    setIsPlaying(false);
  };

  //* handler for reset
  const handleResetClick = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setComparingIndices([]);
    setSortedIndices([]);
  };

  const handleBubbleSortClick= () => {
    //* Generate all steps
    const sortingSteps = generateBubbleSortSteps(array);
    
    //* Store steps in state
    setSteps(sortingSteps);
    
    //* Reset to beginning
    setCurrentStepIndex(0);
    setIsPlaying(false);
    
    console.log("Generated steps:", sortingSteps.length);
  };

  useEffect(() => {
    //study
    //* Only run if playing and not at end
    if (isPlaying && currentStepIndex < steps.length - 1) {
      
      //* Calculate delay based on speed slider
      //* progressSpeed is 1-100, convert to milliseconds
      const delay = 1000 - (progressSpeed * 9); //* Fast = low delay | can be set to another value
      
      //* Set timer to advance to next step
      const timer = setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, delay);
      
      //* Cleanup: cancel timer if something changes
      return () => clearTimeout(timer);
      
    } else if (currentStepIndex >= steps.length - 1) {
      //* Reached the end, stop playing
      setIsPlaying(false);
    }
  }, [isPlaying, currentStepIndex, steps.length, progressSpeed]);

  //* gets the current step data
  const currentStep = steps[currentStepIndex] || {
    array: array,
    comparingIndices: undefined,
    swappingIndices: undefined,
    sortedIndices: []
  };

  //* Update display states when the step changes
  useEffect(() => {
    if (currentStep) {
      setArray(currentStep.array);
      setComparingIndices(currentStep.comparingIndices || []);
      setSortedIndices(currentStep.sortedIndices || []);
    }
  }, [currentStepIndex, steps]);

  //* Algorithm selector handler
  const handleAlgorithmSelect = (algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  //* Handlers for sliders
  const handleSpeedChange = (event) => {
    setProgressSpeed(event.target.value);
  };
  const handleArraySize = (event) => {
    setArraySize(event.target.value);
  };

  //* Random array creator | numbers from 15 to 414
  const generateNewArray = () => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      const randomValue = Math.floor(Math.random() * 100) + 15;
      newArray.push(randomValue);
    }
    setArray(newArray);
  };

  //* listener for arraysizes
  useEffect(() => {
    generateNewArray();
  }, [arraySize]);

  //! Play button handler | my original one
  const handleSortTypeClick = (selectedAlgorithm) => {
    let sortingSteps = [];

    switch(selectedAlgorithm) {
      case 'bubble':
        sortingSteps = bubbleSort(array);
        break;
      // case 'merge':
      //   sortingSteps = mergeSort(array);
      //   break;
      default:
        sortingSteps = bubbleSort(array);
    }
    
    //* resets these things if play button is clicked
    setSelectedAlgorithm(selectedAlgorithm);
    setSteps(sortingSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);

    //debug: displays the algorithm and length of steps
    console.log(`${selectedAlgorithm} sort - Generated ${sortingSteps.length} steps`);
  };

  //* Array mapper to have bars on numbers with index
  const arrayBars = array.map((value, index) => {
      let barColor = '#00a4db';  //* Default blue
  
      if (sortedIndices.includes(index)) {
        barColor = '#10b981';  //* Green for sorted
      } else if (comparingIndices.includes(index)) {
        barColor = '#ef4444';  //* Red for comparing
      }

      return (
        <div
          key={index}
          className='arrayBar'
          style={{ 
            height: `${value * 3}px`,
            backgroundColor: barColor,
            transition: 'all 0.3s ease'
          }} 
        >
          <span className='barValue'>{value}</span> 
          <span className="indexLabel">{index}</span> 
        </div>
      );
  });

  return (
    <div className="SortingVisualizer">
      {/* //# Visual UI is here*/}

      {/* //* calls the arrayBars function and gives classname*/}
      <div className = 'arrayContainer'>
        {arrayBars}
      </div>

      <h1>Sorting Visualizer</h1>
      <p>Algorithm: {selectedAlgorithm}</p>

        {/* //* buttons */}
        <button className='btn random' onClick={generateNewArray}>randomize</button>
        <button className='btn play' onClick={handlePlayClick}>play</button>
        <button className='btn pause' onClick={handlePauseClick}>pause</button>
        <button className='btn stop' onClick={handleResetClick}>stop</button>
        <button className='btn seekLeft'>seek left</button>
        <button className='btn seekRight'>seek right</button>

        {/* //debug: Show array as text */}
        <p>Array: {JSON.stringify(array)}</p>

        {/* //* algorithm selector | planning to add more*/}
        <button 
          className={`btn bubble ${selectedAlgorithm == 'bubble' ? 'active' : ''}`}
          onClick={() => handleBubbleSortClick('bubble')}
        >
          bubble sort
        </button>
        <button 
          className={`btn merge ${selectedAlgorithm == 'merge' ? 'active' : ''}`}
          onClick={() => handleSortTypeClick('merge')}
        >
          merge sort
        </button>
        
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
            max = '30'
            value = {arraySize} 
            onChange={handleArraySize}
          />
        </div>
    </div>
  );
};

export default SortingVisualizerLogic;