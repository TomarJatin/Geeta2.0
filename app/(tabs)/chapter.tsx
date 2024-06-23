import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Platform,
  FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Topbar from "../../components/Topbar";
import {router} from "expo-router"
import { useContext } from "react";
import GestureRecognizer from 'react-native-swipe-gestures';
import { FontSize, color } from "../../GlobalStyles";
import { Image } from "expo-image";
import { icons } from "../../styles/Icon";
import { Chapters } from "../../data/chapters";
import { Verses } from "../../data/verses";
import { translations } from "../../translations/main";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChapter } from "../../redux/slices/ChapterSlice";
import { setSelectedVerse } from "../../redux/slices/VerseSlice";
// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from "react-native-google-mobile-ads";

// const adUnitId =
//   Platform.OS !== "ios"
//     ? "ca-app-pub-1000663314481679/6705659559"
//     : "ca-app-pub-1000663314481679/6705659559";

export default function Chapter() {
//   const theme = useSelector((state: any) => state.theme.theme);
const theme = "light";
  const dispatch = useDispatch();
  const selectedChapter = useSelector((state: any) => state.chapter.selectedChapter);
  const language = useSelector((state: any) => state.settings.language);
  const Color = color(theme);
  const Icons = icons(theme);

  const onSwipeLeft = () => {
    if (selectedChapter < 18) {
      handleSetSelectedChapter(selectedChapter + 1);
    }
    else{
      handleSetSelectedChapter(1);
    }
  };

  const onSwipeRight = () => {
    if (selectedChapter > 1) {
      handleSetSelectedChapter(selectedChapter-1);
    }
    else{
      handleSetSelectedChapter(18);
    }
  };

  const handleSetSelectedChapter = (chapter: any) => {
    dispatch(setSelectedChapter(chapter));
  };

  const handleSetSelectedVerses = (verse: any) => {
    dispatch(setSelectedVerse(verse));
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
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
            <View style={{ marginTop: 30 }}>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 30,
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ width: 20, height: 20 }}
                    contentFit="cover"
                    source={Icons.flowerIcon}
                  />
                  <Text
                    style={{
                      fontSize: FontSize.regular14px,
                      color: Color.chapterHeading,
                      fontWeight: "600",
                    }}
                  >
                    {translations.chapter[language]} {selectedChapter}
                  </Text>
                  <Image
                    style={{ width: 20, height: 20 }}
                    contentFit="cover"
                    source={Icons.flowerIcon}
                  />
                </View>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: FontSize.regular13px,
                    color: Color.fontPrim,
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  {language === "english"? Chapters[selectedChapter - 1].name_translated: Chapters[selectedChapter - 1].name}
                </Text>
              </View>
              <Text
                style={{
                  marginTop: 30,
                  fontSize: FontSize.regular12px,
                  color: Color.fontPrim,
                  fontWeight: "400",
                  lineHeight: 20
                }}
              >
                {language === "english" ? Chapters[selectedChapter - 1].chapter_summary: Chapters[selectedChapter - 1].chapter_summary_hindi}
              </Text>
            </View>
            <FlatList
              data={Verses[selectedChapter]}
              renderItem={({ item, index }) => {
                return (
                  <>
                  <TouchableOpacity
                    onPress={() => {
                      handleSetSelectedVerses(item?.verse_number);
                      router.push("/verse")
                    }}
  
                    activeOpacity={0.7}
                    style={{
                      paddingBottom: 4,
                      borderBottomWidth: 1,
                      borderColor: Color.borderColorSecondary,
                      marginBottom: 16,
                      width: '100%'
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: '100%'
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
                          {translations.Verse[language]} {item.verse_number}
                        </Text>
                      </View>
                      <Image
                        style={{ width: 5, height: 10, borderRadius: 10 }}
                        contentFit="cover"
                        source={Icons.chevronRight}
                      />
                    </View>
                    <Text style={{marginTop: 10,
                    fontSize: FontSize.regular12px,
                    color: Color.fontPrim,
                    fontWeight: "400",}}>{item.text}</Text>
                  </TouchableOpacity>
                  {/* {
                    index%5 === 0 && <BannerAd
                    unitId={adUnitId}
                    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                    requestOptions={{
                      requestNonPersonalizedAdsOnly: true,
                    }}
                    key={index}
                  />
                  } */}
                  </>
                )
              } }
              keyExtractor={(item) => item.id.toString()}
              style={{
                paddingBottom: 100,
                marginTop: 30,
              }}
            />
          </View>
        )}
        keyExtractor={(item) => item}
        style={{
          padding: 15,
        }}
      />
 
    </GestureRecognizer>
    
  )
}