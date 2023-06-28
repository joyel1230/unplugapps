import React, { useEffect, useState } from "react";
import { getDetail, getHeader, getItem } from "../../api/apiCall";
import { useDispatch } from "react-redux";
import { addHeaderData } from "../../redux/slices/headerSlice";
import { addDetailData } from "../../redux/slices/datailSlice";
import AddData from "../form/AddData";
import Invoice from "../invoice/Invoice";

const Header = () => {
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState({});
  const [item, setItem] = useState([]);
  const [show, setShow] = useState(false);
  const [invoiceData, setInvoiceData] = useState({});
  const [invoiceShow, setInvoiceShow] = useState(false);
  const [invoice, setInvoice] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const getData = async () => {
        const headerData = await getHeader();
        dispatch(addHeaderData(headerData));
        const detailData = await getDetail();
        dispatch(addDetailData(detailData));
        const itemData = await getItem();
        const result = detailData.reduce((acc, item) => {
          const { vr_no, qty, rate } = item;
          acc[vr_no] = (acc[vr_no] || 0) + qty * rate;
          return acc;
        }, {});
        setTotal(result);
        setTableData(headerData);
        setItem(itemData);
        for (let i of headerData) {
          if (i?.vr_no > invoice) {
            setInvoice(i?.vr_no + 1);
          }
        }
      };
      getData();
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, invoice, show]);

  return tableData?.length !== 0 ? (
    <>
      {invoiceShow ? (
        <Invoice  show={setInvoiceShow} data={invoiceData}/>
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <div
            className="bg-black my-5 p-3 rounded-xl cursor-pointer"
            onClick={() => setShow(true)}
          >
            Add Sale
          </div>
          {show && <AddData show={setShow} items={item} invoice={invoice} />}
          <div className="my-2 overflow-x-auto hide-scrollbar table-div w-[70%]">
            <table className="table-auto w-full my-10 overflow-hidden">
              <thead>
                <tr className="text-xl">
                  <th className="py-4 px-4 border-b">vr_no</th>
                  <th className="py-4 px-4 border-b">vr_date</th>
                  <th className="py-4 px-4 border-b">ac_name</th>
                  <th className="py-4 px-4 border-b">ac_amt</th>
                  <th className="py-4 px-4 border-b">status</th>
                  <th className="py-4 px-4 border-b"></th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((sale) => (
                  <tr key={sale.vr_no} className=" text-center">
                    <td className="py-4 px-4">{sale.vr_no}</td>
                    <td className="py-4 px-4">{sale.vr_date.slice(0, 10)}</td>
                    <td className="py-4 px-4">{sale.ac_name}</td>
                    <td className="py-4 px-4">
                      {total[sale.vr_no] || sale.ac_amt}
                    </td>
                    <td className="py-4 px-4">{sale.status}</td>
                    <td className="py-4 px-4 cursor-pointer font-semibold" onClick={()=>{setInvoiceData(sale);setInvoiceShow(true)}}>Print</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  ) : (
    <div className="flex text-black h-screen justify-center items-center">
      Loading
    </div>
  );
};

export default Header;
