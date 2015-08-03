(function(angular) {
    'use strict';

    angular
        .module('ui.breadcrumb')
        .provider('$breadcrumb', $BreadcrumbProvider);

    function $BreadcrumbProvider() {

        // Variables
        var $$options = {
            templateUrl: 'ui-breadcrumb/template/bootstrap3.html',
            includeAbstract : false
        };

        // Public Provider Methods
        this.setOptions = setOptions;

        this.$get = [
            '$q', '$state', '$$breadcrumbUtil',
            function ($q, $state, $$breadcrumbUtil) {

                return {
                    getOption: getOption,
                    getSteps: getSteps
                };

                //-- Public Service Methods --//

                function getOption(name) {
                    return $$options[name];
                }

                function getSteps() {
                    var d = $q.defer(),
                        steps = [],
                        currentSref = $state.$current.self.name;

                    $$breadcrumbUtil
                        .promiseWhile(
                            function () {
                                return !!currentSref;
                            },
                            function () {
                                return getParentSref(currentSref).then(function (parentSref) {
                                    if (shouldIncludeState(currentSref)) {
                                        return resolveBreadcrumbStep(currentSref).then(function (step) {
                                            if (step) {
                                                steps.unshift(step);
                                            }

                                            currentSref = parentSref;
                                        });
                                    } else {
                                        currentSref = parentSref;
                                    }
                                });
                            }
                        )
                        .then(function () {
                            d.resolve(steps);
                        });

                    return d.promise;
                }

                //-- Private Service Methods --//

                function getParentSref(sref) {
                    var config = getStateConfig(sref);

                    if (null === config) {
                        return $q.when(null);
                    }

                    if (config.breadcrumb.parent) {
                        if (typeof config.breadcrumb.parent === 'string') {
                            return $q.when(config.breadcrumb.parent);
                        }

                        return $$breadcrumbUtil.resolve(config.breadcrumb.parent);
                    }

                    if (typeof sref === 'string') {
                        return $q.when((/^(.+)\.[^.]+$/.exec(sref) || [])[1]);
                    }

                    return $q.when(null);
                }

                function getStateConfig(sref) {
                    var config = $state.get(sref);

                    if (null !== config) {
                        if (typeof config.breadcrumb === 'undefined') {
                            config.breadcrumb = {};
                        }

                        config.breadcrumb = angular.extend({
                            label: sref
                        }, config.breadcrumb);
                    }

                    return config;
                }

                function shouldIncludeState(sref) {
                    var config = getStateConfig(sref),
                        should = true;

                    if (null !== config) {
                        if (config.abstract) {
                            if (!$$options.includeAbstract) {
                                should = false;
                            }
                        }

                        if (config.breadcrumb.skip) {
                            should = false;
                        }

                        if (config.breadcrumb.force) {
                            should = true;
                        }
                    } else {
                        should = false;
                    }

                    return should;
                }

                function resolveBreadcrumbStep(sref) {
                    var config = getStateConfig(sref),
                        labelPromise,
                        step = {
                            sref: sref
                        };

                    if (null === config) {
                        return $q.when(null);
                    }

                    if (typeof config.breadcrumb.label === 'string') {
                        labelPromise = $q.when(config.breadcrumb.label);
                    } else {
                        labelPromise = $$breadcrumbUtil.resolve(config.breadcrumb.label);
                    }

                    return labelPromise
                        .then(function (label) {
                            if (label) {
                                step.label = label;
                            }
                        })
                        .then(function () {
                            return $$breadcrumbUtil.resolve(config.breadcrumb.stateOptions);
                        })
                        .then(function (stateOptions) {
                            if (stateOptions) {
                                step.stateOptions = stateOptions;
                            }
                        })
                        .then(function () {
                            return step;
                        });
                }
            }
        ];

        //-- Public Provider Methods --//

        /**
         * Sets breadcrumb options
         *
         * @param {object} options
         */
        function setOptions(options) {
            angular.extend($$options, options);
        }
    }

})(angular);
