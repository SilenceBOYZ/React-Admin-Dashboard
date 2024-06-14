import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button"
import Heading from "../../ui/Heading"
import Input from "../../ui/Input"
import { useForm } from "react-hook-form";
import { signup } from "../../services/api-auth";
import { HiArrowLongRight } from "react-icons/hi2";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import Toast from "../../ui/Toast";
import { useState } from "react";


function SignUpForm() {
  const [popup, setPopup] = useState(false);

  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm();


  async function onSubmit(data) {
    let { email, password } = data;
    let res = await signup({ email, password });
    if (res.errCode === 1) {
      setError("email", { type: "custom", message: "Email đã tồn tại" })
    }
    if (res.errCode === 0) {
      setPopup(true);
      setTimeout(() => {
        navigate("/");
      }, 5000)
    }
  }

  return (
    <>
      {!popup ? null : <Toast icon={<HiOutlineCheckCircle className="text-violet-700" size={32} />} status="success" message="Bạn đã đăng ký thành công" />}
      <div className="w-full h-dvh relative">
        <div className="absolute left-[50%] -translate-x-[50%] top-[50%] -translate-y-[60%] max-w-[40rem] box-border">
          <div className="pt-4 text-center flex flex-col items-center space-y-4 mb-5">
            <div className="w-24 h-24 rounded-full border-2 overflow-hidden border-violet-400 ">
              <img className="w-[100%] p-2" src="http://localhost:8080/img/Pizza.png" alt="logo" />
            </div>
            <Heading type="h3" color="primary">SIGNUP TO YOUR ACCOUNT</Heading>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-[30rem] p-6 rounded-md border-2">
            <Input type="email" name="email" register={{
              ...register("email", {
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
              label="Email"
              placeholder="Example@gmail.com"
              width="w-full"
            />
            <Input type="password" name="password" register={{
              ...register("password", {
                required: "Không được để trống", minLength: {
                  value: 6,
                  message: "Mật khẩu từ 6 đến 12 ký tự"
                }, maxLength: {
                  value: 12,
                  message: "Mật khẩu từ 6 đến 12 ký tự"
                }, pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Mật khẩu phải có 1 số, 1 tự đặc biệt và chữ in hoa"
                }
              })
            }}
              errorMessage={errors}
              label="Mật khẩu "
              placeholder="Mật khẩu"
              width="w-full"
            />

            <Input type="password" name="passwordConfirm" register={{
              ...register("passwordConfirm", {
                required: "Không được để trống", minLength: {
                  value: 6,
                  message: "Mật khẩu từ 6 đến 12 ký tự"
                }, maxLength: {
                  value: 12,
                  message: "Mật khẩu từ 6 đến 12 ký tự"
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

            <Button type="submit" position="flex w-full justify-center text-md" variation="primary">ĐĂNG KÝ</Button>
            <div className="flex justify-end mt-3 items-center gap-1 pe-1">
              <Button type="link" to="/">
                <span className="text-violet-600 ">Already have account </span>
              </Button>
              <HiArrowLongRight className="text-violet-700" size={18} />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUpForm
