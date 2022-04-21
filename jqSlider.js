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
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const MyEvent_1 = __importDefault(__webpack_require__(/*! ./MyEvent */ "./AppComponents/EventCreator/MyEvent.ts"));
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

/***/ "./AppComponents/EventCreator/MyEvent.ts":
/*!***********************************************!*\
  !*** ./AppComponents/EventCreator/MyEvent.ts ***!
  \***********************************************/
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

/***/ "./AppComponents/Presenter/Presenter.ts":
/*!**********************************************!*\
  !*** ./AppComponents/Presenter/Presenter.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Model_1 = __importDefault(__webpack_require__(/*! ../Model/Model */ "./AppComponents/Model/Model.ts"));
const View_1 = __importDefault(__webpack_require__(/*! ../View/View */ "./AppComponents/View/View.ts"));
const EventCreator_1 = __importDefault(__webpack_require__(/*! ../EventCreator/EventCreator */ "./AppComponents/EventCreator/EventCreator.ts"));
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


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const abstractSubView_1 = __importDefault(__webpack_require__(/*! ../../abstractSubView/abstractSubView */ "./AppComponents/View/abstractSubView/abstractSubView.ts"));
const calcUtils_1 = __webpack_require__(/*! ../../../../utils/calcUtils */ "./utils/calcUtils.ts");
class Handle extends abstractSubView_1.default {
    constructor(slider) {
        super(slider);
        this.init();
    }
    setState(state) {
        const { min, max, from, horizontal } = state;
        this.state = Object.assign(Object.assign({}, this.state), { min,
            max,
            from,
            horizontal });
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
        this.subView.style.zIndex = '2';
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
            target: 'handle',
            position: this.state.horizontal
                ? e.clientY - this.slider.getBoundingClientRect().top
                : e.clientX - this.slider.getBoundingClientRect().left,
        });
    }
    update() {
        const { min, max, from, horizontal } = this.state;
        const isNumbers = typeof min === 'number' &&
            typeof max === 'number' &&
            typeof from === 'number';
        if (isNumbers) {
            if (horizontal) {
                this.subView.style.top = `${(0, calcUtils_1.convertValueInPercent)(min, max, from)}%`;
            }
            else {
                this.subView.style.left = `${(0, calcUtils_1.convertValueInPercent)(min, max, from)}%`;
            }
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
const Handle_1 = __importDefault(__webpack_require__(/*! ./Handle */ "./AppComponents/View/SubViewComponents/Handle/Handle.ts"));
const calcUtils_1 = __webpack_require__(/*! ../../../../utils/calcUtils */ "./utils/calcUtils.ts");
class SecondHandle extends Handle_1.default {
    setState(state) {
        const { min, max, to, horizontal } = state;
        this.state = Object.assign(Object.assign({}, this.state), { min,
            max,
            to,
            horizontal });
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
        const { min, max, to, horizontal } = this.state;
        const isNumbers = typeof min === 'number' &&
            typeof max === 'number' &&
            typeof to === 'number';
        const size = horizontal
            ? this.slider.clientHeight
            : this.slider.clientWidth;
        if (this.getPosition() > size / 2) {
            this.subView.style.zIndex = '1';
        }
        else {
            this.subView.style.zIndex = '3';
        }
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
const abstractSubView_1 = __importDefault(__webpack_require__(/*! ../../abstractSubView/abstractSubView */ "./AppComponents/View/abstractSubView/abstractSubView.ts"));
const calcUtils_1 = __webpack_require__(/*! ../../../../utils/calcUtils */ "./utils/calcUtils.ts");
class Scale extends abstractSubView_1.default {
    constructor(slider) {
        super(slider);
        this.init();
    }
    setState(state) {
        const { min, max, step, horizontal, scaleDestiny } = state;
        const oldState = JSON.stringify(this.state);
        this.state = Object.assign(Object.assign({}, this.state), { min,
            max,
            step,
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
        const { min, max, step, horizontal, scaleDestiny } = this.state;
        const isCorrectParams = typeof min === 'number' &&
            typeof max === 'number' &&
            typeof scaleDestiny === 'number' &&
            typeof step === 'number' &&
            typeof horizontal === 'boolean';
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
      <div class="jq-slider__scale-pip" style="top:
        ${(0, calcUtils_1.convertPercentInValue)(0, this.slider.clientHeight, (0, calcUtils_1.convertValueInPercent)(min, max, value))}px"
      >
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
            const { min, max, horizontal } = this.state;
            if (typeof min === 'number' && typeof max === 'number') {
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
const Tip_1 = __importDefault(__webpack_require__(/*! ./Tip */ "./AppComponents/View/SubViewComponents/Tip/Tip.ts"));
const calcUtils_1 = __webpack_require__(/*! ../../../../utils/calcUtils */ "./utils/calcUtils.ts");
class SecondTip extends Tip_1.default {
    setState(state) {
        const { min = this.state.min, max = this.state.max, to = this.state.to, horizontal = this.state.horizontal, } = state;
        this.state = {
            min,
            max,
            to,
            horizontal,
        };
        this.update();
    }
    update() {
        const { min, max, to, horizontal } = this.state;
        const isNumbers = typeof min === 'number' &&
            typeof max === 'number' &&
            typeof to === 'number';
        if (isNumbers) {
            if (this.isDouble) {
                this.subView.style.opacity = '0';
            }
            else {
                this.subView.style.opacity = '1';
            }
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
const abstractSubView_1 = __importDefault(__webpack_require__(/*! ../../abstractSubView/abstractSubView */ "./AppComponents/View/abstractSubView/abstractSubView.ts"));
const calcUtils_1 = __webpack_require__(/*! ../../../../utils/calcUtils */ "./utils/calcUtils.ts");
class Tip extends abstractSubView_1.default {
    constructor(slider) {
        super(slider);
        this.isDouble = false;
        this.init();
    }
    setState(state) {
        const { min, max, from, to, horizontal } = state;
        this.state = {
            min,
            max,
            from,
            to,
            horizontal,
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
        const { min, max, from, horizontal, to } = this.state;
        const isNumbers = typeof min === 'number' &&
            typeof max === 'number' &&
            typeof from === 'number' &&
            typeof from === 'number';
        if (isNumbers) {
            this.subView.textContent = this.isDouble
                ? `${from} - ${to}`
                : from.toString();
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
const abstractSubView_1 = __importDefault(__webpack_require__(/*! ../../abstractSubView/abstractSubView */ "./AppComponents/View/abstractSubView/abstractSubView.ts"));
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
        if (isNumbers) {
            const start = (0, calcUtils_1.convertValueInPercent)(min, max, from);
            const end = (0, calcUtils_1.convertValueInPercent)(min, max, to);
            if (horizontal) {
                if (range) {
                    const height = end - start;
                    const onePercent = this.slider.clientHeight / 100;
                    this.progress.style.height = `${height}%`;
                    this.progress.style.marginTop = `${onePercent * start}px`;
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
const Handle_1 = __importDefault(__webpack_require__(/*! ./SubViewComponents/Handle/Handle */ "./AppComponents/View/SubViewComponents/Handle/Handle.ts"));
const SecondHandle_1 = __importDefault(__webpack_require__(/*! ./SubViewComponents/Handle/SecondHandle */ "./AppComponents/View/SubViewComponents/Handle/SecondHandle.ts"));
const Scale_1 = __importDefault(__webpack_require__(/*! ./SubViewComponents/Scale/Scale */ "./AppComponents/View/SubViewComponents/Scale/Scale.ts"));
const Tip_1 = __importDefault(__webpack_require__(/*! ./SubViewComponents/Tip/Tip */ "./AppComponents/View/SubViewComponents/Tip/Tip.ts"));
const SecondTip_1 = __importDefault(__webpack_require__(/*! ./SubViewComponents/Tip/SecondTip */ "./AppComponents/View/SubViewComponents/Tip/SecondTip.ts"));
const Track_1 = __importDefault(__webpack_require__(/*! ./SubViewComponents/Track/Track */ "./AppComponents/View/SubViewComponents/Track/Track.ts"));
const EventCreator_1 = __importDefault(__webpack_require__(/*! ../EventCreator/EventCreator */ "./AppComponents/EventCreator/EventCreator.ts"));
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
        const size = this.state.horizontal
            ? this.slider.clientHeight
            : this.slider.clientWidth;
        if (e.target === 'handle') {
            this.dispatchEvent('ViewEvent', {
                from: (0, calcUtils_1.convertPixelInPercent)(size, e.position),
            });
        }
        if (e.target === 'secondHandle') {
            this.dispatchEvent('ViewEvent', {
                to: (0, calcUtils_1.convertPixelInPercent)(size, e.position),
            });
        }
        if (e.target === 'track' || e.target === 'scale') {
            const handles = this.getArrOfConcreteSubView(Handle_1.default);
            const from = handles[0].getPosition();
            if (this.state.range) {
                const to = handles[1].getPosition();
                if (Math.abs(from - e.position) < to - e.position) {
                    this.dispatchEvent('ViewEvent', {
                        from: (0, calcUtils_1.convertPixelInPercent)(size, e.position),
                    });
                    return;
                }
                if (Math.abs(from - e.position) === to - e.position) {
                    this.dispatchEvent('ViewEvent', {
                        from: (0, calcUtils_1.convertPixelInPercent)(size, e.position),
                    });
                    return;
                }
                this.dispatchEvent('ViewEvent', {
                    to: (0, calcUtils_1.convertPixelInPercent)(size, e.position),
                });
                return;
            }
            this.dispatchEvent('ViewEvent', {
                from: (0, calcUtils_1.convertPixelInPercent)(size, e.position),
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
        if (tip && range) {
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


/* eslint-disable fsd/no-function-declaration-in-event-listener */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Presenter_1 = __importDefault(__webpack_require__(/*! ./AppComponents/Presenter/Presenter */ "./AppComponents/Presenter/Presenter.ts"));
__webpack_require__(/*! ./slider.scss */ "./slider.scss");
const methods = {
    init(state) {
        return this.each(function () {
            if (typeof state === 'object') {
                if (!$(this).data('jqSlider')) {
                    $(this).data().jqSlider = new Presenter_1.default(this, state);
                }
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
    return $.error('This method does not exist');
};


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM1RGE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsNkJBQTZCLEdBQUcsNkJBQTZCLEdBQUcsNkJBQTZCO0FBQzdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7Ozs7Ozs7VUNmN0I7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc2xpZGVyLnNjc3M/MGJhOSIsIndlYnBhY2s6Ly8vLi9BcHBDb21wb25lbnRzL0V2ZW50Q3JlYXRvci9FdmVudENyZWF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vQXBwQ29tcG9uZW50cy9FdmVudENyZWF0b3IvTXlFdmVudC50cyIsIndlYnBhY2s6Ly8vLi9BcHBDb21wb25lbnRzL01vZGVsL01vZGVsLnRzIiwid2VicGFjazovLy8uL0FwcENvbXBvbmVudHMvUHJlc2VudGVyL1ByZXNlbnRlci50cyIsIndlYnBhY2s6Ly8vLi9BcHBDb21wb25lbnRzL1ZpZXcvU3ViVmlld0NvbXBvbmVudHMvSGFuZGxlL0hhbmRsZS50cyIsIndlYnBhY2s6Ly8vLi9BcHBDb21wb25lbnRzL1ZpZXcvU3ViVmlld0NvbXBvbmVudHMvSGFuZGxlL1NlY29uZEhhbmRsZS50cyIsIndlYnBhY2s6Ly8vLi9BcHBDb21wb25lbnRzL1ZpZXcvU3ViVmlld0NvbXBvbmVudHMvU2NhbGUvU2NhbGUudHMiLCJ3ZWJwYWNrOi8vLy4vQXBwQ29tcG9uZW50cy9WaWV3L1N1YlZpZXdDb21wb25lbnRzL1RpcC9TZWNvbmRUaXAudHMiLCJ3ZWJwYWNrOi8vLy4vQXBwQ29tcG9uZW50cy9WaWV3L1N1YlZpZXdDb21wb25lbnRzL1RpcC9UaXAudHMiLCJ3ZWJwYWNrOi8vLy4vQXBwQ29tcG9uZW50cy9WaWV3L1N1YlZpZXdDb21wb25lbnRzL1RyYWNrL1RyYWNrLnRzIiwid2VicGFjazovLy8uL0FwcENvbXBvbmVudHMvVmlldy9WaWV3LnRzIiwid2VicGFjazovLy8uL0FwcENvbXBvbmVudHMvVmlldy9hYnN0cmFjdFN1YlZpZXcvYWJzdHJhY3RTdWJWaWV3LnRzIiwid2VicGFjazovLy8uL2FwcC50cyIsIndlYnBhY2s6Ly8vLi91dGlscy9jYWxjVXRpbHMudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovLy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IE15RXZlbnRfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9NeUV2ZW50XCIpKTtcbmNsYXNzIEV2ZW50Q3JlYXRvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzID0ge307XG4gICAgfVxuICAgIHJlZ2lzdGVyRXZlbnQoZXZlbnROYW1lKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IE15RXZlbnRfMS5kZWZhdWx0KGV2ZW50TmFtZSk7XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSBldmVudDtcbiAgICB9XG4gICAgZGlzcGF0Y2hFdmVudChldmVudE5hbWUsIGV2ZW50QXJncykge1xuICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmNhbGxiYWNrcy5mb3JFYWNoKChjYWxsYmFjaykgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2soZXZlbnRBcmdzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnJlZ2lzdGVyQ2FsbGJhY2soY2FsbGJhY2spO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IEV2ZW50Q3JlYXRvcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgTXlFdmVudCB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmNhbGxiYWNrcyA9IFtdO1xuICAgIH1cbiAgICByZWdpc3RlckNhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IE15RXZlbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEV2ZW50Q3JlYXRvcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9FdmVudENyZWF0b3IvRXZlbnRDcmVhdG9yXCIpKTtcbmNsYXNzIE1vZGVsIGV4dGVuZHMgRXZlbnRDcmVhdG9yXzEuZGVmYXVsdCB7XG4gICAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIG1heDogMTAwLFxuICAgICAgICAgICAgZnJvbTogMCxcbiAgICAgICAgICAgIHRvOiAxMDAsXG4gICAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICAgICAgdGlwOiB0cnVlLFxuICAgICAgICAgICAgcmFuZ2U6IHRydWUsXG4gICAgICAgICAgICBwcm9ncmVzczogdHJ1ZSxcbiAgICAgICAgICAgIHNjYWxlOiB0cnVlLFxuICAgICAgICAgICAgc2NhbGVEZXN0aW55OiAxMCxcbiAgICAgICAgICAgIGhvcml6b250YWw6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmluaXQoc3RhdGUpO1xuICAgIH1cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBjb25zdCBbdmFsdWVzLCBzZXR0aW5nc10gPSB0aGlzLnNwbGl0UGFyYW1zKHN0YXRlKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZSksIHRoaXMubWluTWF4VmFsaWRhdG9yKHNldHRpbmdzKSk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUpLCB0aGlzLnJhbmdlRnJvbVRvVmFsaWRhdG9yKHRoaXMuc3RlcFZhbGlkYXRvcih2YWx1ZXMpKSk7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnTW9kZWxFdmVudCcsIHRoaXMuc3RhdGUpO1xuICAgIH1cbiAgICBnZXRTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gICAgfVxuICAgIGluaXQoc3RhdGUpIHtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCdNb2RlbEV2ZW50Jyk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUpO1xuICAgIH1cbiAgICBzcGxpdFBhcmFtcyhkYXRhKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IHt9O1xuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IHt9O1xuICAgICAgICBpZiAoJ2Zyb20nIGluIGRhdGEpIHtcbiAgICAgICAgICAgIHZhbHVlcy5mcm9tID0gZGF0YS5mcm9tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFsdWVzLmZyb20gPSB0aGlzLnN0YXRlLmZyb207XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCd0bycgaW4gZGF0YSkge1xuICAgICAgICAgICAgdmFsdWVzLnRvID0gZGF0YS50bztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlcy50byA9IHRoaXMuc3RhdGUudG87XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhLnN0ZXAgJiYgZGF0YS5zdGVwID4gMClcbiAgICAgICAgICAgIHNldHRpbmdzLnN0ZXAgPSBkYXRhLnN0ZXA7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5taW4gPT09ICdudW1iZXInKVxuICAgICAgICAgICAgc2V0dGluZ3MubWluID0gZGF0YS5taW47XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5tYXggPT09ICdudW1iZXInKVxuICAgICAgICAgICAgc2V0dGluZ3MubWF4ID0gZGF0YS5tYXg7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5zY2FsZURlc3RpbnkgPT09ICdudW1iZXInKVxuICAgICAgICAgICAgc2V0dGluZ3Muc2NhbGVEZXN0aW55ID0gZGF0YS5zY2FsZURlc3Rpbnk7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5zY2FsZSA9PT0gJ2Jvb2xlYW4nKVxuICAgICAgICAgICAgc2V0dGluZ3Muc2NhbGUgPSBkYXRhLnNjYWxlO1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEucmFuZ2UgPT09ICdib29sZWFuJylcbiAgICAgICAgICAgIHNldHRpbmdzLnJhbmdlID0gZGF0YS5yYW5nZTtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhLnRpcCA9PT0gJ2Jvb2xlYW4nKVxuICAgICAgICAgICAgc2V0dGluZ3MudGlwID0gZGF0YS50aXA7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5ob3Jpem9udGFsID09PSAnYm9vbGVhbicpXG4gICAgICAgICAgICBzZXR0aW5ncy5ob3Jpem9udGFsID0gZGF0YS5ob3Jpem9udGFsO1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEucHJvZ3Jlc3MgPT09ICdib29sZWFuJylcbiAgICAgICAgICAgIHNldHRpbmdzLnByb2dyZXNzID0gZGF0YS5wcm9ncmVzcztcbiAgICAgICAgcmV0dXJuIFt2YWx1ZXMsIHNldHRpbmdzXTtcbiAgICB9XG4gICAgbWluTWF4VmFsaWRhdG9yKGRhdGEpIHtcbiAgICAgICAgbGV0IHsgbWluID0gdGhpcy5zdGF0ZS5taW4gfSA9IGRhdGE7XG4gICAgICAgIGNvbnN0IHsgbWF4ID0gdGhpcy5zdGF0ZS5tYXggfSA9IGRhdGE7XG4gICAgICAgIGlmIChtaW4gPiBtYXgpXG4gICAgICAgICAgICBtaW4gPSBtYXg7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGRhdGEpLCB7IG1pbiwgbWF4IH0pO1xuICAgIH1cbiAgICBzdGVwVmFsaWRhdG9yKGRhdGEpIHtcbiAgICAgICAgY29uc3QgY29weU9mRGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGEpO1xuICAgICAgICBmdW5jdGlvbiBjaGVja1N0ZXAodmFsdWUsIHN0ZXApIHtcbiAgICAgICAgICAgIHJldHVybiArKE1hdGgucm91bmQodmFsdWUgLyBzdGVwKSAqIHN0ZXApLnRvRml4ZWQoMik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBjb3B5T2ZEYXRhLmZyb20gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBjb3B5T2ZEYXRhLmZyb20gPSBjaGVja1N0ZXAoY29weU9mRGF0YS5mcm9tLCB0aGlzLnN0YXRlLnN0ZXApO1xuICAgICAgICAgICAgaWYgKGNvcHlPZkRhdGEuZnJvbSA8PSB0aGlzLnN0YXRlLm1pbikge1xuICAgICAgICAgICAgICAgIGNvcHlPZkRhdGEuZnJvbSA9IHRoaXMuc3RhdGUubWluO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY29weU9mRGF0YS5mcm9tID49IHRoaXMuc3RhdGUubWF4KSB7XG4gICAgICAgICAgICAgICAgY29weU9mRGF0YS5mcm9tID0gdGhpcy5zdGF0ZS5tYXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBjb3B5T2ZEYXRhLnRvID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgY29weU9mRGF0YS50byA9IGNoZWNrU3RlcChjb3B5T2ZEYXRhLnRvLCB0aGlzLnN0YXRlLnN0ZXApO1xuICAgICAgICAgICAgaWYgKGNvcHlPZkRhdGEudG8gPD0gdGhpcy5zdGF0ZS5taW4pIHtcbiAgICAgICAgICAgICAgICBjb3B5T2ZEYXRhLnRvID0gdGhpcy5zdGF0ZS5taW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjb3B5T2ZEYXRhLnRvID49IHRoaXMuc3RhdGUubWF4KSB7XG4gICAgICAgICAgICAgICAgY29weU9mRGF0YS50byA9IHRoaXMuc3RhdGUubWF4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb3B5T2ZEYXRhO1xuICAgIH1cbiAgICByYW5nZUZyb21Ub1ZhbGlkYXRvcihkYXRhKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5yYW5nZSkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29weU9mU0RhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhKTtcbiAgICAgICAgaWYgKHR5cGVvZiBjb3B5T2ZTRGF0YS5mcm9tID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgICAgdHlwZW9mIGNvcHlPZlNEYXRhLnRvID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgY29uc3QgaXNGcm9tTm90VmFsaWRseSA9IHRoaXMuc3RhdGUudG8gLSBjb3B5T2ZTRGF0YS5mcm9tIDw9IDA7XG4gICAgICAgICAgICBjb25zdCBpc1RvTm90VmFsaWRseSA9IGNvcHlPZlNEYXRhLnRvIC0gdGhpcy5zdGF0ZS5mcm9tIDw9IDA7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5mcm9tID4gdGhpcy5zdGF0ZS50bylcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmZyb20gPSB0aGlzLnN0YXRlLnRvO1xuICAgICAgICAgICAgaWYgKGlzRnJvbU5vdFZhbGlkbHkpXG4gICAgICAgICAgICAgICAgY29weU9mU0RhdGEuZnJvbSA9IHRoaXMuc3RhdGUudG87XG4gICAgICAgICAgICBpZiAoaXNUb05vdFZhbGlkbHkpXG4gICAgICAgICAgICAgICAgY29weU9mU0RhdGEudG8gPSB0aGlzLnN0YXRlLmZyb207XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvcHlPZlNEYXRhO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IE1vZGVsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBNb2RlbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9Nb2RlbC9Nb2RlbFwiKSk7XG5jb25zdCBWaWV3XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL1ZpZXcvVmlld1wiKSk7XG5jb25zdCBFdmVudENyZWF0b3JfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vRXZlbnRDcmVhdG9yL0V2ZW50Q3JlYXRvclwiKSk7XG5jb25zdCBjYWxjVXRpbHNfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9jYWxjVXRpbHNcIik7XG5jbGFzcyBQcmVzZW50ZXIgZXh0ZW5kcyBFdmVudENyZWF0b3JfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlRWxlbSwgc3RhdGUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXdfMS5kZWZhdWx0KG5vZGVFbGVtKTtcbiAgICAgICAgdGhpcy5tb2RlbCA9IG5ldyBNb2RlbF8xLmRlZmF1bHQoc3RhdGUpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ29uQ2hhbmdlJyk7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLnZpZXcuc2V0U3RhdGUodGhpcy5tb2RlbC5nZXRTdGF0ZSgpKTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9XG4gICAgYmluZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLnZpZXdFdmVudEhhbmRsZXIgPSB0aGlzLnZpZXdFdmVudEhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5tb2RlbEV2ZW50SGFuZGxlciA9IHRoaXMubW9kZWxFdmVudEhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy52aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ1ZpZXdFdmVudCcsIHRoaXMudmlld0V2ZW50SGFuZGxlcik7XG4gICAgICAgIHRoaXMubW9kZWwuYWRkRXZlbnRMaXN0ZW5lcignTW9kZWxFdmVudCcsIHRoaXMubW9kZWxFdmVudEhhbmRsZXIpO1xuICAgIH1cbiAgICB2aWV3RXZlbnRIYW5kbGVyKGUpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCB9ID0gdGhpcy5tb2RlbC5nZXRTdGF0ZSgpO1xuICAgICAgICBpZiAodHlwZW9mIG1pbiA9PT0gJ251bWJlcicgJiYgdHlwZW9mIG1heCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGlmIChlLmZyb20pXG4gICAgICAgICAgICAgICAgZS5mcm9tID0gKygwLCBjYWxjVXRpbHNfMS5jb252ZXJ0UGVyY2VudEluVmFsdWUpKG1pbiwgbWF4LCBlLmZyb20pLnRvRml4ZWQoMyk7XG4gICAgICAgICAgICBpZiAoZS50bylcbiAgICAgICAgICAgICAgICBlLnRvID0gKygwLCBjYWxjVXRpbHNfMS5jb252ZXJ0UGVyY2VudEluVmFsdWUpKG1pbiwgbWF4LCBlLnRvKS50b0ZpeGVkKDMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW9kZWwuc2V0U3RhdGUoZSk7XG4gICAgfVxuICAgIG1vZGVsRXZlbnRIYW5kbGVyKGUpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdvbkNoYW5nZScsIGUpO1xuICAgICAgICB0aGlzLnZpZXcuc2V0U3RhdGUoZSk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gUHJlc2VudGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhYnN0cmFjdFN1YlZpZXdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vYWJzdHJhY3RTdWJWaWV3L2Fic3RyYWN0U3ViVmlld1wiKSk7XG5jb25zdCBjYWxjVXRpbHNfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi91dGlscy9jYWxjVXRpbHNcIik7XG5jbGFzcyBIYW5kbGUgZXh0ZW5kcyBhYnN0cmFjdFN1YlZpZXdfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3RvcihzbGlkZXIpIHtcbiAgICAgICAgc3VwZXIoc2xpZGVyKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIGZyb20sIGhvcml6b250YWwgfSA9IHN0YXRlO1xuICAgICAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlKSwgeyBtaW4sXG4gICAgICAgICAgICBtYXgsXG4gICAgICAgICAgICBmcm9tLFxuICAgICAgICAgICAgaG9yaXpvbnRhbCB9KTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgZ2V0UG9zaXRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmhvcml6b250YWwpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1YlZpZXdUb3AgPSB0aGlzLnN1YlZpZXcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgICAgICAgY29uc3Qgc2xpZGVyVG9wID0gdGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgICAgICAgcmV0dXJuIHN1YlZpZXdUb3AgLSBzbGlkZXJUb3AgKyB0aGlzLnN1YlZpZXcub2Zmc2V0SGVpZ2h0IC8gMjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdWJWaWV3TGVmdCA9IHRoaXMuc3ViVmlldy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgICAgICBjb25zdCBzbGlkZXJMZWZ0ID0gdGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICAgICAgcmV0dXJuIHN1YlZpZXdMZWZ0IC0gc2xpZGVyTGVmdCArIHRoaXMuc3ViVmlldy5vZmZzZXRXaWR0aCAvIDI7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlU3ViVmlldygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ1N1YlZpZXdFdmVudCcpO1xuICAgICAgICB0aGlzLmJpbmRFdmVudExpc3RlbmVyKCk7XG4gICAgfVxuICAgIGNyZWF0ZVN1YlZpZXcoKSB7XG4gICAgICAgIHRoaXMuc3ViVmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnN1YlZpZXcuY2xhc3NMaXN0LmFkZCgnanEtc2xpZGVyX19oYW5kbGUnKTtcbiAgICAgICAgdGhpcy5zbGlkZXIuYXBwZW5kQ2hpbGQodGhpcy5zdWJWaWV3KTtcbiAgICAgICAgdGhpcy5zdWJWaWV3LnN0eWxlLnpJbmRleCA9ICcyJztcbiAgICB9XG4gICAgYmluZEV2ZW50TGlzdGVuZXIoKSB7XG4gICAgICAgIHRoaXMucG9pbnRlclN0YXJ0ID0gdGhpcy5wb2ludGVyU3RhcnQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zdWJWaWV3LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgdGhpcy5wb2ludGVyU3RhcnQpO1xuICAgIH1cbiAgICBwb2ludGVyU3RhcnQoKSB7XG4gICAgICAgIHRoaXMucG9pbnRlckhhbmRsZXIgPSB0aGlzLnBvaW50ZXJIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucmVtb3ZlUG9pbnRTdGFydCA9IHRoaXMucmVtb3ZlUG9pbnRTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCB0aGlzLnBvaW50ZXJIYW5kbGVyKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIHRoaXMucmVtb3ZlUG9pbnRTdGFydCk7XG4gICAgfVxuICAgIHJlbW92ZVBvaW50U3RhcnQoKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIHRoaXMucG9pbnRlckhhbmRsZXIpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCB0aGlzLnBvaW50ZXJIYW5kbGVyKTtcbiAgICB9XG4gICAgcG9pbnRlckhhbmRsZXIoZSkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ1N1YlZpZXdFdmVudCcsIHtcbiAgICAgICAgICAgIHRhcmdldDogJ2hhbmRsZScsXG4gICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5zdGF0ZS5ob3Jpem9udGFsXG4gICAgICAgICAgICAgICAgPyBlLmNsaWVudFkgLSB0aGlzLnNsaWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3BcbiAgICAgICAgICAgICAgICA6IGUuY2xpZW50WCAtIHRoaXMuc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIGZyb20sIGhvcml6b250YWwgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IGlzTnVtYmVycyA9IHR5cGVvZiBtaW4gPT09ICdudW1iZXInICYmXG4gICAgICAgICAgICB0eXBlb2YgbWF4ID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgICAgdHlwZW9mIGZyb20gPT09ICdudW1iZXInO1xuICAgICAgICBpZiAoaXNOdW1iZXJzKSB7XG4gICAgICAgICAgICBpZiAoaG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3ViVmlldy5zdHlsZS50b3AgPSBgJHsoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgZnJvbSl9JWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YlZpZXcuc3R5bGUubGVmdCA9IGAkeygwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCBmcm9tKX0lYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IEhhbmRsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgSGFuZGxlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vSGFuZGxlXCIpKTtcbmNvbnN0IGNhbGNVdGlsc18xID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL3V0aWxzL2NhbGNVdGlsc1wiKTtcbmNsYXNzIFNlY29uZEhhbmRsZSBleHRlbmRzIEhhbmRsZV8xLmRlZmF1bHQge1xuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIHRvLCBob3Jpem9udGFsIH0gPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZSksIHsgbWluLFxuICAgICAgICAgICAgbWF4LFxuICAgICAgICAgICAgdG8sXG4gICAgICAgICAgICBob3Jpem9udGFsIH0pO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICBwb2ludGVySGFuZGxlcihlKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnU3ViVmlld0V2ZW50Jywge1xuICAgICAgICAgICAgdGFyZ2V0OiAnc2Vjb25kSGFuZGxlJyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLnN0YXRlLmhvcml6b250YWxcbiAgICAgICAgICAgICAgICA/IGUuY2xpZW50WSAtIHRoaXMuc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcFxuICAgICAgICAgICAgICAgIDogZS5jbGllbnRYIC0gdGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCwgdG8sIGhvcml6b250YWwgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IGlzTnVtYmVycyA9IHR5cGVvZiBtaW4gPT09ICdudW1iZXInICYmXG4gICAgICAgICAgICB0eXBlb2YgbWF4ID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgICAgdHlwZW9mIHRvID09PSAnbnVtYmVyJztcbiAgICAgICAgY29uc3Qgc2l6ZSA9IGhvcml6b250YWxcbiAgICAgICAgICAgID8gdGhpcy5zbGlkZXIuY2xpZW50SGVpZ2h0XG4gICAgICAgICAgICA6IHRoaXMuc2xpZGVyLmNsaWVudFdpZHRoO1xuICAgICAgICBpZiAodGhpcy5nZXRQb3NpdGlvbigpID4gc2l6ZSAvIDIpIHtcbiAgICAgICAgICAgIHRoaXMuc3ViVmlldy5zdHlsZS56SW5kZXggPSAnMSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN1YlZpZXcuc3R5bGUuekluZGV4ID0gJzMnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc051bWJlcnMpIHtcbiAgICAgICAgICAgIGlmIChob3Jpem9udGFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJWaWV3LnN0eWxlLnRvcCA9IGAkeygwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCB0byl9JWA7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zdWJWaWV3LnN0eWxlLmxlZnQgPSBgJHsoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgdG8pfSVgO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gU2Vjb25kSGFuZGxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhYnN0cmFjdFN1YlZpZXdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vYWJzdHJhY3RTdWJWaWV3L2Fic3RyYWN0U3ViVmlld1wiKSk7XG5jb25zdCBjYWxjVXRpbHNfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi91dGlscy9jYWxjVXRpbHNcIik7XG5jbGFzcyBTY2FsZSBleHRlbmRzIGFic3RyYWN0U3ViVmlld18xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKHNsaWRlcikge1xuICAgICAgICBzdXBlcihzbGlkZXIpO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCwgc3RlcCwgaG9yaXpvbnRhbCwgc2NhbGVEZXN0aW55IH0gPSBzdGF0ZTtcbiAgICAgICAgY29uc3Qgb2xkU3RhdGUgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZSksIHsgbWluLFxuICAgICAgICAgICAgbWF4LFxuICAgICAgICAgICAgc3RlcCxcbiAgICAgICAgICAgIGhvcml6b250YWwsXG4gICAgICAgICAgICBzY2FsZURlc3RpbnkgfSk7XG4gICAgICAgIGlmIChvbGRTdGF0ZSAhPT0gSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVTdWJWaWV3KCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnU3ViVmlld0V2ZW50Jyk7XG4gICAgfVxuICAgIGNyZWF0ZVN1YlZpZXcoKSB7XG4gICAgICAgIHRoaXMuc3ViVmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnN1YlZpZXcuY2xhc3NMaXN0LmFkZCgnanEtc2xpZGVyX19zY2FsZScpO1xuICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmRDaGlsZCh0aGlzLnN1YlZpZXcpO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIHN0ZXAsIGhvcml6b250YWwsIHNjYWxlRGVzdGlueSB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgaXNDb3JyZWN0UGFyYW1zID0gdHlwZW9mIG1pbiA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgICAgIHR5cGVvZiBtYXggPT09ICdudW1iZXInICYmXG4gICAgICAgICAgICB0eXBlb2Ygc2NhbGVEZXN0aW55ID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgICAgdHlwZW9mIHN0ZXAgPT09ICdudW1iZXInICYmXG4gICAgICAgICAgICB0eXBlb2YgaG9yaXpvbnRhbCA9PT0gJ2Jvb2xlYW4nO1xuICAgICAgICBpZiAoaXNDb3JyZWN0UGFyYW1zKSB7XG4gICAgICAgICAgICBsZXQgcGlwcyA9IHRoaXMuY3JlYXRlUGlwRnJhZ21lbnQobWluLCBtYXgsIG1pbik7XG4gICAgICAgICAgICBmb3IgKGxldCBwaXAgPSBtaW4gKyAxOyBwaXAgPCBtYXg7IHBpcCArPSAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBpcCAlIHNjYWxlRGVzdGlueSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBwaXBzICs9IHRoaXMuY3JlYXRlUGlwRnJhZ21lbnQobWluLCBtYXgsIHBpcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGlwcyArPSB0aGlzLmNyZWF0ZVBpcEZyYWdtZW50KG1pbiwgbWF4LCBtYXgpO1xuICAgICAgICAgICAgdGhpcy5zdWJWaWV3LmlubmVySFRNTCA9IHBpcHM7XG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudExpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY3JlYXRlUGlwRnJhZ21lbnQobWluLCBtYXgsIHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmhvcml6b250YWwpIHtcbiAgICAgICAgICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwianEtc2xpZGVyX19zY2FsZS1waXBcIiBzdHlsZT1cInRvcDpcbiAgICAgICAgJHsoMCwgY2FsY1V0aWxzXzEuY29udmVydFBlcmNlbnRJblZhbHVlKSgwLCB0aGlzLnNsaWRlci5jbGllbnRIZWlnaHQsICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCB2YWx1ZSkpfXB4XCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cImpxLXNsaWRlcl9fc2NhbGUtbGFiZWxcIj4ke3ZhbHVlfTwvZGl2PlxuICAgICAgPC9kaXY+YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImpxLXNsaWRlcl9fc2NhbGUtcGlwXCIgc3R5bGU9XCJsZWZ0OiR7KDAsIGNhbGNVdGlsc18xLmNvbnZlcnRWYWx1ZUluUGVyY2VudCkobWluLCBtYXgsIHZhbHVlKX0lXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJqcS1zbGlkZXJfX3NjYWxlLWxhYmVsXCI+JHt2YWx1ZX08L2Rpdj5cbiAgICAgIDwvZGl2PmA7XG4gICAgfVxuICAgIGJpbmRFdmVudExpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLmNsaWNrSGFuZGxlciA9IHRoaXMuY2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5xdWVyeVNlbGVjdG9yQWxsKCcuanEtc2xpZGVyX19zY2FsZS1sYWJlbCcpLmZvckVhY2goKHBpcCkgPT4ge1xuICAgICAgICAgICAgaWYgKHBpcCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2xpY2tIYW5kbGVyKGUpIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIGhvcml6b250YWwgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG1pbiA9PT0gJ251bWJlcicgJiYgdHlwZW9mIG1heCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvbmVQZXJjZW50ID0gaG9yaXpvbnRhbFxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMuc2xpZGVyLmNsaWVudEhlaWdodCAvIDEwMFxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMuc2xpZGVyLmNsaWVudFdpZHRoIC8gMTAwO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBlcmNlbnRzID0gaG9yaXpvbnRhbFxuICAgICAgICAgICAgICAgICAgICA/ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCArZS50YXJnZXQuaW5uZXJIVE1MKVxuICAgICAgICAgICAgICAgICAgICA6ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCArZS50YXJnZXQuaW5uZXJIVE1MKTtcbiAgICAgICAgICAgICAgICBsZXQgcG9zaXRpb24gPSBvbmVQZXJjZW50ICogcGVyY2VudHM7XG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWRlclNpemUgPSBob3Jpem9udGFsXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuc2xpZGVyLmNsaWVudEhlaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnNsaWRlci5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSB0aGlzLmdldFBvc2l0aW9uKCkgLSBzbGlkZXJTaXplO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ1N1YlZpZXdFdmVudCcsIHsgdGFyZ2V0OiAnc2NhbGUnLCBwb3NpdGlvbiB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFNjYWxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBUaXBfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9UaXBcIikpO1xuY29uc3QgY2FsY1V0aWxzXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vdXRpbHMvY2FsY1V0aWxzXCIpO1xuY2xhc3MgU2Vjb25kVGlwIGV4dGVuZHMgVGlwXzEuZGVmYXVsdCB7XG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgY29uc3QgeyBtaW4gPSB0aGlzLnN0YXRlLm1pbiwgbWF4ID0gdGhpcy5zdGF0ZS5tYXgsIHRvID0gdGhpcy5zdGF0ZS50bywgaG9yaXpvbnRhbCA9IHRoaXMuc3RhdGUuaG9yaXpvbnRhbCwgfSA9IHN0YXRlO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgbWluLFxuICAgICAgICAgICAgbWF4LFxuICAgICAgICAgICAgdG8sXG4gICAgICAgICAgICBob3Jpem9udGFsLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIHRvLCBob3Jpem9udGFsIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBpc051bWJlcnMgPSB0eXBlb2YgbWluID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgICAgdHlwZW9mIG1heCA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgICAgIHR5cGVvZiB0byA9PT0gJ251bWJlcic7XG4gICAgICAgIGlmIChpc051bWJlcnMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRG91YmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJWaWV3LnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YlZpZXcuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3ViVmlldy50ZXh0Q29udGVudCA9IHRvLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZiAoaG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3ViVmlldy5zdHlsZS50b3AgPSBgJHsoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgdG8pfSVgO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3ViVmlldy5zdHlsZS5sZWZ0ID0gYCR7KDAsIGNhbGNVdGlsc18xLmNvbnZlcnRWYWx1ZUluUGVyY2VudCkobWluLCBtYXgsIHRvKX0lYDtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFNlY29uZFRpcDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYWJzdHJhY3RTdWJWaWV3XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uLy4uL2Fic3RyYWN0U3ViVmlldy9hYnN0cmFjdFN1YlZpZXdcIikpO1xuY29uc3QgY2FsY1V0aWxzXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vdXRpbHMvY2FsY1V0aWxzXCIpO1xuY2xhc3MgVGlwIGV4dGVuZHMgYWJzdHJhY3RTdWJWaWV3XzEuZGVmYXVsdCB7XG4gICAgY29uc3RydWN0b3Ioc2xpZGVyKSB7XG4gICAgICAgIHN1cGVyKHNsaWRlcik7XG4gICAgICAgIHRoaXMuaXNEb3VibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIGZyb20sIHRvLCBob3Jpem9udGFsIH0gPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIG1pbixcbiAgICAgICAgICAgIG1heCxcbiAgICAgICAgICAgIGZyb20sXG4gICAgICAgICAgICB0byxcbiAgICAgICAgICAgIGhvcml6b250YWwsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIGNoYW5nZUlzRG91YmxlKHZhbCkge1xuICAgICAgICB0aGlzLmlzRG91YmxlID0gdmFsO1xuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmNyZWF0ZVN1YlZpZXcoKTtcbiAgICB9XG4gICAgY3JlYXRlU3ViVmlldygpIHtcbiAgICAgICAgdGhpcy5zdWJWaWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5jbGFzc0xpc3QuYWRkKCdqcS1zbGlkZXJfX3RpcCcpO1xuICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmRDaGlsZCh0aGlzLnN1YlZpZXcpO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIGZyb20sIGhvcml6b250YWwsIHRvIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBpc051bWJlcnMgPSB0eXBlb2YgbWluID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgICAgdHlwZW9mIG1heCA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgICAgIHR5cGVvZiBmcm9tID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgICAgdHlwZW9mIGZyb20gPT09ICdudW1iZXInO1xuICAgICAgICBpZiAoaXNOdW1iZXJzKSB7XG4gICAgICAgICAgICB0aGlzLnN1YlZpZXcudGV4dENvbnRlbnQgPSB0aGlzLmlzRG91YmxlXG4gICAgICAgICAgICAgICAgPyBgJHtmcm9tfSAtICR7dG99YFxuICAgICAgICAgICAgICAgIDogZnJvbS50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYgKGhvcml6b250YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YlZpZXcuc3R5bGUudG9wID0gYCR7KDAsIGNhbGNVdGlsc18xLmNvbnZlcnRWYWx1ZUluUGVyY2VudCkobWluLCBtYXgsIGZyb20pfSVgO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3ViVmlldy5zdHlsZS5sZWZ0ID0gYCR7KDAsIGNhbGNVdGlsc18xLmNvbnZlcnRWYWx1ZUluUGVyY2VudCkobWluLCBtYXgsIGZyb20pfSVgO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gVGlwO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhYnN0cmFjdFN1YlZpZXdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vYWJzdHJhY3RTdWJWaWV3L2Fic3RyYWN0U3ViVmlld1wiKSk7XG5jb25zdCBjYWxjVXRpbHNfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi91dGlscy9jYWxjVXRpbHNcIik7XG5jbGFzcyBUcmFjayBleHRlbmRzIGFic3RyYWN0U3ViVmlld18xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKHNsaWRlcikge1xuICAgICAgICBzdXBlcihzbGlkZXIpO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCwgZnJvbSwgdG8sIGhvcml6b250YWwsIHJhbmdlLCBwcm9ncmVzcyB9ID0gc3RhdGU7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUpLCB7IG1pbixcbiAgICAgICAgICAgIG1heCxcbiAgICAgICAgICAgIGZyb20sXG4gICAgICAgICAgICB0byxcbiAgICAgICAgICAgIGhvcml6b250YWwsXG4gICAgICAgICAgICByYW5nZSxcbiAgICAgICAgICAgIHByb2dyZXNzIH0pO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICBjcmVhdGVTdWJWaWV3KCkge1xuICAgICAgICB0aGlzLnN1YlZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5zdWJWaWV3LmNsYXNzTGlzdC5hZGQoJ2pxLXNsaWRlcl9fdHJhY2snKTtcbiAgICAgICAgdGhpcy5wcm9ncmVzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnByb2dyZXNzLmNsYXNzTGlzdC5hZGQoJ2pxLXNsaWRlcl9fcHJvZ3Jlc3MnKTtcbiAgICAgICAgdGhpcy5zdWJWaWV3LmFwcGVuZENoaWxkKHRoaXMucHJvZ3Jlc3MpO1xuICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmRDaGlsZCh0aGlzLnN1YlZpZXcpO1xuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmNyZWF0ZVN1YlZpZXcoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCdTdWJWaWV3RXZlbnQnKTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRMaXN0ZW5lcigpO1xuICAgIH1cbiAgICBiaW5kRXZlbnRMaXN0ZW5lcigpIHtcbiAgICAgICAgdGhpcy5jbGlja0hhbmRsZXIgPSB0aGlzLmNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnN1YlZpZXcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcik7XG4gICAgfVxuICAgIGNsaWNrSGFuZGxlcihlKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnU3ViVmlld0V2ZW50Jywge1xuICAgICAgICAgICAgdGFyZ2V0OiAndHJhY2snLFxuICAgICAgICAgICAgcG9zaXRpb246IHRoaXMuc3RhdGUuaG9yaXpvbnRhbFxuICAgICAgICAgICAgICAgID8gZS5jbGllbnRZIC0gdGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wXG4gICAgICAgICAgICAgICAgOiBlLmNsaWVudFggLSB0aGlzLnNsaWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4LCBmcm9tLCB0bywgaG9yaXpvbnRhbCwgcmFuZ2UsIHByb2dyZXNzIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBpZiAoIXByb2dyZXNzKSB7XG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzLnJlbW92ZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGlzTnVtYmVycyA9IHR5cGVvZiBtaW4gPT09ICdudW1iZXInICYmXG4gICAgICAgICAgICB0eXBlb2YgbWF4ID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgICAgdHlwZW9mIGZyb20gPT09ICdudW1iZXInICYmXG4gICAgICAgICAgICB0eXBlb2YgdG8gPT09ICdudW1iZXInO1xuICAgICAgICBpZiAoaXNOdW1iZXJzKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydCA9ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCBmcm9tKTtcbiAgICAgICAgICAgIGNvbnN0IGVuZCA9ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCB0byk7XG4gICAgICAgICAgICBpZiAoaG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgICAgIGlmIChyYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBlbmQgLSBzdGFydDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb25lUGVyY2VudCA9IHRoaXMuc2xpZGVyLmNsaWVudEhlaWdodCAvIDEwMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9JWA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3Muc3R5bGUubWFyZ2luVG9wID0gYCR7b25lUGVyY2VudCAqIHN0YXJ0fXB4YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3Muc3R5bGUuaGVpZ2h0ID0gYCR7c3RhcnR9JWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyYW5nZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gZW5kIC0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5zdHlsZS53aWR0aCA9IGAke3dpZHRofSVgO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3Muc3R5bGUubWFyZ2luTGVmdCA9IGAke3N0YXJ0fSVgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5zdHlsZS53aWR0aCA9IGAke3N0YXJ0fSVgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gVHJhY2s7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEhhbmRsZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1N1YlZpZXdDb21wb25lbnRzL0hhbmRsZS9IYW5kbGVcIikpO1xuY29uc3QgU2Vjb25kSGFuZGxlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vU3ViVmlld0NvbXBvbmVudHMvSGFuZGxlL1NlY29uZEhhbmRsZVwiKSk7XG5jb25zdCBTY2FsZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1N1YlZpZXdDb21wb25lbnRzL1NjYWxlL1NjYWxlXCIpKTtcbmNvbnN0IFRpcF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1N1YlZpZXdDb21wb25lbnRzL1RpcC9UaXBcIikpO1xuY29uc3QgU2Vjb25kVGlwXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vU3ViVmlld0NvbXBvbmVudHMvVGlwL1NlY29uZFRpcFwiKSk7XG5jb25zdCBUcmFja18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1N1YlZpZXdDb21wb25lbnRzL1RyYWNrL1RyYWNrXCIpKTtcbmNvbnN0IEV2ZW50Q3JlYXRvcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9FdmVudENyZWF0b3IvRXZlbnRDcmVhdG9yXCIpKTtcbmNvbnN0IGNhbGNVdGlsc18xID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL2NhbGNVdGlsc1wiKTtcbmNsYXNzIFZpZXcgZXh0ZW5kcyBFdmVudENyZWF0b3JfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlRWxlbSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm5vZGVFbGVtID0gbm9kZUVsZW07XG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IFtdO1xuICAgICAgICB0aGlzLnN0YXRlID0ge307XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICB0aGlzLmNoZWNrSXNDaGFuZ2VkU2V0dGluZ3Moc3RhdGUpO1xuICAgICAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlKSwgc3RhdGUpO1xuICAgICAgICB0aGlzLnVwZGF0ZSh0aGlzLnN0YXRlKTtcbiAgICAgICAgdGhpcy5jaGVja1RpcHMoKTtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVTbGlkZXIoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCdWaWV3RXZlbnQnKTtcbiAgICB9XG4gICAgY3JlYXRlU2xpZGVyKCkge1xuICAgICAgICB0aGlzLnNsaWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnNsaWRlci5jbGFzc0xpc3QuYWRkKCdqcS1zbGlkZXInKTtcbiAgICAgICAgdGhpcy5ub2RlRWxlbS5hcHBlbmRDaGlsZCh0aGlzLnNsaWRlcik7XG4gICAgfVxuICAgIGNyZWF0ZUNvbXBvbmVudHMoc3RhdGUpIHtcbiAgICAgICAgY29uc3QgeyByYW5nZSwgdGlwLCBzY2FsZSwgaG9yaXpvbnRhbCB9ID0gc3RhdGU7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cy5wdXNoKG5ldyBIYW5kbGVfMS5kZWZhdWx0KHRoaXMuc2xpZGVyKSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cy5wdXNoKG5ldyBUcmFja18xLmRlZmF1bHQodGhpcy5zbGlkZXIpKTtcbiAgICAgICAgaWYgKHRpcCkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzLnB1c2gobmV3IFRpcF8xLmRlZmF1bHQodGhpcy5zbGlkZXIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50cy5wdXNoKG5ldyBTZWNvbmRIYW5kbGVfMS5kZWZhdWx0KHRoaXMuc2xpZGVyKSk7XG4gICAgICAgICAgICBpZiAodGlwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzLnB1c2gobmV3IFNlY29uZFRpcF8xLmRlZmF1bHQodGhpcy5zbGlkZXIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NhbGUpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50cy5wdXNoKG5ldyBTY2FsZV8xLmRlZmF1bHQodGhpcy5zbGlkZXIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgdGhpcy5zbGlkZXIuY2xhc3NMaXN0LmFkZCgnanEtc2xpZGVyLS1ob3Jpem9udGFsJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlci5jbGFzc0xpc3QucmVtb3ZlKCdqcS1zbGlkZXItLWhvcml6b250YWwnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBiaW5kRXZlbnRMaXN0ZW5lcigpIHtcbiAgICAgICAgdGhpcy5zdWJWaWV3RXZlbnRIYW5kbGVyID0gdGhpcy5zdWJWaWV3RXZlbnRIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cy5mb3JFYWNoKChjb21wb25lbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChjb21wb25lbnQuZXZlbnRzLlN1YlZpZXdFdmVudCkge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKCdTdWJWaWV3RXZlbnQnLCB0aGlzLnN1YlZpZXdFdmVudEhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3ViVmlld0V2ZW50SGFuZGxlcihlKSB7XG4gICAgICAgIGNvbnN0IHNpemUgPSB0aGlzLnN0YXRlLmhvcml6b250YWxcbiAgICAgICAgICAgID8gdGhpcy5zbGlkZXIuY2xpZW50SGVpZ2h0XG4gICAgICAgICAgICA6IHRoaXMuc2xpZGVyLmNsaWVudFdpZHRoO1xuICAgICAgICBpZiAoZS50YXJnZXQgPT09ICdoYW5kbGUnKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ1ZpZXdFdmVudCcsIHtcbiAgICAgICAgICAgICAgICBmcm9tOiAoMCwgY2FsY1V0aWxzXzEuY29udmVydFBpeGVsSW5QZXJjZW50KShzaXplLCBlLnBvc2l0aW9uKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gJ3NlY29uZEhhbmRsZScpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnVmlld0V2ZW50Jywge1xuICAgICAgICAgICAgICAgIHRvOiAoMCwgY2FsY1V0aWxzXzEuY29udmVydFBpeGVsSW5QZXJjZW50KShzaXplLCBlLnBvc2l0aW9uKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gJ3RyYWNrJyB8fCBlLnRhcmdldCA9PT0gJ3NjYWxlJykge1xuICAgICAgICAgICAgY29uc3QgaGFuZGxlcyA9IHRoaXMuZ2V0QXJyT2ZDb25jcmV0ZVN1YlZpZXcoSGFuZGxlXzEuZGVmYXVsdCk7XG4gICAgICAgICAgICBjb25zdCBmcm9tID0gaGFuZGxlc1swXS5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUucmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0byA9IGhhbmRsZXNbMV0uZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoZnJvbSAtIGUucG9zaXRpb24pIDwgdG8gLSBlLnBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnVmlld0V2ZW50Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnJvbTogKDAsIGNhbGNVdGlsc18xLmNvbnZlcnRQaXhlbEluUGVyY2VudCkoc2l6ZSwgZS5wb3NpdGlvbiksXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhmcm9tIC0gZS5wb3NpdGlvbikgPT09IHRvIC0gZS5wb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ1ZpZXdFdmVudCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyb206ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0UGl4ZWxJblBlcmNlbnQpKHNpemUsIGUucG9zaXRpb24pLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ1ZpZXdFdmVudCcsIHtcbiAgICAgICAgICAgICAgICAgICAgdG86ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0UGl4ZWxJblBlcmNlbnQpKHNpemUsIGUucG9zaXRpb24pLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnVmlld0V2ZW50Jywge1xuICAgICAgICAgICAgICAgIGZyb206ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0UGl4ZWxJblBlcmNlbnQpKHNpemUsIGUucG9zaXRpb24pLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2hlY2tJc0NoYW5nZWRTZXR0aW5ncyhzdGF0ZSkge1xuICAgICAgICBjb25zdCB7IHJhbmdlLCB0aXAsIHNjYWxlLCBob3Jpem9udGFsLCBwcm9ncmVzcywgc2NhbGVEZXN0aW55IH0gPSBzdGF0ZTtcbiAgICAgICAgY29uc3QgaXNVcGRhdGVTZXR0aW5ncyA9IHJhbmdlICE9PSB0aGlzLnN0YXRlLnJhbmdlIHx8XG4gICAgICAgICAgICB0aXAgIT09IHRoaXMuc3RhdGUudGlwIHx8XG4gICAgICAgICAgICBzY2FsZSAhPT0gdGhpcy5zdGF0ZS5zY2FsZSB8fFxuICAgICAgICAgICAgaG9yaXpvbnRhbCAhPT0gdGhpcy5zdGF0ZS5ob3Jpem9udGFsIHx8XG4gICAgICAgICAgICBwcm9ncmVzcyAhPT0gdGhpcy5zdGF0ZS5wcm9ncmVzcyB8fFxuICAgICAgICAgICAgc2NhbGVEZXN0aW55ICE9PSB0aGlzLnN0YXRlLnNjYWxlRGVzdGlueTtcbiAgICAgICAgaWYgKGlzVXBkYXRlU2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50cyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5zbGlkZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbXBvbmVudHMoc3RhdGUpO1xuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNoZWNrVGlwcygpIHtcbiAgICAgICAgY29uc3QgeyB0aXAsIHJhbmdlLCBob3Jpem9udGFsIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBpZiAodGlwICYmIHJhbmdlKSB7XG4gICAgICAgICAgICBjb25zdCB0aXBzID0gdGhpcy5nZXRBcnJPZkNvbmNyZXRlU3ViVmlldyhUaXBfMS5kZWZhdWx0KTtcbiAgICAgICAgICAgIGNvbnN0IHNpemUgPSBob3Jpem9udGFsXG4gICAgICAgICAgICAgICAgPyB0aXBzWzFdLnN1YlZpZXcuY2xpZW50SGVpZ2h0XG4gICAgICAgICAgICAgICAgOiB0aXBzWzFdLnN1YlZpZXcub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICBjb25zdCBmaXJzdFBvc2l0aW9uID0gdGlwc1swXS5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgY29uc3Qgc2Vjb25kUG9zaXRpb24gPSB0aXBzWzFdLmdldFBvc2l0aW9uKCkgLSBzaXplO1xuICAgICAgICAgICAgaWYgKGZpcnN0UG9zaXRpb24gPiBzZWNvbmRQb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIHRpcHMuZm9yRWFjaCgodCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0LmNoYW5nZUlzRG91YmxlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0LnNldFN0YXRlKHRoaXMuc3RhdGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGlwcy5mb3JFYWNoKCh0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHQuY2hhbmdlSXNEb3VibGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHVwZGF0ZShzdGF0ZSkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMuZm9yRWFjaCgoY29tcG9uZW50KSA9PiBjb21wb25lbnQuc2V0U3RhdGUoc3RhdGUpKTtcbiAgICB9XG4gICAgZ2V0QXJyT2ZDb25jcmV0ZVN1YlZpZXcoaW5zdGFuY2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50cy5maWx0ZXIoKGNvbXBvbmVudCkgPT4geyB2YXIgX2E7IHJldHVybiAoX2EgPSBjb21wb25lbnQgaW5zdGFuY2VvZiBpbnN0YW5jZSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogY29tcG9uZW50OyB9KTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBWaWV3O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBFdmVudENyZWF0b3JfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vRXZlbnRDcmVhdG9yL0V2ZW50Q3JlYXRvclwiKSk7XG5jbGFzcyBTdWJWaWV3IGV4dGVuZHMgRXZlbnRDcmVhdG9yXzEuZGVmYXVsdCB7XG4gICAgY29uc3RydWN0b3Ioc2xpZGVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc2xpZGVyID0gc2xpZGVyO1xuICAgICAgICB0aGlzLnN0YXRlID0ge307XG4gICAgfVxuICAgIGdldFBvc2l0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5ob3Jpem9udGFsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdWJWaWV3LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zdWJWaWV3LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gU3ViVmlldztcbiIsIlwidXNlIHN0cmljdFwiO1xuLyogZXNsaW50LWRpc2FibGUgZnNkL25vLWZ1bmN0aW9uLWRlY2xhcmF0aW9uLWluLWV2ZW50LWxpc3RlbmVyICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGZ1bmMtbmFtZXMgKi9cbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IFByZXNlbnRlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0FwcENvbXBvbmVudHMvUHJlc2VudGVyL1ByZXNlbnRlclwiKSk7XG5yZXF1aXJlKFwiLi9zbGlkZXIuc2Nzc1wiKTtcbmNvbnN0IG1ldGhvZHMgPSB7XG4gICAgaW5pdChzdGF0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEkKHRoaXMpLmRhdGEoJ2pxU2xpZGVyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5kYXRhKCkuanFTbGlkZXIgPSBuZXcgUHJlc2VudGVyXzEuZGVmYXVsdCh0aGlzLCBzdGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHVwZGF0ZShzdGF0ZSkge1xuICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QganFTbGlkZXIgPSAkKHRoaXMpLmRhdGEoJ2pxU2xpZGVyJyk7XG4gICAgICAgICAgICBqcVNsaWRlci5tb2RlbC5zZXRTdGF0ZShzdGF0ZSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0U3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IGpxU2xpZGVyID0gJCh0aGlzKS5kYXRhKCdqcVNsaWRlcicpO1xuICAgICAgICBjb25zdCBzdGF0ZSA9IGpxU2xpZGVyLm1vZGVsLmdldFN0YXRlKCk7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9LFxuICAgIG9uQ2hhbmdlKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCBqcVNsaWRlciA9ICQodGhpcykuZGF0YSgnanFTbGlkZXInKTtcbiAgICAgICAgICAgIGpxU2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ29uQ2hhbmdlJywgKGUpID0+IGNhbGxiYWNrKGUpKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbn07XG4kLmZuLmpxU2xpZGVyID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICBjb25zdCBpc0VtcHR5QXJncyA9IGFyZ3MubGVuZ3RoID09PSAwIHx8IHR5cGVvZiBhcmdzWzBdID09PSAnb2JqZWN0JztcbiAgICBjb25zdCBpc1VwZGF0ZSA9IGFyZ3MubGVuZ3RoID49IDIgJiYgYXJnc1swXSA9PT0gJ3VwZGF0ZScgJiYgdHlwZW9mIGFyZ3NbMV0gPT09ICdvYmplY3QnO1xuICAgIGNvbnN0IGlzR2V0U3RhdGUgPSBhcmdzLmxlbmd0aCA9PT0gMSAmJiBhcmdzWzBdID09PSAnZ2V0U3RhdGUnO1xuICAgIGNvbnN0IGlzQmluZEV2ZW50TGlzdGVuZXIgPSBhcmdzLmxlbmd0aCA+PSAyICYmIGFyZ3NbMF0gPT09ICdvbkNoYW5nZScgJiYgdHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbic7XG4gICAgaWYgKGlzRW1wdHlBcmdzKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gYXJnc1swXSA/IGFyZ3NbMF0gOiB7fTtcbiAgICAgICAgcmV0dXJuIG1ldGhvZHMuaW5pdC5jYWxsKHRoaXMsIHN0YXRlKTtcbiAgICB9XG4gICAgaWYgKGlzVXBkYXRlKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gYXJnc1sxXTtcbiAgICAgICAgcmV0dXJuIG1ldGhvZHMudXBkYXRlLmNhbGwodGhpcywgc3RhdGUpO1xuICAgIH1cbiAgICBpZiAoaXNHZXRTdGF0ZSkge1xuICAgICAgICByZXR1cm4gbWV0aG9kcy5nZXRTdGF0ZS5jYWxsKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoaXNCaW5kRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICBjb25zdCBjYWxsYmFjayA9IGFyZ3NbMV07XG4gICAgICAgIHJldHVybiBtZXRob2RzLm9uQ2hhbmdlLmNhbGwodGhpcywgY2FsbGJhY2spO1xuICAgIH1cbiAgICByZXR1cm4gJC5lcnJvcignVGhpcyBtZXRob2QgZG9lcyBub3QgZXhpc3QnKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY29udmVydFBlcmNlbnRJblZhbHVlID0gZXhwb3J0cy5jb252ZXJ0UGl4ZWxJblBlcmNlbnQgPSBleHBvcnRzLmNvbnZlcnRWYWx1ZUluUGVyY2VudCA9IHZvaWQgMDtcbi8qIGVzbGludC1kaXNhYmxlIG5vLW1peGVkLW9wZXJhdG9ycyAqL1xuZnVuY3Rpb24gY29udmVydFZhbHVlSW5QZXJjZW50KG1pbiwgbWF4LCB2YWx1ZSkge1xuICAgIHJldHVybiAoMTAwIC8gKG1heCAtIG1pbikpICogKHZhbHVlIC0gbWluKTtcbn1cbmV4cG9ydHMuY29udmVydFZhbHVlSW5QZXJjZW50ID0gY29udmVydFZhbHVlSW5QZXJjZW50O1xuZnVuY3Rpb24gY29udmVydFBpeGVsSW5QZXJjZW50KHdpZHRoLCB2YWx1ZSkge1xuICAgIHJldHVybiAoMTAwIC8gd2lkdGgpICogdmFsdWU7XG59XG5leHBvcnRzLmNvbnZlcnRQaXhlbEluUGVyY2VudCA9IGNvbnZlcnRQaXhlbEluUGVyY2VudDtcbmZ1bmN0aW9uIGNvbnZlcnRQZXJjZW50SW5WYWx1ZShtaW4sIG1heCwgcGVyY2VudCkge1xuICAgIHJldHVybiAoKG1heCAtIG1pbikgLyAxMDApICogcGVyY2VudCArIG1pbjtcbn1cbmV4cG9ydHMuY29udmVydFBlcmNlbnRJblZhbHVlID0gY29udmVydFBlcmNlbnRJblZhbHVlO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vYXBwLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9