import React from "react";
import { Text, View } from "react-native";
import { icons } from "../styles/Icon";
import { FontSize, color } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { translations } from "../translations/main";
import { Feather } from '@expo/vector-icons';

export default function Topbar() {
  const theme = useSelector((state: any) => state.theme.theme);
  const language = useSelector((state: any) => state.settings.language);
  const Color = color(theme);
  const Icons = icons(theme);
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: "row", backgroundColor: Color.topbarColor, padding: 14, alignItems: 'center', justifyContent: 'space-between' }}>
      <Text style={{fontSize: FontSize.regular14px, color: Color.fontWhite, fontWeight: '600'}}>{translations.bhagavadGita[language]}</Text>
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Settings")}>
      <Feather name="settings" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
