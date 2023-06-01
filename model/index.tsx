import {
  fetchItems,
  setCurrentItem,
  setFilteredItems,
  setAllItems,
} from "./actions/item";
import {
  getItems,
  getCurrentItem,
  getFilteredItems,
  isLoading,
} from "./reducers/item";
const useItemsModel = () => {
  return {
    fetchItems,
    setCurrentItem,
    setFilteredItems,
    setAllItems,
    getItems,
    getCurrentItem,
    getFilteredItems,
    isLoading,
  };
};
export default useItemsModel;
