import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform, StyleSheet, Dimensions, ScrollView } from "react-native";
import { WebView } from "react-native-webview";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

const { width, height } = Dimensions.get("screen");

export default function ModalScreen({
  route,
  navigation,
}: RootStackParamList<"Modal">) {
  const [item, setItem] = React.useState(route.params);

  React.useEffect(() => {
    setItem(route.params);
  }, []);

  return (
    <View style={styles.container}>
      {/* <ScrollView
        style={{ backgroundColor: "red", marginBottom: -320 }}
        horizontal
        pagingEnabled
      >
        {item.videos.map((item, index) => {
          return (
            <WebView
              style={{ width: width }}
              source={{ html: item.embed }}
              originWhitelist={["*"]}
            />
          );
        })}
      </ScrollView> */}
      <WebView
        style={{ width: width }}
        source={{ url: item.matchviewUrl }}
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
});
