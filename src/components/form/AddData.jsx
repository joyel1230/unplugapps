import React, { useState } from "react";
import { rate } from "../../const/rate";
import {
  buttonStyles,
  contentStyles,
  headingStyles,
  inputStyles,
} from "./style";
import { postSale } from "../../api/apiCall";
import { validatedData } from "../../hooks/validate";

const AddData = ({ show, invoice, items }) => {
  const [itemCount, setItemCount] = useState([1]);
  const timestamp = Date.now();
  const currentDate = new Date(timestamp);
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedQty, setSelectedQty] = useState([1]);
  const [description, setDescription] = useState([]);
  const [status, setStatus] = useState("A");
  const [company, setCompany] = useState([]);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);

  const handleItemList = (key) => {
    if (key === "+") {
      selectedQty.push(1);
      setSelectedQty([...selectedQty]);
      setItemCount([...itemCount, 1]);
    } else if (itemCount.length > 1) {
      itemCount.pop();
      setItemCount([...itemCount]);
    }
    handleTotal();
  };
  const handleSelectedItem = (e, i) => {
    selectedItem[i] = e.target.value;
    setSelectedItem([...selectedItem]);
    handleTotal();
  };
  const handleSelectedQty = (e, i) => {
    selectedQty[i] = +e.target.value;
    setSelectedQty([...selectedQty]);
    handleTotal();
  };
  const handleDescription = (e, i) => {
    description[i] = e.target.value.trim();
    setDescription([...description]);
    handleTotal();
    setError("");
  };
  const handleTotal = () => {
    const itemsRate = rate;
    let sum = 0;
    for (let i = 0; i < itemCount.length; i++) {
      sum += itemsRate[selectedItem[i]] * (selectedQty[i] || 1);
    }
    if (!isNaN(sum)) {
      setTotal(sum);
    } else {
      setTotal(0);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = validatedData(
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
    );
    console.log(data)
    try {
      const res = await postSale(data);
      show(false);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div
        className="fixed bg-black opacity-70 top-0 left-0 right-0 bottom-0 z-10"
        onClick={() => show(false)}
      ></div>

      <div
        style={contentStyles}
        className="hide-bar w-[25rem] h-[35rem] hide-scrollbar overflow-y-auto bg-black bg-opacity-90 fixed top-[50%] left-[50%] right-[auto] bottom-[auto] -mr-[50%] transform translate-x-[-50%] translate-y-[-50%]  z-20 border-2"
      >
        <span className="cursor-pointer" onClick={() => show(false)}>
          BACK
        </span>

        <h2
          style={headingStyles}
          className="text-lg text-center font-semibold font-sans"
        >
          New Sale
        </h2>
        <form className="my-5" onSubmit={handleSubmit}>
          <div className="flex gap-14 mb-4">
            <input
              type="text"
              value={`No. ${invoice}`}
              style={inputStyles}
              disabled
              id="invoice-no"
              className=" mb-3 bg-transparent px-4 py-2 hide-scrollbar border text-white border-gray-300 rounded-md focus:outline-none"
            />
            <input
              type="text"
              value={`${year}-${month}-${day}`}
              disabled
              style={inputStyles}
              className=" mb-3 bg-transparent px-4 py-2 hide-scrollbar border text-white border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="company name"
              style={inputStyles}
              required
              onChange={(e) => {
                setCompany(e.target.value.trim());
                setError("");
              }}
              className=" mb-3 bg-transparent px-4 py-2 hide-scrollbar border text-white border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <h1 className="text-center mb-3">ITEMS</h1>
          {itemCount.map((item, i) => {
            return (
              <div className="items-div" key={i}>
                <p>{i + 1}.</p>
                <div className="flex">
                  <select
                    style={inputStyles}
                    className="mb-3 bg-black px-4 py-2 hide-scrollbar border text-white border-gray-300 rounded-md focus:outline-none"
                    id="select-item"
                    required
                    value={selectedItem[i]}
                    onChange={(e) => handleSelectedItem(e, i)}
                  >
                    <option value="">select item</option>
                    {items.map((item) => (
                      <option key={item?.item_name} value={item?.item_code}>
                        {item?.item_name}
                      </option>
                    ))}
                  </select>
                  <select
                    className="mb-3 ml-2 bg-black px-4 py-2 hide-scrollbar border text-white border-gray-300 rounded-md focus:outline-none"
                    id="select-qty"
                    required
                    value={selectedQty[i] || 1}
                    onChange={(e) => handleSelectedQty(e, i)}
                  >
                    {Array(5)
                      .fill("1")
                      .map((q, i) => (
                        <option key={i}>{i + 1}</option>
                      ))}
                  </select>
                </div>
                <input
                  type="text"
                  style={inputStyles}
                  placeholder="description"
                  required
                  value={description[i]}
                  onChange={(e) => handleDescription(e, i)}
                  className=" mb-3 bg-transparent px-4 py-2 hide-scrollbar border text-white border-gray-300 rounded-md focus:outline-none"
                />
              </div>
            );
          })}
          <div className="flex justify-center gap-3">
            <div
              className="flex justify-center"
              onClick={() => handleItemList("-")}
            >
              <span className="text-2xl border h-8 rounded-full border-white w-8 justify-center cursor-pointer flex items-center">
                -
              </span>
            </div>
            <div
              className="flex justify-center"
              onClick={() => handleItemList("+")}
            >
              <span className="text-2xl border h-8 rounded-full border-white w-8 justify-center cursor-pointer flex items-center">
                +
              </span>
            </div>
          </div>
          <div className="flex gap-5 mt-10">
            <input
              type="text"
              style={inputStyles}
              disabled
              value={total}
              className=" mb-3 bg-transparent px-4 py-2 hide-scrollbar border text-white border-gray-300 rounded-md focus:outline-none"
            />
            <select
              style={inputStyles}
              className="mb-3  bg-black px-4 py-2 hide-scrollbar border text-white border-gray-300 rounded-md focus:outline-none"
              defaultValue=""
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="A">Active</option>
              <option value="I">Inactive</option>
            </select>
          </div>
          <span className="text-red-500 text-sm">{error}</span>
          <div
            style={{ justifyContent: "flex-end" }}
            className="flex justify-end"
          >
            <button
              type="submit"
              style={buttonStyles}
              className="bg-transparent text-white border  rounded-md focus:outline-none"
            >
              save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddData;
