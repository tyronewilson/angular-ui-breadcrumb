(function(angular) {
    'use strict';

    angular
        .module('ui.form.docs')
        .config(configure);

    function configure($stateProvider) {
        $stateProvider
            .state('ui.form.docs.guide.getting_started', {
                url: '/getting-started',
                templateUrl: 'ui-form/docs/guide/getting-started/template.html',
                ncyBreadcrumb: {
                    label: 'Getting Started'
                }
            })
        ;
    }

})(angular);
