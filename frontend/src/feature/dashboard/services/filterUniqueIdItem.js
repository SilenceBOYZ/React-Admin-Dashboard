function filterUniqueIdItem(data) {
  let res = {};
  data.forEach((id) => res[id] = id);
  return Object.values(res);
}

export default filterUniqueIdItem
