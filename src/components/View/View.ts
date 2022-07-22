import {
  SubViewEvent,
  Data,
  ViewEvent,
  ViewEventCallBack,
  State,
} from 'types/types';
import { convertPixelInValue } from 'utils/calcUtils';

import defaultState from 'defaultState/defaultState';
import Handle from './subView/Handle/Handle';
import SecondHandle from './subView/Handle/SecondHandle';
import Scale from './subView/Scale/Scale';
import Tip from './subView/Tip/Tip';
import SecondTip from './subView/Tip/SecondTip';
import Track from './subView/Track/Track';
import SubView from './subView/baseClasses/abstractSubView/abstractSubView';

import EventCreator from '../EventCreator/EventCreator';

type SubViewComponents =
  | Handle
  | SecondHandle
  | Tip
  | SecondTip
  | Scale
  | Track
  | SubView;

class View extends EventCreator<ViewEvent, ViewEventCallBack> {
  public nodeElem: HTMLElement;

  public slider!: HTMLElement;

  public components: Array<SubViewComponents>;

  private state: State;

  constructor(nodeElem: HTMLElement) {
    super();
    this.state = { ...defaultState };
    this.nodeElem = nodeElem;
    this.components = [];
    this.init();
  }

  public setState(state: State) {
    this.state = { ...this.state, ...state };
    this.update(this.state);
    this.checkTips();
    this.checkScale();
  }

  public rebuildSlider(state: State) {
    this.components = [];
    this.slider.innerHTML = '';
    this.createComponents(state);
    this.bindEventListener();
  }

  private init() {
    this.createSlider();
    this.registerEvent('updateView');
  }

  private createSlider() {
    this.slider = document.createElement('div');
    this.slider.classList.add('jq-slider');
    this.nodeElem.appendChild(this.slider);
  }

  private createComponents(state: Data) {
    const { range, tip, scale, horizontal } = state;

    this.components.push(new Handle(this.slider));
    this.components.push(new Track(this.slider));

    if (tip) {
      this.components.push(new Tip(this.slider));
    }

    if (range) {
      this.components.push(new SecondHandle(this.slider));
    }

    if (range && tip) {
      this.components.push(new SecondTip(this.slider));
    }

    if (scale) {
      this.components.push(new Scale(this.slider));
    }

    if (horizontal) {
      this.slider.classList.add('jq-slider_horizontal');
    } else {
      this.slider.classList.remove('jq-slider_horizontal');
    }
  }

  private bindEventListener() {
    this.handleSubViewEvent = this.handleSubViewEvent.bind(this);

    this.components.forEach((component) => {
      if (component.events.updateSubView) {
        component.addEventListener('updateSubView', this.handleSubViewEvent);
      }
    });
  }

  private handleSubViewEvent(e: SubViewEvent) {
    const size = this.state.horizontal
      ? this.slider.getBoundingClientRect().height
      : this.slider.getBoundingClientRect().width;

    const { min, max } = this.state;

    if (e.target === 'from') {
      this.dispatchEvent('updateView', {
        from: convertPixelInValue(min, max, size, e.position),
      });
    }

    if (e.target === 'to') {
      this.dispatchEvent('updateView', {
        to: convertPixelInValue(min, max, size, e.position),
      });
    }

    if (e.target === 'track' || e.target === 'scale') {
      const handles = this.getArrOfConcreteSubView(Handle);
      const from = handles[0].getPosition();
      if (!this.state.range) {
        this.dispatchEvent('updateView', {
          from: convertPixelInValue(min, max, size, e.position),
        });
        return;
      }

      const to = handles[1].getPosition();
      if (Math.abs(from - e.position) <= to - e.position) {
        this.dispatchEvent('updateView', {
          from: convertPixelInValue(min, max, size, e.position),
        });
        return;
      }

      this.dispatchEvent('updateView', {
        to: convertPixelInValue(min, max, size, e.position),
      });
    }
  }

  private checkTips() {
    const { tip, range, horizontal } = this.state;
    if (!(tip && range)) {
      return;
    }

    const tips = this.getArrOfConcreteSubView<Tip>(Tip);

    const sizeOfFirstTip = horizontal
      ? tips[0].subView.getBoundingClientRect().height
      : tips[1].subView.getBoundingClientRect().width;
    const sizeOfSecondTip = horizontal
      ? tips[1].subView.getBoundingClientRect().height
      : tips[1].subView.getBoundingClientRect().width;

    const firstPosition = tips[0].getPosition() + sizeOfFirstTip;
    const secondPosition = tips[1].getPosition();
    const isTouched = secondPosition - firstPosition < sizeOfSecondTip;

    tips.forEach((t) => {
      t.changeIsDouble(isTouched);
      t.setState(this.state);
    });
  }

  private checkScale() {
    const { scale: s, tip, range } = this.state;

    if (!(s && tip)) return;

    const [scale] = this.getArrOfConcreteSubView<Scale>(Scale);
    const tips = this.getArrOfConcreteSubView<Tip>(Tip);
    const scaleStart = scale.getPosition();
    const scaleEnd = scaleStart + scale.getSize();

    const isFromNearbyStart =
      scaleStart - tips[0].getPosition() + tips[0].getSize() > 0;
    const isFromNearbyEnd =
      scaleEnd - tips[0].getPosition() - tips[0].getSize() * 2 < 0;

    scale.visibilitySwitcher('first', isFromNearbyStart);
    scale.visibilitySwitcher('last', isFromNearbyEnd);

    if (range) {
      const isToNearbyEnd =
        scaleEnd - tips[1].getPosition() - tips[1].getSize() * 2 < 0;
      scale.visibilitySwitcher('last', isToNearbyEnd);
    }
  }

  private update(state: State) {
    this.components.forEach((component) => component.setState(state));
  }

  private getArrOfConcreteSubView<T extends SubViewComponents = SubView>(
    instance: Function,
  ): Array<T> {
    return this.components.filter(
      (component) => component instanceof instance,
    ) as T[];
  }
}

export default View;
