import Button from "./Button"

function Pagination({ start = 1, end = 5, totalRecord = 30, prevPage, nextPage, endingLink }) {
  return (
    <div className="bg-white w-full h-14 rounded-md shadow-md flex items-center px-4 justify-between">
      <h4 className="font-medium text-neutral-500">Kết quả tìm kiếm từ {start} đến {end} trên tổng {totalRecord}</h4>
      <div className="flex gap-2">
        {prevPage === 1 ? null : <Button type="link" variation="link" to={`?pageNum=${prevPage - 1}`}>Trước</Button>}
        {nextPage < endingLink ?  <Button type="link" variation="link" to={`?pageNum=${nextPage + 1}`}>Sau</Button> : null}
      </div>
    </div>
  )
}

export default Pagination
