import { actionCreatorFactory } from "typescript-fsa";
import { asyncFactory } from "typescript-fsa-redux-thunk";
import { fetchAllItems } from "../../services/api";
import { Item } from "../../interfaces/item";

// Action creators
const create = actionCreatorFactory("DATA");

const createAsync = asyncFactory(create);

export const setCurrentItem = create<Item>("SET_ITEM");
export const setAllItems = create<Item[]>("SET_All_ITEMS");
export const fetchItems = createAsync("FETCH_ITEMS", fetchAllItems);
export const setFilteredItems = create<Item[]>("SET_FILTERED_ITEMS");
