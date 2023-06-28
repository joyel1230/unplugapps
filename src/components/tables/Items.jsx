import React, { useEffect, useState } from "react";
import { getItem } from "../../api/apiCall";

const Item = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    try {
      const getData = async () => {
        const itemData = await getItem();
        setTableData(itemData);
      };
      getData();
    } catch (error) {
      console.error(error);
    }
  }, []);
  return tableData?.length !== 0 ? (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="my-2 overflow-x-auto hide-scrollbar table-div w-[60%]">
        <table className="table-auto w-full my-10 overflow-hidden">
          <thead>
            <tr className="text-xl">
              <th className="py-4 px-4 border-b">item_code</th>
              <th className="py-4 px-4 border-b">item_name</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((sale, i) => (
              <tr key={i} className=" text-center">
                <td className="py-4 px-4 border-b">{sale.item_code}</td>
                <td className="py-4 px-4 border-b">{sale.item_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div className="flex text-black h-screen justify-center items-center">
      Loading
    </div>
  );
};

export default Item;
