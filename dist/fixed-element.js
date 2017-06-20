/*
 * Fixed Element v1.0.2
 * http://webgadgets.net/plugins/fixed-element
 *
 * Copyright 2016, WebGadgets
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function ($) {
    $.fn.fixedElement = function (options) {

        // Establish our default settings
        var settings = $.extend({
            top: '',
            bottom: '',
            right: '',
            left: '',
            placement: 'top', // top, right, bottom, left
            activateOn: 0, // number
            getWidthOnElement: '', // selector
            setWidth: '',
            disabaleOnResoluton: 0,
            fixedHeight: '',
            normalHeight: ''
        }, options);

        var el = this;

        return this.each(function () {
            var this_e = $(this);


            var fId = el.selector;
            fId = fId.slice( 1 );
            this_e.wrap('<div></div>');

            var parent_height = this_e.outerHeight();
            if (settings.normalHeight !== '') {
                parent_height = settings.normalHeigh;
            }

            var parent_e = this_e.parent();
            parent_e.attr('id', 'fixed-wrapper-' + fId).css({
                "height": parent_height
            });


            if (settings.placement === 'top') {
                if (settings.top === '') {
                    settings.top = 0;
                }
                if (settings.left === '') {
                    settings.left = 0;
                }
                if (settings.right === '') {
                    settings.right = 0;
                }
            } else if (settings.placement === 'bottom') {
                if (settings.bottom === '') {
                    settings.bottom = 0;
                }
                if (settings.left === '') {
                    settings.left = 0;
                }
                if (settings.right === '') {
                    settings.right = 0;
                }
            } else if (settings.placement === 'left') {
                if (settings.top === '') {
                    settings.top = 0;
                }
                if (settings.bottom === '') {
                    settings.bottom = 0;
                }
            } else if (settings.placement === 'right') {
                if (settings.top === '') {
                    settings.top = 0;
                }
                if (settings.bottom === '') {
                    settings.bottom = 0;
                }
            }

            if (settings.getWidthOnElement != '') {
                $(window).on("load resize", function (e) {
                    settings.setWidth = $(settings.getWidthOnElement).outerWidth();
                });
            }


            $(window).on("load resize scroll", function (e) {
                var scroll = $(this).scrollTop();
                if (scroll >= settings.activateOn && viewport().width > settings.disabaleOnResoluton) {
                    this_e.css({
                        'left': settings.left,
                        'right': settings.right,
                        'bottom': settings.bottom,
                        'position': 'fixed',
                        'top': settings.top,
                        width: settings.setWidth,
                        transition: 'height 0.4s ease-out 0s',
                        height:settings.fixedHeight
                        //'overflow-y': 'auto',
                    });
                } else {
                    this_e.attr('style', '');
                    this_e.css({
                        transition: 'height 0.4s ease-out 0s',
                        height:settings.normalHeight
                    });
                }

            });


        });
    };

    function viewport() {
        var e = window, a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return {width: e[ a + 'Width' ], height: e[ a + 'Height' ]};
    }
}(jQuery));