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

/***/ "./AppComponents/EventCreator/EventCreator.ts":
/*!****************************************************!*\
  !*** ./AppComponents/EventCreator/EventCreator.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {


/* eslint-disable max-classes-per-file */
// eslint-disable-next-line max-classes-per-file
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
class EventCreator {
    constructor() {
        this.events = {};
    }
    registerEvent(eventName) {
        const event = new MyEvent(eventName);
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

/***/ "./AppComponents/Model/Model.ts":
/*!**************************************!*\
  !*** ./AppComponents/Model/Model.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const EventCreator_1 = __importDefault(__webpack_require__(/*! ../EventCreator/EventCreator */ "./AppComponents/EventCreator/EventCreator.ts"));
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
    // eslint-disable-next-line class-methods-use-this
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
        if (typeof data.scaleDestiny === 'number')
            settings.scaleDestiny = data.scaleDestiny;
        if (typeof data.scale === 'boolean')
            settings.scale = data.scale;
        if (typeof data.range === 'boolean')
            settings.range = data.range;
        if (typeof data.tip === 'boolean')
            settings.tip = data.tip;
        if (typeof data.progress === 'boolean')
            settings.horizontal = data.horizontal;
        if (typeof data.progress === 'boolean')
            settings.progress = data.progress;
        return [values, settings];
    }
    minMaxValidator(data) {
        // eslint-disable-next-line prefer-const
        let { min = this.state.min, max = this.state.max } = data;
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
            if (copyOfData.from <= this.state.min)
                copyOfData.from = this.state.min;
            else if (copyOfData.from >= this.state.max)
                copyOfData.from = this.state.max;
        }
        if (typeof copyOfData.to === 'number') {
            copyOfData.to = checkStep(copyOfData.to, this.state.step);
            if (copyOfData.to <= this.state.min)
                copyOfData.to = this.state.min;
            else if (copyOfData.to >= this.state.max)
                copyOfData.to = this.state.max;
        }
        return copyOfData;
    }
    rangeFromToValidator(data) {
        if (!this.state.range) {
            return data;
        }
        const copyOfSData = Object.assign({}, data);
        const isFromNotValidly = copyOfSData.from && this.state.to - copyOfSData.from <= 0;
        const isToNotValidly = copyOfSData.to && copyOfSData.to - this.state.from <= 0;
        if (this.state.from > this.state.to)
            this.state.from = this.state.to;
        if (isFromNotValidly)
            copyOfSData.from = this.state.to;
        if (isToNotValidly)
            copyOfSData.to = this.state.from;
        return copyOfSData;
    }
}
exports["default"] = Model;


/***/ }),

/***/ "./AppComponents/Presenter/Presenter.ts":
/*!**********************************************!*\
  !*** ./AppComponents/Presenter/Presenter.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const calcUtils_1 = __webpack_require__(/*! ../../utils/calcUtils */ "./utils/calcUtils.ts");
const EventCreator_1 = __importDefault(__webpack_require__(/*! ../EventCreator/EventCreator */ "./AppComponents/EventCreator/EventCreator.ts"));
const Model_1 = __importDefault(__webpack_require__(/*! ../Model/Model */ "./AppComponents/Model/Model.ts"));
const View_1 = __importDefault(__webpack_require__(/*! ../View/View */ "./AppComponents/View/View.ts"));
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
        if (typeof min === 'number' && typeof max === 'number') {
            if (e.from)
                e.from = +(0, calcUtils_1.convertPercentInValue)(min, max, e.from).toFixed(3);
            if (e.to)
                e.to = +(0, calcUtils_1.convertPercentInValue)(min, max, e.to).toFixed(3);
        }
        this.model.setState(e);
    }
    modelEventHandler(e) {
        this.dispatchEvent('onChange', e);
        this.view.setState(e);
    }
}
exports["default"] = Presenter;


/***/ }),

/***/ "./AppComponents/View/SubViewComponents/Handle/Handle.ts":
/*!***************************************************************!*\
  !*** ./AppComponents/View/SubViewComponents/Handle/Handle.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* eslint-disable max-len */
/* eslint-disable no-mixed-operators */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const calcUtils_1 = __webpack_require__(/*! ../../../../utils/calcUtils */ "./utils/calcUtils.ts");
const abstractSubView_1 = __importDefault(__webpack_require__(/*! ../../abstractSubView/abstractSubView */ "./AppComponents/View/abstractSubView/abstractSubView.ts"));
class Handle extends abstractSubView_1.default {
    constructor(slider) {
        super(slider);
        this.init();
    }
    setState(state) {
        const { min, max, from, horizontal, } = state;
        this.state = Object.assign(Object.assign({}, this.state), { min, max, from, horizontal });
        this.update();
    }
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
    init() {
        this.createSubView();
        this.registerEvent('SubViewEvent');
        this.bindEventListener();
    }
    createSubView() {
        this.subView = document.createElement('div');
        this.subView.classList.add('jq-slider__handle');
        this.slider.appendChild(this.subView);
    }
    bindEventListener() {
        this.pointerStart = this.pointerStart.bind(this);
        this.subView.addEventListener('pointerdown', this.pointerStart);
    }
    pointerStart() {
        this.pointerHandler = this.pointerHandler.bind(this);
        window.addEventListener('pointermove', this.pointerHandler);
        window.addEventListener('pointerup', () => {
            window.removeEventListener('pointermove', this.pointerHandler);
            window.removeEventListener('pointermove', this.pointerHandler);
        });
    }
    pointerHandler(e) {
        this.dispatchEvent('SubViewEvent', {
            target: 'handle',
            position: this.state.horizontal
                ? e.clientY - this.slider.getBoundingClientRect().top
                : e.clientX - this.slider.getBoundingClientRect().left,
        });
    }
    update() {
        const { min, max, from, horizontal, } = this.state;
        const isNumbers = typeof min === 'number' && typeof max === 'number' && typeof from === 'number';
        if (isNumbers) {
            if (horizontal) {
                this.subView.style.top = `${(0, calcUtils_1.convertValueInPercent)(min, max, from)}%`;
                return;
            }
            this.subView.style.left = `${(0, calcUtils_1.convertValueInPercent)(min, max, from)}%`;
        }
    }
}
exports["default"] = Handle;


/***/ }),

/***/ "./AppComponents/View/SubViewComponents/Handle/SecondHandle.ts":
/*!*********************************************************************!*\
  !*** ./AppComponents/View/SubViewComponents/Handle/SecondHandle.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const calcUtils_1 = __webpack_require__(/*! ../../../../utils/calcUtils */ "./utils/calcUtils.ts");
const Handle_1 = __importDefault(__webpack_require__(/*! ./Handle */ "./AppComponents/View/SubViewComponents/Handle/Handle.ts"));
class SecondHandle extends Handle_1.default {
    setState(state) {
        const { min, max, to, horizontal, } = state;
        this.state = Object.assign(Object.assign({}, this.state), { min, max, to, horizontal });
        this.update();
    }
    pointerHandler(e) {
        this.dispatchEvent('SubViewEvent', {
            target: 'secondHandle',
            position: this.state.horizontal
                ? e.clientY - this.slider.getBoundingClientRect().top
                : e.clientX - this.slider.getBoundingClientRect().left,
        });
    }
    update() {
        const { min, max, to, horizontal, } = this.state;
        const isNumbers = typeof min === 'number' && typeof max === 'number' && typeof to === 'number';
        if (isNumbers) {
            if (horizontal) {
                this.subView.style.top = `${(0, calcUtils_1.convertValueInPercent)(min, max, to)}%`;
                return;
            }
            this.subView.style.left = `${(0, calcUtils_1.convertValueInPercent)(min, max, to)}%`;
        }
    }
}
exports["default"] = SecondHandle;


/***/ }),

/***/ "./AppComponents/View/SubViewComponents/Scale/Scale.ts":
/*!*************************************************************!*\
  !*** ./AppComponents/View/SubViewComponents/Scale/Scale.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const calcUtils_1 = __webpack_require__(/*! ../../../../utils/calcUtils */ "./utils/calcUtils.ts");
const abstractSubView_1 = __importDefault(__webpack_require__(/*! ../../abstractSubView/abstractSubView */ "./AppComponents/View/abstractSubView/abstractSubView.ts"));
class Scale extends abstractSubView_1.default {
    constructor(slider) {
        super(slider);
        this.init();
    }
    setState(state) {
        const { min, max, step, horizontal, scaleDestiny, } = state;
        const oldState = JSON.stringify(this.state);
        this.state = Object.assign(Object.assign({}, this.state), { min, max, step, horizontal, scaleDestiny });
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
        const { min, max, step, horizontal, scaleDestiny, } = this.state;
        const isCorrectParams = typeof min === 'number' && typeof max === 'number' && typeof scaleDestiny === 'number'
            && typeof step === 'number' && typeof horizontal === 'boolean';
        if (isCorrectParams) {
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
        if (e.target instanceof HTMLElement) {
            const { min, max } = this.state;
            if (typeof min === 'number' && typeof max === 'number') {
                let position = this.state.horizontal
                    ? this.slider.clientHeight / 100 * (0, calcUtils_1.convertValueInPercent)(min, max, +e.target.innerHTML)
                    : this.slider.clientWidth / 100 * (0, calcUtils_1.convertValueInPercent)(min, max, +e.target.innerHTML);
                if (position === 0)
                    position = min;
                this.dispatchEvent('SubViewEvent', { target: 'track', position });
            }
        }
    }
}
exports["default"] = Scale;


/***/ }),

/***/ "./AppComponents/View/SubViewComponents/Tip/SecondTip.ts":
/*!***************************************************************!*\
  !*** ./AppComponents/View/SubViewComponents/Tip/SecondTip.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const calcUtils_1 = __webpack_require__(/*! ../../../../utils/calcUtils */ "./utils/calcUtils.ts");
const Tip_1 = __importDefault(__webpack_require__(/*! ./Tip */ "./AppComponents/View/SubViewComponents/Tip/Tip.ts"));
class SecondTip extends Tip_1.default {
    setState(state) {
        const { min = this.state.min, max = this.state.max, to = this.state.to, horizontal = this.state.horizontal, } = state;
        this.state = {
            min, max, to, horizontal,
        };
        this.update();
    }
    update() {
        const { min, max, to, horizontal, } = this.state;
        const isNumbers = typeof min === 'number' && typeof max === 'number' && typeof to === 'number';
        if (isNumbers) {
            // eslint-disable-next-line no-unused-expressions
            this.isDouble ? this.subView.style.opacity = '0' : this.subView.style.opacity = '1';
            this.subView.textContent = to.toString();
            if (horizontal) {
                this.subView.style.top = `${(0, calcUtils_1.convertValueInPercent)(min, max, to)}%`;
                return;
            }
            this.subView.style.left = `${(0, calcUtils_1.convertValueInPercent)(min, max, to)}%`;
        }
    }
}
exports["default"] = SecondTip;


/***/ }),

/***/ "./AppComponents/View/SubViewComponents/Tip/Tip.ts":
/*!*********************************************************!*\
  !*** ./AppComponents/View/SubViewComponents/Tip/Tip.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const calcUtils_1 = __webpack_require__(/*! ../../../../utils/calcUtils */ "./utils/calcUtils.ts");
const abstractSubView_1 = __importDefault(__webpack_require__(/*! ../../abstractSubView/abstractSubView */ "./AppComponents/View/abstractSubView/abstractSubView.ts"));
class Tip extends abstractSubView_1.default {
    constructor(slider) {
        super(slider);
        this.isDouble = false;
        this.init();
    }
    setState(state) {
        const { min, max, from, to, horizontal, } = state;
        this.state = {
            min, max, from, to, horizontal,
        };
        this.update();
    }
    changeIsDouble(val) {
        this.isDouble = val;
    }
    init() {
        this.createSubView();
    }
    createSubView() {
        this.subView = document.createElement('div');
        this.subView.classList.add('jq-slider__tip');
        this.slider.appendChild(this.subView);
    }
    update() {
        const { min, max, from, horizontal, to, } = this.state;
        const isNumbers = typeof min === 'number' && typeof max === 'number'
            && typeof from === 'number' && typeof from === 'number';
        if (isNumbers) {
            this.subView.textContent = this.isDouble ? `${from} - ${to}` : from.toString();
            if (horizontal) {
                this.subView.style.top = `${(0, calcUtils_1.convertValueInPercent)(min, max, from)}%`;
                return;
            }
            this.subView.style.left = `${(0, calcUtils_1.convertValueInPercent)(min, max, from)}%`;
        }
    }
}
exports["default"] = Tip;


/***/ }),

/***/ "./AppComponents/View/SubViewComponents/Track/Track.ts":
/*!*************************************************************!*\
  !*** ./AppComponents/View/SubViewComponents/Track/Track.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const calcUtils_1 = __webpack_require__(/*! ../../../../utils/calcUtils */ "./utils/calcUtils.ts");
const abstractSubView_1 = __importDefault(__webpack_require__(/*! ../../abstractSubView/abstractSubView */ "./AppComponents/View/abstractSubView/abstractSubView.ts"));
class Track extends abstractSubView_1.default {
    constructor(slider) {
        super(slider);
        this.init();
    }
    setState(state) {
        const { min, max, from, to, horizontal, range, progress, } = state;
        this.state = Object.assign(Object.assign({}, this.state), { min, max, from, to, horizontal, range, progress });
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
        const { min, max, from, to, horizontal, range, progress, } = this.state;
        if (!progress) {
            this.progress.remove();
            return;
        }
        const isNumbers = typeof min === 'number' && typeof max === 'number'
            && typeof from === 'number' && typeof to === 'number';
        if (isNumbers) {
            const start = (0, calcUtils_1.convertValueInPercent)(min, max, from);
            const end = (0, calcUtils_1.convertValueInPercent)(min, max, to);
            if (horizontal) {
                if (range) {
                    const height = end - start;
                    this.progress.style.height = `${height}%`;
                    // eslint-disable-next-line no-mixed-operators
                    this.progress.style.marginTop = `${this.slider.clientHeight / 100 * start}px`;
                }
                else {
                    this.progress.style.height = `${start}%`;
                }
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
}
exports["default"] = Track;


/***/ }),

/***/ "./AppComponents/View/View.ts":
/*!************************************!*\
  !*** ./AppComponents/View/View.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
/* eslint-disable no-mixed-operators */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const Handle_1 = __importDefault(__webpack_require__(/*! ./SubViewComponents/Handle/Handle */ "./AppComponents/View/SubViewComponents/Handle/Handle.ts"));
const EventCreator_1 = __importDefault(__webpack_require__(/*! ../EventCreator/EventCreator */ "./AppComponents/EventCreator/EventCreator.ts"));
const SecondHandle_1 = __importDefault(__webpack_require__(/*! ./SubViewComponents/Handle/SecondHandle */ "./AppComponents/View/SubViewComponents/Handle/SecondHandle.ts"));
const Tip_1 = __importDefault(__webpack_require__(/*! ./SubViewComponents/Tip/Tip */ "./AppComponents/View/SubViewComponents/Tip/Tip.ts"));
const SecondTip_1 = __importDefault(__webpack_require__(/*! ./SubViewComponents/Tip/SecondTip */ "./AppComponents/View/SubViewComponents/Tip/SecondTip.ts"));
const Track_1 = __importDefault(__webpack_require__(/*! ./SubViewComponents/Track/Track */ "./AppComponents/View/SubViewComponents/Track/Track.ts"));
const calcUtils_1 = __webpack_require__(/*! ../../utils/calcUtils */ "./utils/calcUtils.ts");
const Scale_1 = __importDefault(__webpack_require__(/*! ./SubViewComponents/Scale/Scale */ "./AppComponents/View/SubViewComponents/Scale/Scale.ts"));
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
        const { range, tip, scale, horizontal, } = state;
        this.components.push(new Handle_1.default(this.slider));
        this.components.push(new Track_1.default(this.slider));
        if (tip) {
            this.components.push(new Tip_1.default(this.slider));
        }
        if (range) {
            this.components.push(new SecondHandle_1.default(this.slider));
            if (tip) {
                this.components.push(new SecondTip_1.default(this.slider));
            }
        }
        if (scale) {
            this.components.push(new Scale_1.default(this.slider));
        }
        if (horizontal) {
            this.slider.classList.add('jq-slider--horizontal');
        }
        else {
            this.slider.classList.remove('jq-slider--horizontal');
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
        const size = this.state.horizontal ? this.slider.clientHeight : this.slider.clientWidth;
        if (e.target === 'handle') {
            const from = (0, calcUtils_1.convertPixelInPercent)(size, e.position);
            this.dispatchEvent('ViewEvent', { from });
        }
        if (e.target === 'secondHandle') {
            const to = (0, calcUtils_1.convertPixelInPercent)(size, e.position);
            this.dispatchEvent('ViewEvent', { to });
        }
        if (e.target === 'track' || e.target === 'scale') {
            const handles = this.getArrOfConcreteSubView(Handle_1.default);
            const from = handles[0].getPosition();
            if (this.state.range) {
                const to = handles[1].getPosition();
                if (Math.abs(from - e.position) < to - e.position) {
                    this.dispatchEvent('ViewEvent', { from: (0, calcUtils_1.convertPixelInPercent)(size, e.position) });
                    return;
                }
                this.dispatchEvent('ViewEvent', { to: (0, calcUtils_1.convertPixelInPercent)(size, e.position) });
                return;
            }
            this.dispatchEvent('ViewEvent', { from: (0, calcUtils_1.convertPixelInPercent)(size, e.position) });
        }
    }
    checkIsChangedSettings(state) {
        const { range, tip, scale, horizontal, progress, scaleDestiny, } = state;
        const isUpdateSettings = range !== this.state.range || tip !== this.state.tip
            || scale !== this.state.scale || horizontal !== this.state.horizontal
            || progress !== this.state.progress || scaleDestiny !== this.state.scaleDestiny;
        if (isUpdateSettings) {
            this.components = [];
            this.slider.innerHTML = '';
            this.createComponents(state);
            this.bindEventListener();
        }
    }
    checkTips() {
        const { tip, range, horizontal } = this.state;
        if (tip && range) {
            const tips = this.getArrOfConcreteSubView(Tip_1.default);
            const size = horizontal ? tips[1].subView.clientHeight : tips[1].subView.offsetWidth;
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

/***/ "./AppComponents/View/abstractSubView/abstractSubView.ts":
/*!***************************************************************!*\
  !*** ./AppComponents/View/abstractSubView/abstractSubView.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const EventCreator_1 = __importDefault(__webpack_require__(/*! ../../EventCreator/EventCreator */ "./AppComponents/EventCreator/EventCreator.ts"));
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

/***/ "./app.ts":
/*!****************!*\
  !*** ./app.ts ***!
  \****************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
__webpack_require__(/*! ./slider.scss */ "./slider.scss");
const Presenter_1 = __importDefault(__webpack_require__(/*! ./AppComponents/Presenter/Presenter */ "./AppComponents/Presenter/Presenter.ts"));
(function ($) {
    const methods = {
        init(state) {
            if (typeof state === 'object') {
                return this.each(function () {
                    if (!$(this).data('jqSlider')) {
                        $(this).data().jqSlider = new Presenter_1.default(this, state);
                    }
                });
            }
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
        const isUpdate = args.length >= 2 && args[0] === 'update' && typeof args[1] === 'object';
        const isGetState = args.length === 1 && args[0] === 'getState';
        const isBindEventListener = args.length >= 2 && args[0] === 'onChange' && typeof args[1] === 'function';
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
    };
}(jQuery));


/***/ }),

/***/ "./utils/calcUtils.ts":
/*!****************************!*\
  !*** ./utils/calcUtils.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertPercentInValue = exports.convertPixelInPercent = exports.convertValueInPercent = void 0;
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-mixed-operators */
function convertValueInPercent(min, max, value) {
    return 100 / (max - min) * (value - min);
}
exports.convertValueInPercent = convertValueInPercent;
function convertPixelInPercent(width, value) {
    return 100 / width * value;
}
exports.convertPixelInPercent = convertPixelInPercent;
function convertPercentInValue(min, max, percent) {
    return (max - min) / 100 * percent + min;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianFTbGlkZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7QUNBYTtBQUNiO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7O0FDOUJGO0FBQ2I7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsdUNBQXVDLG1CQUFPLENBQUMsa0ZBQThCO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDZDQUE2QztBQUMzRDtBQUNBO0FBQ0EsNkNBQTZDLFdBQVcsVUFBVTtBQUNsRTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7Ozs7OztBQ3JIRjtBQUNiO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELG9CQUFvQixtQkFBTyxDQUFDLG1EQUF1QjtBQUNuRCx1Q0FBdUMsbUJBQU8sQ0FBQyxrRkFBOEI7QUFDN0UsZ0NBQWdDLG1CQUFPLENBQUMsc0RBQWdCO0FBQ3hELCtCQUErQixtQkFBTyxDQUFDLGtEQUFjO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFdBQVc7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7QUMxQ0Y7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELG9CQUFvQixtQkFBTyxDQUFDLHlEQUE2QjtBQUN6RCwwQ0FBMEMsbUJBQU8sQ0FBQyxzR0FBdUM7QUFDekY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDhCQUE4QjtBQUM5QyxtREFBbUQsaUJBQWlCLDRCQUE0QjtBQUNoRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxnQkFBZ0IsOEJBQThCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBLDRDQUE0Qyx1REFBdUQ7QUFDbkc7QUFDQTtBQUNBLHlDQUF5Qyx1REFBdUQ7QUFDaEc7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7O0FDekVGO0FBQ2I7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsb0JBQW9CLG1CQUFPLENBQUMseURBQTZCO0FBQ3pELGlDQUFpQyxtQkFBTyxDQUFDLHlFQUFVO0FBQ25EO0FBQ0E7QUFDQSxnQkFBZ0IsNEJBQTRCO0FBQzVDLG1EQUFtRCxpQkFBaUIsMEJBQTBCO0FBQzlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGdCQUFnQiw0QkFBNEI7QUFDNUM7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLHFEQUFxRDtBQUNqRztBQUNBO0FBQ0EseUNBQXlDLHFEQUFxRDtBQUM5RjtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7QUNqQ0Y7QUFDYjtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxvQkFBb0IsbUJBQU8sQ0FBQyx5REFBNkI7QUFDekQsMENBQTBDLG1CQUFPLENBQUMsc0dBQXVDO0FBQ3pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiw0Q0FBNEM7QUFDNUQ7QUFDQSxtREFBbUQsaUJBQWlCLDBDQUEwQztBQUM5RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDRDQUE0QztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxXQUFXO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCw2SEFBNkg7QUFDbEwsOENBQThDLE1BQU07QUFDcEQ7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELHdEQUF3RDtBQUM5Ryw4Q0FBOEMsTUFBTTtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixXQUFXO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCwyQkFBMkI7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7QUMvRUY7QUFDYjtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxvQkFBb0IsbUJBQU8sQ0FBQyx5REFBNkI7QUFDekQsOEJBQThCLG1CQUFPLENBQUMsZ0VBQU87QUFDN0M7QUFDQTtBQUNBLGdCQUFnQixzR0FBc0c7QUFDdEg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDRCQUE0QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMscURBQXFEO0FBQ2pHO0FBQ0E7QUFDQSx5Q0FBeUMscURBQXFEO0FBQzlGO0FBQ0E7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7Ozs7OztBQzlCRjtBQUNiO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELG9CQUFvQixtQkFBTyxDQUFDLHlEQUE2QjtBQUN6RCwwQ0FBMEMsbUJBQU8sQ0FBQyxzR0FBdUM7QUFDekY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isa0NBQWtDO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isa0NBQWtDO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCxNQUFNLElBQUksR0FBRztBQUN2RTtBQUNBLDRDQUE0Qyx1REFBdUQ7QUFDbkc7QUFDQTtBQUNBLHlDQUF5Qyx1REFBdUQ7QUFDaEc7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7O0FDN0NGO0FBQ2I7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsb0JBQW9CLG1CQUFPLENBQUMseURBQTZCO0FBQ3pELDBDQUEwQyxtQkFBTyxDQUFDLHNHQUF1QztBQUN6RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsbURBQW1EO0FBQ25FLG1EQUFtRCxpQkFBaUIsaURBQWlEO0FBQ3JIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxnQkFBZ0IsbURBQW1EO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxPQUFPO0FBQzNEO0FBQ0EsdURBQXVELHVDQUF1QztBQUM5RjtBQUNBO0FBQ0Esb0RBQW9ELE1BQU07QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxNQUFNO0FBQ3JELG9EQUFvRCxNQUFNO0FBQzFEO0FBQ0E7QUFDQSwrQ0FBK0MsTUFBTTtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7Ozs7OztBQzVFRjtBQUNiO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxtQkFBTyxDQUFDLGtHQUFtQztBQUM1RSx1Q0FBdUMsbUJBQU8sQ0FBQyxrRkFBOEI7QUFDN0UsdUNBQXVDLG1CQUFPLENBQUMsOEdBQXlDO0FBQ3hGLDhCQUE4QixtQkFBTyxDQUFDLHNGQUE2QjtBQUNuRSxvQ0FBb0MsbUJBQU8sQ0FBQyxrR0FBbUM7QUFDL0UsZ0NBQWdDLG1CQUFPLENBQUMsOEZBQWlDO0FBQ3pFLG9CQUFvQixtQkFBTyxDQUFDLG1EQUF1QjtBQUNuRCxnQ0FBZ0MsbUJBQU8sQ0FBQyw4RkFBaUM7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsaUNBQWlDO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLE1BQU07QUFDcEQ7QUFDQTtBQUNBO0FBQ0EsOENBQThDLElBQUk7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsZ0VBQWdFO0FBQ3RIO0FBQ0E7QUFDQSxrREFBa0QsOERBQThEO0FBQ2hIO0FBQ0E7QUFDQSw4Q0FBOEMsZ0VBQWdFO0FBQzlHO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix5REFBeUQ7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix5QkFBeUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELFFBQVEseUZBQXlGO0FBQ3hKO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7QUN0SUY7QUFDYjtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx1Q0FBdUMsbUJBQU8sQ0FBQyxxRkFBaUM7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7QUNuQkY7QUFDYjtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFPLENBQUMsb0NBQWU7QUFDdkIsb0NBQW9DLG1CQUFPLENBQUMsbUZBQXFDO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7O0FDaEVZO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELDZCQUE2QixHQUFHLDZCQUE2QixHQUFHLDZCQUE2QjtBQUM3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7Ozs7Ozs7VUNoQjdCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NsaWRlci5zY3NzPzBiYTkiLCJ3ZWJwYWNrOi8vLy4vQXBwQ29tcG9uZW50cy9FdmVudENyZWF0b3IvRXZlbnRDcmVhdG9yLnRzIiwid2VicGFjazovLy8uL0FwcENvbXBvbmVudHMvTW9kZWwvTW9kZWwudHMiLCJ3ZWJwYWNrOi8vLy4vQXBwQ29tcG9uZW50cy9QcmVzZW50ZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL0FwcENvbXBvbmVudHMvVmlldy9TdWJWaWV3Q29tcG9uZW50cy9IYW5kbGUvSGFuZGxlLnRzIiwid2VicGFjazovLy8uL0FwcENvbXBvbmVudHMvVmlldy9TdWJWaWV3Q29tcG9uZW50cy9IYW5kbGUvU2Vjb25kSGFuZGxlLnRzIiwid2VicGFjazovLy8uL0FwcENvbXBvbmVudHMvVmlldy9TdWJWaWV3Q29tcG9uZW50cy9TY2FsZS9TY2FsZS50cyIsIndlYnBhY2s6Ly8vLi9BcHBDb21wb25lbnRzL1ZpZXcvU3ViVmlld0NvbXBvbmVudHMvVGlwL1NlY29uZFRpcC50cyIsIndlYnBhY2s6Ly8vLi9BcHBDb21wb25lbnRzL1ZpZXcvU3ViVmlld0NvbXBvbmVudHMvVGlwL1RpcC50cyIsIndlYnBhY2s6Ly8vLi9BcHBDb21wb25lbnRzL1ZpZXcvU3ViVmlld0NvbXBvbmVudHMvVHJhY2svVHJhY2sudHMiLCJ3ZWJwYWNrOi8vLy4vQXBwQ29tcG9uZW50cy9WaWV3L1ZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vQXBwQ29tcG9uZW50cy9WaWV3L2Fic3RyYWN0U3ViVmlldy9hYnN0cmFjdFN1YlZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwLnRzIiwid2VicGFjazovLy8uL3V0aWxzL2NhbGNVdGlscy50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIlwidXNlIHN0cmljdFwiO1xuLyogZXNsaW50LWRpc2FibGUgbWF4LWNsYXNzZXMtcGVyLWZpbGUgKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtY2xhc3Nlcy1wZXItZmlsZVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgTXlFdmVudCB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmNhbGxiYWNrcyA9IFtdO1xuICAgIH1cbiAgICByZWdpc3RlckNhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgIH1cbn1cbmNsYXNzIEV2ZW50Q3JlYXRvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzID0ge307XG4gICAgfVxuICAgIHJlZ2lzdGVyRXZlbnQoZXZlbnROYW1lKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IE15RXZlbnQoZXZlbnROYW1lKTtcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IGV2ZW50O1xuICAgIH1cbiAgICBkaXNwYXRjaEV2ZW50KGV2ZW50TmFtZSwgZXZlbnRBcmdzKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uY2FsbGJhY2tzLmZvckVhY2goKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayhldmVudEFyZ3MpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0ucmVnaXN0ZXJDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gRXZlbnRDcmVhdG9yO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBFdmVudENyZWF0b3JfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vRXZlbnRDcmVhdG9yL0V2ZW50Q3JlYXRvclwiKSk7XG5jbGFzcyBNb2RlbCBleHRlbmRzIEV2ZW50Q3JlYXRvcl8xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBtYXg6IDEwMCxcbiAgICAgICAgICAgIGZyb206IDAsXG4gICAgICAgICAgICB0bzogMTAwLFxuICAgICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgICAgIHRpcDogdHJ1ZSxcbiAgICAgICAgICAgIHJhbmdlOiB0cnVlLFxuICAgICAgICAgICAgcHJvZ3Jlc3M6IHRydWUsXG4gICAgICAgICAgICBzY2FsZTogdHJ1ZSxcbiAgICAgICAgICAgIHNjYWxlRGVzdGlueTogMTAsXG4gICAgICAgICAgICBob3Jpem9udGFsOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pbml0KHN0YXRlKTtcbiAgICB9XG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgY29uc3QgW3ZhbHVlcywgc2V0dGluZ3NdID0gdGhpcy5zcGxpdFBhcmFtcyhzdGF0ZSk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUpLCB0aGlzLm1pbk1heFZhbGlkYXRvcihzZXR0aW5ncykpO1xuICAgICAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlKSwgdGhpcy5yYW5nZUZyb21Ub1ZhbGlkYXRvcih0aGlzLnN0ZXBWYWxpZGF0b3IodmFsdWVzKSkpO1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ01vZGVsRXZlbnQnLCB0aGlzLnN0YXRlKTtcbiAgICB9XG4gICAgZ2V0U3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICAgIH1cbiAgICBpbml0KHN0YXRlKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnTW9kZWxFdmVudCcpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHN0YXRlKTtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgICBzcGxpdFBhcmFtcyhkYXRhKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IHt9O1xuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IHt9O1xuICAgICAgICBpZiAoJ2Zyb20nIGluIGRhdGEpIHtcbiAgICAgICAgICAgIHZhbHVlcy5mcm9tID0gZGF0YS5mcm9tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFsdWVzLmZyb20gPSB0aGlzLnN0YXRlLmZyb207XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCd0bycgaW4gZGF0YSkge1xuICAgICAgICAgICAgdmFsdWVzLnRvID0gZGF0YS50bztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlcy50byA9IHRoaXMuc3RhdGUudG87XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhLnN0ZXAgJiYgZGF0YS5zdGVwID4gMClcbiAgICAgICAgICAgIHNldHRpbmdzLnN0ZXAgPSBkYXRhLnN0ZXA7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5taW4gPT09ICdudW1iZXInKVxuICAgICAgICAgICAgc2V0dGluZ3MubWluID0gZGF0YS5taW47XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5tYXggPT09ICdudW1iZXInKVxuICAgICAgICAgICAgc2V0dGluZ3MubWF4ID0gZGF0YS5tYXg7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5zY2FsZURlc3RpbnkgPT09ICdudW1iZXInKVxuICAgICAgICAgICAgc2V0dGluZ3Muc2NhbGVEZXN0aW55ID0gZGF0YS5zY2FsZURlc3Rpbnk7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5zY2FsZSA9PT0gJ2Jvb2xlYW4nKVxuICAgICAgICAgICAgc2V0dGluZ3Muc2NhbGUgPSBkYXRhLnNjYWxlO1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEucmFuZ2UgPT09ICdib29sZWFuJylcbiAgICAgICAgICAgIHNldHRpbmdzLnJhbmdlID0gZGF0YS5yYW5nZTtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhLnRpcCA9PT0gJ2Jvb2xlYW4nKVxuICAgICAgICAgICAgc2V0dGluZ3MudGlwID0gZGF0YS50aXA7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5wcm9ncmVzcyA9PT0gJ2Jvb2xlYW4nKVxuICAgICAgICAgICAgc2V0dGluZ3MuaG9yaXpvbnRhbCA9IGRhdGEuaG9yaXpvbnRhbDtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhLnByb2dyZXNzID09PSAnYm9vbGVhbicpXG4gICAgICAgICAgICBzZXR0aW5ncy5wcm9ncmVzcyA9IGRhdGEucHJvZ3Jlc3M7XG4gICAgICAgIHJldHVybiBbdmFsdWVzLCBzZXR0aW5nc107XG4gICAgfVxuICAgIG1pbk1heFZhbGlkYXRvcihkYXRhKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItY29uc3RcbiAgICAgICAgbGV0IHsgbWluID0gdGhpcy5zdGF0ZS5taW4sIG1heCA9IHRoaXMuc3RhdGUubWF4IH0gPSBkYXRhO1xuICAgICAgICBpZiAobWluID4gbWF4KVxuICAgICAgICAgICAgbWluID0gbWF4O1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBkYXRhKSwgeyBtaW4sIG1heCB9KTtcbiAgICB9XG4gICAgc3RlcFZhbGlkYXRvcihkYXRhKSB7XG4gICAgICAgIGNvbnN0IGNvcHlPZkRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhKTtcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tTdGVwKHZhbHVlLCBzdGVwKSB7XG4gICAgICAgICAgICByZXR1cm4gKyhNYXRoLnJvdW5kKHZhbHVlIC8gc3RlcCkgKiBzdGVwKS50b0ZpeGVkKDIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgY29weU9mRGF0YS5mcm9tID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgY29weU9mRGF0YS5mcm9tID0gY2hlY2tTdGVwKGNvcHlPZkRhdGEuZnJvbSwgdGhpcy5zdGF0ZS5zdGVwKTtcbiAgICAgICAgICAgIGlmIChjb3B5T2ZEYXRhLmZyb20gPD0gdGhpcy5zdGF0ZS5taW4pXG4gICAgICAgICAgICAgICAgY29weU9mRGF0YS5mcm9tID0gdGhpcy5zdGF0ZS5taW47XG4gICAgICAgICAgICBlbHNlIGlmIChjb3B5T2ZEYXRhLmZyb20gPj0gdGhpcy5zdGF0ZS5tYXgpXG4gICAgICAgICAgICAgICAgY29weU9mRGF0YS5mcm9tID0gdGhpcy5zdGF0ZS5tYXg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBjb3B5T2ZEYXRhLnRvID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgY29weU9mRGF0YS50byA9IGNoZWNrU3RlcChjb3B5T2ZEYXRhLnRvLCB0aGlzLnN0YXRlLnN0ZXApO1xuICAgICAgICAgICAgaWYgKGNvcHlPZkRhdGEudG8gPD0gdGhpcy5zdGF0ZS5taW4pXG4gICAgICAgICAgICAgICAgY29weU9mRGF0YS50byA9IHRoaXMuc3RhdGUubWluO1xuICAgICAgICAgICAgZWxzZSBpZiAoY29weU9mRGF0YS50byA+PSB0aGlzLnN0YXRlLm1heClcbiAgICAgICAgICAgICAgICBjb3B5T2ZEYXRhLnRvID0gdGhpcy5zdGF0ZS5tYXg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvcHlPZkRhdGE7XG4gICAgfVxuICAgIHJhbmdlRnJvbVRvVmFsaWRhdG9yKGRhdGEpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnJhbmdlKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb3B5T2ZTRGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGEpO1xuICAgICAgICBjb25zdCBpc0Zyb21Ob3RWYWxpZGx5ID0gY29weU9mU0RhdGEuZnJvbSAmJiB0aGlzLnN0YXRlLnRvIC0gY29weU9mU0RhdGEuZnJvbSA8PSAwO1xuICAgICAgICBjb25zdCBpc1RvTm90VmFsaWRseSA9IGNvcHlPZlNEYXRhLnRvICYmIGNvcHlPZlNEYXRhLnRvIC0gdGhpcy5zdGF0ZS5mcm9tIDw9IDA7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZyb20gPiB0aGlzLnN0YXRlLnRvKVxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5mcm9tID0gdGhpcy5zdGF0ZS50bztcbiAgICAgICAgaWYgKGlzRnJvbU5vdFZhbGlkbHkpXG4gICAgICAgICAgICBjb3B5T2ZTRGF0YS5mcm9tID0gdGhpcy5zdGF0ZS50bztcbiAgICAgICAgaWYgKGlzVG9Ob3RWYWxpZGx5KVxuICAgICAgICAgICAgY29weU9mU0RhdGEudG8gPSB0aGlzLnN0YXRlLmZyb207XG4gICAgICAgIHJldHVybiBjb3B5T2ZTRGF0YTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBNb2RlbDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY2FsY1V0aWxzXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvY2FsY1V0aWxzXCIpO1xuY29uc3QgRXZlbnRDcmVhdG9yXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL0V2ZW50Q3JlYXRvci9FdmVudENyZWF0b3JcIikpO1xuY29uc3QgTW9kZWxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vTW9kZWwvTW9kZWxcIikpO1xuY29uc3QgVmlld18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9WaWV3L1ZpZXdcIikpO1xuY2xhc3MgUHJlc2VudGVyIGV4dGVuZHMgRXZlbnRDcmVhdG9yXzEuZGVmYXVsdCB7XG4gICAgY29uc3RydWN0b3Iobm9kZUVsZW0sIHN0YXRlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3XzEuZGVmYXVsdChub2RlRWxlbSk7XG4gICAgICAgIHRoaXMubW9kZWwgPSBuZXcgTW9kZWxfMS5kZWZhdWx0KHN0YXRlKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCdvbkNoYW5nZScpO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy52aWV3LnNldFN0YXRlKHRoaXMubW9kZWwuZ2V0U3RhdGUoKSk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuICAgIGJpbmRFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy52aWV3RXZlbnRIYW5kbGVyID0gdGhpcy52aWV3RXZlbnRIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMubW9kZWxFdmVudEhhbmRsZXIgPSB0aGlzLm1vZGVsRXZlbnRIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMudmlldy5hZGRFdmVudExpc3RlbmVyKCdWaWV3RXZlbnQnLCB0aGlzLnZpZXdFdmVudEhhbmRsZXIpO1xuICAgICAgICB0aGlzLm1vZGVsLmFkZEV2ZW50TGlzdGVuZXIoJ01vZGVsRXZlbnQnLCB0aGlzLm1vZGVsRXZlbnRIYW5kbGVyKTtcbiAgICB9XG4gICAgdmlld0V2ZW50SGFuZGxlcihlKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXggfSA9IHRoaXMubW9kZWwuZ2V0U3RhdGUoKTtcbiAgICAgICAgaWYgKHR5cGVvZiBtaW4gPT09ICdudW1iZXInICYmIHR5cGVvZiBtYXggPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBpZiAoZS5mcm9tKVxuICAgICAgICAgICAgICAgIGUuZnJvbSA9ICsoMCwgY2FsY1V0aWxzXzEuY29udmVydFBlcmNlbnRJblZhbHVlKShtaW4sIG1heCwgZS5mcm9tKS50b0ZpeGVkKDMpO1xuICAgICAgICAgICAgaWYgKGUudG8pXG4gICAgICAgICAgICAgICAgZS50byA9ICsoMCwgY2FsY1V0aWxzXzEuY29udmVydFBlcmNlbnRJblZhbHVlKShtaW4sIG1heCwgZS50bykudG9GaXhlZCgzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vZGVsLnNldFN0YXRlKGUpO1xuICAgIH1cbiAgICBtb2RlbEV2ZW50SGFuZGxlcihlKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnb25DaGFuZ2UnLCBlKTtcbiAgICAgICAgdGhpcy52aWV3LnNldFN0YXRlKGUpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFByZXNlbnRlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tbWl4ZWQtb3BlcmF0b3JzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvZXh0ZW5zaW9ucyAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNhbGNVdGlsc18xID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL3V0aWxzL2NhbGNVdGlsc1wiKTtcbmNvbnN0IGFic3RyYWN0U3ViVmlld18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi8uLi9hYnN0cmFjdFN1YlZpZXcvYWJzdHJhY3RTdWJWaWV3XCIpKTtcbmNsYXNzIEhhbmRsZSBleHRlbmRzIGFic3RyYWN0U3ViVmlld18xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKHNsaWRlcikge1xuICAgICAgICBzdXBlcihzbGlkZXIpO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCwgZnJvbSwgaG9yaXpvbnRhbCwgfSA9IHN0YXRlO1xuICAgICAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlKSwgeyBtaW4sIG1heCwgZnJvbSwgaG9yaXpvbnRhbCB9KTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgZ2V0UG9zaXRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmhvcml6b250YWwpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1YlZpZXdUb3AgPSB0aGlzLnN1YlZpZXcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgICAgICAgY29uc3Qgc2xpZGVyVG9wID0gdGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgICAgICAgcmV0dXJuIHN1YlZpZXdUb3AgLSBzbGlkZXJUb3AgKyB0aGlzLnN1YlZpZXcub2Zmc2V0SGVpZ2h0IC8gMjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdWJWaWV3TGVmdCA9IHRoaXMuc3ViVmlldy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgICAgICBjb25zdCBzbGlkZXJMZWZ0ID0gdGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICAgICAgcmV0dXJuIHN1YlZpZXdMZWZ0IC0gc2xpZGVyTGVmdCArIHRoaXMuc3ViVmlldy5vZmZzZXRXaWR0aCAvIDI7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlU3ViVmlldygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ1N1YlZpZXdFdmVudCcpO1xuICAgICAgICB0aGlzLmJpbmRFdmVudExpc3RlbmVyKCk7XG4gICAgfVxuICAgIGNyZWF0ZVN1YlZpZXcoKSB7XG4gICAgICAgIHRoaXMuc3ViVmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnN1YlZpZXcuY2xhc3NMaXN0LmFkZCgnanEtc2xpZGVyX19oYW5kbGUnKTtcbiAgICAgICAgdGhpcy5zbGlkZXIuYXBwZW5kQ2hpbGQodGhpcy5zdWJWaWV3KTtcbiAgICB9XG4gICAgYmluZEV2ZW50TGlzdGVuZXIoKSB7XG4gICAgICAgIHRoaXMucG9pbnRlclN0YXJ0ID0gdGhpcy5wb2ludGVyU3RhcnQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zdWJWaWV3LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgdGhpcy5wb2ludGVyU3RhcnQpO1xuICAgIH1cbiAgICBwb2ludGVyU3RhcnQoKSB7XG4gICAgICAgIHRoaXMucG9pbnRlckhhbmRsZXIgPSB0aGlzLnBvaW50ZXJIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIHRoaXMucG9pbnRlckhhbmRsZXIpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgKCkgPT4ge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgdGhpcy5wb2ludGVySGFuZGxlcik7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCB0aGlzLnBvaW50ZXJIYW5kbGVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHBvaW50ZXJIYW5kbGVyKGUpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdTdWJWaWV3RXZlbnQnLCB7XG4gICAgICAgICAgICB0YXJnZXQ6ICdoYW5kbGUnLFxuICAgICAgICAgICAgcG9zaXRpb246IHRoaXMuc3RhdGUuaG9yaXpvbnRhbFxuICAgICAgICAgICAgICAgID8gZS5jbGllbnRZIC0gdGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wXG4gICAgICAgICAgICAgICAgOiBlLmNsaWVudFggLSB0aGlzLnNsaWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4LCBmcm9tLCBob3Jpem9udGFsLCB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgaXNOdW1iZXJzID0gdHlwZW9mIG1pbiA9PT0gJ251bWJlcicgJiYgdHlwZW9mIG1heCA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGZyb20gPT09ICdudW1iZXInO1xuICAgICAgICBpZiAoaXNOdW1iZXJzKSB7XG4gICAgICAgICAgICBpZiAoaG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3ViVmlldy5zdHlsZS50b3AgPSBgJHsoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgZnJvbSl9JWA7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zdWJWaWV3LnN0eWxlLmxlZnQgPSBgJHsoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgZnJvbSl9JWA7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBIYW5kbGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNhbGNVdGlsc18xID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL3V0aWxzL2NhbGNVdGlsc1wiKTtcbmNvbnN0IEhhbmRsZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0hhbmRsZVwiKSk7XG5jbGFzcyBTZWNvbmRIYW5kbGUgZXh0ZW5kcyBIYW5kbGVfMS5kZWZhdWx0IHtcbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4LCB0bywgaG9yaXpvbnRhbCwgfSA9IHN0YXRlO1xuICAgICAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlKSwgeyBtaW4sIG1heCwgdG8sIGhvcml6b250YWwgfSk7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIHBvaW50ZXJIYW5kbGVyKGUpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdTdWJWaWV3RXZlbnQnLCB7XG4gICAgICAgICAgICB0YXJnZXQ6ICdzZWNvbmRIYW5kbGUnLFxuICAgICAgICAgICAgcG9zaXRpb246IHRoaXMuc3RhdGUuaG9yaXpvbnRhbFxuICAgICAgICAgICAgICAgID8gZS5jbGllbnRZIC0gdGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wXG4gICAgICAgICAgICAgICAgOiBlLmNsaWVudFggLSB0aGlzLnNsaWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4LCB0bywgaG9yaXpvbnRhbCwgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IGlzTnVtYmVycyA9IHR5cGVvZiBtaW4gPT09ICdudW1iZXInICYmIHR5cGVvZiBtYXggPT09ICdudW1iZXInICYmIHR5cGVvZiB0byA9PT0gJ251bWJlcic7XG4gICAgICAgIGlmIChpc051bWJlcnMpIHtcbiAgICAgICAgICAgIGlmIChob3Jpem9udGFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJWaWV3LnN0eWxlLnRvcCA9IGAkeygwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCB0byl9JWA7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zdWJWaWV3LnN0eWxlLmxlZnQgPSBgJHsoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgdG8pfSVgO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gU2Vjb25kSGFuZGxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjYWxjVXRpbHNfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi91dGlscy9jYWxjVXRpbHNcIik7XG5jb25zdCBhYnN0cmFjdFN1YlZpZXdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vYWJzdHJhY3RTdWJWaWV3L2Fic3RyYWN0U3ViVmlld1wiKSk7XG5jbGFzcyBTY2FsZSBleHRlbmRzIGFic3RyYWN0U3ViVmlld18xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKHNsaWRlcikge1xuICAgICAgICBzdXBlcihzbGlkZXIpO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCwgc3RlcCwgaG9yaXpvbnRhbCwgc2NhbGVEZXN0aW55LCB9ID0gc3RhdGU7XG4gICAgICAgIGNvbnN0IG9sZFN0YXRlID0gSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZSk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUpLCB7IG1pbiwgbWF4LCBzdGVwLCBob3Jpem9udGFsLCBzY2FsZURlc3RpbnkgfSk7XG4gICAgICAgIGlmIChvbGRTdGF0ZSAhPT0gSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVTdWJWaWV3KCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnU3ViVmlld0V2ZW50Jyk7XG4gICAgfVxuICAgIGNyZWF0ZVN1YlZpZXcoKSB7XG4gICAgICAgIHRoaXMuc3ViVmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnN1YlZpZXcuY2xhc3NMaXN0LmFkZCgnanEtc2xpZGVyX19zY2FsZScpO1xuICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmRDaGlsZCh0aGlzLnN1YlZpZXcpO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIHN0ZXAsIGhvcml6b250YWwsIHNjYWxlRGVzdGlueSwgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IGlzQ29ycmVjdFBhcmFtcyA9IHR5cGVvZiBtaW4gPT09ICdudW1iZXInICYmIHR5cGVvZiBtYXggPT09ICdudW1iZXInICYmIHR5cGVvZiBzY2FsZURlc3RpbnkgPT09ICdudW1iZXInXG4gICAgICAgICAgICAmJiB0eXBlb2Ygc3RlcCA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGhvcml6b250YWwgPT09ICdib29sZWFuJztcbiAgICAgICAgaWYgKGlzQ29ycmVjdFBhcmFtcykge1xuICAgICAgICAgICAgbGV0IHBpcHMgPSB0aGlzLmNyZWF0ZVBpcEZyYWdtZW50KG1pbiwgbWF4LCBtaW4pO1xuICAgICAgICAgICAgZm9yIChsZXQgcGlwID0gbWluICsgMTsgcGlwIDwgbWF4OyBwaXAgKz0gMSkge1xuICAgICAgICAgICAgICAgIGlmIChwaXAgJSBzY2FsZURlc3RpbnkgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcGlwcyArPSB0aGlzLmNyZWF0ZVBpcEZyYWdtZW50KG1pbiwgbWF4LCBwaXApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBpcHMgKz0gdGhpcy5jcmVhdGVQaXBGcmFnbWVudChtaW4sIG1heCwgbWF4KTtcbiAgICAgICAgICAgIHRoaXMuc3ViVmlldy5pbm5lckhUTUwgPSBwaXBzO1xuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNyZWF0ZVBpcEZyYWdtZW50KG1pbiwgbWF4LCB2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5ob3Jpem9udGFsKSB7XG4gICAgICAgICAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImpxLXNsaWRlcl9fc2NhbGUtcGlwXCIgc3R5bGU9XCJ0b3A6JHsoMCwgY2FsY1V0aWxzXzEuY29udmVydFBlcmNlbnRJblZhbHVlKSgwLCB0aGlzLnNsaWRlci5jbGllbnRIZWlnaHQsICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCB2YWx1ZSkpfXB4XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJqcS1zbGlkZXJfX3NjYWxlLWxhYmVsXCI+JHt2YWx1ZX08L2Rpdj5cbiAgICAgIDwvZGl2PmA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJqcS1zbGlkZXJfX3NjYWxlLXBpcFwiIHN0eWxlPVwibGVmdDokeygwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCB2YWx1ZSl9JVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwianEtc2xpZGVyX19zY2FsZS1sYWJlbFwiPiR7dmFsdWV9PC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuICAgIH1cbiAgICBiaW5kRXZlbnRMaXN0ZW5lcigpIHtcbiAgICAgICAgdGhpcy5jbGlja0hhbmRsZXIgPSB0aGlzLmNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnN1YlZpZXcucXVlcnlTZWxlY3RvckFsbCgnLmpxLXNsaWRlcl9fc2NhbGUtbGFiZWwnKS5mb3JFYWNoKChwaXApID0+IHtcbiAgICAgICAgICAgIGlmIChwaXAgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHBpcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNsaWNrSGFuZGxlcihlKSB7XG4gICAgICAgIGlmIChlLnRhcmdldCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdCB7IG1pbiwgbWF4IH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBtaW4gPT09ICdudW1iZXInICYmIHR5cGVvZiBtYXggPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0gdGhpcy5zdGF0ZS5ob3Jpem9udGFsXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5zbGlkZXIuY2xpZW50SGVpZ2h0IC8gMTAwICogKDAsIGNhbGNVdGlsc18xLmNvbnZlcnRWYWx1ZUluUGVyY2VudCkobWluLCBtYXgsICtlLnRhcmdldC5pbm5lckhUTUwpXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5zbGlkZXIuY2xpZW50V2lkdGggLyAxMDAgKiAoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgK2UudGFyZ2V0LmlubmVySFRNTCk7XG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKVxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IG1pbjtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ1N1YlZpZXdFdmVudCcsIHsgdGFyZ2V0OiAndHJhY2snLCBwb3NpdGlvbiB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFNjYWxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjYWxjVXRpbHNfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi91dGlscy9jYWxjVXRpbHNcIik7XG5jb25zdCBUaXBfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9UaXBcIikpO1xuY2xhc3MgU2Vjb25kVGlwIGV4dGVuZHMgVGlwXzEuZGVmYXVsdCB7XG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgY29uc3QgeyBtaW4gPSB0aGlzLnN0YXRlLm1pbiwgbWF4ID0gdGhpcy5zdGF0ZS5tYXgsIHRvID0gdGhpcy5zdGF0ZS50bywgaG9yaXpvbnRhbCA9IHRoaXMuc3RhdGUuaG9yaXpvbnRhbCwgfSA9IHN0YXRlO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgbWluLCBtYXgsIHRvLCBob3Jpem9udGFsLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIHRvLCBob3Jpem9udGFsLCB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgaXNOdW1iZXJzID0gdHlwZW9mIG1pbiA9PT0gJ251bWJlcicgJiYgdHlwZW9mIG1heCA9PT0gJ251bWJlcicgJiYgdHlwZW9mIHRvID09PSAnbnVtYmVyJztcbiAgICAgICAgaWYgKGlzTnVtYmVycykge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xuICAgICAgICAgICAgdGhpcy5pc0RvdWJsZSA/IHRoaXMuc3ViVmlldy5zdHlsZS5vcGFjaXR5ID0gJzAnIDogdGhpcy5zdWJWaWV3LnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgICB0aGlzLnN1YlZpZXcudGV4dENvbnRlbnQgPSB0by50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYgKGhvcml6b250YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YlZpZXcuc3R5bGUudG9wID0gYCR7KDAsIGNhbGNVdGlsc18xLmNvbnZlcnRWYWx1ZUluUGVyY2VudCkobWluLCBtYXgsIHRvKX0lYDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN1YlZpZXcuc3R5bGUubGVmdCA9IGAkeygwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCB0byl9JWA7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBTZWNvbmRUaXA7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNhbGNVdGlsc18xID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL3V0aWxzL2NhbGNVdGlsc1wiKTtcbmNvbnN0IGFic3RyYWN0U3ViVmlld18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi8uLi9hYnN0cmFjdFN1YlZpZXcvYWJzdHJhY3RTdWJWaWV3XCIpKTtcbmNsYXNzIFRpcCBleHRlbmRzIGFic3RyYWN0U3ViVmlld18xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKHNsaWRlcikge1xuICAgICAgICBzdXBlcihzbGlkZXIpO1xuICAgICAgICB0aGlzLmlzRG91YmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4LCBmcm9tLCB0bywgaG9yaXpvbnRhbCwgfSA9IHN0YXRlO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgbWluLCBtYXgsIGZyb20sIHRvLCBob3Jpem9udGFsLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICBjaGFuZ2VJc0RvdWJsZSh2YWwpIHtcbiAgICAgICAgdGhpcy5pc0RvdWJsZSA9IHZhbDtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVTdWJWaWV3KCk7XG4gICAgfVxuICAgIGNyZWF0ZVN1YlZpZXcoKSB7XG4gICAgICAgIHRoaXMuc3ViVmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnN1YlZpZXcuY2xhc3NMaXN0LmFkZCgnanEtc2xpZGVyX190aXAnKTtcbiAgICAgICAgdGhpcy5zbGlkZXIuYXBwZW5kQ2hpbGQodGhpcy5zdWJWaWV3KTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4LCBmcm9tLCBob3Jpem9udGFsLCB0bywgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IGlzTnVtYmVycyA9IHR5cGVvZiBtaW4gPT09ICdudW1iZXInICYmIHR5cGVvZiBtYXggPT09ICdudW1iZXInXG4gICAgICAgICAgICAmJiB0eXBlb2YgZnJvbSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGZyb20gPT09ICdudW1iZXInO1xuICAgICAgICBpZiAoaXNOdW1iZXJzKSB7XG4gICAgICAgICAgICB0aGlzLnN1YlZpZXcudGV4dENvbnRlbnQgPSB0aGlzLmlzRG91YmxlID8gYCR7ZnJvbX0gLSAke3RvfWAgOiBmcm9tLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZiAoaG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3ViVmlldy5zdHlsZS50b3AgPSBgJHsoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgZnJvbSl9JWA7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zdWJWaWV3LnN0eWxlLmxlZnQgPSBgJHsoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgZnJvbSl9JWA7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBUaXA7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNhbGNVdGlsc18xID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL3V0aWxzL2NhbGNVdGlsc1wiKTtcbmNvbnN0IGFic3RyYWN0U3ViVmlld18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi8uLi9hYnN0cmFjdFN1YlZpZXcvYWJzdHJhY3RTdWJWaWV3XCIpKTtcbmNsYXNzIFRyYWNrIGV4dGVuZHMgYWJzdHJhY3RTdWJWaWV3XzEuZGVmYXVsdCB7XG4gICAgY29uc3RydWN0b3Ioc2xpZGVyKSB7XG4gICAgICAgIHN1cGVyKHNsaWRlcik7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4LCBmcm9tLCB0bywgaG9yaXpvbnRhbCwgcmFuZ2UsIHByb2dyZXNzLCB9ID0gc3RhdGU7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUpLCB7IG1pbiwgbWF4LCBmcm9tLCB0bywgaG9yaXpvbnRhbCwgcmFuZ2UsIHByb2dyZXNzIH0pO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICBjcmVhdGVTdWJWaWV3KCkge1xuICAgICAgICB0aGlzLnN1YlZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5zdWJWaWV3LmNsYXNzTGlzdC5hZGQoJ2pxLXNsaWRlcl9fdHJhY2snKTtcbiAgICAgICAgdGhpcy5wcm9ncmVzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnByb2dyZXNzLmNsYXNzTGlzdC5hZGQoJ2pxLXNsaWRlcl9fcHJvZ3Jlc3MnKTtcbiAgICAgICAgdGhpcy5zdWJWaWV3LmFwcGVuZENoaWxkKHRoaXMucHJvZ3Jlc3MpO1xuICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmRDaGlsZCh0aGlzLnN1YlZpZXcpO1xuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmNyZWF0ZVN1YlZpZXcoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCdTdWJWaWV3RXZlbnQnKTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRMaXN0ZW5lcigpO1xuICAgIH1cbiAgICBiaW5kRXZlbnRMaXN0ZW5lcigpIHtcbiAgICAgICAgdGhpcy5jbGlja0hhbmRsZXIgPSB0aGlzLmNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnN1YlZpZXcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcik7XG4gICAgfVxuICAgIGNsaWNrSGFuZGxlcihlKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnU3ViVmlld0V2ZW50Jywge1xuICAgICAgICAgICAgdGFyZ2V0OiAndHJhY2snLFxuICAgICAgICAgICAgcG9zaXRpb246IHRoaXMuc3RhdGUuaG9yaXpvbnRhbFxuICAgICAgICAgICAgICAgID8gZS5jbGllbnRZIC0gdGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wXG4gICAgICAgICAgICAgICAgOiBlLmNsaWVudFggLSB0aGlzLnNsaWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4LCBmcm9tLCB0bywgaG9yaXpvbnRhbCwgcmFuZ2UsIHByb2dyZXNzLCB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgaWYgKCFwcm9ncmVzcykge1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5yZW1vdmUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpc051bWJlcnMgPSB0eXBlb2YgbWluID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgbWF4ID09PSAnbnVtYmVyJ1xuICAgICAgICAgICAgJiYgdHlwZW9mIGZyb20gPT09ICdudW1iZXInICYmIHR5cGVvZiB0byA9PT0gJ251bWJlcic7XG4gICAgICAgIGlmIChpc051bWJlcnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gKDAsIGNhbGNVdGlsc18xLmNvbnZlcnRWYWx1ZUluUGVyY2VudCkobWluLCBtYXgsIGZyb20pO1xuICAgICAgICAgICAgY29uc3QgZW5kID0gKDAsIGNhbGNVdGlsc18xLmNvbnZlcnRWYWx1ZUluUGVyY2VudCkobWluLCBtYXgsIHRvKTtcbiAgICAgICAgICAgIGlmIChob3Jpem9udGFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IGVuZCAtIHN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH0lYDtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW1peGVkLW9wZXJhdG9yc1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzLnN0eWxlLm1hcmdpblRvcCA9IGAke3RoaXMuc2xpZGVyLmNsaWVudEhlaWdodCAvIDEwMCAqIHN0YXJ0fXB4YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3Muc3R5bGUuaGVpZ2h0ID0gYCR7c3RhcnR9JWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyYW5nZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gZW5kIC0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5zdHlsZS53aWR0aCA9IGAke3dpZHRofSVgO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3Muc3R5bGUubWFyZ2luTGVmdCA9IGAke3N0YXJ0fSVgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5zdHlsZS53aWR0aCA9IGAke3N0YXJ0fSVgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gVHJhY2s7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qIGVzbGludC1kaXNhYmxlIG5vLW1peGVkLW9wZXJhdG9ycyAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L2V4dGVuc2lvbnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5jb25zdCBIYW5kbGVfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9TdWJWaWV3Q29tcG9uZW50cy9IYW5kbGUvSGFuZGxlXCIpKTtcbmNvbnN0IEV2ZW50Q3JlYXRvcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9FdmVudENyZWF0b3IvRXZlbnRDcmVhdG9yXCIpKTtcbmNvbnN0IFNlY29uZEhhbmRsZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1N1YlZpZXdDb21wb25lbnRzL0hhbmRsZS9TZWNvbmRIYW5kbGVcIikpO1xuY29uc3QgVGlwXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vU3ViVmlld0NvbXBvbmVudHMvVGlwL1RpcFwiKSk7XG5jb25zdCBTZWNvbmRUaXBfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9TdWJWaWV3Q29tcG9uZW50cy9UaXAvU2Vjb25kVGlwXCIpKTtcbmNvbnN0IFRyYWNrXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vU3ViVmlld0NvbXBvbmVudHMvVHJhY2svVHJhY2tcIikpO1xuY29uc3QgY2FsY1V0aWxzXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvY2FsY1V0aWxzXCIpO1xuY29uc3QgU2NhbGVfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9TdWJWaWV3Q29tcG9uZW50cy9TY2FsZS9TY2FsZVwiKSk7XG5jbGFzcyBWaWV3IGV4dGVuZHMgRXZlbnRDcmVhdG9yXzEuZGVmYXVsdCB7XG4gICAgY29uc3RydWN0b3Iobm9kZUVsZW0pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5ub2RlRWxlbSA9IG5vZGVFbGVtO1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHt9O1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgdGhpcy5jaGVja0lzQ2hhbmdlZFNldHRpbmdzKHN0YXRlKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZSksIHN0YXRlKTtcbiAgICAgICAgdGhpcy51cGRhdGUodGhpcy5zdGF0ZSk7XG4gICAgICAgIHRoaXMuY2hlY2tUaXBzKCk7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlU2xpZGVyKCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnVmlld0V2ZW50Jyk7XG4gICAgfVxuICAgIGNyZWF0ZVNsaWRlcigpIHtcbiAgICAgICAgdGhpcy5zbGlkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5zbGlkZXIuY2xhc3NMaXN0LmFkZCgnanEtc2xpZGVyJyk7XG4gICAgICAgIHRoaXMubm9kZUVsZW0uYXBwZW5kQ2hpbGQodGhpcy5zbGlkZXIpO1xuICAgIH1cbiAgICBjcmVhdGVDb21wb25lbnRzKHN0YXRlKSB7XG4gICAgICAgIGNvbnN0IHsgcmFuZ2UsIHRpcCwgc2NhbGUsIGhvcml6b250YWwsIH0gPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzLnB1c2gobmV3IEhhbmRsZV8xLmRlZmF1bHQodGhpcy5zbGlkZXIpKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzLnB1c2gobmV3IFRyYWNrXzEuZGVmYXVsdCh0aGlzLnNsaWRlcikpO1xuICAgICAgICBpZiAodGlwKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMucHVzaChuZXcgVGlwXzEuZGVmYXVsdCh0aGlzLnNsaWRlcikpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzLnB1c2gobmV3IFNlY29uZEhhbmRsZV8xLmRlZmF1bHQodGhpcy5zbGlkZXIpKTtcbiAgICAgICAgICAgIGlmICh0aXApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMucHVzaChuZXcgU2Vjb25kVGlwXzEuZGVmYXVsdCh0aGlzLnNsaWRlcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzY2FsZSkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzLnB1c2gobmV3IFNjYWxlXzEuZGVmYXVsdCh0aGlzLnNsaWRlcikpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChob3Jpem9udGFsKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlci5jbGFzc0xpc3QuYWRkKCdqcS1zbGlkZXItLWhvcml6b250YWwnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2pxLXNsaWRlci0taG9yaXpvbnRhbCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGJpbmRFdmVudExpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLnN1YlZpZXdFdmVudEhhbmRsZXIgPSB0aGlzLnN1YlZpZXdFdmVudEhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzLmZvckVhY2goKGNvbXBvbmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5ldmVudHMuU3ViVmlld0V2ZW50KSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1N1YlZpZXdFdmVudCcsIHRoaXMuc3ViVmlld0V2ZW50SGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdWJWaWV3RXZlbnRIYW5kbGVyKGUpIHtcbiAgICAgICAgY29uc3Qgc2l6ZSA9IHRoaXMuc3RhdGUuaG9yaXpvbnRhbCA/IHRoaXMuc2xpZGVyLmNsaWVudEhlaWdodCA6IHRoaXMuc2xpZGVyLmNsaWVudFdpZHRoO1xuICAgICAgICBpZiAoZS50YXJnZXQgPT09ICdoYW5kbGUnKSB7XG4gICAgICAgICAgICBjb25zdCBmcm9tID0gKDAsIGNhbGNVdGlsc18xLmNvbnZlcnRQaXhlbEluUGVyY2VudCkoc2l6ZSwgZS5wb3NpdGlvbik7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ1ZpZXdFdmVudCcsIHsgZnJvbSB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZS50YXJnZXQgPT09ICdzZWNvbmRIYW5kbGUnKSB7XG4gICAgICAgICAgICBjb25zdCB0byA9ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0UGl4ZWxJblBlcmNlbnQpKHNpemUsIGUucG9zaXRpb24pO1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdWaWV3RXZlbnQnLCB7IHRvIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gJ3RyYWNrJyB8fCBlLnRhcmdldCA9PT0gJ3NjYWxlJykge1xuICAgICAgICAgICAgY29uc3QgaGFuZGxlcyA9IHRoaXMuZ2V0QXJyT2ZDb25jcmV0ZVN1YlZpZXcoSGFuZGxlXzEuZGVmYXVsdCk7XG4gICAgICAgICAgICBjb25zdCBmcm9tID0gaGFuZGxlc1swXS5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUucmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0byA9IGhhbmRsZXNbMV0uZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoZnJvbSAtIGUucG9zaXRpb24pIDwgdG8gLSBlLnBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnVmlld0V2ZW50JywgeyBmcm9tOiAoMCwgY2FsY1V0aWxzXzEuY29udmVydFBpeGVsSW5QZXJjZW50KShzaXplLCBlLnBvc2l0aW9uKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ1ZpZXdFdmVudCcsIHsgdG86ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0UGl4ZWxJblBlcmNlbnQpKHNpemUsIGUucG9zaXRpb24pIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnVmlld0V2ZW50JywgeyBmcm9tOiAoMCwgY2FsY1V0aWxzXzEuY29udmVydFBpeGVsSW5QZXJjZW50KShzaXplLCBlLnBvc2l0aW9uKSB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGVja0lzQ2hhbmdlZFNldHRpbmdzKHN0YXRlKSB7XG4gICAgICAgIGNvbnN0IHsgcmFuZ2UsIHRpcCwgc2NhbGUsIGhvcml6b250YWwsIHByb2dyZXNzLCBzY2FsZURlc3RpbnksIH0gPSBzdGF0ZTtcbiAgICAgICAgY29uc3QgaXNVcGRhdGVTZXR0aW5ncyA9IHJhbmdlICE9PSB0aGlzLnN0YXRlLnJhbmdlIHx8IHRpcCAhPT0gdGhpcy5zdGF0ZS50aXBcbiAgICAgICAgICAgIHx8IHNjYWxlICE9PSB0aGlzLnN0YXRlLnNjYWxlIHx8IGhvcml6b250YWwgIT09IHRoaXMuc3RhdGUuaG9yaXpvbnRhbFxuICAgICAgICAgICAgfHwgcHJvZ3Jlc3MgIT09IHRoaXMuc3RhdGUucHJvZ3Jlc3MgfHwgc2NhbGVEZXN0aW55ICE9PSB0aGlzLnN0YXRlLnNjYWxlRGVzdGlueTtcbiAgICAgICAgaWYgKGlzVXBkYXRlU2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50cyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5zbGlkZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbXBvbmVudHMoc3RhdGUpO1xuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNoZWNrVGlwcygpIHtcbiAgICAgICAgY29uc3QgeyB0aXAsIHJhbmdlLCBob3Jpem9udGFsIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBpZiAodGlwICYmIHJhbmdlKSB7XG4gICAgICAgICAgICBjb25zdCB0aXBzID0gdGhpcy5nZXRBcnJPZkNvbmNyZXRlU3ViVmlldyhUaXBfMS5kZWZhdWx0KTtcbiAgICAgICAgICAgIGNvbnN0IHNpemUgPSBob3Jpem9udGFsID8gdGlwc1sxXS5zdWJWaWV3LmNsaWVudEhlaWdodCA6IHRpcHNbMV0uc3ViVmlldy5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0UG9zaXRpb24gPSB0aXBzWzBdLmdldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICBjb25zdCBzZWNvbmRQb3NpdGlvbiA9IHRpcHNbMV0uZ2V0UG9zaXRpb24oKSAtIHNpemU7XG4gICAgICAgICAgICBpZiAoZmlyc3RQb3NpdGlvbiA+IHNlY29uZFBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGlwcy5mb3JFYWNoKCh0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHQuY2hhbmdlSXNEb3VibGUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHQuc2V0U3RhdGUodGhpcy5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aXBzLmZvckVhY2goKHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdC5jaGFuZ2VJc0RvdWJsZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXBkYXRlKHN0YXRlKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cy5mb3JFYWNoKChjb21wb25lbnQpID0+IGNvbXBvbmVudC5zZXRTdGF0ZShzdGF0ZSkpO1xuICAgIH1cbiAgICBnZXRBcnJPZkNvbmNyZXRlU3ViVmlldyhpbnN0YW5jZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnRzLmZpbHRlcigoY29tcG9uZW50KSA9PiB7IHZhciBfYTsgcmV0dXJuIChfYSA9IGNvbXBvbmVudCBpbnN0YW5jZW9mIGluc3RhbmNlKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBjb21wb25lbnQ7IH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFZpZXc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEV2ZW50Q3JlYXRvcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi8uLi9FdmVudENyZWF0b3IvRXZlbnRDcmVhdG9yXCIpKTtcbmNsYXNzIFN1YlZpZXcgZXh0ZW5kcyBFdmVudENyZWF0b3JfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3RvcihzbGlkZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zbGlkZXIgPSBzbGlkZXI7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7fTtcbiAgICB9XG4gICAgZ2V0UG9zaXRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmhvcml6b250YWwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN1YlZpZXcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnN1YlZpZXcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBTdWJWaWV3O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuLyogZXNsaW50LWRpc2FibGUgY29uc2lzdGVudC1yZXR1cm4gKi9cbi8qIGVzbGludC1kaXNhYmxlIGZ1bmMtbmFtZXMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9leHRlbnNpb25zICovXG5yZXF1aXJlKFwiLi9zbGlkZXIuc2Nzc1wiKTtcbmNvbnN0IFByZXNlbnRlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0FwcENvbXBvbmVudHMvUHJlc2VudGVyL1ByZXNlbnRlclwiKSk7XG4oZnVuY3Rpb24gKCQpIHtcbiAgICBjb25zdCBtZXRob2RzID0ge1xuICAgICAgICBpbml0KHN0YXRlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHN0YXRlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoISQodGhpcykuZGF0YSgnanFTbGlkZXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5kYXRhKCkuanFTbGlkZXIgPSBuZXcgUHJlc2VudGVyXzEuZGVmYXVsdCh0aGlzLCBzdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlKHN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGpxU2xpZGVyID0gJCh0aGlzKS5kYXRhKCdqcVNsaWRlcicpO1xuICAgICAgICAgICAgICAgIGpxU2xpZGVyLm1vZGVsLnNldFN0YXRlKHN0YXRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBnZXRTdGF0ZSgpIHtcbiAgICAgICAgICAgIGNvbnN0IGpxU2xpZGVyID0gJCh0aGlzKS5kYXRhKCdqcVNsaWRlcicpO1xuICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSBqcVNsaWRlci5tb2RlbC5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICB9LFxuICAgICAgICBvbkNoYW5nZShjYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBqcVNsaWRlciA9ICQodGhpcykuZGF0YSgnanFTbGlkZXInKTtcbiAgICAgICAgICAgICAgICBqcVNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdvbkNoYW5nZScsIChlKSA9PiBjYWxsYmFjayhlKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICB9O1xuICAgICQuZm4uanFTbGlkZXIgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgICBjb25zdCBpc0VtcHR5QXJncyA9IGFyZ3MubGVuZ3RoID09PSAwIHx8IHR5cGVvZiBhcmdzWzBdID09PSAnb2JqZWN0JztcbiAgICAgICAgY29uc3QgaXNVcGRhdGUgPSBhcmdzLmxlbmd0aCA+PSAyICYmIGFyZ3NbMF0gPT09ICd1cGRhdGUnICYmIHR5cGVvZiBhcmdzWzFdID09PSAnb2JqZWN0JztcbiAgICAgICAgY29uc3QgaXNHZXRTdGF0ZSA9IGFyZ3MubGVuZ3RoID09PSAxICYmIGFyZ3NbMF0gPT09ICdnZXRTdGF0ZSc7XG4gICAgICAgIGNvbnN0IGlzQmluZEV2ZW50TGlzdGVuZXIgPSBhcmdzLmxlbmd0aCA+PSAyICYmIGFyZ3NbMF0gPT09ICdvbkNoYW5nZScgJiYgdHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbic7XG4gICAgICAgIGlmIChpc0VtcHR5QXJncykge1xuICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSBhcmdzWzBdID8gYXJnc1swXSA6IHt9O1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZHMuaW5pdC5jYWxsKHRoaXMsIHN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNVcGRhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gYXJnc1sxXTtcbiAgICAgICAgICAgIHJldHVybiBtZXRob2RzLnVwZGF0ZS5jYWxsKHRoaXMsIHN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNHZXRTdGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZHMuZ2V0U3RhdGUuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNCaW5kRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSBhcmdzWzFdO1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZHMub25DaGFuZ2UuY2FsbCh0aGlzLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9O1xufShqUXVlcnkpKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jb252ZXJ0UGVyY2VudEluVmFsdWUgPSBleHBvcnRzLmNvbnZlcnRQaXhlbEluUGVyY2VudCA9IGV4cG9ydHMuY29udmVydFZhbHVlSW5QZXJjZW50ID0gdm9pZCAwO1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tbWl4ZWQtb3BlcmF0b3JzICovXG5mdW5jdGlvbiBjb252ZXJ0VmFsdWVJblBlcmNlbnQobWluLCBtYXgsIHZhbHVlKSB7XG4gICAgcmV0dXJuIDEwMCAvIChtYXggLSBtaW4pICogKHZhbHVlIC0gbWluKTtcbn1cbmV4cG9ydHMuY29udmVydFZhbHVlSW5QZXJjZW50ID0gY29udmVydFZhbHVlSW5QZXJjZW50O1xuZnVuY3Rpb24gY29udmVydFBpeGVsSW5QZXJjZW50KHdpZHRoLCB2YWx1ZSkge1xuICAgIHJldHVybiAxMDAgLyB3aWR0aCAqIHZhbHVlO1xufVxuZXhwb3J0cy5jb252ZXJ0UGl4ZWxJblBlcmNlbnQgPSBjb252ZXJ0UGl4ZWxJblBlcmNlbnQ7XG5mdW5jdGlvbiBjb252ZXJ0UGVyY2VudEluVmFsdWUobWluLCBtYXgsIHBlcmNlbnQpIHtcbiAgICByZXR1cm4gKG1heCAtIG1pbikgLyAxMDAgKiBwZXJjZW50ICsgbWluO1xufVxuZXhwb3J0cy5jb252ZXJ0UGVyY2VudEluVmFsdWUgPSBjb252ZXJ0UGVyY2VudEluVmFsdWU7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9hcHAudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=