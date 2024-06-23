import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import GestureRecognizer from 'react-native-swipe-gestures';
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontSize, color } from "../../GlobalStyles";
import { Image } from "expo-image";
import { icons } from "../../styles/Icon";
import { router } from 'expo-router';
import { Chapters } from "../../data/chapters";
import { Verses } from "../../data/verses";
import { translations } from "../../translations/main";
import { SaveForLaterContext } from "../../contexts/SaveForLaterContext";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedVerse } from "../../redux/slices/VerseSlice";


type translationType = {
    id: number;
    description: string;
    author_name: string;
    language: string;
  };

export default function Chapter() {
    // const theme = useSelector((state: any) => state.theme.theme);
    const theme = "light";
  const dispatch = useDispatch();
  const { saveForLater, setSaveForLater, setSaveForLaterStorage } = useContext(SaveForLaterContext);
  const selectedChapter = useSelector((state: any) => state.chapter.selectedChapter);
  const selectedVerse = useSelector((state: any) => state.verse.selectedVerse);
  const {
    language,
    commentryOn,
    translationOn,
    transliteration,
    authorsList,
    wordMeaningOn,
  } = useSelector((state: any) => state.settings);
  const Color = color(theme);
  const Icons = icons(theme);

  const handleSetSelectedVerses = (verse: any) => {
    dispatch(setSelectedVerse(verse));
  };

  const onSwipeLeft = () => {
    if (selectedVerse < Verses[selectedChapter].length) {
      handleSetSelectedVerses(selectedVerse + 1);
    }
  };

  const onSwipeRight = () => {
    if (selectedVerse > 1) {
      handleSetSelectedVerses(selectedVerse - 1);
    }
  };

  

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  const isAuthorSelected = (author: {
    author_name: string;
    language: string;
  }) => {
    return authorsList.some((item) => item.author_name === author.author_name);
  };

  const getCommentary = () => {
    return Verses[selectedChapter][selectedVerse - 1].commentaries.filter(
      (item) => item?.language === language
    )[0]?.description;
  };

  const getTranslations = (): translationType[] => {
    const availableTranslations = Verses[selectedChapter][
      selectedVerse - 1
    ].translations.filter(
      (item) =>
        item?.language === language &&
        isAuthorSelected({
          author_name: item?.author_name,
          language: language,
        })
    );
    return availableTranslations;
  };

  const handleBookMark = () => {
    if (
      saveForLater.some((item) => {
        return (
          item.verseId === selectedVerse &&
          item.chapterId === selectedChapter &&
          item.verse === Verses[selectedChapter][selectedVerse - 1].text
        );
      })
    ) {
      const index = saveForLater.findIndex(
        (item) =>
          item.verseId === selectedVerse && item.chapterId === selectedChapter
      );
      let _saveForLater = saveForLater;
      _saveForLater.splice(index, 1);
      setSaveForLater([..._saveForLater]);
    } else {
      let _saveForLater = saveForLater;
      _saveForLater.push({
        verseId: selectedVerse,
        chapterId: selectedChapter,
        verse: Verses[selectedChapter][selectedVerse - 1].text,
      });
      setSaveForLater([..._saveForLater]);
    }
    setSaveForLaterStorage();
  };


  return (
    <GestureRecognizer
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      config={config}
      style={{ flex: 1, backgroundColor: Color.backgroundColor}}
    >
      <ImageBackground
        source={Icons.krishnaBg}
        resizeMode="contain"
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      />
      <FlatList
        data={["1"]}
        renderItem={() => (
          <View>
            {/* topbar */}
            <View
              style={{
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.7}
              >
                <Image
                  style={{ width: 24, height: 24, borderRadius: 10 }}
                  contentFit="cover"
                  source={Icons.arrowLeft}
                />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  gap: 40,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleBookMark}
                >
                  {saveForLater.some((item) => {
                    return (
                      item.verseId === selectedVerse &&
                      item.chapterId === selectedChapter &&
                      item.verse ===
                        Verses[selectedChapter][selectedVerse - 1].text
                    );
                  }) ? (
                    <FontAwesome name="bookmark" size={24} color="black" />
                  ) : (
                    <FontAwesome name="bookmark-o" size={24} color="black" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => router.push("/settings")}
                >
                  <Feather name="settings" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginTop: 40 }}>
              <View>
               
                <Text
                  style={{
                    fontSize: FontSize.regular16px,
                    color: Color.fontPrim,
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  {selectedChapter}.{selectedVerse}
                </Text>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: FontSize.regular13px,
                    color: Color.gold,
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  {Verses[selectedChapter][selectedVerse - 1].text}
                </Text>
              </View>
              {transliteration && (
                <View style={{ marginTop: 30 }}>
                  <Text
                    style={{
                      fontSize: FontSize.regular13px,
                      color: Color.fontPrim,
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    {translations.transliteration[language]}
                  </Text>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: FontSize.regular12px,
                      color: Color.fontPrim,
                      fontWeight: "400",
                      textAlign: "center",
                      fontStyle: "italic",
                      letterSpacing: 1,
                      lineHeight: 20,
                    }}
                  >
                    {
                      Verses[selectedChapter][selectedVerse - 1]
                        .transliteration
                    }
                  </Text>
                </View>
              )}
              {wordMeaningOn && (
                <View style={{ marginTop: 30 }}>
                  <Text
                    style={{
                      fontSize: FontSize.regular13px,
                      color: Color.fontPrim,
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    WORD MEANINGS
                  </Text>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: FontSize.regular12px,
                      color: Color.fontPrim,
                      fontWeight: "400",
                      textAlign: "center",
                      lineHeight: 20,
                    }}
                  >
                    {Verses[selectedChapter][selectedVerse - 1].word_meanings}
                  </Text>
                </View>
              )}
              {translationOn && (
                <View style={{ marginTop: 30 }}>
                  <Text
                    style={{
                      fontSize: FontSize.regular13px,
                      color: Color.fontPrim,
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    {translations.translations[language]}
                  </Text>
                  <FlatList
                    data={getTranslations()}
                    renderItem={({ item, index }) => (
                      <View key={index} style={{ marginBottom: 10 }}>
                        <Text
                          style={{
                            fontSize: FontSize.regular12px,
                            color: Color.fontPrim,
                            fontWeight: "400",
                            lineHeight: 20,
                          }}
                        >
                          {translations.author[language]} - {item.author_name}
                        </Text>
                        <Text
                          style={{
                            marginTop: 6,
                            fontSize: FontSize.regular12px,
                            color: Color.fontPrim,
                            fontWeight: "400",
                            textAlign: "center",
                            lineHeight: 20,
                          }}
                        >
                          {item.description}
                        </Text>
                      </View>
                    )}
                    style={{
                      marginTop: 10,
                    }}
                  />
                </View>
              )}
              {commentryOn && (
                <View style={{ marginTop: 30, paddingBottom: 100 }}>
                  <Text
                    style={{
                      fontSize: FontSize.regular13px,
                      color: Color.fontPrim,
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    {translations.commentary[language]}
                  </Text>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: FontSize.regular12px,
                      color: Color.fontPrim,
                      fontWeight: "400",
                      textAlign: "center",
                      lineHeight: 20,
                    }}
                  >
                    {getCommentary()}
                  </Text>
                </View>
              )}
             
            </View>
            
          </View>
        )}
        keyExtractor={(item) => item}
        style={{
          padding: 15,
        }}
      />
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
