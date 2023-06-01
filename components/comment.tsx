import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { IComment } from "../interfaces/comment";
import { useTheme } from "@react-navigation/native";

const Comment = ({ comment }: { comment: IComment }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.scores}>
        {Array.from(Array(5)).map((_, i) => (
          <AntDesign
            size={12}
            color={colors.primary}
            key={`comment-score-${i + 1}`}
            name={i + 1 > comment.score ? "staro" : "star"}
          />
        ))}
      </View>
      <Text style={styles.comment}>{comment.comment}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    display: "flex",
    flexDirection: "column",
  },
  comment: {
    fontSize: 14,
  },
  scores: {
    marginTop: 8,
    marginBottom: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default Comment;
