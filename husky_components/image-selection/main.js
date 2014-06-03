/**
 * This file is part of Husky frontend development framework.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 *
 * @module husky/components/smart-content
 */

/**
 * @class SmartContent
 * @constructor
 */
define([], function() {

    'use strict';

    var defaults = {
        },

        /** contants for component */
        constants = {
        },

        /** templates for component */
        templates = {
        },

        /**
         * namespace for events
         * @type {string}
         */
        eventNamespace = 'husky.image-selection.',

        /**
         * raised after initialization process
         * @event husky.smart-content.initialize
         */
        INITIALIZED = function() {
            return createEventName.call(this, 'initialize');
        },

        /**
         * raised when all overlay components returned their value
         * @event husky.smart-content.input-retrieved
         */
        INPUT_RETRIEVED = function() {
            return createEventName.call(this, 'input-retrieved');
        },

        /**
         * raised before data is requested with AJAX
         * @event husky.smart-content.data-request
         */
        DATA_REQUEST = function() {
            return createEventName.call(this, 'data-request');
        },

        /**
         * raised when data has returned from the ajax request
         * @event husky.smart-content.data-retrieved
         */
        DATA_RETRIEVED = function() {
            return createEventName.call(this, 'data-retrieved');
        },

        /**
         * raised when the overlay data has been changed
         * @event husky.smart-content.data-changed
         */
        DATA_CHANGED = function() {
            return createEventName.call(this, 'data-changed');
        },

        /**
         * takes an config-object and merges it with this.options, before the initialization of the component
         * (options.externalConfigs has to be true)
         * @event husky.smart-content.external-configs
         */
        EXTERNAL_CONFIGS = function() {
            return createEventName.call(this, 'external-configs');
        },

        /**
         * takes an config-object and merges it with this.options. Moreover destroys overlay, so
         * it uses the new configs
         * @event husky.smart-content.set-configs
         */
        SET_CONFIGS = function() {
            return createEventName.call(this, 'set-configs');
        },

        /** returns normalized event names */
        createEventName = function(postFix) {
            return eventNamespace + (this.options.instanceName ? this.options.instanceName + '.' : '') + postFix;
        };

    return {

        /**
         * Initialize component
         */
        initialize: function() {
            this.sandbox.logger.log('initialize', this);

            //merge options with defaults
            this.options = this.sandbox.util.extend(true, {}, defaults, this.options);
        }
    };
});
