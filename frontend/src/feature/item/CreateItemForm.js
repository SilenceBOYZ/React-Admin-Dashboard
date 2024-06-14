import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import Option from "../../ui/Option";
import { useForm } from "react-hook-form"
import { imageTypeAccepted } from "../../utlis/constraint";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItem, fetchCatergoryData, fetchItemsData } from "../../services/api-items";


function CreateItemForm({ onClick, updateData, pageNum }) {
  const [catergory, setCatergory] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()


  useEffect(() => {
    async function getData() {
      let requestCatergoryData = await fetchCatergoryData();
      setCatergory(requestCatergoryData.dataSelected);
    }
    getData();
  }, [onClick]);


  function onSubmit(data) {
    const { foodName, foodPrice, foodDesc, foodImage, catergory } = data;
    const newItem = {
      foodName,
      foodPrice: parseInt(foodPrice),
      foodDesc,
      foodImage: foodImage[0],
      catergoryId: parseInt(catergory),
    };
    createItem(newItem).then(result => {
      if (result.errCode === 0) {
        let request = fetchItemsData(pageNum);
        request.then(data => {
          onClick();
          navigate(`?pageNum=${pageNum}`)
          updateData(data)
        });
      }
    })
  }

  return (
    <div id="formContainer" className="absolute top-[0] left-[0] z-[1000] w-full h-[100vh] backdrop-blur-sm" >
      <form onSubmit={handleSubmit(onSubmit)} className=" w-[600px] rounded-md shadow-lg z-[9999] border-violet-500 border-2 bg-white absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] box-border px-6 py-11">
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
          ...register("foodImage", {
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

        <Select name="catergory" register={{ ...register("catergory", { required: "Chưa chọn danh mục" }) }} type="customStyle1" width="w-1/2" errorMessage={errors}>
          <Option value="">Danh mục món ăn</Option>
          {catergory.map(x => <Option value={x.id} key={x.id}>{x.catergoryName}</Option>)}
        </Select>

        <div className="flex justify-end gap-2 items-center">
          <Button onclick={onClick} type="button" variation="danger">Hủy bỏ</Button>
          <Button type="submit" variation="primary">Thêm</Button>
        </div>
      </form>
    </div>
  )
}

export default CreateItemForm
