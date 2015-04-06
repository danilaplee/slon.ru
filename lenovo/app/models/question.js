import DS from "ember-data";

var question = DS.Model.extend({
  text: DS.attr('string'),
  answers: DS.attr()
});
 
question.reopenClass({
  FIXTURES: 
  [
		{
    		'id':1,
    		'text':'На пути к вашему офису случился транспортный коллапс, а шеф требует быть вовремя. Как будете решать проблему?',
    		'answers':[
	    		{
	    			'type':'A',
	    			'text':'Остаток рабочего дня посвятите модификации транспортных развязок в столице.',
	    		},
	    		{
	    			'type':'B',
	    			'text':'Угрозами и истериками расчистите себе путь до рабочего места.'
	    		},
	    		{
	    			'type':'C',
	    			'text':'Угоните машину у правоохранительных органов и доберетесь в срок.'
	    		},
	    		{
	    			'type':'D',
	    			'text':'Нацепите значок «Езжу как хочу» и поедете как хотите.'
	    		}
    		]
    	},
    	{
    		'id':2,
    		'text':'Коллеги зовут вас заниматься йогой каждый день в шесть часов утра. Ваша реакция:',
    		'answers':[
	    		{
	    			'type':'A',
	    			'img':'http://cdn.bleacherreport.net/images_root/slides/photos/002/086/001/IMG_0377_original_display_image.jpg',
	    		},
	    		{
	    			'type':'B',
	    			'img':'http://cdn.destructoid.com//ul/273959-tumblr_m52j762YZK1qlskj8o1_500.jpg'
	    		},
	    		{
	    			'type':'C',
	    			'img':'http://cdn29.elitedaily.com/wp-content/uploads/2014/04/wrestlemania-undertaker-fan-meme-elite-daily11.jpg'
	    		},
	    		{
	    			'type':'D',
	    			'img':'http://i.imgur.com/VSo2HQ0.jpg'
	    		}
    		]
    	},
    	{
    		'id':3,
    		'text':'Что для вас командный дух?',
    		'answers':[
	    		{
	    			'type':'A',
	    			'img':'http://healthimpactnews.com/wp-content/uploads/sites/2/2013/08/broccoli-2.jpg',
	    		},
	    		{
	    			'type':'B',
	    			'img':'http://www.connectedrogers.ca/wp-content/uploads/2013/09/SOA-Season61.jpg'
	    		},
	    		{
	    			'type':'C',
	    			'img':'http://i.dailymail.co.uk/i/pix/2012/12/26/article-0-16A81E1D000005DC-528_634x384.jpg'
	    		},
	    		{
	    			'type':'D',
	    			'img':'http://i.kinja-img.com/gawker-media/image/upload/s--Eyk1VFjI--/18nyvddjcxfhdpng.png'
	    		}
    		]
    	},
    	{
    		'id':4,
    		'text':'Что больше всего похоже на ваш типичный рабочий день?',
    		'answers':[
	    		{
	    			'type':'A',
	    			'img':'https://ktismatics.files.wordpress.com/2010/01/serious-chalk.png',
	    		},
	    		{
	    			'type':'B',
	    			'img':'http://media.catmoji.com/post/vpr4/oh-noes.jpg'
	    		},
	    		{
	    			'type':'C',
	    			'img':'http://i0.kym-cdn.com/photos/images/original/000/746/291/adf.jpg'
	    		},
	    		{
	    			'type':'D',
	    			'img':'http://tosh.cc.com/blog/files/2011/08/burning-house.jpg'
	    		}
    		]
    	},
    	{
    		'id':5,
    		'text':'Как вы поступаете, если не успеваете выполнить обязательства в срок?',
    		'answers':[
	    		{
	    			'type':'A',
	    			'text':'Пишете монографию о том, почему их и невозможно было сделать вовремя',
	    		},
	    		{
	    			'type':'B',
	    			'text':'Валите все на других, бьетесь в припадке и исходитесь пеной.'
	    		},
	    		{
	    			'type':'C',
	    			'text':'Запасаетесь пачкой энергетиков и резервируете места в реанимации.'
	    		},
	    		{
	    			'type':'D',
	    			'text':'Садитесь в угол, тихо плачете и передаете управление Иисусу.'
	    		}
    		]
    	},
    	{
    		'id':6,
    		'text':'Когда вы уходите с работы?',
    		'answers':[
	    		{
	    			'type':'A',
	    			'text':'Когда Луна входит в фазу Юпитера, а ретроградный Меркурий затмевает Уран.',
	    		},
	    		{
	    			'type':'B',
	    			'text':'Как только доведете последнего сотрудника до слез.'
	    		},
	    		{
	    			'type':'C',
	    			'text':'С рассветом.'
	    		},
	    		{
	    			'type':'D',
	    			'text':'А зачем уходить оттуда, где вас нет?'
	    		}
    		]
    	},
    	{
    		'id':7,
    		'text':'Когда вы приходите на работу?',
    		'answers':[
	    		{
	    			'type':'A',
	    			'text':'Когда проходит примерно два часа после завтрака овсянкой.',
	    		},
	    		{
	    			'type':'B',
	    			'text':'С запахом первой крови.'
	    		},
	    		{
	    			'type':'C',
	    			'text':'Когда в спальнике становится душно.'
	    		},
	    		{
	    			'type':'D',
	    			'text':'Когда вас просят поиметь совесть и зайти хоть на пару часов.'
	    		}
    		]
    	},
    	{
    		'id':8,
    		'text':'В микроволновке на кухне будто произошел томатный взрыв. Это…',
    		'answers':[
	    		{
	    			'type':'A',
	    			'text':'Стечение обстоятельств. Всего лишь случайный вариант комплексной системы.',
	    		},
	    		{
	    			'type':'B',
	    			'text':'Точно не ваша вина.'
	    		},
	    		{
	    			'type':'C',
	    			'text':'Придется помыть.'
	    		},
	    		{
	    			'type':'D',
	    			'text':'Обед!'
	    		}
    		]
    	},
    	{
    		'id':9,
    		'text':'Коллеги воспринимают вас...',
    		'answers':[
	    		{
	    			'type':'A',
	    			'img':'http://img.pandawhale.com/67272-NEAT-gif-9Bfi.gif',
	    		},
	    		{
	    			'type':'B',
	    			'img':'https://psv4.vk.me/c521212/u13896520/docs/a3065157ca53/rosh.gif?extra=L1wENncCBUROu9aLIAEtEZX77-VmCapnGEuo7qIjyi3a9exGoFSbQa8Tu492Mn7h-GphPjG3mWFk1xAP6x-j5pLMnlLRgQ'
	    		},
	    		{
	    			'type':'C',
	    			'img':'http://meowgifs.com/wp-content/uploads/2013/03/omg-it-was-you.gif'
	    		},
	    		{
	    			'type':'D',
	    			'img':'http://2.bp.blogspot.com/-MMJJZSAOOak/UWcC3JPE0DI/AAAAAAAAHPo/EgT9ztccs78/s640/James+Harden+Creepy.gif'
	    		}
    		]
    	},
    	{
    		'id':10,
    		'text':'Командировка на Когалым в середине февраля для вас — это …',
    		'answers':[
	    		{
	    			'type':'A',
	    			'img':'http://cdn.meme.am/images/300x/5551529.jpg',
	    		},
	    		{
	    			'type':'B',
	    			'img':'https://danieldefo.ru/attachments/glavgeroy-3-jpg.6464'
	    		},
	    		{
	    			'type':'C',
	    			'img':'http://s3-static-ak.buzzfed.com/static/campaign_images/webdr02/2012/12/11/13/40-reasons-honey-boo-boo-became-a-national-treasu-1-20785-1355251953-2_big.jpg'
	    		},
	    		{
	    			'type':'D',
	    			'img':'http://image.thehothits.com/608x456/seal_as_a_seal_05_400x300.jpg'
	    		}
    		]
    	}
  ]
});
 
export default question