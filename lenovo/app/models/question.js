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
	    			'img':'images/questions/2/A.jpg',
	    		},
	    		{
	    			'type':'B',
	    			'img':'images/questions/2/B.jpg'
	    		},
	    		{
	    			'type':'C',
	    			'img':'images/questions/2/C.jpg'
	    		},
	    		{
	    			'type':'D',
	    			'img':'images/questions/2/D.jpg'
	    		}
    		]
    	},
    	{
    		'id':3,
    		'text':'Что для вас командный дух?',
    		'answers':[
	    		{
	    			'type':'A',
	    			'img':'images/questions/3/A.jpg',
	    		},
	    		{
	    			'type':'B',
	    			'img':'images/questions/3/B.jpg'
	    		},
	    		{
	    			'type':'C',
	    			'img':'images/questions/3/C.jpg'
	    		},
	    		{
	    			'type':'D',
	    			'img':'images/questions/3/D.png'
	    		}
    		]
    	},
    	{
    		'id':4,
    		'text':'Что больше всего похоже на ваш типичный рабочий день?',
    		'answers':[
	    		{
	    			'type':'A',
	    			'img':'images/questions/4/A.png',
	    		},
	    		{
	    			'type':'B',
	    			'img':'images/questions/4/B.jpg'
	    		},
	    		{
	    			'type':'C',
	    			'img':'images/questions/4/C.jpg'
	    		},
	    		{
	    			'type':'D',
	    			'img':'images/questions/4/D.jpg'
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
	    			'img':'images/questions/9/A.gif',
	    		},
	    		{
	    			'type':'B',
	    			'img':'https://psv4.vk.me/c521212/u13896520/docs/a3065157ca53/rosh.gif?extra=L1wENncCBUROu9aLIAEtEZX77-VmCapnGEuo7qIjyi3a9exGoFSbQa8Tu492Mn7h-GphPjG3mWFk1xAP6x-j5pLMnlLRgQ'
	    		},
	    		{
	    			'type':'C',
	    			'img':'images/questions/9/C.gif'
	    		},
	    		{
	    			'type':'D',
	    			'img':'images/questions/9/D.gif'
	    		}
    		]
    	},
    	{
    		'id':10,
    		'text':'Командировка на Когалым в середине февраля для вас — это …',
    		'answers':[
	    		{
	    			'type':'A',
	    			'img':'images/questions/10/A.jpg',
	    		},
	    		{
	    			'type':'B',
	    			'img':'images/questions/10/B.jpg'
	    		},
	    		{
	    			'type':'C',
	    			'img':'images/questions/10/C.jpg'
	    		},
	    		{
	    			'type':'D',
	    			'img':'images/questions/10/D.jpg'
	    		}
    		]
    	}
  ]
});
 
export default question