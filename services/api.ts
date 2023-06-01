import axios from "axios";
import { Category } from "../interfaces/enums/category";
import { Item } from "../interfaces/item";
const base_url = "https://swapi.dev/api/";

export const fetchPeople = async (): Promise<Item[]> => {
  const res = await axios.get(base_url + "people");
  return res.data.results.map((r: Item) => ({
    ...r,
    category: Category.PEOPLE,
  }));
};

export const fetchPlanets = async (): Promise<Item[]> => {
  const res = await axios.get(base_url + "planets");
  return res.data.results.map((r: Item) => ({
    ...r,
    category: Category.PLANET,
  }));
};

export const fetchVehicles = async (): Promise<Item[]> => {
  const res = await axios.get(base_url + "vehicles");
  return res.data.results.map((r: Item) => ({
    ...r,
    category: Category.VEHICLE,
  }));
};

export const fetchAllItems = async (): Promise<Item[]> => {
  const [people, planets, vehicles] = await Promise.all([
    fetchPeople(),
    fetchPlanets(),
    fetchVehicles(),
  ]);
  return people
    .concat(planets)
    .concat(vehicles)
    .map((r) => ({
      ...r,
      comments: [],
    }));
};
