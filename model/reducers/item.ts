import { RootState } from "./index";
import {
  fetchItems,
  setAllItems,
  setCurrentItem,
  setFilteredItems,
} from "../actions/item";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Item } from "../../interfaces/item";

export interface State {
  loading: boolean;
  items: Item[];
  filteredItems: Item[];
  currentItem: Item | null;
}

export const INITIAL_STATE: State = {
  loading: false,
  items: [],
  filteredItems: [],
  currentItem: null,
};

const Data = reducerWithInitialState(INITIAL_STATE);
// Reducers
// Action handlers
Data.case(
  fetchItems.async.started,
  (state: State): State => ({
    ...state,
    loading: true,
  })
);
Data.case(
  fetchItems.async.failed,
  (state: State): State => ({
    ...state,
    loading: false,
  })
);
Data.case(
  fetchItems.async.done,
  (state: State, { result }): State => ({
    ...state,
    items: state.items?.length ? state.items : result,
    filteredItems: state.items?.length ? state.items : result,
    loading: false,
  })
);
Data.case(
  setCurrentItem,
  (state: State, payload): State => ({
    ...state,
    currentItem: payload,
  })
);
Data.case(
  setAllItems,
  (state: State, payload): State => ({
    ...state,
    items: payload,
  })
);
Data.case(
  setFilteredItems,
  (state: State, payload): State => ({
    ...state,
    filteredItems: payload,
  })
);

// Selectors
export const getItems = (state: RootState) => state.DataState.items;
export const getFilteredItems = (state: RootState) =>
  state.DataState.filteredItems;
export const getCurrentItem = (state: RootState) => state.DataState.currentItem;
export const isLoading = (state: RootState) => state.DataState.loading;
export default Data;
