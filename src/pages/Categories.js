// !!!! === IMPORTANT === !!!!
// This is an Admin-Only route and should be protected from user access
// If it still gets leaked, the backend would prevent any serious action

import React, { useState, useContext } from "react";
import { GlobalState } from "../GlobalState";

const Categories = () => {
  const state = useContext(GlobalState);
  const initialState = {name: "", price: ""}
  const [newData, setNewData] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.categoriesAPI.createCategory({data: newData})) setNewData(initialState)
  };

  return (
    <div className="flex flex-row align-top justify-around w-full">
      <div className="">
        <h1 className="h1">Categories</h1>
        <ol>
          {categories.map((category) => (
            <li key={category._id}>{category.name}</li>
          ))}
        </ol>
      </div>

      {/* New Form */}
      <form onSubmit={handleSubmit} className="form max-w-md">
      <h1 className="h1">Add category</h1>
        <div className="text-left">
          <label htmlFor="name" className="label">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={newData.name}
            className="input"
            onChange={(e) => setNewData({ ...newData, name: e.target.value })}
            placeholder="Name for the category"
          />
        </div>
        <div className="text-left">
          <label htmlFor="price" className="label">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={newData.price}
            className="input"
            onChange={(e) => setNewData({ ...newData, price: e.target.value })}
            placeholder="Price in US$"
          />
        </div>
        <button className="btn">Create Category</button>
      </form>
    </div>
  );
};

export default Categories;
