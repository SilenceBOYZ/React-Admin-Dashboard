function cutDataInChart(array, numberItemInArr) {
  try {
    if (!Array.isArray(array)) throw new Error("This param isn't an Array")
    if (numberItemInArr > array.length) {
      array.slice(0, -1);
    }
    return array.slice(0, numberItemInArr);
  } catch (err) {
    console.error(err);
  }
}

export default cutDataInChart
