/* eslint-disable no-unused-vars */
type State = {
  min: number;
  max: number;
  from: number;
  to: number;
  step: number;
  tip: boolean;
  range: boolean;
  progress: boolean;
  scale: boolean;
  scaleDestiny: number;
  horizontal: boolean;
};

type Data = {
  min?: number;
  max?: number;
  from?: number;
  to?: number;
  step?: number;
  tip?: boolean;
  range?: boolean;
  progress?: boolean;
  scale?: boolean;
  scaleDestiny?: number;
  horizontal?: boolean;
};

type SubViewEvent = {
  target:
    | 'track'
    | 'handle'
    | 'secondHandle'
    | 'scale'
    | 'tip'
    | 'secondTip'
    | 'from'
    | 'to';
  position: number;
};

type RoleSubView = 'from' | 'to';

type ModelEvent = State;

type ViewEvent = Data;

type PresenterEventCallBack = {
  (eventArgs: State): void;
};

type SubViewEventCallBack = {
  (eventArgs: SubViewEvent): void;
};

type ViewEventCallBack = {
  (eventArgs: ViewEvent): void;
};

type ModelEventCallBack = {
  (eventArgs: State): void;
};

type Values = {
  from?: number;
  to?: number;
};

type Settings = {
  min?: number;
  max?: number;
  step?: number;
  tip?: boolean;
  range?: boolean;
  progress?: boolean;
  scale?: boolean;
  scaleDestiny?: number;
  horizontal?: boolean;
};

export {
  State,
  ModelEvent,
  RoleSubView,
  SubViewEvent,
  ViewEvent,
  Data,
  SubViewEventCallBack,
  PresenterEventCallBack,
  ViewEventCallBack,
  ModelEventCallBack,
  Values,
  Settings,
};
