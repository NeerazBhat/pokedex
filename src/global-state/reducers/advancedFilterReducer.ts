import {
  FilterActionTypes,
  type filterActions,
} from '../actions/advancedFilterActions';

export const INITIAL_STATE = {
  types: '',
  habitat: '',
  classification: '',
};

export interface IFilterState {
  types: string;
  habitat: string;
  classification: string;
}

export const advancedFilterReducer = (
  state: IFilterState,
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
