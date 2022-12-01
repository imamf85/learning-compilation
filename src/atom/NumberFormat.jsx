export const NumberFormat = (number) => {
  return new Intl.NumberFormat("id-ID", {
    currency: "IDR",
  }).format(number);
};
