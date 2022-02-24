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

type ViewEvent = {
  target: 'track' | 'handle' | 'secondHandle' | 'scale' | 'tip'
  args?:{
    x: number
    y: number
  }
}

type PresenterEventCallBack = {
  // eslint-disable-next-line no-unused-vars
  (eventArgs: State) : void
}

type ViewEventCallBack = {
  // eslint-disable-next-line no-unused-vars
  (eventArgs: ViewEvent) : void
}

export {
  State, ViewEvent, ViewEventCallBack, PresenterEventCallBack,
};
