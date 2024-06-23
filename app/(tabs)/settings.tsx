import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Switch, FlatList } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { FontSize, color } from "../../GlobalStyles";
import { icons } from "../../styles/Icon";
import Modal from "react-native-modal";
import { translations } from "../../translations/main";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import {setLanguage,
  setCommentryOn,
  setWordMeaningOn,
  setTranslationOn,
  setTransliterationOn,
  setAuthorsList,} from "../../redux/slices/SettingsSlice";
import { router } from "expo-router";

export default function Settings() {
  const dispatch = useDispatch();
//   const theme = useSelector((state: any) => state.theme.theme);
const theme = "light";
  const {
    language,
    commentryOn,
    translationOn,
    transliteration,
    authorsList,
    wordMeaningOn,
    allTranslationsAuthors
  } = useSelector((state: any) => state.settings);
  const [open, setOpen] = useState("");
  const Color = color(theme);
  const Icons = icons(theme);

  const isAuthorSelected = (author: {
    author_name: string;
    language: string;
  }) => {
    return authorsList.some((item) => item.author_name === author.author_name);
  };

  const findSelectedAuthorIndex = (author: {
    author_name: string;
    language: string;
  }) => {
    return authorsList.findIndex(
      (item) => item.author_name === author.author_name
    );
  };

  const handleSetCommentryOn = (value: any) => {
    dispatch(setCommentryOn(value));
  };
  const handleSetWordMeaningOn = (value: any) => {
    dispatch(setWordMeaningOn(value));
  };
  const handleSetTranslationOn = (value: any) => {
    dispatch(setTranslationOn(value));
  };
  const handleSetTransliterationOn = (value: any) => {
    dispatch(setTransliterationOn(value));
  };

  const handleSetAuthorsList = (value: any) => {
    dispatch(setAuthorsList(value));
  };

  const handleSetLanguage = (value: any) => {
    dispatch(setLanguage(value));
  };

  const handleSwitchButtonChange = (value, key) => {
    switch(key){
        case "commentry": handleSetCommentryOn(value); return;
        case "translation" : handleSetTranslationOn(value); return;
        case "word meaining": handleSetWordMeaningOn(value); return;
        case "transliteration": handleSetTransliterationOn(value); return; 
    }
  }

  const handleAutoAuthorListFill = (_language: string) => {
    const _list = allTranslationsAuthors.filter((item: any) => (item.language === _language))
    handleSetAuthorsList([..._list]);
  }

  return (
    <>
     
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
              <View>
                <Text
                  style={{
                    fontSize: FontSize.regular14px,
                    color: Color.fontPrim,
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  Settings
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "column",
                  gap: 15,
                  marginTop: 40,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setOpen("language")}
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <Entypo name="language" size={24} color="black" />
                    <View>
                      <Text
                        style={{
                          fontSize: FontSize.regular12px,
                          fontWeight: "500",
                          color: Color.fontPrim,
                        }}
                      >
                        Language
                      </Text>
                      <Text
                        style={{
                          fontSize: FontSize.rehular10pxRegular_size,
                          fontWeight: "400",
                          marginTop: 5,
                          color: Color.fontSecondary,
                        }}
                      >
                        {language === "english" ? "English" : "Hindi"}
                      </Text>
                    </View>
                  </View>
                  <Image
                    style={{ width: 7, height: 13, borderRadius: 10 }}
                    contentFit="cover"
                    source={Icons.chevronRight}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <FontAwesome name="comments-o" size={24} color="black" />
                    <View>
                      <Text
                        style={{
                          fontSize: FontSize.regular12px,
                          fontWeight: "500",
                          color: Color.fontPrim,
                        }}
                      >
                        Commentary
                      </Text>
                      <Text
                        style={{
                          fontSize: FontSize.rehular10pxRegular_size,
                          fontWeight: "400",
                          marginTop: 5,
                          color: Color.fontSecondary,
                        }}
                      >
                        {commentryOn ? "ON" : "OFF"}
                      </Text>
                    </View>
                  </View>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={commentryOn ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(value) =>
                      handleSwitchButtonChange(value, "commentry")
                    }
                    value={commentryOn}
                  />
                </View>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="book-search"
                      size={24}
                      color="black"
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: FontSize.regular12px,
                          fontWeight: "500",
                          color: Color.fontPrim,
                        }}
                      >
                        Word meaning
                      </Text>
                      <Text
                        style={{
                          fontSize: FontSize.rehular10pxRegular_size,
                          fontWeight: "400",
                          marginTop: 5,
                          color: Color.fontSecondary,
                        }}
                      >
                        {wordMeaningOn ? "ON" : "OFF"}
                      </Text>
                    </View>
                  </View>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={wordMeaningOn ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(value) =>
                      handleSwitchButtonChange(value, "word meaining")
                    }
                    value={wordMeaningOn}
                  />
                </View>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <Ionicons name="language" size={24} color="black" />

                    <View>
                      <Text
                        style={{
                          fontSize: FontSize.regular12px,
                          fontWeight: "500",
                          color: Color.fontPrim,
                        }}
                      >
                        Translations
                      </Text>
                      <Text
                        style={{
                          fontSize: FontSize.rehular10pxRegular_size,
                          fontWeight: "400",
                          marginTop: 5,
                          color: Color.fontSecondary,
                        }}
                      >
                        {translationOn ? "ON" : "OFF"}
                      </Text>
                    </View>
                  </View>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={translationOn ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(value) =>
                      handleSwitchButtonChange(value, "translation")
                    }
                    value={translationOn}
                  />
                </View>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <FontAwesome name="language" size={24} color="black" />
                    <View>
                      <Text
                        style={{
                          fontSize: FontSize.regular12px,
                          fontWeight: "500",
                          color: Color.fontPrim,
                        }}
                      >
                        Transliterations
                      </Text>
                      <Text
                        style={{
                          fontSize: FontSize.rehular10pxRegular_size,
                          fontWeight: "400",
                          marginTop: 5,
                          color: Color.fontSecondary,
                        }}
                      >
                        {transliteration ? "ON" : "OFF"}
                      </Text>
                    </View>
                  </View>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={transliteration ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(value) =>
                      handleSwitchButtonChange(value, "transliteration")
                    }
                    value={transliteration}
                  />
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setOpen("authors")}
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <FontAwesome5 name="book-reader" size={24} color="black" />
                    <View>
                      <Text
                        style={{
                          fontSize: FontSize.regular12px,
                          fontWeight: "500",
                          color: Color.fontPrim,
                        }}
                      >
                        Authors
                      </Text>
                      <Text
                        style={{
                          fontSize: FontSize.rehular10pxRegular_size,
                          fontWeight: "400",
                          marginTop: 5,
                          color: Color.fontSecondary,
                        }}
                      >
                        List of all authors
                      </Text>
                    </View>
                  </View>
                  <Image
                    style={{ width: 7, height: 13, borderRadius: 10 }}
                    contentFit="cover"
                    source={Icons.chevronRight}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          style={{
            padding: 15,
            backgroundColor: Color.backgroundColor
          }}
        />
    
      <Modal
        isVisible={open !== ""}
        onSwipeComplete={() => setOpen("")}
        onBackdropPress={() => setOpen("")}
        onBackButtonPress={() => setOpen("")}
        style={{
          justifyContent: "flex-end",
          margin: 0,
          backgroundColor: Color.backgroundColor
        }}
      >
        <View
          style={{
            backgroundColor: Color.backgroundColor,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderColor: "rgba(0, 0, 0, 0.1)",
          }}
        >
          {open === "authors" && (
            <View
              style={{
                width: "100%",
                padding: 22,
              }}
            >
              <FlatList
                data={allTranslationsAuthors.filter((item: any) => {
                  return item?.language === language;
                })}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      if (isAuthorSelected(item)) {
                        const index = findSelectedAuthorIndex(item);
                        handleSetAuthorsList([...authorsList.slice(0, index), ...authorsList.slice(index+1)]);
                      } else {
                        handleSetAuthorsList([...authorsList, item]);
                      }
                    }}
                    activeOpacity={0.7}
                    style={{
                      padding: 15,
                      width: "100%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: FontSize.regular12px,
                        fontWeight: "500",
                        color: Color.fontPrim,
                      }}
                    >
                      {item?.author_name}
                    </Text>
                    <View
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 8,
                        borderWidth: isAuthorSelected(item) ? 0 : 1,
                        backgroundColor: isAuthorSelected(item)
                          ? Color.checkBoxActiveColor
                          : Color.backgroundColor,
                      }}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
          {open === "language" && (
            <View
              style={{
                width: "100%",
                padding: 22,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  handleSetLanguage("english");
                  handleAutoAuthorListFill("english");
                }}
                activeOpacity={0.7}
                style={{
                  padding: 15,
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: FontSize.regular12px,
                    fontWeight: "500",
                    color: Color.fontPrim,
                  }}
                >
                  English
                </Text>
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    borderWidth: language === "english" ? 0 : 1,
                    backgroundColor:
                      language === "english"
                        ? Color.checkBoxActiveColor
                        : Color.backgroundColor,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleSetLanguage("hindi");
                  handleAutoAuthorListFill("hindi");
                }}
                activeOpacity={0.7}
                style={{
                  padding: 15,
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: FontSize.regular12px,
                    fontWeight: "500",
                    color: Color.fontPrim,
                  }}
                >
                  Hindi
                </Text>
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    borderWidth: language === "hindi" ? 0 : 1,
                    backgroundColor:
                      language === "hindi"
                        ? Color.checkBoxActiveColor
                        : Color.backgroundColor,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </>
  );
}
