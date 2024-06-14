import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Authencation";
import { login } from "../../services/api-auth";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Input from "../../ui/Input"
import { useForm } from "react-hook-form"
import { HiArrowLongRight } from "react-icons/hi2";

function LoginForm() {
  let { handleSetToken } = useAuth();
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    let res = await login(data);
    if (res.errCode === 1) {
      setError("email", {
        type: "custom",
        message: res.errMessage
      })
    }
    if (res.errCode === 2) {
      setError("password", {
        type: "custom",
        message: res.errMessage
      })
    }
    if (res.errCode === 0) {
      let { token } = res;
      handleSetToken(token);
      navigate("admin/dashboard");
    }
  }

  return (
    <div className="w-full h-dvh relative">
      <div className="absolute left-[50%] -translate-x-[50%] top-[50%] -translate-y-[80%] max-w-[40rem] box-border">
        <div className="pt-4 text-center flex flex-col items-center space-y-4 mb-5">
          <div className="w-24 h-24 rounded-full border-2 overflow-hidden border-violet-400 ">
            <img className="w-[100%] p-2" src="http://localhost:8080/img/Pizza.png" alt="logo" />
          </div>
          <Heading type="h3" color="primary">LOGIN TO YOUR ACCOUNT</Heading>
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
                message: "Mật khẩu từ 8 đến 12 ký tự"
              }, maxLength: {
                value: 12,
                message: "Mật khẩu từ 8 đến 12 ký tự"
              }
            })
          }}
            errorMessage={errors}
            label="Mật khẩu "
            placeholder="Mật khẩu"
            width="w-full"
          />
          <Button type="submit" position="flex w-full justify-center text-md" variation="primary">ĐĂNG NHẬP</Button>
          <div className="flex justify-end mt-3 items-center gap-1 pe-1"><Button type="link" to="/signup"> <span className="text-violet-600 ">Sign up </span></Button><HiArrowLongRight className="text-violet-700" size={18} /></div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
