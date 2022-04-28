import React, { useLayoutEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRecoilValue, useRecoilState, useResetRecoilState } from "recoil";
import styles from "/styles/Home.module.css";
import axios from "axios";
import { BeerType } from "../src/types/beerTypes";
import { beerList } from "../src/recoil/beer";

export async function getServerSideProps() {
  // Fetch data from external API
  const options = {
    method: "GET",
    url: "https://api.punkapi.com/v2/beers",
    params: {
      page: 1,
      per_page: 20,
    },
    headers: {
      "x-ratelimit-limit": 3600,
      "x-ratelimit-remaining": 3587,
    },
  };

  try {
    const response = await axios.request(options);
    const { data } = response;
    return { props: { data } };
  } catch (e) {
    console.log("에러!!!", e);
  }
  return { props: { data: "none" } };
}

const Home = (props: { data: BeerType[] }) => {
  const { data } = props;
  const [beers, setBeers] = useRecoilState(beerList);
  return (
    <div className={styles.container}>
      {data.map((v: BeerType) => {
        const { id, image_url, name } = v;
        return (
          <div key={`beer-${id}`}>
            <img src={image_url} width={100} />
            <p>{name}</p>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Home;
