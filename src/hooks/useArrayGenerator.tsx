//# array generator hook

import { useState, useEffect, useCallback } from 'react';

export const useArrayGenerator = (initialSize: number = 15) => {

  //* initializing empty array and array size for random array generator
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState<number>(initialSize);

  //* random array generator
  const generateNewArray = useCallback(() => {
    const newArray: number[] = [];
    for (let i = 0; i < arraySize; i++) {
      const randomValue = Math.floor(Math.random() * 100) + 15;
      newArray.push(randomValue);
    }
    setArray(newArray);
  }, [arraySize]);

  //* listener that generates new array
  useEffect(() => {
    generateNewArray();
  }, [generateNewArray]);

  return {
    array,
    setArray,
    arraySize,
    setArraySize,
    generateNewArray
  };
};