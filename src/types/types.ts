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
  target: 'track' | 'handle' | 'secondHandle' | 'scale' | 'tip';
  position: number;
};

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

export {
  State,
  ModelEvent,
  SubViewEvent,
  ViewEvent,
  Data,
  SubViewEventCallBack,
  PresenterEventCallBack,
  ViewEventCallBack,
  ModelEventCallBack,
};
