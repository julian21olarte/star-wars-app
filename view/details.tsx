import { StyleSheet, Text, View, Button } from "react-native";
import useItemsViewController from "../viewcontroller/useItemsViewController";
import { Item } from "../interfaces/item";
import { useTheme } from "@react-navigation/native";

const DetailsView = () => {
  const { colors } = useTheme();
  const { currentItem, onNavigateComments } = useItemsViewController();
  const getData = () =>
    Object.keys(currentItem ?? {})
      .filter((key) => typeof currentItem?.[key] == "string")
      .map((key) => (
        <View style={styles.info} key={key}>
          <Text style={styles.label}>{key}: </Text>
          <Text style={styles.value}>{currentItem?.[key] as keyof Item}</Text>
        </View>
      ));
  return (
    <View style={styles.container}>
      {getData()}
      <View style={styles.infoList}>{getData()}</View>
      <Button
        title="Comments"
        color={colors.primary}
        onPress={onNavigateComments}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  info: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 5,
    flexWrap: "wrap",
    flexShrink: 1,
  },
  infoList: {
    marginTop: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
    flexWrap: "wrap",
    flexShrink: 1,
  },
  value: {
    fontSize: 12,
    color: "black",
    flexWrap: "wrap",
    flexShrink: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
});
export default DetailsView;
