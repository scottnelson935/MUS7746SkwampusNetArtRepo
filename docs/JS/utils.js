// A selection of useful utilities

function random(low, high) {
    let multiplier = 1;
    let shift = 0;
  
    if (low && high) {
      multiplier = high - low;
      shift = low;
    } else if (low && !high) {
      multiplier = low;
    }
    let result = Math.random() * multiplier + shift;
    return result;
  }