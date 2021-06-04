import { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import axios from "../axios";

const CategoriesAPI = (token) => {
  const { addToast } = useToasts();
  const [categories, setCategories] = useState([]);
  const [refreshCategoriesVar, setRefreshCategoriesVar] = useState(false);

  useEffect(() => {
    // First time fetch
    const getCategories = () => {
      axios
        .get("/categories")
        .then((res) => {
          setCategories(res.data);
        })
        .catch((err) => {
          addToast(
            `Error ${err.response.status}: ${
              err.response.data.message || err.response.statusText
            }`,
            { appearance: "error" }
          );
        });
    };

    getCategories();
  }, [addToast, refreshCategoriesVar]);

  const refreshCategories = () =>
    setRefreshCategoriesVar(!refreshCategoriesVar);

  const createCategory = ({ data }) => {
    axios
      .post(
        "/categories",
        data,
        {
          headers: { Authorization: token },
          withCredentials: true
        }
      )
      .then(() => {
        refreshCategories()
        return true
      })
      .catch((err) =>
        addToast(
          `Error ${err.response.status}: ${
            err.response.data.message || err.response.statusText
          }`,
          { appearance: "error" }
        )
      );
  };

  return {
    categories: [categories, setCategories],
    createCategory
  };
};

export default CategoriesAPI;
