/* eslint-disable no-unused-vars */
type State = {
  min?: number
  max?: number
  from?: number
  to?: number
  step?: number
  tip?: boolean
  range?: boolean
  progress?: boolean
  scale?: boolean
  destiny? : number
  horizontal?: boolean
  color?: string
}

type SubViewEvent = {
  target: 'track' | 'handle' | 'secondHandle' | 'scale' | 'tip'
  position?: number
}

type ModelEvent = {
  state: State
}

type ViewEvent = {
  state: State
}

type PresenterEventCallBack = {
  (eventArgs: State) : void
}

type SubViewEventCallBack = {
  (eventArgs: SubViewEvent) : void
}

type ViewEventCallBack = {
  (eventArgs: ViewEvent) : void
}

export {
  State, ModelEvent, SubViewEvent, ViewEvent,
  SubViewEventCallBack, PresenterEventCallBack, ViewEventCallBack,
};
