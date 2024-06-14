import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Option from "../../ui/Option";
import { imageTypeAccepted } from "../../utlis/constraint";
import Button from "../../ui/Button";
import useFetchRole from "../../hook/useFetchRole";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchUser, fetchUsersData, updateUser } from "../../services/api-users";

function UpdateUserForm({ onclick, updateData, pageNum }) {
  const [searchParams] = useSearchParams();
  const userId = parseInt(searchParams.get("user-selected"));
  const roleData = useFetchRole();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      let userInfor = await fetchUser(userId);
      return {
        username: userInfor.userName,
        password: userInfor.userPassword,
        email: userInfor.email,
        oldImage: userInfor.userImage,
        role: userInfor.roleId,
        userImage: "",
      }
    }
  });

  function handleOnSubmit(data) {
    const { username, password, email, userImage, role, oldImage } = data;
    let updatingProcess;
    if (!userImage) {
      const user = {
        id: userId,
        userName: username,
        userPassword: password,
        userImage: "",
        email,
        oldImage,
        role
      }
      updatingProcess = updateUser(user);
    } else {
      let imageType = userImage[0].type;
      let imageSize = userImage[0].size;
      if (imageTypeAccepted.includes(imageType)) {
        if (imageSize < 30000 && imageSize > 10000) {
          const user = {
            id: userId,
            userName: username,
            userPassword: password,
            email,
            userImage: userImage[0],
            role
          }
          updatingProcess = updateUser(user);
        } else {
          setError("userImage", { type: "custom", message: "Dung lượng phải ít hơn 30Kb" })
          return;
        }
      } else {
        setError("userImage", { type: "custom", message: "Định dạng ảnh jpeg, png" })
        return;
      }
    }
    updatingProcess.then(result => {
      if (result.errCode === 0) { 
        onclick();
        let request = fetchUsersData(pageNum);
        request.then(data => {
          navigate(`?pageNum=${pageNum}`)
          updateData(data)
        });
      };
      if (result.errCode === 1) setError("email", { type: 'custom', message: result.errMessage });
      if (result.errCode === 2) console.log(result.errMessage);
      if (result.errCode === 3) console.log(result.errMessage);
    })
  }

  return (
    <div id="formContainer" className="absolute top-[0] left-[0] z-[1000] w-full h-[100vh] backdrop-blur-sm" >
      <form onSubmit={handleSubmit(handleOnSubmit)} className=" w-[600px] rounded-md shadow-lg z-[9999] border-violet-500 border-2 bg-white absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] box-border px-6 py-11">
        <Input type="text" name="username" register={{
          ...register("username", {
            required: "Không được để trống", minLength: {
              value: 4,
              message: "Tên người dùng phải từ 4 đến 12 ký tự"
            }, maxLength: {
              value: 20,
              message: "Tên người dùng phải từ 7 đến 12 ký tự"
            }
          })
        }}
          errorMessage={errors}
          label="Tên người dùng"
          placeholder="Nhập tên người dùng"
          width="w-full"
        />

        <Input type="password" name="password" register={{
          ...register("password", {
            required: "Không được để trống", minLength: {
              value: 6,
              message: "Mật khẩu từ 8 đến 12 ký tự"
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&/])[A-Za-z\d@$!%*?&./]{8,}$/,
              message: "Mật khẩu phải có 1 số, 1 tự đặc biệt và chữ in hoa"
            }
          })
        }}
          errorMessage={errors}
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          width="w-full"
        />

        <Input type="text" name="email" register={{
          ...register("email", {
            required: "Không được để trống",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Địa chỉ email không hợp lệ"
            },
          })
        }}
          errorMessage={errors}
          label="Email"
          placeholder="Ex: example@gmail.com"
          width="w-full"
        />

        <Input type="file" name="userImage" register={{
          ...register("userImage")
        }}
          errorMessage={errors}

          width="w-full"
        />

        <Input type="hidden" name="oldImage" register={{
          ...register("oldImage")
        }}
        />

        <Select name="role" register={{ ...register("role", { required: "Vai trò chưa được chọn" }) }} type="customStyle1" width="w-1/2" errorMessage={errors}>
          <Option value="">Vai trò của người dùng</Option>
          {roleData.map(role => <Option value={role.id} key={role.roleName}>{role.roleName}</Option>)}
        </Select>

        <div className="flex justify-end gap-2 items-center">
          <Button type="button" onclick={onclick} variation="danger">Hủy bỏ</Button>
          <Button type="submit" variation="primary">Sửa</Button>
        </div>
      </form>
    </div>
  )
}

export default UpdateUserForm
