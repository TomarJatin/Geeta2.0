import {  Platform } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import * as React from "react";
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
import { FontSize, color } from "../../GlobalStyles";
import { router } from 'expo-router';
import { Image } from "expo-image";
import { icons } from "../../styles/Icon";
import { translations } from "../../translations/main";
import { Chapters } from "../../data/chapters";
import { useDispatch, useSelector } from "react-redux";
import { bhagavadGitaQuotes } from '../../data/quotes';
import { FontAwesome } from '@expo/vector-icons';
import { backgroundWallpaper } from '../../data/backgroundWallpaper';
import { setSelectedChapter } from "../../redux/slices/ChapterSlice";
import Carousel from "react-native-reanimated-carousel";
import Topbar from '@/components/Topbar';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';


export default function HomeScreen() {
  const theme = useSelector((state: any) => state.theme.theme);
  const language = useSelector((state: any) => state.settings.language);
  const dispatch = useDispatch();
  const Color = color(theme);
  const Icons = icons(theme);
  const width = Dimensions.get("window").width;
  const sponserCrousel = [
    {
      bannerUrl:
        "https://w0.peakpx.com/wallpaper/984/453/HD-wallpaper-lord-krishna-with-fluet-lord-krishna-fluet-shadow.jpg",
      text: "Yo this is working",
    },
    {
      bannerUrl:
        "https://w0.peakpx.com/wallpaper/47/974/HD-wallpaper-krishna-gopi-lord-krishna.jpg",
      text: "Yo this is working",
    },
    {
      bannerUrl:
        "https://w0.peakpx.com/wallpaper/880/147/HD-wallpaper-lord-krishna-krishna-spiritual-krisna.jpg",
      text: "Yo this is working",
    },
    {
      bannerUrl:
        "https://w0.peakpx.com/wallpaper/816/583/HD-wallpaper-lord-krishna-spiritual-lord-krishna-spiritual-animation.jpg",
      text: "Yo this is working",
    },
    {
      bannerUrl:
        "https://w0.peakpx.com/wallpaper/43/9/HD-wallpaper-krishna-dwarikadhish-flute-god-krishna-krishna-flute-lord-krishna-murlidhar.jpg",
      text: "Yo this is working",
    },
  ];

  const handleSetSelectedChapter = (chapter: any) => {
    dispatch(setSelectedChapter(chapter));
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <ImageBackground
          source={{
            uri: backgroundWallpaper[2],
          }}
          resizeMode="cover"
          style={{
            width: "100%",
            overflow: "hidden",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            {translations.bhagavadGita[language]}
          </Text>
        </ImageBackground>
      }>
       <FlatList
    data={["1"]}
    renderItem={() => (
      <>
        <FlatList
          data={["1"]}
          renderItem={() => (
            <View>
              {/* Verse of the Day */}
              {/* <View
                style={{
                  width: "100%",
                  marginTop: 20,
                  marginBottom: 26,
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Carousel
                  loop
                  width={width * 0.98}
                  height={225}
                  autoPlay={true}
                  data={sponserCrousel}
                  scrollAnimationDuration={1000}
                  renderItem={({ item, index }) => (
                    <View
                      style={{
                        padding: 15,
                        width: "100%",
                        height: Dimensions.get("window").height * 0.29,
                      }}
                    >
                      <ImageBackground
                        style={{
                          width: "100%",
                          height: Dimensions.get("window").height * 0.26,
                        }}
                        imageStyle={{ borderRadius: 10 }}
                        resizeMode="cover"
                        source={{ uri: item.bannerUrl }}
                      >
                        <View style={{ width: '100%', height: '100%', justifyContent: 'center', padding: 20, marginTop: -20 }}>
        <FontAwesome name="quote-left" size={25} color={Color.topbarColor} />
        <Text style={{ fontSize: FontSize.regular16px, fontWeight: '600', color: Color.fontWhite, lineHeight: 20, letterSpacing: 0.9, marginTop: 10 }}>{bhagavadGitaQuotes[index][language]}</Text>
      </View>
                      </ImageBackground>
                    </View>
                  )}
                />
              </View> */}

              {/* <ImageBackground
            style={{ width: "100%", height: Dimensions.get("window").height*0.26}} 
            imageStyle={{ borderRadius: 10}}
            resizeMode="contain"
            source={{uri: sponserCrousel[0].bannerUrl}}
          >
            <Text style={{textAlign: 'center'}}>{sponserCrousel[0].text}</Text>
          </ImageBackground> */}

              {/* Chapters */}
              <View style={{  }}>
                <Text
                  style={{
                    color: Color.fontPrim,
                    fontSize: FontSize.regular14px,
                    fontWeight: "700",
                    fontFamily: "Inter_700Bold",
                  }}
                >
                  {translations.chapters[language]}
                </Text>
                <View
                  style={{
                    marginTop: 16,
                  }}
                ></View>
                <FlatList
                  data={Chapters}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onPress={() => {
                        handleSetSelectedChapter(item?.chapter_number);
                        router.push("/chapter")
                      }}
                      activeOpacity={0.7}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingBottom: 4,
                        borderBottomWidth: 1,
                        borderColor: Color.borderColorSecondary,
                        marginBottom: 16,
                      }}
                    >
                      <View style={{ flexDirection: "row", gap: 14 }}>
                        <View
                          style={{
                            width: 17,
                            height: 17,
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: Color.bgPeach,
                          }}
                        >
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: FontSize.rehular10pxRegular_size,
                              color: Color.fontPink,
                              fontWeight: "700",
                            }}
                          >
                            {item?.chapter_number}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              fontSize: FontSize.regular12px,
                              color: Color.fontPrim,
                              fontWeight: "500",
                            }}
                          >
                            {language === "english"
                              ? item?.name_translated
                              : item?.name}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              gap: 7,
                              alignItems: "center",
                              marginTop: 5,
                            }}
                          >
                            <Image
                              style={{
                                width: 9.1,
                                height: 6.5,
                                borderRadius: 10,
                              }}
                              contentFit="cover"
                              source={Icons.list}
                            />
                            <Text
                              style={{
                                fontSize: FontSize.small9px,
                                color: Color.fontSecondary,
                              }}
                            >
                              {item?.verses_count}{" "}
                              {translations.verses[language]}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <Image
                        style={{ width: 7, height: 13, borderRadius: 10 }}
                        contentFit="cover"
                        source={Icons.chevronRight}
                      />
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                />
              </View>
            </View>
          )}
          keyExtractor={(item) => item}
          style={{
            paddingBottom: 50,
          }}
        />
      </>
    )}
    style={{
      backgroundColor: Color.backgroundColor
    }}
  />
    </ParallaxScrollView>
   
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
