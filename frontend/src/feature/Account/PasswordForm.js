import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useParams } from "react-router-dom";
import { updateUserPassword } from "../../services/api-users";
import usePopup from "../../hook/usePopup";
import Toast from "../../ui/Toast";
import { HiOutlineCheckCircle, HiOutlineMinusCircle } from "react-icons/hi2";

function PasswordForm() {
  const params = useParams();
  const userId = parseInt(params.account);
  const { popup, setPopup, message, setMessage, errCode, setErrcode } = usePopup();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  function handlePasswordChange(data) {
    const { password } = data;
    const user = {
      id: userId,
      password
    }
    updateUserPassword(user).then(res => {
      if (res.errCode === 0) {
        reset();
        setPopup(true)
        setMessage(res.errMessage);
        setErrcode(true)
        setTimeout(() => {
          setPopup(false)
        }, 2500)
      }
      if (res.errCode === 1) {
        setPopup(true)
        setMessage(res.errMessage);
        setErrcode(false)
        setTimeout(() => {
          setPopup(false)
        }, 2500)
      }
    })
  }

  return (
    <>
      {!popup ? null :
        <Toast
          icon={errCode ?
            <HiOutlineCheckCircle className="text-violet-700" size={32} /> :
            <HiOutlineMinusCircle className="text-red-600" size={32} />}
          status={`${errCode ? "success" : "failed"}`} message={message}
        />}

      <div className="w-full bg-white rounded-lg p-4 box-border mb-4">
        <form onSubmit={handleSubmit(handlePasswordChange)} className="space-y-4">
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
            width="w-1/2"
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
            width="w-1/2"
          />


          <div className="flex justify-end gap-2 ">
            <Button variation="normal">Hủy</Button>
            <Button variation="primary" type="submit">Cập nhật mật khẩu</Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default PasswordForm
