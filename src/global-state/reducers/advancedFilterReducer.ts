import type { IFilterPayload } from '../../types/filterResults';
import {
  FilterActionTypes,
  type filterActions,
} from '../actions/advancedFilterActions';

export const INITIAL_STATE: IFilterPayload = {
  types: undefined,
  habitats: undefined,
  classification: undefined,
};

export const advancedFilterReducer = (
  state: IFilterPayload,
  action: filterActions
) => {
  switch (action.type) {
    case FilterActionTypes.APPLY_FILTERS:
      return { ...action.payload };
    case FilterActionTypes.CLEAR_FILTERS:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
