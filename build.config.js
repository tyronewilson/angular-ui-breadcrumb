/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    dist_dir: 'dist',
    build_dir: 'build',
    app: {
        scripts: [
            'src/**/*.module.js',
            'src/**/*.constants.js',
            'src/**/*.js',
            '!src/**/*.spec.js'
        ],
        templates: [
            'src/**/*.html'
        ],
        tests: [
            'tests/unit/**/*.spec.js'
        ]
    },

    vendor: {
        scripts: [

            // Angular
            'bower_components/angular/angular.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js'

        ]
    },

    docs: {
        scripts: [
            'docs/src/app.js',
            'docs/src/**/*.js'
        ]
    }
};