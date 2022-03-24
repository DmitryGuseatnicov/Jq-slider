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
const Handle_1 = __importDefault(__webpack_require__(/*! ./Handle */ "./AppComponents/View/SubViewComponents/Handle/Handle.ts"));
const calcUtils_1 = __webpack_require__(/*! ../../../../utils/calcUtils */ "./utils/calcUtils.ts");
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
const abstractSubView_1 = __importDefault(__webpack_require__(/*! ../../abstractSubView/abstractSubView */ "./AppComponents/View/abstractSubView/abstractSubView.ts"));
const calcUtils_1 = __webpack_require__(/*! ../../../../utils/calcUtils */ "./utils/calcUtils.ts");
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
                    const sliderSize = horizontal ? this.slider.clientHeight : this.slider.clientWidth;
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
            min, max, to, horizontal,
        };
        this.update();
    }
    update() {
        const { min, max, to, horizontal, } = this.state;
        const isNumbers = typeof min === 'number' && typeof max === 'number' && typeof to === 'number';
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
const abstractSubView_1 = __importDefault(__webpack_require__(/*! ../../abstractSubView/abstractSubView */ "./AppComponents/View/abstractSubView/abstractSubView.ts"));
const calcUtils_1 = __webpack_require__(/*! ../../../../utils/calcUtils */ "./utils/calcUtils.ts");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zbGlkZXIuc2Nzcz8wYmE5Iiwid2VicGFjazovLy8uL0FwcENvbXBvbmVudHMvRXZlbnRDcmVhdG9yL0V2ZW50Q3JlYXRvci50cyIsIndlYnBhY2s6Ly8vLi9BcHBDb21wb25lbnRzL0V2ZW50Q3JlYXRvci9NeUV2ZW50LnRzIiwid2VicGFjazovLy8uL0FwcENvbXBvbmVudHMvTW9kZWwvTW9kZWwudHMiLCJ3ZWJwYWNrOi8vLy4vQXBwQ29tcG9uZW50cy9QcmVzZW50ZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL0FwcENvbXBvbmVudHMvVmlldy9TdWJWaWV3Q29tcG9uZW50cy9IYW5kbGUvSGFuZGxlLnRzIiwid2VicGFjazovLy8uL0FwcENvbXBvbmVudHMvVmlldy9TdWJWaWV3Q29tcG9uZW50cy9IYW5kbGUvU2Vjb25kSGFuZGxlLnRzIiwid2VicGFjazovLy8uL0FwcENvbXBvbmVudHMvVmlldy9TdWJWaWV3Q29tcG9uZW50cy9TY2FsZS9TY2FsZS50cyIsIndlYnBhY2s6Ly8vLi9BcHBDb21wb25lbnRzL1ZpZXcvU3ViVmlld0NvbXBvbmVudHMvVGlwL1NlY29uZFRpcC50cyIsIndlYnBhY2s6Ly8vLi9BcHBDb21wb25lbnRzL1ZpZXcvU3ViVmlld0NvbXBvbmVudHMvVGlwL1RpcC50cyIsIndlYnBhY2s6Ly8vLi9BcHBDb21wb25lbnRzL1ZpZXcvU3ViVmlld0NvbXBvbmVudHMvVHJhY2svVHJhY2sudHMiLCJ3ZWJwYWNrOi8vLy4vQXBwQ29tcG9uZW50cy9WaWV3L1ZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vQXBwQ29tcG9uZW50cy9WaWV3L2Fic3RyYWN0U3ViVmlldy9hYnN0cmFjdFN1YlZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwLnRzIiwid2VicGFjazovLy8uL3V0aWxzL2NhbGNVdGlscy50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgTXlFdmVudF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL015RXZlbnRcIikpO1xuY2xhc3MgRXZlbnRDcmVhdG9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ldmVudHMgPSB7fTtcbiAgICB9XG4gICAgcmVnaXN0ZXJFdmVudChldmVudE5hbWUpIHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgTXlFdmVudF8xLmRlZmF1bHQoZXZlbnROYW1lKTtcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IGV2ZW50O1xuICAgIH1cbiAgICBkaXNwYXRjaEV2ZW50KGV2ZW50TmFtZSwgZXZlbnRBcmdzKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uY2FsbGJhY2tzLmZvckVhY2goKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayhldmVudEFyZ3MpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0ucmVnaXN0ZXJDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gRXZlbnRDcmVhdG9yO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBNeUV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzID0gW107XG4gICAgfVxuICAgIHJlZ2lzdGVyQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gTXlFdmVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRXZlbnRDcmVhdG9yXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL0V2ZW50Q3JlYXRvci9FdmVudENyZWF0b3JcIikpO1xuY2xhc3MgTW9kZWwgZXh0ZW5kcyBFdmVudENyZWF0b3JfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgbWF4OiAxMDAsXG4gICAgICAgICAgICBmcm9tOiAwLFxuICAgICAgICAgICAgdG86IDEwMCxcbiAgICAgICAgICAgIHN0ZXA6IDEsXG4gICAgICAgICAgICB0aXA6IHRydWUsXG4gICAgICAgICAgICByYW5nZTogdHJ1ZSxcbiAgICAgICAgICAgIHByb2dyZXNzOiB0cnVlLFxuICAgICAgICAgICAgc2NhbGU6IHRydWUsXG4gICAgICAgICAgICBzY2FsZURlc3Rpbnk6IDEwLFxuICAgICAgICAgICAgaG9yaXpvbnRhbDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW5pdChzdGF0ZSk7XG4gICAgfVxuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIGNvbnN0IFt2YWx1ZXMsIHNldHRpbmdzXSA9IHRoaXMuc3BsaXRQYXJhbXMoc3RhdGUpO1xuICAgICAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlKSwgdGhpcy5taW5NYXhWYWxpZGF0b3Ioc2V0dGluZ3MpKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZSksIHRoaXMucmFuZ2VGcm9tVG9WYWxpZGF0b3IodGhpcy5zdGVwVmFsaWRhdG9yKHZhbHVlcykpKTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdNb2RlbEV2ZW50JywgdGhpcy5zdGF0ZSk7XG4gICAgfVxuICAgIGdldFN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICB9XG4gICAgaW5pdChzdGF0ZSkge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ01vZGVsRXZlbnQnKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSk7XG4gICAgfVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gICAgc3BsaXRQYXJhbXMoZGF0YSkge1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSB7fTtcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSB7fTtcbiAgICAgICAgaWYgKCdmcm9tJyBpbiBkYXRhKSB7XG4gICAgICAgICAgICB2YWx1ZXMuZnJvbSA9IGRhdGEuZnJvbTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlcy5mcm9tID0gdGhpcy5zdGF0ZS5mcm9tO1xuICAgICAgICB9XG4gICAgICAgIGlmICgndG8nIGluIGRhdGEpIHtcbiAgICAgICAgICAgIHZhbHVlcy50byA9IGRhdGEudG87XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZXMudG8gPSB0aGlzLnN0YXRlLnRvO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5zdGVwICYmIGRhdGEuc3RlcCA+IDApXG4gICAgICAgICAgICBzZXR0aW5ncy5zdGVwID0gZGF0YS5zdGVwO1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEubWluID09PSAnbnVtYmVyJylcbiAgICAgICAgICAgIHNldHRpbmdzLm1pbiA9IGRhdGEubWluO1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEubWF4ID09PSAnbnVtYmVyJylcbiAgICAgICAgICAgIHNldHRpbmdzLm1heCA9IGRhdGEubWF4O1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEuc2NhbGVEZXN0aW55ID09PSAnbnVtYmVyJylcbiAgICAgICAgICAgIHNldHRpbmdzLnNjYWxlRGVzdGlueSA9IGRhdGEuc2NhbGVEZXN0aW55O1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEuc2NhbGUgPT09ICdib29sZWFuJylcbiAgICAgICAgICAgIHNldHRpbmdzLnNjYWxlID0gZGF0YS5zY2FsZTtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhLnJhbmdlID09PSAnYm9vbGVhbicpXG4gICAgICAgICAgICBzZXR0aW5ncy5yYW5nZSA9IGRhdGEucmFuZ2U7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS50aXAgPT09ICdib29sZWFuJylcbiAgICAgICAgICAgIHNldHRpbmdzLnRpcCA9IGRhdGEudGlwO1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEuaG9yaXpvbnRhbCA9PT0gJ2Jvb2xlYW4nKVxuICAgICAgICAgICAgc2V0dGluZ3MuaG9yaXpvbnRhbCA9IGRhdGEuaG9yaXpvbnRhbDtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhLnByb2dyZXNzID09PSAnYm9vbGVhbicpXG4gICAgICAgICAgICBzZXR0aW5ncy5wcm9ncmVzcyA9IGRhdGEucHJvZ3Jlc3M7XG4gICAgICAgIHJldHVybiBbdmFsdWVzLCBzZXR0aW5nc107XG4gICAgfVxuICAgIG1pbk1heFZhbGlkYXRvcihkYXRhKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItY29uc3RcbiAgICAgICAgbGV0IHsgbWluID0gdGhpcy5zdGF0ZS5taW4sIG1heCA9IHRoaXMuc3RhdGUubWF4IH0gPSBkYXRhO1xuICAgICAgICBpZiAobWluID4gbWF4KVxuICAgICAgICAgICAgbWluID0gbWF4O1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBkYXRhKSwgeyBtaW4sIG1heCB9KTtcbiAgICB9XG4gICAgc3RlcFZhbGlkYXRvcihkYXRhKSB7XG4gICAgICAgIGNvbnN0IGNvcHlPZkRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhKTtcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tTdGVwKHZhbHVlLCBzdGVwKSB7XG4gICAgICAgICAgICByZXR1cm4gKyhNYXRoLnJvdW5kKHZhbHVlIC8gc3RlcCkgKiBzdGVwKS50b0ZpeGVkKDIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgY29weU9mRGF0YS5mcm9tID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgY29weU9mRGF0YS5mcm9tID0gY2hlY2tTdGVwKGNvcHlPZkRhdGEuZnJvbSwgdGhpcy5zdGF0ZS5zdGVwKTtcbiAgICAgICAgICAgIGlmIChjb3B5T2ZEYXRhLmZyb20gPD0gdGhpcy5zdGF0ZS5taW4pXG4gICAgICAgICAgICAgICAgY29weU9mRGF0YS5mcm9tID0gdGhpcy5zdGF0ZS5taW47XG4gICAgICAgICAgICBlbHNlIGlmIChjb3B5T2ZEYXRhLmZyb20gPj0gdGhpcy5zdGF0ZS5tYXgpXG4gICAgICAgICAgICAgICAgY29weU9mRGF0YS5mcm9tID0gdGhpcy5zdGF0ZS5tYXg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBjb3B5T2ZEYXRhLnRvID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgY29weU9mRGF0YS50byA9IGNoZWNrU3RlcChjb3B5T2ZEYXRhLnRvLCB0aGlzLnN0YXRlLnN0ZXApO1xuICAgICAgICAgICAgaWYgKGNvcHlPZkRhdGEudG8gPD0gdGhpcy5zdGF0ZS5taW4pXG4gICAgICAgICAgICAgICAgY29weU9mRGF0YS50byA9IHRoaXMuc3RhdGUubWluO1xuICAgICAgICAgICAgZWxzZSBpZiAoY29weU9mRGF0YS50byA+PSB0aGlzLnN0YXRlLm1heClcbiAgICAgICAgICAgICAgICBjb3B5T2ZEYXRhLnRvID0gdGhpcy5zdGF0ZS5tYXg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvcHlPZkRhdGE7XG4gICAgfVxuICAgIHJhbmdlRnJvbVRvVmFsaWRhdG9yKGRhdGEpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnJhbmdlKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb3B5T2ZTRGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGEpO1xuICAgICAgICBjb25zdCBpc0Zyb21Ob3RWYWxpZGx5ID0gY29weU9mU0RhdGEuZnJvbSAmJiB0aGlzLnN0YXRlLnRvIC0gY29weU9mU0RhdGEuZnJvbSA8PSAwO1xuICAgICAgICBjb25zdCBpc1RvTm90VmFsaWRseSA9IGNvcHlPZlNEYXRhLnRvICYmIGNvcHlPZlNEYXRhLnRvIC0gdGhpcy5zdGF0ZS5mcm9tIDw9IDA7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZyb20gPiB0aGlzLnN0YXRlLnRvKVxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5mcm9tID0gdGhpcy5zdGF0ZS50bztcbiAgICAgICAgaWYgKGlzRnJvbU5vdFZhbGlkbHkpXG4gICAgICAgICAgICBjb3B5T2ZTRGF0YS5mcm9tID0gdGhpcy5zdGF0ZS50bztcbiAgICAgICAgaWYgKGlzVG9Ob3RWYWxpZGx5KVxuICAgICAgICAgICAgY29weU9mU0RhdGEudG8gPSB0aGlzLnN0YXRlLmZyb207XG4gICAgICAgIHJldHVybiBjb3B5T2ZTRGF0YTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBNb2RlbDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgTW9kZWxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vTW9kZWwvTW9kZWxcIikpO1xuY29uc3QgVmlld18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9WaWV3L1ZpZXdcIikpO1xuY29uc3QgRXZlbnRDcmVhdG9yXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL0V2ZW50Q3JlYXRvci9FdmVudENyZWF0b3JcIikpO1xuY29uc3QgY2FsY1V0aWxzXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvY2FsY1V0aWxzXCIpO1xuY2xhc3MgUHJlc2VudGVyIGV4dGVuZHMgRXZlbnRDcmVhdG9yXzEuZGVmYXVsdCB7XG4gICAgY29uc3RydWN0b3Iobm9kZUVsZW0sIHN0YXRlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3XzEuZGVmYXVsdChub2RlRWxlbSk7XG4gICAgICAgIHRoaXMubW9kZWwgPSBuZXcgTW9kZWxfMS5kZWZhdWx0KHN0YXRlKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCdvbkNoYW5nZScpO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy52aWV3LnNldFN0YXRlKHRoaXMubW9kZWwuZ2V0U3RhdGUoKSk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuICAgIGJpbmRFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy52aWV3RXZlbnRIYW5kbGVyID0gdGhpcy52aWV3RXZlbnRIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMubW9kZWxFdmVudEhhbmRsZXIgPSB0aGlzLm1vZGVsRXZlbnRIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMudmlldy5hZGRFdmVudExpc3RlbmVyKCdWaWV3RXZlbnQnLCB0aGlzLnZpZXdFdmVudEhhbmRsZXIpO1xuICAgICAgICB0aGlzLm1vZGVsLmFkZEV2ZW50TGlzdGVuZXIoJ01vZGVsRXZlbnQnLCB0aGlzLm1vZGVsRXZlbnRIYW5kbGVyKTtcbiAgICB9XG4gICAgdmlld0V2ZW50SGFuZGxlcihlKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXggfSA9IHRoaXMubW9kZWwuZ2V0U3RhdGUoKTtcbiAgICAgICAgaWYgKHR5cGVvZiBtaW4gPT09ICdudW1iZXInICYmIHR5cGVvZiBtYXggPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBpZiAoZS5mcm9tKVxuICAgICAgICAgICAgICAgIGUuZnJvbSA9ICsoMCwgY2FsY1V0aWxzXzEuY29udmVydFBlcmNlbnRJblZhbHVlKShtaW4sIG1heCwgZS5mcm9tKS50b0ZpeGVkKDMpO1xuICAgICAgICAgICAgaWYgKGUudG8pXG4gICAgICAgICAgICAgICAgZS50byA9ICsoMCwgY2FsY1V0aWxzXzEuY29udmVydFBlcmNlbnRJblZhbHVlKShtaW4sIG1heCwgZS50bykudG9GaXhlZCgzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vZGVsLnNldFN0YXRlKGUpO1xuICAgIH1cbiAgICBtb2RlbEV2ZW50SGFuZGxlcihlKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnb25DaGFuZ2UnLCBlKTtcbiAgICAgICAgdGhpcy52aWV3LnNldFN0YXRlKGUpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFByZXNlbnRlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYWJzdHJhY3RTdWJWaWV3XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uLy4uL2Fic3RyYWN0U3ViVmlldy9hYnN0cmFjdFN1YlZpZXdcIikpO1xuY29uc3QgY2FsY1V0aWxzXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vdXRpbHMvY2FsY1V0aWxzXCIpO1xuY2xhc3MgSGFuZGxlIGV4dGVuZHMgYWJzdHJhY3RTdWJWaWV3XzEuZGVmYXVsdCB7XG4gICAgY29uc3RydWN0b3Ioc2xpZGVyKSB7XG4gICAgICAgIHN1cGVyKHNsaWRlcik7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4LCBmcm9tLCBob3Jpem9udGFsLCB9ID0gc3RhdGU7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUpLCB7IG1pbiwgbWF4LCBmcm9tLCBob3Jpem9udGFsIH0pO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICBnZXRQb3NpdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgY29uc3Qgc3ViVmlld1RvcCA9IHRoaXMuc3ViVmlldy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgICAgICAgICBjb25zdCBzbGlkZXJUb3AgPSB0aGlzLnNsaWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgICAgICAgICByZXR1cm4gc3ViVmlld1RvcCAtIHNsaWRlclRvcCArIHRoaXMuc3ViVmlldy5vZmZzZXRIZWlnaHQgLyAyO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN1YlZpZXdMZWZ0ID0gdGhpcy5zdWJWaWV3LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgICAgIGNvbnN0IHNsaWRlckxlZnQgPSB0aGlzLnNsaWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgICAgICByZXR1cm4gc3ViVmlld0xlZnQgLSBzbGlkZXJMZWZ0ICsgdGhpcy5zdWJWaWV3Lm9mZnNldFdpZHRoIC8gMjtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVTdWJWaWV3KCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnU3ViVmlld0V2ZW50Jyk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50TGlzdGVuZXIoKTtcbiAgICB9XG4gICAgY3JlYXRlU3ViVmlldygpIHtcbiAgICAgICAgdGhpcy5zdWJWaWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5jbGFzc0xpc3QuYWRkKCdqcS1zbGlkZXJfX2hhbmRsZScpO1xuICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmRDaGlsZCh0aGlzLnN1YlZpZXcpO1xuICAgIH1cbiAgICBiaW5kRXZlbnRMaXN0ZW5lcigpIHtcbiAgICAgICAgdGhpcy5wb2ludGVyU3RhcnQgPSB0aGlzLnBvaW50ZXJTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnN1YlZpZXcuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCB0aGlzLnBvaW50ZXJTdGFydCk7XG4gICAgfVxuICAgIHBvaW50ZXJTdGFydCgpIHtcbiAgICAgICAgdGhpcy5wb2ludGVySGFuZGxlciA9IHRoaXMucG9pbnRlckhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5yZW1vdmVQb2ludFN0YXJ0ID0gdGhpcy5yZW1vdmVQb2ludFN0YXJ0LmJpbmQodGhpcyk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIHRoaXMucG9pbnRlckhhbmRsZXIpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgdGhpcy5yZW1vdmVQb2ludFN0YXJ0KTtcbiAgICB9XG4gICAgcmVtb3ZlUG9pbnRTdGFydCgpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgdGhpcy5wb2ludGVySGFuZGxlcik7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIHRoaXMucG9pbnRlckhhbmRsZXIpO1xuICAgIH1cbiAgICBwb2ludGVySGFuZGxlcihlKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnU3ViVmlld0V2ZW50Jywge1xuICAgICAgICAgICAgdGFyZ2V0OiAnaGFuZGxlJyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLnN0YXRlLmhvcml6b250YWxcbiAgICAgICAgICAgICAgICA/IGUuY2xpZW50WSAtIHRoaXMuc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcFxuICAgICAgICAgICAgICAgIDogZS5jbGllbnRYIC0gdGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCwgZnJvbSwgaG9yaXpvbnRhbCwgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IGlzTnVtYmVycyA9IHR5cGVvZiBtaW4gPT09ICdudW1iZXInICYmIHR5cGVvZiBtYXggPT09ICdudW1iZXInICYmIHR5cGVvZiBmcm9tID09PSAnbnVtYmVyJztcbiAgICAgICAgaWYgKGlzTnVtYmVycykge1xuICAgICAgICAgICAgaWYgKGhvcml6b250YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YlZpZXcuc3R5bGUudG9wID0gYCR7KDAsIGNhbGNVdGlsc18xLmNvbnZlcnRWYWx1ZUluUGVyY2VudCkobWluLCBtYXgsIGZyb20pfSVgO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3ViVmlldy5zdHlsZS5sZWZ0ID0gYCR7KDAsIGNhbGNVdGlsc18xLmNvbnZlcnRWYWx1ZUluUGVyY2VudCkobWluLCBtYXgsIGZyb20pfSVgO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gSGFuZGxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBIYW5kbGVfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9IYW5kbGVcIikpO1xuY29uc3QgY2FsY1V0aWxzXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vdXRpbHMvY2FsY1V0aWxzXCIpO1xuY2xhc3MgU2Vjb25kSGFuZGxlIGV4dGVuZHMgSGFuZGxlXzEuZGVmYXVsdCB7XG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCwgdG8sIGhvcml6b250YWwsIH0gPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZSksIHsgbWluLCBtYXgsIHRvLCBob3Jpem9udGFsIH0pO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICBwb2ludGVySGFuZGxlcihlKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnU3ViVmlld0V2ZW50Jywge1xuICAgICAgICAgICAgdGFyZ2V0OiAnc2Vjb25kSGFuZGxlJyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLnN0YXRlLmhvcml6b250YWxcbiAgICAgICAgICAgICAgICA/IGUuY2xpZW50WSAtIHRoaXMuc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcFxuICAgICAgICAgICAgICAgIDogZS5jbGllbnRYIC0gdGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCwgdG8sIGhvcml6b250YWwsIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBpc051bWJlcnMgPSB0eXBlb2YgbWluID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgbWF4ID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgdG8gPT09ICdudW1iZXInO1xuICAgICAgICBpZiAoaXNOdW1iZXJzKSB7XG4gICAgICAgICAgICBpZiAoaG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3ViVmlldy5zdHlsZS50b3AgPSBgJHsoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgdG8pfSVgO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3ViVmlldy5zdHlsZS5sZWZ0ID0gYCR7KDAsIGNhbGNVdGlsc18xLmNvbnZlcnRWYWx1ZUluUGVyY2VudCkobWluLCBtYXgsIHRvKX0lYDtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFNlY29uZEhhbmRsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYWJzdHJhY3RTdWJWaWV3XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uLy4uL2Fic3RyYWN0U3ViVmlldy9hYnN0cmFjdFN1YlZpZXdcIikpO1xuY29uc3QgY2FsY1V0aWxzXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vdXRpbHMvY2FsY1V0aWxzXCIpO1xuY2xhc3MgU2NhbGUgZXh0ZW5kcyBhYnN0cmFjdFN1YlZpZXdfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3RvcihzbGlkZXIpIHtcbiAgICAgICAgc3VwZXIoc2xpZGVyKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIHN0ZXAsIGhvcml6b250YWwsIHNjYWxlRGVzdGlueSwgfSA9IHN0YXRlO1xuICAgICAgICBjb25zdCBvbGRTdGF0ZSA9IEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUpO1xuICAgICAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlKSwgeyBtaW4sIG1heCwgc3RlcCwgaG9yaXpvbnRhbCwgc2NhbGVEZXN0aW55IH0pO1xuICAgICAgICBpZiAob2xkU3RhdGUgIT09IEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUpKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlU3ViVmlldygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ1N1YlZpZXdFdmVudCcpO1xuICAgIH1cbiAgICBjcmVhdGVTdWJWaWV3KCkge1xuICAgICAgICB0aGlzLnN1YlZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5zdWJWaWV3LmNsYXNzTGlzdC5hZGQoJ2pxLXNsaWRlcl9fc2NhbGUnKTtcbiAgICAgICAgdGhpcy5zbGlkZXIuYXBwZW5kQ2hpbGQodGhpcy5zdWJWaWV3KTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4LCBzdGVwLCBob3Jpem9udGFsLCBzY2FsZURlc3RpbnksIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBpc0NvcnJlY3RQYXJhbXMgPSB0eXBlb2YgbWluID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgbWF4ID09PSAnbnVtYmVyJyAmJiB0eXBlb2Ygc2NhbGVEZXN0aW55ID09PSAnbnVtYmVyJ1xuICAgICAgICAgICAgJiYgdHlwZW9mIHN0ZXAgPT09ICdudW1iZXInICYmIHR5cGVvZiBob3Jpem9udGFsID09PSAnYm9vbGVhbic7XG4gICAgICAgIGlmIChpc0NvcnJlY3RQYXJhbXMpIHtcbiAgICAgICAgICAgIGxldCBwaXBzID0gdGhpcy5jcmVhdGVQaXBGcmFnbWVudChtaW4sIG1heCwgbWluKTtcbiAgICAgICAgICAgIGZvciAobGV0IHBpcCA9IG1pbiArIDE7IHBpcCA8IG1heDsgcGlwICs9IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAocGlwICUgc2NhbGVEZXN0aW55ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHBpcHMgKz0gdGhpcy5jcmVhdGVQaXBGcmFnbWVudChtaW4sIG1heCwgcGlwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwaXBzICs9IHRoaXMuY3JlYXRlUGlwRnJhZ21lbnQobWluLCBtYXgsIG1heCk7XG4gICAgICAgICAgICB0aGlzLnN1YlZpZXcuaW5uZXJIVE1MID0gcGlwcztcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50TGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjcmVhdGVQaXBGcmFnbWVudChtaW4sIG1heCwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJqcS1zbGlkZXJfX3NjYWxlLXBpcFwiIHN0eWxlPVwidG9wOiR7KDAsIGNhbGNVdGlsc18xLmNvbnZlcnRQZXJjZW50SW5WYWx1ZSkoMCwgdGhpcy5zbGlkZXIuY2xpZW50SGVpZ2h0LCAoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgdmFsdWUpKX1weFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwianEtc2xpZGVyX19zY2FsZS1sYWJlbFwiPiR7dmFsdWV9PC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwianEtc2xpZGVyX19zY2FsZS1waXBcIiBzdHlsZT1cImxlZnQ6JHsoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgdmFsdWUpfSVcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImpxLXNsaWRlcl9fc2NhbGUtbGFiZWxcIj4ke3ZhbHVlfTwvZGl2PlxuICAgICAgPC9kaXY+YDtcbiAgICB9XG4gICAgYmluZEV2ZW50TGlzdGVuZXIoKSB7XG4gICAgICAgIHRoaXMuY2xpY2tIYW5kbGVyID0gdGhpcy5jbGlja0hhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zdWJWaWV3LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcS1zbGlkZXJfX3NjYWxlLWxhYmVsJykuZm9yRWFjaCgocGlwKSA9PiB7XG4gICAgICAgICAgICBpZiAocGlwIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBwaXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjbGlja0hhbmRsZXIoZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgY29uc3QgeyBtaW4sIG1heCwgaG9yaXpvbnRhbCB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWluID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgbWF4ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9uZVBlcmNlbnQgPSBob3Jpem9udGFsXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5zbGlkZXIuY2xpZW50SGVpZ2h0IC8gMTAwXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5zbGlkZXIuY2xpZW50V2lkdGggLyAxMDA7XG4gICAgICAgICAgICAgICAgY29uc3QgcGVyY2VudHMgPSBob3Jpem9udGFsXG4gICAgICAgICAgICAgICAgICAgID8gKDAsIGNhbGNVdGlsc18xLmNvbnZlcnRWYWx1ZUluUGVyY2VudCkobWluLCBtYXgsICtlLnRhcmdldC5pbm5lckhUTUwpXG4gICAgICAgICAgICAgICAgICAgIDogKDAsIGNhbGNVdGlsc18xLmNvbnZlcnRWYWx1ZUluUGVyY2VudCkobWluLCBtYXgsICtlLnRhcmdldC5pbm5lckhUTUwpO1xuICAgICAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9IG9uZVBlcmNlbnQgKiBwZXJjZW50cztcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpZGVyU2l6ZSA9IGhvcml6b250YWwgPyB0aGlzLnNsaWRlci5jbGllbnRIZWlnaHQgOiB0aGlzLnNsaWRlci5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSB0aGlzLmdldFBvc2l0aW9uKCkgLSBzbGlkZXJTaXplO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ1N1YlZpZXdFdmVudCcsIHsgdGFyZ2V0OiAnc2NhbGUnLCBwb3NpdGlvbiB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFNjYWxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBUaXBfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9UaXBcIikpO1xuY29uc3QgY2FsY1V0aWxzXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vdXRpbHMvY2FsY1V0aWxzXCIpO1xuY2xhc3MgU2Vjb25kVGlwIGV4dGVuZHMgVGlwXzEuZGVmYXVsdCB7XG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgY29uc3QgeyBtaW4gPSB0aGlzLnN0YXRlLm1pbiwgbWF4ID0gdGhpcy5zdGF0ZS5tYXgsIHRvID0gdGhpcy5zdGF0ZS50bywgaG9yaXpvbnRhbCA9IHRoaXMuc3RhdGUuaG9yaXpvbnRhbCwgfSA9IHN0YXRlO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgbWluLCBtYXgsIHRvLCBob3Jpem9udGFsLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXgsIHRvLCBob3Jpem9udGFsLCB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgaXNOdW1iZXJzID0gdHlwZW9mIG1pbiA9PT0gJ251bWJlcicgJiYgdHlwZW9mIG1heCA9PT0gJ251bWJlcicgJiYgdHlwZW9mIHRvID09PSAnbnVtYmVyJztcbiAgICAgICAgaWYgKGlzTnVtYmVycykge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNEb3VibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YlZpZXcuc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3ViVmlldy5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zdWJWaWV3LnRleHRDb250ZW50ID0gdG8udG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGlmIChob3Jpem9udGFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJWaWV3LnN0eWxlLnRvcCA9IGAkeygwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCB0byl9JWA7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zdWJWaWV3LnN0eWxlLmxlZnQgPSBgJHsoMCwgY2FsY1V0aWxzXzEuY29udmVydFZhbHVlSW5QZXJjZW50KShtaW4sIG1heCwgdG8pfSVgO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gU2Vjb25kVGlwO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhYnN0cmFjdFN1YlZpZXdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vYWJzdHJhY3RTdWJWaWV3L2Fic3RyYWN0U3ViVmlld1wiKSk7XG5jb25zdCBjYWxjVXRpbHNfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi91dGlscy9jYWxjVXRpbHNcIik7XG5jbGFzcyBUaXAgZXh0ZW5kcyBhYnN0cmFjdFN1YlZpZXdfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3RvcihzbGlkZXIpIHtcbiAgICAgICAgc3VwZXIoc2xpZGVyKTtcbiAgICAgICAgdGhpcy5pc0RvdWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCwgZnJvbSwgdG8sIGhvcml6b250YWwsIH0gPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIG1pbiwgbWF4LCBmcm9tLCB0bywgaG9yaXpvbnRhbCxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgY2hhbmdlSXNEb3VibGUodmFsKSB7XG4gICAgICAgIHRoaXMuaXNEb3VibGUgPSB2YWw7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlU3ViVmlldygpO1xuICAgIH1cbiAgICBjcmVhdGVTdWJWaWV3KCkge1xuICAgICAgICB0aGlzLnN1YlZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5zdWJWaWV3LmNsYXNzTGlzdC5hZGQoJ2pxLXNsaWRlcl9fdGlwJyk7XG4gICAgICAgIHRoaXMuc2xpZGVyLmFwcGVuZENoaWxkKHRoaXMuc3ViVmlldyk7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCwgZnJvbSwgaG9yaXpvbnRhbCwgdG8sIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBpc051bWJlcnMgPSB0eXBlb2YgbWluID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgbWF4ID09PSAnbnVtYmVyJ1xuICAgICAgICAgICAgJiYgdHlwZW9mIGZyb20gPT09ICdudW1iZXInICYmIHR5cGVvZiBmcm9tID09PSAnbnVtYmVyJztcbiAgICAgICAgaWYgKGlzTnVtYmVycykge1xuICAgICAgICAgICAgdGhpcy5zdWJWaWV3LnRleHRDb250ZW50ID0gdGhpcy5pc0RvdWJsZSA/IGAke2Zyb219IC0gJHt0b31gIDogZnJvbS50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYgKGhvcml6b250YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YlZpZXcuc3R5bGUudG9wID0gYCR7KDAsIGNhbGNVdGlsc18xLmNvbnZlcnRWYWx1ZUluUGVyY2VudCkobWluLCBtYXgsIGZyb20pfSVgO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3ViVmlldy5zdHlsZS5sZWZ0ID0gYCR7KDAsIGNhbGNVdGlsc18xLmNvbnZlcnRWYWx1ZUluUGVyY2VudCkobWluLCBtYXgsIGZyb20pfSVgO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gVGlwO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhYnN0cmFjdFN1YlZpZXdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vYWJzdHJhY3RTdWJWaWV3L2Fic3RyYWN0U3ViVmlld1wiKSk7XG5jb25zdCBjYWxjVXRpbHNfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi91dGlscy9jYWxjVXRpbHNcIik7XG5jbGFzcyBUcmFjayBleHRlbmRzIGFic3RyYWN0U3ViVmlld18xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKHNsaWRlcikge1xuICAgICAgICBzdXBlcihzbGlkZXIpO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCwgZnJvbSwgdG8sIGhvcml6b250YWwsIHJhbmdlLCBwcm9ncmVzcywgfSA9IHN0YXRlO1xuICAgICAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlKSwgeyBtaW4sIG1heCwgZnJvbSwgdG8sIGhvcml6b250YWwsIHJhbmdlLCBwcm9ncmVzcyB9KTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgY3JlYXRlU3ViVmlldygpIHtcbiAgICAgICAgdGhpcy5zdWJWaWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5jbGFzc0xpc3QuYWRkKCdqcS1zbGlkZXJfX3RyYWNrJyk7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5wcm9ncmVzcy5jbGFzc0xpc3QuYWRkKCdqcS1zbGlkZXJfX3Byb2dyZXNzJyk7XG4gICAgICAgIHRoaXMuc3ViVmlldy5hcHBlbmRDaGlsZCh0aGlzLnByb2dyZXNzKTtcbiAgICAgICAgdGhpcy5zbGlkZXIuYXBwZW5kQ2hpbGQodGhpcy5zdWJWaWV3KTtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVTdWJWaWV3KCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnU3ViVmlld0V2ZW50Jyk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50TGlzdGVuZXIoKTtcbiAgICB9XG4gICAgYmluZEV2ZW50TGlzdGVuZXIoKSB7XG4gICAgICAgIHRoaXMuY2xpY2tIYW5kbGVyID0gdGhpcy5jbGlja0hhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zdWJWaWV3LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXIpO1xuICAgIH1cbiAgICBjbGlja0hhbmRsZXIoZSkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ1N1YlZpZXdFdmVudCcsIHtcbiAgICAgICAgICAgIHRhcmdldDogJ3RyYWNrJyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLnN0YXRlLmhvcml6b250YWxcbiAgICAgICAgICAgICAgICA/IGUuY2xpZW50WSAtIHRoaXMuc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcFxuICAgICAgICAgICAgICAgIDogZS5jbGllbnRYIC0gdGhpcy5zbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCwgZnJvbSwgdG8sIGhvcml6b250YWwsIHJhbmdlLCBwcm9ncmVzcywgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGlmICghcHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MucmVtb3ZlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXNOdW1iZXJzID0gdHlwZW9mIG1pbiA9PT0gJ251bWJlcicgJiYgdHlwZW9mIG1heCA9PT0gJ251bWJlcidcbiAgICAgICAgICAgICYmIHR5cGVvZiBmcm9tID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgdG8gPT09ICdudW1iZXInO1xuICAgICAgICBpZiAoaXNOdW1iZXJzKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydCA9ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCBmcm9tKTtcbiAgICAgICAgICAgIGNvbnN0IGVuZCA9ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0VmFsdWVJblBlcmNlbnQpKG1pbiwgbWF4LCB0byk7XG4gICAgICAgICAgICBpZiAoaG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgICAgIGlmIChyYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBlbmQgLSBzdGFydDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb25lUGVyY2VudCA9IHRoaXMuc2xpZGVyLmNsaWVudEhlaWdodCAvIDEwMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9JWA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3Muc3R5bGUubWFyZ2luVG9wID0gYCR7b25lUGVyY2VudCAqIHN0YXJ0fXB4YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3Muc3R5bGUuaGVpZ2h0ID0gYCR7c3RhcnR9JWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyYW5nZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gZW5kIC0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5zdHlsZS53aWR0aCA9IGAke3dpZHRofSVgO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3Muc3R5bGUubWFyZ2luTGVmdCA9IGAke3N0YXJ0fSVgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5zdHlsZS53aWR0aCA9IGAke3N0YXJ0fSVgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gVHJhY2s7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEhhbmRsZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1N1YlZpZXdDb21wb25lbnRzL0hhbmRsZS9IYW5kbGVcIikpO1xuY29uc3QgU2Vjb25kSGFuZGxlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vU3ViVmlld0NvbXBvbmVudHMvSGFuZGxlL1NlY29uZEhhbmRsZVwiKSk7XG5jb25zdCBTY2FsZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1N1YlZpZXdDb21wb25lbnRzL1NjYWxlL1NjYWxlXCIpKTtcbmNvbnN0IFRpcF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1N1YlZpZXdDb21wb25lbnRzL1RpcC9UaXBcIikpO1xuY29uc3QgU2Vjb25kVGlwXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vU3ViVmlld0NvbXBvbmVudHMvVGlwL1NlY29uZFRpcFwiKSk7XG5jb25zdCBUcmFja18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1N1YlZpZXdDb21wb25lbnRzL1RyYWNrL1RyYWNrXCIpKTtcbmNvbnN0IEV2ZW50Q3JlYXRvcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9FdmVudENyZWF0b3IvRXZlbnRDcmVhdG9yXCIpKTtcbmNvbnN0IGNhbGNVdGlsc18xID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL2NhbGNVdGlsc1wiKTtcbmNsYXNzIFZpZXcgZXh0ZW5kcyBFdmVudENyZWF0b3JfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlRWxlbSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm5vZGVFbGVtID0gbm9kZUVsZW07XG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IFtdO1xuICAgICAgICB0aGlzLnN0YXRlID0ge307XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICB0aGlzLmNoZWNrSXNDaGFuZ2VkU2V0dGluZ3Moc3RhdGUpO1xuICAgICAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlKSwgc3RhdGUpO1xuICAgICAgICB0aGlzLnVwZGF0ZSh0aGlzLnN0YXRlKTtcbiAgICAgICAgdGhpcy5jaGVja1RpcHMoKTtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVTbGlkZXIoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCdWaWV3RXZlbnQnKTtcbiAgICB9XG4gICAgY3JlYXRlU2xpZGVyKCkge1xuICAgICAgICB0aGlzLnNsaWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnNsaWRlci5jbGFzc0xpc3QuYWRkKCdqcS1zbGlkZXInKTtcbiAgICAgICAgdGhpcy5ub2RlRWxlbS5hcHBlbmRDaGlsZCh0aGlzLnNsaWRlcik7XG4gICAgfVxuICAgIGNyZWF0ZUNvbXBvbmVudHMoc3RhdGUpIHtcbiAgICAgICAgY29uc3QgeyByYW5nZSwgdGlwLCBzY2FsZSwgaG9yaXpvbnRhbCwgfSA9IHN0YXRlO1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMucHVzaChuZXcgSGFuZGxlXzEuZGVmYXVsdCh0aGlzLnNsaWRlcikpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMucHVzaChuZXcgVHJhY2tfMS5kZWZhdWx0KHRoaXMuc2xpZGVyKSk7XG4gICAgICAgIGlmICh0aXApIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50cy5wdXNoKG5ldyBUaXBfMS5kZWZhdWx0KHRoaXMuc2xpZGVyKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMucHVzaChuZXcgU2Vjb25kSGFuZGxlXzEuZGVmYXVsdCh0aGlzLnNsaWRlcikpO1xuICAgICAgICAgICAgaWYgKHRpcCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50cy5wdXNoKG5ldyBTZWNvbmRUaXBfMS5kZWZhdWx0KHRoaXMuc2xpZGVyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjYWxlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMucHVzaChuZXcgU2NhbGVfMS5kZWZhdWx0KHRoaXMuc2xpZGVyKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhvcml6b250YWwpIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ2pxLXNsaWRlci0taG9yaXpvbnRhbCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zbGlkZXIuY2xhc3NMaXN0LnJlbW92ZSgnanEtc2xpZGVyLS1ob3Jpem9udGFsJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYmluZEV2ZW50TGlzdGVuZXIoKSB7XG4gICAgICAgIHRoaXMuc3ViVmlld0V2ZW50SGFuZGxlciA9IHRoaXMuc3ViVmlld0V2ZW50SGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMuZm9yRWFjaCgoY29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50LmV2ZW50cy5TdWJWaWV3RXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcignU3ViVmlld0V2ZW50JywgdGhpcy5zdWJWaWV3RXZlbnRIYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN1YlZpZXdFdmVudEhhbmRsZXIoZSkge1xuICAgICAgICBjb25zdCBzaXplID0gdGhpcy5zdGF0ZS5ob3Jpem9udGFsID8gdGhpcy5zbGlkZXIuY2xpZW50SGVpZ2h0IDogdGhpcy5zbGlkZXIuY2xpZW50V2lkdGg7XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gJ2hhbmRsZScpIHtcbiAgICAgICAgICAgIGNvbnN0IGZyb20gPSAoMCwgY2FsY1V0aWxzXzEuY29udmVydFBpeGVsSW5QZXJjZW50KShzaXplLCBlLnBvc2l0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnVmlld0V2ZW50JywgeyBmcm9tIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gJ3NlY29uZEhhbmRsZScpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvID0gKDAsIGNhbGNVdGlsc18xLmNvbnZlcnRQaXhlbEluUGVyY2VudCkoc2l6ZSwgZS5wb3NpdGlvbik7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ1ZpZXdFdmVudCcsIHsgdG8gfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUudGFyZ2V0ID09PSAndHJhY2snIHx8IGUudGFyZ2V0ID09PSAnc2NhbGUnKSB7XG4gICAgICAgICAgICBjb25zdCBoYW5kbGVzID0gdGhpcy5nZXRBcnJPZkNvbmNyZXRlU3ViVmlldyhIYW5kbGVfMS5kZWZhdWx0KTtcbiAgICAgICAgICAgIGNvbnN0IGZyb20gPSBoYW5kbGVzWzBdLmdldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5yYW5nZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvID0gaGFuZGxlc1sxXS5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhmcm9tIC0gZS5wb3NpdGlvbikgPCB0byAtIGUucG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdWaWV3RXZlbnQnLCB7IGZyb206ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0UGl4ZWxJblBlcmNlbnQpKHNpemUsIGUucG9zaXRpb24pIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnVmlld0V2ZW50JywgeyB0bzogKDAsIGNhbGNVdGlsc18xLmNvbnZlcnRQaXhlbEluUGVyY2VudCkoc2l6ZSwgZS5wb3NpdGlvbikgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdWaWV3RXZlbnQnLCB7IGZyb206ICgwLCBjYWxjVXRpbHNfMS5jb252ZXJ0UGl4ZWxJblBlcmNlbnQpKHNpemUsIGUucG9zaXRpb24pIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNoZWNrSXNDaGFuZ2VkU2V0dGluZ3Moc3RhdGUpIHtcbiAgICAgICAgY29uc3QgeyByYW5nZSwgdGlwLCBzY2FsZSwgaG9yaXpvbnRhbCwgcHJvZ3Jlc3MsIHNjYWxlRGVzdGlueSwgfSA9IHN0YXRlO1xuICAgICAgICBjb25zdCBpc1VwZGF0ZVNldHRpbmdzID0gcmFuZ2UgIT09IHRoaXMuc3RhdGUucmFuZ2UgfHwgdGlwICE9PSB0aGlzLnN0YXRlLnRpcFxuICAgICAgICAgICAgfHwgc2NhbGUgIT09IHRoaXMuc3RhdGUuc2NhbGUgfHwgaG9yaXpvbnRhbCAhPT0gdGhpcy5zdGF0ZS5ob3Jpem9udGFsXG4gICAgICAgICAgICB8fCBwcm9ncmVzcyAhPT0gdGhpcy5zdGF0ZS5wcm9ncmVzcyB8fCBzY2FsZURlc3RpbnkgIT09IHRoaXMuc3RhdGUuc2NhbGVEZXN0aW55O1xuICAgICAgICBpZiAoaXNVcGRhdGVTZXR0aW5ncykge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzID0gW107XG4gICAgICAgICAgICB0aGlzLnNsaWRlci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29tcG9uZW50cyhzdGF0ZSk7XG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudExpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2hlY2tUaXBzKCkge1xuICAgICAgICBjb25zdCB7IHRpcCwgcmFuZ2UsIGhvcml6b250YWwgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGlmICh0aXAgJiYgcmFuZ2UpIHtcbiAgICAgICAgICAgIGNvbnN0IHRpcHMgPSB0aGlzLmdldEFyck9mQ29uY3JldGVTdWJWaWV3KFRpcF8xLmRlZmF1bHQpO1xuICAgICAgICAgICAgY29uc3Qgc2l6ZSA9IGhvcml6b250YWwgPyB0aXBzWzFdLnN1YlZpZXcuY2xpZW50SGVpZ2h0IDogdGlwc1sxXS5zdWJWaWV3Lm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgY29uc3QgZmlyc3RQb3NpdGlvbiA9IHRpcHNbMF0uZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIGNvbnN0IHNlY29uZFBvc2l0aW9uID0gdGlwc1sxXS5nZXRQb3NpdGlvbigpIC0gc2l6ZTtcbiAgICAgICAgICAgIGlmIChmaXJzdFBvc2l0aW9uID4gc2Vjb25kUG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICB0aXBzLmZvckVhY2goKHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdC5jaGFuZ2VJc0RvdWJsZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdC5zZXRTdGF0ZSh0aGlzLnN0YXRlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRpcHMuZm9yRWFjaCgodCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0LmNoYW5nZUlzRG91YmxlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGUoc3RhdGUpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzLmZvckVhY2goKGNvbXBvbmVudCkgPT4gY29tcG9uZW50LnNldFN0YXRlKHN0YXRlKSk7XG4gICAgfVxuICAgIGdldEFyck9mQ29uY3JldGVTdWJWaWV3KGluc3RhbmNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudHMuZmlsdGVyKChjb21wb25lbnQpID0+IHsgdmFyIF9hOyByZXR1cm4gKF9hID0gY29tcG9uZW50IGluc3RhbmNlb2YgaW5zdGFuY2UpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGNvbXBvbmVudDsgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gVmlldztcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRXZlbnRDcmVhdG9yXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uLy4uL0V2ZW50Q3JlYXRvci9FdmVudENyZWF0b3JcIikpO1xuY2xhc3MgU3ViVmlldyBleHRlbmRzIEV2ZW50Q3JlYXRvcl8xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKHNsaWRlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnNsaWRlciA9IHNsaWRlcjtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHt9O1xuICAgIH1cbiAgICBnZXRQb3NpdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3ViVmlldy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc3ViVmlldy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFN1YlZpZXc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIGVzbGludC1kaXNhYmxlIGZzZC9uby1mdW5jdGlvbi1kZWNsYXJhdGlvbi1pbi1ldmVudC1saXN0ZW5lciAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBmdW5jLW5hbWVzICovXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBQcmVzZW50ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9BcHBDb21wb25lbnRzL1ByZXNlbnRlci9QcmVzZW50ZXJcIikpO1xucmVxdWlyZShcIi4vc2xpZGVyLnNjc3NcIik7XG5jb25zdCBtZXRob2RzID0ge1xuICAgIGluaXQoc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHN0YXRlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGlmICghJCh0aGlzKS5kYXRhKCdqcVNsaWRlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZGF0YSgpLmpxU2xpZGVyID0gbmV3IFByZXNlbnRlcl8xLmRlZmF1bHQodGhpcywgc3RhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICB1cGRhdGUoc3RhdGUpIHtcbiAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGpxU2xpZGVyID0gJCh0aGlzKS5kYXRhKCdqcVNsaWRlcicpO1xuICAgICAgICAgICAganFTbGlkZXIubW9kZWwuc2V0U3RhdGUoc3RhdGUpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdldFN0YXRlKCkge1xuICAgICAgICBjb25zdCBqcVNsaWRlciA9ICQodGhpcykuZGF0YSgnanFTbGlkZXInKTtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBqcVNsaWRlci5tb2RlbC5nZXRTdGF0ZSgpO1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfSxcbiAgICBvbkNoYW5nZShjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QganFTbGlkZXIgPSAkKHRoaXMpLmRhdGEoJ2pxU2xpZGVyJyk7XG4gICAgICAgICAgICBqcVNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdvbkNoYW5nZScsIChlKSA9PiBjYWxsYmFjayhlKSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG59O1xuJC5mbi5qcVNsaWRlciA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgY29uc3QgaXNFbXB0eUFyZ3MgPSBhcmdzLmxlbmd0aCA9PT0gMCB8fCB0eXBlb2YgYXJnc1swXSA9PT0gJ29iamVjdCc7XG4gICAgY29uc3QgaXNVcGRhdGUgPSBhcmdzLmxlbmd0aCA+PSAyICYmIGFyZ3NbMF0gPT09ICd1cGRhdGUnICYmIHR5cGVvZiBhcmdzWzFdID09PSAnb2JqZWN0JztcbiAgICBjb25zdCBpc0dldFN0YXRlID0gYXJncy5sZW5ndGggPT09IDEgJiYgYXJnc1swXSA9PT0gJ2dldFN0YXRlJztcbiAgICBjb25zdCBpc0JpbmRFdmVudExpc3RlbmVyID0gYXJncy5sZW5ndGggPj0gMiAmJiBhcmdzWzBdID09PSAnb25DaGFuZ2UnICYmIHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nO1xuICAgIGlmIChpc0VtcHR5QXJncykge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IGFyZ3NbMF0gPyBhcmdzWzBdIDoge307XG4gICAgICAgIHJldHVybiBtZXRob2RzLmluaXQuY2FsbCh0aGlzLCBzdGF0ZSk7XG4gICAgfVxuICAgIGlmIChpc1VwZGF0ZSkge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IGFyZ3NbMV07XG4gICAgICAgIHJldHVybiBtZXRob2RzLnVwZGF0ZS5jYWxsKHRoaXMsIHN0YXRlKTtcbiAgICB9XG4gICAgaWYgKGlzR2V0U3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIG1ldGhvZHMuZ2V0U3RhdGUuY2FsbCh0aGlzKTtcbiAgICB9XG4gICAgaWYgKGlzQmluZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2sgPSBhcmdzWzFdO1xuICAgICAgICByZXR1cm4gbWV0aG9kcy5vbkNoYW5nZS5jYWxsKHRoaXMsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgcmV0dXJuICQuZXJyb3IoJ1RoaXMgbWV0aG9kIGRvZXMgbm90IGV4aXN0Jyk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNvbnZlcnRQZXJjZW50SW5WYWx1ZSA9IGV4cG9ydHMuY29udmVydFBpeGVsSW5QZXJjZW50ID0gZXhwb3J0cy5jb252ZXJ0VmFsdWVJblBlcmNlbnQgPSB2b2lkIDA7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby1taXhlZC1vcGVyYXRvcnMgKi9cbmZ1bmN0aW9uIGNvbnZlcnRWYWx1ZUluUGVyY2VudChtaW4sIG1heCwgdmFsdWUpIHtcbiAgICByZXR1cm4gMTAwIC8gKG1heCAtIG1pbikgKiAodmFsdWUgLSBtaW4pO1xufVxuZXhwb3J0cy5jb252ZXJ0VmFsdWVJblBlcmNlbnQgPSBjb252ZXJ0VmFsdWVJblBlcmNlbnQ7XG5mdW5jdGlvbiBjb252ZXJ0UGl4ZWxJblBlcmNlbnQod2lkdGgsIHZhbHVlKSB7XG4gICAgcmV0dXJuIDEwMCAvIHdpZHRoICogdmFsdWU7XG59XG5leHBvcnRzLmNvbnZlcnRQaXhlbEluUGVyY2VudCA9IGNvbnZlcnRQaXhlbEluUGVyY2VudDtcbmZ1bmN0aW9uIGNvbnZlcnRQZXJjZW50SW5WYWx1ZShtaW4sIG1heCwgcGVyY2VudCkge1xuICAgIHJldHVybiAobWF4IC0gbWluKSAvIDEwMCAqIHBlcmNlbnQgKyBtaW47XG59XG5leHBvcnRzLmNvbnZlcnRQZXJjZW50SW5WYWx1ZSA9IGNvbnZlcnRQZXJjZW50SW5WYWx1ZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL2FwcC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==