import * as React from "react";
import {
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import competitionJson from "../competition";

const { width, height } = Dimensions.get("screen");

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [highlights, setHighlights] = React.useState([]);
  const [competition, setCompetition] = React.useState(competitionJson);
  const [filter, setFilter] = React.useState(null);

  React.useEffect(() => {
    getVideos().then((val) => {
      setHighlights(val);
    });
  }, []);

  React.useEffect(() => {
    if (filter) {
      getVideos().then((val) => {
        getFilter(val, filter).then((val) => {
          setHighlights(val);
        });
      });
    } else {
      getVideos().then((val) => {
        setHighlights(val);
      });
    }
  }, [filter]);
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.leagueListContainer}
        contentContainerStyle={styles.leagueContentContainerStyle}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        data={competition}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (filter) {
                  if (filter == competition[index].searchName) {
                    setFilter(null);
                  } else {
                    setFilter(item.searchName);
                  }
                } else {
                  setFilter(item.searchName);
                }
              }}
              style={[
                styles.leagueItemContainer,
                {
                  backgroundColor:
                    filter == competition[index].searchName
                      ? "#dedede"
                      : "white",
                },
              ]}
            >
              <Image
                resizeMode="contain"
                source={item.thumbnail}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
          );
        }}
      />
      <FlatList
        style={styles.listContainer}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={highlights}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate("Modal", item);
              }}
              style={styles.itemContainer}
            >
              <Image
                resizeMode="cover"
                source={{ uri: item.thumbnail }}
                style={styles.imageItem}
              />
              <View
                style={{
                  padding: 10,
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                }}
              >
                <Text style={{ fontWeight: "600", fontSize: 20 }}>
                  {item.title}
                </Text>
                <Text style={{ fontWeight: "400", fontSize: 17 }}>
                  {item.competition}
                </Text>
                <Text>
                  {new Date(item.date).toLocaleString()} - {item.videos.length}{" "}
                  Video
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const getVideos = async () => {
  try {
    const response = await fetch("https://www.scorebat.com/video-api/v3/");
    const json = await response.json();
    return json.response;
  } catch (error) {
    console.error(error);
  }
};

const getFilter = async (highlights, filter) => {
  try {
    const response = await highlights.filter(
      (highlights) => highlights.competition == filter
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  leagueListContainer: {
    width: width,
  },
  leagueContentContainerStyle: {
    padding: 15,
    marginBottom: 10,
  },
  leagueItemContainer: {
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    borderRadius: 35,
    shadowRadius: 15,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    width: 70,
    height: 70,
  },
  listContainer: {
    width: width,
  },
  contentContainerStyle: {
    paddingHorizontal: 15,
  },
  itemContainer: {
    marginVertical: 10,
    borderRadius: 15,
    shadowRadius: 15,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
  },
  imageItem: {
    width: "100%",
    height: 200,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
