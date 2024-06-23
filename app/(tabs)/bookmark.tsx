import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontSize, color } from "../../GlobalStyles";
import { Image } from "expo-image";
import { SaveForLaterContext } from "../../contexts/SaveForLaterContext";
import { translations } from "../../translations/main";
import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChapter } from "../../redux/slices/ChapterSlice";
import { setSelectedVerse } from "../../redux/slices/VerseSlice";
import { router } from "expo-router";

export default function Bookmarked() {
  const theme = useSelector((state: any) => state.theme.theme);
  const dispatch = useDispatch();
  const { saveForLater } = useContext(SaveForLaterContext);
  const language = useSelector((state: any) => state.settings.language);
  const Color = color(theme);

  const handleSetSelectedChapter = (chapter: any) => {
    dispatch(setSelectedChapter(chapter));
  };

  const handleSetSelectedVerses = (verse: any) => {
    dispatch(setSelectedVerse(verse));
  };

  return (
    <FlatList
      data={["1"]}
      renderItem={() => (
        <View style={{ padding: 15 }}>
          <Text
            style={{
              color: Color.fontPrim,
              fontSize: FontSize.regular16px,
              fontWeight: "700",
            }}
          >
            Saved Verses
          </Text>
          <FlatList
            data={saveForLater}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  handleSetSelectedVerses(item?.verseId);
                  handleSetSelectedChapter(item?.chapterId);
                  router.push("/verse");
                }}
                activeOpacity={0.7}
                style={{
                  paddingBottom: 4,
                  borderBottomWidth: 1,
                  borderColor: Color.borderColorSecondary,
                  marginBottom: 16,
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <View style={{ flexDirection: "row", gap: 14 }}>
                    <Text
                      style={{
                        fontSize: FontSize.regular12px,
                        color: Color.fontPrim,
                        fontWeight: "600",
                      }}
                    >
                      {translations.Verse[language]} {item.chapterId}.
                      {item.verseId}
                    </Text>
                  </View>
                  <Entypo name="chevron-small-right" size={24} color="black" />
                </View>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: FontSize.regular12px,
                    color: Color.fontPrim,
                    fontWeight: "400",
                  }}
                >
                  {item.verse}
                </Text>
              </TouchableOpacity>
            )}
            style={{
              marginTop: 40,
            }}
          />

          {saveForLater.length === 0 && (
            <Text
              style={{
                color: Color.fontPrim,
                fontSize: FontSize.regular12px,
                fontWeight: "500",
              }}
            >
              No Saved Verse
            </Text>
          )}
        </View>
      )}
      style={{
        backgroundColor: Color.backgroundColor,
        paddingBottom: 50,
        minHeight: Dimensions.get("window").height,
      }}
    />
  );
}
