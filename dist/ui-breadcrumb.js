/**
 * Copyright (c) 2015 aramalipoor <aram.alipoor@gmail.com>
 */
(function(angular) {
    'use strict';

    angular
        .module('ui.breadcrumb', [
            'ui.router.state'
        ]);

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.breadcrumb')
        .directive('uiBreadcrumb', uiBreadcrumb);

    function uiBreadcrumb($breadcrumb) {

        BreadcrumbController.$inject = ["$rootScope", "$breadcrumb"];
        return {
            restrict: 'AE',
            templateUrl: $breadcrumb.getOption('templateUrl'),
            controller: BreadcrumbController,
            controllerAs: 'vm',
            bindToController: true
        };

        function BreadcrumbController($rootScope, $breadcrumb) {
            var vm = this;

            $rootScope.$on('$viewContentLoaded', updateSteps);
            updateSteps();

            function updateSteps() {
                $breadcrumb.getSteps().then(function (steps) {
                    vm.steps = steps;
                });
            }
        }
    }
    uiBreadcrumb.$inject = ["$breadcrumb"];

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.breadcrumb')
        .factory('$$breadcrumbUtil', $$breadcrumbUtil);

    function $$breadcrumbUtil($q, $injector, $timeout) {

        return {
            resolve: resolve,
            promiseWhile: promiseWhile
        };

        /**
         * Converts almost anything to a promise, if the subject is an array-annotated injection
         * signature or a function it tries to inject required dependencies using $injector service.
         *
         * @param {Array, string, function} subject
         * @returns {*}
         */
        function resolve(subject) {
            if (typeof subject === 'string') {
                return $q.when($injector.get(subject));
            }

            if (typeof subject === 'function' || angular.isArray(subject)) {
                subject = $injector.instantiate(subject);
            }

            if (angular.isObject(subject) && angular.isFunction(subject.then)) {
                return subject;
            } else {
                return $q.when(subject);
            }
        }

        /**
         * @param {function} condition is a function that returns a boolean
         * @param {function} body is a function that returns a promise
         * @returns {Promise}
         */
        function promiseWhile(condition, body) {
            var done = $q.defer();

            function loop() {
                // When the result of calling `condition` is no longer true, we are
                // done.
                if (!condition()) {
                    return done.resolve();
                }

                // Use `when`, in case `body` does not return a promise.
                // When it completes loop again otherwise, if it fails, reject the
                // done promise
                $q.when(body(), loop, done.reject);
            }

            // Start running the loop in the next tick so that this function is
            // completely async. It would be unexpected if `body` was called
            // synchronously the first time.
            $timeout(loop);

            // The promise
            return done.promise;
        }

    }
    $$breadcrumbUtil.$inject = ["$q", "$injector", "$timeout"];

})(angular);

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
                                                steps.push(step);
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

angular.module('ui.breadcrumb').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ui-breadcrumb/template/bootstrap3.html',
    "<ol class=\"breadcrumb\">\n" +
    "    <li ng-repeat=\"step in vm.steps\" ng-class=\"{ active: $last }\" ng-switch=\"$last || !!step.abstract\">\n" +
    "        <a ng-switch-when=\"false\" ui-sref=\"{{ step.sref }}\" ui-sref-opts=\"step.stateOptions\">{{ step.label }}</a>\n" +
    "        <span ng-switch-when=\"true\">{{ step.label }}</span>\n" +
    "    </li>\n" +
    "</ol>"
  );

}]);
