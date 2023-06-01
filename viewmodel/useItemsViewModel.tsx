import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Category } from "../interfaces/enums/category";
import useItemsModel from "../model";
import { Item } from "../interfaces/item";

const useItemsViewModel = () => {
  const dispatch = useDispatch();
  const {
    fetchItems,
    setCurrentItem,
    setFilteredItems,
    setAllItems,
    getItems,
    getCurrentItem,
    getFilteredItems,
    isLoading,
  } = useItemsModel();
  const allItems = useSelector(getItems);
  const currentItem = useSelector(getCurrentItem);
  const items = useSelector(getFilteredItems);
  const loadingAllItems = useSelector(isLoading);

  const getAllItems = useCallback(async () => {
    dispatch<any>(fetchItems());
  }, []);

  const setItem = (item: Item) => {
    dispatch(setCurrentItem(item));
  };

  const searchItems = (str: string) => {
    dispatch(
      setFilteredItems(
        allItems.filter((item) =>
          str.trim() === ""
            ? true
            : item?.name?.toLowerCase()?.includes(str.toLowerCase()) ||
              item?.category?.toLowerCase()?.includes(str.toLowerCase())
        )
      )
    );
  };

  const saveComment = useCallback(
    (item: Item, comment: string, score: number) => {
      const newItem = {
        ...item,
        comments: item.comments.concat({ comment, score }),
      };
      const newAllItems = allItems.map((i) =>
        i.name === item.name ? newItem : i
      );
      dispatch(setCurrentItem(newItem));
      dispatch(setAllItems(newAllItems));
      dispatch(setFilteredItems(newAllItems));
    },
    []
  );

  const filterItems = (category: string) => {
    dispatch(
      setFilteredItems(
        allItems.filter((item) =>
          category === Category.ALL ? true : item.category === category
        )
      )
    );
  };

  return {
    items,
    allItems,
    currentItem,
    loadingAllItems,
    setItem,
    saveComment,
    filterItems,
    searchItems,
    getAllItems,
  };
};

export default useItemsViewModel;
