//# insertion sort algorithm

function generateInsertionSortSteps(inputArray: number[]): Step[] {
  const array = [...inputArray];
  const steps: Step[] = [];

  // Initial state
  steps.push({
    array: [...array],
    sortedIndices: [],
    comparingIndices: [],
    swappingIndices: [],
    activeIndices: [],
    description: "Initial array"
  });

  for (let i = 1; i < array.length; i++) {
    const key = array[i];
    let j = i - 1;

    // Highlight the key being inserted
    steps.push({
      array: [...array],
      sortedIndices: [],
      comparingIndices: [],
      swappingIndices: [],
      activeIndices: [i],
      description: `Select ${key} for insertion`
    });

    while (j >= 0) {
      // Compare current element with key
      steps.push({
        array: [...array],
        sortedIndices: [],
        comparingIndices: [j, j + 1],
        swappingIndices: [],
        activeIndices: [i],
        description: `Compare ${array[j]} and ${key}`
      });

      if (array[j] > key) {
        // Shift element right (visualize as swap)
        array[j + 1] = array[j];
        steps.push({
          array: [...array],
          sortedIndices: [],
          comparingIndices: [],
          swappingIndices: [j, j + 1],
          activeIndices: [i],
          description: `Shift ${array[j]} right`
        });
        j--;
      } else {
        break;
      }
    }

    array[j + 1] = key;

    // Mark sorted up to i
    steps.push({
      array: [...array],
      sortedIndices: Array.from({ length: i + 1 }, (_, idx) => idx),
      comparingIndices: [],
      swappingIndices: [],
      activeIndices: [j + 1],
      description: `Insert ${key} at index ${j + 1}`
    });
  }

  // Mark all sorted at the end
  steps.push({
    array: [...array],
    sortedIndices: Array.from({ length: array.length }, (_, idx) => idx),
    comparingIndices: [],
    swappingIndices: [],
    activeIndices: [],
    description: "Array fully sorted"
  });

  return steps;
}

export default generateInsertionSortSteps;