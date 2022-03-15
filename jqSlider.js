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
        if (typeof data.horizontal === 'boolean')
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NsaWRlci5zY3NzPzBiYTkiLCJ3ZWJwYWNrOi8vLy4vQXBwQ29tcG9uZW50cy9FdmVudENyZWF0b3IvRXZlbnRDcmVhdG9yLnRzIiwid2VicGFjazovLy8uL0FwcENvbXBvbmVudHMvTW9kZWwvTW9kZWwudHMiLCJ3ZWJwYWNrOi8vLy4vQXBwQ29tcG9uZW50cy9QcmVzZW50ZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL0FwcENvbXBvbmVudHMvVmlldy9TdWJWaWV3Q29tcG9uZW50cy9IYW5kbGUvSGFuZGxlLnRzIiwid2VicGFjazovLy8uL0FwcENvbXBvbmVudHMvVmlldy9TdWJWaWV3Q29tcG9uZW50cy9IYW5kbGUvU2Vjb25kSGFuZGxlLnRzIiwid2VicGFjazovLy8uL0FwcENvbXBvbmVudHMvVmlldy9TdWJWaWV3Q29tcG9uZW50cy9TY2FsZS9TY2FsZS50cyIsIndlYnBhY2s6Ly8vLi9BcHBDb21wb25lbnRzL1ZpZXcvU3ViVmlld0NvbXBvbmVudHMvVGlwL1NlY29uZFRpcC50cyIsIndlYnBhY2s6Ly8vLi9BcHBDb21wb25lbnRzL1ZpZXcvU3ViVmlld0NvbXBvbmVudHMvVGlwL1RpcC50cyIsIndlYnBhY2s6Ly8vLi9BcHBDb21wb25lbnRzL1ZpZXcvU3ViVmlld0NvbXBvbmVudHMvVHJhY2svVHJhY2sudHMiLCJ3ZWJwYWNrOi8vLy4vQXBwQ29tcG9uZW50cy9WaWV3L1ZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vQXBwQ29tcG9uZW50cy9WaWV3L2Fic3RyYWN0U3ViVmlldy9hYnN0cmFjdFN1YlZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwLnRzIiwid2VicGFjazovLy8uL3V0aWxzL2NhbGNVdGlscy50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIlwidXNlIHN0cmljdFwiO1xuLyogZXNsaW50LWRpc2FibGUgbWF4LWNsYXNzZXMtcGVyLWZpbGUgKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtY2xhc3Nlcy1wZXItZmlsZVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgTXlFdmVudCB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmNhbGxiYWNrcyA9IFtdO1xuICAgIH1cbiAgICByZWdpc3RlckNhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgIH1cbn1cbmNsYXNzIEV2ZW50Q3JlYXRvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzID0ge307XG4gICAgfVxuICAgIHJlZ2lzdGVyRXZlbnQoZXZlbnROYW1lKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IE15RXZlbnQoZXZlbnROYW1lKTtcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IGV2ZW50O1xuICAgIH1cbiAgICBkaXNwYXRjaEV2ZW50KGV2ZW50TmFtZSwgZXZlbnRBcmdzKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uY2FsbGJhY2tzLmZvckVhY2goKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayhldmVudEFyZ3MpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0ucmVnaXN0ZXJDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gRXZlbnRDcmVhdG9yO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBFdmVudENyZWF0b3JfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vRXZlbnRDcmVhdG9yL0V2ZW50Q3JlYXRvclwiKSk7XG5jbGFzcyBNb2RlbCBleHRlbmRzIEV2ZW50Q3JlYXRvcl8xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBtYXg6IDEwMCxcbiAgICAgICAgICAgIGZyb206IDAsXG4gICAgICAgICAgICB0bzogMTAwLFxuICAgICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgICAgIHRpcDogdHJ1ZSxcbiAgICAgICAgICAgIHJhbmdlOiB0cnVlLFxuICAgICAgICAgICAgcHJvZ3Jlc3M6IHRydWUsXG4gICAgICAgICAgICBzY2FsZTogdHJ1ZSxcbiAgICAgICAgICAgIHNjYWxlRGVzdGlueTogMTAsXG4gICAgICAgICAgICBob3Jpem9udGFsOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pbml0KHN0YXRlKTtcbiAgICB9XG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgY29uc3QgW3ZhbHVlcywgc2V0dGluZ3NdID0gdGhpcy5zcGxpdFBhcmFtcyhzdGF0ZSk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUpLCB0aGlzLm1pbk1heFZhbGlkYXRvcihzZXR0aW5ncykpO1xuICAgICAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlKSwgdGhpcy5yYW5nZUZyb21Ub1ZhbGlkYXRvcih0aGlzLnN0ZXBWYWxpZGF0b3IodmFsdWVzKSkpO1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ01vZGVsRXZlbnQnLCB0aGlzLnN0YXRlKTtcbiAgICB9XG4gICAgZ2V0U3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICAgIH1cbiAgICBpbml0KHN0YXRlKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnTW9kZWxFdmVudCcpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHN0YXRlKTtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgICBzcGxpdFBhcmFtcyhkYXRhKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IHt9O1xuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IHt9O1xuICAgICAgICBpZiAoJ2Zyb20nIGluIGRhdGEpIHtcbiAgICAgICAgICAgIHZhbHVlcy5mcm9tID0gZGF0YS5mcm9tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFsdWVzLmZyb20gPSB0aGlzLnN0YXRlLmZyb207XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCd0bycgaW4gZGF0YSkge1xuICAgICAgICAgICAgdmFsdWVzLnRvID0gZGF0YS50bztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlcy50byA9IHRoaXMuc3RhdGUudG87XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhLnN0ZXAgJiYgZGF0YS5zdGVwID4gMClcbiAgICAgICAgICAgIHNldHRpbmdzLnN0ZXAgPSBkYXRhLnN0ZXA7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5taW4gPT09ICdudW1iZXInKVxuICAgICAgICAgICAgc2V0dGluZ3MubWluID0gZGF0YS5taW47XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5tYXggPT09ICdudW1iZXInKVxuICAgICAgICAgICAgc2V0dGluZ3MubWF4ID0gZGF0YS5tYXg7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5zY2FsZURlc3RpbnkgPT09ICdudW1iZXInKVxuICAgICAgICAgICAgc2V0dGluZ3Muc2NhbGVEZXN0aW55ID0gZGF0YS5zY2FsZURlc3Rpbnk7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5zY2FsZSA9PT0gJ2Jvb2xlYW4nKVxuICAgICAgICAgICAgc2V0dGluZ3Muc2NhbGUgPSBkYXRhLnNjYWxlO1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEucmFuZ2UgPT09ICdib29sZWFuJylcbiAgICAgICAgICAgIHNldHRpbmdzLnJhbmdlID0gZGF0YS5yYW5nZTtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhLnRpcCA9PT0gJ2Jvb2xlYW4nKVxuICAgICAgICAgICAgc2V0dGluZ3MudGlwID0gZGF0YS50aXA7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5ob3Jpem9udGFsID09PSAnYm9vbGVhbicpXG4gICAgICAgICAgICBzZXR0aW5ncy5ob3Jpem9udGFsID0gZGF0YS5ob3Jpem9udGFsO1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEucHJvZ3Jlc3MgPT09ICdib29sZWFuJylcbiAgICAgICAgICAgIHNldHRpbmdzLnByb2dyZXNzID0gZGF0YS5wcm9ncmVzcztcbiAgICAgICAgcmV0dXJuIFt2YWx1ZXMsIHNldHRpbmdzXTtcbiAgICB9XG4gICAgbWluTWF4VmFsaWRhdG9yKGRhdGEpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1jb25zdFxuICAgICAgICBsZXQgeyBtaW4gPSB0aGlzLnN0YXRlLm1pbiwgbWF4ID0gdGhpcy5zdGF0ZS5tYXggfSA9IGRhdGE7XG4gICAgICAgIGlmIChtaW4gPiBtYXgpXG4gICAgICAgICAgICBtaW4gPSBtYXg7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGRhdGEpLCB7IG1pbiwgbWF4IH0pO1xuICAgIH1cbiAgICBzdGVwVmFsaWRhdG9yKGRhdGEpIHtcbiAgICAgICAgY29uc3QgY29weU9mRGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGEpO1xuICAgICAgICBmdW5jdGlvbiBjaGVja1N0ZXAodmFsdWUsIHN0ZXApIHtcbiAgICAgICAgICAgIHJldHVybiArKE1hdGgucm91bmQodmFsdWUgLyBzdGVwKSAqIHN0ZXApLnRvRml4ZWQoMik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBjb3B5T2ZEYXRhLmZyb20gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBjb3B5T2ZEYXRhLmZyb20gPSBjaGVja1N0ZXAoY29weU9mRGF0YS5mcm9tLCB0aGlzLnN0YXRlLnN0ZXApO1xuICAgICAgICAgICAgaWYgKGNvcHlPZkRhdGEuZnJvbSA8PSB0aGlzLnN0YXRlLm1pbilcbiAgICAgICAgICAgICAgICBjb3B5T2ZEYXRhLmZyb20gPSB0aGlzLnN0YXRlLm1pbjtcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvcHlPZkRhdGEuZnJvbSA+PSB0aGlzLnN0YXRlLm1heClcbiAgICAgICAgICAgICAgICBjb3B5T2ZEYXRhLmZyb20gPSB0aGlzLnN0YXRlLm1heDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGNvcHlPZkRhdGEudG8gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBjb3B5T2ZEYXRhLnRvID0gY2hlY2tTdGVwKGNvcHlPZkRhdGEudG8sIHRoaXMuc3RhdGUuc3RlcCk7XG4gICAgICAgICAgICBpZiAoY29weU9mRGF0YS50byA8PSB0aGlzLnN0YXRlLm1pbilcbiAgICAgICAgICAgICAgICBjb3B5T2ZEYXRhLnRvID0gdGhpcy5zdGF0ZS5taW47XG4gICAgICAgICAgICBlbHNlIGlmIChjb3B5T2ZEYXRhLnRvID49IHRoaXMuc3RhdGUubWF4KVxuICAgICAgICAgICAgICAgIGNvcHlPZkRhdGEudG8gPSB0aGlzLnN0YXRlLm1heDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29weU9mRGF0YTtcbiAgICB9XG4gICAgcmFuZ2VGcm9tVG9WYWxpZGF0b3IoZGF0YSkge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUucmFuZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvcHlPZlNEYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YSk7XG4gICAgICAgIGNvbnN0IGlzRnJvbU5vdFZhbGlkbHkgPSBjb3B5T2ZTRGF0YS5mcm9tICYmIHRoaXMuc3RhdGUudG8gLSBjb3B5T2ZTRGF0YS5mcm9tIDw9IDA7XG4gICAgICAgIGNvbnN0IGlzVG9Ob3RWYWxpZGx5ID0gY29weU9mU0RhdGEudG8gJiYgY29weU9mU0RhdGEudG8gLSB0aGlzLnN0YXRlLmZyb20gPD0gMDtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZnJvbSA+IHRoaXMuc3RhdGUudG8pXG4gICAgICAgICAgICB0aGlzLnN0YXRlLmZyb20gPSB0aGlzLnN0YXRlLnRvO1xuICAgICAgICBpZiAoaXNGcm9tTm90VmFsaWRseSlcbiAgICAgICAgICAgIGNvcHlPZlNEYXRhLmZyb20gPSB0aGlzLnN0YXRlLnRvO1xuICAgICAgICBpZiAoaXNUb05vdFZhbGlkbHkpXG4gICAgICAgICAgICBjb3B5T2ZTRGF0YS50byA9IHRoaXMuc3RhdGUuZnJvbTtcbiAgICAgICAgcmV0dXJuIGNvcHlPZlNEYXRhO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IE1vZGVsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjYWxjVXRpbHNfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9jYWxjVXRpbHNcIik7XG5jb25zdCBFdmVudENyZWF0b3JfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vRXZlbnRDcmVhdG9yL0V2ZW50Q3JlYXRvclwiKSk7XG5jb25zdCBNb2RlbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9Nb2RlbC9Nb2RlbFwiKSk7XG5jb25zdCBWaWV3XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL1ZpZXcvVmlld1wiKSk7XG5jbGFzcyBQcmVzZW50ZXIgZXh0ZW5kcyBFdmVudENyZWF0b3JfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlRWxlbSwgc3RhdGUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXdfMS5kZWZhdWx0KG5vZGVFbGVtKTtcbiAgICAgICAgdGhpcy5tb2RlbCA9IG5ldyBNb2RlbF8xLmRlZmF1bHQoc3RhdGUpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ29uQ2hhbmdlJyk7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLnZpZXcuc2V0U3RhdGUodGhpcy5tb2RlbC5nZXRTdGF0ZSgpKTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9XG4gICAgYmluZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLnZpZXdFdmVudEhhbmRsZXIgPSB0aGlzLnZpZXdFdmVudEhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5tb2RlbEV2ZW50SGFuZGxlciA9IHRoaXMubW9kZWxFdmVudEhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy52aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ1ZpZXdFdmVudCcsIHRoaXMudmlld0V2ZW50SGFuZGxlcik7XG4gICAgICAgIHRoaXMubW9kZWwuYWRkRXZlbnRMaXN0ZW5lcignTW9kZWxFdmVudCcsIHRoaXMubW9kZWxFdmVudEhhbmRsZXIpO1xuICAgIH1cbiAgICB2aWV3RXZlbnRIYW5kbGVyKGUpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCB9ID0gdGhpcy5tb2RlbC5nZXRTdGF0ZSgpO1xuICAgICAgICBpZiAodHlwZW9mIG1pbiA9PT0gJ251bWJlcicgJiYgdHlwZW9mIG1heCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGlmIChlLmZyb20pXG4gICAgICAgICAgICAgICAgZS5mcm9tID0gKygwLCBjYWxjVXRpbHNfMS5jb252ZXJ0UGVyY2VudEluVmFsdWUpKG1pbiwgbWF4LCBlLmZyb20pLnRvRml4ZWQoMyk7XG4gICAgICAgICAgICBpZiAoZS50bylcbiAgICAgICAgICAgICAgICBlLnRvID0gKygwLCBjYWxjVXRpbHNfMS5jb252ZXJ0UGVyY2VudEluVmFsdWUpKG1pbiwgbWF4LCBlLnRvKS50b0ZpeGVkKDMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW9kZWwuc2V0U3RhdGUoZSk7XG4gICAgfVxuICAgIG1vZGVsRXZlbnRIYW5kbGVyKGUpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdvbkNoYW5nZScsIGUpO1xuICAgICAgICB0aGlzLnZpZXcuc2V0U3RhdGUoZSk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gUHJlc2VudGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1taXhlZC1vcGVyYXRvcnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9leHRlbnNpb25zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY2FsY1V0aWxzXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vdXRpbHMvY2FsY1V0aWxzXCIpO1xuY29uc3QgYWJzdHJhY3RTdWJWaWV3XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uLy4uL2Fic3RyYWN0U3ViVmlldy9hYnN0cmFjdFN1YlZpZXdcIikpO1xuY2xhc3MgSGFuZGxlIGV4dGVuZHMgYWJzdHJhY3RTdWJWaWV3XzEuZGVmYXVsdCB7XG4gICAgY29uc3RydWN0b3Ioc2xpZGVyKSB7XG4gICAgICAgIHN1cGVyKHNsaWRlcik7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4LCBmcm9tLCBob3Jpem9udGFsLCB9ID0gc3RhdGU7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUpLCB7IG1pbiwgbWF4LCBmcm9tLCBob3Jpem9udGFsIH0pO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICBnZXRQb3NpdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgY29uc3Qgc3ViVmlld1RvcCA9IHRoaXMuc3ViVmlldy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgICAgICAgICBjb25zdCBzbGlkZXJUb3AgPSB0aGlzLnNsaWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgICAgICAgICByZXR1cm4gc3ViVmlld1RvcCAtIHNsaWRlclRvcCArIHRoaXMuc3ViVmlldy5vZmZzZXRIZWlnaHQgLyAyO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN1YlZpZXdMZWZ0ID0gdGhpcy5zdWJWaWV3LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgICAgIGNvbnN0IHNsaWRlckxlZnQgPSB0aGlzLnNsaWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgICAgICByZXR1cm4gc3ViVmlld0xlZnQgLSBzbGlkZXJMZWZ0ICsgdGhpcy5zdWJWaWV3Lm9mZnNldFdpZHRoIC8gMjtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVTdWJWaWV3KCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnU3ViVmlld0V2ZW50Jyk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50TGlzdGVuZXIoKTtcbiAgICB9XG4gICAgY3JlYXRlU3ViVmlldygpIHtcbiAgICAgICAgdGhpcy5zdWJWaWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5jbGFzc0xpc3QuYWRkKCdqcS1zbGlkZXJfX2hhbmRsZScpO1xuICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmRDaGlsZCh0aGlzLnN1YlZpZXcpO1xuICAgIH1cbiAgICBiaW5kRXZlbnRMaXN0ZW5lcigpIHtcbiAgICAgICAgdGhpcy5wb2ludGVyU3RhcnQgPSB0aGlzLnBvaW50ZXJTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnN1YlZpZXcuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCB0aGlzLnBvaW50ZXJTdGFydCk7XG4gICAgfVxuICAgIHBvaW50ZXJTdGFydCgpIHtcbiAgICAgICAgdGhpcy5wb2ludGVySGFuZGxlciA9IHRoaXMucG9pbnRlckhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgdGhpcy5wb2ludGVySGFuZGxlcik7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCAoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCB0aGlzLnBvaW50ZXJIYW5kbGVyKTtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIHRoaXMucG9pbnRlckhhbmRsZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcG9pbnRlckhhbmRsZXIoZSkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ1N1YlZpZXdFdmVudCcsIHtcbiAgICAgICAgICAgIHRhcmdldDogJ2hhbmRsZScsXG4gICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5zdGF0ZS5ob3Jpem9udGFsXG4gICAgICAgICAgICAgICAgPyBlLmNsaWVudFkgLSB0aGlzLnNsaWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3BcbiAgICAgICAgICAgICAgICA6IGUuY2xpZW50WCAtIHRoaXMuc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIGZyb20sIGhvcml6b250YWwsIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBpc051bWJlcnMgPSB0eXBlb2YgbWluID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgbWF4ID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgZnJvbSA9PT0gJ251bWJlcic7XG4gICAgICAgIGlmIChpc051bWJlcnMpIHtcbiAgICAgICAgICAgIGlmIChob3Jpem9udGFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJWaWV3LnN0eWxlLnRvcCA9IGAkeygwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCBmcm9tKX0lYDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN1YlZpZXcuc3R5bGUubGVmdCA9IGAkeygwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCBmcm9tKX0lYDtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IEhhbmRsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY2FsY1V0aWxzXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vdXRpbHMvY2FsY1V0aWxzXCIpO1xuY29uc3QgSGFuZGxlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vSGFuZGxlXCIpKTtcbmNsYXNzIFNlY29uZEhhbmRsZSBleHRlbmRzIEhhbmRsZV8xLmRlZmF1bHQge1xuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIHRvLCBob3Jpem9udGFsLCB9ID0gc3RhdGU7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUpLCB7IG1pbiwgbWF4LCB0bywgaG9yaXpvbnRhbCB9KTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgcG9pbnRlckhhbmRsZXIoZSkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ1N1YlZpZXdFdmVudCcsIHtcbiAgICAgICAgICAgIHRhcmdldDogJ3NlY29uZEhhbmRsZScsXG4gICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5zdGF0ZS5ob3Jpem9udGFsXG4gICAgICAgICAgICAgICAgPyBlLmNsaWVudFkgLSB0aGlzLnNsaWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3BcbiAgICAgICAgICAgICAgICA6IGUuY2xpZW50WCAtIHRoaXMuc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIHRvLCBob3Jpem9udGFsLCB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgaXNOdW1iZXJzID0gdHlwZW9mIG1pbiA9PT0gJ251bWJlcicgJiYgdHlwZW9mIG1heCA9PT0gJ251bWJlcicgJiYgdHlwZW9mIHRvID09PSAnbnVtYmVyJztcbiAgICAgICAgaWYgKGlzTnVtYmVycykge1xuICAgICAgICAgICAgaWYgKGhvcml6b250YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YlZpZXcuc3R5bGUudG9wID0gYCR7KDAsIGNhbGNVdGlsc18xLmNvbnZlcnRWYWx1ZUluUGVyY2VudCkobWluLCBtYXgsIHRvKX0lYDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN1YlZpZXcuc3R5bGUubGVmdCA9IGAkeygwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCB0byl9JWA7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBTZWNvbmRIYW5kbGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNhbGNVdGlsc18xID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL3V0aWxzL2NhbGNVdGlsc1wiKTtcbmNvbnN0IGFic3RyYWN0U3ViVmlld18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi8uLi9hYnN0cmFjdFN1YlZpZXcvYWJzdHJhY3RTdWJWaWV3XCIpKTtcbmNsYXNzIFNjYWxlIGV4dGVuZHMgYWJzdHJhY3RTdWJWaWV3XzEuZGVmYXVsdCB7XG4gICAgY29uc3RydWN0b3Ioc2xpZGVyKSB7XG4gICAgICAgIHN1cGVyKHNsaWRlcik7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4LCBzdGVwLCBob3Jpem9udGFsLCBzY2FsZURlc3RpbnksIH0gPSBzdGF0ZTtcbiAgICAgICAgY29uc3Qgb2xkU3RhdGUgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZSksIHsgbWluLCBtYXgsIHN0ZXAsIGhvcml6b250YWwsIHNjYWxlRGVzdGlueSB9KTtcbiAgICAgICAgaWYgKG9sZFN0YXRlICE9PSBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlKSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmNyZWF0ZVN1YlZpZXcoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCdTdWJWaWV3RXZlbnQnKTtcbiAgICB9XG4gICAgY3JlYXRlU3ViVmlldygpIHtcbiAgICAgICAgdGhpcy5zdWJWaWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5jbGFzc0xpc3QuYWRkKCdqcS1zbGlkZXJfX3NjYWxlJyk7XG4gICAgICAgIHRoaXMuc2xpZGVyLmFwcGVuZENoaWxkKHRoaXMuc3ViVmlldyk7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCwgc3RlcCwgaG9yaXpvbnRhbCwgc2NhbGVEZXN0aW55LCB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgaXNDb3JyZWN0UGFyYW1zID0gdHlwZW9mIG1pbiA9PT0gJ251bWJlcicgJiYgdHlwZW9mIG1heCA9PT0gJ251bWJlcicgJiYgdHlwZW9mIHNjYWxlRGVzdGlueSA9PT0gJ251bWJlcidcbiAgICAgICAgICAgICYmIHR5cGVvZiBzdGVwID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgaG9yaXpvbnRhbCA9PT0gJ2Jvb2xlYW4nO1xuICAgICAgICBpZiAoaXNDb3JyZWN0UGFyYW1zKSB7XG4gICAgICAgICAgICBsZXQgcGlwcyA9IHRoaXMuY3JlYXRlUGlwRnJhZ21lbnQobWluLCBtYXgsIG1pbik7XG4gICAgICAgICAgICBmb3IgKGxldCBwaXAgPSBtaW4gKyAxOyBwaXAgPCBtYXg7IHBpcCArPSAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBpcCAlIHNjYWxlRGVzdGlueSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBwaXBzICs9IHRoaXMuY3JlYXRlUGlwRnJhZ21lbnQobWluLCBtYXgsIHBpcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGlwcyArPSB0aGlzLmNyZWF0ZVBpcEZyYWdtZW50KG1pbiwgbWF4LCBtYXgpO1xuICAgICAgICAgICAgdGhpcy5zdWJWaWV3LmlubmVySFRNTCA9IHBpcHM7XG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudExpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY3JlYXRlUGlwRnJhZ21lbnQobWluLCBtYXgsIHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmhvcml6b250YWwpIHtcbiAgICAgICAgICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwianEtc2xpZGVyX19zY2FsZS1waXBcIiBzdHlsZT1cInRvcDokeygwLCBjYWxjVXRpbHNfMS5jb252ZXJ0UGVyY2VudEluVmFsdWUpKDAsIHRoaXMuc2xpZGVyLmNsaWVudEhlaWdodCwgKDAsIGNhbGNVdGlsc18xLmNvbnZlcnRWYWx1ZUluUGVyY2VudCkobWluLCBtYXgsIHZhbHVlKSl9cHhcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImpxLXNsaWRlcl9fc2NhbGUtbGFiZWxcIj4ke3ZhbHVlfTwvZGl2PlxuICAgICAgPC9kaXY+YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImpxLXNsaWRlcl9fc2NhbGUtcGlwXCIgc3R5bGU9XCJsZWZ0OiR7KDAsIGNhbGNVdGlsc18xLmNvbnZlcnRWYWx1ZUluUGVyY2VudCkobWluLCBtYXgsIHZhbHVlKX0lXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJqcS1zbGlkZXJfX3NjYWxlLWxhYmVsXCI+JHt2YWx1ZX08L2Rpdj5cbiAgICAgIDwvZGl2PmA7XG4gICAgfVxuICAgIGJpbmRFdmVudExpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLmNsaWNrSGFuZGxlciA9IHRoaXMuY2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5xdWVyeVNlbGVjdG9yQWxsKCcuanEtc2xpZGVyX19zY2FsZS1sYWJlbCcpLmZvckVhY2goKHBpcCkgPT4ge1xuICAgICAgICAgICAgaWYgKHBpcCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2xpY2tIYW5kbGVyKGUpIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgbWluLCBtYXggfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG1pbiA9PT0gJ251bWJlcicgJiYgdHlwZW9mIG1heCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBsZXQgcG9zaXRpb24gPSB0aGlzLnN0YXRlLmhvcml6b250YWxcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnNsaWRlci5jbGllbnRIZWlnaHQgLyAxMDAgKiAoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgK2UudGFyZ2V0LmlubmVySFRNTClcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnNsaWRlci5jbGllbnRXaWR0aCAvIDEwMCAqICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCArZS50YXJnZXQuaW5uZXJIVE1MKTtcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gbWluO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnU3ViVmlld0V2ZW50JywgeyB0YXJnZXQ6ICd0cmFjaycsIHBvc2l0aW9uIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gU2NhbGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNhbGNVdGlsc18xID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL3V0aWxzL2NhbGNVdGlsc1wiKTtcbmNvbnN0IFRpcF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1RpcFwiKSk7XG5jbGFzcyBTZWNvbmRUaXAgZXh0ZW5kcyBUaXBfMS5kZWZhdWx0IHtcbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBjb25zdCB7IG1pbiA9IHRoaXMuc3RhdGUubWluLCBtYXggPSB0aGlzLnN0YXRlLm1heCwgdG8gPSB0aGlzLnN0YXRlLnRvLCBob3Jpem9udGFsID0gdGhpcy5zdGF0ZS5ob3Jpem9udGFsLCB9ID0gc3RhdGU7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBtaW4sIG1heCwgdG8sIGhvcml6b250YWwsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCwgdG8sIGhvcml6b250YWwsIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBpc051bWJlcnMgPSB0eXBlb2YgbWluID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgbWF4ID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgdG8gPT09ICdudW1iZXInO1xuICAgICAgICBpZiAoaXNOdW1iZXJzKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG4gICAgICAgICAgICB0aGlzLmlzRG91YmxlID8gdGhpcy5zdWJWaWV3LnN0eWxlLm9wYWNpdHkgPSAnMCcgOiB0aGlzLnN1YlZpZXcuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgIHRoaXMuc3ViVmlldy50ZXh0Q29udGVudCA9IHRvLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZiAoaG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3ViVmlldy5zdHlsZS50b3AgPSBgJHsoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgdG8pfSVgO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3ViVmlldy5zdHlsZS5sZWZ0ID0gYCR7KDAsIGNhbGNVdGlsc18xLmNvbnZlcnRWYWx1ZUluUGVyY2VudCkobWluLCBtYXgsIHRvKX0lYDtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFNlY29uZFRpcDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY2FsY1V0aWxzXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vdXRpbHMvY2FsY1V0aWxzXCIpO1xuY29uc3QgYWJzdHJhY3RTdWJWaWV3XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uLy4uL2Fic3RyYWN0U3ViVmlldy9hYnN0cmFjdFN1YlZpZXdcIikpO1xuY2xhc3MgVGlwIGV4dGVuZHMgYWJzdHJhY3RTdWJWaWV3XzEuZGVmYXVsdCB7XG4gICAgY29uc3RydWN0b3Ioc2xpZGVyKSB7XG4gICAgICAgIHN1cGVyKHNsaWRlcik7XG4gICAgICAgIHRoaXMuaXNEb3VibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIGZyb20sIHRvLCBob3Jpem9udGFsLCB9ID0gc3RhdGU7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBtaW4sIG1heCwgZnJvbSwgdG8sIGhvcml6b250YWwsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIGNoYW5nZUlzRG91YmxlKHZhbCkge1xuICAgICAgICB0aGlzLmlzRG91YmxlID0gdmFsO1xuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmNyZWF0ZVN1YlZpZXcoKTtcbiAgICB9XG4gICAgY3JlYXRlU3ViVmlldygpIHtcbiAgICAgICAgdGhpcy5zdWJWaWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5jbGFzc0xpc3QuYWRkKCdqcS1zbGlkZXJfX3RpcCcpO1xuICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmRDaGlsZCh0aGlzLnN1YlZpZXcpO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIGZyb20sIGhvcml6b250YWwsIHRvLCB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgaXNOdW1iZXJzID0gdHlwZW9mIG1pbiA9PT0gJ251bWJlcicgJiYgdHlwZW9mIG1heCA9PT0gJ251bWJlcidcbiAgICAgICAgICAgICYmIHR5cGVvZiBmcm9tID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgZnJvbSA9PT0gJ251bWJlcic7XG4gICAgICAgIGlmIChpc051bWJlcnMpIHtcbiAgICAgICAgICAgIHRoaXMuc3ViVmlldy50ZXh0Q29udGVudCA9IHRoaXMuaXNEb3VibGUgPyBgJHtmcm9tfSAtICR7dG99YCA6IGZyb20udG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGlmIChob3Jpem9udGFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJWaWV3LnN0eWxlLnRvcCA9IGAkeygwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCBmcm9tKX0lYDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN1YlZpZXcuc3R5bGUubGVmdCA9IGAkeygwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCBmcm9tKX0lYDtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFRpcDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY2FsY1V0aWxzXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vdXRpbHMvY2FsY1V0aWxzXCIpO1xuY29uc3QgYWJzdHJhY3RTdWJWaWV3XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uLy4uL2Fic3RyYWN0U3ViVmlldy9hYnN0cmFjdFN1YlZpZXdcIikpO1xuY2xhc3MgVHJhY2sgZXh0ZW5kcyBhYnN0cmFjdFN1YlZpZXdfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3RvcihzbGlkZXIpIHtcbiAgICAgICAgc3VwZXIoc2xpZGVyKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIGZyb20sIHRvLCBob3Jpem9udGFsLCByYW5nZSwgcHJvZ3Jlc3MsIH0gPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZSksIHsgbWluLCBtYXgsIGZyb20sIHRvLCBob3Jpem9udGFsLCByYW5nZSwgcHJvZ3Jlc3MgfSk7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIGNyZWF0ZVN1YlZpZXcoKSB7XG4gICAgICAgIHRoaXMuc3ViVmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnN1YlZpZXcuY2xhc3NMaXN0LmFkZCgnanEtc2xpZGVyX190cmFjaycpO1xuICAgICAgICB0aGlzLnByb2dyZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MuY2xhc3NMaXN0LmFkZCgnanEtc2xpZGVyX19wcm9ncmVzcycpO1xuICAgICAgICB0aGlzLnN1YlZpZXcuYXBwZW5kQ2hpbGQodGhpcy5wcm9ncmVzcyk7XG4gICAgICAgIHRoaXMuc2xpZGVyLmFwcGVuZENoaWxkKHRoaXMuc3ViVmlldyk7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlU3ViVmlldygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ1N1YlZpZXdFdmVudCcpO1xuICAgICAgICB0aGlzLmJpbmRFdmVudExpc3RlbmVyKCk7XG4gICAgfVxuICAgIGJpbmRFdmVudExpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLmNsaWNrSGFuZGxlciA9IHRoaXMuY2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyKTtcbiAgICB9XG4gICAgY2xpY2tIYW5kbGVyKGUpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdTdWJWaWV3RXZlbnQnLCB7XG4gICAgICAgICAgICB0YXJnZXQ6ICd0cmFjaycsXG4gICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5zdGF0ZS5ob3Jpem9udGFsXG4gICAgICAgICAgICAgICAgPyBlLmNsaWVudFkgLSB0aGlzLnNsaWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3BcbiAgICAgICAgICAgICAgICA6IGUuY2xpZW50WCAtIHRoaXMuc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIGZyb20sIHRvLCBob3Jpem9udGFsLCByYW5nZSwgcHJvZ3Jlc3MsIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBpZiAoIXByb2dyZXNzKSB7XG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzLnJlbW92ZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGlzTnVtYmVycyA9IHR5cGVvZiBtaW4gPT09ICdudW1iZXInICYmIHR5cGVvZiBtYXggPT09ICdudW1iZXInXG4gICAgICAgICAgICAmJiB0eXBlb2YgZnJvbSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIHRvID09PSAnbnVtYmVyJztcbiAgICAgICAgaWYgKGlzTnVtYmVycykge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSAoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgZnJvbSk7XG4gICAgICAgICAgICBjb25zdCBlbmQgPSAoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgdG8pO1xuICAgICAgICAgICAgaWYgKGhvcml6b250YWwpIHtcbiAgICAgICAgICAgICAgICBpZiAocmFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gZW5kIC0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3Muc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fSVgO1xuICAgICAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbWl4ZWQtb3BlcmF0b3JzXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3Muc3R5bGUubWFyZ2luVG9wID0gYCR7dGhpcy5zbGlkZXIuY2xpZW50SGVpZ2h0IC8gMTAwICogc3RhcnR9cHhgO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5zdHlsZS5oZWlnaHQgPSBgJHtzdGFydH0lYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJhbmdlKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBlbmQgLSBzdGFydDtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzLnN0eWxlLndpZHRoID0gYCR7d2lkdGh9JWA7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5zdHlsZS5tYXJnaW5MZWZ0ID0gYCR7c3RhcnR9JWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzLnN0eWxlLndpZHRoID0gYCR7c3RhcnR9JWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBUcmFjaztcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyogZXNsaW50LWRpc2FibGUgbm8tbWl4ZWQtb3BlcmF0b3JzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvZXh0ZW5zaW9ucyAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmNvbnN0IEhhbmRsZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1N1YlZpZXdDb21wb25lbnRzL0hhbmRsZS9IYW5kbGVcIikpO1xuY29uc3QgRXZlbnRDcmVhdG9yXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL0V2ZW50Q3JlYXRvci9FdmVudENyZWF0b3JcIikpO1xuY29uc3QgU2Vjb25kSGFuZGxlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vU3ViVmlld0NvbXBvbmVudHMvSGFuZGxlL1NlY29uZEhhbmRsZVwiKSk7XG5jb25zdCBUaXBfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9TdWJWaWV3Q29tcG9uZW50cy9UaXAvVGlwXCIpKTtcbmNvbnN0IFNlY29uZFRpcF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1N1YlZpZXdDb21wb25lbnRzL1RpcC9TZWNvbmRUaXBcIikpO1xuY29uc3QgVHJhY2tfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9TdWJWaWV3Q29tcG9uZW50cy9UcmFjay9UcmFja1wiKSk7XG5jb25zdCBjYWxjVXRpbHNfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9jYWxjVXRpbHNcIik7XG5jb25zdCBTY2FsZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1N1YlZpZXdDb21wb25lbnRzL1NjYWxlL1NjYWxlXCIpKTtcbmNsYXNzIFZpZXcgZXh0ZW5kcyBFdmVudENyZWF0b3JfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlRWxlbSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm5vZGVFbGVtID0gbm9kZUVsZW07XG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IFtdO1xuICAgICAgICB0aGlzLnN0YXRlID0ge307XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICB0aGlzLmNoZWNrSXNDaGFuZ2VkU2V0dGluZ3Moc3RhdGUpO1xuICAgICAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlKSwgc3RhdGUpO1xuICAgICAgICB0aGlzLnVwZGF0ZSh0aGlzLnN0YXRlKTtcbiAgICAgICAgdGhpcy5jaGVja1RpcHMoKTtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVTbGlkZXIoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCdWaWV3RXZlbnQnKTtcbiAgICB9XG4gICAgY3JlYXRlU2xpZGVyKCkge1xuICAgICAgICB0aGlzLnNsaWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnNsaWRlci5jbGFzc0xpc3QuYWRkKCdqcS1zbGlkZXInKTtcbiAgICAgICAgdGhpcy5ub2RlRWxlbS5hcHBlbmRDaGlsZCh0aGlzLnNsaWRlcik7XG4gICAgfVxuICAgIGNyZWF0ZUNvbXBvbmVudHMoc3RhdGUpIHtcbiAgICAgICAgY29uc3QgeyByYW5nZSwgdGlwLCBzY2FsZSwgaG9yaXpvbnRhbCwgfSA9IHN0YXRlO1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMucHVzaChuZXcgSGFuZGxlXzEuZGVmYXVsdCh0aGlzLnNsaWRlcikpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMucHVzaChuZXcgVHJhY2tfMS5kZWZhdWx0KHRoaXMuc2xpZGVyKSk7XG4gICAgICAgIGlmICh0aXApIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50cy5wdXNoKG5ldyBUaXBfMS5kZWZhdWx0KHRoaXMuc2xpZGVyKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMucHVzaChuZXcgU2Vjb25kSGFuZGxlXzEuZGVmYXVsdCh0aGlzLnNsaWRlcikpO1xuICAgICAgICAgICAgaWYgKHRpcCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50cy5wdXNoKG5ldyBTZWNvbmRUaXBfMS5kZWZhdWx0KHRoaXMuc2xpZGVyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjYWxlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMucHVzaChuZXcgU2NhbGVfMS5kZWZhdWx0KHRoaXMuc2xpZGVyKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhvcml6b250YWwpIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ2pxLXNsaWRlci0taG9yaXpvbnRhbCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zbGlkZXIuY2xhc3NMaXN0LnJlbW92ZSgnanEtc2xpZGVyLS1ob3Jpem9udGFsJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYmluZEV2ZW50TGlzdGVuZXIoKSB7XG4gICAgICAgIHRoaXMuc3ViVmlld0V2ZW50SGFuZGxlciA9IHRoaXMuc3ViVmlld0V2ZW50SGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMuZm9yRWFjaCgoY29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50LmV2ZW50cy5TdWJWaWV3RXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcignU3ViVmlld0V2ZW50JywgdGhpcy5zdWJWaWV3RXZlbnRIYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN1YlZpZXdFdmVudEhhbmRsZXIoZSkge1xuICAgICAgICBjb25zdCBzaXplID0gdGhpcy5zdGF0ZS5ob3Jpem9udGFsID8gdGhpcy5zbGlkZXIuY2xpZW50SGVpZ2h0IDogdGhpcy5zbGlkZXIuY2xpZW50V2lkdGg7XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gJ2hhbmRsZScpIHtcbiAgICAgICAgICAgIGNvbnN0IGZyb20gPSAoMCwgY2FsY1V0aWxzXzEuY29udmVydFBpeGVsSW5QZXJjZW50KShzaXplLCBlLnBvc2l0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnVmlld0V2ZW50JywgeyBmcm9tIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gJ3NlY29uZEhhbmRsZScpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvID0gKDAsIGNhbGNVdGlsc18xLmNvbnZlcnRQaXhlbEluUGVyY2VudCkoc2l6ZSwgZS5wb3NpdGlvbik7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ1ZpZXdFdmVudCcsIHsgdG8gfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUudGFyZ2V0ID09PSAndHJhY2snIHx8IGUudGFyZ2V0ID09PSAnc2NhbGUnKSB7XG4gICAgICAgICAgICBjb25zdCBoYW5kbGVzID0gdGhpcy5nZXRBcnJPZkNvbmNyZXRlU3ViVmlldyhIYW5kbGVfMS5kZWZhdWx0KTtcbiAgICAgICAgICAgIGNvbnN0IGZyb20gPSBoYW5kbGVzWzBdLmdldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5yYW5nZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvID0gaGFuZGxlc1sxXS5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhmcm9tIC0gZS5wb3NpdGlvbikgPCB0byAtIGUucG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdWaWV3RXZlbnQnLCB7IGZyb206ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0UGl4ZWxJblBlcmNlbnQpKHNpemUsIGUucG9zaXRpb24pIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnVmlld0V2ZW50JywgeyB0bzogKDAsIGNhbGNVdGlsc18xLmNvbnZlcnRQaXhlbEluUGVyY2VudCkoc2l6ZSwgZS5wb3NpdGlvbikgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdWaWV3RXZlbnQnLCB7IGZyb206ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0UGl4ZWxJblBlcmNlbnQpKHNpemUsIGUucG9zaXRpb24pIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNoZWNrSXNDaGFuZ2VkU2V0dGluZ3Moc3RhdGUpIHtcbiAgICAgICAgY29uc3QgeyByYW5nZSwgdGlwLCBzY2FsZSwgaG9yaXpvbnRhbCwgcHJvZ3Jlc3MsIHNjYWxlRGVzdGlueSwgfSA9IHN0YXRlO1xuICAgICAgICBjb25zdCBpc1VwZGF0ZVNldHRpbmdzID0gcmFuZ2UgIT09IHRoaXMuc3RhdGUucmFuZ2UgfHwgdGlwICE9PSB0aGlzLnN0YXRlLnRpcFxuICAgICAgICAgICAgfHwgc2NhbGUgIT09IHRoaXMuc3RhdGUuc2NhbGUgfHwgaG9yaXpvbnRhbCAhPT0gdGhpcy5zdGF0ZS5ob3Jpem9udGFsXG4gICAgICAgICAgICB8fCBwcm9ncmVzcyAhPT0gdGhpcy5zdGF0ZS5wcm9ncmVzcyB8fCBzY2FsZURlc3RpbnkgIT09IHRoaXMuc3RhdGUuc2NhbGVEZXN0aW55O1xuICAgICAgICBpZiAoaXNVcGRhdGVTZXR0aW5ncykge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzID0gW107XG4gICAgICAgICAgICB0aGlzLnNsaWRlci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29tcG9uZW50cyhzdGF0ZSk7XG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudExpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2hlY2tUaXBzKCkge1xuICAgICAgICBjb25zdCB7IHRpcCwgcmFuZ2UsIGhvcml6b250YWwgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGlmICh0aXAgJiYgcmFuZ2UpIHtcbiAgICAgICAgICAgIGNvbnN0IHRpcHMgPSB0aGlzLmdldEFyck9mQ29uY3JldGVTdWJWaWV3KFRpcF8xLmRlZmF1bHQpO1xuICAgICAgICAgICAgY29uc3Qgc2l6ZSA9IGhvcml6b250YWwgPyB0aXBzWzFdLnN1YlZpZXcuY2xpZW50SGVpZ2h0IDogdGlwc1sxXS5zdWJWaWV3Lm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgY29uc3QgZmlyc3RQb3NpdGlvbiA9IHRpcHNbMF0uZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIGNvbnN0IHNlY29uZFBvc2l0aW9uID0gdGlwc1sxXS5nZXRQb3NpdGlvbigpIC0gc2l6ZTtcbiAgICAgICAgICAgIGlmIChmaXJzdFBvc2l0aW9uID4gc2Vjb25kUG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICB0aXBzLmZvckVhY2goKHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdC5jaGFuZ2VJc0RvdWJsZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdC5zZXRTdGF0ZSh0aGlzLnN0YXRlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRpcHMuZm9yRWFjaCgodCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0LmNoYW5nZUlzRG91YmxlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGUoc3RhdGUpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzLmZvckVhY2goKGNvbXBvbmVudCkgPT4gY29tcG9uZW50LnNldFN0YXRlKHN0YXRlKSk7XG4gICAgfVxuICAgIGdldEFyck9mQ29uY3JldGVTdWJWaWV3KGluc3RhbmNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudHMuZmlsdGVyKChjb21wb25lbnQpID0+IHsgdmFyIF9hOyByZXR1cm4gKF9hID0gY29tcG9uZW50IGluc3RhbmNlb2YgaW5zdGFuY2UpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGNvbXBvbmVudDsgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gVmlldztcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRXZlbnRDcmVhdG9yXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uLy4uL0V2ZW50Q3JlYXRvci9FdmVudENyZWF0b3JcIikpO1xuY2xhc3MgU3ViVmlldyBleHRlbmRzIEV2ZW50Q3JlYXRvcl8xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKHNsaWRlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnNsaWRlciA9IHNsaWRlcjtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHt9O1xuICAgIH1cbiAgICBnZXRQb3NpdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3ViVmlldy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc3ViVmlldy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFN1YlZpZXc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4vKiBlc2xpbnQtZGlzYWJsZSBjb25zaXN0ZW50LXJldHVybiAqL1xuLyogZXNsaW50LWRpc2FibGUgZnVuYy1uYW1lcyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L2V4dGVuc2lvbnMgKi9cbnJlcXVpcmUoXCIuL3NsaWRlci5zY3NzXCIpO1xuY29uc3QgUHJlc2VudGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vQXBwQ29tcG9uZW50cy9QcmVzZW50ZXIvUHJlc2VudGVyXCIpKTtcbihmdW5jdGlvbiAoJCkge1xuICAgIGNvbnN0IG1ldGhvZHMgPSB7XG4gICAgICAgIGluaXQoc3RhdGUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghJCh0aGlzKS5kYXRhKCdqcVNsaWRlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmRhdGEoKS5qcVNsaWRlciA9IG5ldyBQcmVzZW50ZXJfMS5kZWZhdWx0KHRoaXMsIHN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB1cGRhdGUoc3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QganFTbGlkZXIgPSAkKHRoaXMpLmRhdGEoJ2pxU2xpZGVyJyk7XG4gICAgICAgICAgICAgICAganFTbGlkZXIubW9kZWwuc2V0U3RhdGUoc3RhdGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFN0YXRlKCkge1xuICAgICAgICAgICAgY29uc3QganFTbGlkZXIgPSAkKHRoaXMpLmRhdGEoJ2pxU2xpZGVyJyk7XG4gICAgICAgICAgICBjb25zdCBzdGF0ZSA9IGpxU2xpZGVyLm1vZGVsLmdldFN0YXRlKCk7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgIH0sXG4gICAgICAgIG9uQ2hhbmdlKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGpxU2xpZGVyID0gJCh0aGlzKS5kYXRhKCdqcVNsaWRlcicpO1xuICAgICAgICAgICAgICAgIGpxU2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ29uQ2hhbmdlJywgKGUpID0+IGNhbGxiYWNrKGUpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgIH07XG4gICAgJC5mbi5qcVNsaWRlciA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICAgIGNvbnN0IGlzRW1wdHlBcmdzID0gYXJncy5sZW5ndGggPT09IDAgfHwgdHlwZW9mIGFyZ3NbMF0gPT09ICdvYmplY3QnO1xuICAgICAgICBjb25zdCBpc1VwZGF0ZSA9IGFyZ3MubGVuZ3RoID49IDIgJiYgYXJnc1swXSA9PT0gJ3VwZGF0ZScgJiYgdHlwZW9mIGFyZ3NbMV0gPT09ICdvYmplY3QnO1xuICAgICAgICBjb25zdCBpc0dldFN0YXRlID0gYXJncy5sZW5ndGggPT09IDEgJiYgYXJnc1swXSA9PT0gJ2dldFN0YXRlJztcbiAgICAgICAgY29uc3QgaXNCaW5kRXZlbnRMaXN0ZW5lciA9IGFyZ3MubGVuZ3RoID49IDIgJiYgYXJnc1swXSA9PT0gJ29uQ2hhbmdlJyAmJiB0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgICAgaWYgKGlzRW1wdHlBcmdzKSB7XG4gICAgICAgICAgICBjb25zdCBzdGF0ZSA9IGFyZ3NbMF0gPyBhcmdzWzBdIDoge307XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kcy5pbml0LmNhbGwodGhpcywgc3RhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1VwZGF0ZSkge1xuICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSBhcmdzWzFdO1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZHMudXBkYXRlLmNhbGwodGhpcywgc3RhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0dldFN0YXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kcy5nZXRTdGF0ZS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0JpbmRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IGFyZ3NbMV07XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kcy5vbkNoYW5nZS5jYWxsKHRoaXMsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH07XG59KGpRdWVyeSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNvbnZlcnRQZXJjZW50SW5WYWx1ZSA9IGV4cG9ydHMuY29udmVydFBpeGVsSW5QZXJjZW50ID0gZXhwb3J0cy5jb252ZXJ0VmFsdWVJblBlcmNlbnQgPSB2b2lkIDA7XG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1taXhlZC1vcGVyYXRvcnMgKi9cbmZ1bmN0aW9uIGNvbnZlcnRWYWx1ZUluUGVyY2VudChtaW4sIG1heCwgdmFsdWUpIHtcbiAgICByZXR1cm4gMTAwIC8gKG1heCAtIG1pbikgKiAodmFsdWUgLSBtaW4pO1xufVxuZXhwb3J0cy5jb252ZXJ0VmFsdWVJblBlcmNlbnQgPSBjb252ZXJ0VmFsdWVJblBlcmNlbnQ7XG5mdW5jdGlvbiBjb252ZXJ0UGl4ZWxJblBlcmNlbnQod2lkdGgsIHZhbHVlKSB7XG4gICAgcmV0dXJuIDEwMCAvIHdpZHRoICogdmFsdWU7XG59XG5leHBvcnRzLmNvbnZlcnRQaXhlbEluUGVyY2VudCA9IGNvbnZlcnRQaXhlbEluUGVyY2VudDtcbmZ1bmN0aW9uIGNvbnZlcnRQZXJjZW50SW5WYWx1ZShtaW4sIG1heCwgcGVyY2VudCkge1xuICAgIHJldHVybiAobWF4IC0gbWluKSAvIDEwMCAqIHBlcmNlbnQgKyBtaW47XG59XG5leHBvcnRzLmNvbnZlcnRQZXJjZW50SW5WYWx1ZSA9IGNvbnZlcnRQZXJjZW50SW5WYWx1ZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL2FwcC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==