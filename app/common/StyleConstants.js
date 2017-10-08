import {Dimensions} from 'react-native'

export const Colors = {
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

const baseScaleValue = width < height ? width : height;
const scaleRatio = baseScaleValue / guidelineBaseWidth;



export const ScaleProperties = {
	fontSizeXX: 30 * scaleRatio,
	fontSizeXXX: 50 * scaleRatio,
	fontSizeX: 22 * scaleRatio,
	logoWidth: 350 * scaleRatio,
	logoHeight: 100 * scaleRatio,

	//gameLaunchBoxSizeX: 50 * scaleRatio,
	//gameLaunchBoxSizeXX: 100 * scaleRatio,
	gameLaunchBoxSizeX: baseScaleValue/4 - 30,
	gameLaunchBoxSizeXX: baseScaleValue/4 - 20,
	gameLaunchBoxSizeXXX: baseScaleValue/4 - 10,
}

export const FormElementProperties = {
	buttonBorderWidth: 2,
	borderRadius: 5,
	textInputSelectionColor: Colors.darkYellow,
	textInputPlaceholderColor: Colors.gray,
	textInputTextColor: Colors.darkYellow,
	buttonBackgroundColor: Colors.darkGreen,
	buttonTextColor: Colors.darkYellow,

	
}

export const ContainerProperties = {
	backgroundColor: Colors.lightGreen
}

export const CommonProperties = {
	backgroundColor: Colors.lightGreen,
	logoColor: Colors.darkYellow,
	disabledColor : Colors.gray,
	borderColor: Colors.darkYellow,
	borderWidth: 2,
	textColor: Colors.darkYellow,
	inputElementMinHeightX : 60,
	inputElementMinHeightXX : 80,
	elementMarginBottom: 10,
	screenPadding: 10,
	screenWidth: width,
	screenHeight: height
}