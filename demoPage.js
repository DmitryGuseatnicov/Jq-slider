/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./demo-page/demo-page.scss":
/*!**********************************!*\
  !*** ./demo-page/demo-page.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!********************************!*\
  !*** ./demo-page/demo-page.ts ***!
  \********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./demo-page.scss */ "./demo-page/demo-page.scss");
const arrOfStates = [
    {
        min: 0,
        max: 100,
        from: 33,
        to: 90,
        step: 1,
        tip: true,
        range: false,
        progress: true,
        scale: false,
        scaleDestiny: 50,
        horizontal: false,
    },
    {
        min: 0,
        max: 1000,
        from: 0,
        to: 900,
        step: 50,
        tip: true,
        range: true,
        progress: true,
        scale: true,
        scaleDestiny: 50,
        horizontal: false,
    },
    {
        min: -100,
        max: 100,
        from: 0,
        to: 90,
        step: 0.1,
        tip: true,
        range: true,
        progress: true,
        scale: true,
        scaleDestiny: 50,
        horizontal: false,
    },
    {
        min: 500,
        max: 10000,
        from: 1000,
        to: 90,
        step: 1,
        tip: true,
        range: false,
        progress: true,
        scale: true,
        scaleDestiny: 1500,
        horizontal: true,
    },
];
class ControlPanel {
    constructor(nodeElem, data) {
        this.$nodeElem = $(nodeElem);
        this.$slider = this.$nodeElem.find('.js-demo-slider');
        this.$inputs = this.$nodeElem.find('.js-control-panel__input');
        this.init(data);
    }
    init(data) {
        this.$slider.jqSlider();
        this.bindEventListeners();
        this.$slider.jqSlider('update', data);
    }
    bindEventListeners() {
        this.inputHandler = this.inputHandler.bind(this);
        this.sliderHandler = this.sliderHandler.bind(this);
        this.$inputs.on('change', this.inputHandler);
        this.$slider.jqSlider('onChange', this.sliderHandler);
    }
    inputHandler(e) {
        if (!(e.target instanceof HTMLInputElement)) {
            return;
        }
        if (e.target.type === 'number') {
            this.$slider.jqSlider('update', { [e.target.name]: +e.target.value });
        }
        if (e.target.type === 'checkbox') {
            this.$slider.jqSlider('update', { [e.target.name]: e.target.checked });
        }
    }
    sliderHandler(e) {
        this.$inputs.each((i, el) => {
            if (!(el instanceof HTMLInputElement)) {
                return;
            }
            if (el.type === 'number') {
                $(el).val(+e[el.name]);
            }
            if (el.type === 'checkbox') {
                $(el).prop('checked', e[el.name]);
            }
        });
    }
}
$('.js-demo').each((i, el) => {
    // eslint-disable-next-line no-unused-vars
    const panel = new ControlPanel(el, arrOfStates[i]);
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVtb1BhZ2UuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7QUNOYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxtQkFBTyxDQUFDLG9EQUFrQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsa0NBQWtDO0FBQ2hGO0FBQ0E7QUFDQSw4Q0FBOEMsbUNBQW1DO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vZGVtby1wYWdlL2RlbW8tcGFnZS5zY3NzPzEyN2QiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL2RlbW8tcGFnZS9kZW1vLXBhZ2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xucmVxdWlyZShcIi4vZGVtby1wYWdlLnNjc3NcIik7XG5jb25zdCBhcnJPZlN0YXRlcyA9IFtcbiAgICB7XG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgbWF4OiAxMDAsXG4gICAgICAgIGZyb206IDMzLFxuICAgICAgICB0bzogOTAsXG4gICAgICAgIHN0ZXA6IDEsXG4gICAgICAgIHRpcDogdHJ1ZSxcbiAgICAgICAgcmFuZ2U6IGZhbHNlLFxuICAgICAgICBwcm9ncmVzczogdHJ1ZSxcbiAgICAgICAgc2NhbGU6IGZhbHNlLFxuICAgICAgICBzY2FsZURlc3Rpbnk6IDUwLFxuICAgICAgICBob3Jpem9udGFsOiBmYWxzZSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBtYXg6IDEwMDAsXG4gICAgICAgIGZyb206IDAsXG4gICAgICAgIHRvOiA5MDAsXG4gICAgICAgIHN0ZXA6IDUwLFxuICAgICAgICB0aXA6IHRydWUsXG4gICAgICAgIHJhbmdlOiB0cnVlLFxuICAgICAgICBwcm9ncmVzczogdHJ1ZSxcbiAgICAgICAgc2NhbGU6IHRydWUsXG4gICAgICAgIHNjYWxlRGVzdGlueTogNTAsXG4gICAgICAgIGhvcml6b250YWw6IGZhbHNlLFxuICAgIH0sXG4gICAge1xuICAgICAgICBtaW46IC0xMDAsXG4gICAgICAgIG1heDogMTAwLFxuICAgICAgICBmcm9tOiAwLFxuICAgICAgICB0bzogOTAsXG4gICAgICAgIHN0ZXA6IDAuMSxcbiAgICAgICAgdGlwOiB0cnVlLFxuICAgICAgICByYW5nZTogdHJ1ZSxcbiAgICAgICAgcHJvZ3Jlc3M6IHRydWUsXG4gICAgICAgIHNjYWxlOiB0cnVlLFxuICAgICAgICBzY2FsZURlc3Rpbnk6IDUwLFxuICAgICAgICBob3Jpem9udGFsOiBmYWxzZSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWluOiA1MDAsXG4gICAgICAgIG1heDogMTAwMDAsXG4gICAgICAgIGZyb206IDEwMDAsXG4gICAgICAgIHRvOiA5MCxcbiAgICAgICAgc3RlcDogMSxcbiAgICAgICAgdGlwOiB0cnVlLFxuICAgICAgICByYW5nZTogZmFsc2UsXG4gICAgICAgIHByb2dyZXNzOiB0cnVlLFxuICAgICAgICBzY2FsZTogdHJ1ZSxcbiAgICAgICAgc2NhbGVEZXN0aW55OiAxNTAwLFxuICAgICAgICBob3Jpem9udGFsOiB0cnVlLFxuICAgIH0sXG5dO1xuY2xhc3MgQ29udHJvbFBhbmVsIHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlRWxlbSwgZGF0YSkge1xuICAgICAgICB0aGlzLiRub2RlRWxlbSA9ICQobm9kZUVsZW0pO1xuICAgICAgICB0aGlzLiRzbGlkZXIgPSB0aGlzLiRub2RlRWxlbS5maW5kKCcuanMtZGVtby1zbGlkZXInKTtcbiAgICAgICAgdGhpcy4kaW5wdXRzID0gdGhpcy4kbm9kZUVsZW0uZmluZCgnLmpzLWNvbnRyb2wtcGFuZWxfX2lucHV0Jyk7XG4gICAgICAgIHRoaXMuaW5pdChkYXRhKTtcbiAgICB9XG4gICAgaW5pdChkYXRhKSB7XG4gICAgICAgIHRoaXMuJHNsaWRlci5qcVNsaWRlcigpO1xuICAgICAgICB0aGlzLmJpbmRFdmVudExpc3RlbmVycygpO1xuICAgICAgICB0aGlzLiRzbGlkZXIuanFTbGlkZXIoJ3VwZGF0ZScsIGRhdGEpO1xuICAgIH1cbiAgICBiaW5kRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHRoaXMuaW5wdXRIYW5kbGVyID0gdGhpcy5pbnB1dEhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zbGlkZXJIYW5kbGVyID0gdGhpcy5zbGlkZXJIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuJGlucHV0cy5vbignY2hhbmdlJywgdGhpcy5pbnB1dEhhbmRsZXIpO1xuICAgICAgICB0aGlzLiRzbGlkZXIuanFTbGlkZXIoJ29uQ2hhbmdlJywgdGhpcy5zbGlkZXJIYW5kbGVyKTtcbiAgICB9XG4gICAgaW5wdXRIYW5kbGVyKGUpIHtcbiAgICAgICAgaWYgKCEoZS50YXJnZXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlLnRhcmdldC50eXBlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy4kc2xpZGVyLmpxU2xpZGVyKCd1cGRhdGUnLCB7IFtlLnRhcmdldC5uYW1lXTogK2UudGFyZ2V0LnZhbHVlIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlLnRhcmdldC50eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgICAgICB0aGlzLiRzbGlkZXIuanFTbGlkZXIoJ3VwZGF0ZScsIHsgW2UudGFyZ2V0Lm5hbWVdOiBlLnRhcmdldC5jaGVja2VkIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNsaWRlckhhbmRsZXIoZSkge1xuICAgICAgICB0aGlzLiRpbnB1dHMuZWFjaCgoaSwgZWwpID0+IHtcbiAgICAgICAgICAgIGlmICghKGVsIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZWwudHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAkKGVsKS52YWwoK2VbZWwubmFtZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVsLnR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICAgICAgICAkKGVsKS5wcm9wKCdjaGVja2VkJywgZVtlbC5uYW1lXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiQoJy5qcy1kZW1vJykuZWFjaCgoaSwgZWwpID0+IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICBjb25zdCBwYW5lbCA9IG5ldyBDb250cm9sUGFuZWwoZWwsIGFyck9mU3RhdGVzW2ldKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9