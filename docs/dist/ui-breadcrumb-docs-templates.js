angular.module('ui.breadcrumb.docs').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ui-breadcrumb/docs/examples/simple-breadcrumb/template.html',
    "<h2>A very simple breadcrumb</h2>"
  );


  $templateCache.put('ui-breadcrumb/docs/guide/getting-started/template.html',
    "<h2>Getting Started</h2>"
  );


  $templateCache.put('ui-breadcrumb/docs/main.html',
    "<div class=\"row\">\n" +
    "    <div class=\"col-sm-3\">\n" +
    "\n" +
    "        <div class=\"panel panel-default\">\n" +
    "            <div class=\"list-group\">\n" +
    "                <a ui-sref-active=\"active\" ui-sref=\"ui.breadcrumb.docs.welcome\" class=\"list-group-item\">Welcome</a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-heading\">\n" +
    "                <h3 class=\"panel-title\">\n" +
    "                    Examples\n" +
    "                </h3>\n" +
    "            </div>\n" +
    "            <div class=\"list-group\">\n" +
    "                <a ui-sref-active=\"active\" ui-sref=\"ui.breadcrumb.docs.examples.simple_breadcrumb\" class=\"list-group-item\">A very simple breadcrumb</a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-heading\">\n" +
    "                <h3 class=\"panel-title\">\n" +
    "                    Guide\n" +
    "                </h3>\n" +
    "            </div>\n" +
    "            <div class=\"list-group\">\n" +
    "                <a ui-sref-active=\"active\" ui-sref=\"ui.breadcrumb.docs.guide.getting_started\" class=\"list-group-item\">Getting Started</a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-heading\">\n" +
    "                <h3 class=\"panel-title\">\n" +
    "                    API\n" +
    "                </h3>\n" +
    "            </div>\n" +
    "            <ul class=\"list-group\">\n" +
    "                <li class=\"list-group-item\">Soon...</li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-9\" ui-view></div>\n" +
    "</div>"
  );


  $templateCache.put('ui-breadcrumb/docs/welcome.html',
    "<h2>Welcome to ui-breadcrumb!</h2>"
  );

}]);
