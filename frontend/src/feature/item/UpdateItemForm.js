import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Option from "../../ui/Option";
import { imageTypeAccepted } from "../../utlis/constraint";
import Button from "../../ui/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFetchCatergory from "../../hook/useFetchCatergory";
import { fetchItem, fetchItemsData, updateItem } from "../../services/api-items";

function UpdateUserForm({ onclick, updateData, pageNum }) {
  const [searchParams] = useSearchParams();
  const itemId = parseInt(searchParams.get("item-selected"));
  const catergory = useFetchCatergory();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      let itemInfor = await fetchItem(itemId);
      return {
        foodName: itemInfor.foodName,
        foodPrice: itemInfor.foodPrice,
        foodDesc: itemInfor.foodDesc,
        foodImage: "",
        catergory: itemInfor.catergoryId,
        oldImage: itemInfor.foodImage,
      }
    }
  });

  function handleOnSubmit(data) {
    const {
      foodName,
      foodPrice,
      foodDesc,
      foodImage,
      catergory,
      oldImage
    } = data;
    let updateProcess;
    if (!foodImage) {
      const item = {
        id: itemId,
        foodName,
        foodPrice,
        foodDesc,
        foodImage: "",
        catergoryId: parseInt(catergory),
        oldImage
      }
      updateProcess = updateItem(item);
    } else {
      if (imageTypeAccepted.includes(foodImage[0].type)) {
        if (foodImage[0].size > 10000 && foodImage[0].size < 1000000) {
          const item = {
            id: itemId,
            foodName,
            foodPrice: parseInt(foodPrice),
            foodDesc,
            foodImage: foodImage[0],
            catergoryId: parseInt(catergory),
          }
          updateProcess = updateItem(item);
        } else {
          setError("foodImage", { type: "custom", message: "Dung lượng phải ít hơn 100Kb" })
          return;
        }
      } else {
        setError("foodImage", { type: "custom", message: "Định dạng ảnh jpeg, png" })
        return
      }
    }
    updateProcess.then(result => {
      if (result.errCode === 0) { 
        onclick();
        let request = fetchItemsData(pageNum);
        request.then(data => {
          navigate(`?pageNum=${pageNum}`)
          updateData(data)
        });
      };
      if (result.errCode === 1) console.log(result.errMessage);
    })
  }

  return (
    <div id="formContainer" className="absolute top-[0] left-[0] z-[1000] w-full h-[100vh] backdrop-blur-sm" >
      <form onSubmit={handleSubmit(handleOnSubmit)} className=" w-[600px] rounded-md shadow-lg z-[9999] border-violet-500 border-2 bg-white absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] box-border px-6 py-11">
        <Input type="text" name="foodName" register={{
          ...register("foodName", {
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
          label="Món ăn"
          placeholder="Nhập tên món ăn"
          width="w-full"
        />

        <Input type="text" name="foodPrice" register={{
          ...register("foodPrice", {
            required: "Không được để trống", minLength: {
              value: 4,
              message: "Gía trị nhỏ nhất 1000"
            }, maxLength: {
              value: 7,
              message: "Giá trị lớn nhất 100000"
            }, pattern: {
              value: /^[0-9]+$/,
              message: "Không được nhập chữ"
            }
          })
        }}
          errorMessage={errors}
          label="Giá sản phẩm"
          placeholder="35000"
          width="w-full"
        />

        <Input type="text" name="foodDesc" register={{
          ...register("foodDesc", {
            required: "Không được để trống",
            minLength: {
              value: 4,
              message: "Tối thiểu từ 4 đến 50 ký tự"
            },
            maxLength: {
              value: 50,
              message: "Tối thiểu từ 4 đến 50 ký tự"
            }
          })
        }}
          errorMessage={errors}
          label="Mô tả món ăn"
          placeholder="Món ăn được chế biến theo hương vị ẩm thực của người Việt"
          width="w-full"
        />

        <Input type="file" name="foodImage" register={{
          ...register("foodImage")
        }}
          errorMessage={errors}
          width="w-full"
        />
        <Input type="hidden" name="oldImage" register={{
          ...register("oldImage")
        }}
        />

        <Select name="catergory" register={{ ...register("catergory", { required: "Chưa chọn danh mục" }) }} type="customStyle1" width="w-1/2" errorMessage={errors}>
          <Option value="">Danh mục món ăn</Option>
          {catergory.map(x => <Option value={x.id} key={x.id}>{x.catergoryName}</Option>)}
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
