import { LayoutActionTypes } from '../common/Enums'

const { SET_LAYOUT_DIMENTIONS } = LayoutActionTypes

export const setLayoutDimentions = (width,height) => ({
		type: SET_LAYOUT_DIMENTIONS,
		payload: {width, height}
})