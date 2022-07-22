/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./slider.scss":
/*!*********************!*\
  !*** ./slider.scss ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./app.ts":
/*!****************!*\
  !*** ./app.ts ***!
  \****************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* eslint-disable fsd/no-function-declaration-in-event-listener */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Presenter_1 = __importDefault(__webpack_require__(/*! components/Presenter/Presenter */ "./components/Presenter/Presenter.ts"));
__webpack_require__(/*! ./slider.scss */ "./slider.scss");
const methods = {
    init(state) {
        return this.each(function () {
            const isInit = typeof state === 'object' && !$(this).data('jqSlider');
            if (isInit) {
                $(this).data().jqSlider = new Presenter_1.default(this, state);
            }
        });
    },
    update(state) {
        this.each(function () {
            const jqSlider = $(this).data('jqSlider');
            jqSlider.model.setState(state);
        });
    },
    getState() {
        const jqSlider = $(this).data('jqSlider');
        const state = jqSlider.model.getState();
        return state;
    },
    onChange(callback) {
        this.each(function () {
            const jqSlider = $(this).data('jqSlider');
            jqSlider.addEventListener('onChange', (e) => callback(e));
        });
    },
};
$.fn.jqSlider = function (...args) {
    if (args.length <= 0) {
        const state = {};
        return methods.init.call(this, state);
    }
    if (typeof args[0] === 'object') {
        const state = args[0] ? args[0] : {};
        return methods.init.call(this, state);
    }
    const isGetState = args.length === 1 && args[0] === 'getState';
    if (isGetState) {
        return methods.getState.call(this);
    }
    const isBindEventListener = args.length >= 2 && args[0] === 'onChange';
    if (isBindEventListener && typeof args[1] === 'function') {
        const callback = args[1];
        return methods.onChange.call(this, callback);
    }
    const isUpdate = args.length >= 2 && args[0] === 'update' && typeof args[1] === 'object';
    if (isUpdate) {
        const state = args[1];
        return methods.update.call(this, state);
    }
    return $.error('This method does not exist');
};


/***/ }),

/***/ "./components/EventCreator/EventCreator.ts":
/*!*************************************************!*\
  !*** ./components/EventCreator/EventCreator.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const MyEvent_1 = __importDefault(__webpack_require__(/*! ./MyEvent */ "./components/EventCreator/MyEvent.ts"));
// eslint-disable-next-line no-unused-vars
class EventCreator {
    constructor() {
        this.events = {};
    }
    registerEvent(eventName) {
        const event = new MyEvent_1.default(eventName);
        this.events[eventName] = event;
    }
    dispatchEvent(eventName, eventArgs) {
        this.events[eventName].callbacks.forEach((callback) => {
            callback(eventArgs);
        });
    }
    addEventListener(eventName, callback) {
        this.events[eventName].registerCallback(callback);
    }
}
exports["default"] = EventCreator;


/***/ }),

/***/ "./components/EventCreator/MyEvent.ts":
/*!********************************************!*\
  !*** ./components/EventCreator/MyEvent.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class MyEvent {
    constructor(name) {
        this.name = name;
        this.callbacks = [];
    }
    registerCallback(callback) {
        this.callbacks.push(callback);
    }
}
exports["default"] = MyEvent;


/***/ }),

/***/ "./components/Model/Model.ts":
/*!***********************************!*\
  !*** ./components/Model/Model.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const defaultState_1 = __importDefault(__webpack_require__(/*! defaultState/defaultState */ "./defaultState/defaultState.ts"));
const calcUtils_1 = __webpack_require__(/*! utils/calcUtils */ "./utils/calcUtils.ts");
const EventCreator_1 = __importDefault(__webpack_require__(/*! ../EventCreator/EventCreator */ "./components/EventCreator/EventCreator.ts"));
class Model extends EventCreator_1.default {
    constructor(state) {
        super();
        this.state = Object.assign({}, defaultState_1.default);
        this.init(state);
    }
    setState(state) {
        const [values, settings] = this.splitParams(state);
        const isUpdateSettings = Object.keys(settings).length > 0;
        if (isUpdateSettings) {
            this.state = Object.assign(Object.assign({}, this.state), this.minMaxValidator(settings));
            this.dispatchEvent('updateSettings', this.state);
        }
        this.state = Object.assign(Object.assign({}, this.state), this.rangeFromToValidator(this.stepValidator(values)));
        this.dispatchEvent('updateValues', this.state);
    }
    getState() {
        return this.state;
    }
    init(state) {
        this.registerEvent('updateValues');
        this.registerEvent('updateSettings');
        this.setState(state);
    }
    splitParams(data) {
        const values = {};
        const settings = {};
        if ('from' in data) {
            values.from = data.from;
        }
        else {
            values.from = this.state.from;
        }
        if ('to' in data) {
            values.to = data.to;
        }
        else {
            values.to = this.state.to;
        }
        if (data.step !== undefined && data.step > 0)
            settings.step = data.step;
        if (data.min !== undefined)
            settings.min = data.min;
        if (data.max !== undefined)
            settings.max = data.max;
        if (data.scale !== undefined)
            settings.scale = data.scale;
        if (data.range !== undefined)
            settings.range = data.range;
        if (data.tip !== undefined)
            settings.tip = data.tip;
        if (data.progress !== undefined)
            settings.progress = data.progress;
        if (data.horizontal !== undefined)
            settings.horizontal = data.horizontal;
        if (data.scaleDestiny !== undefined)
            settings.scaleDestiny = data.scaleDestiny <= 0 ? 1 : data.scaleDestiny;
        return [values, settings];
    }
    minMaxValidator(data) {
        let { min = this.state.min } = data;
        const { max = this.state.max } = data;
        if (min > max)
            min = max;
        return Object.assign(Object.assign({}, data), { min, max });
    }
    stepValidator(data) {
        const copyOfData = Object.assign({}, data);
        if (copyOfData.from !== undefined) {
            copyOfData.from = this.checkStep(copyOfData.from);
            if (copyOfData.from <= this.state.min) {
                copyOfData.from = this.state.min;
            }
            else if (copyOfData.from >= this.state.max) {
                copyOfData.from = this.state.max;
            }
        }
        if (copyOfData.to !== undefined) {
            copyOfData.to = this.checkStep(copyOfData.to);
            if (copyOfData.to <= this.state.min) {
                copyOfData.to = this.state.min;
            }
            else if (copyOfData.to >= this.state.max) {
                copyOfData.to = this.state.max;
            }
        }
        return copyOfData;
    }
    checkStep(value) {
        const { min, max, step } = this.state;
        if (max - min <= 0) {
            return 0;
        }
        const interval = max - min;
        const stepInPercent = 100 / (interval / step);
        const valueInPercent = (0, calcUtils_1.convertValueInPercent)(min, max, value);
        return +(0, calcUtils_1.convertPercentInValue)(min, max, Math.round(valueInPercent / stepInPercent) * stepInPercent).toFixed(2);
    }
    rangeFromToValidator(data) {
        if (!this.state.range) {
            return data;
        }
        const copyOfSData = Object.assign({}, data);
        if (copyOfSData.from !== undefined && copyOfSData.to !== undefined) {
            const isFromNotValidly = this.state.to - copyOfSData.from <= 0;
            const isToNotValidly = copyOfSData.to - this.state.from <= 0;
            if (isFromNotValidly)
                copyOfSData.from = this.state.to;
            if (isToNotValidly)
                copyOfSData.to = this.state.from;
            if (copyOfSData.to > this.state.max)
                copyOfSData.to = this.state.max;
            if (copyOfSData.from < this.state.min)
                copyOfSData.from = this.state.min;
        }
        return copyOfSData;
    }
}
exports["default"] = Model;


/***/ }),

/***/ "./components/Presenter/Presenter.ts":
/*!*******************************************!*\
  !*** ./components/Presenter/Presenter.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Model_1 = __importDefault(__webpack_require__(/*! ../Model/Model */ "./components/Model/Model.ts"));
const View_1 = __importDefault(__webpack_require__(/*! ../View/View */ "./components/View/View.ts"));
const EventCreator_1 = __importDefault(__webpack_require__(/*! ../EventCreator/EventCreator */ "./components/EventCreator/EventCreator.ts"));
// eslint-disable-next-line no-unused-vars
class Presenter extends EventCreator_1.default {
    constructor(nodeElem, state) {
        super();
        this.view = new View_1.default(nodeElem);
        this.model = new Model_1.default(state);
        this.registerEvent('onChange');
        this.init();
    }
    init() {
        this.view.setState(this.model.getState());
        this.bindEventListeners();
    }
    bindEventListeners() {
        this.handleViewEvent = this.handleViewEvent.bind(this);
        this.handleModelUpdateValues = this.handleModelUpdateValues.bind(this);
        this.handleModelUpdateSettings = this.handleModelUpdateSettings.bind(this);
        this.view.addEventListener('updateView', this.handleViewEvent);
        this.model.addEventListener('updateValues', this.handleModelUpdateValues);
        this.model.addEventListener('updateSettings', this.handleModelUpdateSettings);
    }
    handleViewEvent(e) {
        this.model.setState(e);
    }
    handleModelUpdateValues(e) {
        this.dispatchEvent('onChange', e);
        this.view.setState(e);
    }
    handleModelUpdateSettings(e) {
        this.dispatchEvent('onChange', e);
        this.view.rebuildSlider(e);
    }
}
exports["default"] = Presenter;


/***/ }),

/***/ "./components/View/View.ts":
/*!*********************************!*\
  !*** ./components/View/View.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const calcUtils_1 = __webpack_require__(/*! utils/calcUtils */ "./utils/calcUtils.ts");
const defaultState_1 = __importDefault(__webpack_require__(/*! defaultState/defaultState */ "./defaultState/defaultState.ts"));
const Handle_1 = __importDefault(__webpack_require__(/*! ./subView/Handle/Handle */ "./components/View/subView/Handle/Handle.ts"));
const SecondHandle_1 = __importDefault(__webpack_require__(/*! ./subView/Handle/SecondHandle */ "./components/View/subView/Handle/SecondHandle.ts"));
const Scale_1 = __importDefault(__webpack_require__(/*! ./subView/Scale/Scale */ "./components/View/subView/Scale/Scale.ts"));
const Tip_1 = __importDefault(__webpack_require__(/*! ./subView/Tip/Tip */ "./components/View/subView/Tip/Tip.ts"));
const SecondTip_1 = __importDefault(__webpack_require__(/*! ./subView/Tip/SecondTip */ "./components/View/subView/Tip/SecondTip.ts"));
const Track_1 = __importDefault(__webpack_require__(/*! ./subView/Track/Track */ "./components/View/subView/Track/Track.ts"));
const EventCreator_1 = __importDefault(__webpack_require__(/*! ../EventCreator/EventCreator */ "./components/EventCreator/EventCreator.ts"));
class View extends EventCreator_1.default {
    constructor(nodeElem) {
        super();
        this.state = Object.assign({}, defaultState_1.default);
        this.nodeElem = nodeElem;
        this.components = [];
        this.init();
    }
    setState(state) {
        this.state = Object.assign(Object.assign({}, this.state), state);
        this.update(this.state);
        this.checkTips();
        this.checkScale();
    }
    rebuildSlider(state) {
        this.components = [];
        this.slider.innerHTML = '';
        this.createComponents(state);
        this.bindEventListener();
    }
    init() {
        this.createSlider();
        this.registerEvent('updateView');
    }
    createSlider() {
        this.slider = document.createElement('div');
        this.slider.classList.add('jq-slider');
        this.nodeElem.appendChild(this.slider);
    }
    createComponents(state) {
        const { range, tip, scale, horizontal } = state;
        this.components.push(new Handle_1.default(this.slider));
        this.components.push(new Track_1.default(this.slider));
        if (tip) {
            this.components.push(new Tip_1.default(this.slider));
        }
        if (range) {
            this.components.push(new SecondHandle_1.default(this.slider));
        }
        if (range && tip) {
            this.components.push(new SecondTip_1.default(this.slider));
        }
        if (scale) {
            this.components.push(new Scale_1.default(this.slider));
        }
        if (horizontal) {
            this.slider.classList.add('jq-slider_horizontal');
        }
        else {
            this.slider.classList.remove('jq-slider_horizontal');
        }
    }
    bindEventListener() {
        this.handleSubViewEvent = this.handleSubViewEvent.bind(this);
        this.components.forEach((component) => {
            if (component.events.updateSubView) {
                component.addEventListener('updateSubView', this.handleSubViewEvent);
            }
        });
    }
    handleSubViewEvent(e) {
        const size = this.state.horizontal
            ? this.slider.getBoundingClientRect().height
            : this.slider.getBoundingClientRect().width;
        const { min, max } = this.state;
        if (e.target === 'from') {
            this.dispatchEvent('updateView', {
                from: (0, calcUtils_1.convertPixelInValue)(min, max, size, e.position),
            });
        }
        if (e.target === 'to') {
            this.dispatchEvent('updateView', {
                to: (0, calcUtils_1.convertPixelInValue)(min, max, size, e.position),
            });
        }
        if (e.target === 'track' || e.target === 'scale') {
            const handles = this.getArrOfConcreteSubView(Handle_1.default);
            const from = handles[0].getPosition();
            if (!this.state.range) {
                this.dispatchEvent('updateView', {
                    from: (0, calcUtils_1.convertPixelInValue)(min, max, size, e.position),
                });
                return;
            }
            const to = handles[1].getPosition();
            if (Math.abs(from - e.position) <= to - e.position) {
                this.dispatchEvent('updateView', {
                    from: (0, calcUtils_1.convertPixelInValue)(min, max, size, e.position),
                });
                return;
            }
            this.dispatchEvent('updateView', {
                to: (0, calcUtils_1.convertPixelInValue)(min, max, size, e.position),
            });
        }
    }
    checkTips() {
        const { tip, range, horizontal } = this.state;
        if (!(tip && range)) {
            return;
        }
        const tips = this.getArrOfConcreteSubView(Tip_1.default);
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
    checkScale() {
        const { scale: s, tip, range } = this.state;
        if (!(s && tip))
            return;
        const [scale] = this.getArrOfConcreteSubView(Scale_1.default);
        const tips = this.getArrOfConcreteSubView(Tip_1.default);
        const scaleStart = scale.getPosition();
        const scaleEnd = scaleStart + scale.getSize();
        const isFromNearbyStart = scaleStart - tips[0].getPosition() + tips[0].getSize() > 0;
        const isFromNearbyEnd = scaleEnd - tips[0].getPosition() - tips[0].getSize() * 2 < 0;
        scale.visibilitySwitcher('first', isFromNearbyStart);
        scale.visibilitySwitcher('last', isFromNearbyEnd);
        if (range) {
            const isToNearbyEnd = scaleEnd - tips[1].getPosition() - tips[1].getSize() * 2 < 0;
            scale.visibilitySwitcher('last', isToNearbyEnd);
        }
    }
    update(state) {
        this.components.forEach((component) => component.setState(state));
    }
    getArrOfConcreteSubView(instance) {
        return this.components.filter((component) => component instanceof instance);
    }
}
exports["default"] = View;


/***/ }),

/***/ "./components/View/subView/Handle/Handle.ts":
/*!**************************************************!*\
  !*** ./components/View/subView/Handle/Handle.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const MovableSubView_1 = __importDefault(__webpack_require__(/*! ../baseClasses/MovableSubView/MovableSubView */ "./components/View/subView/baseClasses/MovableSubView/MovableSubView.ts"));
class Handle extends MovableSubView_1.default {
    getPosition() {
        if (this.state.horizontal) {
            const subViewTop = this.subView.getBoundingClientRect().top;
            const sliderTop = this.slider.getBoundingClientRect().top;
            return subViewTop - sliderTop + this.subView.offsetHeight / 2;
        }
        const subViewLeft = this.subView.getBoundingClientRect().left;
        const sliderLeft = this.slider.getBoundingClientRect().left;
        return subViewLeft - sliderLeft + this.subView.offsetWidth / 2;
    }
    createSubView() {
        super.createSubView();
        this.subView.classList.add('jq-slider__handle');
        this.subView.style.zIndex = '5';
    }
}
exports["default"] = Handle;


/***/ }),

/***/ "./components/View/subView/Handle/SecondHandle.ts":
/*!********************************************************!*\
  !*** ./components/View/subView/Handle/SecondHandle.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Handle_1 = __importDefault(__webpack_require__(/*! ./Handle */ "./components/View/subView/Handle/Handle.ts"));
class SecondHandle extends Handle_1.default {
    constructor(slider) {
        super(slider);
        this.role = 'to';
    }
    update() {
        const size = this.state.horizontal
            ? this.slider.clientHeight
            : this.slider.clientWidth;
        if (this.getPosition() > size / 2) {
            this.subView.style.zIndex = '4';
        }
        else {
            this.subView.style.zIndex = '6';
        }
        super.update();
    }
}
exports["default"] = SecondHandle;


/***/ }),

/***/ "./components/View/subView/Scale/Scale.ts":
/*!************************************************!*\
  !*** ./components/View/subView/Scale/Scale.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const calcUtils_1 = __webpack_require__(/*! utils/calcUtils */ "./utils/calcUtils.ts");
const abstractSubView_1 = __importDefault(__webpack_require__(/*! ../baseClasses/abstractSubView/abstractSubView */ "./components/View/subView/baseClasses/abstractSubView/abstractSubView.ts"));
class Scale extends abstractSubView_1.default {
    constructor(slider) {
        super(slider);
        this.init();
    }
    setState(state) {
        const scaleStetting = [
            'min',
            'max',
            'horizontal',
            'scaleDestiny',
            'step',
        ];
        const isChangedScaleSettings = scaleStetting.reduce((flag, key) => {
            if (state[key] !== this.state[key]) {
                return true;
            }
            return flag;
        }, false);
        if (isChangedScaleSettings) {
            super.setState(state);
        }
    }
    init() {
        this.createSubView();
        this.registerEvent('updateSubView');
    }
    visibilitySwitcher(positionInScale, visible) {
        const pips = this.subView.querySelectorAll('.jq-slider__scale-label');
        if (positionInScale === 'first' && pips[0] instanceof HTMLElement) {
            // eslint-disable-next-line no-unused-expressions
            visible
                ? pips[0].classList.add('js-slider__scale-label_hidden')
                : pips[0].classList.remove('js-slider__scale-label_hidden');
        }
        const numberOfLastPip = pips.length - 1;
        if (positionInScale === 'last' &&
            pips[numberOfLastPip] instanceof HTMLElement) {
            // eslint-disable-next-line no-unused-expressions
            visible
                ? pips[numberOfLastPip].classList.add('js-slider__scale-label_hidden')
                : pips[numberOfLastPip].classList.remove('js-slider__scale-label_hidden');
        }
    }
    createSubView() {
        this.subView = document.createElement('div');
        this.subView.classList.add('jq-slider__scale');
        this.slider.appendChild(this.subView);
    }
    update() {
        const { min, max, step, horizontal, scaleDestiny } = this.state;
        let pips = [];
        for (let pip = min; pip < max; pip += step < 1 ? 1 : step) {
            pips.push(this.createPipFragment(min, max, pip));
        }
        const maxSymbolsInPip = Math.abs(min) > Math.abs(max)
            ? min.toString().length
            : max.toString().length;
        const sizeOfPip = horizontal
            ? this.slider.getBoundingClientRect().height / 20
            : this.slider.getBoundingClientRect().width / (maxSymbolsInPip * 10);
        if (pips.length > sizeOfPip) {
            pips = pips.filter((_pip, i) => i % Math.round(pips.length / sizeOfPip) === 0);
        }
        pips = pips.filter((_pip, i) => i % scaleDestiny === 0);
        pips.push(this.createPipFragment(min, max, max));
        this.subView.innerHTML = pips.join(' ');
        this.bindEventListener();
    }
    createPipFragment(min, max, value) {
        if (this.state.horizontal) {
            return `
      <div class="jq-slider__scale-pip" style="top:${(0, calcUtils_1.convertPercentInValue)(0, this.slider.clientHeight, (0, calcUtils_1.convertValueInPercent)(min, max, value))}px">
        <div class="jq-slider__scale-label">${value.toFixed(0)}</div>
      </div>`;
        }
        return `
      <div class="jq-slider__scale-pip" style="left:${(0, calcUtils_1.convertValueInPercent)(min, max, value)}%">
        <div class="jq-slider__scale-label">${value.toFixed(0)}</div>
      </div>`;
    }
    bindEventListener() {
        this.handleScaleLabelCLick = this.handleScaleLabelCLick.bind(this);
        this.subView.querySelectorAll('.jq-slider__scale-label').forEach((pip) => {
            if (pip instanceof HTMLElement) {
                pip.addEventListener('click', this.handleScaleLabelCLick);
            }
        });
    }
    handleScaleLabelCLick(e) {
        const { min, max, horizontal } = this.state;
        if (!(e.target instanceof HTMLElement)) {
            return;
        }
        const onePercent = horizontal
            ? this.slider.getBoundingClientRect().height / 100
            : this.slider.getBoundingClientRect().width / 100;
        const percents = horizontal
            ? (0, calcUtils_1.convertValueInPercent)(min, max, +e.target.innerHTML)
            : (0, calcUtils_1.convertValueInPercent)(min, max, +e.target.innerHTML);
        let position = onePercent * percents;
        if (position === 0) {
            const sliderSize = horizontal
                ? this.slider.getBoundingClientRect().height
                : this.slider.getBoundingClientRect().width;
            position = this.getPosition() - sliderSize;
        }
        this.dispatchEvent('updateSubView', { target: 'scale', position });
    }
}
exports["default"] = Scale;


/***/ }),

/***/ "./components/View/subView/Tip/SecondTip.ts":
/*!**************************************************!*\
  !*** ./components/View/subView/Tip/SecondTip.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Tip_1 = __importDefault(__webpack_require__(/*! ./Tip */ "./components/View/subView/Tip/Tip.ts"));
class SecondTip extends Tip_1.default {
    constructor(slider) {
        super(slider);
        this.role = 'to';
    }
    update() {
        super.update();
        const { to } = this.state;
        if (this.isDouble) {
            this.subView.style.opacity = '0';
        }
        else {
            this.subView.style.opacity = '1';
        }
        this.subView.textContent = to.toString();
    }
}
exports["default"] = SecondTip;


/***/ }),

/***/ "./components/View/subView/Tip/Tip.ts":
/*!********************************************!*\
  !*** ./components/View/subView/Tip/Tip.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const MovableSubView_1 = __importDefault(__webpack_require__(/*! ../baseClasses/MovableSubView/MovableSubView */ "./components/View/subView/baseClasses/MovableSubView/MovableSubView.ts"));
class Tip extends MovableSubView_1.default {
    constructor(slider) {
        super(slider);
        this.isDouble = false;
    }
    changeIsDouble(value) {
        this.isDouble = value;
    }
    createSubView() {
        super.createSubView();
        this.subView.classList.add('jq-slider__tip');
        this.subView.style.zIndex = '5';
    }
    update() {
        super.update();
        const { from, to } = this.state;
        this.subView.textContent = this.isDouble
            ? `${from} - ${to}`
            : from.toString();
    }
}
exports["default"] = Tip;


/***/ }),

/***/ "./components/View/subView/Track/Track.ts":
/*!************************************************!*\
  !*** ./components/View/subView/Track/Track.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const calcUtils_1 = __webpack_require__(/*! utils/calcUtils */ "./utils/calcUtils.ts");
const abstractSubView_1 = __importDefault(__webpack_require__(/*! ../baseClasses/abstractSubView/abstractSubView */ "./components/View/subView/baseClasses/abstractSubView/abstractSubView.ts"));
class Track extends abstractSubView_1.default {
    constructor(slider) {
        super(slider);
        this.init();
    }
    createSubView() {
        this.subView = document.createElement('div');
        this.subView.classList.add('jq-slider__track');
        this.progress = document.createElement('div');
        this.progress.classList.add('jq-slider__progress');
        this.subView.appendChild(this.progress);
        this.slider.appendChild(this.subView);
    }
    init() {
        this.createSubView();
        this.registerEvent('updateSubView');
        this.bindEventListener();
    }
    update() {
        const { min, max, from, to, horizontal, range, progress } = this.state;
        if (!progress) {
            this.progress.remove();
            return;
        }
        const start = (0, calcUtils_1.convertValueInPercent)(min, max, from);
        const end = (0, calcUtils_1.convertValueInPercent)(min, max, to);
        if (horizontal && range) {
            const height = end - start;
            const onePercent = this.slider.clientHeight / 100;
            this.progress.style.height = `${height}%`;
            this.progress.style.marginTop = `${onePercent * start}px`;
            return;
        }
        if (horizontal && !range) {
            this.progress.style.height = `${start}%`;
            return;
        }
        if (range) {
            const width = end - start;
            this.progress.style.width = `${width}%`;
            this.progress.style.marginLeft = `${start}%`;
        }
        else {
            this.progress.style.width = `${start}%`;
        }
    }
    bindEventListener() {
        this.handleTrackClick = this.handleTrackClick.bind(this);
        this.subView.addEventListener('click', this.handleTrackClick);
    }
    handleTrackClick(e) {
        this.dispatchEvent('updateSubView', {
            target: 'track',
            position: this.state.horizontal
                ? e.clientY - this.slider.getBoundingClientRect().top
                : e.clientX - this.slider.getBoundingClientRect().left,
        });
    }
}
exports["default"] = Track;


/***/ }),

/***/ "./components/View/subView/baseClasses/MovableSubView/MovableSubView.ts":
/*!******************************************************************************!*\
  !*** ./components/View/subView/baseClasses/MovableSubView/MovableSubView.ts ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const calcUtils_1 = __webpack_require__(/*! utils/calcUtils */ "./utils/calcUtils.ts");
const abstractSubView_1 = __importDefault(__webpack_require__(/*! ../abstractSubView/abstractSubView */ "./components/View/subView/baseClasses/abstractSubView/abstractSubView.ts"));
class MovableSubView extends abstractSubView_1.default {
    constructor(slider) {
        super(slider);
        this.role = 'from';
        this.init();
    }
    init() {
        this.createSubView();
        this.registerEvent('updateSubView');
        this.bindEventListener();
    }
    handleSubViewPointermove(e) {
        this.dispatchEvent('updateSubView', {
            target: this.role,
            position: this.state.horizontal
                ? e.clientY - this.slider.getBoundingClientRect().top
                : e.clientX - this.slider.getBoundingClientRect().left,
        });
    }
    createSubView() {
        this.subView = document.createElement('div');
        this.slider.appendChild(this.subView);
    }
    update() {
        const { min, max, from, to, horizontal } = this.state;
        const value = this.role === 'from' ? from : to;
        if (horizontal) {
            this.subView.style.top = `${(0, calcUtils_1.convertValueInPercent)(min, max, value)}%`;
        }
        else {
            this.subView.style.left = `${(0, calcUtils_1.convertValueInPercent)(min, max, value)}%`;
        }
    }
    bindEventListener() {
        this.handleSubViewPointerdown = this.handleSubViewPointerdown.bind(this);
        this.subView.addEventListener('pointerdown', this.handleSubViewPointerdown);
    }
    handleSubViewPointerdown() {
        this.handleSubViewPointermove = this.handleSubViewPointermove.bind(this);
        this.handleSubViewPointerup = this.handleSubViewPointerup.bind(this);
        window.addEventListener('pointermove', this.handleSubViewPointermove);
        window.addEventListener('pointerup', this.handleSubViewPointerup);
    }
    handleSubViewPointerup() {
        window.removeEventListener('pointermove', this.handleSubViewPointermove);
    }
}
exports["default"] = MovableSubView;


/***/ }),

/***/ "./components/View/subView/baseClasses/abstractSubView/abstractSubView.ts":
/*!********************************************************************************!*\
  !*** ./components/View/subView/baseClasses/abstractSubView/abstractSubView.ts ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const EventCreator_1 = __importDefault(__webpack_require__(/*! components/EventCreator/EventCreator */ "./components/EventCreator/EventCreator.ts"));
const defaultState_1 = __importDefault(__webpack_require__(/*! defaultState/defaultState */ "./defaultState/defaultState.ts"));
class SubView extends EventCreator_1.default {
    constructor(slider) {
        super();
        this.slider = slider;
        this.state = Object.assign({}, defaultState_1.default);
    }
    getPosition() {
        if (this.state.horizontal) {
            return this.subView.getBoundingClientRect().top;
        }
        return this.subView.getBoundingClientRect().left;
    }
    getSize() {
        if (this.state.horizontal) {
            return this.subView.getBoundingClientRect().height;
        }
        return this.subView.getBoundingClientRect().width;
    }
    setState(state) {
        this.state = Object.assign(Object.assign({}, this.state), state);
        this.update();
    }
}
exports["default"] = SubView;


/***/ }),

/***/ "./defaultState/defaultState.ts":
/*!**************************************!*\
  !*** ./defaultState/defaultState.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const defaultState = {
    min: 0,
    max: 100,
    from: 0,
    to: 100,
    step: 1,
    tip: false,
    range: false,
    progress: false,
    scale: false,
    scaleDestiny: 10,
    horizontal: false,
};
exports["default"] = defaultState;


/***/ }),

/***/ "./utils/calcUtils.ts":
/*!****************************!*\
  !*** ./utils/calcUtils.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertPixelInValue = exports.convertPercentInValue = exports.convertPixelInPercent = exports.convertValueInPercent = void 0;
/* eslint-disable no-mixed-operators */
function convertValueInPercent(min, max, value) {
    return (100 / (max - min)) * (value - min);
}
exports.convertValueInPercent = convertValueInPercent;
function convertPixelInPercent(width, value) {
    return (100 / width) * value;
}
exports.convertPixelInPercent = convertPixelInPercent;
function convertPercentInValue(min, max, percent) {
    return ((max - min) / 100) * percent + min;
}
exports.convertPercentInValue = convertPercentInValue;
function convertPixelInValue(min, max, width, value) {
    return convertPercentInValue(min, max, convertPixelInPercent(width, value));
}
exports.convertPixelInValue = convertPixelInValue;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./app.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7Ozs7Ozs7VUNuQjNCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NsaWRlci5zY3NzPzBiYTkiLCJ3ZWJwYWNrOi8vLy4vYXBwLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvRXZlbnRDcmVhdG9yL0V2ZW50Q3JlYXRvci50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0V2ZW50Q3JlYXRvci9NeUV2ZW50LnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvTW9kZWwvTW9kZWwudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9QcmVzZW50ZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvVmlldy9WaWV3LnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvVmlldy9zdWJWaWV3L0hhbmRsZS9IYW5kbGUudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9WaWV3L3N1YlZpZXcvSGFuZGxlL1NlY29uZEhhbmRsZS50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1ZpZXcvc3ViVmlldy9TY2FsZS9TY2FsZS50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1ZpZXcvc3ViVmlldy9UaXAvU2Vjb25kVGlwLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvVmlldy9zdWJWaWV3L1RpcC9UaXAudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9WaWV3L3N1YlZpZXcvVHJhY2svVHJhY2sudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9WaWV3L3N1YlZpZXcvYmFzZUNsYXNzZXMvTW92YWJsZVN1YlZpZXcvTW92YWJsZVN1YlZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9WaWV3L3N1YlZpZXcvYmFzZUNsYXNzZXMvYWJzdHJhY3RTdWJWaWV3L2Fic3RyYWN0U3ViVmlldy50cyIsIndlYnBhY2s6Ly8vLi9kZWZhdWx0U3RhdGUvZGVmYXVsdFN0YXRlLnRzIiwid2VicGFjazovLy8uL3V0aWxzL2NhbGNVdGlscy50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIlwidXNlIHN0cmljdFwiO1xuLyogZXNsaW50LWRpc2FibGUgZnNkL25vLWZ1bmN0aW9uLWRlY2xhcmF0aW9uLWluLWV2ZW50LWxpc3RlbmVyICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGZ1bmMtbmFtZXMgKi9cbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IFByZXNlbnRlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJjb21wb25lbnRzL1ByZXNlbnRlci9QcmVzZW50ZXJcIikpO1xucmVxdWlyZShcIi4vc2xpZGVyLnNjc3NcIik7XG5jb25zdCBtZXRob2RzID0ge1xuICAgIGluaXQoc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCBpc0luaXQgPSB0eXBlb2Ygc3RhdGUgPT09ICdvYmplY3QnICYmICEkKHRoaXMpLmRhdGEoJ2pxU2xpZGVyJyk7XG4gICAgICAgICAgICBpZiAoaXNJbml0KSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5kYXRhKCkuanFTbGlkZXIgPSBuZXcgUHJlc2VudGVyXzEuZGVmYXVsdCh0aGlzLCBzdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgdXBkYXRlKHN0YXRlKSB7XG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCBqcVNsaWRlciA9ICQodGhpcykuZGF0YSgnanFTbGlkZXInKTtcbiAgICAgICAgICAgIGpxU2xpZGVyLm1vZGVsLnNldFN0YXRlKHN0YXRlKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRTdGF0ZSgpIHtcbiAgICAgICAgY29uc3QganFTbGlkZXIgPSAkKHRoaXMpLmRhdGEoJ2pxU2xpZGVyJyk7XG4gICAgICAgIGNvbnN0IHN0YXRlID0ganFTbGlkZXIubW9kZWwuZ2V0U3RhdGUoKTtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH0sXG4gICAgb25DaGFuZ2UoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGpxU2xpZGVyID0gJCh0aGlzKS5kYXRhKCdqcVNsaWRlcicpO1xuICAgICAgICAgICAganFTbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignb25DaGFuZ2UnLCAoZSkgPT4gY2FsbGJhY2soZSkpO1xuICAgICAgICB9KTtcbiAgICB9LFxufTtcbiQuZm4uanFTbGlkZXIgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgIGlmIChhcmdzLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0ge307XG4gICAgICAgIHJldHVybiBtZXRob2RzLmluaXQuY2FsbCh0aGlzLCBzdGF0ZSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBhcmdzWzBdID8gYXJnc1swXSA6IHt9O1xuICAgICAgICByZXR1cm4gbWV0aG9kcy5pbml0LmNhbGwodGhpcywgc3RhdGUpO1xuICAgIH1cbiAgICBjb25zdCBpc0dldFN0YXRlID0gYXJncy5sZW5ndGggPT09IDEgJiYgYXJnc1swXSA9PT0gJ2dldFN0YXRlJztcbiAgICBpZiAoaXNHZXRTdGF0ZSkge1xuICAgICAgICByZXR1cm4gbWV0aG9kcy5nZXRTdGF0ZS5jYWxsKHRoaXMpO1xuICAgIH1cbiAgICBjb25zdCBpc0JpbmRFdmVudExpc3RlbmVyID0gYXJncy5sZW5ndGggPj0gMiAmJiBhcmdzWzBdID09PSAnb25DaGFuZ2UnO1xuICAgIGlmIChpc0JpbmRFdmVudExpc3RlbmVyICYmIHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrID0gYXJnc1sxXTtcbiAgICAgICAgcmV0dXJuIG1ldGhvZHMub25DaGFuZ2UuY2FsbCh0aGlzLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIGNvbnN0IGlzVXBkYXRlID0gYXJncy5sZW5ndGggPj0gMiAmJiBhcmdzWzBdID09PSAndXBkYXRlJyAmJiB0eXBlb2YgYXJnc1sxXSA9PT0gJ29iamVjdCc7XG4gICAgaWYgKGlzVXBkYXRlKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gYXJnc1sxXTtcbiAgICAgICAgcmV0dXJuIG1ldGhvZHMudXBkYXRlLmNhbGwodGhpcywgc3RhdGUpO1xuICAgIH1cbiAgICByZXR1cm4gJC5lcnJvcignVGhpcyBtZXRob2QgZG9lcyBub3QgZXhpc3QnKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IE15RXZlbnRfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9NeUV2ZW50XCIpKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuY2xhc3MgRXZlbnRDcmVhdG9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ldmVudHMgPSB7fTtcbiAgICB9XG4gICAgcmVnaXN0ZXJFdmVudChldmVudE5hbWUpIHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgTXlFdmVudF8xLmRlZmF1bHQoZXZlbnROYW1lKTtcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IGV2ZW50O1xuICAgIH1cbiAgICBkaXNwYXRjaEV2ZW50KGV2ZW50TmFtZSwgZXZlbnRBcmdzKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uY2FsbGJhY2tzLmZvckVhY2goKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayhldmVudEFyZ3MpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0ucmVnaXN0ZXJDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gRXZlbnRDcmVhdG9yO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBNeUV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzID0gW107XG4gICAgfVxuICAgIHJlZ2lzdGVyQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gTXlFdmVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZGVmYXVsdFN0YXRlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImRlZmF1bHRTdGF0ZS9kZWZhdWx0U3RhdGVcIikpO1xuY29uc3QgY2FsY1V0aWxzXzEgPSByZXF1aXJlKFwidXRpbHMvY2FsY1V0aWxzXCIpO1xuY29uc3QgRXZlbnRDcmVhdG9yXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL0V2ZW50Q3JlYXRvci9FdmVudENyZWF0b3JcIikpO1xuY2xhc3MgTW9kZWwgZXh0ZW5kcyBFdmVudENyZWF0b3JfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdFN0YXRlXzEuZGVmYXVsdCk7XG4gICAgICAgIHRoaXMuaW5pdChzdGF0ZSk7XG4gICAgfVxuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIGNvbnN0IFt2YWx1ZXMsIHNldHRpbmdzXSA9IHRoaXMuc3BsaXRQYXJhbXMoc3RhdGUpO1xuICAgICAgICBjb25zdCBpc1VwZGF0ZVNldHRpbmdzID0gT2JqZWN0LmtleXMoc2V0dGluZ3MpLmxlbmd0aCA+IDA7XG4gICAgICAgIGlmIChpc1VwZGF0ZVNldHRpbmdzKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlKSwgdGhpcy5taW5NYXhWYWxpZGF0b3Ioc2V0dGluZ3MpKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgndXBkYXRlU2V0dGluZ3MnLCB0aGlzLnN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlKSwgdGhpcy5yYW5nZUZyb21Ub1ZhbGlkYXRvcih0aGlzLnN0ZXBWYWxpZGF0b3IodmFsdWVzKSkpO1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ3VwZGF0ZVZhbHVlcycsIHRoaXMuc3RhdGUpO1xuICAgIH1cbiAgICBnZXRTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gICAgfVxuICAgIGluaXQoc3RhdGUpIHtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCd1cGRhdGVWYWx1ZXMnKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCd1cGRhdGVTZXR0aW5ncycpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHN0YXRlKTtcbiAgICB9XG4gICAgc3BsaXRQYXJhbXMoZGF0YSkge1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSB7fTtcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSB7fTtcbiAgICAgICAgaWYgKCdmcm9tJyBpbiBkYXRhKSB7XG4gICAgICAgICAgICB2YWx1ZXMuZnJvbSA9IGRhdGEuZnJvbTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlcy5mcm9tID0gdGhpcy5zdGF0ZS5mcm9tO1xuICAgICAgICB9XG4gICAgICAgIGlmICgndG8nIGluIGRhdGEpIHtcbiAgICAgICAgICAgIHZhbHVlcy50byA9IGRhdGEudG87XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZXMudG8gPSB0aGlzLnN0YXRlLnRvO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnN0ZXAgIT09IHVuZGVmaW5lZCAmJiBkYXRhLnN0ZXAgPiAwKVxuICAgICAgICAgICAgc2V0dGluZ3Muc3RlcCA9IGRhdGEuc3RlcDtcbiAgICAgICAgaWYgKGRhdGEubWluICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBzZXR0aW5ncy5taW4gPSBkYXRhLm1pbjtcbiAgICAgICAgaWYgKGRhdGEubWF4ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBzZXR0aW5ncy5tYXggPSBkYXRhLm1heDtcbiAgICAgICAgaWYgKGRhdGEuc2NhbGUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHNldHRpbmdzLnNjYWxlID0gZGF0YS5zY2FsZTtcbiAgICAgICAgaWYgKGRhdGEucmFuZ2UgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHNldHRpbmdzLnJhbmdlID0gZGF0YS5yYW5nZTtcbiAgICAgICAgaWYgKGRhdGEudGlwICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBzZXR0aW5ncy50aXAgPSBkYXRhLnRpcDtcbiAgICAgICAgaWYgKGRhdGEucHJvZ3Jlc3MgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHNldHRpbmdzLnByb2dyZXNzID0gZGF0YS5wcm9ncmVzcztcbiAgICAgICAgaWYgKGRhdGEuaG9yaXpvbnRhbCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgc2V0dGluZ3MuaG9yaXpvbnRhbCA9IGRhdGEuaG9yaXpvbnRhbDtcbiAgICAgICAgaWYgKGRhdGEuc2NhbGVEZXN0aW55ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBzZXR0aW5ncy5zY2FsZURlc3RpbnkgPSBkYXRhLnNjYWxlRGVzdGlueSA8PSAwID8gMSA6IGRhdGEuc2NhbGVEZXN0aW55O1xuICAgICAgICByZXR1cm4gW3ZhbHVlcywgc2V0dGluZ3NdO1xuICAgIH1cbiAgICBtaW5NYXhWYWxpZGF0b3IoZGF0YSkge1xuICAgICAgICBsZXQgeyBtaW4gPSB0aGlzLnN0YXRlLm1pbiB9ID0gZGF0YTtcbiAgICAgICAgY29uc3QgeyBtYXggPSB0aGlzLnN0YXRlLm1heCB9ID0gZGF0YTtcbiAgICAgICAgaWYgKG1pbiA+IG1heClcbiAgICAgICAgICAgIG1pbiA9IG1heDtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZGF0YSksIHsgbWluLCBtYXggfSk7XG4gICAgfVxuICAgIHN0ZXBWYWxpZGF0b3IoZGF0YSkge1xuICAgICAgICBjb25zdCBjb3B5T2ZEYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YSk7XG4gICAgICAgIGlmIChjb3B5T2ZEYXRhLmZyb20gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29weU9mRGF0YS5mcm9tID0gdGhpcy5jaGVja1N0ZXAoY29weU9mRGF0YS5mcm9tKTtcbiAgICAgICAgICAgIGlmIChjb3B5T2ZEYXRhLmZyb20gPD0gdGhpcy5zdGF0ZS5taW4pIHtcbiAgICAgICAgICAgICAgICBjb3B5T2ZEYXRhLmZyb20gPSB0aGlzLnN0YXRlLm1pbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNvcHlPZkRhdGEuZnJvbSA+PSB0aGlzLnN0YXRlLm1heCkge1xuICAgICAgICAgICAgICAgIGNvcHlPZkRhdGEuZnJvbSA9IHRoaXMuc3RhdGUubWF4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjb3B5T2ZEYXRhLnRvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvcHlPZkRhdGEudG8gPSB0aGlzLmNoZWNrU3RlcChjb3B5T2ZEYXRhLnRvKTtcbiAgICAgICAgICAgIGlmIChjb3B5T2ZEYXRhLnRvIDw9IHRoaXMuc3RhdGUubWluKSB7XG4gICAgICAgICAgICAgICAgY29weU9mRGF0YS50byA9IHRoaXMuc3RhdGUubWluO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY29weU9mRGF0YS50byA+PSB0aGlzLnN0YXRlLm1heCkge1xuICAgICAgICAgICAgICAgIGNvcHlPZkRhdGEudG8gPSB0aGlzLnN0YXRlLm1heDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29weU9mRGF0YTtcbiAgICB9XG4gICAgY2hlY2tTdGVwKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIHN0ZXAgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGlmIChtYXggLSBtaW4gPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaW50ZXJ2YWwgPSBtYXggLSBtaW47XG4gICAgICAgIGNvbnN0IHN0ZXBJblBlcmNlbnQgPSAxMDAgLyAoaW50ZXJ2YWwgLyBzdGVwKTtcbiAgICAgICAgY29uc3QgdmFsdWVJblBlcmNlbnQgPSAoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gKygwLCBjYWxjVXRpbHNfMS5jb252ZXJ0UGVyY2VudEluVmFsdWUpKG1pbiwgbWF4LCBNYXRoLnJvdW5kKHZhbHVlSW5QZXJjZW50IC8gc3RlcEluUGVyY2VudCkgKiBzdGVwSW5QZXJjZW50KS50b0ZpeGVkKDIpO1xuICAgIH1cbiAgICByYW5nZUZyb21Ub1ZhbGlkYXRvcihkYXRhKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5yYW5nZSkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29weU9mU0RhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhKTtcbiAgICAgICAgaWYgKGNvcHlPZlNEYXRhLmZyb20gIT09IHVuZGVmaW5lZCAmJiBjb3B5T2ZTRGF0YS50byAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBpc0Zyb21Ob3RWYWxpZGx5ID0gdGhpcy5zdGF0ZS50byAtIGNvcHlPZlNEYXRhLmZyb20gPD0gMDtcbiAgICAgICAgICAgIGNvbnN0IGlzVG9Ob3RWYWxpZGx5ID0gY29weU9mU0RhdGEudG8gLSB0aGlzLnN0YXRlLmZyb20gPD0gMDtcbiAgICAgICAgICAgIGlmIChpc0Zyb21Ob3RWYWxpZGx5KVxuICAgICAgICAgICAgICAgIGNvcHlPZlNEYXRhLmZyb20gPSB0aGlzLnN0YXRlLnRvO1xuICAgICAgICAgICAgaWYgKGlzVG9Ob3RWYWxpZGx5KVxuICAgICAgICAgICAgICAgIGNvcHlPZlNEYXRhLnRvID0gdGhpcy5zdGF0ZS5mcm9tO1xuICAgICAgICAgICAgaWYgKGNvcHlPZlNEYXRhLnRvID4gdGhpcy5zdGF0ZS5tYXgpXG4gICAgICAgICAgICAgICAgY29weU9mU0RhdGEudG8gPSB0aGlzLnN0YXRlLm1heDtcbiAgICAgICAgICAgIGlmIChjb3B5T2ZTRGF0YS5mcm9tIDwgdGhpcy5zdGF0ZS5taW4pXG4gICAgICAgICAgICAgICAgY29weU9mU0RhdGEuZnJvbSA9IHRoaXMuc3RhdGUubWluO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb3B5T2ZTRGF0YTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBNb2RlbDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgTW9kZWxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vTW9kZWwvTW9kZWxcIikpO1xuY29uc3QgVmlld18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9WaWV3L1ZpZXdcIikpO1xuY29uc3QgRXZlbnRDcmVhdG9yXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL0V2ZW50Q3JlYXRvci9FdmVudENyZWF0b3JcIikpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5jbGFzcyBQcmVzZW50ZXIgZXh0ZW5kcyBFdmVudENyZWF0b3JfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlRWxlbSwgc3RhdGUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXdfMS5kZWZhdWx0KG5vZGVFbGVtKTtcbiAgICAgICAgdGhpcy5tb2RlbCA9IG5ldyBNb2RlbF8xLmRlZmF1bHQoc3RhdGUpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ29uQ2hhbmdlJyk7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLnZpZXcuc2V0U3RhdGUodGhpcy5tb2RlbC5nZXRTdGF0ZSgpKTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9XG4gICAgYmluZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLmhhbmRsZVZpZXdFdmVudCA9IHRoaXMuaGFuZGxlVmlld0V2ZW50LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlTW9kZWxVcGRhdGVWYWx1ZXMgPSB0aGlzLmhhbmRsZU1vZGVsVXBkYXRlVmFsdWVzLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlTW9kZWxVcGRhdGVTZXR0aW5ncyA9IHRoaXMuaGFuZGxlTW9kZWxVcGRhdGVTZXR0aW5ncy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnZpZXcuYWRkRXZlbnRMaXN0ZW5lcigndXBkYXRlVmlldycsIHRoaXMuaGFuZGxlVmlld0V2ZW50KTtcbiAgICAgICAgdGhpcy5tb2RlbC5hZGRFdmVudExpc3RlbmVyKCd1cGRhdGVWYWx1ZXMnLCB0aGlzLmhhbmRsZU1vZGVsVXBkYXRlVmFsdWVzKTtcbiAgICAgICAgdGhpcy5tb2RlbC5hZGRFdmVudExpc3RlbmVyKCd1cGRhdGVTZXR0aW5ncycsIHRoaXMuaGFuZGxlTW9kZWxVcGRhdGVTZXR0aW5ncyk7XG4gICAgfVxuICAgIGhhbmRsZVZpZXdFdmVudChlKSB7XG4gICAgICAgIHRoaXMubW9kZWwuc2V0U3RhdGUoZSk7XG4gICAgfVxuICAgIGhhbmRsZU1vZGVsVXBkYXRlVmFsdWVzKGUpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdvbkNoYW5nZScsIGUpO1xuICAgICAgICB0aGlzLnZpZXcuc2V0U3RhdGUoZSk7XG4gICAgfVxuICAgIGhhbmRsZU1vZGVsVXBkYXRlU2V0dGluZ3MoZSkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ29uQ2hhbmdlJywgZSk7XG4gICAgICAgIHRoaXMudmlldy5yZWJ1aWxkU2xpZGVyKGUpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFByZXNlbnRlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY2FsY1V0aWxzXzEgPSByZXF1aXJlKFwidXRpbHMvY2FsY1V0aWxzXCIpO1xuY29uc3QgZGVmYXVsdFN0YXRlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImRlZmF1bHRTdGF0ZS9kZWZhdWx0U3RhdGVcIikpO1xuY29uc3QgSGFuZGxlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vc3ViVmlldy9IYW5kbGUvSGFuZGxlXCIpKTtcbmNvbnN0IFNlY29uZEhhbmRsZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3N1YlZpZXcvSGFuZGxlL1NlY29uZEhhbmRsZVwiKSk7XG5jb25zdCBTY2FsZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3N1YlZpZXcvU2NhbGUvU2NhbGVcIikpO1xuY29uc3QgVGlwXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vc3ViVmlldy9UaXAvVGlwXCIpKTtcbmNvbnN0IFNlY29uZFRpcF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3N1YlZpZXcvVGlwL1NlY29uZFRpcFwiKSk7XG5jb25zdCBUcmFja18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3N1YlZpZXcvVHJhY2svVHJhY2tcIikpO1xuY29uc3QgRXZlbnRDcmVhdG9yXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL0V2ZW50Q3JlYXRvci9FdmVudENyZWF0b3JcIikpO1xuY2xhc3MgVmlldyBleHRlbmRzIEV2ZW50Q3JlYXRvcl8xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKG5vZGVFbGVtKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0U3RhdGVfMS5kZWZhdWx0KTtcbiAgICAgICAgdGhpcy5ub2RlRWxlbSA9IG5vZGVFbGVtO1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUpLCBzdGF0ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlKHRoaXMuc3RhdGUpO1xuICAgICAgICB0aGlzLmNoZWNrVGlwcygpO1xuICAgICAgICB0aGlzLmNoZWNrU2NhbGUoKTtcbiAgICB9XG4gICAgcmVidWlsZFNsaWRlcihzdGF0ZSkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5zbGlkZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHRoaXMuY3JlYXRlQ29tcG9uZW50cyhzdGF0ZSk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50TGlzdGVuZXIoKTtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVTbGlkZXIoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCd1cGRhdGVWaWV3Jyk7XG4gICAgfVxuICAgIGNyZWF0ZVNsaWRlcigpIHtcbiAgICAgICAgdGhpcy5zbGlkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5zbGlkZXIuY2xhc3NMaXN0LmFkZCgnanEtc2xpZGVyJyk7XG4gICAgICAgIHRoaXMubm9kZUVsZW0uYXBwZW5kQ2hpbGQodGhpcy5zbGlkZXIpO1xuICAgIH1cbiAgICBjcmVhdGVDb21wb25lbnRzKHN0YXRlKSB7XG4gICAgICAgIGNvbnN0IHsgcmFuZ2UsIHRpcCwgc2NhbGUsIGhvcml6b250YWwgfSA9IHN0YXRlO1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMucHVzaChuZXcgSGFuZGxlXzEuZGVmYXVsdCh0aGlzLnNsaWRlcikpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMucHVzaChuZXcgVHJhY2tfMS5kZWZhdWx0KHRoaXMuc2xpZGVyKSk7XG4gICAgICAgIGlmICh0aXApIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50cy5wdXNoKG5ldyBUaXBfMS5kZWZhdWx0KHRoaXMuc2xpZGVyKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMucHVzaChuZXcgU2Vjb25kSGFuZGxlXzEuZGVmYXVsdCh0aGlzLnNsaWRlcikpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyYW5nZSAmJiB0aXApIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50cy5wdXNoKG5ldyBTZWNvbmRUaXBfMS5kZWZhdWx0KHRoaXMuc2xpZGVyKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjYWxlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMucHVzaChuZXcgU2NhbGVfMS5kZWZhdWx0KHRoaXMuc2xpZGVyKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhvcml6b250YWwpIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ2pxLXNsaWRlcl9ob3Jpem9udGFsJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlci5jbGFzc0xpc3QucmVtb3ZlKCdqcS1zbGlkZXJfaG9yaXpvbnRhbCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGJpbmRFdmVudExpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLmhhbmRsZVN1YlZpZXdFdmVudCA9IHRoaXMuaGFuZGxlU3ViVmlld0V2ZW50LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cy5mb3JFYWNoKChjb21wb25lbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChjb21wb25lbnQuZXZlbnRzLnVwZGF0ZVN1YlZpZXcpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcigndXBkYXRlU3ViVmlldycsIHRoaXMuaGFuZGxlU3ViVmlld0V2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGhhbmRsZVN1YlZpZXdFdmVudChlKSB7XG4gICAgICAgIGNvbnN0IHNpemUgPSB0aGlzLnN0YXRlLmhvcml6b250YWxcbiAgICAgICAgICAgID8gdGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XG4gICAgICAgICAgICA6IHRoaXMuc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4IH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBpZiAoZS50YXJnZXQgPT09ICdmcm9tJykge1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCd1cGRhdGVWaWV3Jywge1xuICAgICAgICAgICAgICAgIGZyb206ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0UGl4ZWxJblZhbHVlKShtaW4sIG1heCwgc2l6ZSwgZS5wb3NpdGlvbiksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZS50YXJnZXQgPT09ICd0bycpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgndXBkYXRlVmlldycsIHtcbiAgICAgICAgICAgICAgICB0bzogKDAsIGNhbGNVdGlsc18xLmNvbnZlcnRQaXhlbEluVmFsdWUpKG1pbiwgbWF4LCBzaXplLCBlLnBvc2l0aW9uKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gJ3RyYWNrJyB8fCBlLnRhcmdldCA9PT0gJ3NjYWxlJykge1xuICAgICAgICAgICAgY29uc3QgaGFuZGxlcyA9IHRoaXMuZ2V0QXJyT2ZDb25jcmV0ZVN1YlZpZXcoSGFuZGxlXzEuZGVmYXVsdCk7XG4gICAgICAgICAgICBjb25zdCBmcm9tID0gaGFuZGxlc1swXS5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnJhbmdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCd1cGRhdGVWaWV3Jywge1xuICAgICAgICAgICAgICAgICAgICBmcm9tOiAoMCwgY2FsY1V0aWxzXzEuY29udmVydFBpeGVsSW5WYWx1ZSkobWluLCBtYXgsIHNpemUsIGUucG9zaXRpb24pLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHRvID0gaGFuZGxlc1sxXS5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKGZyb20gLSBlLnBvc2l0aW9uKSA8PSB0byAtIGUucG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ3VwZGF0ZVZpZXcnLCB7XG4gICAgICAgICAgICAgICAgICAgIGZyb206ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0UGl4ZWxJblZhbHVlKShtaW4sIG1heCwgc2l6ZSwgZS5wb3NpdGlvbiksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCd1cGRhdGVWaWV3Jywge1xuICAgICAgICAgICAgICAgIHRvOiAoMCwgY2FsY1V0aWxzXzEuY29udmVydFBpeGVsSW5WYWx1ZSkobWluLCBtYXgsIHNpemUsIGUucG9zaXRpb24pLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2hlY2tUaXBzKCkge1xuICAgICAgICBjb25zdCB7IHRpcCwgcmFuZ2UsIGhvcml6b250YWwgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGlmICghKHRpcCAmJiByYW5nZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0aXBzID0gdGhpcy5nZXRBcnJPZkNvbmNyZXRlU3ViVmlldyhUaXBfMS5kZWZhdWx0KTtcbiAgICAgICAgY29uc3Qgc2l6ZU9mRmlyc3RUaXAgPSBob3Jpem9udGFsXG4gICAgICAgICAgICA/IHRpcHNbMF0uc3ViVmlldy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcbiAgICAgICAgICAgIDogdGlwc1sxXS5zdWJWaWV3LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICBjb25zdCBzaXplT2ZTZWNvbmRUaXAgPSBob3Jpem9udGFsXG4gICAgICAgICAgICA/IHRpcHNbMV0uc3ViVmlldy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcbiAgICAgICAgICAgIDogdGlwc1sxXS5zdWJWaWV3LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICBjb25zdCBmaXJzdFBvc2l0aW9uID0gdGlwc1swXS5nZXRQb3NpdGlvbigpICsgc2l6ZU9mRmlyc3RUaXA7XG4gICAgICAgIGNvbnN0IHNlY29uZFBvc2l0aW9uID0gdGlwc1sxXS5nZXRQb3NpdGlvbigpO1xuICAgICAgICBjb25zdCBpc1RvdWNoZWQgPSBzZWNvbmRQb3NpdGlvbiAtIGZpcnN0UG9zaXRpb24gPCBzaXplT2ZTZWNvbmRUaXA7XG4gICAgICAgIHRpcHMuZm9yRWFjaCgodCkgPT4ge1xuICAgICAgICAgICAgdC5jaGFuZ2VJc0RvdWJsZShpc1RvdWNoZWQpO1xuICAgICAgICAgICAgdC5zZXRTdGF0ZSh0aGlzLnN0YXRlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNoZWNrU2NhbGUoKSB7XG4gICAgICAgIGNvbnN0IHsgc2NhbGU6IHMsIHRpcCwgcmFuZ2UgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGlmICghKHMgJiYgdGlwKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgW3NjYWxlXSA9IHRoaXMuZ2V0QXJyT2ZDb25jcmV0ZVN1YlZpZXcoU2NhbGVfMS5kZWZhdWx0KTtcbiAgICAgICAgY29uc3QgdGlwcyA9IHRoaXMuZ2V0QXJyT2ZDb25jcmV0ZVN1YlZpZXcoVGlwXzEuZGVmYXVsdCk7XG4gICAgICAgIGNvbnN0IHNjYWxlU3RhcnQgPSBzY2FsZS5nZXRQb3NpdGlvbigpO1xuICAgICAgICBjb25zdCBzY2FsZUVuZCA9IHNjYWxlU3RhcnQgKyBzY2FsZS5nZXRTaXplKCk7XG4gICAgICAgIGNvbnN0IGlzRnJvbU5lYXJieVN0YXJ0ID0gc2NhbGVTdGFydCAtIHRpcHNbMF0uZ2V0UG9zaXRpb24oKSArIHRpcHNbMF0uZ2V0U2l6ZSgpID4gMDtcbiAgICAgICAgY29uc3QgaXNGcm9tTmVhcmJ5RW5kID0gc2NhbGVFbmQgLSB0aXBzWzBdLmdldFBvc2l0aW9uKCkgLSB0aXBzWzBdLmdldFNpemUoKSAqIDIgPCAwO1xuICAgICAgICBzY2FsZS52aXNpYmlsaXR5U3dpdGNoZXIoJ2ZpcnN0JywgaXNGcm9tTmVhcmJ5U3RhcnQpO1xuICAgICAgICBzY2FsZS52aXNpYmlsaXR5U3dpdGNoZXIoJ2xhc3QnLCBpc0Zyb21OZWFyYnlFbmQpO1xuICAgICAgICBpZiAocmFuZ2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGlzVG9OZWFyYnlFbmQgPSBzY2FsZUVuZCAtIHRpcHNbMV0uZ2V0UG9zaXRpb24oKSAtIHRpcHNbMV0uZ2V0U2l6ZSgpICogMiA8IDA7XG4gICAgICAgICAgICBzY2FsZS52aXNpYmlsaXR5U3dpdGNoZXIoJ2xhc3QnLCBpc1RvTmVhcmJ5RW5kKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGUoc3RhdGUpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzLmZvckVhY2goKGNvbXBvbmVudCkgPT4gY29tcG9uZW50LnNldFN0YXRlKHN0YXRlKSk7XG4gICAgfVxuICAgIGdldEFyck9mQ29uY3JldGVTdWJWaWV3KGluc3RhbmNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudHMuZmlsdGVyKChjb21wb25lbnQpID0+IGNvbXBvbmVudCBpbnN0YW5jZW9mIGluc3RhbmNlKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBWaWV3O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBNb3ZhYmxlU3ViVmlld18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9iYXNlQ2xhc3Nlcy9Nb3ZhYmxlU3ViVmlldy9Nb3ZhYmxlU3ViVmlld1wiKSk7XG5jbGFzcyBIYW5kbGUgZXh0ZW5kcyBNb3ZhYmxlU3ViVmlld18xLmRlZmF1bHQge1xuICAgIGdldFBvc2l0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5ob3Jpem9udGFsKSB7XG4gICAgICAgICAgICBjb25zdCBzdWJWaWV3VG9wID0gdGhpcy5zdWJWaWV3LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICAgICAgICAgIGNvbnN0IHNsaWRlclRvcCA9IHRoaXMuc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICAgICAgICAgIHJldHVybiBzdWJWaWV3VG9wIC0gc2xpZGVyVG9wICsgdGhpcy5zdWJWaWV3Lm9mZnNldEhlaWdodCAvIDI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3ViVmlld0xlZnQgPSB0aGlzLnN1YlZpZXcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICAgICAgY29uc3Qgc2xpZGVyTGVmdCA9IHRoaXMuc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgICAgIHJldHVybiBzdWJWaWV3TGVmdCAtIHNsaWRlckxlZnQgKyB0aGlzLnN1YlZpZXcub2Zmc2V0V2lkdGggLyAyO1xuICAgIH1cbiAgICBjcmVhdGVTdWJWaWV3KCkge1xuICAgICAgICBzdXBlci5jcmVhdGVTdWJWaWV3KCk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5jbGFzc0xpc3QuYWRkKCdqcS1zbGlkZXJfX2hhbmRsZScpO1xuICAgICAgICB0aGlzLnN1YlZpZXcuc3R5bGUuekluZGV4ID0gJzUnO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IEhhbmRsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgSGFuZGxlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vSGFuZGxlXCIpKTtcbmNsYXNzIFNlY29uZEhhbmRsZSBleHRlbmRzIEhhbmRsZV8xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKHNsaWRlcikge1xuICAgICAgICBzdXBlcihzbGlkZXIpO1xuICAgICAgICB0aGlzLnJvbGUgPSAndG8nO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IHNpemUgPSB0aGlzLnN0YXRlLmhvcml6b250YWxcbiAgICAgICAgICAgID8gdGhpcy5zbGlkZXIuY2xpZW50SGVpZ2h0XG4gICAgICAgICAgICA6IHRoaXMuc2xpZGVyLmNsaWVudFdpZHRoO1xuICAgICAgICBpZiAodGhpcy5nZXRQb3NpdGlvbigpID4gc2l6ZSAvIDIpIHtcbiAgICAgICAgICAgIHRoaXMuc3ViVmlldy5zdHlsZS56SW5kZXggPSAnNCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN1YlZpZXcuc3R5bGUuekluZGV4ID0gJzYnO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLnVwZGF0ZSgpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFNlY29uZEhhbmRsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY2FsY1V0aWxzXzEgPSByZXF1aXJlKFwidXRpbHMvY2FsY1V0aWxzXCIpO1xuY29uc3QgYWJzdHJhY3RTdWJWaWV3XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2Jhc2VDbGFzc2VzL2Fic3RyYWN0U3ViVmlldy9hYnN0cmFjdFN1YlZpZXdcIikpO1xuY2xhc3MgU2NhbGUgZXh0ZW5kcyBhYnN0cmFjdFN1YlZpZXdfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3RvcihzbGlkZXIpIHtcbiAgICAgICAgc3VwZXIoc2xpZGVyKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIGNvbnN0IHNjYWxlU3RldHRpbmcgPSBbXG4gICAgICAgICAgICAnbWluJyxcbiAgICAgICAgICAgICdtYXgnLFxuICAgICAgICAgICAgJ2hvcml6b250YWwnLFxuICAgICAgICAgICAgJ3NjYWxlRGVzdGlueScsXG4gICAgICAgICAgICAnc3RlcCcsXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IGlzQ2hhbmdlZFNjYWxlU2V0dGluZ3MgPSBzY2FsZVN0ZXR0aW5nLnJlZHVjZSgoZmxhZywga2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoc3RhdGVba2V5XSAhPT0gdGhpcy5zdGF0ZVtrZXldKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmxhZztcbiAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICBpZiAoaXNDaGFuZ2VkU2NhbGVTZXR0aW5ncykge1xuICAgICAgICAgICAgc3VwZXIuc2V0U3RhdGUoc3RhdGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlU3ViVmlldygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ3VwZGF0ZVN1YlZpZXcnKTtcbiAgICB9XG4gICAgdmlzaWJpbGl0eVN3aXRjaGVyKHBvc2l0aW9uSW5TY2FsZSwgdmlzaWJsZSkge1xuICAgICAgICBjb25zdCBwaXBzID0gdGhpcy5zdWJWaWV3LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcS1zbGlkZXJfX3NjYWxlLWxhYmVsJyk7XG4gICAgICAgIGlmIChwb3NpdGlvbkluU2NhbGUgPT09ICdmaXJzdCcgJiYgcGlwc1swXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG4gICAgICAgICAgICB2aXNpYmxlXG4gICAgICAgICAgICAgICAgPyBwaXBzWzBdLmNsYXNzTGlzdC5hZGQoJ2pzLXNsaWRlcl9fc2NhbGUtbGFiZWxfaGlkZGVuJylcbiAgICAgICAgICAgICAgICA6IHBpcHNbMF0uY2xhc3NMaXN0LnJlbW92ZSgnanMtc2xpZGVyX19zY2FsZS1sYWJlbF9oaWRkZW4nKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBudW1iZXJPZkxhc3RQaXAgPSBwaXBzLmxlbmd0aCAtIDE7XG4gICAgICAgIGlmIChwb3NpdGlvbkluU2NhbGUgPT09ICdsYXN0JyAmJlxuICAgICAgICAgICAgcGlwc1tudW1iZXJPZkxhc3RQaXBdIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnNcbiAgICAgICAgICAgIHZpc2libGVcbiAgICAgICAgICAgICAgICA/IHBpcHNbbnVtYmVyT2ZMYXN0UGlwXS5jbGFzc0xpc3QuYWRkKCdqcy1zbGlkZXJfX3NjYWxlLWxhYmVsX2hpZGRlbicpXG4gICAgICAgICAgICAgICAgOiBwaXBzW251bWJlck9mTGFzdFBpcF0uY2xhc3NMaXN0LnJlbW92ZSgnanMtc2xpZGVyX19zY2FsZS1sYWJlbF9oaWRkZW4nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjcmVhdGVTdWJWaWV3KCkge1xuICAgICAgICB0aGlzLnN1YlZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5zdWJWaWV3LmNsYXNzTGlzdC5hZGQoJ2pxLXNsaWRlcl9fc2NhbGUnKTtcbiAgICAgICAgdGhpcy5zbGlkZXIuYXBwZW5kQ2hpbGQodGhpcy5zdWJWaWV3KTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4LCBzdGVwLCBob3Jpem9udGFsLCBzY2FsZURlc3RpbnkgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGxldCBwaXBzID0gW107XG4gICAgICAgIGZvciAobGV0IHBpcCA9IG1pbjsgcGlwIDwgbWF4OyBwaXAgKz0gc3RlcCA8IDEgPyAxIDogc3RlcCkge1xuICAgICAgICAgICAgcGlwcy5wdXNoKHRoaXMuY3JlYXRlUGlwRnJhZ21lbnQobWluLCBtYXgsIHBpcCkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1heFN5bWJvbHNJblBpcCA9IE1hdGguYWJzKG1pbikgPiBNYXRoLmFicyhtYXgpXG4gICAgICAgICAgICA/IG1pbi50b1N0cmluZygpLmxlbmd0aFxuICAgICAgICAgICAgOiBtYXgudG9TdHJpbmcoKS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IHNpemVPZlBpcCA9IGhvcml6b250YWxcbiAgICAgICAgICAgID8gdGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0IC8gMjBcbiAgICAgICAgICAgIDogdGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggLyAobWF4U3ltYm9sc0luUGlwICogMTApO1xuICAgICAgICBpZiAocGlwcy5sZW5ndGggPiBzaXplT2ZQaXApIHtcbiAgICAgICAgICAgIHBpcHMgPSBwaXBzLmZpbHRlcigoX3BpcCwgaSkgPT4gaSAlIE1hdGgucm91bmQocGlwcy5sZW5ndGggLyBzaXplT2ZQaXApID09PSAwKTtcbiAgICAgICAgfVxuICAgICAgICBwaXBzID0gcGlwcy5maWx0ZXIoKF9waXAsIGkpID0+IGkgJSBzY2FsZURlc3RpbnkgPT09IDApO1xuICAgICAgICBwaXBzLnB1c2godGhpcy5jcmVhdGVQaXBGcmFnbWVudChtaW4sIG1heCwgbWF4KSk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5pbm5lckhUTUwgPSBwaXBzLmpvaW4oJyAnKTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRMaXN0ZW5lcigpO1xuICAgIH1cbiAgICBjcmVhdGVQaXBGcmFnbWVudChtaW4sIG1heCwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJqcS1zbGlkZXJfX3NjYWxlLXBpcFwiIHN0eWxlPVwidG9wOiR7KDAsIGNhbGNVdGlsc18xLmNvbnZlcnRQZXJjZW50SW5WYWx1ZSkoMCwgdGhpcy5zbGlkZXIuY2xpZW50SGVpZ2h0LCAoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgdmFsdWUpKX1weFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwianEtc2xpZGVyX19zY2FsZS1sYWJlbFwiPiR7dmFsdWUudG9GaXhlZCgwKX08L2Rpdj5cbiAgICAgIDwvZGl2PmA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJqcS1zbGlkZXJfX3NjYWxlLXBpcFwiIHN0eWxlPVwibGVmdDokeygwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCB2YWx1ZSl9JVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwianEtc2xpZGVyX19zY2FsZS1sYWJlbFwiPiR7dmFsdWUudG9GaXhlZCgwKX08L2Rpdj5cbiAgICAgIDwvZGl2PmA7XG4gICAgfVxuICAgIGJpbmRFdmVudExpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLmhhbmRsZVNjYWxlTGFiZWxDTGljayA9IHRoaXMuaGFuZGxlU2NhbGVMYWJlbENMaWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5xdWVyeVNlbGVjdG9yQWxsKCcuanEtc2xpZGVyX19zY2FsZS1sYWJlbCcpLmZvckVhY2goKHBpcCkgPT4ge1xuICAgICAgICAgICAgaWYgKHBpcCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVTY2FsZUxhYmVsQ0xpY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaGFuZGxlU2NhbGVMYWJlbENMaWNrKGUpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCwgaG9yaXpvbnRhbCB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgaWYgKCEoZS50YXJnZXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvbmVQZXJjZW50ID0gaG9yaXpvbnRhbFxuICAgICAgICAgICAgPyB0aGlzLnNsaWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgLyAxMDBcbiAgICAgICAgICAgIDogdGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggLyAxMDA7XG4gICAgICAgIGNvbnN0IHBlcmNlbnRzID0gaG9yaXpvbnRhbFxuICAgICAgICAgICAgPyAoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgK2UudGFyZ2V0LmlubmVySFRNTClcbiAgICAgICAgICAgIDogKDAsIGNhbGNVdGlsc18xLmNvbnZlcnRWYWx1ZUluUGVyY2VudCkobWluLCBtYXgsICtlLnRhcmdldC5pbm5lckhUTUwpO1xuICAgICAgICBsZXQgcG9zaXRpb24gPSBvbmVQZXJjZW50ICogcGVyY2VudHM7XG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgY29uc3Qgc2xpZGVyU2l6ZSA9IGhvcml6b250YWxcbiAgICAgICAgICAgICAgICA/IHRoaXMuc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodFxuICAgICAgICAgICAgICAgIDogdGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24oKSAtIHNsaWRlclNpemU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCd1cGRhdGVTdWJWaWV3JywgeyB0YXJnZXQ6ICdzY2FsZScsIHBvc2l0aW9uIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFNjYWxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBUaXBfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9UaXBcIikpO1xuY2xhc3MgU2Vjb25kVGlwIGV4dGVuZHMgVGlwXzEuZGVmYXVsdCB7XG4gICAgY29uc3RydWN0b3Ioc2xpZGVyKSB7XG4gICAgICAgIHN1cGVyKHNsaWRlcik7XG4gICAgICAgIHRoaXMucm9sZSA9ICd0byc7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XG4gICAgICAgIGNvbnN0IHsgdG8gfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGlmICh0aGlzLmlzRG91YmxlKSB7XG4gICAgICAgICAgICB0aGlzLnN1YlZpZXcuc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3ViVmlldy5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3ViVmlldy50ZXh0Q29udGVudCA9IHRvLnRvU3RyaW5nKCk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gU2Vjb25kVGlwO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBNb3ZhYmxlU3ViVmlld18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9iYXNlQ2xhc3Nlcy9Nb3ZhYmxlU3ViVmlldy9Nb3ZhYmxlU3ViVmlld1wiKSk7XG5jbGFzcyBUaXAgZXh0ZW5kcyBNb3ZhYmxlU3ViVmlld18xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKHNsaWRlcikge1xuICAgICAgICBzdXBlcihzbGlkZXIpO1xuICAgICAgICB0aGlzLmlzRG91YmxlID0gZmFsc2U7XG4gICAgfVxuICAgIGNoYW5nZUlzRG91YmxlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuaXNEb3VibGUgPSB2YWx1ZTtcbiAgICB9XG4gICAgY3JlYXRlU3ViVmlldygpIHtcbiAgICAgICAgc3VwZXIuY3JlYXRlU3ViVmlldygpO1xuICAgICAgICB0aGlzLnN1YlZpZXcuY2xhc3NMaXN0LmFkZCgnanEtc2xpZGVyX190aXAnKTtcbiAgICAgICAgdGhpcy5zdWJWaWV3LnN0eWxlLnpJbmRleCA9ICc1JztcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICBzdXBlci51cGRhdGUoKTtcbiAgICAgICAgY29uc3QgeyBmcm9tLCB0byB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgdGhpcy5zdWJWaWV3LnRleHRDb250ZW50ID0gdGhpcy5pc0RvdWJsZVxuICAgICAgICAgICAgPyBgJHtmcm9tfSAtICR7dG99YFxuICAgICAgICAgICAgOiBmcm9tLnRvU3RyaW5nKCk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gVGlwO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjYWxjVXRpbHNfMSA9IHJlcXVpcmUoXCJ1dGlscy9jYWxjVXRpbHNcIik7XG5jb25zdCBhYnN0cmFjdFN1YlZpZXdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vYmFzZUNsYXNzZXMvYWJzdHJhY3RTdWJWaWV3L2Fic3RyYWN0U3ViVmlld1wiKSk7XG5jbGFzcyBUcmFjayBleHRlbmRzIGFic3RyYWN0U3ViVmlld18xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKHNsaWRlcikge1xuICAgICAgICBzdXBlcihzbGlkZXIpO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgY3JlYXRlU3ViVmlldygpIHtcbiAgICAgICAgdGhpcy5zdWJWaWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5jbGFzc0xpc3QuYWRkKCdqcS1zbGlkZXJfX3RyYWNrJyk7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5wcm9ncmVzcy5jbGFzc0xpc3QuYWRkKCdqcS1zbGlkZXJfX3Byb2dyZXNzJyk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5hcHBlbmRDaGlsZCh0aGlzLnByb2dyZXNzKTtcbiAgICAgICAgdGhpcy5zbGlkZXIuYXBwZW5kQ2hpbGQodGhpcy5zdWJWaWV3KTtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVTdWJWaWV3KCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgndXBkYXRlU3ViVmlldycpO1xuICAgICAgICB0aGlzLmJpbmRFdmVudExpc3RlbmVyKCk7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCwgZnJvbSwgdG8sIGhvcml6b250YWwsIHJhbmdlLCBwcm9ncmVzcyB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgaWYgKCFwcm9ncmVzcykge1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5yZW1vdmUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdGFydCA9ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCBmcm9tKTtcbiAgICAgICAgY29uc3QgZW5kID0gKDAsIGNhbGNVdGlsc18xLmNvbnZlcnRWYWx1ZUluUGVyY2VudCkobWluLCBtYXgsIHRvKTtcbiAgICAgICAgaWYgKGhvcml6b250YWwgJiYgcmFuZ2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IGVuZCAtIHN0YXJ0O1xuICAgICAgICAgICAgY29uc3Qgb25lUGVyY2VudCA9IHRoaXMuc2xpZGVyLmNsaWVudEhlaWdodCAvIDEwMDtcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3Muc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fSVgO1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5zdHlsZS5tYXJnaW5Ub3AgPSBgJHtvbmVQZXJjZW50ICogc3RhcnR9cHhgO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChob3Jpem9udGFsICYmICFyYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5zdHlsZS5oZWlnaHQgPSBgJHtzdGFydH0lYDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmFuZ2UpIHtcbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gZW5kIC0gc3RhcnQ7XG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzLnN0eWxlLndpZHRoID0gYCR7d2lkdGh9JWA7XG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzLnN0eWxlLm1hcmdpbkxlZnQgPSBgJHtzdGFydH0lYDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3Muc3R5bGUud2lkdGggPSBgJHtzdGFydH0lYDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBiaW5kRXZlbnRMaXN0ZW5lcigpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVUcmFja0NsaWNrID0gdGhpcy5oYW5kbGVUcmFja0NsaWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlVHJhY2tDbGljayk7XG4gICAgfVxuICAgIGhhbmRsZVRyYWNrQ2xpY2soZSkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ3VwZGF0ZVN1YlZpZXcnLCB7XG4gICAgICAgICAgICB0YXJnZXQ6ICd0cmFjaycsXG4gICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5zdGF0ZS5ob3Jpem9udGFsXG4gICAgICAgICAgICAgICAgPyBlLmNsaWVudFkgLSB0aGlzLnNsaWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3BcbiAgICAgICAgICAgICAgICA6IGUuY2xpZW50WCAtIHRoaXMuc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFRyYWNrO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjYWxjVXRpbHNfMSA9IHJlcXVpcmUoXCJ1dGlscy9jYWxjVXRpbHNcIik7XG5jb25zdCBhYnN0cmFjdFN1YlZpZXdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vYWJzdHJhY3RTdWJWaWV3L2Fic3RyYWN0U3ViVmlld1wiKSk7XG5jbGFzcyBNb3ZhYmxlU3ViVmlldyBleHRlbmRzIGFic3RyYWN0U3ViVmlld18xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKHNsaWRlcikge1xuICAgICAgICBzdXBlcihzbGlkZXIpO1xuICAgICAgICB0aGlzLnJvbGUgPSAnZnJvbSc7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmNyZWF0ZVN1YlZpZXcoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCd1cGRhdGVTdWJWaWV3Jyk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50TGlzdGVuZXIoKTtcbiAgICB9XG4gICAgaGFuZGxlU3ViVmlld1BvaW50ZXJtb3ZlKGUpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCd1cGRhdGVTdWJWaWV3Jywge1xuICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLnJvbGUsXG4gICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5zdGF0ZS5ob3Jpem9udGFsXG4gICAgICAgICAgICAgICAgPyBlLmNsaWVudFkgLSB0aGlzLnNsaWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3BcbiAgICAgICAgICAgICAgICA6IGUuY2xpZW50WCAtIHRoaXMuc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjcmVhdGVTdWJWaWV3KCkge1xuICAgICAgICB0aGlzLnN1YlZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5zbGlkZXIuYXBwZW5kQ2hpbGQodGhpcy5zdWJWaWV3KTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4LCBmcm9tLCB0bywgaG9yaXpvbnRhbCB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnJvbGUgPT09ICdmcm9tJyA/IGZyb20gOiB0bztcbiAgICAgICAgaWYgKGhvcml6b250YWwpIHtcbiAgICAgICAgICAgIHRoaXMuc3ViVmlldy5zdHlsZS50b3AgPSBgJHsoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgdmFsdWUpfSVgO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdWJWaWV3LnN0eWxlLmxlZnQgPSBgJHsoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgdmFsdWUpfSVgO1xuICAgICAgICB9XG4gICAgfVxuICAgIGJpbmRFdmVudExpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLmhhbmRsZVN1YlZpZXdQb2ludGVyZG93biA9IHRoaXMuaGFuZGxlU3ViVmlld1BvaW50ZXJkb3duLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIHRoaXMuaGFuZGxlU3ViVmlld1BvaW50ZXJkb3duKTtcbiAgICB9XG4gICAgaGFuZGxlU3ViVmlld1BvaW50ZXJkb3duKCkge1xuICAgICAgICB0aGlzLmhhbmRsZVN1YlZpZXdQb2ludGVybW92ZSA9IHRoaXMuaGFuZGxlU3ViVmlld1BvaW50ZXJtb3ZlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlU3ViVmlld1BvaW50ZXJ1cCA9IHRoaXMuaGFuZGxlU3ViVmlld1BvaW50ZXJ1cC5iaW5kKHRoaXMpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCB0aGlzLmhhbmRsZVN1YlZpZXdQb2ludGVybW92ZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCB0aGlzLmhhbmRsZVN1YlZpZXdQb2ludGVydXApO1xuICAgIH1cbiAgICBoYW5kbGVTdWJWaWV3UG9pbnRlcnVwKCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCB0aGlzLmhhbmRsZVN1YlZpZXdQb2ludGVybW92ZSk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gTW92YWJsZVN1YlZpZXc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEV2ZW50Q3JlYXRvcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJjb21wb25lbnRzL0V2ZW50Q3JlYXRvci9FdmVudENyZWF0b3JcIikpO1xuY29uc3QgZGVmYXVsdFN0YXRlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImRlZmF1bHRTdGF0ZS9kZWZhdWx0U3RhdGVcIikpO1xuY2xhc3MgU3ViVmlldyBleHRlbmRzIEV2ZW50Q3JlYXRvcl8xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKHNsaWRlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnNsaWRlciA9IHNsaWRlcjtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRTdGF0ZV8xLmRlZmF1bHQpO1xuICAgIH1cbiAgICBnZXRQb3NpdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3ViVmlldy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc3ViVmlldy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgIH1cbiAgICBnZXRTaXplKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5ob3Jpem9udGFsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdWJWaWV3LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zdWJWaWV3LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgIH1cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlKSwgc3RhdGUpO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFN1YlZpZXc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGRlZmF1bHRTdGF0ZSA9IHtcbiAgICBtaW46IDAsXG4gICAgbWF4OiAxMDAsXG4gICAgZnJvbTogMCxcbiAgICB0bzogMTAwLFxuICAgIHN0ZXA6IDEsXG4gICAgdGlwOiBmYWxzZSxcbiAgICByYW5nZTogZmFsc2UsXG4gICAgcHJvZ3Jlc3M6IGZhbHNlLFxuICAgIHNjYWxlOiBmYWxzZSxcbiAgICBzY2FsZURlc3Rpbnk6IDEwLFxuICAgIGhvcml6b250YWw6IGZhbHNlLFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZmF1bHRTdGF0ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jb252ZXJ0UGl4ZWxJblZhbHVlID0gZXhwb3J0cy5jb252ZXJ0UGVyY2VudEluVmFsdWUgPSBleHBvcnRzLmNvbnZlcnRQaXhlbEluUGVyY2VudCA9IGV4cG9ydHMuY29udmVydFZhbHVlSW5QZXJjZW50ID0gdm9pZCAwO1xuLyogZXNsaW50LWRpc2FibGUgbm8tbWl4ZWQtb3BlcmF0b3JzICovXG5mdW5jdGlvbiBjb252ZXJ0VmFsdWVJblBlcmNlbnQobWluLCBtYXgsIHZhbHVlKSB7XG4gICAgcmV0dXJuICgxMDAgLyAobWF4IC0gbWluKSkgKiAodmFsdWUgLSBtaW4pO1xufVxuZXhwb3J0cy5jb252ZXJ0VmFsdWVJblBlcmNlbnQgPSBjb252ZXJ0VmFsdWVJblBlcmNlbnQ7XG5mdW5jdGlvbiBjb252ZXJ0UGl4ZWxJblBlcmNlbnQod2lkdGgsIHZhbHVlKSB7XG4gICAgcmV0dXJuICgxMDAgLyB3aWR0aCkgKiB2YWx1ZTtcbn1cbmV4cG9ydHMuY29udmVydFBpeGVsSW5QZXJjZW50ID0gY29udmVydFBpeGVsSW5QZXJjZW50O1xuZnVuY3Rpb24gY29udmVydFBlcmNlbnRJblZhbHVlKG1pbiwgbWF4LCBwZXJjZW50KSB7XG4gICAgcmV0dXJuICgobWF4IC0gbWluKSAvIDEwMCkgKiBwZXJjZW50ICsgbWluO1xufVxuZXhwb3J0cy5jb252ZXJ0UGVyY2VudEluVmFsdWUgPSBjb252ZXJ0UGVyY2VudEluVmFsdWU7XG5mdW5jdGlvbiBjb252ZXJ0UGl4ZWxJblZhbHVlKG1pbiwgbWF4LCB3aWR0aCwgdmFsdWUpIHtcbiAgICByZXR1cm4gY29udmVydFBlcmNlbnRJblZhbHVlKG1pbiwgbWF4LCBjb252ZXJ0UGl4ZWxJblBlcmNlbnQod2lkdGgsIHZhbHVlKSk7XG59XG5leHBvcnRzLmNvbnZlcnRQaXhlbEluVmFsdWUgPSBjb252ZXJ0UGl4ZWxJblZhbHVlO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vYXBwLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9