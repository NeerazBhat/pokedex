export enum FilterActionTypes {
  APPLY_FILTERS = 'APPLY_FILTERS',
  CLEAR_FILTERS = 'CLEAR_FILTERS',
  SET_TYPE = 'SET_TYPE',
  SET_HABITAT = 'SET_HABITAT',
  SET_CLASSIFICATION = 'SET_CLASSIFICATION',
}

interface ISetTypeAction {
  type: FilterActionTypes.SET_TYPE;
  payload: string;
}

export const addTypeFilter = (newType: string) => {
  return {
    type: FilterActionTypes.SET_TYPE,
    payload: newType,
  };
};

interface ISetHabitatAction {
  type: FilterActionTypes.SET_HABITAT;
  payload: string;
}

export const addHabitatFilter = (newHabitat: string) => {
  return {
    type: FilterActionTypes.SET_HABITAT,
    payload: newHabitat,
  };
};

interface ISetClassificationAction {
  type: FilterActionTypes.SET_CLASSIFICATION;
  payload: string;
}

export const addClassificationFilter = (newClassification: string) => {
  return {
    type: FilterActionTypes.SET_CLASSIFICATION,
    payload: newClassification,
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

interface IApplyFilterAction {
  type: FilterActionTypes.APPLY_FILTERS;
}

export const applyFilter = (): IApplyFilterAction => {
  return {
    type: FilterActionTypes.APPLY_FILTERS,
  };
};

export type filterActions =
  | IClearFilterAction
  | IApplyFilterAction
  | ISetTypeAction
  | ISetHabitatAction
  | ISetClassificationAction;
