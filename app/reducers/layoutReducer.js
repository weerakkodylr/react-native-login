import { LayoutActionTypes } from '../common/Enums'

const { SET_LAYOUT_DIMENTIONS } = LayoutActionTypes

const defaultState = {
	layoutHeight: 0,
	layoutWidth: 0
}

export default reducer = ( state = defaultState, action ) => {
	switch ( action.type ) {
		case SET_LAYOUT_DIMENTIONS: {
			state = {...state, layoutHeight: action.payload.height, layoutWidth: action.payload.width}
			break
		}
	}

	return state
}