import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { fetchUser, updateUser, updateUserInfor } from "../../services/api-users";
import { useNavigate, useParams } from "react-router-dom";
import { imageTypeAccepted } from "../../utlis/constraint";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import Toast from "../../ui/Toast";
import usePopup from "../../hook/usePopup";
import { useAuth } from "../../context/Authencation";
import { useEffect, useState } from "react";
import Spinner from "../../ui/Spinner";

function UserForm() {
  const { popup, setPopup } = usePopup();
  const params = useParams();
  const userId = parseInt(params.account);
  const navigate = useNavigate();
  const { getUserData } = useAuth();
  const [userInfor, setUserInfor] = useState({});

  useEffect(() => {
    async function fetchUser() {
      let request = await getUserData();
      setUserInfor(request);
    }
    fetchUser();
  }, [getUserData])

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
        email: userInfor.email,
        oldImage: userInfor.userImage,
        userImage: "",
        address: userInfor.address,
        phoneNumber: userInfor.phoneNumber
      }
    }
  });

  function handleOnUserInforSubmit(data) {
    const { username, email, userImage, oldImage, address, phoneNumber } = data;
    let updateProcess;
    const user = {
      id: userId,
      userName: username,
      userImage: "",
      email,
      address,
      phoneNumber
    }
    if (!userImage) {
      user.oldImage = oldImage;
      updateProcess = updateUserInfor(user);
    } else {
      let imageType = userImage[0].type;
      let imageSize = userImage[0].size;
      if (imageTypeAccepted.includes(imageType)) {
        if (imageSize < 30000 && imageSize > 10000) {
          user.userImage = userImage[0];
          updateProcess = updateUserInfor(user);
        } else {
          setError("userImage", { type: "custom", message: "Dung lượng phải ít hơn 30Kb" })
          return;
        }
      } else {
        setError("userImage", { type: "custom", message: "Định dạng ảnh jpeg, png" })
        return;
      }
    }
    updateProcess.then(res => {
      if (res.errCode === 0) {
        setPopup(true);
        setTimeout(() => {
          navigate(0)
        }, 2500)
      }
    })
  }

  return (
    <>
      {!popup ? null : <Toast icon={<HiOutlineCheckCircle className="text-violet-700" size={32} />} status="success" message="Bạn đã cập nhật thành công" />}
      <div className="w-full bg-white rounded-lg p-4 box-border mb-4">
        <form onSubmit={handleSubmit(handleOnUserInforSubmit)} className="grid grid-cols-[repeat(2,_1fr)] gap-x-4" >
          <div className="w-full">
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
              disable={true}
              placeholder="Ex: example@gmail.com"
              width="w-full"
            />

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

            <Input type="text" name="address" register={{
              ...register("address", {
                required: "Không được để trống", minLength: {
                  value: 4,
                  message: "ký tự tối đa từ 4 đến 12 ký tự"
                }, maxLength: {
                  value: 100,
                  message: "ký tự tối đa  từ 4 đến 100 ký tự"
                }
              })
            }}
              errorMessage={errors}
              label="Địa chỉ"
              placeholder="Bổ sung địa chỉ"
              width="w-full"
            />

            <Input type="text" name="phoneNumber" register={{
              ...register("phoneNumber", {
                required: "Không được để trống", minLength: {
                  value: 9,
                  message: "Số điện thoại không hợp lệ"
                }, maxLength: {
                  value: 12,
                  message: "Số điện thoại không hợp lệ"
                },
                pattern: {
                  value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                  message: "Số điện thoại không hợp lệ"
                }
              })
            }}
              errorMessage={errors}
              label="Số điện thoại"
              placeholder="Bổ sung số điện thoại"
              width="w-full"
            />
          </div>

          <div className="w-full flex flex-col box-border pb-4">
            <div className="h-[80%] w-full border-2 rounded-md flex justify-center items-center relative">
              {!userInfor[0]?.userImage ? <Spinner custom={"left-[0] top-[0]"}/> :
                <div className="w-[8rem] h-[8rem] rounded-full overflow-hidden bg-slate-200">
                  <img src={`http://localhost:8080/img/uploads/userImages/${userInfor[0].userImage}`} alt="user" className="w-full " />
                </div>
              }
            </div>
            <div className="h-[20%]">
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
            </div>
          </div>

          <div className="flex justify-end gap-2 row-start-2 row-end-3 col-start-1 col-end-3">
            <Button variation="normal">Hủy</Button>
            <Button variation="primary" type="submit">Cập nhật tài khoản</Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default UserForm
