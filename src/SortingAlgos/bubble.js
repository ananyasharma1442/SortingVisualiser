export function getBubbleSort(array)
{
    let animations = []
    let auxilliaryArray = array.slice();
    bubbleSort(auxilliaryArray, animations)
    array = auxilliaryArray
    return [animations,array]
}

function bubbleSort(auxilliaryArray, animations)
{
    const n = auxilliaryArray.length
    for(let i = 0; i<n-1; i++)
    {
        for(let j = 0; j<n-i-1; j++)
        {
            if(j+1 === n-i-1)
            {
                animations.push([j,j+1,true]);
                animations.push([j,j+1,true]);        
            }else{
                animations.push([j,j+1,false]);
                animations.push([j,j+1,false]);    
            }

            if(auxilliaryArray[j]>auxilliaryArray[j+1])
            {

                animations.push([j,auxilliaryArray[j+1],false]);
                animations.push([j+1,auxilliaryArray[j],false]);
                swap(auxilliaryArray, j, j+1)
            }else{
                animations.push([-1,-1,false])
                animations.push([-1,-1,false])
            }
        }
    }

    animations.push([0,0,true]);
}

function swap(auxilliaryArray, firstIndex, secondIndex)
{
    let temp = auxilliaryArray[firstIndex];
    auxilliaryArray[firstIndex] = auxilliaryArray[secondIndex]
    auxilliaryArray[secondIndex] = temp;
}