import React, { useState, useContext } from "react";
import { GlobalState } from "../GlobalState";
import { v4 as uuid } from "uuid";
import trash from "../images/trash.svg";
// import _ from 'lodash';

const emptyField = () => ({ id: uuid(), categoryId: "", weight: undefined });
const initialState = [emptyField()];

const New = () => {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const createOrder = state.orderAPI.createOrder;

  const [cart, setCart] = useState(initialState);
  const [lastChanged, setLastChanged] = useState("");

  const addField = (e) => {
    e && e.preventDefault()
    if (
      cart.slice(-1)[0].categoryId !== "" ||
      cart.slice(-1)[0].weight !== undefined
    ) {
      setCart([...cart, emptyField()]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (createOrder(cart)) setCart(initialState)
  };

  const handleDelete = (id) => {
    const toSet = cart.filter((item) => item.id !== id);
    setCart(toSet.length !== 0 ? toSet : initialState);
  };

  const handleChange = (id, change) => {
    setLastChanged(id)
    setCart(
      cart.map((item) => {
        if (item.id === id) return { ...item, ...change };
        return item;
      })
    );
  };

  const InputGroup = () => {
    const selectedCategories = cart.map((item) => item.categoryId);
    const availableCategories = categories.filter(
      (item) => !selectedCategories.includes(item._id)
    );
    console.log("Available", availableCategories)

    return (
      <>
        {cart.map(({ id, categoryId, weight }) => {
          return (
            <div className="input w-full flex justify-between" key={id}>
              <select
                value={categoryId}
                onChange={(e) => {
                  handleChange(id, { categoryId: e.target.value });
                }}
                required
              >
                <option
                  value=""
                  className="text-gray-500 opacity-40"
                  disabled
                  hidden
                >
                  Select Category
                </option>
                {categories.map(({ _id: catId, name }) => (
                  <option key={catId} value={catId}>
                    {name}
                  </option>
                ))}
              </select>
              <div className="flex flex-row justify-between">
                <label htmlFor="weight">Weight</label>
                <input
                  type="number"
                  id="weight"
                  placeholder="Kg"
                  className="inline-block w-16 ml-4 bottom-1 border-b-2 border-gray-400"
                  step="0.1"
                  min="0"
                  pattern="\d*"
                  value={weight}
                  onChange={(e) => handleChange(id, { weight: e.target.value })}
                  autoFocus={id === lastChanged ? true : undefined}
                  required
                />
                <div
                  className="cursor-pointer"
                  onClick={() => handleDelete(id)}
                >
                  <img
                    src={trash}
                    alt="Delete"
                    className="h-6 inline-block ml-4"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="order">
      <form className="form max-w-xl" onSubmit={handleSubmit}>
        <div className="flex justify-between w-full">
          <h1 className="h1">New Order</h1>
          <button
            className="bg-black text-white text-3xl w-10 rounded-full hover:bg-gray-700 transition ease-in-out cursor-pointer"
            onClick={addField}
          >
            +
          </button>
        </div>
        <InputGroup />
        <button className="btn">Confirm Order</button>
      </form>
    </div>
  );
};

export default New;
