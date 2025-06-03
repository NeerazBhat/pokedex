// import type { IFilterPayload } from '../../types/filterResults';
import type { IFilterState } from '../reducers/advancedFilterReducer';

export enum FilterActionTypes {
  APPLY_FILTERS = 'APPLY_FILTERS',
  CLEAR_FILTERS = 'CLEAR_FILTERS',
}

interface IApplyFilterAction {
  type: FilterActionTypes.APPLY_FILTERS;
  payload: IFilterState;
}

export const applyFilter = (data: IFilterState): IApplyFilterAction => {
  return {
    type: FilterActionTypes.APPLY_FILTERS,
    payload: data,
  };
};

interface IClearFilterAction {
  type: FilterActionTypes.CLEAR_FILTERS;
}

export const clearFilter = (): IClearFilterAction => {
  return {
    type: FilterActionTypes.CLEAR_FILTERS,
  };
};

export type filterActions = IClearFilterAction | IApplyFilterAction;
