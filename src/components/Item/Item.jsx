import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

const Item = ({ id, name, img, price, category }) => {
  return (
    <Link to={`/detail/${id}`} className="Item-link">
      <article className="Item">
        <div className="div1">
          <header>
            <h2 className="tittle_item">{name}</h2>
          </header>
        </div>
        <div className="div2">
          <picture>
            <img src={img} alt={name} />
          </picture>
        </div>
        <div>
          <section className="description">
            <b>{category}</b>
          </section>
        </div>
      </article>
    </Link>
  );
};

export default Item;
