

const input = ['a', 'b', 'c'];

function getAllEnums(array) {

  if (array.length === 1) {
    return array;
  }

  array.forEach(element => {
    const index = array.indexOf(element);
    array.splice(index, 1);
    
    const returnedArrays = getAllEnums(array);
    returnedArrays.forEach(returnedArray => {
      returnedArray.splice(0, 0, element);
    });

    return returnedArrays;
  });
} 