import { action } from 'typesafe-actions';
import { AppWideLoadingTypes } from './types';

export const showAppWideLoading = (isLoading: boolean) =>
  action(AppWideLoadingTypes.SET_APP_WIDE_LOADING, isLoading);
