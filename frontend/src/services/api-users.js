import instance from "../config/axios";

async function fetchUsersData(pageNum) {
  if (!pageNum) pageNum = 1;
  let data = await instance.get(`/api/users/get-all-users?pageNum=${pageNum}`)
  return data;
}

async function fetchUser(id) {
  let data = await instance.get(`/api/users/get-user?id=${id}`)
  return data.dataSelected[0];
}

async function updateUser(userClient) {
  const { id, userName, userPassword, email, userImage, role: roleId, oldImage } = userClient;
  let data = await instance.put(`/api/users/update-user?id=${id}`, {
    userName,
    userPassword,
    userImage,
    oldImage,
    email,
    roleId,
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return data;
}

async function updateUserInfor(userClient) {
  const { id } = userClient;
  const userData = userClient;
  let data = await instance.put(`/api/users/update-user-infor?id=${id}`, userData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return data;
}


async function updateUserPassword(userClient) {
  const { id } = userClient;
  const { password: userPassword } = userClient;
  let data = await instance.put(`/api/users/update-user-password?id=${id}`, { userPassword })
  return data;
}


async function fetchUsersRole() {
  let data = await instance.get('/api/users/get-all-user-role')
  return data.dataSelected;
}

async function deleteUser(id) {
  let data = await instance.delete(`/api/users/delete-user?id=${id}`);
  return data;
}

async function createUser(dataFromClient) {
  const { userName,
    userPassword,
    email,
    userImage,
    role
  } = dataFromClient;
  let data = await instance.post('/api/users/create-user', {
    userName: userName,
    userPassword,
    userEmail: email,
    userImage,
    role,
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return data;
}
export { fetchUsersData, fetchUsersRole, createUser, fetchUser, updateUser, deleteUser, updateUserInfor, updateUserPassword }