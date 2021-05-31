import React, { useEffect, useState } from "react";
import Product from "./Product";

import "./Home.css";

const API_URL = process.env.REACT_APP_API_URL;

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Error to get the products");
        } else {
          return res.json();
        }
      })
      .then((allProducts) => {
        setProducts(allProducts);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const createProductsRows = () => {
    const rows = [];
    let rowNumber = 0;
    for (let i = 0; i < products.length; i++) {
      if (rowNumber === 0) {
        rows.push(
          <div className="home__row" key={`home_row_${i}`}>
            <Product
              key={`product_${products[i].id}`}
              id={products[i].id}
              title={products[i].title}
              image={products[i].image}
              price={products[i].price}
              rating={products[i].rating}
            />
            {products[i + 1] ? (
              <Product
                key={`product_${products[i + 1].id}`}
                id={products[i + 1].id}
                title={products[i + 1].title}
                image={products[i + 1].image}
                price={products[i + 1].price}
                rating={products[i + 1].rating}
              />
            ) : null}
          </div>,
        );
        rowNumber++;
        i++;
      } else if (rowNumber === 1) {
        rows.push(
          <div className="home__row" key={`home_row_${i}`}>
            <Product
              key={`product_${products[i].id}`}
              id={products[i].id}
              title={products[i].title}
              image={products[i].image}
              price={products[i].price}
              rating={products[i].rating}
            />
            {products[i + 1] ? (
              <Product
                key={`product_${products[i + 1].id}`}
                id={products[i + 1].id}
                title={products[i + 1].title}
                image={products[i + 1].image}
                price={products[i + 1].price}
                rating={products[i + 1].rating}
              />
            ) : null}
            {products[i + 2] ? (
              <Product
                key={`product_${products[i + 2].id}`}
                id={products[i + 2].id}
                title={products[i + 2].title}
                image={products[i + 2].image}
                price={products[i + 2].price}
                rating={products[i + 2].rating}
              />
            ) : null}
          </div>,
        );
        rowNumber++;
        i += 2;
      } else if (rowNumber === 2) {
        rows.push(
          <div className="home__row" key={`home_row_${i}`}>
            <Product
              key={`product_${products[i].id}`}
              id={products[i].id}
              title={products[i].title}
              image={products[i].image}
              price={products[i].price}
              rating={products[i].rating}
            />
          </div>,
        );
        rowNumber = 0;
      }
    }
    return rows;
  };

  return (
    <main className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt="banner prime video"
        />
        {products.length > 0 && createProductsRows()}
      </div>
    </main>
  );
}

export default Home;
