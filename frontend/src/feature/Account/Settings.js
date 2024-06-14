import Heading from "../../ui/Heading"
import ViewDataLayout from "../../ui/ViewDataLayout"
import UserForm from "./UserForm";
import PasswordForm from "./PasswordForm"

function Settings() {
  return (
    <ViewDataLayout>
      <div className="pt-5 space-y-5 mb-2">
        <Heading >Cập nhật thông tin người dùng</Heading>
        <Heading type="h2" option="text-neutral-500">Cập nhật thông tin người dùng</Heading>
      </div>
      <UserForm />
      <div className="space-y-3 mb-2">
        <Heading type="h2" option="text-neutral-500">Cập nhật mật khẩu</Heading>
      </div>
      <PasswordForm />
    </ViewDataLayout>
  )
}

export default Settings
