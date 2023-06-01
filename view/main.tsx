import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import ItemsList from "../components/items";
import useItemsViewController from "../viewcontroller/useItemsViewController";
import { Category } from "../interfaces/enums/category";
import { useTheme } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";

const MainView = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const {
    items,
    searchValue,
    loadingAllItems,
    getAllItems,
    onSetCategory,
    onInputChange,
  } = useItemsViewController();

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Star Wars Wiki</Text>
      <TextInput
        style={styles.input}
        value={searchValue}
        onChangeText={onInputChange}
        placeholder="Search items by name or category"
      />
      <Text style={styles.categoriesLabel}>
        Available categories: people, planet & vehicle
      </Text>
      <SelectList
        setSelected={onSetCategory}
        boxStyles={styles.select}
        placeholder="Select category"
        data={Object.values(Category).map((value) => ({
          label: value,
          value: value,
        }))}
        save="value"
      />
      {loadingAllItems ? (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color={colors.primary}
        />
      ) : (
        <ItemsList items={items} />
      )}
    </View>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    title: {
      fontSize: 25,
      color: colors.primary,
      marginBottom: 8,
    },
    input: {
      height: 40,
      borderWidth: 1,
      padding: 10,
    },
    categoriesLabel: {
      fontSize: 10,
      marginBottom: 15,
    },
    container: {
      flex: 1,
      padding: 15,
      backgroundColor: "#fff",
      justifyContent: "flex-start",
    },
    select: {
      borderRadius: 0,
    },
    loading: {
      marginTop: "auto",
      marginBottom: "auto",
    },
  });
export default MainView;
