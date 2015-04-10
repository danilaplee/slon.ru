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
				var nu = model.get("id");
				var res = {
					type: type,
					id: nu
				};

				var end = this.container.lookup("controller:result");
				var all = end.get("results");
				var firstTimer = true;
				if (all) {
					for (var i = all.length - 1; i >= 0; i--) {
						if (all[i].id === nu) {
							all[i].type = type;
							firstTimer = false;
						}
					};

					if (firstTimer) {
						all.push(res);
					}
				} else {
					var all = [res];
				}

				end.set("results", all);

				if (nu < 10) {
					nu++;
					this.transitionToRoute("question", nu);
				} else {
					this.transitionToRoute("result");
				}
			}
		}
	});

	exports['default'] = quest;

});
define('lenovo/controllers/result', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var result = Ember['default'].ArrayController.extend({
		results: null,
		count: (function () {
			var res = this.get("results");
			var count = [];
			count[0] = { type: "A", value: 0 };
			count[1] = { type: "B", value: 0 };
			count[2] = { type: "C", value: 0 };
			count[3] = { type: "D", value: 0 };

			var predicatBy = function predicatBy(prop) {
				return function (a, b) {
					if (a[prop] > b[prop]) {
						return 1;
					} else if (a[prop] < b[prop]) {
						return -1;
					}
					return 0;
				};
			};

			for (var i = res.length - 1; i >= 0; i--) {
				var r = res[i];
				if (r.type == "A") {
					count[0].value++;
				}
				if (r.type == "B") {
					count[1].value++;
				}
				if (r.type == "C") {
					count[2].value++;
				}
				if (r.type == "D") {
					count[3].value++;
				}
			};

			var d = count.sort(predicatBy("value"));
			var t = d[3].type;
			var f = this.store;

			if (t == "A") {
				return f.find("result", 1);
			}
			if (t == "B") {
				return f.find("result", 2);
			}
			if (t == "C") {
				return f.find("result", 3);
			}
			if (t == "D") {
				return f.find("result", 4);
			}
		}).property("model")
	});

	exports['default'] = result;

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
							text: "Коллеги воспринимают вас...",
							answers: [{
										type: "A",
										img: "images/questions/9/A.gif" }, {
										type: "B",
										img: "images/questions/9/B.gif"
							}, {
										type: "C",
										img: "images/questions/9/C.gif"
							}, {
										type: "D",
										img: "images/questions/9/D.gif"
							}]
				}, {
							id: 2,
							text: "Коллеги зовут вас заниматься йогой каждый день в шесть часов утра. Ваша реакция:",
							answers: [{
										type: "A",
										img: "images/questions/2/A.jpg" }, {
										type: "B",
										img: "images/questions/2/B.jpg"
							}, {
										type: "C",
										img: "images/questions/2/C.jpg"
							}, {
										type: "D",
										img: "images/questions/2/D.jpg"
							}]
				}, {
							id: 3,
							text: "Что для вас командный дух?",
							answers: [{
										type: "A",
										img: "images/questions/3/A.jpg" }, {
										type: "B",
										img: "images/questions/3/B.jpg"
							}, {
										type: "C",
										img: "images/questions/3/C.jpg"
							}, {
										type: "D",
										img: "images/questions/3/D.png"
							}]
				}, {
							id: 4,
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
							text: "Что больше всего похоже на ваш типичный рабочий день?",
							answers: [{
										type: "A",
										img: "images/questions/4/A.png" }, {
										type: "B",
										img: "images/questions/4/B.jpg"
							}, {
										type: "C",
										img: "images/questions/4/C.jpg"
							}, {
										type: "D",
										img: "images/questions/4/D.jpg"
							}]
				}, {
							id: 10,
							text: "Командировка на Когалым в середине февраля для вас — это …",
							answers: [{
										type: "A",
										img: "images/questions/10/A.jpg" }, {
										type: "B",
										img: "images/questions/10/B.jpg"
							}, {
										type: "C",
										img: "images/questions/10/C.jpg"
							}, {
										type: "D",
										img: "images/questions/10/D.jpg"
							}]
				}]
	});

	exports['default'] = question;

});
define('lenovo/models/result', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var result = DS['default'].Model.extend({
    text: DS['default'].attr("string"),
    title: DS['default'].attr("string")
  });

  result.reopenClass({
    FIXTURES: [{
      id: 1,
      text: "Бизнес-план и вы — это синонимы, а то и вовсе единоутробные понятия. Стратегия, диверсификация, коэффициент Парето — все это про вас. Вы так погружены в теоретическую деятельность, что на работе вам планшет Yoga Tablet 2, скорее всего, потребуется в качестве книги. Куда вы, наверняка, загрузите новый шедевр Нассима Талеба или еще какого-нибудь умника.",
      title: "Яйцеголовый"
    }, {
      id: 2,
      text: "Обожаете манипулировать людьми, делаете все ради достижения цели, идете по головам коллег. Короче, вы квинтэссенция большинства героев старины Кевина — Фрэнк Андервуд из «Карточного домика» и Кайзер Созе из «Обычных подозреваемых» нервно покуривают в сторонке. Презентации, которые вы показываете с планшета Yoga Tablet 2 в режиме консоли, мгновенно превращают пространство в черную дыру, настолько они сильные и притягательные.",
      title: "Кевин Спейси"
    }, {
      id: 3,
      text: "Еще философ Томас Гоббс писал, что государством должно управлять такое мифическое чудище, как вы. Гарант неукоснительного выполнения внутреннего распорядка, вы очень часто берете на себя многое, иногда слишком. Каждый ваш удар по планшету Yoga Tablet 2 в режиме клавиатуры — это стук вселенского рока и космическая сила. Только бы эта неуемная энергия всегда была во благо! ",
      title: "Левиафан"
    }, {
      id: 4,
      text: "Любите поиграть в последнюю версию Angry Birds и посмотреть последнюю серию «Лучше позвонить Сола» на планшете? Поздравляем, вы тот самый сотрудник, которого невозможно любить и сложно ненавидеть. Ваше праздное времяпрепровождение — повод для разговоров в кулуарах, но вы слишком хороши, чтобы обращать вообще на это внимание. Для таких, как вы, в планшете Yoga Tablet 2 предусмотрена возможность повесить его на стену в режиме картины и созерцать, сколько душе угодно.",
      title: "Джонни Браво"
    }]
  });

  exports['default'] = result;

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
				$(".navbar.navbar-default.main-menu").css({ display: "block" });
				var elastic = Snap.select("#elastic");
				var start = Snap.select("#start");
				var start_off;
				var start_on;
				var pre = Snap.select("#preloading");
				var n = 0;
				var z = [];
				var tail = $("div.canvas.two");
				tail.css({
					display: "block"
				});
				if ($(window).width() < 600) {
					tail.css({
						display: "none"
					});
					$("#floatCanvas").css({
						"z-index": "-1",
						display: "none"
					});
				}
				//PRELOADING
				Snap.load("images/new_3.svg", function (data) {
					elastic.append(data);
				});
				Snap.load("images/button_on.svg", function (data) {
					start.append(data);
					start_on = pre.append(data).selectAll("path");
				});
				Snap.load("images/button_off.svg", function (data) {
					start_off = pre.append(data).selectAll("path");
					var width = $(window).width();
					if (width < 1000) {
						start.append(data);
					}
				});
				Snap.load("images/elastic/up-left.svg", function (data) {
					z[1] = pre.append(data).selectAll("path");
					pre.clear();
				});
				Snap.load("images/elastic/up-right.svg", function (data) {
					z[2] = pre.append(data).selectAll("path");
					pre.clear();
				});
				Snap.load("images/elastic/down-left.svg", function (data) {
					z[3] = pre.append(data).selectAll("path");
					pre.clear();
				});
				Snap.load("images/elastic/down-right.svg", function (data) {
					z[4] = pre.append(data).selectAll("path");
					pre.clear();
				});
				$("#elastic").mousemove(function (event) {
					var y = event.pageY - this.offsetLeft;
					var x = event.pageX - this.offsetTop;
					console.log(y, x);
					var halfwidth = $(this).width() * 0.5;
					var halfheight = $(this).height() * 0.5;
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
					if (pos >= 3) {
						$("#elastic > svg").css({
							bottom: "40px"
						});
					} else {
						$("#elastic > svg").css({
							bottom: "0"
						});
					}
					for (var i = zone.length - 1; i >= 0; i--) {
						var y = zone[i];
						target[i].animate({ d: y }, 100, mina.easein());
					};
				};
				start.mouseover(function () {
					var zone = start_off;
					var target = this.selectAll("path");
					for (var i = zone.length - 1; i >= 0; i--) {
						var y = zone[i];
						target[i].animate({ d: y }, 100, mina.easein());
					};
				});
				start.mouseout(function () {
					var zone = start_on;
					var target = this.selectAll("path");
					for (var i = zone.length - 1; i >= 0; i--) {
						var y = zone[i];
						console.log(y);
						target[i].animate({ d: y }, 300, mina.easein());
					};
				});
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
				var tail = $("div.canvas.two");
				tail.css({
					display: "none"
				});
				var answerBoxes = $(".answerBox");
				var width = $(window).width();
				answerBoxes.find("p").lettering("words");
				if (width > 1000) {
					$("#floatCanvas").css({
						visibility: "visible"
					});
					for (var i = answerBoxes.length - 1; i >= 0; i--) {
						var box = $(answerBoxes[i]);
						var words = $(box).find("span");
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
							if (words.length > 1) {
								for (var b = words.length - 1; b >= 0; b--) {
									var word = $(words[b]);
									$(word[0]).css({
										display: "inline",
										transform: "rotate(0deg)"
									});
								};
							} else {
								$(this).find("img").css({
									position: "absolute",
									width: "160%",
									height: "auto",
									left: "-100px",
									top: "-100px",
									"z-index": "1000"
								});
							}
						});
						box.mouseout(function () {

							var words = $(this).find("span");
							if (words.length > 1) {
								for (var b = words.length - 1; b >= 0; b--) {
									var word = $(words[b]);
									var r = Math.round(Math.random() * 10) * 5;
									$(word[0]).css({
										display: "inline-block",
										transform: "rotate(" + r + "deg)"
									});
								};
							} else {
								// console.log('images');
								$(this).find("img").css({
									position: "relative",
									width: "",
									height: "",
									left: "",
									top: "",
									"z-index": "1"
								});
							}
						});
					};
				}
			});
		},
		deactivate: function deactivate() {
			$("#floatCanvas").css({ visibility: "hidden" });
		}
	});

	exports['default'] = home;

});
define('lenovo/routes/result', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var home = Ember['default'].Route.extend({
			model: function model() {
					return [];
			},
			renderTemplate: function renderTemplate() {
					this.render("result", {
							into: "application",
							outlet: "main",
							controller: "result"
					});
			},
			activate: function activate() {
					this._super.apply(this, arguments);
			},
			setupController: function setupController(result, model) {
					result.set("model", model);
					Ember['default'].run.schedule("afterRender", this, function () {
							$(".social-likes").socialLikes({
									url: "https://slon.ru/specials/flex-test",
									title: "Тест: Насколько вы гибкий на работе? || slon.ru",
									counters: true,
									singleTitle: ""
							});
							var canvas = $(".canvas");
							var tail = $("div.canvas.two");
							canvas.css({
									display: "none"
							});
							if ($(window).width() < 600) {
									tail.css({
											display: "none"
									});
									$("#floatCanvas").css({
											"z-index": "-1",
											display: "none"
									});
									$("body").css({ overflow: "scroll" });
							}
							var tail = $("div.canvas.two");
							var shot = document.getElementById("packshot");
							tail.css({
									display: "none"
							});
							shot.addEventListener("ended", function () {
									this.currentTime = 7;
									this.pause();
							}, false);
					});
			},
			deactivate: function deactivate() {
					$("#floatCanvas").css({ visibility: "hidden" });
					$("body").css({ overflow: "hidden" });
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
          var el1 = dom.createTextNode("					");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("figure");
          dom.setAttribute(el1,"id","start");
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
        dom.setAttribute(el2,"class","bg");
        dom.appendChild(el1, el2);
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
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			НА РАБОТЕ\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col-xs-7 col-sm-7");
        dom.setAttribute(el3,"style","padding:0;");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("\n				Говорят, что на дворе кризис, а значит рабочих мест не так много. Но раз вы читаете этот текст, то значит, что у вас есть время для профориентации, и вы можете позволить себе самоопределение на рабочем месте. Наш тест поможет вам узнать о себе чуть больше и подскажет, над чем вам нужно поработать, чтобы стать еще более успешным.\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col-xs-4 col-sm-4");
        dom.setAttribute(el3,"style","padding:0;vertical-align:bottom;height:170px;");
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"id","startQuestions");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("				");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
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
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [2, 5, 5, 1]),1,1);
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
            dom.setAttribute(el1,"class","image-responsive text-center");
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
            var element1 = dom.childAt(fragment, [1]);
            element(env, element1, context, "action", ["answerQuestion", get(env, context, "answer.type")], {});
            element(env, element1, context, "bind-attr", [], {"src": get(env, context, "answer.img")});
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
            var el1 = dom.createTextNode("		");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1,"class","col-xs-6 answerBox");
            var el2 = dom.createTextNode("\n			");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("p");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n		");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, get = hooks.get, element = hooks.element, content = hooks.content;
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
            var morph0 = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
            element(env, element0, context, "action", ["answerQuestion", get(env, context, "answer.type")], {});
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
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, block = hooks.block;
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
          dom.insertBoundary(fragment, null);
          dom.insertBoundary(fragment, 0);
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
        dom.setAttribute(el3,"style","text-transform:none;font-weight:bold;line-height:40px;");
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
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","bg-video");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("video");
        dom.setAttribute(el2,"id","packshot");
        dom.setAttribute(el2,"autoplay","");
        dom.setAttribute(el2,"muted","");
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("source");
        dom.setAttribute(el3,"src","video/Lenovo-Yoga-packshot.mp4");
        dom.setAttribute(el3,"type","video/mp4");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-xs-12 text-center resultText");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        dom.setAttribute(el3,"style","color:red;");
        var el4 = dom.createTextNode("РЕЗУЛЬТАТ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h2");
        dom.setAttribute(el3,"style","text-transform:uppercase;");
        var el4 = dom.createTextNode("ВЫ — ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","lenovo-banner");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"src","images/Lenovo-Official-Logo.jpg");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col-xs-12 social-conn");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","social-likes");
        dom.setAttribute(el4,"data-url","http://slon.ru/specials/flex-test");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","facebook");
        dom.setAttribute(el5,"title","Поделиться ссылкой на Фейсбуке");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","twitter");
        dom.setAttribute(el5,"data-via","slon.ru");
        dom.setAttribute(el5,"title","Поделиться ссылкой в Твиттере");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","vkontakte");
        dom.setAttribute(el5,"title","Поделиться ссылкой во Вконтакте");
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
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","col-xs-12 footerCon");
        dom.setAttribute(el1,"style","display:none");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("footer");
        dom.setAttribute(el2,"class","footer");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" Secondary menu ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("nav");
        dom.setAttribute(el3,"class","navbar navbar-default navbar-black");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","container");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","navbar-header");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("a");
        dom.setAttribute(el6,"class","navbar-brand");
        dom.setAttribute(el6,"href","/");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","show-menu");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("i");
        dom.setAttribute(el6,"class","icon-svg17");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","collapse-block");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("ul");
        dom.setAttribute(el6,"class","nav navbar-nav");
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","/about");
        var el9 = dom.createTextNode("О проекте");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","/pr/");
        var el9 = dom.createTextNode("Реклама");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","mailto:editor@slon.ru");
        var el9 = dom.createTextNode("Написать в редакцию");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","mailto:support@slon.ru");
        var el9 = dom.createTextNode("Техподдержка");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","/eula");
        var el9 = dom.createTextNode("Пользовательское соглашение");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                    ");
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
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" Copyright ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("section");
        dom.setAttribute(el3,"class","copyright-container");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","row");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","col col-sm-8 col-xs-12");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("p");
        var el7 = dom.createTextNode("© 2009 — 2015. Все права защищены.");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("p");
        var el7 = dom.createTextNode("\n                        Любое использование материалов допускается только с согласия редакции. Свидетельство о регистрации Эл №ФС77-35629.\n                        Выдано Роскомнадзором 17 марта 2009 года.\n                    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("p");
        dom.setAttribute(el6,"class","proofreading-invite");
        var el7 = dom.createTextNode("\n                        Заметили ошибку? Выделите ее и нажмите ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"class","modifier");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("+Enter\n                    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","col col-sm-3 col-sm-offset-1 col-xs-12");
        var el6 = dom.createTextNode("\n                                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","row");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","col col-xs-12");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("p");
        var el7 = dom.createTextNode("\n                        Партнер «Рамблера»     ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7,"id","top100counter");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                    ");
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
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
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
        var element0 = dom.childAt(fragment, [0, 3]);
        var morph0 = dom.createMorphAt(dom.childAt(element0, [3]),1,1);
        var morph1 = dom.createMorphAt(dom.childAt(element0, [5]),0,0);
        content(env, morph0, context, "count.title");
        content(env, morph1, context, "count.text");
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
    ok(false, 'controllers/question.js should pass jshint.\ncontrollers/question.js: line 9, col 37, Missing semicolon.\ncontrollers/question.js: line 14, col 14, Missing semicolon.\ncontrollers/question.js: line 29, col 18, Unnecessary semicolon.\ncontrollers/question.js: line 38, col 25, \'all\' is already defined.\ncontrollers/question.js: line 38, col 32, Missing semicolon.\ncontrollers/question.js: line 41, col 36, Missing semicolon.\ncontrollers/question.js: line 50, col 49, Missing semicolon.\ncontrollers/question.js: line 54, col 3, Missing semicolon.\n\n8 errors'); 
  });

});
define('lenovo/tests/controllers/result.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/result.js should pass jshint', function() { 
    ok(false, 'controllers/result.js should pass jshint.\ncontrollers/result.js: line 9, col 47, Missing semicolon.\ncontrollers/result.js: line 10, col 47, Missing semicolon.\ncontrollers/result.js: line 11, col 47, Missing semicolon.\ncontrollers/result.js: line 12, col 47, Missing semicolon.\ncontrollers/result.js: line 27, col 13, Missing semicolon.\ncontrollers/result.js: line 28, col 10, Missing semicolon.\ncontrollers/result.js: line 32, col 27, Missing semicolon.\ncontrollers/result.js: line 33, col 25, Expected \'===\' and instead saw \'==\'.\ncontrollers/result.js: line 37, col 25, Expected \'===\' and instead saw \'==\'.\ncontrollers/result.js: line 41, col 25, Expected \'===\' and instead saw \'==\'.\ncontrollers/result.js: line 45, col 25, Expected \'===\' and instead saw \'==\'.\ncontrollers/result.js: line 49, col 10, Unnecessary semicolon.\ncontrollers/result.js: line 51, col 48, Missing semicolon.\ncontrollers/result.js: line 55, col 16, Expected \'===\' and instead saw \'==\'.\ncontrollers/result.js: line 57, col 39, Missing semicolon.\ncontrollers/result.js: line 59, col 16, Expected \'===\' and instead saw \'==\'.\ncontrollers/result.js: line 61, col 39, Missing semicolon.\ncontrollers/result.js: line 63, col 16, Expected \'===\' and instead saw \'==\'.\ncontrollers/result.js: line 65, col 39, Missing semicolon.\ncontrollers/result.js: line 67, col 16, Expected \'===\' and instead saw \'==\'.\ncontrollers/result.js: line 69, col 39, Missing semicolon.\ncontrollers/result.js: line 73, col 3, Missing semicolon.\n\n22 errors'); 
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
define('lenovo/tests/models/result.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/result.js should pass jshint', function() { 
    ok(false, 'models/result.js should pass jshint.\nmodels/result.js: line 34, col 22, Missing semicolon.\n\n1 error'); 
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
    ok(false, 'routes/home.js should pass jshint.\nroutes/home.js: line 15, col 11, Missing semicolon.\nroutes/home.js: line 23, col 33, Missing semicolon.\nroutes/home.js: line 26, col 75, Missing semicolon.\nroutes/home.js: line 29, col 28, Missing semicolon.\nroutes/home.js: line 30, col 27, Missing semicolon.\nroutes/home.js: line 37, col 17, Missing semicolon.\nroutes/home.js: line 42, col 21, Missing semicolon.\nroutes/home.js: line 46, col 21, Missing semicolon.\nroutes/home.js: line 51, col 39, Missing semicolon.\nroutes/home.js: line 52, col 17, Missing semicolon.\nroutes/home.js: line 57, col 17, Missing semicolon.\nroutes/home.js: line 61, col 48, Missing semicolon.\nroutes/home.js: line 64, col 41, Missing semicolon.\nroutes/home.js: line 66, col 17, Missing semicolon.\nroutes/home.js: line 69, col 60, Missing semicolon.\nroutes/home.js: line 71, col 17, Missing semicolon.\nroutes/home.js: line 74, col 60, Missing semicolon.\nroutes/home.js: line 76, col 17, Missing semicolon.\nroutes/home.js: line 79, col 60, Missing semicolon.\nroutes/home.js: line 81, col 17, Missing semicolon.\nroutes/home.js: line 84, col 60, Missing semicolon.\nroutes/home.js: line 86, col 17, Missing semicolon.\nroutes/home.js: line 89, col 54, Missing semicolon.\nroutes/home.js: line 90, col 53, Missing semicolon.\nroutes/home.js: line 94, col 24, Missing semicolon.\nroutes/home.js: line 99, col 32, Missing semicolon.\nroutes/home.js: line 103, col 32, Missing semicolon.\nroutes/home.js: line 111, col 32, Missing semicolon.\nroutes/home.js: line 115, col 32, Missing semicolon.\nroutes/home.js: line 118, col 26, Missing semicolon.\nroutes/home.js: line 124, col 36, Missing semicolon.\nroutes/home.js: line 125, col 57, Missing semicolon.\nroutes/home.js: line 130, col 25, Missing semicolon.\nroutes/home.js: line 136, col 25, Missing semicolon.\nroutes/home.js: line 141, col 38, Missing semicolon.\nroutes/home.js: line 142, col 69, Missing semicolon.\nroutes/home.js: line 143, col 20, Unnecessary semicolon.\nroutes/home.js: line 144, col 14, Missing semicolon.\nroutes/home.js: line 151, col 38, Missing semicolon.\nroutes/home.js: line 152, col 69, Missing semicolon.\nroutes/home.js: line 153, col 20, Unnecessary semicolon.\nroutes/home.js: line 155, col 15, Missing semicolon.\nroutes/home.js: line 162, col 38, Missing semicolon.\nroutes/home.js: line 164, col 69, Missing semicolon.\nroutes/home.js: line 165, col 20, Unnecessary semicolon.\nroutes/home.js: line 167, col 15, Missing semicolon.\nroutes/home.js: line 171, col 3, Missing semicolon.\nroutes/home.js: line 26, col 13, \'$\' is not defined.\nroutes/home.js: line 27, col 32, \'Snap\' is not defined.\nroutes/home.js: line 28, col 27, \'Snap\' is not defined.\nroutes/home.js: line 28, col 27, Too many errors. (16% scanned).\n\n52 errors'); 
  });

});
define('lenovo/tests/routes/question.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/question.js should pass jshint', function() { 
    ok(false, 'routes/question.js should pass jshint.\nroutes/question.js: line 15, col 11, Missing semicolon.\nroutes/question.js: line 23, col 33, Missing semicolon.\nroutes/question.js: line 30, col 17, Missing semicolon.\nroutes/question.js: line 32, col 42, Missing semicolon.\nroutes/question.js: line 33, col 53, Missing semicolon.\nroutes/question.js: line 38, col 21, Missing semicolon.\nroutes/question.js: line 41, col 48, Missing semicolon.\nroutes/question.js: line 45, col 47, Missing semicolon.\nroutes/question.js: line 50, col 27, Missing semicolon.\nroutes/question.js: line 51, col 22, Unnecessary semicolon.\nroutes/question.js: line 59, col 55, Missing semicolon.\nroutes/question.js: line 63, col 35, Missing semicolon.\nroutes/question.js: line 64, col 30, Unnecessary semicolon.\nroutes/question.js: line 75, col 31, Missing semicolon.\nroutes/question.js: line 78, col 22, Don\'t make functions within a loop.\nroutes/question.js: line 78, col 23, Missing semicolon.\nroutes/question.js: line 87, col 55, Missing semicolon.\nroutes/question.js: line 92, col 35, Missing semicolon.\nroutes/question.js: line 93, col 30, Unnecessary semicolon.\nroutes/question.js: line 105, col 31, Missing semicolon.\nroutes/question.js: line 108, col 22, Don\'t make functions within a loop.\nroutes/question.js: line 108, col 23, Missing semicolon.\nroutes/question.js: line 109, col 18, Unnecessary semicolon.\nroutes/question.js: line 115, col 55, Missing semicolon.\nroutes/question.js: line 117, col 3, Missing semicolon.\nroutes/question.js: line 26, col 26, \'$\' is not defined.\nroutes/question.js: line 31, col 31, \'$\' is not defined.\nroutes/question.js: line 32, col 25, \'$\' is not defined.\nroutes/question.js: line 36, col 19, \'$\' is not defined.\nroutes/question.js: line 41, col 31, \'$\' is not defined.\nroutes/question.js: line 42, col 33, \'$\' is not defined.\nroutes/question.js: line 45, col 36, \'$\' is not defined.\nroutes/question.js: line 47, col 25, \'$\' is not defined.\nroutes/question.js: line 54, col 37, \'$\' is not defined.\nroutes/question.js: line 59, col 44, \'$\' is not defined.\nroutes/question.js: line 60, col 33, \'$\' is not defined.\nroutes/question.js: line 68, col 29, \'$\' is not defined.\nroutes/question.js: line 82, col 37, \'$\' is not defined.\nroutes/question.js: line 87, col 44, \'$\' is not defined.\nroutes/question.js: line 89, col 33, \'$\' is not defined.\nroutes/question.js: line 98, col 29, \'$\' is not defined.\nroutes/question.js: line 115, col 9, \'$\' is not defined.\n\n42 errors'); 
  });

});
define('lenovo/tests/routes/result.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/result.js should pass jshint', function() { 
    ok(false, 'routes/result.js should pass jshint.\nroutes/result.js: line 15, col 11, Missing semicolon.\nroutes/result.js: line 23, col 35, Missing semicolon.\nroutes/result.js: line 36, col 15, Missing semicolon.\nroutes/result.js: line 41, col 21, Missing semicolon.\nroutes/result.js: line 45, col 21, Missing semicolon.\nroutes/result.js: line 46, col 55, Missing semicolon.\nroutes/result.js: line 48, col 24, \'tail\' is already defined.\nroutes/result.js: line 49, col 61, Missing semicolon.\nroutes/result.js: line 53, col 17, Missing semicolon.\nroutes/result.js: line 63, col 55, Missing semicolon.\nroutes/result.js: line 64, col 47, Missing semicolon.\nroutes/result.js: line 66, col 3, Missing semicolon.\nroutes/result.js: line 26, col 13, \'$\' is not defined.\nroutes/result.js: line 32, col 26, \'$\' is not defined.\nroutes/result.js: line 33, col 26, \'$\' is not defined.\nroutes/result.js: line 37, col 18, \'$\' is not defined.\nroutes/result.js: line 42, col 19, \'$\' is not defined.\nroutes/result.js: line 46, col 19, \'$\' is not defined.\nroutes/result.js: line 48, col 26, \'$\' is not defined.\nroutes/result.js: line 63, col 9, \'$\' is not defined.\nroutes/result.js: line 64, col 11, \'$\' is not defined.\n\n21 errors'); 
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
  require("lenovo/app")["default"].create({"name":"lenovo","version":"0.0.0.e1b9f344"});
}

/* jshint ignore:end */
//# sourceMappingURL=lenovo.map