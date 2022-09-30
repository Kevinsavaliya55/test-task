/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductData,
  updateProductData,
} from "../../Actions/dashboardAction";
import { LayoutContainer } from "../../Containers";
import Cards from "../Cards";
const TestComponent = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductData());
  }, []);
  let products = useSelector((state) => state?.dashboardReducer?.product?.data);
  const [Products, setProducts] = useState(products);
  useEffect(() => {
    setProducts(products);
  }, [useSelector((state) => state)]);

  const deleteItems = (id, category) => {
    let finalData = Products?.map((items) => {
      if (items?.category_title === category) {
        let data = items?.products?.filter((data) => {
          return data?.id !== id;
        });
        return { products: data, category_title: items?.category_title };
      } else {
        return {
          products: items?.products,
          category_title: items?.category_title,
        };
      }
    });
    dispatch(updateProductData({ data: finalData }));
  };
  return (
    <LayoutContainer>
      <div>
        {Products?.length ? (
          Products?.map((product, index) => {
            return (
              product?.products?.length && (
                <div key={index} id={product?.category_title}>
                  <h2>{product?.category_title}</h2>
                  <div>
                    <div className="container py-5">
                      <div className="row pb-5 mb-4">
                        {product?.products?.map((item, i) => {
                          return (
                            <Cards
                              deleteItems={deleteItems}
                              key={i}
                              data={item}
                              datalen={product?.products?.length}
                              categoty_title={product?.category_title}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })
        ) : (
          <span>No data found</span>
        )}
      </div>
    </LayoutContainer>
  );
};

export default TestComponent;
