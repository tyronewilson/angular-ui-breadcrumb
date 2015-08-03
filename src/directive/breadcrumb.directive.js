(function(angular) {
    'use strict';

    angular
        .module('ui.breadcrumb')
        .directive('uiBreadcrumb', uiBreadcrumb);

    function uiBreadcrumb($breadcrumb) {

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

})(angular);
