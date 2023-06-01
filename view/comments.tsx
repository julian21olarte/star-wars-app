import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
} from "react-native";
import useItemsViewController from "../viewcontroller/useItemsViewController";
import { useTheme } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import Comment from "../components/comment";

const CommentsView = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const {
    currentItem,
    comment,
    score,
    onChangeComment,
    onChangeScore,
    onSaveComment,
  } = useItemsViewController();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leave your comment and score</Text>
      <View style={styles.scores}>
        {Array.from(Array(5)).map((_, i) => (
          <AntDesign
            size={24}
            color={colors.primary}
            name={i + 1 > score ? "staro" : "star"}
            onPress={() => onChangeScore(i + 1)}
            key={`comment-score-select-${i + 1}`}
          />
        ))}
      </View>
      <TextInput
        editable
        multiline
        maxLength={400}
        numberOfLines={4}
        value={comment}
        onChangeText={onChangeComment}
        style={styles.textbox}
      />
      <Button
        onPress={onSaveComment}
        title="Save comment"
        color={colors.primary}
        disabled={!comment}
      />
      <FlatList
        data={currentItem?.comments}
        renderItem={({ item }) => (
          <Comment key={`comment-${item.comment}`} comment={item} />
        )}
      />
    </View>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    title: {
      fontSize: 25,
      color: colors.primary,
    },
    textbox: {
      padding: 8,
      marginTop: 8,
      marginBottom: 8,
      borderWidth: 1,
    },
    comment: {},
    scores: {
      marginTop: 8,
      marginBottom: 8,
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: "#fff",
      justifyContent: "flex-start",
    },
  });
export default CommentsView;
