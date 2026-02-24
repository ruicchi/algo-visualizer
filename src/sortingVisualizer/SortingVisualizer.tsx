import React, { useState, useEffect } from "react";
import "./SortingVisualizer.css";
import generateBubbleSortSteps from "../algorithms/bubbleSort";
import generateMergeSortSteps from "../algorithms/mergeSort";
import { useArrayGenerator, useSortingAnimation } from '../hooks';
import { handleSortTypeClick } from "../handlers/handleAlgorithms";

const SortingVisualizerLogic = () => {
  //notes: all functions are arrow functions, 'cause i think it's more intuitive to use than normal ones. 
 
  //# Visualizer Logic is here 
  //* State for progress speed, using percentage for easier understanding
  const [progressSpeed, setProgressSpeed] = useState<number[]>(50);

  //* State to track which algorithm is selected
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('Pick an algorithm!');
  //study array generator with desctructuring syntax, making them local variables
  const {
    array,
    setArray,
    arraySize,
    setArraySize,
    generateNewArray
  } = useArrayGenerator(15);

  const {
    steps,
    setSteps,
    currentStepIndex,
    setCurrentStepIndex,
    isPlaying, //study
    setIsPlaying,
    comparingIndices,
    setComparingIndices,
    play,
    pause,
    reset,
    randomize,
    currentStep,
    arrayBars
  } = useSortingAnimation(progressSpeed, arraySize, generateNewArray, setArray, selectedAlgorithm, array)

  //study handler for seek left (go to previous step)
  const handleSeekLeft = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setIsPlaying(false); //^ Pause when seeking
    }
  };

  //study handler for seek right (go to next step)
  const handleSeekRight = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setIsPlaying(false); //^ Pause when seeking
    }
  };
  
  // //! to delete - Helper function to create random array | outdated
  // const createRandomArray = (arraySize) => {
  //   const newArray = [];
  //   for (let i = 0; i < arraySize; i++) {
  //     const randomValue = Math.floor(Math.random() * 100) + 15;
  //     newArray.push(randomValue);
  //   }
  //   return newArray;
  // };

  // //! to refactor - handler for randomize | outdated
  // const handleRandomizeClick = () => {
  //   const newArray = createRandomArray(arraySize);
  //   setArray(newArray);
  //   setIsPlaying(false);
  //   setComparingIndices([]);
  //   setSortedIndices([]);
    
  //   //* Regenerate steps if an algorithm was selected
  //   if (selectedAlgorithm === 'bubble' || selectedAlgorithm === 'merge') {
  //     regenerateSteps(newArray);
  //   }
  // };

  // //* function to generate steps based on selected algorithm
  // const regenerateSteps = (currentArray: number[]) => {
  //   if (selectedAlgorithm == 'bubble') {
  //     const sortingSteps = generateBubbleSortSteps(currentArray);
  //     setSteps(sortingSteps);
  //     setCurrentStepIndex(0);
  //     console.log("Regenerated bubble sort steps:", sortingSteps.length);
  //   } else if (selectedAlgorithm == 'merge') {
  //     const sortingSteps = generateMergeSortSteps(currentArray);
  //     setSteps(sortingSteps);
  //     setCurrentStepIndex(0);
  //     console.log("Regenerated merge sort steps:", sortingSteps.length);
  //   }
  // };

  //* Handlers for sliders
  const handleSpeedChange = (event) => {
    setProgressSpeed(event.target.value);
  };

  const handleArraySize = (event) => {
    setArraySize(event.target.value);
  };

  //study progress slider for steps
  const handleProgressChange = (event) => {
    const newStepIndex = parseInt(event.target.value);
    setCurrentStepIndex(newStepIndex);
    setIsPlaying(false); //* Pause when manually scrubbing
  };

  // //! to delete - listener for arraysizes | outdated
  // useEffect(() => {
  //   handleRandomizeClick();
  // }, [arraySize]);

  // //* when you click a sorting button
  // const handleSortTypeClick = (selectedAlgorithm) => {
  //   switch(selectedAlgorithm) {
  //     case 'bubble':
  //       handleBubbleSort(array);
  //       break;
  //     case 'merge':
  //       handleMergeSort(array);
  //       break;
  //   }
  // };

  //study Array mapper to have bars on numbers with index

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
        <button className='btn random' onClick={randomize}>randomize</button>
        <button className='btn play' onClick={play}>play</button>
        <button className='btn pause' onClick={pause}>pause</button>
        <button className='btn stop' onClick={reset}>reset</button>
        <button 
          className='btn seekLeft' 
          onClick={handleSeekLeft}
          disabled={currentStepIndex === 0 || steps.length === 0}
        >seek left</button>
        <button 
          className='btn seekRight'
          onClick={handleSeekRight}
          disabled={currentStepIndex >= steps.length - 1 || steps.length === 0}
        >seek right</button>

        {/* //debug: Show array as text */}
        <p>Array: {JSON.stringify(array)}</p>

        {/* //* algorithm selector | planning to add more*/}
        <button 
          className={`btn bubble`}
          onClick={() => handleSortTypeClick('bubble', array, setSelectedAlgorithm, setSteps, setCurrentStepIndex, setIsPlaying)}
        >
          bubble sort
        </button>
        <button 
          className={`btn merge`}
          onClick={() => handleSortTypeClick('merge', array, setSelectedAlgorithm, setSteps, setCurrentStepIndex, setIsPlaying)}
        >
          merge sort
        </button>
        
        {/* //study slider for progress through steps */}
      <div className='slider progress'>
        <label>Progress: Step {currentStepIndex + 1} of {steps.length}</label>
        <input
          type='range'
          min='0'
          max={Math.max(0, steps.length - 1)}
          value={currentStepIndex}
          onChange={handleProgressChange}
          disabled={steps.length === 0}
        />
      </div>

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