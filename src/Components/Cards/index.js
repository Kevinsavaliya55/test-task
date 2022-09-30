/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import deleteIcon from "../../Assets/delete.png";
const Cards = (props) => {
  const [rating, setRating] = useState(0); // initial rating value

  let data = props?.data;
  let title = data?.title;
  let image = data?.picture;
  let description = data?.description;
  let price = data?.price;
  let datalen = props?.datalen;
  let id = data?.id;

  const handleRating = (rate) => {
    setRating(rate);
  };
  return (
    <div
      className={`col-lg-3 col-md-6 mb-4 mb-lg-4 ${
        datalen === 1 && "single_item"
      }`}
    >
      <div className="card rounded shadow-sm border-0">
        <div className="card-body p-4">
          <img
            className="delete"
            onClick={() => {
              props.deleteItems(id, props?.categoty_title);
            }}
            src={deleteIcon}
            alt=""
          />

          <img src={image} alt="" className="img-fluid d-block mx-auto mb-3" />
          <h5> {title}</h5>
          <p className=" text-muted font-itali description">${price}</p>

          <p className="small text-muted font-itali description">
            {description}
          </p>

          <div className="rating">
            <Rating size="20px" onClick={handleRating} ratingValue={rating} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cards;
