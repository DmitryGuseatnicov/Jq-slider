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
        if (e.target instanceof HTMLInputElement) {
            if (e.target.type === 'number') {
                this.$slider.jqSlider('update', { [e.target.name]: +e.target.value });
            }
            if (e.target.type === 'checkbox') {
                this.$slider.jqSlider('update', { [e.target.name]: e.target.checked });
            }
        }
    }
    sliderHandler(e) {
        this.$inputs.each((i, el) => {
            if (el instanceof HTMLInputElement) {
                if (el.type === 'number') {
                    $(el).val(+e[el.name]);
                }
                if (el.type === 'checkbox') {
                    $(el).prop('checked', e[el.name]);
                }
            }
        });
    }
}
$('.demo').each((i, el) => {
    // eslint-disable-next-line no-unused-vars
    const panel = new ControlPanel(el, arrOfStates[i]);
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVtb1BhZ2UuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7QUNOYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxtQkFBTyxDQUFDLG9EQUFrQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxrQ0FBa0M7QUFDcEY7QUFDQTtBQUNBLGtEQUFrRCxtQ0FBbUM7QUFDckY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9kZW1vLXBhZ2UvZGVtby1wYWdlLnNjc3M/MTI3ZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vZGVtby1wYWdlL2RlbW8tcGFnZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5yZXF1aXJlKFwiLi9kZW1vLXBhZ2Uuc2Nzc1wiKTtcbmNvbnN0IGFyck9mU3RhdGVzID0gW1xuICAgIHtcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBtYXg6IDEwMCxcbiAgICAgICAgZnJvbTogMzMsXG4gICAgICAgIHRvOiA5MCxcbiAgICAgICAgc3RlcDogMSxcbiAgICAgICAgdGlwOiB0cnVlLFxuICAgICAgICByYW5nZTogZmFsc2UsXG4gICAgICAgIHByb2dyZXNzOiB0cnVlLFxuICAgICAgICBzY2FsZTogZmFsc2UsXG4gICAgICAgIHNjYWxlRGVzdGlueTogNTAsXG4gICAgICAgIGhvcml6b250YWw6IGZhbHNlLFxuICAgIH0sXG4gICAge1xuICAgICAgICBtaW46IDAsXG4gICAgICAgIG1heDogMTAwMCxcbiAgICAgICAgZnJvbTogMCxcbiAgICAgICAgdG86IDkwMCxcbiAgICAgICAgc3RlcDogNTAsXG4gICAgICAgIHRpcDogdHJ1ZSxcbiAgICAgICAgcmFuZ2U6IHRydWUsXG4gICAgICAgIHByb2dyZXNzOiB0cnVlLFxuICAgICAgICBzY2FsZTogdHJ1ZSxcbiAgICAgICAgc2NhbGVEZXN0aW55OiA1MCxcbiAgICAgICAgaG9yaXpvbnRhbDogZmFsc2UsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1pbjogLTEwMCxcbiAgICAgICAgbWF4OiAxMDAsXG4gICAgICAgIGZyb206IDAsXG4gICAgICAgIHRvOiA5MCxcbiAgICAgICAgc3RlcDogMC4xLFxuICAgICAgICB0aXA6IHRydWUsXG4gICAgICAgIHJhbmdlOiB0cnVlLFxuICAgICAgICBwcm9ncmVzczogdHJ1ZSxcbiAgICAgICAgc2NhbGU6IHRydWUsXG4gICAgICAgIHNjYWxlRGVzdGlueTogNTAsXG4gICAgICAgIGhvcml6b250YWw6IGZhbHNlLFxuICAgIH0sXG4gICAge1xuICAgICAgICBtaW46IDUwMCxcbiAgICAgICAgbWF4OiAxMDAwMCxcbiAgICAgICAgZnJvbTogMTAwMCxcbiAgICAgICAgdG86IDkwLFxuICAgICAgICBzdGVwOiAxLFxuICAgICAgICB0aXA6IHRydWUsXG4gICAgICAgIHJhbmdlOiBmYWxzZSxcbiAgICAgICAgcHJvZ3Jlc3M6IHRydWUsXG4gICAgICAgIHNjYWxlOiB0cnVlLFxuICAgICAgICBzY2FsZURlc3Rpbnk6IDE1MDAsXG4gICAgICAgIGhvcml6b250YWw6IHRydWUsXG4gICAgfSxcbl07XG5jbGFzcyBDb250cm9sUGFuZWwge1xuICAgIGNvbnN0cnVjdG9yKG5vZGVFbGVtLCBkYXRhKSB7XG4gICAgICAgIHRoaXMuJG5vZGVFbGVtID0gJChub2RlRWxlbSk7XG4gICAgICAgIHRoaXMuJHNsaWRlciA9IHRoaXMuJG5vZGVFbGVtLmZpbmQoJy5qcy1kZW1vLXNsaWRlcicpO1xuICAgICAgICB0aGlzLiRpbnB1dHMgPSB0aGlzLiRub2RlRWxlbS5maW5kKCcuanMtY29udHJvbC1wYW5lbF9faW5wdXQnKTtcbiAgICAgICAgdGhpcy5pbml0KGRhdGEpO1xuICAgIH1cbiAgICBpbml0KGRhdGEpIHtcbiAgICAgICAgdGhpcy4kc2xpZGVyLmpxU2xpZGVyKCk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIHRoaXMuJHNsaWRlci5qcVNsaWRlcigndXBkYXRlJywgZGF0YSk7XG4gICAgfVxuICAgIGJpbmRFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIgPSB0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnNsaWRlckhhbmRsZXIgPSB0aGlzLnNsaWRlckhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy4kaW5wdXRzLm9uKCdjaGFuZ2UnLCB0aGlzLmlucHV0SGFuZGxlcik7XG4gICAgICAgIHRoaXMuJHNsaWRlci5qcVNsaWRlcignb25DaGFuZ2UnLCB0aGlzLnNsaWRlckhhbmRsZXIpO1xuICAgIH1cbiAgICBpbnB1dEhhbmRsZXIoZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQudHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzbGlkZXIuanFTbGlkZXIoJ3VwZGF0ZScsIHsgW2UudGFyZ2V0Lm5hbWVdOiArZS50YXJnZXQudmFsdWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgICAgICAgIHRoaXMuJHNsaWRlci5qcVNsaWRlcigndXBkYXRlJywgeyBbZS50YXJnZXQubmFtZV06IGUudGFyZ2V0LmNoZWNrZWQgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2xpZGVySGFuZGxlcihlKSB7XG4gICAgICAgIHRoaXMuJGlucHV0cy5lYWNoKChpLCBlbCkgPT4ge1xuICAgICAgICAgICAgaWYgKGVsIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGlmIChlbC50eXBlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICAkKGVsKS52YWwoK2VbZWwubmFtZV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZWwudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgICAgICAgICAgICAkKGVsKS5wcm9wKCdjaGVja2VkJywgZVtlbC5uYW1lXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4kKCcuZGVtbycpLmVhY2goKGksIGVsKSA9PiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgY29uc3QgcGFuZWwgPSBuZXcgQ29udHJvbFBhbmVsKGVsLCBhcnJPZlN0YXRlc1tpXSk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==