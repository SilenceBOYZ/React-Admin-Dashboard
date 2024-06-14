import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import Option from "../../ui/Option";
import { useForm } from "react-hook-form"
import { imageTypeAccepted } from "../../utlis/constraint";
import { createUser, fetchUsersData, fetchUsersRole } from "../../services/api-users";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


function CreateUserForm({ onClick, updateData, pageNum }) {
  const [roleData, setRoleData] = useState([]);
  const form = useRef(null);
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "Admin@123",
      passwordConfirm: "Admin@123"
    }
  })

  useEffect(() => {
    async function getData() {
      let fetchRoleUsers = await fetchUsersRole();
      setRoleData(fetchRoleUsers);
    }
    getData();
  }, [form, onClick]);


  function onSubmit(data) {
    const { username, password, email, userImage, role } = data;
    const newUser = {
      userName: username,
      userPassword: password,
      email,
      userImage: userImage[0],
      role: parseInt(role),
    };
    createUser(newUser).then(result => {
      if (result.errCode === 0) {
        let request = fetchUsersData(pageNum);
        request.then(data => {
          onClick();
          navigate(`?pageNum=${pageNum}`)
          updateData(data)
        });
      }
      if (result.errCode === 1) setError("email", { type: "custom", message: "Email đã được đăng ký, vui lòng nhập email khác" });
    })
  }

  return (
    <div id="formContainer" className="absolute top-[0] left-[0] z-[1000] w-full h-[100vh] backdrop-blur-sm" >
      <form onSubmit={handleSubmit(onSubmit)} ref={form} className=" w-[600px] rounded-md shadow-lg z-[9999] border-violet-500 border-2 bg-white absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] box-border px-6 py-11">
        <Input type="text" name="username" register={{
          ...register("username", {
            required: "Không được để trống", minLength: {
              value: 4,
              message: "Tên người dùng phải từ 4 đến 12 ký tự"
            }, maxLength: {
              value: 30,
              message: "Tên người dùng phải từ 4 đến 30 ký tự"
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
            }, maxLength: {
              value: 12,
              message: "Mật khẩu từ 8 đến 12 ký tự"
            }, pattern: {
              value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: "Mật khẩu phải có 1 số, 1 tự đặc biệt và chữ in hoa"
            }
          })
        }}
          errorMessage={errors}
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          width="w-full"
        />

        <Input type="password" name="passwordConfirm" register={{
          ...register("passwordConfirm", {
            required: "Không được để trống", minLength: {
              value: 6,
              message: "Mật khẩu từ 8 đến 12 ký tự"
            }, maxLength: {
              value: 12,
              message: "Mật khẩu từ 8 đến 12 ký tự"
            }, pattern: {
              value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: "Mật khẩu phải có 1 số, 1 tự đặc biệt và chữ in hoa"
            }, validate: (fieldValue) => {
              return fieldValue === getValues()?.password ? null : "Mật khẩu không trùng khớp"
            }
          })
        }}
          errorMessage={errors}
          label="Mật khẩu xác nhận"
          placeholder="Xác nhận lại mật khẩu"
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
          ...register("userImage", {
            required: "Không được để trống",
            validate: {
              acceptedFileExtension: (fieldValue) => {
                return imageTypeAccepted.includes(
                  fieldValue[0]?.type
                ) || `Định dạng ảnh jpeg, png`
              },
              lessThan10MB: (fieldValue) => {
                return fieldValue[0]?.size < 100000 || "Dung lượng ảnh tối đa là 100kb"
              },
            }
          })
        }}
          errorMessage={errors}
          width="w-full"
        />

        <Select name="role" register={{ ...register("role", { required: "Vai trò chưa được chọn" }) }} type="customStyle1" width="w-1/2" errorMessage={errors}>
          <Option value="">Vai trò của người dùng</Option>
          {roleData.map(role => <Option value={role.id} key={role.roleName}>{role.roleName}</Option>)}
        </Select>

        <div className="flex justify-end gap-2 items-center">
          <Button onclick={onClick} type="button" variation="danger">Hủy bỏ</Button>
          <Button type="submit" variation="primary">Thêm</Button>
        </div>
      </form>
    </div>
  )
}

export default CreateUserForm
