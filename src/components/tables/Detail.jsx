import React, { useEffect, useRef, useState } from "react";
import { getDetail } from "../../api/apiCall";

const Detail = () => {
  const [tableData, setTableData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const searchValue = useRef();
  useEffect(() => {
    try {
      const getData = async () => {
        const detailData = await getDetail();
        setTableData(detailData);
        setSearchData(detailData);
      };
      getData();
    } catch (error) {
      console.error(error);
    }
  }, []);
  const handleSearch = (e) => {
    const search = e.target.value.trim();
    const finalData = tableData.filter((data) => {
      return data?.vr_no === Number(search);
    });
    if (finalData.length === 0) {
      setSearchData(tableData);
    } else {
      setSearchData(finalData);
    }
  };
  return searchData?.length !== 0 ? (
    <div className="w-full flex flex-col justify-center items-center">
      <input
        type="text"
        className="border w-[12rem] mt-10 mb-5 text-black border-gray-300 rounded-md py-2 px-4"
        placeholder="Search by voucher"
        ref={searchValue}
        onChange={(e) => handleSearch(e)}
      />
      <div className="my-2 overflow-x-auto hide-scrollbar table-div w-[70%]">
        <table className="table-auto w-full overflow-hidden">
          <thead>
            <tr className="text-xl">
              <th className="py-4 px-4 border-b">vr_no</th>
              <th className="py-4 px-4 border-b">sr_no</th>
              <th className="py-4 px-4 border-b">item_code</th>
              <th className="py-4 px-4 border-b">item_name</th>
              <th className="py-4 px-4 border-b">description</th>
              <th className="py-4 px-4 border-b">qty</th>
              <th className="py-4 px-4 border-b">rate</th>
            </tr>
          </thead>
          <tbody>
            {searchData.map((sale, i) => (
              <tr key={i} className=" text-center">
                <td className="py-4 px-4 ">{sale.vr_no}</td>
                <td className="py-4 px-4 ">{sale.sr_no}</td>
                <td className="py-4 px-4 ">{sale.item_code}</td>
                <td className="py-4 px-4 ">{sale.item_name}</td>
                <td className="py-4 px-4 ">{sale.description}</td>
                <td className="py-4 px-4 ">{sale.qty}</td>
                <td className="py-4 px-4 ">{sale.rate}</td>
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

export default Detail;
