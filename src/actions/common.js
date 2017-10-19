import { createAction } from 'redux-actions';
import * as actionTypes from '../constants/actionTypes'

export const appStart = createAction(actionTypes.appStart)

export const toggleLoading = createAction(actionTypes.toggleLoading)