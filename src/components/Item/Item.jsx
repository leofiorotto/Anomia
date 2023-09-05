import React from 'react';
import "./Item.css";
import { Link } from "react-router-dom";

const Item = ({ id, name, img, price, category }) => {
  return (
    <Link to={`/Entrega1-React-Fiorotto/detail/${id}`} className="Item-link">
      <article className="Item">
        <header>
          <h2>{name}</h2>
        </header>

        <picture>
          <img src={img} alt={name} />
        </picture>

        <section className='description'>
          <b>{category}</b>
        </section>
      </article>
    </Link>
  );
};

export default Item;