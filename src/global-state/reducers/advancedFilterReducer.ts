import {
  FilterActionTypes,
  type filterActions,
} from '../actions/advancedFilterActions';

export const INITIAL_STATE = {
  draft: { type: '', habitat: '', classification: '' },
  applied: { type: '', habitat: '', classification: '' },
};

export interface IFilterState {
  draft: {
    type: string;
    habitat: string;
    classification: string;
  };
  applied: {
    type: string;
    habitat: string;
    classification: string;
  };
}

export const advancedFilterReducer = (
  state: IFilterState,
  action: filterActions
) => {
  switch (action.type) {
    case FilterActionTypes.SET_TYPE:
      return { ...state, draft: { ...state.draft, type: action.payload } };
    case FilterActionTypes.SET_HABITAT:
      return { ...state, draft: { ...state.draft, habitat: action.payload } };
    case FilterActionTypes.SET_CLASSIFICATION:
      return {
        ...state,
        draft: { ...state.draft, classification: action.payload },
      };
    case FilterActionTypes.APPLY_FILTERS:
      return { ...state, applied: { ...state.draft } };
    case FilterActionTypes.CLEAR_FILTERS:
      return {
        draft: { type: '', habitat: '', classification: '' },
        applied: { type: '', habitat: '', classification: '' },
      };
    default:
      return state;
  }
};
