import { atom, selector } from "recoil";
import { BeerType } from "../types/beerTypes";

const beerList = atom<BeerType[]>({
  key: "beers",
  default: [],
});

export { beerList };
