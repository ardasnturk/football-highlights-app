import * as React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { WebView } from "react-native-webview";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

const { width, height } = Dimensions.get("screen");

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <WebView
        style={{ width: width }}
        source={{ uri: "https://www.scorebat.com/embed/livescore/" }}
        originWhitelist={["*"]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
