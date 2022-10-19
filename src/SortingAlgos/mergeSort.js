let end = 0;
export function getMergeSort(array)
{
    if(array.length <= 1)
    {
        return array;
    }
    let animations = []
    let auxilliaryArray = array.slice();
    end = array.length-1;
    mergeSortHelper(array, 0, array.length-1,auxilliaryArray, animations)
    return animations
}


function mergeSortHelper(array, startIndex, endIndex, auxillaryArray, animations)
{
    if(startIndex === endIndex)
        return;
	const middleIndex = Math.floor((startIndex + endIndex)/2);
    mergeSortHelper(auxillaryArray, startIndex, middleIndex, array, animations)
	mergeSortHelper(auxillaryArray, middleIndex + 1, endIndex, array, animations)
	mergeTwoArrays(array, startIndex, middleIndex, endIndex, auxillaryArray, animations)
}

function mergeTwoArrays(array, startIndex, middleIndex, endIndex, auxillaryArray, animations)
{
  let k = startIndex;
  let i = startIndex;
  let j = middleIndex + 1;
  let flag = startIndex===0 && endIndex === end
  while (i <= middleIndex && j <= endIndex) {
    animations.push([i, j, flag]);
    animations.push([i, j, flag]);
    if (auxillaryArray[i] <= auxillaryArray[j]) {
      animations.push([k, auxillaryArray[i], flag]);
      array[k++] = auxillaryArray[i++];
    } else {
      animations.push([k, auxillaryArray[j], flag]);
      array[k++] = auxillaryArray[j++];
    }
  }
  while (i <= middleIndex) {
    animations.push([i, i, flag]);
    animations.push([i, i, flag]);
    animations.push([k, auxillaryArray[i], flag]);
    array[k++] = auxillaryArray[i++];
  }
  while (j <= endIndex) {
    animations.push([j, j, flag]);
    animations.push([j, j, flag]);
    animations.push([k, auxillaryArray[j], flag]);
    array[k++] = auxillaryArray[j++];
  }
}