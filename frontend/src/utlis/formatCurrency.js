function formatCurrency(number) {
  return new Intl.NumberFormat("vi", {
    currency: "VND",
    style: "currency",
  }).format(Number.parseFloat(number));
}

export default formatCurrency
