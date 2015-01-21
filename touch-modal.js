/**
 * Created by yangyiming on 15-1-12.
 */
(function (plugin, window) {
    var factory = function () {
        return plugin(window);
    }
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory();
    }
}(function (window) {
    $.fn.modals = function (option) {
        var defaultOption = {
            callBack:function(){

            },
            before:function(){

            },
            effect:{
                in:"in",
                out:"fade"
            }
        }
        return this.each(function () {
            var tapEvent = "ontouchend" in document ? "tap" : "click";
            var $element = $(this);
            var $dialog = $element.find(".modal-dialog");
            var options = $.extend({},defaultOption,option);
            var callBack = options.callBack;
            var openBefore = options.before;
            var $backdrop = $(".modal-backdrop");
            var $close = $element.find(".close");
            $element.css("visibility", "hidden").css("display", "block");
            var $dialog = $element.find(".modal-dialog");
            var $dialogBody = $dialog.find(".modal-body");
            var modalsHeight = $dialog.height();
            var duration = options.duration || 300;
            var closeEvent = options.close;
            if (options.effect != null) {
                var effectIn = options.effect.in;
                var effectOut = options.effect.out;
            } else {
                var effectIn = "";
                var effectOut = "";
            }

            var _startX, _startY, _curX, _curY, _moveX, _moveY;
            $element.on("open", show);
            $close.on(tapEvent, close);
            $element.on("close", close);
            $element.on("hide", hide);

            $element.addClass(effectOut);

            $dialogBody.on("touchstart", function (e) {
                fnTouches(e);
                fnTouchstart(e);
            })
            $dialogBody.on("touchmove", function (e) {
                fnTouches(e);
                fnTouchmove(e);
            })
            // touches
            function fnTouches(e) {
                if (!e.touches) {
                    e.touches = e.originalEvent.touches;
                }
            }
            // touchstart
            function fnTouchstart(e) {
                _startX = e.touches[0].pageX;
                _startY = e.touches[0].pageY;
            }
            //touchmove
            function fnTouchmove(e) {
                e.preventDefault();
                _curX = e.touches[0].pageX;
                _curY = e.touches[0].pageY;
                _moveX = _curX - _startX;
                _moveY = _curY - _startY;
                var scrollTop = $dialogBody.scrollTop();
                $dialogBody.scrollTop(_moveY + scrollTop);
            }
            function show(e, data) {
                disableScrollBar();
                $backdrop.css("display", "block").addClass("in");
                if (openBefore) {
                    openBefore($element, data);
                }
                $element.trigger("openBefore");
                $dialog.css({
                    marginTop: -modalsHeight / 2
                });
                $element.css({
                    visibility: "visible",
                    display: "block"
                });

                $element.addClass(effectIn);
                if (callBack) {
                    callBack($element, data);
                }

                $("body").data("modals", true);
            }
            function hide() {
                effectIn ? $element.removeClass(effectIn) : "";
                $element.css({ "display": "block", visibility: "hidden" });
            }
            function close() {

                if (effectIn) {
                    $element.removeClass(effectIn);
                    $backdrop.removeClass("in");
                    setTimeout(function () {
                        $element.css({ "display": "block", visibility: "hidden" });
                        $backdrop.css("display", "none");
                        enableScrollBar();
                        if (closeEvent) {
                            closeEvent();
                        }
                    }, duration);
                } else {
                    $backdrop.removeClass("in");
                    $element.css({ "display": "block", visibility: "hidden" });
                    $backdrop.css("display", "none");
                    enableScrollBar();
                    if (closeEvent) {
                        closeEvent();
                    }
                }
            }
            function disableScrollBar() {
                $('body').on('touchmove.body', function (e) { e.preventDefault() }).css("overflow", "hidden");
            }
            function enableScrollBar() {
                $('body').off('touchmove.body').removeAttr("style");
            }
        })
    }
}, this));