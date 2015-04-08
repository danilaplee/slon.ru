import DS from "ember-data";

var result = DS.Model.extend({
  text: DS.attr('string'),
  title: DS.attr('string')
});
 
result.reopenClass({
  FIXTURES: 
  [
		{
    		'id':1,
    		'text':'Бизнес-план и вы — это синонимы, а то и вовсе единоутробные понятия. Стратегия, диверсификация, коэффициент Парето — все это про вас. Вы так погружены в теоретическую деятельность, что на работе вам планшет Yoga Tablet 2, скорее всего, потребуется в качестве книги. Куда вы, наверняка, загрузите новый шедевр Нассима Талеба или еще какого-нибудь умника.',
    		'title':'Яйцеголовый'
    	},
    	{
    		'id':2,
    		'text':'Обожаете манипулировать людьми, делаете все ради достижения цели, идете по головам коллег. Короче, вы квинтэссенция большинства героев старины Кевина — Фрэнк Андервуд из «Карточного домика» и Кайзер Созе из «Обычных подозреваемых» нервно покуривают в сторонке. Презентации, которые вы показываете с планшета Yoga Tablet 2 в режиме консоли, мгновенно превращают пространство в черную дыру, настолько они сильные и притягательные.',
    		'title':'Кевин Спейси'
    	},
    	{
    		'id':3,
    		'text':'Еще философ Томас Гоббс писал, что государством должно управлять такое мифическое чудище, как вы. Гарант неукоснительного выполнения внутреннего распорядка, вы очень часто берете на себя многое, иногда слишком. Каждый ваш удар по планшету Yoga Tablet 2 в режиме клавиатуры — это стук вселенского рока и космическая сила. Только бы эта неуемная энергия всегда была во благо! ',
    		'title':'Левиафан'
    	},
    	{
    		'id':4,
    		'text':'Любите поиграть в последнюю версию Angry Birds и посмотреть последнюю серию «Лучше позвонить Сола» на планшете? Поздравляем, вы тот самый сотрудник, которого невозможно любить и сложно ненавидеть. Ваше праздное времяпрепровождение — повод для разговоров в кулуарах, но вы слишком хороши, чтобы обращать вообще на это внимание. Для таких, как вы, в планшете Yoga Tablet 2 предусмотрена возможность повесить его на стену в режиме картины и созерцать, сколько душе угодно.',
    		'title':'Джонни Браво'
    	}
  ]
});
 
export default result