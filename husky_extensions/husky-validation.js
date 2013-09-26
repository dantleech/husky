(function() {

    'use strict';

    require.config({
        paths: { "form": 'vendor/husky-validation/dist/validation' }
    });

    define(['form'], function(Form) {
        return  {
            name: 'husky-validation',

            initialize: function(app) {
                app.sandbox.form = {

                    create: function(selector, options) {
                        return new Form($(selector), options);
                    },

                    getObject: function(selector) {
                        if (typeof selector === 'string') {
                            return $(selector).data('form-object');
                        } else if (typeof selector === 'object') {
                            return selector;
                        } else {
                            throw 'Not supported';
                        }
                    },

                    validate: function(selector, force) {
                        if (!force) {
                            force = false;
                        }

                        return  app.sandbox.form.getObject(selector).validation.validate(force);
                    },

                    isValid: function(selector) {
                        return app.sandbox.form.getObject(selector).validation.isValid();
                    },

                    addField: function(selector, elementSelector) {
                        return app.sandbox.form.getObject(selector).addField(elementSelector);
                    },

                    removeField: function(selector, elementSelector) {
                        return app.sandbox.form.getObject(selector).removeField(elementSelector);
                    },

                    addConstraint: function(selector, elementSelector, constraintName, options) {
                        app.sandbox.form.getObject(selector).validation.addConstraint(elementSelector, constraintName, options);
                    },

                    updateConstraint: function(selector, elementSelector, constraintName, options) {
                        app.sandbox.form.getObject(selector).validation.updateConstraint(elementSelector, constraintName, options);
                    },

                    deleteConstraint: function(selector, elementSelector, constraintName) {
                        app.sandbox.form.getObject(selector).validation.deleteConstraint(elementSelector, constraintName);
                    },

                    setData: function(selector, data) {
                        app.sandbox.form.getObject(selector).mapper.setData(data);
                    },

                    getData: function(selector) {
                        return  app.sandbox.form.getObject(selector).mapper.getData();
                    },

                    element: {
                        getObject: function(elementSelector) {
                            return $(elementSelector).data('element');
                        },

                        validate: function(elementSelector, force) {
                            app.sandbox.form.element.getObject(elementSelector).validate(force);
                        },

                        addConstraint: function(elementSelector, constraintName, options) {
                            app.sandbox.form.element.getObject(elementSelector).addConstraint(constraintName, options);
                        },

                        updateConstraint: function(elementSelector, constraintName, options) {
                            app.sandbox.form.element.getObject(elementSelector).updateConstraint(constraintName, options);
                        },

                        deleteConstraint: function(elementSelector, constraintName) {
                            app.sandbox.form.element.getObject(elementSelector).deleteConstraint(constraintName);
                        }
                    }

                };
            }
        };
    });
})();