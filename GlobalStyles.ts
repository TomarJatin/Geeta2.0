import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

/* fonts */
export const FontFamily = {
  Inter: 'Inter'
};

/* font sizes */
export const FontSize = {
  rehular10pxRegular_size: RFValue(10),
  regular12px: RFValue(12),
  regular13px: RFValue(13),
  regular14px: RFValue(14),
  regular16px: RFValue(16),
  regular18px: RFValue(18),
  small9px: RFValue(9)
};

/* Colors */
export const color = (theme: string) => ({
  backgroundColor: theme === 'light' ? "#fff": '#181818',
  topbarColor: theme === 'light' ? '#FF5F04': '#FF5F04',
  fontWhite: '#fff',
  fontPrim: '#000000',
  borderColorSecondary: '#DCDCDC',
  fontPink: '#F16060',
  bgPeach: '#FFDFDF', 
  fontSecondary: '#5A5A5A',
  chapterHeading: '#0038FF',
  gold: '#bf9b30',
  checkBoxActiveColor: '#F46B45'
})

/* Paddings */
export const Padding = {
  
};

/* border radiuses */
export const Border = {
 
};