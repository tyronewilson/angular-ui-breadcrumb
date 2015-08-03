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

})(angular);
