/* jshint ignore:start */

/* jshint ignore:end */

define('lenovo/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'lenovo/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  var App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('lenovo/initializers/app-version', ['exports', 'lenovo/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: "App Version",
    initialize: function initialize(container, application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('lenovo/initializers/export-application-global', ['exports', 'ember', 'lenovo/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal && !window[classifiedName]) {
      window[classifiedName] = application;
    }
  }

  ;

  exports['default'] = {
    name: "export-application-global",

    initialize: initialize
  };

});
define('lenovo/router', ['exports', 'ember', 'lenovo/config/environment'], function (exports, Ember, config) {

	'use strict';

	var Router = Ember['default'].Router.extend({
		location: config['default'].locationType
	});

	exports['default'] = Router.map(function () {
		this.route("home", { path: "/" });
		this.route("question", { path: "/question/:id" });
	});

});
define('lenovo/routes/home', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var home = Ember['default'].Route.extend({
		model: function model() {
			return [];
		},
		renderTemplate: function renderTemplate() {
			this.render("home", {
				into: "application",
				outlet: "main",
				controller: "home"
			});
		},
		activate: function activate() {
			this._super.apply(this, arguments);
		},
		setupController: function setupController(home, model) {
			home.set("model", model);
			Ember['default'].run.schedule("afterRender", this, function () {
				// var elastic = document.getElementById('elastic');
				var elastic = Snap.select("#MyPath");
				var pre = Snap.select("#preloading");
				var n = 0;
				var storeZone = function storeZone(data) {
					n++;
					z[n] = pre.append(data).select("path");
					pre.clear();
				};
				var z = [];
				z[1] = Snap.load("images/zone1.svg", storeZone);
				z[2] = Snap.load("images/zone2.svg", storeZone);
				z[3] = Snap.load("images/zone3.svg", storeZone);
				z[4] = Snap.load("images/zone4.svg", storeZone);
				$(window).mousemove(function (event) {
					var y = event.pageY;
					var x = event.pageX;
					var halfwidth = $(window).width() * 0.5;
					var halfheight = $(window).height() * 0.5;
					var pos;
					if (x > halfwidth) {
						if (y > halfheight) {
							pos = 4;
						} else {
							pos = 2;
						}
					} else {
						if (y > halfheight) {
							pos = 3;
						} else {
							pos = 1;
						}
					}
					make(pos);
				});
				var make = function make(pos) {
					var zone = z[pos].attr("d");
					elastic.animate({ d: zone }, 2500, mina.backin());
				};
			});
		}
	});

	exports['default'] = home;

});
define('lenovo/routes/question', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var home = Ember['default'].Route.extend({
    model: function model() {
      return [];
    },
    renderTemplate: function renderTemplate() {
      this.render("question", {
        into: "application",
        outlet: "main",
        controller: "question"
      });
    },
    activate: function activate() {
      this._super.apply(this, arguments);
    },
    setupController: function setupController(home, model) {
      home.set("model", model);
      Ember['default'].run.schedule("afterRender", this, function () {
        $("#floatCanvas").css({ visibility: "visible" });
      });
    },
    deactivate: function deactivate() {
      $("#floatCanvas").css({ visibility: "hidden" });
    }
  });

  exports['default'] = home;

});
define('lenovo/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, inline = hooks.inline;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        inline(env, morph0, context, "outlet", ["main"], {});
        return fragment;
      }
    };
  }()));

});
define('lenovo/templates/home', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("Пройти тест");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","glyphicon glyphicon-triangle-bottom");
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","col-xs-12");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        dom.setAttribute(el2,"style","margin-left:100px;");
        dom.setAttribute(el2,"class","test");
        var el3 = dom.createTextNode("ТЕСТ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","col-xs-12 hero-container");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","hidden");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.setNamespace("http://www.w3.org/2000/svg");
        var el3 = dom.createElement("svg");
        dom.setAttribute(el3,"id","preloading");
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        dom.setNamespace(null);
        var el2 = dom.createElement("section");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h1");
        dom.setAttribute(el3,"class","title");
        var el4 = dom.createTextNode("\n			НАСКОЛЬКО ТЫ\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"id","elastic");
        dom.setAttribute(el4,"style","height:100px;position:relative;");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        dom.setNamespace("http://www.w3.org/2000/svg");
        var el5 = dom.createElement("svg");
        dom.setAttribute(el5,"version","1.1");
        dom.setAttribute(el5,"viewBox","0 0 1000 500");
        dom.setAttribute(el5,"xmlns","http://www.w3.org/2000/svg");
        dom.setAttribute(el5,"xmlns:xlink","http://www.w3.org/1999/xlink");
        var el6 = dom.createTextNode("\n				  ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("defs");
        var el7 = dom.createTextNode("\n				       ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("path");
        dom.setAttribute(el7,"id","MyPath");
        dom.setAttribute(el7,"d","M7.5,75 C110,75 90,75 192.5,75 Z");
        dom.setAttribute(el7,"stroke","#2c3e50");
        dom.setAttribute(el7,"stroke-width","0");
        dom.setAttribute(el7,"fill","none");
        var el8 = dom.createTextNode("\n					    ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n				  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n				  ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("use");
        dom.setAttributeNS(el6,"http://www.w3.org/1999/xlink","xlink:href","#MyPath");
        dom.setAttribute(el6,"fill","none");
        dom.setAttribute(el6,"stroke","none");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n				  ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("text");
        dom.setAttribute(el6,"font-family","Roboto");
        dom.setAttribute(el6,"font-weight","100");
        dom.setAttribute(el6,"letter-spacing","8");
        dom.setAttribute(el6,"fill","#2c3e50");
        dom.setAttribute(el6,"font-size","48");
        var el7 = dom.createTextNode("\n				    ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("textPath");
        dom.setAttributeNS(el7,"http://www.w3.org/1999/xlink","xlink:href","#MyPath");
        var el8 = dom.createTextNode("\n				          ГИБКИЙ\n				    ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n				  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			НА РАБОТЕ ?\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.setNamespace(null);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("\"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?\"");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("footer");
        dom.setAttribute(el1,"class","text-center");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [4]),1,1);
        block(env, morph0, context, "link-to", ["question", 1], {}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('lenovo/templates/question', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","col-xs-12");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        dom.setAttribute(el2,"class","test");
        var el3 = dom.createElement("span");
        var el4 = dom.createTextNode("1");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","col-xs-12 hero-container");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("section");
        dom.setAttribute(el2,"class","text-center");
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h3");
        dom.setAttribute(el3,"style","text-transform:uppercase;font-weight:bold;line-height:40px;");
        var el4 = dom.createTextNode("\n		Руководство компании\n		");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" \n		вводит штрафы за опоздания.\n		");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		Ваши идеи:\n	");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('lenovo/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('lenovo/tests/helpers/resolver', ['exports', 'ember/resolver', 'lenovo/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('lenovo/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('lenovo/tests/helpers/start-app', ['exports', 'ember', 'lenovo/app', 'lenovo/router', 'lenovo/config/environment'], function (exports, Ember, Application, Router, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('lenovo/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('lenovo/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(false, 'router.js should pass jshint.\nrouter.js: line 10, col 35, Missing semicolon.\nrouter.js: line 11, col 51, Missing semicolon.\n\n2 errors'); 
  });

});
define('lenovo/tests/routes/home.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/home.js should pass jshint', function() { 
    ok(false, 'routes/home.js should pass jshint.\nroutes/home.js: line 15, col 11, Missing semicolon.\nroutes/home.js: line 23, col 33, Missing semicolon.\nroutes/home.js: line 33, col 57, Missing semicolon.\nroutes/home.js: line 34, col 30, Missing semicolon.\nroutes/home.js: line 35, col 16, Missing semicolon.\nroutes/home.js: line 37, col 62, Missing semicolon.\nroutes/home.js: line 38, col 62, Missing semicolon.\nroutes/home.js: line 39, col 62, Missing semicolon.\nroutes/home.js: line 40, col 62, Missing semicolon.\nroutes/home.js: line 43, col 36, Missing semicolon.\nroutes/home.js: line 44, col 36, Missing semicolon.\nroutes/home.js: line 47, col 24, Missing semicolon.\nroutes/home.js: line 52, col 32, Missing semicolon.\nroutes/home.js: line 56, col 32, Missing semicolon.\nroutes/home.js: line 64, col 32, Missing semicolon.\nroutes/home.js: line 68, col 32, Missing semicolon.\nroutes/home.js: line 71, col 26, Missing semicolon.\nroutes/home.js: line 76, col 46, Missing semicolon.\nroutes/home.js: line 77, col 67, Missing semicolon.\nroutes/home.js: line 78, col 14, Missing semicolon.\nroutes/home.js: line 82, col 3, Missing semicolon.\nroutes/home.js: line 27, col 32, \'Snap\' is not defined.\nroutes/home.js: line 28, col 25, \'Snap\' is not defined.\nroutes/home.js: line 37, col 22, \'Snap\' is not defined.\nroutes/home.js: line 38, col 22, \'Snap\' is not defined.\nroutes/home.js: line 39, col 22, \'Snap\' is not defined.\nroutes/home.js: line 40, col 22, \'Snap\' is not defined.\nroutes/home.js: line 41, col 15, \'$\' is not defined.\nroutes/home.js: line 45, col 33, \'$\' is not defined.\nroutes/home.js: line 46, col 34, \'$\' is not defined.\nroutes/home.js: line 77, col 53, \'mina\' is not defined.\n\n31 errors'); 
  });

});
define('lenovo/tests/routes/question.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/question.js should pass jshint', function() { 
    ok(false, 'routes/question.js should pass jshint.\nroutes/question.js: line 15, col 11, Missing semicolon.\nroutes/question.js: line 23, col 33, Missing semicolon.\nroutes/question.js: line 26, col 60, Missing semicolon.\nroutes/question.js: line 31, col 55, Missing semicolon.\nroutes/question.js: line 33, col 3, Missing semicolon.\nroutes/question.js: line 26, col 13, \'$\' is not defined.\nroutes/question.js: line 31, col 9, \'$\' is not defined.\n\n7 errors'); 
  });

});
define('lenovo/tests/test-helper', ['lenovo/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('lenovo/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('lenovo/config/environment', ['ember'], function(Ember) {
  var prefix = 'lenovo';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("lenovo/tests/test-helper");
} else {
  require("lenovo/app")["default"].create({"name":"lenovo","version":"0.0.0.4b6f4937"});
}

/* jshint ignore:end */
//# sourceMappingURL=lenovo.map