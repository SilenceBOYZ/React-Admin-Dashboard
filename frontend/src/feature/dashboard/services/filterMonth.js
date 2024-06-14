function filterMonthExistInOrder(data) {
  let res = {};
  data.forEach((createdAt) => res[createdAt] = createdAt);
  return Object.values(res);
}

export default filterMonthExistInOrder