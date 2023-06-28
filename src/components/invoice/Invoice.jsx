import React, { useRef } from "react";
import { useSelector } from "react-redux";
import ReactToPrint from "react-to-print";

const Invoice = ({ show, data }) => {
  const details = useSelector((state) => state?.detail?.detailData);
  const detailTable = details.filter((item) => item?.vr_no === data.vr_no);
  const tableRef = useRef();
  return (
    <>
      <span
        className="cursor-pointer px-5 py-2 m-5 rounded-lg top-20 bg-black"
        onClick={() => show(false)}
      >
        Back
      </span>
      <div
        className="text-black flex justify-center font-semibold text-xl m-10"
        ref={tableRef}
      >
        <div className="w-full">
          <h1 className="text-2xl mb-5 text-right">#INVOICE</h1>
          <div className="flex justify-between">
            <div className="border rounded-lg w-56 flex items-center p-3 ">
              <span>Vr No : {data.vr_no}</span>
            </div>
            <div className="border rounded-lg w-[15rem] flex items-center p-3 ">
              <span>Vr Date : {data.vr_date.slice(0, 10)}</span>
            </div>
            <div className="border rounded-lg w-56 flex items-center p-3 ">
              <span>Status : {data.status}</span>
            </div>
          </div>
          <div className="mt-10 flex justify-between">
            <div className="border-2 rounded-lg w-full flex items-center p-3 ">
              <span>Ac Name : {data.ac_name}</span>
            </div>
            <div className="border-2 rounded-lg w-[20rem] ml-5 flex items-center p-3 ">
              <span>Ac Amt : {data.ac_amt}</span>
            </div>
          </div>
          <div className="border rounded-lg my-5 overflow-x-auto hide-scrollbar table-div">
            <table className="table-auto w-full overflow-hidden">
              <thead>
                <tr className="text-xl">
                  <th className="py-4 px-4 border-b">sr_no</th>
                  <th className="py-4 px-4 border-b">item_code</th>
                  <th className="py-4 px-4 border-b">item_name</th>
                  <th className="py-4 px-4 border-b">description</th>
                  <th className="py-4 px-4 border-b">qty</th>
                  <th className="py-4 px-4 border-b">rate</th>
                  <th className="py-4 px-4 border-b">total</th>
                </tr>
              </thead>
              <tbody>
                {detailTable.map((sale, i) => (
                  <tr key={i} className=" text-center">
                    <td className="py-4 px-4 w-5">{sale.sr_no}</td>
                    <td className="py-4 px-4 w-10">{sale.item_code}</td>
                    <td className="py-4 px-4 ">{sale.item_name}</td>
                    <td className="py-4 px-4 ">{sale.description}</td>
                    <td className="py-4 px-4 w-10">{sale.qty}</td>
                    <td className="py-4 px-4 w-10">{sale.rate}</td>
                    <td className="py-4 px-4 w-10">{sale.rate * sale.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ReactToPrint
        trigger={() => (
          <div className="flex justify-center w-full text-white mb-20 mt-10">
            <button
              className="cursor-pointer px-5 py-2 rounded-lg bg-black"
              type="button"
            >
              Print
            </button>
          </div>
        )}
        content={() => tableRef.current}
        documentTitle="newOne"
        pageStyle={`@page { size: landscape; } @media print { body { transform: rotate(0deg); } }`}
      />
    </>
  );
};

export default Invoice;
