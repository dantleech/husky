/*
 * This file is part of the Husky Validation.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 *
 */

define([
    'type/default'
], function(Default) {

    'use strict';

    return function($el, options) {
        var defaults = {
                id: 'id',
                label: 'value',
                required: false
            },

            typeValidators = {
                phone:  function(value) {
                    var regex = /^[0-9 \\(\\)/+-]*$/;
                    return regex.test(value);
                },
                password:  function(value) {
                    var regex = /^.{6,30}$/;
                    return regex.test(value);
                },
                email:  function(value) {
                    var regex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))){2,6}$/i;
                    return regex.test(value);
                },
                url:  function(value) {
                    var regex = /^([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
                    return regex.test(value);
                },
                color:  function(value) {
                    // hex color with leading #
                    var regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
                    return regex.test(value);
                }
            },

            typeInterface = {
                setValue: function(data) {
                    this.$el.data({
                        value: data
                    }).trigger('data-changed');
                },

                getValue: function() {
                    if (this.$el.data('auraSkin') === 'date') {
                        return this.$el.data('value');
                    } else {
                        return this.$el.find('input').val();
                    }
                },

                needsValidation: function() {
                    var val = this.getValue();
                    return val !== '';
                },

                validate: function() {
                    var value = this.getValue(),
                        type = this.$el.data('auraSkin');
                    if (!!type && !!typeValidators[type]) {
                        return typeValidators[type].call(this, value);
                    } else {
                        return true;
                    }
                }
            };

        return new Default($el, defaults, options, 'husky-input', typeInterface);
    };
});
