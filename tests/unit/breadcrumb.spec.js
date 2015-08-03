describe('ui.breadcrumb', function() {
    var $compile,
        $rootScope,
        $breadcrumb;

    beforeEach(module('ui.breadcrumb'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$breadcrumb_) {
        $breadcrumb = _$breadcrumb_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should pass', function() {
        expect(true).toBe(true);
    });

});
