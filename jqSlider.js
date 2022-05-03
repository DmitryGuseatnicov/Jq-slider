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
const Presenter_1 = __importDefault(__webpack_require__(/*! ./components/Presenter/Presenter */ "./components/Presenter/Presenter.ts"));
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
    const isEmptyArgs = args.length === 0 || typeof args[0] === 'object';
    const isGetState = args.length === 1 && args[0] === 'getState';
    const isBindEventListener = args.length >= 2 && args[0] === 'onChange' && typeof args[1] === 'function';
    const isUpdate = args.length >= 2 && args[0] === 'update' && typeof args[1] === 'object';
    if (isEmptyArgs) {
        const state = args[0] ? args[0] : {};
        return methods.init.call(this, state);
    }
    if (isUpdate) {
        const state = args[1];
        return methods.update.call(this, state);
    }
    if (isGetState) {
        return methods.getState.call(this);
    }
    if (isBindEventListener) {
        const callback = args[1];
        return methods.onChange.call(this, callback);
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
        if (typeof data.step && data.step > 0)
            settings.step = data.step;
        if (typeof data.min === 'number')
            settings.min = data.min;
        if (typeof data.max === 'number')
            settings.max = data.max;
        if (typeof data.scale === 'boolean')
            settings.scale = data.scale;
        if (typeof data.range === 'boolean')
            settings.range = data.range;
        if (typeof data.tip === 'boolean')
            settings.tip = data.tip;
        if (typeof data.progress === 'boolean')
            settings.progress = data.progress;
        if (typeof data.scaleDestiny === 'number')
            settings.scaleDestiny = data.scaleDestiny;
        if (typeof data.horizontal === 'boolean')
            settings.horizontal = data.horizontal;
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
        function checkStep(value, step) {
            return +(Math.round(value / step) * step).toFixed(2);
        }
        if (typeof copyOfData.from === 'number') {
            copyOfData.from = checkStep(copyOfData.from, this.state.step);
            if (copyOfData.from <= this.state.min) {
                copyOfData.from = this.state.min;
            }
            else if (copyOfData.from >= this.state.max) {
                copyOfData.from = this.state.max;
            }
        }
        if (typeof copyOfData.to === 'number') {
            copyOfData.to = checkStep(copyOfData.to, this.state.step);
            if (copyOfData.to <= this.state.min) {
                copyOfData.to = this.state.min;
            }
            else if (copyOfData.to >= this.state.max) {
                copyOfData.to = this.state.max;
            }
        }
        return copyOfData;
    }
    rangeFromToValidator(data) {
        if (!this.state.range) {
            return data;
        }
        const copyOfSData = Object.assign({}, data);
        if (typeof copyOfSData.from === 'number' &&
            typeof copyOfSData.to === 'number') {
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
const Model_1 = __importDefault(__webpack_require__(/*! ../Model/Model */ "./components/Model/Model.ts"));
const View_1 = __importDefault(__webpack_require__(/*! ../View/View */ "./components/View/View.ts"));
const EventCreator_1 = __importDefault(__webpack_require__(/*! ../EventCreator/EventCreator */ "./components/EventCreator/EventCreator.ts"));
const calcUtils_1 = __webpack_require__(/*! ../../utils/calcUtils */ "./utils/calcUtils.ts");
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


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Handle_1 = __importDefault(__webpack_require__(/*! ./subView/Handle/Handle */ "./components/View/subView/Handle/Handle.ts"));
const SecondHandle_1 = __importDefault(__webpack_require__(/*! ./subView/Handle/SecondHandle */ "./components/View/subView/Handle/SecondHandle.ts"));
const Scale_1 = __importDefault(__webpack_require__(/*! ./subView/Scale/Scale */ "./components/View/subView/Scale/Scale.ts"));
const Tip_1 = __importDefault(__webpack_require__(/*! ./subView/Tip/Tip */ "./components/View/subView/Tip/Tip.ts"));
const SecondTip_1 = __importDefault(__webpack_require__(/*! ./subView/Tip/SecondTip */ "./components/View/subView/Tip/SecondTip.ts"));
const Track_1 = __importDefault(__webpack_require__(/*! ./subView/Track/Track */ "./components/View/subView/Track/Track.ts"));
const EventCreator_1 = __importDefault(__webpack_require__(/*! ../EventCreator/EventCreator */ "./components/EventCreator/EventCreator.ts"));
const calcUtils_1 = __webpack_require__(/*! ../../utils/calcUtils */ "./utils/calcUtils.ts");
class View extends EventCreator_1.default {
    constructor(nodeElem) {
        super();
        this.nodeElem = nodeElem;
        this.components = [];
        this.state = {};
        this.init();
    }
    setState(state) {
        this.checkIsChangedSettings(state);
        this.state = Object.assign(Object.assign({}, this.state), state);
        this.update(this.state);
        this.checkTips();
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
        const { range, tip, scale, horizontal, progress, scaleDestiny } = state;
        const isUpdateSettings = range !== this.state.range ||
            tip !== this.state.tip ||
            scale !== this.state.scale ||
            horizontal !== this.state.horizontal ||
            progress !== this.state.progress ||
            scaleDestiny !== this.state.scaleDestiny;
        if (isUpdateSettings) {
            this.components = [];
            this.slider.innerHTML = '';
            this.createComponents(state);
            this.bindEventListener();
        }
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
    update(state) {
        this.components.forEach((component) => component.setState(state));
    }
    getArrOfConcreteSubView(instance) {
        return this.components.filter((component) => { var _a; return (_a = component instanceof instance) !== null && _a !== void 0 ? _a : component; });
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
        this.subView.style.zIndex = '2';
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
            this.subView.style.zIndex = '1';
        }
        else {
            this.subView.style.zIndex = '3';
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
const abstractSubView_1 = __importDefault(__webpack_require__(/*! ../baseClasses/abstractSubView/abstractSubView */ "./components/View/subView/baseClasses/abstractSubView/abstractSubView.ts"));
const calcUtils_1 = __webpack_require__(/*! ../../../../utils/calcUtils */ "./utils/calcUtils.ts");
class Scale extends abstractSubView_1.default {
    constructor(slider) {
        super(slider);
        this.init();
    }
    setState(state) {
        const { min, max, horizontal, scaleDestiny } = state;
        const oldState = JSON.stringify(this.state);
        this.state = Object.assign(Object.assign({}, this.state), { min,
            max,
            horizontal,
            scaleDestiny });
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
        const { min, max, horizontal, scaleDestiny } = this.state;
        const isCorrectParams = typeof min === 'number' &&
            typeof max === 'number' &&
            typeof scaleDestiny === 'number' &&
            typeof horizontal === 'boolean';
        if (!isCorrectParams) {
            return;
        }
        let pips = this.createPipFragment(min, max, min);
        for (let pip = min + 1; pip < max; pip += 1) {
            if (pip % scaleDestiny === 0) {
                pips += this.createPipFragment(min, max, pip);
            }
        }
        pips += this.createPipFragment(min, max, max);
        this.subView.innerHTML = pips;
        this.bindEventListener();
    }
    createPipFragment(min, max, value) {
        if (this.state.horizontal) {
            return `
      <div class="jq-slider__scale-pip" style="top:${(0, calcUtils_1.convertPercentInValue)(0, this.slider.clientHeight, (0, calcUtils_1.convertValueInPercent)(min, max, value))}px">
        <div class="jq-slider__scale-label">${value}</div>
      </div>`;
        }
        return `
      <div class="jq-slider__scale-pip" style="left:${(0, calcUtils_1.convertValueInPercent)(min, max, value)}%">
        <div class="jq-slider__scale-label">${value}</div>
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
        const isCorrectParams = e.target instanceof HTMLElement &&
            typeof min === 'number' &&
            typeof max === 'number';
        if (!isCorrectParams) {
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
        if (typeof to !== 'number') {
            return;
        }
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
    }
    update() {
        super.update();
        const { from, to } = this.state;
        const isNumbers = typeof from === 'number' && typeof to === 'number';
        if (!isNumbers) {
            return;
        }
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
const abstractSubView_1 = __importDefault(__webpack_require__(/*! ../baseClasses/abstractSubView/abstractSubView */ "./components/View/subView/baseClasses/abstractSubView/abstractSubView.ts"));
const calcUtils_1 = __webpack_require__(/*! ../../../../utils/calcUtils */ "./utils/calcUtils.ts");
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
        const isNumbers = typeof min === 'number' &&
            typeof max === 'number' &&
            typeof from === 'number' &&
            typeof to === 'number';
        if (!isNumbers) {
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
const abstractSubView_1 = __importDefault(__webpack_require__(/*! ../abstractSubView/abstractSubView */ "./components/View/subView/baseClasses/abstractSubView/abstractSubView.ts"));
const calcUtils_1 = __webpack_require__(/*! ../../../../../utils/calcUtils */ "./utils/calcUtils.ts");
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
        const isNumbers = typeof min === 'number' &&
            typeof max === 'number' &&
            typeof from === 'number' &&
            typeof to === 'number';
        if (!isNumbers) {
            return;
        }
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
const EventCreator_1 = __importDefault(__webpack_require__(/*! ../../../../EventCreator/EventCreator */ "./components/EventCreator/EventCreator.ts"));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc2xpZGVyLnNjc3M/MGJhOSIsIndlYnBhY2s6Ly8vLi9hcHAudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9FdmVudENyZWF0b3IvRXZlbnRDcmVhdG9yLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvRXZlbnRDcmVhdG9yL015RXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9Nb2RlbC9Nb2RlbC50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1ByZXNlbnRlci9QcmVzZW50ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9WaWV3L1ZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9WaWV3L3N1YlZpZXcvSGFuZGxlL0hhbmRsZS50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1ZpZXcvc3ViVmlldy9IYW5kbGUvU2Vjb25kSGFuZGxlLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvVmlldy9zdWJWaWV3L1NjYWxlL1NjYWxlLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvVmlldy9zdWJWaWV3L1RpcC9TZWNvbmRUaXAudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9WaWV3L3N1YlZpZXcvVGlwL1RpcC50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1ZpZXcvc3ViVmlldy9UcmFjay9UcmFjay50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1ZpZXcvc3ViVmlldy9iYXNlQ2xhc3Nlcy9Nb3ZhYmxlU3ViVmlldy9Nb3ZhYmxlU3ViVmlldy50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1ZpZXcvc3ViVmlldy9iYXNlQ2xhc3Nlcy9hYnN0cmFjdFN1YlZpZXcvYWJzdHJhY3RTdWJWaWV3LnRzIiwid2VicGFjazovLy8uL3V0aWxzL2NhbGNVdGlscy50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIlwidXNlIHN0cmljdFwiO1xuLyogZXNsaW50LWRpc2FibGUgZnNkL25vLWZ1bmN0aW9uLWRlY2xhcmF0aW9uLWluLWV2ZW50LWxpc3RlbmVyICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGZ1bmMtbmFtZXMgKi9cbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IFByZXNlbnRlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvUHJlc2VudGVyL1ByZXNlbnRlclwiKSk7XG5yZXF1aXJlKFwiLi9zbGlkZXIuc2Nzc1wiKTtcbmNvbnN0IG1ldGhvZHMgPSB7XG4gICAgaW5pdChzdGF0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGlzSW5pdCA9IHR5cGVvZiBzdGF0ZSA9PT0gJ29iamVjdCcgJiYgISQodGhpcykuZGF0YSgnanFTbGlkZXInKTtcbiAgICAgICAgICAgIGlmIChpc0luaXQpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmRhdGEoKS5qcVNsaWRlciA9IG5ldyBQcmVzZW50ZXJfMS5kZWZhdWx0KHRoaXMsIHN0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICB1cGRhdGUoc3RhdGUpIHtcbiAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGpxU2xpZGVyID0gJCh0aGlzKS5kYXRhKCdqcVNsaWRlcicpO1xuICAgICAgICAgICAganFTbGlkZXIubW9kZWwuc2V0U3RhdGUoc3RhdGUpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdldFN0YXRlKCkge1xuICAgICAgICBjb25zdCBqcVNsaWRlciA9ICQodGhpcykuZGF0YSgnanFTbGlkZXInKTtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBqcVNsaWRlci5tb2RlbC5nZXRTdGF0ZSgpO1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfSxcbiAgICBvbkNoYW5nZShjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QganFTbGlkZXIgPSAkKHRoaXMpLmRhdGEoJ2pxU2xpZGVyJyk7XG4gICAgICAgICAgICBqcVNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdvbkNoYW5nZScsIChlKSA9PiBjYWxsYmFjayhlKSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG59O1xuJC5mbi5qcVNsaWRlciA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgY29uc3QgaXNFbXB0eUFyZ3MgPSBhcmdzLmxlbmd0aCA9PT0gMCB8fCB0eXBlb2YgYXJnc1swXSA9PT0gJ29iamVjdCc7XG4gICAgY29uc3QgaXNHZXRTdGF0ZSA9IGFyZ3MubGVuZ3RoID09PSAxICYmIGFyZ3NbMF0gPT09ICdnZXRTdGF0ZSc7XG4gICAgY29uc3QgaXNCaW5kRXZlbnRMaXN0ZW5lciA9IGFyZ3MubGVuZ3RoID49IDIgJiYgYXJnc1swXSA9PT0gJ29uQ2hhbmdlJyAmJiB0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJztcbiAgICBjb25zdCBpc1VwZGF0ZSA9IGFyZ3MubGVuZ3RoID49IDIgJiYgYXJnc1swXSA9PT0gJ3VwZGF0ZScgJiYgdHlwZW9mIGFyZ3NbMV0gPT09ICdvYmplY3QnO1xuICAgIGlmIChpc0VtcHR5QXJncykge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IGFyZ3NbMF0gPyBhcmdzWzBdIDoge307XG4gICAgICAgIHJldHVybiBtZXRob2RzLmluaXQuY2FsbCh0aGlzLCBzdGF0ZSk7XG4gICAgfVxuICAgIGlmIChpc1VwZGF0ZSkge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IGFyZ3NbMV07XG4gICAgICAgIHJldHVybiBtZXRob2RzLnVwZGF0ZS5jYWxsKHRoaXMsIHN0YXRlKTtcbiAgICB9XG4gICAgaWYgKGlzR2V0U3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIG1ldGhvZHMuZ2V0U3RhdGUuY2FsbCh0aGlzKTtcbiAgICB9XG4gICAgaWYgKGlzQmluZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2sgPSBhcmdzWzFdO1xuICAgICAgICByZXR1cm4gbWV0aG9kcy5vbkNoYW5nZS5jYWxsKHRoaXMsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgcmV0dXJuICQuZXJyb3IoJ1RoaXMgbWV0aG9kIGRvZXMgbm90IGV4aXN0Jyk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBNeUV2ZW50XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vTXlFdmVudFwiKSk7XG5jbGFzcyBFdmVudENyZWF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmV2ZW50cyA9IHt9O1xuICAgIH1cbiAgICByZWdpc3RlckV2ZW50KGV2ZW50TmFtZSkge1xuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBNeUV2ZW50XzEuZGVmYXVsdChldmVudE5hbWUpO1xuICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gZXZlbnQ7XG4gICAgfVxuICAgIGRpc3BhdGNoRXZlbnQoZXZlbnROYW1lLCBldmVudEFyZ3MpIHtcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5jYWxsYmFja3MuZm9yRWFjaCgoY2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGV2ZW50QXJncyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5yZWdpc3RlckNhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBFdmVudENyZWF0b3I7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIE15RXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5jYWxsYmFja3MgPSBbXTtcbiAgICB9XG4gICAgcmVnaXN0ZXJDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBNeUV2ZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBFdmVudENyZWF0b3JfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vRXZlbnRDcmVhdG9yL0V2ZW50Q3JlYXRvclwiKSk7XG5jbGFzcyBNb2RlbCBleHRlbmRzIEV2ZW50Q3JlYXRvcl8xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBtYXg6IDEwMCxcbiAgICAgICAgICAgIGZyb206IDAsXG4gICAgICAgICAgICB0bzogMTAwLFxuICAgICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgICAgIHRpcDogdHJ1ZSxcbiAgICAgICAgICAgIHJhbmdlOiB0cnVlLFxuICAgICAgICAgICAgcHJvZ3Jlc3M6IHRydWUsXG4gICAgICAgICAgICBzY2FsZTogdHJ1ZSxcbiAgICAgICAgICAgIHNjYWxlRGVzdGlueTogMTAsXG4gICAgICAgICAgICBob3Jpem9udGFsOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pbml0KHN0YXRlKTtcbiAgICB9XG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgY29uc3QgW3ZhbHVlcywgc2V0dGluZ3NdID0gdGhpcy5zcGxpdFBhcmFtcyhzdGF0ZSk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUpLCB0aGlzLm1pbk1heFZhbGlkYXRvcihzZXR0aW5ncykpO1xuICAgICAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlKSwgdGhpcy5yYW5nZUZyb21Ub1ZhbGlkYXRvcih0aGlzLnN0ZXBWYWxpZGF0b3IodmFsdWVzKSkpO1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ01vZGVsRXZlbnQnLCB0aGlzLnN0YXRlKTtcbiAgICB9XG4gICAgZ2V0U3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICAgIH1cbiAgICBpbml0KHN0YXRlKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnTW9kZWxFdmVudCcpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHN0YXRlKTtcbiAgICB9XG4gICAgc3BsaXRQYXJhbXMoZGF0YSkge1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSB7fTtcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSB7fTtcbiAgICAgICAgaWYgKCdmcm9tJyBpbiBkYXRhKSB7XG4gICAgICAgICAgICB2YWx1ZXMuZnJvbSA9IGRhdGEuZnJvbTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlcy5mcm9tID0gdGhpcy5zdGF0ZS5mcm9tO1xuICAgICAgICB9XG4gICAgICAgIGlmICgndG8nIGluIGRhdGEpIHtcbiAgICAgICAgICAgIHZhbHVlcy50byA9IGRhdGEudG87XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZXMudG8gPSB0aGlzLnN0YXRlLnRvO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5zdGVwICYmIGRhdGEuc3RlcCA+IDApXG4gICAgICAgICAgICBzZXR0aW5ncy5zdGVwID0gZGF0YS5zdGVwO1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEubWluID09PSAnbnVtYmVyJylcbiAgICAgICAgICAgIHNldHRpbmdzLm1pbiA9IGRhdGEubWluO1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEubWF4ID09PSAnbnVtYmVyJylcbiAgICAgICAgICAgIHNldHRpbmdzLm1heCA9IGRhdGEubWF4O1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEuc2NhbGUgPT09ICdib29sZWFuJylcbiAgICAgICAgICAgIHNldHRpbmdzLnNjYWxlID0gZGF0YS5zY2FsZTtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhLnJhbmdlID09PSAnYm9vbGVhbicpXG4gICAgICAgICAgICBzZXR0aW5ncy5yYW5nZSA9IGRhdGEucmFuZ2U7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS50aXAgPT09ICdib29sZWFuJylcbiAgICAgICAgICAgIHNldHRpbmdzLnRpcCA9IGRhdGEudGlwO1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEucHJvZ3Jlc3MgPT09ICdib29sZWFuJylcbiAgICAgICAgICAgIHNldHRpbmdzLnByb2dyZXNzID0gZGF0YS5wcm9ncmVzcztcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhLnNjYWxlRGVzdGlueSA9PT0gJ251bWJlcicpXG4gICAgICAgICAgICBzZXR0aW5ncy5zY2FsZURlc3RpbnkgPSBkYXRhLnNjYWxlRGVzdGlueTtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhLmhvcml6b250YWwgPT09ICdib29sZWFuJylcbiAgICAgICAgICAgIHNldHRpbmdzLmhvcml6b250YWwgPSBkYXRhLmhvcml6b250YWw7XG4gICAgICAgIHJldHVybiBbdmFsdWVzLCBzZXR0aW5nc107XG4gICAgfVxuICAgIG1pbk1heFZhbGlkYXRvcihkYXRhKSB7XG4gICAgICAgIGxldCB7IG1pbiA9IHRoaXMuc3RhdGUubWluIH0gPSBkYXRhO1xuICAgICAgICBjb25zdCB7IG1heCA9IHRoaXMuc3RhdGUubWF4IH0gPSBkYXRhO1xuICAgICAgICBpZiAobWluID4gbWF4KVxuICAgICAgICAgICAgbWluID0gbWF4O1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBkYXRhKSwgeyBtaW4sIG1heCB9KTtcbiAgICB9XG4gICAgc3RlcFZhbGlkYXRvcihkYXRhKSB7XG4gICAgICAgIGNvbnN0IGNvcHlPZkRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhKTtcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tTdGVwKHZhbHVlLCBzdGVwKSB7XG4gICAgICAgICAgICByZXR1cm4gKyhNYXRoLnJvdW5kKHZhbHVlIC8gc3RlcCkgKiBzdGVwKS50b0ZpeGVkKDIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgY29weU9mRGF0YS5mcm9tID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgY29weU9mRGF0YS5mcm9tID0gY2hlY2tTdGVwKGNvcHlPZkRhdGEuZnJvbSwgdGhpcy5zdGF0ZS5zdGVwKTtcbiAgICAgICAgICAgIGlmIChjb3B5T2ZEYXRhLmZyb20gPD0gdGhpcy5zdGF0ZS5taW4pIHtcbiAgICAgICAgICAgICAgICBjb3B5T2ZEYXRhLmZyb20gPSB0aGlzLnN0YXRlLm1pbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNvcHlPZkRhdGEuZnJvbSA+PSB0aGlzLnN0YXRlLm1heCkge1xuICAgICAgICAgICAgICAgIGNvcHlPZkRhdGEuZnJvbSA9IHRoaXMuc3RhdGUubWF4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgY29weU9mRGF0YS50byA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGNvcHlPZkRhdGEudG8gPSBjaGVja1N0ZXAoY29weU9mRGF0YS50bywgdGhpcy5zdGF0ZS5zdGVwKTtcbiAgICAgICAgICAgIGlmIChjb3B5T2ZEYXRhLnRvIDw9IHRoaXMuc3RhdGUubWluKSB7XG4gICAgICAgICAgICAgICAgY29weU9mRGF0YS50byA9IHRoaXMuc3RhdGUubWluO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY29weU9mRGF0YS50byA+PSB0aGlzLnN0YXRlLm1heCkge1xuICAgICAgICAgICAgICAgIGNvcHlPZkRhdGEudG8gPSB0aGlzLnN0YXRlLm1heDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29weU9mRGF0YTtcbiAgICB9XG4gICAgcmFuZ2VGcm9tVG9WYWxpZGF0b3IoZGF0YSkge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUucmFuZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvcHlPZlNEYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YSk7XG4gICAgICAgIGlmICh0eXBlb2YgY29weU9mU0RhdGEuZnJvbSA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgICAgIHR5cGVvZiBjb3B5T2ZTRGF0YS50byA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGNvbnN0IGlzRnJvbU5vdFZhbGlkbHkgPSB0aGlzLnN0YXRlLnRvIC0gY29weU9mU0RhdGEuZnJvbSA8PSAwO1xuICAgICAgICAgICAgY29uc3QgaXNUb05vdFZhbGlkbHkgPSBjb3B5T2ZTRGF0YS50byAtIHRoaXMuc3RhdGUuZnJvbSA8PSAwO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuZnJvbSA+IHRoaXMuc3RhdGUudG8pXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5mcm9tID0gdGhpcy5zdGF0ZS50bztcbiAgICAgICAgICAgIGlmIChpc0Zyb21Ob3RWYWxpZGx5KVxuICAgICAgICAgICAgICAgIGNvcHlPZlNEYXRhLmZyb20gPSB0aGlzLnN0YXRlLnRvO1xuICAgICAgICAgICAgaWYgKGlzVG9Ob3RWYWxpZGx5KVxuICAgICAgICAgICAgICAgIGNvcHlPZlNEYXRhLnRvID0gdGhpcy5zdGF0ZS5mcm9tO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb3B5T2ZTRGF0YTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBNb2RlbDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgTW9kZWxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vTW9kZWwvTW9kZWxcIikpO1xuY29uc3QgVmlld18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9WaWV3L1ZpZXdcIikpO1xuY29uc3QgRXZlbnRDcmVhdG9yXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL0V2ZW50Q3JlYXRvci9FdmVudENyZWF0b3JcIikpO1xuY29uc3QgY2FsY1V0aWxzXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvY2FsY1V0aWxzXCIpO1xuY2xhc3MgUHJlc2VudGVyIGV4dGVuZHMgRXZlbnRDcmVhdG9yXzEuZGVmYXVsdCB7XG4gICAgY29uc3RydWN0b3Iobm9kZUVsZW0sIHN0YXRlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3XzEuZGVmYXVsdChub2RlRWxlbSk7XG4gICAgICAgIHRoaXMubW9kZWwgPSBuZXcgTW9kZWxfMS5kZWZhdWx0KHN0YXRlKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCdvbkNoYW5nZScpO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy52aWV3LnNldFN0YXRlKHRoaXMubW9kZWwuZ2V0U3RhdGUoKSk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuICAgIGJpbmRFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy52aWV3RXZlbnRIYW5kbGVyID0gdGhpcy52aWV3RXZlbnRIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMubW9kZWxFdmVudEhhbmRsZXIgPSB0aGlzLm1vZGVsRXZlbnRIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMudmlldy5hZGRFdmVudExpc3RlbmVyKCdWaWV3RXZlbnQnLCB0aGlzLnZpZXdFdmVudEhhbmRsZXIpO1xuICAgICAgICB0aGlzLm1vZGVsLmFkZEV2ZW50TGlzdGVuZXIoJ01vZGVsRXZlbnQnLCB0aGlzLm1vZGVsRXZlbnRIYW5kbGVyKTtcbiAgICB9XG4gICAgdmlld0V2ZW50SGFuZGxlcihlKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXggfSA9IHRoaXMubW9kZWwuZ2V0U3RhdGUoKTtcbiAgICAgICAgY29uc3QgaXNOdW1iZXJzID0gdHlwZW9mIG1pbiA9PT0gJ251bWJlcicgJiYgdHlwZW9mIG1heCA9PT0gJ251bWJlcic7XG4gICAgICAgIGlmICghaXNOdW1iZXJzKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoZS5mcm9tKVxuICAgICAgICAgICAgZS5mcm9tID0gKygwLCBjYWxjVXRpbHNfMS5jb252ZXJ0UGVyY2VudEluVmFsdWUpKG1pbiwgbWF4LCBlLmZyb20pLnRvRml4ZWQoMyk7XG4gICAgICAgIGlmIChlLnRvKVxuICAgICAgICAgICAgZS50byA9ICsoMCwgY2FsY1V0aWxzXzEuY29udmVydFBlcmNlbnRJblZhbHVlKShtaW4sIG1heCwgZS50bykudG9GaXhlZCgzKTtcbiAgICAgICAgdGhpcy5tb2RlbC5zZXRTdGF0ZShlKTtcbiAgICB9XG4gICAgbW9kZWxFdmVudEhhbmRsZXIoZSkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ29uQ2hhbmdlJywgZSk7XG4gICAgICAgIHRoaXMudmlldy5zZXRTdGF0ZShlKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBQcmVzZW50ZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEhhbmRsZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3N1YlZpZXcvSGFuZGxlL0hhbmRsZVwiKSk7XG5jb25zdCBTZWNvbmRIYW5kbGVfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9zdWJWaWV3L0hhbmRsZS9TZWNvbmRIYW5kbGVcIikpO1xuY29uc3QgU2NhbGVfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9zdWJWaWV3L1NjYWxlL1NjYWxlXCIpKTtcbmNvbnN0IFRpcF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3N1YlZpZXcvVGlwL1RpcFwiKSk7XG5jb25zdCBTZWNvbmRUaXBfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9zdWJWaWV3L1RpcC9TZWNvbmRUaXBcIikpO1xuY29uc3QgVHJhY2tfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9zdWJWaWV3L1RyYWNrL1RyYWNrXCIpKTtcbmNvbnN0IEV2ZW50Q3JlYXRvcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9FdmVudENyZWF0b3IvRXZlbnRDcmVhdG9yXCIpKTtcbmNvbnN0IGNhbGNVdGlsc18xID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL2NhbGNVdGlsc1wiKTtcbmNsYXNzIFZpZXcgZXh0ZW5kcyBFdmVudENyZWF0b3JfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlRWxlbSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm5vZGVFbGVtID0gbm9kZUVsZW07XG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IFtdO1xuICAgICAgICB0aGlzLnN0YXRlID0ge307XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICB0aGlzLmNoZWNrSXNDaGFuZ2VkU2V0dGluZ3Moc3RhdGUpO1xuICAgICAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlKSwgc3RhdGUpO1xuICAgICAgICB0aGlzLnVwZGF0ZSh0aGlzLnN0YXRlKTtcbiAgICAgICAgdGhpcy5jaGVja1RpcHMoKTtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVTbGlkZXIoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCdWaWV3RXZlbnQnKTtcbiAgICB9XG4gICAgY3JlYXRlU2xpZGVyKCkge1xuICAgICAgICB0aGlzLnNsaWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnNsaWRlci5jbGFzc0xpc3QuYWRkKCdqcS1zbGlkZXInKTtcbiAgICAgICAgdGhpcy5ub2RlRWxlbS5hcHBlbmRDaGlsZCh0aGlzLnNsaWRlcik7XG4gICAgfVxuICAgIGNyZWF0ZUNvbXBvbmVudHMoc3RhdGUpIHtcbiAgICAgICAgY29uc3QgeyByYW5nZSwgdGlwLCBzY2FsZSwgaG9yaXpvbnRhbCB9ID0gc3RhdGU7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cy5wdXNoKG5ldyBIYW5kbGVfMS5kZWZhdWx0KHRoaXMuc2xpZGVyKSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cy5wdXNoKG5ldyBUcmFja18xLmRlZmF1bHQodGhpcy5zbGlkZXIpKTtcbiAgICAgICAgaWYgKHRpcCkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzLnB1c2gobmV3IFRpcF8xLmRlZmF1bHQodGhpcy5zbGlkZXIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50cy5wdXNoKG5ldyBTZWNvbmRIYW5kbGVfMS5kZWZhdWx0KHRoaXMuc2xpZGVyKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmdlICYmIHRpcCkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzLnB1c2gobmV3IFNlY29uZFRpcF8xLmRlZmF1bHQodGhpcy5zbGlkZXIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NhbGUpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50cy5wdXNoKG5ldyBTY2FsZV8xLmRlZmF1bHQodGhpcy5zbGlkZXIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgdGhpcy5zbGlkZXIuY2xhc3NMaXN0LmFkZCgnanEtc2xpZGVyX2hvcml6b250YWwnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2pxLXNsaWRlcl9ob3Jpem9udGFsJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYmluZEV2ZW50TGlzdGVuZXIoKSB7XG4gICAgICAgIHRoaXMuc3ViVmlld0V2ZW50SGFuZGxlciA9IHRoaXMuc3ViVmlld0V2ZW50SGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMuZm9yRWFjaCgoY29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50LmV2ZW50cy5TdWJWaWV3RXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcignU3ViVmlld0V2ZW50JywgdGhpcy5zdWJWaWV3RXZlbnRIYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN1YlZpZXdFdmVudEhhbmRsZXIoZSkge1xuICAgICAgICBjb25zdCBzaXplID0gdGhpcy5zdGF0ZS5ob3Jpem9udGFsXG4gICAgICAgICAgICA/IHRoaXMuc2xpZGVyLmNsaWVudEhlaWdodFxuICAgICAgICAgICAgOiB0aGlzLnNsaWRlci5jbGllbnRXaWR0aDtcbiAgICAgICAgaWYgKGUudGFyZ2V0ID09PSAnZnJvbScpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnVmlld0V2ZW50Jywge1xuICAgICAgICAgICAgICAgIGZyb206ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0UGl4ZWxJblBlcmNlbnQpKHNpemUsIGUucG9zaXRpb24pLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUudGFyZ2V0ID09PSAndG8nKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ1ZpZXdFdmVudCcsIHtcbiAgICAgICAgICAgICAgICB0bzogKDAsIGNhbGNVdGlsc18xLmNvbnZlcnRQaXhlbEluUGVyY2VudCkoc2l6ZSwgZS5wb3NpdGlvbiksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZS50YXJnZXQgPT09ICd0cmFjaycgfHwgZS50YXJnZXQgPT09ICdzY2FsZScpIHtcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXMgPSB0aGlzLmdldEFyck9mQ29uY3JldGVTdWJWaWV3KEhhbmRsZV8xLmRlZmF1bHQpO1xuICAgICAgICAgICAgY29uc3QgZnJvbSA9IGhhbmRsZXNbMF0uZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZS5yYW5nZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnVmlld0V2ZW50Jywge1xuICAgICAgICAgICAgICAgICAgICBmcm9tOiAoMCwgY2FsY1V0aWxzXzEuY29udmVydFBpeGVsSW5QZXJjZW50KShzaXplLCBlLnBvc2l0aW9uKSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0byA9IGhhbmRsZXNbMV0uZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhmcm9tIC0gZS5wb3NpdGlvbikgPD0gdG8gLSBlLnBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdWaWV3RXZlbnQnLCB7XG4gICAgICAgICAgICAgICAgICAgIGZyb206ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0UGl4ZWxJblBlcmNlbnQpKHNpemUsIGUucG9zaXRpb24pLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnVmlld0V2ZW50Jywge1xuICAgICAgICAgICAgICAgIHRvOiAoMCwgY2FsY1V0aWxzXzEuY29udmVydFBpeGVsSW5QZXJjZW50KShzaXplLCBlLnBvc2l0aW9uKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNoZWNrSXNDaGFuZ2VkU2V0dGluZ3Moc3RhdGUpIHtcbiAgICAgICAgY29uc3QgeyByYW5nZSwgdGlwLCBzY2FsZSwgaG9yaXpvbnRhbCwgcHJvZ3Jlc3MsIHNjYWxlRGVzdGlueSB9ID0gc3RhdGU7XG4gICAgICAgIGNvbnN0IGlzVXBkYXRlU2V0dGluZ3MgPSByYW5nZSAhPT0gdGhpcy5zdGF0ZS5yYW5nZSB8fFxuICAgICAgICAgICAgdGlwICE9PSB0aGlzLnN0YXRlLnRpcCB8fFxuICAgICAgICAgICAgc2NhbGUgIT09IHRoaXMuc3RhdGUuc2NhbGUgfHxcbiAgICAgICAgICAgIGhvcml6b250YWwgIT09IHRoaXMuc3RhdGUuaG9yaXpvbnRhbCB8fFxuICAgICAgICAgICAgcHJvZ3Jlc3MgIT09IHRoaXMuc3RhdGUucHJvZ3Jlc3MgfHxcbiAgICAgICAgICAgIHNjYWxlRGVzdGlueSAhPT0gdGhpcy5zdGF0ZS5zY2FsZURlc3Rpbnk7XG4gICAgICAgIGlmIChpc1VwZGF0ZVNldHRpbmdzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb21wb25lbnRzKHN0YXRlKTtcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50TGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGVja1RpcHMoKSB7XG4gICAgICAgIGNvbnN0IHsgdGlwLCByYW5nZSwgaG9yaXpvbnRhbCB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgaWYgKCEodGlwICYmIHJhbmdlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRpcHMgPSB0aGlzLmdldEFyck9mQ29uY3JldGVTdWJWaWV3KFRpcF8xLmRlZmF1bHQpO1xuICAgICAgICBjb25zdCBzaXplID0gaG9yaXpvbnRhbFxuICAgICAgICAgICAgPyB0aXBzWzFdLnN1YlZpZXcuY2xpZW50SGVpZ2h0XG4gICAgICAgICAgICA6IHRpcHNbMV0uc3ViVmlldy5vZmZzZXRXaWR0aDtcbiAgICAgICAgY29uc3QgZmlyc3RQb3NpdGlvbiA9IHRpcHNbMF0uZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgY29uc3Qgc2Vjb25kUG9zaXRpb24gPSB0aXBzWzFdLmdldFBvc2l0aW9uKCkgLSBzaXplO1xuICAgICAgICBpZiAoZmlyc3RQb3NpdGlvbiA+IHNlY29uZFBvc2l0aW9uKSB7XG4gICAgICAgICAgICB0aXBzLmZvckVhY2goKHQpID0+IHtcbiAgICAgICAgICAgICAgICB0LmNoYW5nZUlzRG91YmxlKHRydWUpO1xuICAgICAgICAgICAgICAgIHQuc2V0U3RhdGUodGhpcy5zdGF0ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRpcHMuZm9yRWFjaCgodCkgPT4ge1xuICAgICAgICAgICAgICAgIHQuY2hhbmdlSXNEb3VibGUoZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXBkYXRlKHN0YXRlKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cy5mb3JFYWNoKChjb21wb25lbnQpID0+IGNvbXBvbmVudC5zZXRTdGF0ZShzdGF0ZSkpO1xuICAgIH1cbiAgICBnZXRBcnJPZkNvbmNyZXRlU3ViVmlldyhpbnN0YW5jZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnRzLmZpbHRlcigoY29tcG9uZW50KSA9PiB7IHZhciBfYTsgcmV0dXJuIChfYSA9IGNvbXBvbmVudCBpbnN0YW5jZW9mIGluc3RhbmNlKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBjb21wb25lbnQ7IH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFZpZXc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IE1vdmFibGVTdWJWaWV3XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2Jhc2VDbGFzc2VzL01vdmFibGVTdWJWaWV3L01vdmFibGVTdWJWaWV3XCIpKTtcbmNsYXNzIEhhbmRsZSBleHRlbmRzIE1vdmFibGVTdWJWaWV3XzEuZGVmYXVsdCB7XG4gICAgZ2V0UG9zaXRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmhvcml6b250YWwpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1YlZpZXdUb3AgPSB0aGlzLnN1YlZpZXcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgICAgICAgY29uc3Qgc2xpZGVyVG9wID0gdGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgICAgICAgcmV0dXJuIHN1YlZpZXdUb3AgLSBzbGlkZXJUb3AgKyB0aGlzLnN1YlZpZXcub2Zmc2V0SGVpZ2h0IC8gMjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdWJWaWV3TGVmdCA9IHRoaXMuc3ViVmlldy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgICAgICBjb25zdCBzbGlkZXJMZWZ0ID0gdGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICAgICAgcmV0dXJuIHN1YlZpZXdMZWZ0IC0gc2xpZGVyTGVmdCArIHRoaXMuc3ViVmlldy5vZmZzZXRXaWR0aCAvIDI7XG4gICAgfVxuICAgIGNyZWF0ZVN1YlZpZXcoKSB7XG4gICAgICAgIHN1cGVyLmNyZWF0ZVN1YlZpZXcoKTtcbiAgICAgICAgdGhpcy5zdWJWaWV3LmNsYXNzTGlzdC5hZGQoJ2pxLXNsaWRlcl9faGFuZGxlJyk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5zdHlsZS56SW5kZXggPSAnMic7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gSGFuZGxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBIYW5kbGVfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9IYW5kbGVcIikpO1xuY2xhc3MgU2Vjb25kSGFuZGxlIGV4dGVuZHMgSGFuZGxlXzEuZGVmYXVsdCB7XG4gICAgY29uc3RydWN0b3Ioc2xpZGVyKSB7XG4gICAgICAgIHN1cGVyKHNsaWRlcik7XG4gICAgICAgIHRoaXMucm9sZSA9ICd0byc7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgY29uc3Qgc2l6ZSA9IHRoaXMuc3RhdGUuaG9yaXpvbnRhbFxuICAgICAgICAgICAgPyB0aGlzLnNsaWRlci5jbGllbnRIZWlnaHRcbiAgICAgICAgICAgIDogdGhpcy5zbGlkZXIuY2xpZW50V2lkdGg7XG4gICAgICAgIGlmICh0aGlzLmdldFBvc2l0aW9uKCkgPiBzaXplIC8gMikge1xuICAgICAgICAgICAgdGhpcy5zdWJWaWV3LnN0eWxlLnpJbmRleCA9ICcxJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3ViVmlldy5zdHlsZS56SW5kZXggPSAnMyc7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gU2Vjb25kSGFuZGxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhYnN0cmFjdFN1YlZpZXdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vYmFzZUNsYXNzZXMvYWJzdHJhY3RTdWJWaWV3L2Fic3RyYWN0U3ViVmlld1wiKSk7XG5jb25zdCBjYWxjVXRpbHNfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi91dGlscy9jYWxjVXRpbHNcIik7XG5jbGFzcyBTY2FsZSBleHRlbmRzIGFic3RyYWN0U3ViVmlld18xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKHNsaWRlcikge1xuICAgICAgICBzdXBlcihzbGlkZXIpO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCwgaG9yaXpvbnRhbCwgc2NhbGVEZXN0aW55IH0gPSBzdGF0ZTtcbiAgICAgICAgY29uc3Qgb2xkU3RhdGUgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZSksIHsgbWluLFxuICAgICAgICAgICAgbWF4LFxuICAgICAgICAgICAgaG9yaXpvbnRhbCxcbiAgICAgICAgICAgIHNjYWxlRGVzdGlueSB9KTtcbiAgICAgICAgaWYgKG9sZFN0YXRlICE9PSBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlKSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmNyZWF0ZVN1YlZpZXcoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCdTdWJWaWV3RXZlbnQnKTtcbiAgICB9XG4gICAgY3JlYXRlU3ViVmlldygpIHtcbiAgICAgICAgdGhpcy5zdWJWaWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5jbGFzc0xpc3QuYWRkKCdqcS1zbGlkZXJfX3NjYWxlJyk7XG4gICAgICAgIHRoaXMuc2xpZGVyLmFwcGVuZENoaWxkKHRoaXMuc3ViVmlldyk7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCwgaG9yaXpvbnRhbCwgc2NhbGVEZXN0aW55IH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBpc0NvcnJlY3RQYXJhbXMgPSB0eXBlb2YgbWluID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgICAgdHlwZW9mIG1heCA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgICAgIHR5cGVvZiBzY2FsZURlc3RpbnkgPT09ICdudW1iZXInICYmXG4gICAgICAgICAgICB0eXBlb2YgaG9yaXpvbnRhbCA9PT0gJ2Jvb2xlYW4nO1xuICAgICAgICBpZiAoIWlzQ29ycmVjdFBhcmFtcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwaXBzID0gdGhpcy5jcmVhdGVQaXBGcmFnbWVudChtaW4sIG1heCwgbWluKTtcbiAgICAgICAgZm9yIChsZXQgcGlwID0gbWluICsgMTsgcGlwIDwgbWF4OyBwaXAgKz0gMSkge1xuICAgICAgICAgICAgaWYgKHBpcCAlIHNjYWxlRGVzdGlueSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHBpcHMgKz0gdGhpcy5jcmVhdGVQaXBGcmFnbWVudChtaW4sIG1heCwgcGlwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwaXBzICs9IHRoaXMuY3JlYXRlUGlwRnJhZ21lbnQobWluLCBtYXgsIG1heCk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5pbm5lckhUTUwgPSBwaXBzO1xuICAgICAgICB0aGlzLmJpbmRFdmVudExpc3RlbmVyKCk7XG4gICAgfVxuICAgIGNyZWF0ZVBpcEZyYWdtZW50KG1pbiwgbWF4LCB2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5ob3Jpem9udGFsKSB7XG4gICAgICAgICAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImpxLXNsaWRlcl9fc2NhbGUtcGlwXCIgc3R5bGU9XCJ0b3A6JHsoMCwgY2FsY1V0aWxzXzEuY29udmVydFBlcmNlbnRJblZhbHVlKSgwLCB0aGlzLnNsaWRlci5jbGllbnRIZWlnaHQsICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCB2YWx1ZSkpfXB4XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJqcS1zbGlkZXJfX3NjYWxlLWxhYmVsXCI+JHt2YWx1ZX08L2Rpdj5cbiAgICAgIDwvZGl2PmA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJqcS1zbGlkZXJfX3NjYWxlLXBpcFwiIHN0eWxlPVwibGVmdDokeygwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCB2YWx1ZSl9JVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwianEtc2xpZGVyX19zY2FsZS1sYWJlbFwiPiR7dmFsdWV9PC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuICAgIH1cbiAgICBiaW5kRXZlbnRMaXN0ZW5lcigpIHtcbiAgICAgICAgdGhpcy5jbGlja0hhbmRsZXIgPSB0aGlzLmNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnN1YlZpZXcucXVlcnlTZWxlY3RvckFsbCgnLmpxLXNsaWRlcl9fc2NhbGUtbGFiZWwnKS5mb3JFYWNoKChwaXApID0+IHtcbiAgICAgICAgICAgIGlmIChwaXAgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHBpcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNsaWNrSGFuZGxlcihlKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIGhvcml6b250YWwgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IGlzQ29ycmVjdFBhcmFtcyA9IGUudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiZcbiAgICAgICAgICAgIHR5cGVvZiBtaW4gPT09ICdudW1iZXInICYmXG4gICAgICAgICAgICB0eXBlb2YgbWF4ID09PSAnbnVtYmVyJztcbiAgICAgICAgaWYgKCFpc0NvcnJlY3RQYXJhbXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvbmVQZXJjZW50ID0gaG9yaXpvbnRhbFxuICAgICAgICAgICAgPyB0aGlzLnNsaWRlci5jbGllbnRIZWlnaHQgLyAxMDBcbiAgICAgICAgICAgIDogdGhpcy5zbGlkZXIuY2xpZW50V2lkdGggLyAxMDA7XG4gICAgICAgIGNvbnN0IHBlcmNlbnRzID0gaG9yaXpvbnRhbFxuICAgICAgICAgICAgPyAoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgK2UudGFyZ2V0LmlubmVySFRNTClcbiAgICAgICAgICAgIDogKDAsIGNhbGNVdGlsc18xLmNvbnZlcnRWYWx1ZUluUGVyY2VudCkobWluLCBtYXgsICtlLnRhcmdldC5pbm5lckhUTUwpO1xuICAgICAgICBsZXQgcG9zaXRpb24gPSBvbmVQZXJjZW50ICogcGVyY2VudHM7XG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgY29uc3Qgc2xpZGVyU2l6ZSA9IGhvcml6b250YWxcbiAgICAgICAgICAgICAgICA/IHRoaXMuc2xpZGVyLmNsaWVudEhlaWdodFxuICAgICAgICAgICAgICAgIDogdGhpcy5zbGlkZXIuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24oKSAtIHNsaWRlclNpemU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdTdWJWaWV3RXZlbnQnLCB7IHRhcmdldDogJ3NjYWxlJywgcG9zaXRpb24gfSk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gU2NhbGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IFRpcF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1RpcFwiKSk7XG5jbGFzcyBTZWNvbmRUaXAgZXh0ZW5kcyBUaXBfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3RvcihzbGlkZXIpIHtcbiAgICAgICAgc3VwZXIoc2xpZGVyKTtcbiAgICAgICAgdGhpcy5yb2xlID0gJ3RvJztcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICBzdXBlci51cGRhdGUoKTtcbiAgICAgICAgY29uc3QgeyB0byB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgaWYgKHR5cGVvZiB0byAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0RvdWJsZSkge1xuICAgICAgICAgICAgdGhpcy5zdWJWaWV3LnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN1YlZpZXcuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN1YlZpZXcudGV4dENvbnRlbnQgPSB0by50b1N0cmluZygpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFNlY29uZFRpcDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgTW92YWJsZVN1YlZpZXdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vYmFzZUNsYXNzZXMvTW92YWJsZVN1YlZpZXcvTW92YWJsZVN1YlZpZXdcIikpO1xuY2xhc3MgVGlwIGV4dGVuZHMgTW92YWJsZVN1YlZpZXdfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3RvcihzbGlkZXIpIHtcbiAgICAgICAgc3VwZXIoc2xpZGVyKTtcbiAgICAgICAgdGhpcy5pc0RvdWJsZSA9IGZhbHNlO1xuICAgIH1cbiAgICBjaGFuZ2VJc0RvdWJsZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmlzRG91YmxlID0gdmFsdWU7XG4gICAgfVxuICAgIGNyZWF0ZVN1YlZpZXcoKSB7XG4gICAgICAgIHN1cGVyLmNyZWF0ZVN1YlZpZXcoKTtcbiAgICAgICAgdGhpcy5zdWJWaWV3LmNsYXNzTGlzdC5hZGQoJ2pxLXNsaWRlcl9fdGlwJyk7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XG4gICAgICAgIGNvbnN0IHsgZnJvbSwgdG8gfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IGlzTnVtYmVycyA9IHR5cGVvZiBmcm9tID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgdG8gPT09ICdudW1iZXInO1xuICAgICAgICBpZiAoIWlzTnVtYmVycykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3ViVmlldy50ZXh0Q29udGVudCA9IHRoaXMuaXNEb3VibGVcbiAgICAgICAgICAgID8gYCR7ZnJvbX0gLSAke3RvfWBcbiAgICAgICAgICAgIDogZnJvbS50b1N0cmluZygpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFRpcDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYWJzdHJhY3RTdWJWaWV3XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2Jhc2VDbGFzc2VzL2Fic3RyYWN0U3ViVmlldy9hYnN0cmFjdFN1YlZpZXdcIikpO1xuY29uc3QgY2FsY1V0aWxzXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vdXRpbHMvY2FsY1V0aWxzXCIpO1xuY2xhc3MgVHJhY2sgZXh0ZW5kcyBhYnN0cmFjdFN1YlZpZXdfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3RvcihzbGlkZXIpIHtcbiAgICAgICAgc3VwZXIoc2xpZGVyKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIGZyb20sIHRvLCBob3Jpem9udGFsLCByYW5nZSwgcHJvZ3Jlc3MgfSA9IHN0YXRlO1xuICAgICAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlKSwgeyBtaW4sXG4gICAgICAgICAgICBtYXgsXG4gICAgICAgICAgICBmcm9tLFxuICAgICAgICAgICAgdG8sXG4gICAgICAgICAgICBob3Jpem9udGFsLFxuICAgICAgICAgICAgcmFuZ2UsXG4gICAgICAgICAgICBwcm9ncmVzcyB9KTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgY3JlYXRlU3ViVmlldygpIHtcbiAgICAgICAgdGhpcy5zdWJWaWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5jbGFzc0xpc3QuYWRkKCdqcS1zbGlkZXJfX3RyYWNrJyk7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5wcm9ncmVzcy5jbGFzc0xpc3QuYWRkKCdqcS1zbGlkZXJfX3Byb2dyZXNzJyk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5hcHBlbmRDaGlsZCh0aGlzLnByb2dyZXNzKTtcbiAgICAgICAgdGhpcy5zbGlkZXIuYXBwZW5kQ2hpbGQodGhpcy5zdWJWaWV3KTtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVTdWJWaWV3KCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnU3ViVmlld0V2ZW50Jyk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50TGlzdGVuZXIoKTtcbiAgICB9XG4gICAgYmluZEV2ZW50TGlzdGVuZXIoKSB7XG4gICAgICAgIHRoaXMuY2xpY2tIYW5kbGVyID0gdGhpcy5jbGlja0hhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zdWJWaWV3LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXIpO1xuICAgIH1cbiAgICBjbGlja0hhbmRsZXIoZSkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ1N1YlZpZXdFdmVudCcsIHtcbiAgICAgICAgICAgIHRhcmdldDogJ3RyYWNrJyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLnN0YXRlLmhvcml6b250YWxcbiAgICAgICAgICAgICAgICA/IGUuY2xpZW50WSAtIHRoaXMuc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcFxuICAgICAgICAgICAgICAgIDogZS5jbGllbnRYIC0gdGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCwgZnJvbSwgdG8sIGhvcml6b250YWwsIHJhbmdlLCBwcm9ncmVzcyB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgaWYgKCFwcm9ncmVzcykge1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5yZW1vdmUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpc051bWJlcnMgPSB0eXBlb2YgbWluID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgICAgdHlwZW9mIG1heCA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgICAgIHR5cGVvZiBmcm9tID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgICAgdHlwZW9mIHRvID09PSAnbnVtYmVyJztcbiAgICAgICAgaWYgKCFpc051bWJlcnMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdGFydCA9ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCBmcm9tKTtcbiAgICAgICAgY29uc3QgZW5kID0gKDAsIGNhbGNVdGlsc18xLmNvbnZlcnRWYWx1ZUluUGVyY2VudCkobWluLCBtYXgsIHRvKTtcbiAgICAgICAgaWYgKGhvcml6b250YWwgJiYgcmFuZ2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IGVuZCAtIHN0YXJ0O1xuICAgICAgICAgICAgY29uc3Qgb25lUGVyY2VudCA9IHRoaXMuc2xpZGVyLmNsaWVudEhlaWdodCAvIDEwMDtcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3Muc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fSVgO1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5zdHlsZS5tYXJnaW5Ub3AgPSBgJHtvbmVQZXJjZW50ICogc3RhcnR9cHhgO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChob3Jpem9udGFsICYmICFyYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5zdHlsZS5oZWlnaHQgPSBgJHtzdGFydH0lYDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmFuZ2UpIHtcbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gZW5kIC0gc3RhcnQ7XG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzLnN0eWxlLndpZHRoID0gYCR7d2lkdGh9JWA7XG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzLnN0eWxlLm1hcmdpbkxlZnQgPSBgJHtzdGFydH0lYDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3Muc3R5bGUud2lkdGggPSBgJHtzdGFydH0lYDtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFRyYWNrO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhYnN0cmFjdFN1YlZpZXdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vYWJzdHJhY3RTdWJWaWV3L2Fic3RyYWN0U3ViVmlld1wiKSk7XG5jb25zdCBjYWxjVXRpbHNfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi91dGlscy9jYWxjVXRpbHNcIik7XG5jbGFzcyBNb3ZhYmxlU3ViVmlldyBleHRlbmRzIGFic3RyYWN0U3ViVmlld18xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKHNsaWRlcikge1xuICAgICAgICBzdXBlcihzbGlkZXIpO1xuICAgICAgICB0aGlzLnJvbGUgPSAnZnJvbSc7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4LCBmcm9tLCB0bywgaG9yaXpvbnRhbCB9ID0gc3RhdGU7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUpLCB7IG1pbixcbiAgICAgICAgICAgIG1heCxcbiAgICAgICAgICAgIGZyb20sXG4gICAgICAgICAgICB0byxcbiAgICAgICAgICAgIGhvcml6b250YWwgfSk7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlU3ViVmlldygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ1N1YlZpZXdFdmVudCcpO1xuICAgICAgICB0aGlzLmJpbmRFdmVudExpc3RlbmVyKCk7XG4gICAgfVxuICAgIGJpbmRFdmVudExpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLnBvaW50ZXJTdGFydCA9IHRoaXMucG9pbnRlclN0YXJ0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIHRoaXMucG9pbnRlclN0YXJ0KTtcbiAgICB9XG4gICAgcG9pbnRlclN0YXJ0KCkge1xuICAgICAgICB0aGlzLnBvaW50ZXJIYW5kbGVyID0gdGhpcy5wb2ludGVySGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnJlbW92ZVBvaW50U3RhcnQgPSB0aGlzLnJlbW92ZVBvaW50U3RhcnQuYmluZCh0aGlzKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgdGhpcy5wb2ludGVySGFuZGxlcik7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCB0aGlzLnJlbW92ZVBvaW50U3RhcnQpO1xuICAgIH1cbiAgICByZW1vdmVQb2ludFN0YXJ0KCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCB0aGlzLnBvaW50ZXJIYW5kbGVyKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgdGhpcy5wb2ludGVySGFuZGxlcik7XG4gICAgfVxuICAgIHBvaW50ZXJIYW5kbGVyKGUpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdTdWJWaWV3RXZlbnQnLCB7XG4gICAgICAgICAgICB0YXJnZXQ6IHRoaXMucm9sZSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLnN0YXRlLmhvcml6b250YWxcbiAgICAgICAgICAgICAgICA/IGUuY2xpZW50WSAtIHRoaXMuc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcFxuICAgICAgICAgICAgICAgIDogZS5jbGllbnRYIC0gdGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNyZWF0ZVN1YlZpZXcoKSB7XG4gICAgICAgIHRoaXMuc3ViVmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmRDaGlsZCh0aGlzLnN1YlZpZXcpO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIGZyb20sIHRvLCBob3Jpem9udGFsIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBpc051bWJlcnMgPSB0eXBlb2YgbWluID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgICAgdHlwZW9mIG1heCA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgICAgIHR5cGVvZiBmcm9tID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgICAgdHlwZW9mIHRvID09PSAnbnVtYmVyJztcbiAgICAgICAgaWYgKCFpc051bWJlcnMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucm9sZSA9PT0gJ2Zyb20nID8gZnJvbSA6IHRvO1xuICAgICAgICBpZiAoaG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgdGhpcy5zdWJWaWV3LnN0eWxlLnRvcCA9IGAkeygwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCB2YWx1ZSl9JWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN1YlZpZXcuc3R5bGUubGVmdCA9IGAkeygwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCB2YWx1ZSl9JWA7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBNb3ZhYmxlU3ViVmlldztcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRXZlbnRDcmVhdG9yXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uLy4uLy4uLy4uL0V2ZW50Q3JlYXRvci9FdmVudENyZWF0b3JcIikpO1xuY2xhc3MgU3ViVmlldyBleHRlbmRzIEV2ZW50Q3JlYXRvcl8xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKHNsaWRlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnNsaWRlciA9IHNsaWRlcjtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHt9O1xuICAgIH1cbiAgICBnZXRQb3NpdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3ViVmlldy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc3ViVmlldy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFN1YlZpZXc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY29udmVydFBlcmNlbnRJblZhbHVlID0gZXhwb3J0cy5jb252ZXJ0UGl4ZWxJblBlcmNlbnQgPSBleHBvcnRzLmNvbnZlcnRWYWx1ZUluUGVyY2VudCA9IHZvaWQgMDtcbi8qIGVzbGludC1kaXNhYmxlIG5vLW1peGVkLW9wZXJhdG9ycyAqL1xuZnVuY3Rpb24gY29udmVydFZhbHVlSW5QZXJjZW50KG1pbiwgbWF4LCB2YWx1ZSkge1xuICAgIHJldHVybiAoMTAwIC8gKG1heCAtIG1pbikpICogKHZhbHVlIC0gbWluKTtcbn1cbmV4cG9ydHMuY29udmVydFZhbHVlSW5QZXJjZW50ID0gY29udmVydFZhbHVlSW5QZXJjZW50O1xuZnVuY3Rpb24gY29udmVydFBpeGVsSW5QZXJjZW50KHdpZHRoLCB2YWx1ZSkge1xuICAgIHJldHVybiAoMTAwIC8gd2lkdGgpICogdmFsdWU7XG59XG5leHBvcnRzLmNvbnZlcnRQaXhlbEluUGVyY2VudCA9IGNvbnZlcnRQaXhlbEluUGVyY2VudDtcbmZ1bmN0aW9uIGNvbnZlcnRQZXJjZW50SW5WYWx1ZShtaW4sIG1heCwgcGVyY2VudCkge1xuICAgIHJldHVybiAoKG1heCAtIG1pbikgLyAxMDApICogcGVyY2VudCArIG1pbjtcbn1cbmV4cG9ydHMuY29udmVydFBlcmNlbnRJblZhbHVlID0gY29udmVydFBlcmNlbnRJblZhbHVlO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vYXBwLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9