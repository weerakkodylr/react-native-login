import {Dimensions} from 'react-native'

const colors = {
	darkYellow : '#FFF266',
	white : '#FFFFFF',
	gray : '#B0C1AA',
	darkGray : '#7E897A',
	lightYellow : '#D0FFC1',
	darkGreen : '#214c47',
	lightGreen : '#35776f',

}


const {height, width} = Dimensions.get('window');

const guidelineBaseWidth = 411.5;
const guidelineBaseHeight = 683.5;

// console.log("SCREEN HEIGHT IS,", height);
// console.log("SCREEN WEIGHT IS,", width);

const baseScaleVlue = width < height ? width : height;
const scaleRatio = baseScaleVlue / guidelineBaseWidth;



export const ScaleProperties = {
	fontSizeXX: 50 * scaleRatio,
	fontSizeX: 22 * scaleRatio,
	logoWidth: 350 * scaleRatio,
	logoHeight: 100 * scaleRatio
}

export const FormElementProperties = {
	buttonBorderWidth: 2,
	borderRadius: 5,
	textInputSelectionColor: colors.darkYellow,
	textInputPlaceholderColor: colors.gray,
	textInputTextColor: colors.darkYellow,
	buttonBackgroundColor: colors.darkGreen,
	buttonTextColor: colors.darkYellow,

	
}

export const ContainerProperties = {
	backgroundColor: colors.lightGreen
}

export const CommonProperties = {
	logoColor: colors.darkYellow,
	disabledColor : colors.gray,
	borderColor: colors.darkYellow,
	textColor: colors.darkYellow,
	buttonMinHeightX : 60,
	buttonMinHeightXX : 80,
	elementMarginBottom: 10,
	screenPadding: 10
}