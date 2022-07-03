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
const calcUtils_1 = __webpack_require__(/*! utils/calcUtils */ "./utils/calcUtils.ts");
const EventCreator_1 = __importDefault(__webpack_require__(/*! ../EventCreator/EventCreator */ "./components/EventCreator/EventCreator.ts"));
class Model extends EventCreator_1.default {
    constructor(state) {
        super();
        this.state = {
            min: 0,
            max: 100,
            from: 0,
            to: 100,
            step: 1,
            tip: true,
            range: true,
            progress: true,
            scale: true,
            scaleDestiny: 10,
            horizontal: false,
        };
        this.init(state);
    }
    setState(state) {
        const [values, settings] = this.splitParams(state);
        this.state = Object.assign(Object.assign({}, this.state), this.minMaxValidator(settings));
        this.state = Object.assign(Object.assign({}, this.state), this.rangeFromToValidator(this.stepValidator(values)));
        this.dispatchEvent('ModelEvent', this.state);
    }
    getState() {
        return this.state;
    }
    init(state) {
        this.registerEvent('ModelEvent');
        this.setState(state);
    }
    splitParams(data) {
        const values = {};
        const settings = {};
        // eslint-disable-next-line no-unused-expressions
        'from' in data
            ? (values.from = data.from)
            : (values.from = this.state.from);
        // eslint-disable-next-line no-unused-expressions, prettier/prettier
        'to' in data
            ? (values.to = data.to)
            : (values.to = this.state.to);
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
            if (this.state.from > this.state.to)
                this.state.from = this.state.to;
            if (isFromNotValidly)
                copyOfSData.from = this.state.to;
            if (isToNotValidly)
                copyOfSData.to = this.state.from;
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
const calcUtils_1 = __webpack_require__(/*! utils/calcUtils */ "./utils/calcUtils.ts");
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
        this.viewEventHandler = this.viewEventHandler.bind(this);
        this.modelEventHandler = this.modelEventHandler.bind(this);
        this.view.addEventListener('ViewEvent', this.viewEventHandler);
        this.model.addEventListener('ModelEvent', this.modelEventHandler);
    }
    viewEventHandler(e) {
        const { min, max } = this.model.getState();
        const isNumbers = typeof min === 'number' && typeof max === 'number';
        if (!isNumbers)
            return;
        if (e.from)
            e.from = +(0, calcUtils_1.convertPercentInValue)(min, max, e.from).toFixed(3);
        if (e.to)
            e.to = +(0, calcUtils_1.convertPercentInValue)(min, max, e.to).toFixed(3);
        this.model.setState(e);
    }
    modelEventHandler(e) {
        this.dispatchEvent('onChange', e);
        this.view.setState(e);
    }
}
exports["default"] = Presenter;


/***/ }),

/***/ "./components/View/View.ts":
/*!*********************************!*\
  !*** ./components/View/View.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const calcUtils_1 = __webpack_require__(/*! utils/calcUtils */ "./utils/calcUtils.ts");
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
        this.nodeElem = nodeElem;
        this.components = [];
        /** истользовал as потому что знаем точно что после инициализации из Model прийдет state типа State,
         * не знаю на сколько уместно так делать но решил рискнуть.
         */
        this.state = {};
        this.init();
    }
    setState(state) {
        if (this.checkIsChangedSettings(state)) {
            this.rebuildSlider(state);
        }
        this.state = Object.assign(Object.assign({}, this.state), state);
        this.update(this.state);
        this.checkTips();
        this.checkScale();
    }
    init() {
        this.createSlider();
        this.registerEvent('ViewEvent');
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
        this.subViewEventHandler = this.subViewEventHandler.bind(this);
        this.components.forEach((component) => {
            if (component.events.SubViewEvent) {
                component.addEventListener('SubViewEvent', this.subViewEventHandler);
            }
        });
    }
    subViewEventHandler(e) {
        const size = this.state.horizontal
            ? this.slider.clientHeight
            : this.slider.clientWidth;
        if (e.target === 'from') {
            this.dispatchEvent('ViewEvent', {
                from: (0, calcUtils_1.convertPixelInPercent)(size, e.position),
            });
        }
        if (e.target === 'to') {
            this.dispatchEvent('ViewEvent', {
                to: (0, calcUtils_1.convertPixelInPercent)(size, e.position),
            });
        }
        if (e.target === 'track' || e.target === 'scale') {
            const handles = this.getArrOfConcreteSubView(Handle_1.default);
            const from = handles[0].getPosition();
            if (!this.state.range) {
                this.dispatchEvent('ViewEvent', {
                    from: (0, calcUtils_1.convertPixelInPercent)(size, e.position),
                });
                return;
            }
            const to = handles[1].getPosition();
            if (Math.abs(from - e.position) <= to - e.position) {
                this.dispatchEvent('ViewEvent', {
                    from: (0, calcUtils_1.convertPixelInPercent)(size, e.position),
                });
                return;
            }
            this.dispatchEvent('ViewEvent', {
                to: (0, calcUtils_1.convertPixelInPercent)(size, e.position),
            });
        }
    }
    checkIsChangedSettings(state) {
        const { from, to } = state, settings = __rest(state, ["from", "to"]);
        return Object.entries(settings).reduce((flag, entries) => {
            const [key, value] = entries;
            if (this.state[key] !== value) {
                return true;
            }
            return flag;
        }, false);
    }
    rebuildSlider(state) {
        this.components = [];
        this.slider.innerHTML = '';
        this.createComponents(state);
        this.bindEventListener();
    }
    checkTips() {
        const { tip, range, horizontal } = this.state;
        if (!(tip && range)) {
            return;
        }
        const tips = this.getArrOfConcreteSubView(Tip_1.default);
        const size = horizontal
            ? tips[1].subView.clientHeight
            : tips[1].subView.offsetWidth;
        const firstPosition = tips[0].getPosition();
        const secondPosition = tips[1].getPosition() - size;
        if (firstPosition > secondPosition) {
            tips.forEach((t) => {
                t.changeIsDouble(true);
                t.setState(this.state);
            });
        }
        else {
            tips.forEach((t) => {
                t.changeIsDouble(false);
            });
        }
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
        /** Идея данного метода была в том чтобы вернуть массив инстансов определеного класса.
         * у всех этих классов много схожих свойст и методов, но есть и свои особенные. Хотелоть бы
         * просто как агрумент указывать Класс и чтобы TS после этого видел все его свойтва и методы.
         * в итоге после долгих попыток не чего как сделать так через as T[] я к сожелению не придумал.
         */
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
        const { min, max, horizontal, scaleDestiny, step } = state;
        const oldState = JSON.stringify(this.state);
        this.state = Object.assign(Object.assign({}, this.state), { min,
            max,
            horizontal,
            scaleDestiny,
            step });
        if (oldState !== JSON.stringify(this.state)) {
            this.update();
        }
    }
    init() {
        this.createSubView();
        this.registerEvent('SubViewEvent');
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
            ? this.slider.clientHeight / 20
            : this.slider.clientWidth / (maxSymbolsInPip * 10);
        if (pips.length > sizeOfPip) {
            pips = pips.filter((_pip, i) => i % Math.round(pips.length / sizeOfPip) === 0);
        }
        pips = pips.filter((_pip, i) => i % scaleDestiny === 0);
        pips.push(this.createPipFragment(min, max, max));
        this.subView.innerHTML = pips.join('');
        this.bindEventListener();
    }
    visibilitySwitcher(positionInScale, visible) {
        const pips = this.subView.querySelectorAll('.jq-slider__scale-label');
        console.log(positionInScale, visible);
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
        this.clickHandler = this.clickHandler.bind(this);
        this.subView.querySelectorAll('.jq-slider__scale-label').forEach((pip) => {
            if (pip instanceof HTMLElement) {
                pip.addEventListener('click', this.clickHandler);
            }
        });
    }
    clickHandler(e) {
        const { min, max, horizontal } = this.state;
        if (!(e.target instanceof HTMLElement)) {
            return;
        }
        const onePercent = horizontal
            ? this.slider.clientHeight / 100
            : this.slider.clientWidth / 100;
        const percents = horizontal
            ? (0, calcUtils_1.convertValueInPercent)(min, max, +e.target.innerHTML)
            : (0, calcUtils_1.convertValueInPercent)(min, max, +e.target.innerHTML);
        let position = onePercent * percents;
        if (position === 0) {
            const sliderSize = horizontal
                ? this.slider.clientHeight
                : this.slider.clientWidth;
            position = this.getPosition() - sliderSize;
        }
        this.dispatchEvent('SubViewEvent', { target: 'scale', position });
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
    setState(state) {
        const { min, max, from, to, horizontal, range, progress } = state;
        this.state = Object.assign(Object.assign({}, this.state), { min,
            max,
            from,
            to,
            horizontal,
            range,
            progress });
        this.update();
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
        this.registerEvent('SubViewEvent');
        this.bindEventListener();
    }
    bindEventListener() {
        this.clickHandler = this.clickHandler.bind(this);
        this.subView.addEventListener('click', this.clickHandler);
    }
    clickHandler(e) {
        this.dispatchEvent('SubViewEvent', {
            target: 'track',
            position: this.state.horizontal
                ? e.clientY - this.slider.getBoundingClientRect().top
                : e.clientX - this.slider.getBoundingClientRect().left,
        });
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
    setState(state) {
        const { min, max, from, to, horizontal } = state;
        this.state = Object.assign(Object.assign({}, this.state), { min,
            max,
            from,
            to,
            horizontal });
        this.update();
    }
    init() {
        this.createSubView();
        this.registerEvent('SubViewEvent');
        this.bindEventListener();
    }
    bindEventListener() {
        this.pointerStart = this.pointerStart.bind(this);
        this.subView.addEventListener('pointerdown', this.pointerStart);
    }
    pointerStart() {
        this.pointerHandler = this.pointerHandler.bind(this);
        this.removePointStart = this.removePointStart.bind(this);
        window.addEventListener('pointermove', this.pointerHandler);
        window.addEventListener('pointerup', this.removePointStart);
    }
    removePointStart() {
        window.removeEventListener('pointermove', this.pointerHandler);
        window.removeEventListener('pointermove', this.pointerHandler);
    }
    pointerHandler(e) {
        this.dispatchEvent('SubViewEvent', {
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
class SubView extends EventCreator_1.default {
    constructor(slider) {
        super();
        this.slider = slider;
        this.state = {};
    }
    getPosition() {
        if (this.state.horizontal) {
            return this.subView.getBoundingClientRect().top;
        }
        return this.subView.getBoundingClientRect().left;
    }
    getSize() {
        if (this.state.horizontal) {
            return this.subView.clientHeight;
        }
        return this.subView.clientWidth;
    }
}
exports["default"] = SubView;


/***/ }),

/***/ "./utils/calcUtils.ts":
/*!****************************!*\
  !*** ./utils/calcUtils.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertPercentInValue = exports.convertPixelInPercent = exports.convertValueInPercent = void 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7Ozs7OztBQ3pCRjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCw2QkFBNkIsR0FBRyw2QkFBNkIsR0FBRyw2QkFBNkI7QUFDN0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qjs7Ozs7OztVQ2Y3QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zbGlkZXIuc2Nzcz8wYmE5Iiwid2VicGFjazovLy8uL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0V2ZW50Q3JlYXRvci9FdmVudENyZWF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9FdmVudENyZWF0b3IvTXlFdmVudC50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL01vZGVsL01vZGVsLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvUHJlc2VudGVyL1ByZXNlbnRlci50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1ZpZXcvVmlldy50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1ZpZXcvc3ViVmlldy9IYW5kbGUvSGFuZGxlLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvVmlldy9zdWJWaWV3L0hhbmRsZS9TZWNvbmRIYW5kbGUudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9WaWV3L3N1YlZpZXcvU2NhbGUvU2NhbGUudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9WaWV3L3N1YlZpZXcvVGlwL1NlY29uZFRpcC50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1ZpZXcvc3ViVmlldy9UaXAvVGlwLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvVmlldy9zdWJWaWV3L1RyYWNrL1RyYWNrLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvVmlldy9zdWJWaWV3L2Jhc2VDbGFzc2VzL01vdmFibGVTdWJWaWV3L01vdmFibGVTdWJWaWV3LnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvVmlldy9zdWJWaWV3L2Jhc2VDbGFzc2VzL2Fic3RyYWN0U3ViVmlldy9hYnN0cmFjdFN1YlZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvY2FsY1V0aWxzLnRzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovLy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiBlc2xpbnQtZGlzYWJsZSBmc2Qvbm8tZnVuY3Rpb24tZGVjbGFyYXRpb24taW4tZXZlbnQtbGlzdGVuZXIgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuLyogZXNsaW50LWRpc2FibGUgZnVuYy1uYW1lcyAqL1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgUHJlc2VudGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImNvbXBvbmVudHMvUHJlc2VudGVyL1ByZXNlbnRlclwiKSk7XG5yZXF1aXJlKFwiLi9zbGlkZXIuc2Nzc1wiKTtcbmNvbnN0IG1ldGhvZHMgPSB7XG4gICAgaW5pdChzdGF0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGlzSW5pdCA9IHR5cGVvZiBzdGF0ZSA9PT0gJ29iamVjdCcgJiYgISQodGhpcykuZGF0YSgnanFTbGlkZXInKTtcbiAgICAgICAgICAgIGlmIChpc0luaXQpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmRhdGEoKS5qcVNsaWRlciA9IG5ldyBQcmVzZW50ZXJfMS5kZWZhdWx0KHRoaXMsIHN0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICB1cGRhdGUoc3RhdGUpIHtcbiAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGpxU2xpZGVyID0gJCh0aGlzKS5kYXRhKCdqcVNsaWRlcicpO1xuICAgICAgICAgICAganFTbGlkZXIubW9kZWwuc2V0U3RhdGUoc3RhdGUpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdldFN0YXRlKCkge1xuICAgICAgICBjb25zdCBqcVNsaWRlciA9ICQodGhpcykuZGF0YSgnanFTbGlkZXInKTtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBqcVNsaWRlci5tb2RlbC5nZXRTdGF0ZSgpO1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfSxcbiAgICBvbkNoYW5nZShjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QganFTbGlkZXIgPSAkKHRoaXMpLmRhdGEoJ2pxU2xpZGVyJyk7XG4gICAgICAgICAgICBqcVNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdvbkNoYW5nZScsIChlKSA9PiBjYWxsYmFjayhlKSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG59O1xuJC5mbi5qcVNsaWRlciA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgaWYgKGFyZ3MubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB7fTtcbiAgICAgICAgcmV0dXJuIG1ldGhvZHMuaW5pdC5jYWxsKHRoaXMsIHN0YXRlKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IGFyZ3NbMF0gPyBhcmdzWzBdIDoge307XG4gICAgICAgIHJldHVybiBtZXRob2RzLmluaXQuY2FsbCh0aGlzLCBzdGF0ZSk7XG4gICAgfVxuICAgIGNvbnN0IGlzR2V0U3RhdGUgPSBhcmdzLmxlbmd0aCA9PT0gMSAmJiBhcmdzWzBdID09PSAnZ2V0U3RhdGUnO1xuICAgIGlmIChpc0dldFN0YXRlKSB7XG4gICAgICAgIHJldHVybiBtZXRob2RzLmdldFN0YXRlLmNhbGwodGhpcyk7XG4gICAgfVxuICAgIGNvbnN0IGlzQmluZEV2ZW50TGlzdGVuZXIgPSBhcmdzLmxlbmd0aCA+PSAyICYmIGFyZ3NbMF0gPT09ICdvbkNoYW5nZSc7XG4gICAgaWYgKGlzQmluZEV2ZW50TGlzdGVuZXIgJiYgdHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2sgPSBhcmdzWzFdO1xuICAgICAgICByZXR1cm4gbWV0aG9kcy5vbkNoYW5nZS5jYWxsKHRoaXMsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgY29uc3QgaXNVcGRhdGUgPSBhcmdzLmxlbmd0aCA+PSAyICYmIGFyZ3NbMF0gPT09ICd1cGRhdGUnICYmIHR5cGVvZiBhcmdzWzFdID09PSAnb2JqZWN0JztcbiAgICBpZiAoaXNVcGRhdGUpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBhcmdzWzFdO1xuICAgICAgICByZXR1cm4gbWV0aG9kcy51cGRhdGUuY2FsbCh0aGlzLCBzdGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiAkLmVycm9yKCdUaGlzIG1ldGhvZCBkb2VzIG5vdCBleGlzdCcpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgTXlFdmVudF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL015RXZlbnRcIikpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5jbGFzcyBFdmVudENyZWF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmV2ZW50cyA9IHt9O1xuICAgIH1cbiAgICByZWdpc3RlckV2ZW50KGV2ZW50TmFtZSkge1xuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBNeUV2ZW50XzEuZGVmYXVsdChldmVudE5hbWUpO1xuICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gZXZlbnQ7XG4gICAgfVxuICAgIGRpc3BhdGNoRXZlbnQoZXZlbnROYW1lLCBldmVudEFyZ3MpIHtcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5jYWxsYmFja3MuZm9yRWFjaCgoY2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGV2ZW50QXJncyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5yZWdpc3RlckNhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBFdmVudENyZWF0b3I7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIE15RXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5jYWxsYmFja3MgPSBbXTtcbiAgICB9XG4gICAgcmVnaXN0ZXJDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBNeUV2ZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjYWxjVXRpbHNfMSA9IHJlcXVpcmUoXCJ1dGlscy9jYWxjVXRpbHNcIik7XG5jb25zdCBFdmVudENyZWF0b3JfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vRXZlbnRDcmVhdG9yL0V2ZW50Q3JlYXRvclwiKSk7XG5jbGFzcyBNb2RlbCBleHRlbmRzIEV2ZW50Q3JlYXRvcl8xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBtYXg6IDEwMCxcbiAgICAgICAgICAgIGZyb206IDAsXG4gICAgICAgICAgICB0bzogMTAwLFxuICAgICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgICAgIHRpcDogdHJ1ZSxcbiAgICAgICAgICAgIHJhbmdlOiB0cnVlLFxuICAgICAgICAgICAgcHJvZ3Jlc3M6IHRydWUsXG4gICAgICAgICAgICBzY2FsZTogdHJ1ZSxcbiAgICAgICAgICAgIHNjYWxlRGVzdGlueTogMTAsXG4gICAgICAgICAgICBob3Jpem9udGFsOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pbml0KHN0YXRlKTtcbiAgICB9XG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgY29uc3QgW3ZhbHVlcywgc2V0dGluZ3NdID0gdGhpcy5zcGxpdFBhcmFtcyhzdGF0ZSk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUpLCB0aGlzLm1pbk1heFZhbGlkYXRvcihzZXR0aW5ncykpO1xuICAgICAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlKSwgdGhpcy5yYW5nZUZyb21Ub1ZhbGlkYXRvcih0aGlzLnN0ZXBWYWxpZGF0b3IodmFsdWVzKSkpO1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ01vZGVsRXZlbnQnLCB0aGlzLnN0YXRlKTtcbiAgICB9XG4gICAgZ2V0U3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICAgIH1cbiAgICBpbml0KHN0YXRlKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnTW9kZWxFdmVudCcpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHN0YXRlKTtcbiAgICB9XG4gICAgc3BsaXRQYXJhbXMoZGF0YSkge1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSB7fTtcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSB7fTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xuICAgICAgICAnZnJvbScgaW4gZGF0YVxuICAgICAgICAgICAgPyAodmFsdWVzLmZyb20gPSBkYXRhLmZyb20pXG4gICAgICAgICAgICA6ICh2YWx1ZXMuZnJvbSA9IHRoaXMuc3RhdGUuZnJvbSk7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnMsIHByZXR0aWVyL3ByZXR0aWVyXG4gICAgICAgICd0bycgaW4gZGF0YVxuICAgICAgICAgICAgPyAodmFsdWVzLnRvID0gZGF0YS50bylcbiAgICAgICAgICAgIDogKHZhbHVlcy50byA9IHRoaXMuc3RhdGUudG8pO1xuICAgICAgICBpZiAoZGF0YS5zdGVwICE9PSB1bmRlZmluZWQgJiYgZGF0YS5zdGVwID4gMClcbiAgICAgICAgICAgIHNldHRpbmdzLnN0ZXAgPSBkYXRhLnN0ZXA7XG4gICAgICAgIGlmIChkYXRhLm1pbiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgc2V0dGluZ3MubWluID0gZGF0YS5taW47XG4gICAgICAgIGlmIChkYXRhLm1heCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgc2V0dGluZ3MubWF4ID0gZGF0YS5tYXg7XG4gICAgICAgIGlmIChkYXRhLnNjYWxlICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBzZXR0aW5ncy5zY2FsZSA9IGRhdGEuc2NhbGU7XG4gICAgICAgIGlmIChkYXRhLnJhbmdlICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBzZXR0aW5ncy5yYW5nZSA9IGRhdGEucmFuZ2U7XG4gICAgICAgIGlmIChkYXRhLnRpcCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgc2V0dGluZ3MudGlwID0gZGF0YS50aXA7XG4gICAgICAgIGlmIChkYXRhLnByb2dyZXNzICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBzZXR0aW5ncy5wcm9ncmVzcyA9IGRhdGEucHJvZ3Jlc3M7XG4gICAgICAgIGlmIChkYXRhLmhvcml6b250YWwgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHNldHRpbmdzLmhvcml6b250YWwgPSBkYXRhLmhvcml6b250YWw7XG4gICAgICAgIGlmIChkYXRhLnNjYWxlRGVzdGlueSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgc2V0dGluZ3Muc2NhbGVEZXN0aW55ID0gZGF0YS5zY2FsZURlc3RpbnkgPD0gMCA/IDEgOiBkYXRhLnNjYWxlRGVzdGlueTtcbiAgICAgICAgcmV0dXJuIFt2YWx1ZXMsIHNldHRpbmdzXTtcbiAgICB9XG4gICAgbWluTWF4VmFsaWRhdG9yKGRhdGEpIHtcbiAgICAgICAgbGV0IHsgbWluID0gdGhpcy5zdGF0ZS5taW4gfSA9IGRhdGE7XG4gICAgICAgIGNvbnN0IHsgbWF4ID0gdGhpcy5zdGF0ZS5tYXggfSA9IGRhdGE7XG4gICAgICAgIGlmIChtaW4gPiBtYXgpXG4gICAgICAgICAgICBtaW4gPSBtYXg7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGRhdGEpLCB7IG1pbiwgbWF4IH0pO1xuICAgIH1cbiAgICBzdGVwVmFsaWRhdG9yKGRhdGEpIHtcbiAgICAgICAgY29uc3QgY29weU9mRGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGEpO1xuICAgICAgICBpZiAoY29weU9mRGF0YS5mcm9tICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvcHlPZkRhdGEuZnJvbSA9IHRoaXMuY2hlY2tTdGVwKGNvcHlPZkRhdGEuZnJvbSk7XG4gICAgICAgICAgICBpZiAoY29weU9mRGF0YS5mcm9tIDw9IHRoaXMuc3RhdGUubWluKSB7XG4gICAgICAgICAgICAgICAgY29weU9mRGF0YS5mcm9tID0gdGhpcy5zdGF0ZS5taW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjb3B5T2ZEYXRhLmZyb20gPj0gdGhpcy5zdGF0ZS5tYXgpIHtcbiAgICAgICAgICAgICAgICBjb3B5T2ZEYXRhLmZyb20gPSB0aGlzLnN0YXRlLm1heDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY29weU9mRGF0YS50byAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb3B5T2ZEYXRhLnRvID0gdGhpcy5jaGVja1N0ZXAoY29weU9mRGF0YS50byk7XG4gICAgICAgICAgICBpZiAoY29weU9mRGF0YS50byA8PSB0aGlzLnN0YXRlLm1pbikge1xuICAgICAgICAgICAgICAgIGNvcHlPZkRhdGEudG8gPSB0aGlzLnN0YXRlLm1pbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNvcHlPZkRhdGEudG8gPj0gdGhpcy5zdGF0ZS5tYXgpIHtcbiAgICAgICAgICAgICAgICBjb3B5T2ZEYXRhLnRvID0gdGhpcy5zdGF0ZS5tYXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvcHlPZkRhdGE7XG4gICAgfVxuICAgIGNoZWNrU3RlcCh2YWx1ZSkge1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4LCBzdGVwIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBpbnRlcnZhbCA9IG1heCAtIG1pbjtcbiAgICAgICAgY29uc3Qgc3RlcEluUGVyY2VudCA9IDEwMCAvIChpbnRlcnZhbCAvIHN0ZXApO1xuICAgICAgICBjb25zdCB2YWx1ZUluUGVyY2VudCA9ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiArKDAsIGNhbGNVdGlsc18xLmNvbnZlcnRQZXJjZW50SW5WYWx1ZSkobWluLCBtYXgsIE1hdGgucm91bmQodmFsdWVJblBlcmNlbnQgLyBzdGVwSW5QZXJjZW50KSAqIHN0ZXBJblBlcmNlbnQpLnRvRml4ZWQoMik7XG4gICAgfVxuICAgIHJhbmdlRnJvbVRvVmFsaWRhdG9yKGRhdGEpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnJhbmdlKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb3B5T2ZTRGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGEpO1xuICAgICAgICBpZiAoY29weU9mU0RhdGEuZnJvbSAhPT0gdW5kZWZpbmVkICYmIGNvcHlPZlNEYXRhLnRvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGlzRnJvbU5vdFZhbGlkbHkgPSB0aGlzLnN0YXRlLnRvIC0gY29weU9mU0RhdGEuZnJvbSA8PSAwO1xuICAgICAgICAgICAgY29uc3QgaXNUb05vdFZhbGlkbHkgPSBjb3B5T2ZTRGF0YS50byAtIHRoaXMuc3RhdGUuZnJvbSA8PSAwO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuZnJvbSA+IHRoaXMuc3RhdGUudG8pXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5mcm9tID0gdGhpcy5zdGF0ZS50bztcbiAgICAgICAgICAgIGlmIChpc0Zyb21Ob3RWYWxpZGx5KVxuICAgICAgICAgICAgICAgIGNvcHlPZlNEYXRhLmZyb20gPSB0aGlzLnN0YXRlLnRvO1xuICAgICAgICAgICAgaWYgKGlzVG9Ob3RWYWxpZGx5KVxuICAgICAgICAgICAgICAgIGNvcHlPZlNEYXRhLnRvID0gdGhpcy5zdGF0ZS5mcm9tO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb3B5T2ZTRGF0YTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBNb2RlbDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY2FsY1V0aWxzXzEgPSByZXF1aXJlKFwidXRpbHMvY2FsY1V0aWxzXCIpO1xuY29uc3QgTW9kZWxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vTW9kZWwvTW9kZWxcIikpO1xuY29uc3QgVmlld18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9WaWV3L1ZpZXdcIikpO1xuY29uc3QgRXZlbnRDcmVhdG9yXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL0V2ZW50Q3JlYXRvci9FdmVudENyZWF0b3JcIikpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5jbGFzcyBQcmVzZW50ZXIgZXh0ZW5kcyBFdmVudENyZWF0b3JfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlRWxlbSwgc3RhdGUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXdfMS5kZWZhdWx0KG5vZGVFbGVtKTtcbiAgICAgICAgdGhpcy5tb2RlbCA9IG5ldyBNb2RlbF8xLmRlZmF1bHQoc3RhdGUpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ29uQ2hhbmdlJyk7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLnZpZXcuc2V0U3RhdGUodGhpcy5tb2RlbC5nZXRTdGF0ZSgpKTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9XG4gICAgYmluZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLnZpZXdFdmVudEhhbmRsZXIgPSB0aGlzLnZpZXdFdmVudEhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5tb2RlbEV2ZW50SGFuZGxlciA9IHRoaXMubW9kZWxFdmVudEhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy52aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ1ZpZXdFdmVudCcsIHRoaXMudmlld0V2ZW50SGFuZGxlcik7XG4gICAgICAgIHRoaXMubW9kZWwuYWRkRXZlbnRMaXN0ZW5lcignTW9kZWxFdmVudCcsIHRoaXMubW9kZWxFdmVudEhhbmRsZXIpO1xuICAgIH1cbiAgICB2aWV3RXZlbnRIYW5kbGVyKGUpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCB9ID0gdGhpcy5tb2RlbC5nZXRTdGF0ZSgpO1xuICAgICAgICBjb25zdCBpc051bWJlcnMgPSB0eXBlb2YgbWluID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgbWF4ID09PSAnbnVtYmVyJztcbiAgICAgICAgaWYgKCFpc051bWJlcnMpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmIChlLmZyb20pXG4gICAgICAgICAgICBlLmZyb20gPSArKDAsIGNhbGNVdGlsc18xLmNvbnZlcnRQZXJjZW50SW5WYWx1ZSkobWluLCBtYXgsIGUuZnJvbSkudG9GaXhlZCgzKTtcbiAgICAgICAgaWYgKGUudG8pXG4gICAgICAgICAgICBlLnRvID0gKygwLCBjYWxjVXRpbHNfMS5jb252ZXJ0UGVyY2VudEluVmFsdWUpKG1pbiwgbWF4LCBlLnRvKS50b0ZpeGVkKDMpO1xuICAgICAgICB0aGlzLm1vZGVsLnNldFN0YXRlKGUpO1xuICAgIH1cbiAgICBtb2RlbEV2ZW50SGFuZGxlcihlKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnb25DaGFuZ2UnLCBlKTtcbiAgICAgICAgdGhpcy52aWV3LnNldFN0YXRlKGUpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFByZXNlbnRlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY2FsY1V0aWxzXzEgPSByZXF1aXJlKFwidXRpbHMvY2FsY1V0aWxzXCIpO1xuY29uc3QgSGFuZGxlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vc3ViVmlldy9IYW5kbGUvSGFuZGxlXCIpKTtcbmNvbnN0IFNlY29uZEhhbmRsZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3N1YlZpZXcvSGFuZGxlL1NlY29uZEhhbmRsZVwiKSk7XG5jb25zdCBTY2FsZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3N1YlZpZXcvU2NhbGUvU2NhbGVcIikpO1xuY29uc3QgVGlwXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vc3ViVmlldy9UaXAvVGlwXCIpKTtcbmNvbnN0IFNlY29uZFRpcF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3N1YlZpZXcvVGlwL1NlY29uZFRpcFwiKSk7XG5jb25zdCBUcmFja18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3N1YlZpZXcvVHJhY2svVHJhY2tcIikpO1xuY29uc3QgRXZlbnRDcmVhdG9yXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL0V2ZW50Q3JlYXRvci9FdmVudENyZWF0b3JcIikpO1xuY2xhc3MgVmlldyBleHRlbmRzIEV2ZW50Q3JlYXRvcl8xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKG5vZGVFbGVtKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubm9kZUVsZW0gPSBub2RlRWxlbTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzID0gW107XG4gICAgICAgIC8qKiDQuNGB0YLQvtC70YzQt9C+0LLQsNC7IGFzINC/0L7RgtC+0LzRgyDRh9GC0L4g0LfQvdCw0LXQvCDRgtC+0YfQvdC+INGH0YLQviDQv9C+0YHQu9C1INC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4INC40LcgTW9kZWwg0L/RgNC40LnQtNC10YIgc3RhdGUg0YLQuNC/0LAgU3RhdGUsXG4gICAgICAgICAqINC90LUg0LfQvdCw0Y4g0L3QsCDRgdC60L7Qu9GM0LrQviDRg9C80LXRgdGC0L3QviDRgtCw0Log0LTQtdC70LDRgtGMINC90L4g0YDQtdGI0LjQuyDRgNC40YHQutC90YPRgtGMLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHt9O1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tJc0NoYW5nZWRTZXR0aW5ncyhzdGF0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMucmVidWlsZFNsaWRlcihzdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZSksIHN0YXRlKTtcbiAgICAgICAgdGhpcy51cGRhdGUodGhpcy5zdGF0ZSk7XG4gICAgICAgIHRoaXMuY2hlY2tUaXBzKCk7XG4gICAgICAgIHRoaXMuY2hlY2tTY2FsZSgpO1xuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmNyZWF0ZVNsaWRlcigpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ1ZpZXdFdmVudCcpO1xuICAgIH1cbiAgICBjcmVhdGVTbGlkZXIoKSB7XG4gICAgICAgIHRoaXMuc2xpZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ2pxLXNsaWRlcicpO1xuICAgICAgICB0aGlzLm5vZGVFbGVtLmFwcGVuZENoaWxkKHRoaXMuc2xpZGVyKTtcbiAgICB9XG4gICAgY3JlYXRlQ29tcG9uZW50cyhzdGF0ZSkge1xuICAgICAgICBjb25zdCB7IHJhbmdlLCB0aXAsIHNjYWxlLCBob3Jpem9udGFsIH0gPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzLnB1c2gobmV3IEhhbmRsZV8xLmRlZmF1bHQodGhpcy5zbGlkZXIpKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzLnB1c2gobmV3IFRyYWNrXzEuZGVmYXVsdCh0aGlzLnNsaWRlcikpO1xuICAgICAgICBpZiAodGlwKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMucHVzaChuZXcgVGlwXzEuZGVmYXVsdCh0aGlzLnNsaWRlcikpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzLnB1c2gobmV3IFNlY29uZEhhbmRsZV8xLmRlZmF1bHQodGhpcy5zbGlkZXIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmFuZ2UgJiYgdGlwKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMucHVzaChuZXcgU2Vjb25kVGlwXzEuZGVmYXVsdCh0aGlzLnNsaWRlcikpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY2FsZSkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzLnB1c2gobmV3IFNjYWxlXzEuZGVmYXVsdCh0aGlzLnNsaWRlcikpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChob3Jpem9udGFsKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlci5jbGFzc0xpc3QuYWRkKCdqcS1zbGlkZXJfaG9yaXpvbnRhbCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zbGlkZXIuY2xhc3NMaXN0LnJlbW92ZSgnanEtc2xpZGVyX2hvcml6b250YWwnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBiaW5kRXZlbnRMaXN0ZW5lcigpIHtcbiAgICAgICAgdGhpcy5zdWJWaWV3RXZlbnRIYW5kbGVyID0gdGhpcy5zdWJWaWV3RXZlbnRIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cy5mb3JFYWNoKChjb21wb25lbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChjb21wb25lbnQuZXZlbnRzLlN1YlZpZXdFdmVudCkge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKCdTdWJWaWV3RXZlbnQnLCB0aGlzLnN1YlZpZXdFdmVudEhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3ViVmlld0V2ZW50SGFuZGxlcihlKSB7XG4gICAgICAgIGNvbnN0IHNpemUgPSB0aGlzLnN0YXRlLmhvcml6b250YWxcbiAgICAgICAgICAgID8gdGhpcy5zbGlkZXIuY2xpZW50SGVpZ2h0XG4gICAgICAgICAgICA6IHRoaXMuc2xpZGVyLmNsaWVudFdpZHRoO1xuICAgICAgICBpZiAoZS50YXJnZXQgPT09ICdmcm9tJykge1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdWaWV3RXZlbnQnLCB7XG4gICAgICAgICAgICAgICAgZnJvbTogKDAsIGNhbGNVdGlsc18xLmNvbnZlcnRQaXhlbEluUGVyY2VudCkoc2l6ZSwgZS5wb3NpdGlvbiksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZS50YXJnZXQgPT09ICd0bycpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnVmlld0V2ZW50Jywge1xuICAgICAgICAgICAgICAgIHRvOiAoMCwgY2FsY1V0aWxzXzEuY29udmVydFBpeGVsSW5QZXJjZW50KShzaXplLCBlLnBvc2l0aW9uKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gJ3RyYWNrJyB8fCBlLnRhcmdldCA9PT0gJ3NjYWxlJykge1xuICAgICAgICAgICAgY29uc3QgaGFuZGxlcyA9IHRoaXMuZ2V0QXJyT2ZDb25jcmV0ZVN1YlZpZXcoSGFuZGxlXzEuZGVmYXVsdCk7XG4gICAgICAgICAgICBjb25zdCBmcm9tID0gaGFuZGxlc1swXS5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnJhbmdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdWaWV3RXZlbnQnLCB7XG4gICAgICAgICAgICAgICAgICAgIGZyb206ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0UGl4ZWxJblBlcmNlbnQpKHNpemUsIGUucG9zaXRpb24pLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHRvID0gaGFuZGxlc1sxXS5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKGZyb20gLSBlLnBvc2l0aW9uKSA8PSB0byAtIGUucG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ1ZpZXdFdmVudCcsIHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogKDAsIGNhbGNVdGlsc18xLmNvbnZlcnRQaXhlbEluUGVyY2VudCkoc2l6ZSwgZS5wb3NpdGlvbiksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdWaWV3RXZlbnQnLCB7XG4gICAgICAgICAgICAgICAgdG86ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0UGl4ZWxJblBlcmNlbnQpKHNpemUsIGUucG9zaXRpb24pLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2hlY2tJc0NoYW5nZWRTZXR0aW5ncyhzdGF0ZSkge1xuICAgICAgICBjb25zdCB7IGZyb20sIHRvIH0gPSBzdGF0ZSwgc2V0dGluZ3MgPSBfX3Jlc3Qoc3RhdGUsIFtcImZyb21cIiwgXCJ0b1wiXSk7XG4gICAgICAgIHJldHVybiBPYmplY3QuZW50cmllcyhzZXR0aW5ncykucmVkdWNlKChmbGFnLCBlbnRyaWVzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBba2V5LCB2YWx1ZV0gPSBlbnRyaWVzO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVba2V5XSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmbGFnO1xuICAgICAgICB9LCBmYWxzZSk7XG4gICAgfVxuICAgIHJlYnVpbGRTbGlkZXIoc3RhdGUpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzID0gW107XG4gICAgICAgIHRoaXMuc2xpZGVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICB0aGlzLmNyZWF0ZUNvbXBvbmVudHMoc3RhdGUpO1xuICAgICAgICB0aGlzLmJpbmRFdmVudExpc3RlbmVyKCk7XG4gICAgfVxuICAgIGNoZWNrVGlwcygpIHtcbiAgICAgICAgY29uc3QgeyB0aXAsIHJhbmdlLCBob3Jpem9udGFsIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBpZiAoISh0aXAgJiYgcmFuZ2UpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGlwcyA9IHRoaXMuZ2V0QXJyT2ZDb25jcmV0ZVN1YlZpZXcoVGlwXzEuZGVmYXVsdCk7XG4gICAgICAgIGNvbnN0IHNpemUgPSBob3Jpem9udGFsXG4gICAgICAgICAgICA/IHRpcHNbMV0uc3ViVmlldy5jbGllbnRIZWlnaHRcbiAgICAgICAgICAgIDogdGlwc1sxXS5zdWJWaWV3Lm9mZnNldFdpZHRoO1xuICAgICAgICBjb25zdCBmaXJzdFBvc2l0aW9uID0gdGlwc1swXS5nZXRQb3NpdGlvbigpO1xuICAgICAgICBjb25zdCBzZWNvbmRQb3NpdGlvbiA9IHRpcHNbMV0uZ2V0UG9zaXRpb24oKSAtIHNpemU7XG4gICAgICAgIGlmIChmaXJzdFBvc2l0aW9uID4gc2Vjb25kUG9zaXRpb24pIHtcbiAgICAgICAgICAgIHRpcHMuZm9yRWFjaCgodCkgPT4ge1xuICAgICAgICAgICAgICAgIHQuY2hhbmdlSXNEb3VibGUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgdC5zZXRTdGF0ZSh0aGlzLnN0YXRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGlwcy5mb3JFYWNoKCh0KSA9PiB7XG4gICAgICAgICAgICAgICAgdC5jaGFuZ2VJc0RvdWJsZShmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGVja1NjYWxlKCkge1xuICAgICAgICBjb25zdCB7IHNjYWxlOiBzLCB0aXAsIHJhbmdlIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBpZiAoIShzICYmIHRpcCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IFtzY2FsZV0gPSB0aGlzLmdldEFyck9mQ29uY3JldGVTdWJWaWV3KFNjYWxlXzEuZGVmYXVsdCk7XG4gICAgICAgIGNvbnN0IHRpcHMgPSB0aGlzLmdldEFyck9mQ29uY3JldGVTdWJWaWV3KFRpcF8xLmRlZmF1bHQpO1xuICAgICAgICBjb25zdCBzY2FsZVN0YXJ0ID0gc2NhbGUuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgY29uc3Qgc2NhbGVFbmQgPSBzY2FsZVN0YXJ0ICsgc2NhbGUuZ2V0U2l6ZSgpO1xuICAgICAgICBjb25zdCBpc0Zyb21OZWFyYnlTdGFydCA9IHNjYWxlU3RhcnQgLSB0aXBzWzBdLmdldFBvc2l0aW9uKCkgKyB0aXBzWzBdLmdldFNpemUoKSA+IDA7XG4gICAgICAgIGNvbnN0IGlzRnJvbU5lYXJieUVuZCA9IHNjYWxlRW5kIC0gdGlwc1swXS5nZXRQb3NpdGlvbigpIC0gdGlwc1swXS5nZXRTaXplKCkgKiAyIDwgMDtcbiAgICAgICAgc2NhbGUudmlzaWJpbGl0eVN3aXRjaGVyKCdmaXJzdCcsIGlzRnJvbU5lYXJieVN0YXJ0KTtcbiAgICAgICAgc2NhbGUudmlzaWJpbGl0eVN3aXRjaGVyKCdsYXN0JywgaXNGcm9tTmVhcmJ5RW5kKTtcbiAgICAgICAgaWYgKHJhbmdlKSB7XG4gICAgICAgICAgICBjb25zdCBpc1RvTmVhcmJ5RW5kID0gc2NhbGVFbmQgLSB0aXBzWzFdLmdldFBvc2l0aW9uKCkgLSB0aXBzWzFdLmdldFNpemUoKSAqIDIgPCAwO1xuICAgICAgICAgICAgc2NhbGUudmlzaWJpbGl0eVN3aXRjaGVyKCdsYXN0JywgaXNUb05lYXJieUVuZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXBkYXRlKHN0YXRlKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cy5mb3JFYWNoKChjb21wb25lbnQpID0+IGNvbXBvbmVudC5zZXRTdGF0ZShzdGF0ZSkpO1xuICAgIH1cbiAgICBnZXRBcnJPZkNvbmNyZXRlU3ViVmlldyhpbnN0YW5jZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnRzLmZpbHRlcigoY29tcG9uZW50KSA9PiBjb21wb25lbnQgaW5zdGFuY2VvZiBpbnN0YW5jZSk7XG4gICAgICAgIC8qKiDQmNC00LXRjyDQtNCw0L3QvdC+0LPQviDQvNC10YLQvtC00LAg0LHRi9C70LAg0LIg0YLQvtC8INGH0YLQvtCx0Ysg0LLQtdGA0L3Rg9GC0Ywg0LzQsNGB0YHQuNCyINC40L3RgdGC0LDQvdGB0L7QsiDQvtC/0YDQtdC00LXQu9C10L3QvtCz0L4g0LrQu9Cw0YHRgdCwLlxuICAgICAgICAgKiDRgyDQstGB0LXRhSDRjdGC0LjRhSDQutC70LDRgdGB0L7QsiDQvNC90L7Qs9C+INGB0YXQvtC20LjRhSDRgdCy0L7QudGB0YIg0Lgg0LzQtdGC0L7QtNC+0LIsINC90L4g0LXRgdGC0Ywg0Lgg0YHQstC+0Lgg0L7RgdC+0LHQtdC90L3Ri9C1LiDQpdC+0YLQtdC70L7RgtGMINCx0YtcbiAgICAgICAgICog0L/RgNC+0YHRgtC+INC60LDQuiDQsNCz0YDRg9C80LXQvdGCINGD0LrQsNC30YvQstCw0YLRjCDQmtC70LDRgdGBINC4INGH0YLQvtCx0YsgVFMg0L/QvtGB0LvQtSDRjdGC0L7Qs9C+INCy0LjQtNC10Lsg0LLRgdC1INC10LPQviDRgdCy0L7QudGC0LLQsCDQuCDQvNC10YLQvtC00YsuXG4gICAgICAgICAqINCyINC40YLQvtCz0LUg0L/QvtGB0LvQtSDQtNC+0LvQs9C40YUg0L/QvtC/0YvRgtC+0Log0L3QtSDRh9C10LPQviDQutCw0Log0YHQtNC10LvQsNGC0Ywg0YLQsNC6INGH0LXRgNC10LcgYXMgVFtdINGPINC6INGB0L7QttC10LvQtdC90LjRjiDQvdC1INC/0YDQuNC00YPQvNCw0LsuXG4gICAgICAgICAqL1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFZpZXc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IE1vdmFibGVTdWJWaWV3XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2Jhc2VDbGFzc2VzL01vdmFibGVTdWJWaWV3L01vdmFibGVTdWJWaWV3XCIpKTtcbmNsYXNzIEhhbmRsZSBleHRlbmRzIE1vdmFibGVTdWJWaWV3XzEuZGVmYXVsdCB7XG4gICAgZ2V0UG9zaXRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmhvcml6b250YWwpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1YlZpZXdUb3AgPSB0aGlzLnN1YlZpZXcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgICAgICAgY29uc3Qgc2xpZGVyVG9wID0gdGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgICAgICAgcmV0dXJuIHN1YlZpZXdUb3AgLSBzbGlkZXJUb3AgKyB0aGlzLnN1YlZpZXcub2Zmc2V0SGVpZ2h0IC8gMjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdWJWaWV3TGVmdCA9IHRoaXMuc3ViVmlldy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgICAgICBjb25zdCBzbGlkZXJMZWZ0ID0gdGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICAgICAgcmV0dXJuIHN1YlZpZXdMZWZ0IC0gc2xpZGVyTGVmdCArIHRoaXMuc3ViVmlldy5vZmZzZXRXaWR0aCAvIDI7XG4gICAgfVxuICAgIGNyZWF0ZVN1YlZpZXcoKSB7XG4gICAgICAgIHN1cGVyLmNyZWF0ZVN1YlZpZXcoKTtcbiAgICAgICAgdGhpcy5zdWJWaWV3LmNsYXNzTGlzdC5hZGQoJ2pxLXNsaWRlcl9faGFuZGxlJyk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5zdHlsZS56SW5kZXggPSAnNSc7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gSGFuZGxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBIYW5kbGVfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9IYW5kbGVcIikpO1xuY2xhc3MgU2Vjb25kSGFuZGxlIGV4dGVuZHMgSGFuZGxlXzEuZGVmYXVsdCB7XG4gICAgY29uc3RydWN0b3Ioc2xpZGVyKSB7XG4gICAgICAgIHN1cGVyKHNsaWRlcik7XG4gICAgICAgIHRoaXMucm9sZSA9ICd0byc7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgY29uc3Qgc2l6ZSA9IHRoaXMuc3RhdGUuaG9yaXpvbnRhbFxuICAgICAgICAgICAgPyB0aGlzLnNsaWRlci5jbGllbnRIZWlnaHRcbiAgICAgICAgICAgIDogdGhpcy5zbGlkZXIuY2xpZW50V2lkdGg7XG4gICAgICAgIGlmICh0aGlzLmdldFBvc2l0aW9uKCkgPiBzaXplIC8gMikge1xuICAgICAgICAgICAgdGhpcy5zdWJWaWV3LnN0eWxlLnpJbmRleCA9ICc0JztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3ViVmlldy5zdHlsZS56SW5kZXggPSAnNic7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gU2Vjb25kSGFuZGxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjYWxjVXRpbHNfMSA9IHJlcXVpcmUoXCJ1dGlscy9jYWxjVXRpbHNcIik7XG5jb25zdCBhYnN0cmFjdFN1YlZpZXdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vYmFzZUNsYXNzZXMvYWJzdHJhY3RTdWJWaWV3L2Fic3RyYWN0U3ViVmlld1wiKSk7XG5jbGFzcyBTY2FsZSBleHRlbmRzIGFic3RyYWN0U3ViVmlld18xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKHNsaWRlcikge1xuICAgICAgICBzdXBlcihzbGlkZXIpO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCwgaG9yaXpvbnRhbCwgc2NhbGVEZXN0aW55LCBzdGVwIH0gPSBzdGF0ZTtcbiAgICAgICAgY29uc3Qgb2xkU3RhdGUgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZSksIHsgbWluLFxuICAgICAgICAgICAgbWF4LFxuICAgICAgICAgICAgaG9yaXpvbnRhbCxcbiAgICAgICAgICAgIHNjYWxlRGVzdGlueSxcbiAgICAgICAgICAgIHN0ZXAgfSk7XG4gICAgICAgIGlmIChvbGRTdGF0ZSAhPT0gSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVTdWJWaWV3KCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnU3ViVmlld0V2ZW50Jyk7XG4gICAgfVxuICAgIGNyZWF0ZVN1YlZpZXcoKSB7XG4gICAgICAgIHRoaXMuc3ViVmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnN1YlZpZXcuY2xhc3NMaXN0LmFkZCgnanEtc2xpZGVyX19zY2FsZScpO1xuICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmRDaGlsZCh0aGlzLnN1YlZpZXcpO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIHN0ZXAsIGhvcml6b250YWwsIHNjYWxlRGVzdGlueSB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgbGV0IHBpcHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgcGlwID0gbWluOyBwaXAgPCBtYXg7IHBpcCArPSBzdGVwIDwgMSA/IDEgOiBzdGVwKSB7XG4gICAgICAgICAgICBwaXBzLnB1c2godGhpcy5jcmVhdGVQaXBGcmFnbWVudChtaW4sIG1heCwgcGlwKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWF4U3ltYm9sc0luUGlwID0gTWF0aC5hYnMobWluKSA+IE1hdGguYWJzKG1heClcbiAgICAgICAgICAgID8gbWluLnRvU3RyaW5nKCkubGVuZ3RoXG4gICAgICAgICAgICA6IG1heC50b1N0cmluZygpLmxlbmd0aDtcbiAgICAgICAgY29uc3Qgc2l6ZU9mUGlwID0gaG9yaXpvbnRhbFxuICAgICAgICAgICAgPyB0aGlzLnNsaWRlci5jbGllbnRIZWlnaHQgLyAyMFxuICAgICAgICAgICAgOiB0aGlzLnNsaWRlci5jbGllbnRXaWR0aCAvIChtYXhTeW1ib2xzSW5QaXAgKiAxMCk7XG4gICAgICAgIGlmIChwaXBzLmxlbmd0aCA+IHNpemVPZlBpcCkge1xuICAgICAgICAgICAgcGlwcyA9IHBpcHMuZmlsdGVyKChfcGlwLCBpKSA9PiBpICUgTWF0aC5yb3VuZChwaXBzLmxlbmd0aCAvIHNpemVPZlBpcCkgPT09IDApO1xuICAgICAgICB9XG4gICAgICAgIHBpcHMgPSBwaXBzLmZpbHRlcigoX3BpcCwgaSkgPT4gaSAlIHNjYWxlRGVzdGlueSA9PT0gMCk7XG4gICAgICAgIHBpcHMucHVzaCh0aGlzLmNyZWF0ZVBpcEZyYWdtZW50KG1pbiwgbWF4LCBtYXgpKTtcbiAgICAgICAgdGhpcy5zdWJWaWV3LmlubmVySFRNTCA9IHBpcHMuam9pbignJyk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50TGlzdGVuZXIoKTtcbiAgICB9XG4gICAgdmlzaWJpbGl0eVN3aXRjaGVyKHBvc2l0aW9uSW5TY2FsZSwgdmlzaWJsZSkge1xuICAgICAgICBjb25zdCBwaXBzID0gdGhpcy5zdWJWaWV3LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcS1zbGlkZXJfX3NjYWxlLWxhYmVsJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHBvc2l0aW9uSW5TY2FsZSwgdmlzaWJsZSk7XG4gICAgICAgIGlmIChwb3NpdGlvbkluU2NhbGUgPT09ICdmaXJzdCcgJiYgcGlwc1swXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG4gICAgICAgICAgICB2aXNpYmxlXG4gICAgICAgICAgICAgICAgPyBwaXBzWzBdLmNsYXNzTGlzdC5hZGQoJ2pzLXNsaWRlcl9fc2NhbGUtbGFiZWxfaGlkZGVuJylcbiAgICAgICAgICAgICAgICA6IHBpcHNbMF0uY2xhc3NMaXN0LnJlbW92ZSgnanMtc2xpZGVyX19zY2FsZS1sYWJlbF9oaWRkZW4nKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBudW1iZXJPZkxhc3RQaXAgPSBwaXBzLmxlbmd0aCAtIDE7XG4gICAgICAgIGlmIChwb3NpdGlvbkluU2NhbGUgPT09ICdsYXN0JyAmJlxuICAgICAgICAgICAgcGlwc1tudW1iZXJPZkxhc3RQaXBdIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnNcbiAgICAgICAgICAgIHZpc2libGVcbiAgICAgICAgICAgICAgICA/IHBpcHNbbnVtYmVyT2ZMYXN0UGlwXS5jbGFzc0xpc3QuYWRkKCdqcy1zbGlkZXJfX3NjYWxlLWxhYmVsX2hpZGRlbicpXG4gICAgICAgICAgICAgICAgOiBwaXBzW251bWJlck9mTGFzdFBpcF0uY2xhc3NMaXN0LnJlbW92ZSgnanMtc2xpZGVyX19zY2FsZS1sYWJlbF9oaWRkZW4nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjcmVhdGVQaXBGcmFnbWVudChtaW4sIG1heCwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJqcS1zbGlkZXJfX3NjYWxlLXBpcFwiIHN0eWxlPVwidG9wOiR7KDAsIGNhbGNVdGlsc18xLmNvbnZlcnRQZXJjZW50SW5WYWx1ZSkoMCwgdGhpcy5zbGlkZXIuY2xpZW50SGVpZ2h0LCAoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgdmFsdWUpKX1weFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwianEtc2xpZGVyX19zY2FsZS1sYWJlbFwiPiR7dmFsdWUudG9GaXhlZCgwKX08L2Rpdj5cbiAgICAgIDwvZGl2PmA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJqcS1zbGlkZXJfX3NjYWxlLXBpcFwiIHN0eWxlPVwibGVmdDokeygwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCB2YWx1ZSl9JVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwianEtc2xpZGVyX19zY2FsZS1sYWJlbFwiPiR7dmFsdWUudG9GaXhlZCgwKX08L2Rpdj5cbiAgICAgIDwvZGl2PmA7XG4gICAgfVxuICAgIGJpbmRFdmVudExpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLmNsaWNrSGFuZGxlciA9IHRoaXMuY2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5xdWVyeVNlbGVjdG9yQWxsKCcuanEtc2xpZGVyX19zY2FsZS1sYWJlbCcpLmZvckVhY2goKHBpcCkgPT4ge1xuICAgICAgICAgICAgaWYgKHBpcCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2xpY2tIYW5kbGVyKGUpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCwgaG9yaXpvbnRhbCB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgaWYgKCEoZS50YXJnZXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvbmVQZXJjZW50ID0gaG9yaXpvbnRhbFxuICAgICAgICAgICAgPyB0aGlzLnNsaWRlci5jbGllbnRIZWlnaHQgLyAxMDBcbiAgICAgICAgICAgIDogdGhpcy5zbGlkZXIuY2xpZW50V2lkdGggLyAxMDA7XG4gICAgICAgIGNvbnN0IHBlcmNlbnRzID0gaG9yaXpvbnRhbFxuICAgICAgICAgICAgPyAoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgK2UudGFyZ2V0LmlubmVySFRNTClcbiAgICAgICAgICAgIDogKDAsIGNhbGNVdGlsc18xLmNvbnZlcnRWYWx1ZUluUGVyY2VudCkobWluLCBtYXgsICtlLnRhcmdldC5pbm5lckhUTUwpO1xuICAgICAgICBsZXQgcG9zaXRpb24gPSBvbmVQZXJjZW50ICogcGVyY2VudHM7XG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgY29uc3Qgc2xpZGVyU2l6ZSA9IGhvcml6b250YWxcbiAgICAgICAgICAgICAgICA/IHRoaXMuc2xpZGVyLmNsaWVudEhlaWdodFxuICAgICAgICAgICAgICAgIDogdGhpcy5zbGlkZXIuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24oKSAtIHNsaWRlclNpemU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdTdWJWaWV3RXZlbnQnLCB7IHRhcmdldDogJ3NjYWxlJywgcG9zaXRpb24gfSk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gU2NhbGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IFRpcF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1RpcFwiKSk7XG5jbGFzcyBTZWNvbmRUaXAgZXh0ZW5kcyBUaXBfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3RvcihzbGlkZXIpIHtcbiAgICAgICAgc3VwZXIoc2xpZGVyKTtcbiAgICAgICAgdGhpcy5yb2xlID0gJ3RvJztcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICBzdXBlci51cGRhdGUoKTtcbiAgICAgICAgY29uc3QgeyB0byB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgaWYgKHRoaXMuaXNEb3VibGUpIHtcbiAgICAgICAgICAgIHRoaXMuc3ViVmlldy5zdHlsZS5vcGFjaXR5ID0gJzAnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdWJWaWV3LnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdWJWaWV3LnRleHRDb250ZW50ID0gdG8udG9TdHJpbmcoKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBTZWNvbmRUaXA7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IE1vdmFibGVTdWJWaWV3XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2Jhc2VDbGFzc2VzL01vdmFibGVTdWJWaWV3L01vdmFibGVTdWJWaWV3XCIpKTtcbmNsYXNzIFRpcCBleHRlbmRzIE1vdmFibGVTdWJWaWV3XzEuZGVmYXVsdCB7XG4gICAgY29uc3RydWN0b3Ioc2xpZGVyKSB7XG4gICAgICAgIHN1cGVyKHNsaWRlcik7XG4gICAgICAgIHRoaXMuaXNEb3VibGUgPSBmYWxzZTtcbiAgICB9XG4gICAgY2hhbmdlSXNEb3VibGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5pc0RvdWJsZSA9IHZhbHVlO1xuICAgIH1cbiAgICBjcmVhdGVTdWJWaWV3KCkge1xuICAgICAgICBzdXBlci5jcmVhdGVTdWJWaWV3KCk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5jbGFzc0xpc3QuYWRkKCdqcS1zbGlkZXJfX3RpcCcpO1xuICAgICAgICB0aGlzLnN1YlZpZXcuc3R5bGUuekluZGV4ID0gJzUnO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZSgpO1xuICAgICAgICBjb25zdCB7IGZyb20sIHRvIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICB0aGlzLnN1YlZpZXcudGV4dENvbnRlbnQgPSB0aGlzLmlzRG91YmxlXG4gICAgICAgICAgICA/IGAke2Zyb219IC0gJHt0b31gXG4gICAgICAgICAgICA6IGZyb20udG9TdHJpbmcoKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBUaXA7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNhbGNVdGlsc18xID0gcmVxdWlyZShcInV0aWxzL2NhbGNVdGlsc1wiKTtcbmNvbnN0IGFic3RyYWN0U3ViVmlld18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9iYXNlQ2xhc3Nlcy9hYnN0cmFjdFN1YlZpZXcvYWJzdHJhY3RTdWJWaWV3XCIpKTtcbmNsYXNzIFRyYWNrIGV4dGVuZHMgYWJzdHJhY3RTdWJWaWV3XzEuZGVmYXVsdCB7XG4gICAgY29uc3RydWN0b3Ioc2xpZGVyKSB7XG4gICAgICAgIHN1cGVyKHNsaWRlcik7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4LCBmcm9tLCB0bywgaG9yaXpvbnRhbCwgcmFuZ2UsIHByb2dyZXNzIH0gPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZSksIHsgbWluLFxuICAgICAgICAgICAgbWF4LFxuICAgICAgICAgICAgZnJvbSxcbiAgICAgICAgICAgIHRvLFxuICAgICAgICAgICAgaG9yaXpvbnRhbCxcbiAgICAgICAgICAgIHJhbmdlLFxuICAgICAgICAgICAgcHJvZ3Jlc3MgfSk7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIGNyZWF0ZVN1YlZpZXcoKSB7XG4gICAgICAgIHRoaXMuc3ViVmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnN1YlZpZXcuY2xhc3NMaXN0LmFkZCgnanEtc2xpZGVyX190cmFjaycpO1xuICAgICAgICB0aGlzLnByb2dyZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MuY2xhc3NMaXN0LmFkZCgnanEtc2xpZGVyX19wcm9ncmVzcycpO1xuICAgICAgICB0aGlzLnN1YlZpZXcuYXBwZW5kQ2hpbGQodGhpcy5wcm9ncmVzcyk7XG4gICAgICAgIHRoaXMuc2xpZGVyLmFwcGVuZENoaWxkKHRoaXMuc3ViVmlldyk7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlU3ViVmlldygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ1N1YlZpZXdFdmVudCcpO1xuICAgICAgICB0aGlzLmJpbmRFdmVudExpc3RlbmVyKCk7XG4gICAgfVxuICAgIGJpbmRFdmVudExpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLmNsaWNrSGFuZGxlciA9IHRoaXMuY2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyKTtcbiAgICB9XG4gICAgY2xpY2tIYW5kbGVyKGUpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdTdWJWaWV3RXZlbnQnLCB7XG4gICAgICAgICAgICB0YXJnZXQ6ICd0cmFjaycsXG4gICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5zdGF0ZS5ob3Jpem9udGFsXG4gICAgICAgICAgICAgICAgPyBlLmNsaWVudFkgLSB0aGlzLnNsaWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3BcbiAgICAgICAgICAgICAgICA6IGUuY2xpZW50WCAtIHRoaXMuc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIGZyb20sIHRvLCBob3Jpem9udGFsLCByYW5nZSwgcHJvZ3Jlc3MgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGlmICghcHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MucmVtb3ZlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RhcnQgPSAoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgZnJvbSk7XG4gICAgICAgIGNvbnN0IGVuZCA9ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCB0byk7XG4gICAgICAgIGlmIChob3Jpem9udGFsICYmIHJhbmdlKSB7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBlbmQgLSBzdGFydDtcbiAgICAgICAgICAgIGNvbnN0IG9uZVBlcmNlbnQgPSB0aGlzLnNsaWRlci5jbGllbnRIZWlnaHQgLyAxMDA7XG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH0lYDtcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3Muc3R5bGUubWFyZ2luVG9wID0gYCR7b25lUGVyY2VudCAqIHN0YXJ0fXB4YDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaG9yaXpvbnRhbCAmJiAhcmFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3Muc3R5bGUuaGVpZ2h0ID0gYCR7c3RhcnR9JWA7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmdlKSB7XG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IGVuZCAtIHN0YXJ0O1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5zdHlsZS53aWR0aCA9IGAke3dpZHRofSVgO1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5zdHlsZS5tYXJnaW5MZWZ0ID0gYCR7c3RhcnR9JWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzLnN0eWxlLndpZHRoID0gYCR7c3RhcnR9JWA7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBUcmFjaztcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY2FsY1V0aWxzXzEgPSByZXF1aXJlKFwidXRpbHMvY2FsY1V0aWxzXCIpO1xuY29uc3QgYWJzdHJhY3RTdWJWaWV3XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2Fic3RyYWN0U3ViVmlldy9hYnN0cmFjdFN1YlZpZXdcIikpO1xuY2xhc3MgTW92YWJsZVN1YlZpZXcgZXh0ZW5kcyBhYnN0cmFjdFN1YlZpZXdfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3RvcihzbGlkZXIpIHtcbiAgICAgICAgc3VwZXIoc2xpZGVyKTtcbiAgICAgICAgdGhpcy5yb2xlID0gJ2Zyb20nO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCwgZnJvbSwgdG8sIGhvcml6b250YWwgfSA9IHN0YXRlO1xuICAgICAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlKSwgeyBtaW4sXG4gICAgICAgICAgICBtYXgsXG4gICAgICAgICAgICBmcm9tLFxuICAgICAgICAgICAgdG8sXG4gICAgICAgICAgICBob3Jpem9udGFsIH0pO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmNyZWF0ZVN1YlZpZXcoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCdTdWJWaWV3RXZlbnQnKTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRMaXN0ZW5lcigpO1xuICAgIH1cbiAgICBiaW5kRXZlbnRMaXN0ZW5lcigpIHtcbiAgICAgICAgdGhpcy5wb2ludGVyU3RhcnQgPSB0aGlzLnBvaW50ZXJTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnN1YlZpZXcuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCB0aGlzLnBvaW50ZXJTdGFydCk7XG4gICAgfVxuICAgIHBvaW50ZXJTdGFydCgpIHtcbiAgICAgICAgdGhpcy5wb2ludGVySGFuZGxlciA9IHRoaXMucG9pbnRlckhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5yZW1vdmVQb2ludFN0YXJ0ID0gdGhpcy5yZW1vdmVQb2ludFN0YXJ0LmJpbmQodGhpcyk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIHRoaXMucG9pbnRlckhhbmRsZXIpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgdGhpcy5yZW1vdmVQb2ludFN0YXJ0KTtcbiAgICB9XG4gICAgcmVtb3ZlUG9pbnRTdGFydCgpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgdGhpcy5wb2ludGVySGFuZGxlcik7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIHRoaXMucG9pbnRlckhhbmRsZXIpO1xuICAgIH1cbiAgICBwb2ludGVySGFuZGxlcihlKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnU3ViVmlld0V2ZW50Jywge1xuICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLnJvbGUsXG4gICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5zdGF0ZS5ob3Jpem9udGFsXG4gICAgICAgICAgICAgICAgPyBlLmNsaWVudFkgLSB0aGlzLnNsaWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3BcbiAgICAgICAgICAgICAgICA6IGUuY2xpZW50WCAtIHRoaXMuc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjcmVhdGVTdWJWaWV3KCkge1xuICAgICAgICB0aGlzLnN1YlZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5zbGlkZXIuYXBwZW5kQ2hpbGQodGhpcy5zdWJWaWV3KTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4LCBmcm9tLCB0bywgaG9yaXpvbnRhbCB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnJvbGUgPT09ICdmcm9tJyA/IGZyb20gOiB0bztcbiAgICAgICAgaWYgKGhvcml6b250YWwpIHtcbiAgICAgICAgICAgIHRoaXMuc3ViVmlldy5zdHlsZS50b3AgPSBgJHsoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgdmFsdWUpfSVgO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdWJWaWV3LnN0eWxlLmxlZnQgPSBgJHsoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgdmFsdWUpfSVgO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gTW92YWJsZVN1YlZpZXc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEV2ZW50Q3JlYXRvcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJjb21wb25lbnRzL0V2ZW50Q3JlYXRvci9FdmVudENyZWF0b3JcIikpO1xuY2xhc3MgU3ViVmlldyBleHRlbmRzIEV2ZW50Q3JlYXRvcl8xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKHNsaWRlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnNsaWRlciA9IHNsaWRlcjtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHt9O1xuICAgIH1cbiAgICBnZXRQb3NpdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3ViVmlldy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc3ViVmlldy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgIH1cbiAgICBnZXRTaXplKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5ob3Jpem9udGFsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdWJWaWV3LmNsaWVudEhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zdWJWaWV3LmNsaWVudFdpZHRoO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFN1YlZpZXc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY29udmVydFBlcmNlbnRJblZhbHVlID0gZXhwb3J0cy5jb252ZXJ0UGl4ZWxJblBlcmNlbnQgPSBleHBvcnRzLmNvbnZlcnRWYWx1ZUluUGVyY2VudCA9IHZvaWQgMDtcbi8qIGVzbGludC1kaXNhYmxlIG5vLW1peGVkLW9wZXJhdG9ycyAqL1xuZnVuY3Rpb24gY29udmVydFZhbHVlSW5QZXJjZW50KG1pbiwgbWF4LCB2YWx1ZSkge1xuICAgIHJldHVybiAoMTAwIC8gKG1heCAtIG1pbikpICogKHZhbHVlIC0gbWluKTtcbn1cbmV4cG9ydHMuY29udmVydFZhbHVlSW5QZXJjZW50ID0gY29udmVydFZhbHVlSW5QZXJjZW50O1xuZnVuY3Rpb24gY29udmVydFBpeGVsSW5QZXJjZW50KHdpZHRoLCB2YWx1ZSkge1xuICAgIHJldHVybiAoMTAwIC8gd2lkdGgpICogdmFsdWU7XG59XG5leHBvcnRzLmNvbnZlcnRQaXhlbEluUGVyY2VudCA9IGNvbnZlcnRQaXhlbEluUGVyY2VudDtcbmZ1bmN0aW9uIGNvbnZlcnRQZXJjZW50SW5WYWx1ZShtaW4sIG1heCwgcGVyY2VudCkge1xuICAgIHJldHVybiAoKG1heCAtIG1pbikgLyAxMDApICogcGVyY2VudCArIG1pbjtcbn1cbmV4cG9ydHMuY29udmVydFBlcmNlbnRJblZhbHVlID0gY29udmVydFBlcmNlbnRJblZhbHVlO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vYXBwLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9