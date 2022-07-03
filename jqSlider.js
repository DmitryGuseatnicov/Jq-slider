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
            ? this.slider.getBoundingClientRect().height
            : this.slider.getBoundingClientRect().width;
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
            return this.subView.getBoundingClientRect().height;
        }
        return this.subView.getBoundingClientRect().width;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7QUN6QkY7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsNkJBQTZCLEdBQUcsNkJBQTZCLEdBQUcsNkJBQTZCO0FBQzdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7Ozs7Ozs7VUNmN0I7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc2xpZGVyLnNjc3M/MGJhOSIsIndlYnBhY2s6Ly8vLi9hcHAudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9FdmVudENyZWF0b3IvRXZlbnRDcmVhdG9yLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvRXZlbnRDcmVhdG9yL015RXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9Nb2RlbC9Nb2RlbC50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1ByZXNlbnRlci9QcmVzZW50ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9WaWV3L1ZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9WaWV3L3N1YlZpZXcvSGFuZGxlL0hhbmRsZS50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1ZpZXcvc3ViVmlldy9IYW5kbGUvU2Vjb25kSGFuZGxlLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvVmlldy9zdWJWaWV3L1NjYWxlL1NjYWxlLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvVmlldy9zdWJWaWV3L1RpcC9TZWNvbmRUaXAudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9WaWV3L3N1YlZpZXcvVGlwL1RpcC50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1ZpZXcvc3ViVmlldy9UcmFjay9UcmFjay50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1ZpZXcvc3ViVmlldy9iYXNlQ2xhc3Nlcy9Nb3ZhYmxlU3ViVmlldy9Nb3ZhYmxlU3ViVmlldy50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1ZpZXcvc3ViVmlldy9iYXNlQ2xhc3Nlcy9hYnN0cmFjdFN1YlZpZXcvYWJzdHJhY3RTdWJWaWV3LnRzIiwid2VicGFjazovLy8uL3V0aWxzL2NhbGNVdGlscy50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIlwidXNlIHN0cmljdFwiO1xuLyogZXNsaW50LWRpc2FibGUgZnNkL25vLWZ1bmN0aW9uLWRlY2xhcmF0aW9uLWluLWV2ZW50LWxpc3RlbmVyICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGZ1bmMtbmFtZXMgKi9cbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IFByZXNlbnRlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJjb21wb25lbnRzL1ByZXNlbnRlci9QcmVzZW50ZXJcIikpO1xucmVxdWlyZShcIi4vc2xpZGVyLnNjc3NcIik7XG5jb25zdCBtZXRob2RzID0ge1xuICAgIGluaXQoc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCBpc0luaXQgPSB0eXBlb2Ygc3RhdGUgPT09ICdvYmplY3QnICYmICEkKHRoaXMpLmRhdGEoJ2pxU2xpZGVyJyk7XG4gICAgICAgICAgICBpZiAoaXNJbml0KSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5kYXRhKCkuanFTbGlkZXIgPSBuZXcgUHJlc2VudGVyXzEuZGVmYXVsdCh0aGlzLCBzdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgdXBkYXRlKHN0YXRlKSB7XG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCBqcVNsaWRlciA9ICQodGhpcykuZGF0YSgnanFTbGlkZXInKTtcbiAgICAgICAgICAgIGpxU2xpZGVyLm1vZGVsLnNldFN0YXRlKHN0YXRlKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRTdGF0ZSgpIHtcbiAgICAgICAgY29uc3QganFTbGlkZXIgPSAkKHRoaXMpLmRhdGEoJ2pxU2xpZGVyJyk7XG4gICAgICAgIGNvbnN0IHN0YXRlID0ganFTbGlkZXIubW9kZWwuZ2V0U3RhdGUoKTtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH0sXG4gICAgb25DaGFuZ2UoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGpxU2xpZGVyID0gJCh0aGlzKS5kYXRhKCdqcVNsaWRlcicpO1xuICAgICAgICAgICAganFTbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignb25DaGFuZ2UnLCAoZSkgPT4gY2FsbGJhY2soZSkpO1xuICAgICAgICB9KTtcbiAgICB9LFxufTtcbiQuZm4uanFTbGlkZXIgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgIGlmIChhcmdzLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0ge307XG4gICAgICAgIHJldHVybiBtZXRob2RzLmluaXQuY2FsbCh0aGlzLCBzdGF0ZSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBhcmdzWzBdID8gYXJnc1swXSA6IHt9O1xuICAgICAgICByZXR1cm4gbWV0aG9kcy5pbml0LmNhbGwodGhpcywgc3RhdGUpO1xuICAgIH1cbiAgICBjb25zdCBpc0dldFN0YXRlID0gYXJncy5sZW5ndGggPT09IDEgJiYgYXJnc1swXSA9PT0gJ2dldFN0YXRlJztcbiAgICBpZiAoaXNHZXRTdGF0ZSkge1xuICAgICAgICByZXR1cm4gbWV0aG9kcy5nZXRTdGF0ZS5jYWxsKHRoaXMpO1xuICAgIH1cbiAgICBjb25zdCBpc0JpbmRFdmVudExpc3RlbmVyID0gYXJncy5sZW5ndGggPj0gMiAmJiBhcmdzWzBdID09PSAnb25DaGFuZ2UnO1xuICAgIGlmIChpc0JpbmRFdmVudExpc3RlbmVyICYmIHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrID0gYXJnc1sxXTtcbiAgICAgICAgcmV0dXJuIG1ldGhvZHMub25DaGFuZ2UuY2FsbCh0aGlzLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIGNvbnN0IGlzVXBkYXRlID0gYXJncy5sZW5ndGggPj0gMiAmJiBhcmdzWzBdID09PSAndXBkYXRlJyAmJiB0eXBlb2YgYXJnc1sxXSA9PT0gJ29iamVjdCc7XG4gICAgaWYgKGlzVXBkYXRlKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gYXJnc1sxXTtcbiAgICAgICAgcmV0dXJuIG1ldGhvZHMudXBkYXRlLmNhbGwodGhpcywgc3RhdGUpO1xuICAgIH1cbiAgICByZXR1cm4gJC5lcnJvcignVGhpcyBtZXRob2QgZG9lcyBub3QgZXhpc3QnKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IE15RXZlbnRfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9NeUV2ZW50XCIpKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuY2xhc3MgRXZlbnRDcmVhdG9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ldmVudHMgPSB7fTtcbiAgICB9XG4gICAgcmVnaXN0ZXJFdmVudChldmVudE5hbWUpIHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgTXlFdmVudF8xLmRlZmF1bHQoZXZlbnROYW1lKTtcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IGV2ZW50O1xuICAgIH1cbiAgICBkaXNwYXRjaEV2ZW50KGV2ZW50TmFtZSwgZXZlbnRBcmdzKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uY2FsbGJhY2tzLmZvckVhY2goKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayhldmVudEFyZ3MpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0ucmVnaXN0ZXJDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gRXZlbnRDcmVhdG9yO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBNeUV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzID0gW107XG4gICAgfVxuICAgIHJlZ2lzdGVyQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gTXlFdmVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY2FsY1V0aWxzXzEgPSByZXF1aXJlKFwidXRpbHMvY2FsY1V0aWxzXCIpO1xuY29uc3QgRXZlbnRDcmVhdG9yXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL0V2ZW50Q3JlYXRvci9FdmVudENyZWF0b3JcIikpO1xuY2xhc3MgTW9kZWwgZXh0ZW5kcyBFdmVudENyZWF0b3JfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgbWF4OiAxMDAsXG4gICAgICAgICAgICBmcm9tOiAwLFxuICAgICAgICAgICAgdG86IDEwMCxcbiAgICAgICAgICAgIHN0ZXA6IDEsXG4gICAgICAgICAgICB0aXA6IHRydWUsXG4gICAgICAgICAgICByYW5nZTogdHJ1ZSxcbiAgICAgICAgICAgIHByb2dyZXNzOiB0cnVlLFxuICAgICAgICAgICAgc2NhbGU6IHRydWUsXG4gICAgICAgICAgICBzY2FsZURlc3Rpbnk6IDEwLFxuICAgICAgICAgICAgaG9yaXpvbnRhbDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW5pdChzdGF0ZSk7XG4gICAgfVxuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIGNvbnN0IFt2YWx1ZXMsIHNldHRpbmdzXSA9IHRoaXMuc3BsaXRQYXJhbXMoc3RhdGUpO1xuICAgICAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlKSwgdGhpcy5taW5NYXhWYWxpZGF0b3Ioc2V0dGluZ3MpKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZSksIHRoaXMucmFuZ2VGcm9tVG9WYWxpZGF0b3IodGhpcy5zdGVwVmFsaWRhdG9yKHZhbHVlcykpKTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdNb2RlbEV2ZW50JywgdGhpcy5zdGF0ZSk7XG4gICAgfVxuICAgIGdldFN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICB9XG4gICAgaW5pdChzdGF0ZSkge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ01vZGVsRXZlbnQnKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSk7XG4gICAgfVxuICAgIHNwbGl0UGFyYW1zKGRhdGEpIHtcbiAgICAgICAgY29uc3QgdmFsdWVzID0ge307XG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0ge307XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnNcbiAgICAgICAgJ2Zyb20nIGluIGRhdGFcbiAgICAgICAgICAgID8gKHZhbHVlcy5mcm9tID0gZGF0YS5mcm9tKVxuICAgICAgICAgICAgOiAodmFsdWVzLmZyb20gPSB0aGlzLnN0YXRlLmZyb20pO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zLCBwcmV0dGllci9wcmV0dGllclxuICAgICAgICAndG8nIGluIGRhdGFcbiAgICAgICAgICAgID8gKHZhbHVlcy50byA9IGRhdGEudG8pXG4gICAgICAgICAgICA6ICh2YWx1ZXMudG8gPSB0aGlzLnN0YXRlLnRvKTtcbiAgICAgICAgaWYgKGRhdGEuc3RlcCAhPT0gdW5kZWZpbmVkICYmIGRhdGEuc3RlcCA+IDApXG4gICAgICAgICAgICBzZXR0aW5ncy5zdGVwID0gZGF0YS5zdGVwO1xuICAgICAgICBpZiAoZGF0YS5taW4gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHNldHRpbmdzLm1pbiA9IGRhdGEubWluO1xuICAgICAgICBpZiAoZGF0YS5tYXggIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHNldHRpbmdzLm1heCA9IGRhdGEubWF4O1xuICAgICAgICBpZiAoZGF0YS5zY2FsZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgc2V0dGluZ3Muc2NhbGUgPSBkYXRhLnNjYWxlO1xuICAgICAgICBpZiAoZGF0YS5yYW5nZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgc2V0dGluZ3MucmFuZ2UgPSBkYXRhLnJhbmdlO1xuICAgICAgICBpZiAoZGF0YS50aXAgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHNldHRpbmdzLnRpcCA9IGRhdGEudGlwO1xuICAgICAgICBpZiAoZGF0YS5wcm9ncmVzcyAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgc2V0dGluZ3MucHJvZ3Jlc3MgPSBkYXRhLnByb2dyZXNzO1xuICAgICAgICBpZiAoZGF0YS5ob3Jpem9udGFsICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBzZXR0aW5ncy5ob3Jpem9udGFsID0gZGF0YS5ob3Jpem9udGFsO1xuICAgICAgICBpZiAoZGF0YS5zY2FsZURlc3RpbnkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHNldHRpbmdzLnNjYWxlRGVzdGlueSA9IGRhdGEuc2NhbGVEZXN0aW55IDw9IDAgPyAxIDogZGF0YS5zY2FsZURlc3Rpbnk7XG4gICAgICAgIHJldHVybiBbdmFsdWVzLCBzZXR0aW5nc107XG4gICAgfVxuICAgIG1pbk1heFZhbGlkYXRvcihkYXRhKSB7XG4gICAgICAgIGxldCB7IG1pbiA9IHRoaXMuc3RhdGUubWluIH0gPSBkYXRhO1xuICAgICAgICBjb25zdCB7IG1heCA9IHRoaXMuc3RhdGUubWF4IH0gPSBkYXRhO1xuICAgICAgICBpZiAobWluID4gbWF4KVxuICAgICAgICAgICAgbWluID0gbWF4O1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBkYXRhKSwgeyBtaW4sIG1heCB9KTtcbiAgICB9XG4gICAgc3RlcFZhbGlkYXRvcihkYXRhKSB7XG4gICAgICAgIGNvbnN0IGNvcHlPZkRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhKTtcbiAgICAgICAgaWYgKGNvcHlPZkRhdGEuZnJvbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb3B5T2ZEYXRhLmZyb20gPSB0aGlzLmNoZWNrU3RlcChjb3B5T2ZEYXRhLmZyb20pO1xuICAgICAgICAgICAgaWYgKGNvcHlPZkRhdGEuZnJvbSA8PSB0aGlzLnN0YXRlLm1pbikge1xuICAgICAgICAgICAgICAgIGNvcHlPZkRhdGEuZnJvbSA9IHRoaXMuc3RhdGUubWluO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY29weU9mRGF0YS5mcm9tID49IHRoaXMuc3RhdGUubWF4KSB7XG4gICAgICAgICAgICAgICAgY29weU9mRGF0YS5mcm9tID0gdGhpcy5zdGF0ZS5tYXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvcHlPZkRhdGEudG8gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29weU9mRGF0YS50byA9IHRoaXMuY2hlY2tTdGVwKGNvcHlPZkRhdGEudG8pO1xuICAgICAgICAgICAgaWYgKGNvcHlPZkRhdGEudG8gPD0gdGhpcy5zdGF0ZS5taW4pIHtcbiAgICAgICAgICAgICAgICBjb3B5T2ZEYXRhLnRvID0gdGhpcy5zdGF0ZS5taW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjb3B5T2ZEYXRhLnRvID49IHRoaXMuc3RhdGUubWF4KSB7XG4gICAgICAgICAgICAgICAgY29weU9mRGF0YS50byA9IHRoaXMuc3RhdGUubWF4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb3B5T2ZEYXRhO1xuICAgIH1cbiAgICBjaGVja1N0ZXAodmFsdWUpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCwgc3RlcCB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgaW50ZXJ2YWwgPSBtYXggLSBtaW47XG4gICAgICAgIGNvbnN0IHN0ZXBJblBlcmNlbnQgPSAxMDAgLyAoaW50ZXJ2YWwgLyBzdGVwKTtcbiAgICAgICAgY29uc3QgdmFsdWVJblBlcmNlbnQgPSAoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gKygwLCBjYWxjVXRpbHNfMS5jb252ZXJ0UGVyY2VudEluVmFsdWUpKG1pbiwgbWF4LCBNYXRoLnJvdW5kKHZhbHVlSW5QZXJjZW50IC8gc3RlcEluUGVyY2VudCkgKiBzdGVwSW5QZXJjZW50KS50b0ZpeGVkKDIpO1xuICAgIH1cbiAgICByYW5nZUZyb21Ub1ZhbGlkYXRvcihkYXRhKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5yYW5nZSkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29weU9mU0RhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhKTtcbiAgICAgICAgaWYgKGNvcHlPZlNEYXRhLmZyb20gIT09IHVuZGVmaW5lZCAmJiBjb3B5T2ZTRGF0YS50byAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBpc0Zyb21Ob3RWYWxpZGx5ID0gdGhpcy5zdGF0ZS50byAtIGNvcHlPZlNEYXRhLmZyb20gPD0gMDtcbiAgICAgICAgICAgIGNvbnN0IGlzVG9Ob3RWYWxpZGx5ID0gY29weU9mU0RhdGEudG8gLSB0aGlzLnN0YXRlLmZyb20gPD0gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmZyb20gPiB0aGlzLnN0YXRlLnRvKVxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuZnJvbSA9IHRoaXMuc3RhdGUudG87XG4gICAgICAgICAgICBpZiAoaXNGcm9tTm90VmFsaWRseSlcbiAgICAgICAgICAgICAgICBjb3B5T2ZTRGF0YS5mcm9tID0gdGhpcy5zdGF0ZS50bztcbiAgICAgICAgICAgIGlmIChpc1RvTm90VmFsaWRseSlcbiAgICAgICAgICAgICAgICBjb3B5T2ZTRGF0YS50byA9IHRoaXMuc3RhdGUuZnJvbTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29weU9mU0RhdGE7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gTW9kZWw7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNhbGNVdGlsc18xID0gcmVxdWlyZShcInV0aWxzL2NhbGNVdGlsc1wiKTtcbmNvbnN0IE1vZGVsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL01vZGVsL01vZGVsXCIpKTtcbmNvbnN0IFZpZXdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vVmlldy9WaWV3XCIpKTtcbmNvbnN0IEV2ZW50Q3JlYXRvcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9FdmVudENyZWF0b3IvRXZlbnRDcmVhdG9yXCIpKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuY2xhc3MgUHJlc2VudGVyIGV4dGVuZHMgRXZlbnRDcmVhdG9yXzEuZGVmYXVsdCB7XG4gICAgY29uc3RydWN0b3Iobm9kZUVsZW0sIHN0YXRlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3XzEuZGVmYXVsdChub2RlRWxlbSk7XG4gICAgICAgIHRoaXMubW9kZWwgPSBuZXcgTW9kZWxfMS5kZWZhdWx0KHN0YXRlKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCdvbkNoYW5nZScpO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy52aWV3LnNldFN0YXRlKHRoaXMubW9kZWwuZ2V0U3RhdGUoKSk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuICAgIGJpbmRFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy52aWV3RXZlbnRIYW5kbGVyID0gdGhpcy52aWV3RXZlbnRIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMubW9kZWxFdmVudEhhbmRsZXIgPSB0aGlzLm1vZGVsRXZlbnRIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMudmlldy5hZGRFdmVudExpc3RlbmVyKCdWaWV3RXZlbnQnLCB0aGlzLnZpZXdFdmVudEhhbmRsZXIpO1xuICAgICAgICB0aGlzLm1vZGVsLmFkZEV2ZW50TGlzdGVuZXIoJ01vZGVsRXZlbnQnLCB0aGlzLm1vZGVsRXZlbnRIYW5kbGVyKTtcbiAgICB9XG4gICAgdmlld0V2ZW50SGFuZGxlcihlKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXggfSA9IHRoaXMubW9kZWwuZ2V0U3RhdGUoKTtcbiAgICAgICAgY29uc3QgaXNOdW1iZXJzID0gdHlwZW9mIG1pbiA9PT0gJ251bWJlcicgJiYgdHlwZW9mIG1heCA9PT0gJ251bWJlcic7XG4gICAgICAgIGlmICghaXNOdW1iZXJzKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoZS5mcm9tKVxuICAgICAgICAgICAgZS5mcm9tID0gKygwLCBjYWxjVXRpbHNfMS5jb252ZXJ0UGVyY2VudEluVmFsdWUpKG1pbiwgbWF4LCBlLmZyb20pLnRvRml4ZWQoMyk7XG4gICAgICAgIGlmIChlLnRvKVxuICAgICAgICAgICAgZS50byA9ICsoMCwgY2FsY1V0aWxzXzEuY29udmVydFBlcmNlbnRJblZhbHVlKShtaW4sIG1heCwgZS50bykudG9GaXhlZCgzKTtcbiAgICAgICAgdGhpcy5tb2RlbC5zZXRTdGF0ZShlKTtcbiAgICB9XG4gICAgbW9kZWxFdmVudEhhbmRsZXIoZSkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ29uQ2hhbmdlJywgZSk7XG4gICAgICAgIHRoaXMudmlldy5zZXRTdGF0ZShlKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBQcmVzZW50ZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNhbGNVdGlsc18xID0gcmVxdWlyZShcInV0aWxzL2NhbGNVdGlsc1wiKTtcbmNvbnN0IEhhbmRsZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3N1YlZpZXcvSGFuZGxlL0hhbmRsZVwiKSk7XG5jb25zdCBTZWNvbmRIYW5kbGVfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9zdWJWaWV3L0hhbmRsZS9TZWNvbmRIYW5kbGVcIikpO1xuY29uc3QgU2NhbGVfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9zdWJWaWV3L1NjYWxlL1NjYWxlXCIpKTtcbmNvbnN0IFRpcF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3N1YlZpZXcvVGlwL1RpcFwiKSk7XG5jb25zdCBTZWNvbmRUaXBfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9zdWJWaWV3L1RpcC9TZWNvbmRUaXBcIikpO1xuY29uc3QgVHJhY2tfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9zdWJWaWV3L1RyYWNrL1RyYWNrXCIpKTtcbmNvbnN0IEV2ZW50Q3JlYXRvcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9FdmVudENyZWF0b3IvRXZlbnRDcmVhdG9yXCIpKTtcbmNsYXNzIFZpZXcgZXh0ZW5kcyBFdmVudENyZWF0b3JfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlRWxlbSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm5vZGVFbGVtID0gbm9kZUVsZW07XG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IFtdO1xuICAgICAgICAvKiog0LjRgdGC0L7Qu9GM0LfQvtCy0LDQuyBhcyDQv9C+0YLQvtC80YMg0YfRgtC+INC30L3QsNC10Lwg0YLQvtGH0L3QviDRh9GC0L4g0L/QvtGB0LvQtSDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuCDQuNC3IE1vZGVsINC/0YDQuNC50LTQtdGCIHN0YXRlINGC0LjQv9CwIFN0YXRlLFxuICAgICAgICAgKiDQvdC1INC30L3QsNGOINC90LAg0YHQutC+0LvRjNC60L4g0YPQvNC10YHRgtC90L4g0YLQsNC6INC00LXQu9Cw0YLRjCDQvdC+INGA0LXRiNC40Lsg0YDQuNGB0LrQvdGD0YLRjC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7fTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrSXNDaGFuZ2VkU2V0dGluZ3Moc3RhdGUpKSB7XG4gICAgICAgICAgICB0aGlzLnJlYnVpbGRTbGlkZXIoc3RhdGUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGUgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUpLCBzdGF0ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlKHRoaXMuc3RhdGUpO1xuICAgICAgICB0aGlzLmNoZWNrVGlwcygpO1xuICAgICAgICB0aGlzLmNoZWNrU2NhbGUoKTtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVTbGlkZXIoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCdWaWV3RXZlbnQnKTtcbiAgICB9XG4gICAgY3JlYXRlU2xpZGVyKCkge1xuICAgICAgICB0aGlzLnNsaWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnNsaWRlci5jbGFzc0xpc3QuYWRkKCdqcS1zbGlkZXInKTtcbiAgICAgICAgdGhpcy5ub2RlRWxlbS5hcHBlbmRDaGlsZCh0aGlzLnNsaWRlcik7XG4gICAgfVxuICAgIGNyZWF0ZUNvbXBvbmVudHMoc3RhdGUpIHtcbiAgICAgICAgY29uc3QgeyByYW5nZSwgdGlwLCBzY2FsZSwgaG9yaXpvbnRhbCB9ID0gc3RhdGU7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cy5wdXNoKG5ldyBIYW5kbGVfMS5kZWZhdWx0KHRoaXMuc2xpZGVyKSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cy5wdXNoKG5ldyBUcmFja18xLmRlZmF1bHQodGhpcy5zbGlkZXIpKTtcbiAgICAgICAgaWYgKHRpcCkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzLnB1c2gobmV3IFRpcF8xLmRlZmF1bHQodGhpcy5zbGlkZXIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50cy5wdXNoKG5ldyBTZWNvbmRIYW5kbGVfMS5kZWZhdWx0KHRoaXMuc2xpZGVyKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmdlICYmIHRpcCkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzLnB1c2gobmV3IFNlY29uZFRpcF8xLmRlZmF1bHQodGhpcy5zbGlkZXIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NhbGUpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50cy5wdXNoKG5ldyBTY2FsZV8xLmRlZmF1bHQodGhpcy5zbGlkZXIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgdGhpcy5zbGlkZXIuY2xhc3NMaXN0LmFkZCgnanEtc2xpZGVyX2hvcml6b250YWwnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2pxLXNsaWRlcl9ob3Jpem9udGFsJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYmluZEV2ZW50TGlzdGVuZXIoKSB7XG4gICAgICAgIHRoaXMuc3ViVmlld0V2ZW50SGFuZGxlciA9IHRoaXMuc3ViVmlld0V2ZW50SGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMuZm9yRWFjaCgoY29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50LmV2ZW50cy5TdWJWaWV3RXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcignU3ViVmlld0V2ZW50JywgdGhpcy5zdWJWaWV3RXZlbnRIYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN1YlZpZXdFdmVudEhhbmRsZXIoZSkge1xuICAgICAgICBjb25zdCBzaXplID0gdGhpcy5zdGF0ZS5ob3Jpem9udGFsXG4gICAgICAgICAgICA/IHRoaXMuc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodFxuICAgICAgICAgICAgOiB0aGlzLnNsaWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgaWYgKGUudGFyZ2V0ID09PSAnZnJvbScpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnVmlld0V2ZW50Jywge1xuICAgICAgICAgICAgICAgIGZyb206ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0UGl4ZWxJblBlcmNlbnQpKHNpemUsIGUucG9zaXRpb24pLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUudGFyZ2V0ID09PSAndG8nKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ1ZpZXdFdmVudCcsIHtcbiAgICAgICAgICAgICAgICB0bzogKDAsIGNhbGNVdGlsc18xLmNvbnZlcnRQaXhlbEluUGVyY2VudCkoc2l6ZSwgZS5wb3NpdGlvbiksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZS50YXJnZXQgPT09ICd0cmFjaycgfHwgZS50YXJnZXQgPT09ICdzY2FsZScpIHtcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXMgPSB0aGlzLmdldEFyck9mQ29uY3JldGVTdWJWaWV3KEhhbmRsZV8xLmRlZmF1bHQpO1xuICAgICAgICAgICAgY29uc3QgZnJvbSA9IGhhbmRsZXNbMF0uZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZS5yYW5nZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnVmlld0V2ZW50Jywge1xuICAgICAgICAgICAgICAgICAgICBmcm9tOiAoMCwgY2FsY1V0aWxzXzEuY29udmVydFBpeGVsSW5QZXJjZW50KShzaXplLCBlLnBvc2l0aW9uKSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0byA9IGhhbmRsZXNbMV0uZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhmcm9tIC0gZS5wb3NpdGlvbikgPD0gdG8gLSBlLnBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdWaWV3RXZlbnQnLCB7XG4gICAgICAgICAgICAgICAgICAgIGZyb206ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0UGl4ZWxJblBlcmNlbnQpKHNpemUsIGUucG9zaXRpb24pLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnVmlld0V2ZW50Jywge1xuICAgICAgICAgICAgICAgIHRvOiAoMCwgY2FsY1V0aWxzXzEuY29udmVydFBpeGVsSW5QZXJjZW50KShzaXplLCBlLnBvc2l0aW9uKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNoZWNrSXNDaGFuZ2VkU2V0dGluZ3Moc3RhdGUpIHtcbiAgICAgICAgY29uc3QgeyBmcm9tLCB0byB9ID0gc3RhdGUsIHNldHRpbmdzID0gX19yZXN0KHN0YXRlLCBbXCJmcm9tXCIsIFwidG9cIl0pO1xuICAgICAgICByZXR1cm4gT2JqZWN0LmVudHJpZXMoc2V0dGluZ3MpLnJlZHVjZSgoZmxhZywgZW50cmllcykgPT4ge1xuICAgICAgICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gZW50cmllcztcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlW2tleV0gIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmxhZztcbiAgICAgICAgfSwgZmFsc2UpO1xuICAgIH1cbiAgICByZWJ1aWxkU2xpZGVyKHN0YXRlKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IFtdO1xuICAgICAgICB0aGlzLnNsaWRlci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy5jcmVhdGVDb21wb25lbnRzKHN0YXRlKTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRMaXN0ZW5lcigpO1xuICAgIH1cbiAgICBjaGVja1RpcHMoKSB7XG4gICAgICAgIGNvbnN0IHsgdGlwLCByYW5nZSwgaG9yaXpvbnRhbCB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgaWYgKCEodGlwICYmIHJhbmdlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRpcHMgPSB0aGlzLmdldEFyck9mQ29uY3JldGVTdWJWaWV3KFRpcF8xLmRlZmF1bHQpO1xuICAgICAgICBjb25zdCBzaXplID0gaG9yaXpvbnRhbFxuICAgICAgICAgICAgPyB0aXBzWzFdLnN1YlZpZXcuY2xpZW50SGVpZ2h0XG4gICAgICAgICAgICA6IHRpcHNbMV0uc3ViVmlldy5vZmZzZXRXaWR0aDtcbiAgICAgICAgY29uc3QgZmlyc3RQb3NpdGlvbiA9IHRpcHNbMF0uZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgY29uc3Qgc2Vjb25kUG9zaXRpb24gPSB0aXBzWzFdLmdldFBvc2l0aW9uKCkgLSBzaXplO1xuICAgICAgICBpZiAoZmlyc3RQb3NpdGlvbiA+IHNlY29uZFBvc2l0aW9uKSB7XG4gICAgICAgICAgICB0aXBzLmZvckVhY2goKHQpID0+IHtcbiAgICAgICAgICAgICAgICB0LmNoYW5nZUlzRG91YmxlKHRydWUpO1xuICAgICAgICAgICAgICAgIHQuc2V0U3RhdGUodGhpcy5zdGF0ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRpcHMuZm9yRWFjaCgodCkgPT4ge1xuICAgICAgICAgICAgICAgIHQuY2hhbmdlSXNEb3VibGUoZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2hlY2tTY2FsZSgpIHtcbiAgICAgICAgY29uc3QgeyBzY2FsZTogcywgdGlwLCByYW5nZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgaWYgKCEocyAmJiB0aXApKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBbc2NhbGVdID0gdGhpcy5nZXRBcnJPZkNvbmNyZXRlU3ViVmlldyhTY2FsZV8xLmRlZmF1bHQpO1xuICAgICAgICBjb25zdCB0aXBzID0gdGhpcy5nZXRBcnJPZkNvbmNyZXRlU3ViVmlldyhUaXBfMS5kZWZhdWx0KTtcbiAgICAgICAgY29uc3Qgc2NhbGVTdGFydCA9IHNjYWxlLmdldFBvc2l0aW9uKCk7XG4gICAgICAgIGNvbnN0IHNjYWxlRW5kID0gc2NhbGVTdGFydCArIHNjYWxlLmdldFNpemUoKTtcbiAgICAgICAgY29uc3QgaXNGcm9tTmVhcmJ5U3RhcnQgPSBzY2FsZVN0YXJ0IC0gdGlwc1swXS5nZXRQb3NpdGlvbigpICsgdGlwc1swXS5nZXRTaXplKCkgPiAwO1xuICAgICAgICBjb25zdCBpc0Zyb21OZWFyYnlFbmQgPSBzY2FsZUVuZCAtIHRpcHNbMF0uZ2V0UG9zaXRpb24oKSAtIHRpcHNbMF0uZ2V0U2l6ZSgpICogMiA8IDA7XG4gICAgICAgIHNjYWxlLnZpc2liaWxpdHlTd2l0Y2hlcignZmlyc3QnLCBpc0Zyb21OZWFyYnlTdGFydCk7XG4gICAgICAgIHNjYWxlLnZpc2liaWxpdHlTd2l0Y2hlcignbGFzdCcsIGlzRnJvbU5lYXJieUVuZCk7XG4gICAgICAgIGlmIChyYW5nZSkge1xuICAgICAgICAgICAgY29uc3QgaXNUb05lYXJieUVuZCA9IHNjYWxlRW5kIC0gdGlwc1sxXS5nZXRQb3NpdGlvbigpIC0gdGlwc1sxXS5nZXRTaXplKCkgKiAyIDwgMDtcbiAgICAgICAgICAgIHNjYWxlLnZpc2liaWxpdHlTd2l0Y2hlcignbGFzdCcsIGlzVG9OZWFyYnlFbmQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVwZGF0ZShzdGF0ZSkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMuZm9yRWFjaCgoY29tcG9uZW50KSA9PiBjb21wb25lbnQuc2V0U3RhdGUoc3RhdGUpKTtcbiAgICB9XG4gICAgZ2V0QXJyT2ZDb25jcmV0ZVN1YlZpZXcoaW5zdGFuY2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50cy5maWx0ZXIoKGNvbXBvbmVudCkgPT4gY29tcG9uZW50IGluc3RhbmNlb2YgaW5zdGFuY2UpO1xuICAgICAgICAvKiog0JjQtNC10Y8g0LTQsNC90L3QvtCz0L4g0LzQtdGC0L7QtNCwINCx0YvQu9CwINCyINGC0L7QvCDRh9GC0L7QsdGLINCy0LXRgNC90YPRgtGMINC80LDRgdGB0LjQsiDQuNC90YHRgtCw0L3RgdC+0LIg0L7Qv9GA0LXQtNC10LvQtdC90L7Qs9C+INC60LvQsNGB0YHQsC5cbiAgICAgICAgICog0YMg0LLRgdC10YUg0Y3RgtC40YUg0LrQu9Cw0YHRgdC+0LIg0LzQvdC+0LPQviDRgdGF0L7QttC40YUg0YHQstC+0LnRgdGCINC4INC80LXRgtC+0LTQvtCyLCDQvdC+INC10YHRgtGMINC4INGB0LLQvtC4INC+0YHQvtCx0LXQvdC90YvQtS4g0KXQvtGC0LXQu9C+0YLRjCDQsdGLXG4gICAgICAgICAqINC/0YDQvtGB0YLQviDQutCw0Log0LDQs9GA0YPQvNC10L3RgiDRg9C60LDQt9GL0LLQsNGC0Ywg0JrQu9Cw0YHRgSDQuCDRh9GC0L7QsdGLIFRTINC/0L7RgdC70LUg0Y3RgtC+0LPQviDQstC40LTQtdC7INCy0YHQtSDQtdCz0L4g0YHQstC+0LnRgtCy0LAg0Lgg0LzQtdGC0L7QtNGLLlxuICAgICAgICAgKiDQsiDQuNGC0L7Qs9C1INC/0L7RgdC70LUg0LTQvtC70LPQuNGFINC/0L7Qv9GL0YLQvtC6INC90LUg0YfQtdCz0L4g0LrQsNC6INGB0LTQtdC70LDRgtGMINGC0LDQuiDRh9C10YDQtdC3IGFzIFRbXSDRjyDQuiDRgdC+0LbQtdC70LXQvdC40Y4g0L3QtSDQv9GA0LjQtNGD0LzQsNC7LlxuICAgICAgICAgKi9cbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBWaWV3O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBNb3ZhYmxlU3ViVmlld18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9iYXNlQ2xhc3Nlcy9Nb3ZhYmxlU3ViVmlldy9Nb3ZhYmxlU3ViVmlld1wiKSk7XG5jbGFzcyBIYW5kbGUgZXh0ZW5kcyBNb3ZhYmxlU3ViVmlld18xLmRlZmF1bHQge1xuICAgIGdldFBvc2l0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5ob3Jpem9udGFsKSB7XG4gICAgICAgICAgICBjb25zdCBzdWJWaWV3VG9wID0gdGhpcy5zdWJWaWV3LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICAgICAgICAgIGNvbnN0IHNsaWRlclRvcCA9IHRoaXMuc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICAgICAgICAgIHJldHVybiBzdWJWaWV3VG9wIC0gc2xpZGVyVG9wICsgdGhpcy5zdWJWaWV3Lm9mZnNldEhlaWdodCAvIDI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3ViVmlld0xlZnQgPSB0aGlzLnN1YlZpZXcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICAgICAgY29uc3Qgc2xpZGVyTGVmdCA9IHRoaXMuc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgICAgIHJldHVybiBzdWJWaWV3TGVmdCAtIHNsaWRlckxlZnQgKyB0aGlzLnN1YlZpZXcub2Zmc2V0V2lkdGggLyAyO1xuICAgIH1cbiAgICBjcmVhdGVTdWJWaWV3KCkge1xuICAgICAgICBzdXBlci5jcmVhdGVTdWJWaWV3KCk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5jbGFzc0xpc3QuYWRkKCdqcS1zbGlkZXJfX2hhbmRsZScpO1xuICAgICAgICB0aGlzLnN1YlZpZXcuc3R5bGUuekluZGV4ID0gJzUnO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IEhhbmRsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgSGFuZGxlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vSGFuZGxlXCIpKTtcbmNsYXNzIFNlY29uZEhhbmRsZSBleHRlbmRzIEhhbmRsZV8xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKHNsaWRlcikge1xuICAgICAgICBzdXBlcihzbGlkZXIpO1xuICAgICAgICB0aGlzLnJvbGUgPSAndG8nO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IHNpemUgPSB0aGlzLnN0YXRlLmhvcml6b250YWxcbiAgICAgICAgICAgID8gdGhpcy5zbGlkZXIuY2xpZW50SGVpZ2h0XG4gICAgICAgICAgICA6IHRoaXMuc2xpZGVyLmNsaWVudFdpZHRoO1xuICAgICAgICBpZiAodGhpcy5nZXRQb3NpdGlvbigpID4gc2l6ZSAvIDIpIHtcbiAgICAgICAgICAgIHRoaXMuc3ViVmlldy5zdHlsZS56SW5kZXggPSAnNCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN1YlZpZXcuc3R5bGUuekluZGV4ID0gJzYnO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLnVwZGF0ZSgpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFNlY29uZEhhbmRsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY2FsY1V0aWxzXzEgPSByZXF1aXJlKFwidXRpbHMvY2FsY1V0aWxzXCIpO1xuY29uc3QgYWJzdHJhY3RTdWJWaWV3XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2Jhc2VDbGFzc2VzL2Fic3RyYWN0U3ViVmlldy9hYnN0cmFjdFN1YlZpZXdcIikpO1xuY2xhc3MgU2NhbGUgZXh0ZW5kcyBhYnN0cmFjdFN1YlZpZXdfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3RvcihzbGlkZXIpIHtcbiAgICAgICAgc3VwZXIoc2xpZGVyKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIGhvcml6b250YWwsIHNjYWxlRGVzdGlueSwgc3RlcCB9ID0gc3RhdGU7XG4gICAgICAgIGNvbnN0IG9sZFN0YXRlID0gSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZSk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUpLCB7IG1pbixcbiAgICAgICAgICAgIG1heCxcbiAgICAgICAgICAgIGhvcml6b250YWwsXG4gICAgICAgICAgICBzY2FsZURlc3RpbnksXG4gICAgICAgICAgICBzdGVwIH0pO1xuICAgICAgICBpZiAob2xkU3RhdGUgIT09IEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUpKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlU3ViVmlldygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ1N1YlZpZXdFdmVudCcpO1xuICAgIH1cbiAgICBjcmVhdGVTdWJWaWV3KCkge1xuICAgICAgICB0aGlzLnN1YlZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5zdWJWaWV3LmNsYXNzTGlzdC5hZGQoJ2pxLXNsaWRlcl9fc2NhbGUnKTtcbiAgICAgICAgdGhpcy5zbGlkZXIuYXBwZW5kQ2hpbGQodGhpcy5zdWJWaWV3KTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4LCBzdGVwLCBob3Jpem9udGFsLCBzY2FsZURlc3RpbnkgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGxldCBwaXBzID0gW107XG4gICAgICAgIGZvciAobGV0IHBpcCA9IG1pbjsgcGlwIDwgbWF4OyBwaXAgKz0gc3RlcCA8IDEgPyAxIDogc3RlcCkge1xuICAgICAgICAgICAgcGlwcy5wdXNoKHRoaXMuY3JlYXRlUGlwRnJhZ21lbnQobWluLCBtYXgsIHBpcCkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1heFN5bWJvbHNJblBpcCA9IE1hdGguYWJzKG1pbikgPiBNYXRoLmFicyhtYXgpXG4gICAgICAgICAgICA/IG1pbi50b1N0cmluZygpLmxlbmd0aFxuICAgICAgICAgICAgOiBtYXgudG9TdHJpbmcoKS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IHNpemVPZlBpcCA9IGhvcml6b250YWxcbiAgICAgICAgICAgID8gdGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0IC8gMjBcbiAgICAgICAgICAgIDogdGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggLyAobWF4U3ltYm9sc0luUGlwICogMTApO1xuICAgICAgICBpZiAocGlwcy5sZW5ndGggPiBzaXplT2ZQaXApIHtcbiAgICAgICAgICAgIHBpcHMgPSBwaXBzLmZpbHRlcigoX3BpcCwgaSkgPT4gaSAlIE1hdGgucm91bmQocGlwcy5sZW5ndGggLyBzaXplT2ZQaXApID09PSAwKTtcbiAgICAgICAgfVxuICAgICAgICBwaXBzID0gcGlwcy5maWx0ZXIoKF9waXAsIGkpID0+IGkgJSBzY2FsZURlc3RpbnkgPT09IDApO1xuICAgICAgICBwaXBzLnB1c2godGhpcy5jcmVhdGVQaXBGcmFnbWVudChtaW4sIG1heCwgbWF4KSk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5pbm5lckhUTUwgPSBwaXBzLmpvaW4oJyAnKTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRMaXN0ZW5lcigpO1xuICAgIH1cbiAgICB2aXNpYmlsaXR5U3dpdGNoZXIocG9zaXRpb25JblNjYWxlLCB2aXNpYmxlKSB7XG4gICAgICAgIGNvbnN0IHBpcHMgPSB0aGlzLnN1YlZpZXcucXVlcnlTZWxlY3RvckFsbCgnLmpxLXNsaWRlcl9fc2NhbGUtbGFiZWwnKTtcbiAgICAgICAgaWYgKHBvc2l0aW9uSW5TY2FsZSA9PT0gJ2ZpcnN0JyAmJiBwaXBzWzBdIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnNcbiAgICAgICAgICAgIHZpc2libGVcbiAgICAgICAgICAgICAgICA/IHBpcHNbMF0uY2xhc3NMaXN0LmFkZCgnanMtc2xpZGVyX19zY2FsZS1sYWJlbF9oaWRkZW4nKVxuICAgICAgICAgICAgICAgIDogcGlwc1swXS5jbGFzc0xpc3QucmVtb3ZlKCdqcy1zbGlkZXJfX3NjYWxlLWxhYmVsX2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG51bWJlck9mTGFzdFBpcCA9IHBpcHMubGVuZ3RoIC0gMTtcbiAgICAgICAgaWYgKHBvc2l0aW9uSW5TY2FsZSA9PT0gJ2xhc3QnICYmXG4gICAgICAgICAgICBwaXBzW251bWJlck9mTGFzdFBpcF0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xuICAgICAgICAgICAgdmlzaWJsZVxuICAgICAgICAgICAgICAgID8gcGlwc1tudW1iZXJPZkxhc3RQaXBdLmNsYXNzTGlzdC5hZGQoJ2pzLXNsaWRlcl9fc2NhbGUtbGFiZWxfaGlkZGVuJylcbiAgICAgICAgICAgICAgICA6IHBpcHNbbnVtYmVyT2ZMYXN0UGlwXS5jbGFzc0xpc3QucmVtb3ZlKCdqcy1zbGlkZXJfX3NjYWxlLWxhYmVsX2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNyZWF0ZVBpcEZyYWdtZW50KG1pbiwgbWF4LCB2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5ob3Jpem9udGFsKSB7XG4gICAgICAgICAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImpxLXNsaWRlcl9fc2NhbGUtcGlwXCIgc3R5bGU9XCJ0b3A6JHsoMCwgY2FsY1V0aWxzXzEuY29udmVydFBlcmNlbnRJblZhbHVlKSgwLCB0aGlzLnNsaWRlci5jbGllbnRIZWlnaHQsICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCB2YWx1ZSkpfXB4XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJqcS1zbGlkZXJfX3NjYWxlLWxhYmVsXCI+JHt2YWx1ZS50b0ZpeGVkKDApfTwvZGl2PlxuICAgICAgPC9kaXY+YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImpxLXNsaWRlcl9fc2NhbGUtcGlwXCIgc3R5bGU9XCJsZWZ0OiR7KDAsIGNhbGNVdGlsc18xLmNvbnZlcnRWYWx1ZUluUGVyY2VudCkobWluLCBtYXgsIHZhbHVlKX0lXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJqcS1zbGlkZXJfX3NjYWxlLWxhYmVsXCI+JHt2YWx1ZS50b0ZpeGVkKDApfTwvZGl2PlxuICAgICAgPC9kaXY+YDtcbiAgICB9XG4gICAgYmluZEV2ZW50TGlzdGVuZXIoKSB7XG4gICAgICAgIHRoaXMuY2xpY2tIYW5kbGVyID0gdGhpcy5jbGlja0hhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zdWJWaWV3LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcS1zbGlkZXJfX3NjYWxlLWxhYmVsJykuZm9yRWFjaCgocGlwKSA9PiB7XG4gICAgICAgICAgICBpZiAocGlwIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBwaXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjbGlja0hhbmRsZXIoZSkge1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4LCBob3Jpem9udGFsIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBpZiAoIShlLnRhcmdldCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9uZVBlcmNlbnQgPSBob3Jpem9udGFsXG4gICAgICAgICAgICA/IHRoaXMuc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCAvIDEwMFxuICAgICAgICAgICAgOiB0aGlzLnNsaWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCAvIDEwMDtcbiAgICAgICAgY29uc3QgcGVyY2VudHMgPSBob3Jpem9udGFsXG4gICAgICAgICAgICA/ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCArZS50YXJnZXQuaW5uZXJIVE1MKVxuICAgICAgICAgICAgOiAoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgK2UudGFyZ2V0LmlubmVySFRNTCk7XG4gICAgICAgIGxldCBwb3NpdGlvbiA9IG9uZVBlcmNlbnQgKiBwZXJjZW50cztcbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBzbGlkZXJTaXplID0gaG9yaXpvbnRhbFxuICAgICAgICAgICAgICAgID8gdGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XG4gICAgICAgICAgICAgICAgOiB0aGlzLnNsaWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbigpIC0gc2xpZGVyU2l6ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ1N1YlZpZXdFdmVudCcsIHsgdGFyZ2V0OiAnc2NhbGUnLCBwb3NpdGlvbiB9KTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBTY2FsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgVGlwXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vVGlwXCIpKTtcbmNsYXNzIFNlY29uZFRpcCBleHRlbmRzIFRpcF8xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKHNsaWRlcikge1xuICAgICAgICBzdXBlcihzbGlkZXIpO1xuICAgICAgICB0aGlzLnJvbGUgPSAndG8nO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZSgpO1xuICAgICAgICBjb25zdCB7IHRvIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBpZiAodGhpcy5pc0RvdWJsZSkge1xuICAgICAgICAgICAgdGhpcy5zdWJWaWV3LnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN1YlZpZXcuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN1YlZpZXcudGV4dENvbnRlbnQgPSB0by50b1N0cmluZygpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFNlY29uZFRpcDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgTW92YWJsZVN1YlZpZXdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vYmFzZUNsYXNzZXMvTW92YWJsZVN1YlZpZXcvTW92YWJsZVN1YlZpZXdcIikpO1xuY2xhc3MgVGlwIGV4dGVuZHMgTW92YWJsZVN1YlZpZXdfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3RvcihzbGlkZXIpIHtcbiAgICAgICAgc3VwZXIoc2xpZGVyKTtcbiAgICAgICAgdGhpcy5pc0RvdWJsZSA9IGZhbHNlO1xuICAgIH1cbiAgICBjaGFuZ2VJc0RvdWJsZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmlzRG91YmxlID0gdmFsdWU7XG4gICAgfVxuICAgIGNyZWF0ZVN1YlZpZXcoKSB7XG4gICAgICAgIHN1cGVyLmNyZWF0ZVN1YlZpZXcoKTtcbiAgICAgICAgdGhpcy5zdWJWaWV3LmNsYXNzTGlzdC5hZGQoJ2pxLXNsaWRlcl9fdGlwJyk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5zdHlsZS56SW5kZXggPSAnNSc7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XG4gICAgICAgIGNvbnN0IHsgZnJvbSwgdG8gfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIHRoaXMuc3ViVmlldy50ZXh0Q29udGVudCA9IHRoaXMuaXNEb3VibGVcbiAgICAgICAgICAgID8gYCR7ZnJvbX0gLSAke3RvfWBcbiAgICAgICAgICAgIDogZnJvbS50b1N0cmluZygpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFRpcDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY2FsY1V0aWxzXzEgPSByZXF1aXJlKFwidXRpbHMvY2FsY1V0aWxzXCIpO1xuY29uc3QgYWJzdHJhY3RTdWJWaWV3XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2Jhc2VDbGFzc2VzL2Fic3RyYWN0U3ViVmlldy9hYnN0cmFjdFN1YlZpZXdcIikpO1xuY2xhc3MgVHJhY2sgZXh0ZW5kcyBhYnN0cmFjdFN1YlZpZXdfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3RvcihzbGlkZXIpIHtcbiAgICAgICAgc3VwZXIoc2xpZGVyKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIGZyb20sIHRvLCBob3Jpem9udGFsLCByYW5nZSwgcHJvZ3Jlc3MgfSA9IHN0YXRlO1xuICAgICAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlKSwgeyBtaW4sXG4gICAgICAgICAgICBtYXgsXG4gICAgICAgICAgICBmcm9tLFxuICAgICAgICAgICAgdG8sXG4gICAgICAgICAgICBob3Jpem9udGFsLFxuICAgICAgICAgICAgcmFuZ2UsXG4gICAgICAgICAgICBwcm9ncmVzcyB9KTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgY3JlYXRlU3ViVmlldygpIHtcbiAgICAgICAgdGhpcy5zdWJWaWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5jbGFzc0xpc3QuYWRkKCdqcS1zbGlkZXJfX3RyYWNrJyk7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5wcm9ncmVzcy5jbGFzc0xpc3QuYWRkKCdqcS1zbGlkZXJfX3Byb2dyZXNzJyk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5hcHBlbmRDaGlsZCh0aGlzLnByb2dyZXNzKTtcbiAgICAgICAgdGhpcy5zbGlkZXIuYXBwZW5kQ2hpbGQodGhpcy5zdWJWaWV3KTtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVTdWJWaWV3KCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnU3ViVmlld0V2ZW50Jyk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50TGlzdGVuZXIoKTtcbiAgICB9XG4gICAgYmluZEV2ZW50TGlzdGVuZXIoKSB7XG4gICAgICAgIHRoaXMuY2xpY2tIYW5kbGVyID0gdGhpcy5jbGlja0hhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zdWJWaWV3LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXIpO1xuICAgIH1cbiAgICBjbGlja0hhbmRsZXIoZSkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ1N1YlZpZXdFdmVudCcsIHtcbiAgICAgICAgICAgIHRhcmdldDogJ3RyYWNrJyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLnN0YXRlLmhvcml6b250YWxcbiAgICAgICAgICAgICAgICA/IGUuY2xpZW50WSAtIHRoaXMuc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcFxuICAgICAgICAgICAgICAgIDogZS5jbGllbnRYIC0gdGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCwgZnJvbSwgdG8sIGhvcml6b250YWwsIHJhbmdlLCBwcm9ncmVzcyB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgaWYgKCFwcm9ncmVzcykge1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5yZW1vdmUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdGFydCA9ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCBmcm9tKTtcbiAgICAgICAgY29uc3QgZW5kID0gKDAsIGNhbGNVdGlsc18xLmNvbnZlcnRWYWx1ZUluUGVyY2VudCkobWluLCBtYXgsIHRvKTtcbiAgICAgICAgaWYgKGhvcml6b250YWwgJiYgcmFuZ2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IGVuZCAtIHN0YXJ0O1xuICAgICAgICAgICAgY29uc3Qgb25lUGVyY2VudCA9IHRoaXMuc2xpZGVyLmNsaWVudEhlaWdodCAvIDEwMDtcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3Muc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fSVgO1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5zdHlsZS5tYXJnaW5Ub3AgPSBgJHtvbmVQZXJjZW50ICogc3RhcnR9cHhgO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChob3Jpem9udGFsICYmICFyYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5zdHlsZS5oZWlnaHQgPSBgJHtzdGFydH0lYDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmFuZ2UpIHtcbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gZW5kIC0gc3RhcnQ7XG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzLnN0eWxlLndpZHRoID0gYCR7d2lkdGh9JWA7XG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzLnN0eWxlLm1hcmdpbkxlZnQgPSBgJHtzdGFydH0lYDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3Muc3R5bGUud2lkdGggPSBgJHtzdGFydH0lYDtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFRyYWNrO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjYWxjVXRpbHNfMSA9IHJlcXVpcmUoXCJ1dGlscy9jYWxjVXRpbHNcIik7XG5jb25zdCBhYnN0cmFjdFN1YlZpZXdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vYWJzdHJhY3RTdWJWaWV3L2Fic3RyYWN0U3ViVmlld1wiKSk7XG5jbGFzcyBNb3ZhYmxlU3ViVmlldyBleHRlbmRzIGFic3RyYWN0U3ViVmlld18xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKHNsaWRlcikge1xuICAgICAgICBzdXBlcihzbGlkZXIpO1xuICAgICAgICB0aGlzLnJvbGUgPSAnZnJvbSc7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4LCBmcm9tLCB0bywgaG9yaXpvbnRhbCB9ID0gc3RhdGU7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUpLCB7IG1pbixcbiAgICAgICAgICAgIG1heCxcbiAgICAgICAgICAgIGZyb20sXG4gICAgICAgICAgICB0byxcbiAgICAgICAgICAgIGhvcml6b250YWwgfSk7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlU3ViVmlldygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ1N1YlZpZXdFdmVudCcpO1xuICAgICAgICB0aGlzLmJpbmRFdmVudExpc3RlbmVyKCk7XG4gICAgfVxuICAgIGJpbmRFdmVudExpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLnBvaW50ZXJTdGFydCA9IHRoaXMucG9pbnRlclN0YXJ0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIHRoaXMucG9pbnRlclN0YXJ0KTtcbiAgICB9XG4gICAgcG9pbnRlclN0YXJ0KCkge1xuICAgICAgICB0aGlzLnBvaW50ZXJIYW5kbGVyID0gdGhpcy5wb2ludGVySGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnJlbW92ZVBvaW50U3RhcnQgPSB0aGlzLnJlbW92ZVBvaW50U3RhcnQuYmluZCh0aGlzKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgdGhpcy5wb2ludGVySGFuZGxlcik7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCB0aGlzLnJlbW92ZVBvaW50U3RhcnQpO1xuICAgIH1cbiAgICByZW1vdmVQb2ludFN0YXJ0KCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCB0aGlzLnBvaW50ZXJIYW5kbGVyKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgdGhpcy5wb2ludGVySGFuZGxlcik7XG4gICAgfVxuICAgIHBvaW50ZXJIYW5kbGVyKGUpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdTdWJWaWV3RXZlbnQnLCB7XG4gICAgICAgICAgICB0YXJnZXQ6IHRoaXMucm9sZSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLnN0YXRlLmhvcml6b250YWxcbiAgICAgICAgICAgICAgICA/IGUuY2xpZW50WSAtIHRoaXMuc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcFxuICAgICAgICAgICAgICAgIDogZS5jbGllbnRYIC0gdGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNyZWF0ZVN1YlZpZXcoKSB7XG4gICAgICAgIHRoaXMuc3ViVmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmRDaGlsZCh0aGlzLnN1YlZpZXcpO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIGZyb20sIHRvLCBob3Jpem9udGFsIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucm9sZSA9PT0gJ2Zyb20nID8gZnJvbSA6IHRvO1xuICAgICAgICBpZiAoaG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgdGhpcy5zdWJWaWV3LnN0eWxlLnRvcCA9IGAkeygwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCB2YWx1ZSl9JWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN1YlZpZXcuc3R5bGUubGVmdCA9IGAkeygwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCB2YWx1ZSl9JWA7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBNb3ZhYmxlU3ViVmlldztcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRXZlbnRDcmVhdG9yXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImNvbXBvbmVudHMvRXZlbnRDcmVhdG9yL0V2ZW50Q3JlYXRvclwiKSk7XG5jbGFzcyBTdWJWaWV3IGV4dGVuZHMgRXZlbnRDcmVhdG9yXzEuZGVmYXVsdCB7XG4gICAgY29uc3RydWN0b3Ioc2xpZGVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc2xpZGVyID0gc2xpZGVyO1xuICAgICAgICB0aGlzLnN0YXRlID0ge307XG4gICAgfVxuICAgIGdldFBvc2l0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5ob3Jpem9udGFsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdWJWaWV3LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zdWJWaWV3LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgfVxuICAgIGdldFNpemUoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmhvcml6b250YWwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN1YlZpZXcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnN1YlZpZXcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gU3ViVmlldztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jb252ZXJ0UGVyY2VudEluVmFsdWUgPSBleHBvcnRzLmNvbnZlcnRQaXhlbEluUGVyY2VudCA9IGV4cG9ydHMuY29udmVydFZhbHVlSW5QZXJjZW50ID0gdm9pZCAwO1xuLyogZXNsaW50LWRpc2FibGUgbm8tbWl4ZWQtb3BlcmF0b3JzICovXG5mdW5jdGlvbiBjb252ZXJ0VmFsdWVJblBlcmNlbnQobWluLCBtYXgsIHZhbHVlKSB7XG4gICAgcmV0dXJuICgxMDAgLyAobWF4IC0gbWluKSkgKiAodmFsdWUgLSBtaW4pO1xufVxuZXhwb3J0cy5jb252ZXJ0VmFsdWVJblBlcmNlbnQgPSBjb252ZXJ0VmFsdWVJblBlcmNlbnQ7XG5mdW5jdGlvbiBjb252ZXJ0UGl4ZWxJblBlcmNlbnQod2lkdGgsIHZhbHVlKSB7XG4gICAgcmV0dXJuICgxMDAgLyB3aWR0aCkgKiB2YWx1ZTtcbn1cbmV4cG9ydHMuY29udmVydFBpeGVsSW5QZXJjZW50ID0gY29udmVydFBpeGVsSW5QZXJjZW50O1xuZnVuY3Rpb24gY29udmVydFBlcmNlbnRJblZhbHVlKG1pbiwgbWF4LCBwZXJjZW50KSB7XG4gICAgcmV0dXJuICgobWF4IC0gbWluKSAvIDEwMCkgKiBwZXJjZW50ICsgbWluO1xufVxuZXhwb3J0cy5jb252ZXJ0UGVyY2VudEluVmFsdWUgPSBjb252ZXJ0UGVyY2VudEluVmFsdWU7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9hcHAudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=