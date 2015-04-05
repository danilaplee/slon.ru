/* jshint ignore:start */

/* jshint ignore:end */

define('lenovo/adapters/application', ['exports', 'ember-data'], function (exports, DS) {

	'use strict';

	exports['default'] = DS['default'].FixtureAdapter.extend();

});
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
define('lenovo/controllers/question', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var quest = Ember['default'].Controller.extend({
		actions: {
			answerQuestion: function answerQuestion(type) {
				var model = this.get("model");
				// console.log(type, model.id);
				var nu = model.get("id");
				console.log(nu++);
				this.transitionToRoute("question", nu++);
				// this.set('model', newModel);
			}
		}
	});

	exports['default'] = quest;

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
define('lenovo/models/question', ['exports', 'ember-data'], function (exports, DS) {

	'use strict';

	var question = DS['default'].Model.extend({
				text: DS['default'].attr("string"),
				answers: DS['default'].attr()
	});

	question.reopenClass({
				FIXTURES: [{
							id: 1,
							text: "На пути к вашему офису случился транспортный коллапс, а шеф требует быть вовремя. Как будете решать проблему?",
							answers: [{
										type: "A",
										text: "Остаток рабочего дня посвятите модификации транспортных развязок в столице." }, {
										type: "B",
										text: "Угрозами и истериками расчистите себе путь до рабочего места."
							}, {
										type: "C",
										text: "Угоните машину у правоохранительных органов и доберетесь в срок."
							}, {
										type: "D",
										text: "Нацепите значок «Езжу как хочу» и поедете как хотите."
							}]
				}, {
							id: 2,
							text: "Коллеги зовут вас заниматься йогой каждый день в шесть часов утра. Ваша реакция:",
							answers: [{
										type: "A",
										img: "http://cdn.bleacherreport.net/images_root/slides/photos/002/086/001/IMG_0377_original_display_image.jpg" }, {
										type: "B",
										img: "http://cdn.destructoid.com//ul/273959-tumblr_m52j762YZK1qlskj8o1_500.jpg"
							}, {
										type: "C",
										img: "http://cdn29.elitedaily.com/wp-content/uploads/2014/04/wrestlemania-undertaker-fan-meme-elite-daily11.jpg"
							}, {
										type: "D",
										img: "http://i.imgur.com/VSo2HQ0.jpg"
							}]
				}, {
							id: 3,
							text: "Что для вас командный дух?",
							answers: [{
										type: "A",
										img: "http://healthimpactnews.com/wp-content/uploads/sites/2/2013/08/broccoli-2.jpg" }, {
										type: "B",
										img: "http://www.connectedrogers.ca/wp-content/uploads/2013/09/SOA-Season61.jpg"
							}, {
										type: "C",
										img: "http://i.dailymail.co.uk/i/pix/2012/12/26/article-0-16A81E1D000005DC-528_634x384.jpg"
							}, {
										type: "D",
										img: "http://i.kinja-img.com/gawker-media/image/upload/s--Eyk1VFjI--/18nyvddjcxfhdpng.png"
							}]
				}, {
							id: 4,
							text: "Что больше всего похоже на ваш типичный рабочий день?",
							answers: [{
										type: "A",
										img: "https://ktismatics.files.wordpress.com/2010/01/serious-chalk.png" }, {
										type: "B",
										img: "http://media.catmoji.com/post/vpr4/oh-noes.jpg"
							}, {
										type: "C",
										img: "http://i0.kym-cdn.com/photos/images/original/000/746/291/adf.jpg"
							}, {
										type: "D",
										img: "http://tosh.cc.com/blog/files/2011/08/burning-house.jpg"
							}]
				}, {
							id: 5,
							text: "Как вы поступаете, если не успеваете выполнить обязательства в срок?",
							answers: [{
										type: "A",
										text: "Пишете монографию о том, почему их и невозможно было сделать вовремя" }, {
										type: "B",
										text: "Валите все на других, бьетесь в припадке и исходитесь пеной."
							}, {
										type: "C",
										text: "Запасаетесь пачкой энергетиков и резервируете места в реанимации."
							}, {
										type: "D",
										text: "Садитесь в угол, тихо плачете и передаете управление Иисусу."
							}]
				}, {
							id: 6,
							text: "Когда вы уходите с работы?",
							answers: [{
										type: "A",
										text: "Когда Луна входит в фазу Юпитера, а ретроградный Меркурий затмевает Уран." }, {
										type: "B",
										text: "Как только доведете последнего сотрудника до слез."
							}, {
										type: "C",
										text: "С рассветом."
							}, {
										type: "D",
										text: "А зачем уходить оттуда, где вас нет?"
							}]
				}, {
							id: 7,
							text: "Когда вы приходите на работу?",
							answers: [{
										type: "A",
										text: "Когда проходит примерно два часа после завтрака овсянкой." }, {
										type: "B",
										text: "С запахом первой крови."
							}, {
										type: "C",
										text: "Когда в спальнике становится душно."
							}, {
										type: "D",
										text: "Когда вас просят поиметь совесть и зайти хоть на пару часов."
							}]
				}, {
							id: 8,
							text: "В микроволновке на кухне будто произошел томатный взрыв. Это…",
							answers: [{
										type: "A",
										text: "Стечение обстоятельств. Всего лишь случайный вариант комплексной системы." }, {
										type: "B",
										text: "Точно не ваша вина."
							}, {
										type: "C",
										text: "Придется помыть."
							}, {
										type: "D",
										text: "Обед!"
							}]
				}, {
							id: 9,
							text: "Коллеги воспринимают вас...",
							answers: [{
										type: "A",
										img: "https://psv4.vk.me/c537504/u1639645/docs/ec3af88238e7/OtHkTz1.gif?extra=EGkrTg_2pqMYEeA6GNrZgWj1FbX6nQIvFN9cplPI8B7xlsjW2BHA-8Iu5uUNQKAYh2j1-wHsUV3AAWmwHcLcgvVULVD_Lw" }, {
										type: "B",
										img: "https://psv4.vk.me/c6280/u140442865/docs/9fa55a9d9244/rosh.gif?extra=MrEfWTpCB5be5nnAHNLKdXFGWBmkndwE3Zs1isWTgkLCgSeZU5NvfEXCHJt7POJ_806v9ah6pr4ZRT5D-inwJAViIxd7SA"
							}, {
										type: "C",
										img: "https://psv4.vk.me/c537200/u1639645/docs/d337e0acbccd/anigif_enhanced-buzz-22122-1355944229-1.gif?extra=fZ9cnpIYBkWHNQZ9kgWLupOzXsNyPT7VnMYkHolMfCmJ8bZSgSoAbYQLpTt7-wuWdH7Co2ZRMePCgATE06LA8HWZdCdcug"
							}, {
										type: "D",
										img: "https://psv4.vk.me/c521502/u1639645/docs/e3188f2f9233/402725b14d86beb012ed294a44041ea0.gif?extra=_ticuq-3oFne9hd2LvlRpwbd3Z6ngiaCXC_ay39krG2QqIuEmU-otHX_wQ8xOr2eRsCqX0hdmJLjKWwzLXF5Pg0Gp6OXnw"
							}]
				}, {
							id: 10,
							text: "Командировка на Когалым в середине февраля для вас — это …",
							answers: [{
										type: "A",
										img: "http://cdn.meme.am/images/300x/5551529.jpg" }, {
										type: "B",
										img: "https://danieldefo.ru/attachments/glavgeroy-3-jpg.6464"
							}, {
										type: "C",
										img: "http://s3-static-ak.buzzfed.com/static/campaign_images/webdr02/2012/12/11/13/40-reasons-honey-boo-boo-became-a-national-treasu-1-20785-1355251953-2_big.jpg"
							}, {
										type: "D",
										img: "http://image.thehothits.com/608x456/seal_as_a_seal_05_400x300.jpg"
							}]
				}]
	});

	exports['default'] = question;

});
define('lenovo/router', ['exports', 'ember', 'lenovo/config/environment'], function (exports, Ember, config) {

	'use strict';

	var Router = Ember['default'].Router.extend({
		location: config['default'].locationType
	});

	exports['default'] = Router.map(function () {
		this.route("home", { path: "/" });
		this.route("question", { path: "/question/:id" });
		this.route("result", { path: "/result" });
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
				var elastic = Snap.select("#elastic");
				Snap.load("images/new_3.svg", function (data) {
					elastic.append(data);
				});
				var pre = Snap.select("#preloading");
				var n = 0;
				var storeZone = function storeZone(data) {
					n++;
					z[n] = pre.append(data).selectAll("path");
					pre.clear();
				};
				var z = [];
				z[1] = Snap.load("images/elastic/up-left.svg", storeZone);
				z[2] = Snap.load("images/elastic/up-right.svg", storeZone);
				z[3] = Snap.load("images/elastic/down-left.svg", storeZone);
				z[4] = Snap.load("images/elastic/down-right.svg", storeZone);
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
					var zone = z[pos];
					var target = elastic.selectAll("path");
					for (var i = zone.length - 1; i >= 0; i--) {
						var y = zone[i];
						target[i].animate({ d: y }, 900, mina.easein());
					};
				};
			});
		}
	});

	exports['default'] = home;

});
define('lenovo/routes/question', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var home = Ember['default'].Route.extend({
		model: function model(params) {
			return this.store.find("question", params.id);
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
				var answerBoxes = $(".answerBox > p");
				answerBoxes.lettering("words");
				for (var i = answerBoxes.length - 1; i >= 0; i--) {
					var box = $(answerBoxes[i]);
					console.log(box);
					var words = box.find("span");
					for (var b = words.length - 1; b >= 0; b--) {
						var word = $(words[b]);
						var r = Math.round(Math.random() * 10) * 5;
						$(word[0]).css({
							display: "inline-block",
							transform: "rotate(" + r + "deg)"
						});
					};
					box.mouseover(function () {
						var words = $(this).find("span");
						for (var b = words.length - 1; b >= 0; b--) {
							var word = $(words[b]);
							var r = Math.round(Math.random() * 10) * 5;
							$(word[0]).css({
								display: "inline",
								transform: "rotate(0deg)"
							});
						};
					});
					box.mouseout(function () {

						var words = $(this).find("span");
						for (var b = words.length - 1; b >= 0; b--) {
							var word = $(words[b]);
							var r = Math.round(Math.random() * 10) * 5;
							$(word[0]).css({
								display: "inline-block",
								transform: "rotate(" + r + "deg)"
							});
						};
					});
				};
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
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			НА РАБОТЕ ?\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Говорят, что на дворе кризис, а значит рабочих мест не так много. Но раз вы читаете этот текст, то значит, что у вас есть время для профориентации, и вы можете позволить себе самоопределение на рабочем месте. Наш тест поможет вам узнать о себе чуть больше и подскажет, над чем вам нужно поработать, чтобы стать еще более успешным.");
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
    var child0 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("img");
            dom.setAttribute(el1,"class","image-responsive");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, get = hooks.get, element = hooks.element;
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
            var element0 = dom.childAt(fragment, [1]);
            element(env, element0, context, "bind-attr", [], {"src": get(env, context, "answer.img")});
            return fragment;
          }
        };
      }());
      var child1 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("p");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, content = hooks.content;
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
            var morph0 = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
            content(env, morph0, context, "answer.text");
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
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","col-xs-6 answerBox");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("		");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, element = hooks.element, block = hooks.block;
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
          var element1 = dom.childAt(fragment, [1]);
          var morph0 = dom.createMorphAt(element1,1,1);
          element(env, element1, context, "action", ["answerQuestion", get(env, context, "answer.type")], {});
          block(env, morph0, context, "if", [get(env, context, "answer.img")], {}, child0, child1);
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
        dom.setAttribute(el2,"class","test number");
        var el3 = dom.createElement("span");
        var el4 = dom.createComment("");
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
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n	");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col-xs-12");
        dom.setAttribute(el3,"style","margin-top:20px");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("	");
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
        var hooks = env.hooks, content = hooks.content, get = hooks.get, block = hooks.block;
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
        var element2 = dom.childAt(fragment, [2, 1]);
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [0, 1, 0]),0,0);
        var morph1 = dom.createMorphAt(dom.childAt(element2, [1]),1,1);
        var morph2 = dom.createMorphAt(dom.childAt(element2, [3]),1,1);
        content(env, morph0, context, "model.id");
        content(env, morph1, context, "model.text");
        block(env, morph2, context, "each", [get(env, context, "model.answers")], {"keyword": "answer"}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('lenovo/templates/result', ['exports'], function (exports) {

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
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("footer");
        dom.setAttribute(el1,"class","footer");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment(" Secondary menu ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("nav");
        dom.setAttribute(el2,"class","navbar navbar-default navbar-black");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","container");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","navbar-header");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        dom.setAttribute(el5,"class","navbar-brand");
        dom.setAttribute(el5,"href","/");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","show-menu");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("i");
        dom.setAttribute(el5,"class","icon-svg17");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","collapse-block");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("ul");
        dom.setAttribute(el5,"class","nav navbar-nav");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        var el7 = dom.createElement("a");
        dom.setAttribute(el7,"href","/about");
        var el8 = dom.createTextNode("О проекте");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        var el7 = dom.createElement("a");
        dom.setAttribute(el7,"href","/pr/");
        var el8 = dom.createTextNode("Реклама");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        var el7 = dom.createElement("a");
        dom.setAttribute(el7,"href","mailto:editor@slon.ru");
        var el8 = dom.createTextNode("Написать в редакцию");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        var el7 = dom.createElement("a");
        dom.setAttribute(el7,"href","mailto:support@slon.ru");
        var el8 = dom.createTextNode("Техподдержка");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        var el7 = dom.createElement("a");
        dom.setAttribute(el7,"href","/eula");
        var el8 = dom.createTextNode("Пользовательское соглашение");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment(" Copyright ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("section");
        dom.setAttribute(el2,"class","copyright-container");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","row");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","col col-sm-8 col-xs-12");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        var el6 = dom.createTextNode("© 2009 — 2015. Все права защищены.");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        var el6 = dom.createTextNode("\n                    Любое использование материалов допускается только с согласия редакции. Свидетельство о регистрации Эл №ФС77-35629.\n                    Выдано Роскомнадзором 17 марта 2009 года.\n                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        dom.setAttribute(el5,"class","proofreading-invite");
        var el6 = dom.createTextNode("\n                    Заметили ошибку? Выделите ее и нажмите ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"class","modifier");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("+Enter\n                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","col col-sm-3 col-sm-offset-1 col-xs-12");
        var el5 = dom.createTextNode("\n                            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","row");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","col col-xs-12");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        var el6 = dom.createTextNode("\n                    Партнер «Рамблера»     ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"id","top100counter");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
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
define('lenovo/tests/adapters/application.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/application.js should pass jshint', function() { 
    ok(true, 'adapters/application.js should pass jshint.'); 
  });

});
define('lenovo/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('lenovo/tests/controllers/question.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/question.js should pass jshint', function() { 
    ok(false, 'controllers/question.js should pass jshint.\ncontrollers/question.js: line 10, col 37, Missing semicolon.\ncontrollers/question.js: line 16, col 3, Missing semicolon.\ncontrollers/question.js: line 6, col 34, \'type\' is defined but never used.\n\n3 errors'); 
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
define('lenovo/tests/models/question.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/question.js should pass jshint', function() { 
    ok(false, 'models/question.js should pass jshint.\nmodels/question.js: line 234, col 24, Missing semicolon.\n\n1 error'); 
  });

});
define('lenovo/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(false, 'router.js should pass jshint.\nrouter.js: line 10, col 35, Missing semicolon.\nrouter.js: line 11, col 51, Missing semicolon.\nrouter.js: line 12, col 43, Missing semicolon.\n\n3 errors'); 
  });

});
define('lenovo/tests/routes/home.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/home.js should pass jshint', function() { 
    ok(false, 'routes/home.js should pass jshint.\nroutes/home.js: line 15, col 11, Missing semicolon.\nroutes/home.js: line 23, col 33, Missing semicolon.\nroutes/home.js: line 29, col 39, Missing semicolon.\nroutes/home.js: line 30, col 17, Missing semicolon.\nroutes/home.js: line 36, col 60, Missing semicolon.\nroutes/home.js: line 37, col 30, Missing semicolon.\nroutes/home.js: line 38, col 16, Missing semicolon.\nroutes/home.js: line 40, col 72, Missing semicolon.\nroutes/home.js: line 41, col 73, Missing semicolon.\nroutes/home.js: line 42, col 74, Missing semicolon.\nroutes/home.js: line 43, col 75, Missing semicolon.\nroutes/home.js: line 46, col 36, Missing semicolon.\nroutes/home.js: line 47, col 36, Missing semicolon.\nroutes/home.js: line 50, col 24, Missing semicolon.\nroutes/home.js: line 55, col 32, Missing semicolon.\nroutes/home.js: line 59, col 32, Missing semicolon.\nroutes/home.js: line 67, col 32, Missing semicolon.\nroutes/home.js: line 71, col 32, Missing semicolon.\nroutes/home.js: line 74, col 26, Missing semicolon.\nroutes/home.js: line 79, col 36, Missing semicolon.\nroutes/home.js: line 80, col 57, Missing semicolon.\nroutes/home.js: line 83, col 38, Missing semicolon.\nroutes/home.js: line 84, col 69, Missing semicolon.\nroutes/home.js: line 85, col 20, Unnecessary semicolon.\nroutes/home.js: line 86, col 14, Missing semicolon.\nroutes/home.js: line 90, col 3, Missing semicolon.\nroutes/home.js: line 26, col 32, \'Snap\' is not defined.\nroutes/home.js: line 27, col 15, \'Snap\' is not defined.\nroutes/home.js: line 31, col 25, \'Snap\' is not defined.\nroutes/home.js: line 40, col 22, \'Snap\' is not defined.\nroutes/home.js: line 41, col 22, \'Snap\' is not defined.\nroutes/home.js: line 42, col 22, \'Snap\' is not defined.\nroutes/home.js: line 43, col 22, \'Snap\' is not defined.\nroutes/home.js: line 44, col 15, \'$\' is not defined.\nroutes/home.js: line 48, col 33, \'$\' is not defined.\nroutes/home.js: line 49, col 34, \'$\' is not defined.\nroutes/home.js: line 84, col 55, \'mina\' is not defined.\n\n37 errors'); 
  });

});
define('lenovo/tests/routes/question.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/question.js should pass jshint', function() { 
    ok(false, 'routes/question.js should pass jshint.\nroutes/question.js: line 15, col 11, Missing semicolon.\nroutes/question.js: line 23, col 33, Missing semicolon.\nroutes/question.js: line 26, col 60, Missing semicolon.\nroutes/question.js: line 28, col 43, Missing semicolon.\nroutes/question.js: line 31, col 44, Missing semicolon.\nroutes/question.js: line 36, col 43, Missing semicolon.\nroutes/question.js: line 41, col 23, Missing semicolon.\nroutes/question.js: line 42, col 18, Unnecessary semicolon.\nroutes/question.js: line 48, col 47, Missing semicolon.\nroutes/question.js: line 53, col 27, Missing semicolon.\nroutes/question.js: line 54, col 22, Unnecessary semicolon.\nroutes/question.js: line 56, col 18, Don\'t make functions within a loop.\nroutes/question.js: line 56, col 19, Missing semicolon.\nroutes/question.js: line 63, col 47, Missing semicolon.\nroutes/question.js: line 68, col 27, Missing semicolon.\nroutes/question.js: line 69, col 22, Unnecessary semicolon.\nroutes/question.js: line 71, col 18, Don\'t make functions within a loop.\nroutes/question.js: line 71, col 19, Missing semicolon.\nroutes/question.js: line 72, col 14, Unnecessary semicolon.\nroutes/question.js: line 77, col 55, Missing semicolon.\nroutes/question.js: line 79, col 3, Missing semicolon.\nroutes/question.js: line 26, col 13, \'$\' is not defined.\nroutes/question.js: line 27, col 31, \'$\' is not defined.\nroutes/question.js: line 31, col 27, \'$\' is not defined.\nroutes/question.js: line 36, col 32, \'$\' is not defined.\nroutes/question.js: line 38, col 21, \'$\' is not defined.\nroutes/question.js: line 45, col 33, \'$\' is not defined.\nroutes/question.js: line 48, col 36, \'$\' is not defined.\nroutes/question.js: line 50, col 25, \'$\' is not defined.\nroutes/question.js: line 60, col 33, \'$\' is not defined.\nroutes/question.js: line 63, col 36, \'$\' is not defined.\nroutes/question.js: line 65, col 25, \'$\' is not defined.\nroutes/question.js: line 77, col 9, \'$\' is not defined.\nroutes/question.js: line 49, col 29, \'r\' is defined but never used.\n\n34 errors'); 
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
  require("lenovo/app")["default"].create({"name":"lenovo","version":"0.0.0.71e4bb4c"});
}

/* jshint ignore:end */
//# sourceMappingURL=lenovo.map