//study: bubble sort algorithm

/**
 * Basic bubble sort algorithm
 * 
 * @param inputArray - The array of numbers to sort
 * @returns The sorted array
 */
function bubbleSort(inputArray: number[]): number[] {
  //! Clone the input array to avoid mutating the original
  const array = [...inputArray];
  const n = array.length;

  //# Outer loop: controls the number of passes through the array
  for (let i = 0; i < n - 1; i++) {
    
    //# Inner loop: compares adjacent elements
    //* After each pass, the largest element "bubbles up" to the end
    //* So we can reduce the inner loop range by i each time
    for (let j = 0; j < n - i - 1; j++) {
      
      //debug: Compare adjacent elements
      if (array[j] > array[j + 1]) {
        //debug: Swap if they're in the wrong order
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }

  return array;
}

export default bubbleSort;