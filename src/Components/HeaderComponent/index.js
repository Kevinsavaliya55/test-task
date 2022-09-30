import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProductData } from "../../Actions/dashboardAction";
import { FileUploader } from "react-drag-drop-files";

let productAll;
const fileTypes = ["JPG", "PNG"];
const HeaderComponent = () => {
  let products = useSelector((state) => state?.dashboardReducer?.product?.data);
  if (!productAll) {
    productAll = products;
  }
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [name, setName] = useState(null);
  const [category, setCategory] = useState("Burger");
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(false);
  const [description, setDescription] = useState(null);
  const [openModel, setOpenModel] = useState(false);

  const searchItem = (val) => {
    let filteredData = { data: productAll };
    if (val) {
      let data = productAll?.map((item) => {
        const products = item?.products?.filter((v) => {
          return (v?.title?.toLowerCase()?.startsWith(val)||v?.description?.toLowerCase()?.startsWith(val));
        });

        if (products?.length) {
          return {
            category_title: item?.category_title,
            products: products,
          };
        }
      });
      filteredData = { data: data };
    }

    dispatch(updateProductData(filteredData));
  };
  const handleChange = async (file) => {
    let reader = new FileReader();
    await reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFile(reader.result);
    };
  };
  const setCategoryitem = (val) => {
    setCategory(val);
  };
  const insertItem = async () => {
    if (!file || !name || !price || !category || !description) {
      setError(true);
      return;
    }
    productAll?.map((items) => {
      if (items?.category_title === category) {
        let insertDate = {
          id: items?.products[items?.products?.length - 1]?.id + 1,
          title: name,
          price: price,
          description: description,
          picture: file,
        };
        let finalData = items?.products;
        finalData.push(insertDate);
        return finalData;
      }
    });

    setOpenModel(false);
    dispatch(updateProductData({ data: productAll }));
   
    return true;
  };
  const insertName = (val) => {
    setName(val);
  };
  const insertDescription = (val) => {
    setDescription(val);
  };
  const insertPrice = (val) => {
    setPrice(val);
  };
  return (
    <>
      <div className="header">
        <h1>Test Task</h1>
        <div className="search">
          <input
            onChange={(e) => {
              searchItem(e.target.value);
            }}
            className="form-control"
            id="choices-text-preset-values"
            type="text"
            placeholder="Search items with titles or descriptions ..."
          />{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#657789"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-search"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <div></div>
          <button
            className="insert"
            type="button"
            data-toggle="modal"
            data-target="#insertproduct"
            onClick={() => {
              setOpenModel(true);
              setFile(null);
              setName(null);
              setCategory("Burger") ;
              setPrice(null);
              setError(false);
              setDescription(null);
            }}
          >
            Insert Product
          </button>
        </div>

        <div
          className="modal fade"
          id="insertproduct"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="insertproducts"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="insertproducts">
                  Add Product
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <div>
                  <div className="d-flex">
                    <span className="mr-1 mb-4">Select Catagory: </span>
                    <div>
                      <select
                        id="Catagory"
                        name="Catagory"
                        title="Catagory"
                        className="catagory_select"
                        onChange={(e) => setCategoryitem(e.target.value)}
                      >
                        {productAll?.map((item) => {
                          return (
                            <option
                              key={item?.category_title}
                              value={item?.category_title}
                            >
                              {item?.category_title}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <br />
                    {error && !category && (
                      <span className="small pl-2" style={{ color: "red" }}>
                        *Please select category
                      </span>
                    )}
                  </div>
                  <div className="d-flex">
                    <span className="mr-2 mb-4">Product Name: </span>
                    <div>
                      <input
                        className="form-control name_catagory"
                        id="name_catagory"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => insertName(e.target.value)}
                      />
                    </div>
                    {error && !name && (
                      <span className="small pl-2" style={{ color: "red" }}>
                        *Please insert name
                      </span>
                    )}
                  </div>
                  <div className="d-flex">
                    <span className="mr-4 pr-1 mb-4">Description: </span>
                    <div>
                      <input
                        className="form-control name_catagory"
                        id="name_catagory"
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => insertDescription(e.target.value)}
                      />
                    </div>
                    {error && !description && (
                      <span className="small pl-2" style={{ color: "red" }}>
                        *Please insert description
                      </span>
                    )}
                  </div>
                  <div className="d-flex">
                    <span className="mr-3 mb-4">Product Price: </span>
                    <div>
                      <input
                        className="form-control name_catagory"
                        id="Price"
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => insertPrice(e.target.value)}
                      />
                    </div>
                    {error && !price && (
                      <span className="small pl-2" style={{ color: "red" }}>
                        *Please insert price
                      </span>
                    )}
                  </div>
                  Upload Picture:{" "}
                  <FileUploader
                    handleChange={handleChange}
                    name="file"
                    types={fileTypes}
                    multiple={false}
                  />
                </div>
                {error && !file && (
                  <span className="small pl-2" style={{ color: "red" }}>
                    *Please upload image
                  </span>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="insert add_close"
                  data-dismiss="modal"
                  onClick={() => setOpenModel(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className={`insert ${!openModel && "add_close"}`}
                  data-dismiss="modal"
                  onClick={() => {
                    insertItem();
                  }}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
