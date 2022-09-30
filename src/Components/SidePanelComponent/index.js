import React from 'react';
import { useSelector } from 'react-redux';
let productAll;
const SidePanelComponent = () => {
    const products = useSelector(
        (state) => state?.dashboardReducer?.product?.data
      );
      if (!productAll) {
        productAll = products;
      }
    return (
        <>
            <h3 className='mt-6'>Products List </h3>
            <div>
                {productAll?.map((items,i)=>{
                    return<div key={i} className='sidebar_list'>

                        <a href={'#'+items?.category_title} ><h4 className='sidebar_list_name'>{items?.category_title}</h4></a>
                    </div>
                })}
            </div>
        </>
    );
};

export default SidePanelComponent;
