export const validatedData = (
  itemCount,
  description,
  company,
  setError,
  items,
  invoice,
  selectedQty,
  selectedItem,
  rate,
  total,
  status
) => {
  for (let i = 0; i < itemCount.length; i++) {
    if (description === "" || company === "") {
      setError("Please fill all fields...");
      return;
    }
  }
  let detail_table = [];
  for (let i = 0; i < itemCount.length; i++) {
    const single = items.filter((item) => item.item_code === selectedItem[i]);
    detail_table.push({
      vr_no: invoice,
      sr_no: i + 1,
      item_code: single[0].item_code,
      item_name: single[0].item_name,
      description: description[i],
      qty: selectedQty[i],
      rate: rate[selectedItem[i]],
    });
  }
  let header_table = {
    vr_no: invoice,
    vr_date: new Date(),
    ac_name: company,
    ac_amt: total,
    status: status,
  };
  return { header_table: header_table, detail_table: detail_table };
};
