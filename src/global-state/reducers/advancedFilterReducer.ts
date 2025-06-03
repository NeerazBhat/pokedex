import {
  FilterActionTypes,
  type filterActions,
} from '../actions/advancedFilterActions';

export interface IFilterState {
  types?: string[] | undefined;
  habitats?: string[] | undefined;
  classification?: string | undefined;
}

export const INITIAL_STATE: IFilterState = {
  types: undefined,
  habitats: undefined,
  classification: undefined,
};

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
