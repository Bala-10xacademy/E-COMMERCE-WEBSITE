import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../header/header";
import Item from "../item/item";

import "./main.css"; // import a separate CSS file for styling

const Main = () => {
  const [oldSchool, setOldSchool] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/old-schools")
      .then((oldSchool) => {
        setOldSchool(oldSchool.data.data);
      })
      .catch(() => {})
      .finally(() => {});

    axios
      .get("http://localhost:1337/api/best-sellers")
      .then((bestSeller) => {
        setBestSeller(bestSeller.data.data);
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

  return (
    <>
      <Header />
      <section className="main-container">
        <article className="main-section-title">Best Sellers</article>
        <div className="main-items-container">
          {bestSeller.map((item, key) => {
            return <Item item={item.attributes} />;
          })}
        </div>
        <article className="main-section-title">Old School</article>
        <div className="main-items-container">
          {oldSchool.map((item, key) => {
            return <Item item={item.attributes} />;
          })}
        </div>
      </section>
    </>
  );
};

export default Main;