import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import useItemsViewModel from "../viewmodel/useItemsViewModel";
import { Category } from "../interfaces/enums/category";
import { Item } from "../interfaces/item";

const useItemsViewController = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {
    allItems,
    items,
    currentItem,
    loadingAllItems,
    getAllItems,
    setItem,
    saveComment,
    searchItems,
    filterItems,
  } = useItemsViewModel();

  const [searchValue, setSearchValue] = useState("");
  const [comment, setComment] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [category, setCategory] = useState<string>(Category.ALL);
  const [categorySelectorOpen, setCategorySelectorOpen] = useState(false);

  useEffect(() => {
    if (category) {
      filterItems(category);
    }
  }, [category]);

  const onItemClick = (item: Item) => {
    setItem(item);
    setCategory("");
    setSearchValue("");
    setCategorySelectorOpen(false);
    navigation.navigate("Details");
  };

  const onInputChange = (str: string) => {
    setSearchValue(str);
    searchItems(str);
  };

  const onNavigateComments = () => navigation.navigate("Comments");

  const onSaveComment = () => {
    if (currentItem) {
      saveComment(currentItem, comment, score);
      setScore(0);
      setComment("");
    }
  };

  return {
    items,
    score,
    comment,
    allItems,
    category,
    currentItem,
    searchValue,
    categorySelectorOpen,
    loadingAllItems,
    onItemClick,
    getAllItems,
    onInputChange,
    onSaveComment,
    onNavigateComments,
    onChangeComment: setComment,
    onSetCategory: setCategory,
    onChangeScore: setScore,
  };
};

export default useItemsViewController;
