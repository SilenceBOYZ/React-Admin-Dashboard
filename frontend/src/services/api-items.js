import instance from "../config/axios";


async function fetchItemsData(pageNum) {
  if (!pageNum) pageNum = 1;
  let data = await instance.get(`/api/items/get-all-items?pageNum=${pageNum}`)
  return data;
}

async function fetchCatergoryData() {
  let data = await instance.get("/api/catergories/get-all-catergories")
  return data;
}

async function updateItem(itemData) {
  const { id } = itemData;
  let data = await instance.put(`/api/items/update-item?id=${id}`, 
    itemData
  , {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return data;
}

async function fetchItem(id) {
  let data = await instance.get(`/api/items/get-item?id=${id}`)
  return data.dataSelected
}

async function createItem(dataFromClient) {
  let data = await instance.post('/api/items//create-new-item', dataFromClient, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return data;
}


async function deleteItem(id) {
  let data = await instance.delete(`/api/items/delete-item?id=${id}`);
  return data;
}


export {
  fetchItemsData,
  fetchCatergoryData,
  createItem,
  updateItem,
  fetchItem,
  deleteItem
}