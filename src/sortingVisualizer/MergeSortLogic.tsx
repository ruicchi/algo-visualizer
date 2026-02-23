//# merge sort algorithm
//! to be finalized, merge sort should store unchosen elements of array | update visualizer also
//study


function generateMergeSortSteps(inputArray: number[]): Step[] {
  const steps: Step[] = [];
  const array = [...inputArray];
  
  //* Store initial state
  steps.push({
    array: [...array],
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: []
  });

  mergeSort(array, 0, array.length - 1, steps);
  
  //* Final state - everything sorted
  steps.push({
    array: [...array],
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: Array.from({ length: array.length }, (_, i) => i)
  });
  
  return steps;
}

function mergeSort(array: number[], left: number, right: number, steps: Step[]): void {
  if (left >= right) {
    return;
  }

  const middle = Math.floor((left + right) / 2);
  
  //* Divide: Show the split
  const divideIndices = [];
  for (let i = left; i <= right; i++) {
    divideIndices.push(i);
  }
  steps.push({
    array: [...array],
    comparingIndices: divideIndices,
    swappingIndices: [],
    sortedIndices: []
  });

  //* Recursively sort left and right halves
  mergeSort(array, left, middle, steps);
  mergeSort(array, middle + 1, right, steps);
  
  //* Conquer: Merge the sorted halves
  merge(array, left, middle, right, steps);
}

function merge(array: number[], left: number, middle: number, right: number, steps: Step[]): void {
  //* Create copies of the subarrays
  const leftArray = [];
  const rightArray = [];
  
  for (let i = left; i <= middle; i++) {
    leftArray.push(array[i]);
  }
  for (let i = middle + 1; i <= right; i++) {
    rightArray.push(array[i]);
  }
  
  let i = 0;
  let j = 0;
  let k = left;

  //* Merge the two sorted subarrays
  while (i < leftArray.length && j < rightArray.length) {
    //* Show comparison between elements from left and right subarrays
    steps.push({
      array: [...array],
      comparingIndices: [left + i, middle + 1 + j],
      swappingIndices: [],
      sortedIndices: []
    });

    if (leftArray[i] <= rightArray[j]) {
      array[k] = leftArray[i];
      i++;
    } else {
      array[k] = rightArray[j];
      j++;
    }
    
    //* Show the element being placed in merged position
    steps.push({
      array: [...array],
      comparingIndices: [],
      swappingIndices: [k],
      sortedIndices: []
    });
    
    k++;
  }

  //* Copy remaining elements from left subarray
  while (i < leftArray.length) {
    array[k] = leftArray[i];
    steps.push({
      array: [...array],
      comparingIndices: [],
      swappingIndices: [k],
      sortedIndices: []
    });
    i++;
    k++;
  }

  //* Copy remaining elements from right subarray
  while (j < rightArray.length) {
    array[k] = rightArray[j];
    steps.push({
      array: [...array],
      comparingIndices: [],
      swappingIndices: [k],
      sortedIndices: []
    });
    j++;
    k++;
  }
  
  //* Show the merged section
  const mergedIndices = [];
  for (let i = left; i <= right; i++) {
    mergedIndices.push(i);
  }
  steps.push({
    array: [...array],
    comparingIndices: [],
    swappingIndices: mergedIndices,
    sortedIndices: []
  });
}

export default generateMergeSortSteps;