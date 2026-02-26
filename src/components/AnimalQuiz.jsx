import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, ArrowRight } from 'lucide-react';

const quizImage = `${import.meta.env.BASE_URL}quiz-animals.png`;

const QUIZ_LENGTH = 7;

// Score keys: fox, rabbit, owl, bear, deer, hedgehog, badger, otter, mouse, squirrel
const Z = { fox:0, rabbit:0, owl:0, bear:0, deer:0, hedgehog:0, badger:0, otter:0, mouse:0, squirrel:0 };

const allQuestions = [
  // ── Original questions (updated with 10 animal scores) ──
  {
    q: "It's a rainy Sunday afternoon. What are you up to?",
    opts: [
      { text: 'Baking something delightful', s: { ...Z, fox: 2, rabbit: 1, bear: 1, mouse: 1 } },
      { text: 'Curled up with a good book', s: { ...Z, owl: 2, bear: 1, hedgehog: 2, deer: 1 } },
      { text: 'Painting or crafting', s: { ...Z, rabbit: 2, fox: 1, deer: 1, mouse: 1 } },
      { text: 'Napping by the fireplace', s: { ...Z, bear: 2, deer: 1, badger: 1 } },
    ],
  },
  {
    q: 'You find a lost letter on a forest path. What do you do?',
    opts: [
      { text: 'Investigate who it belongs to', s: { ...Z, fox: 2, otter: 1, owl: 1 } },
      { text: 'Take it to the nearest post box', s: { ...Z, rabbit: 2, hedgehog: 1, deer: 1 } },
      { text: 'Read it — just a tiny peek', s: { ...Z, owl: 2, fox: 1, squirrel: 1 } },
      { text: 'Bring it home and think about it', s: { ...Z, bear: 2, badger: 1, deer: 1 } },
    ],
  },
  {
    q: "What's your ideal outfit?",
    opts: [
      { text: 'A cozy scarf and waistcoat', s: { ...Z, fox: 2, rabbit: 1, hedgehog: 1 } },
      { text: 'A pretty pinafore or dress', s: { ...Z, rabbit: 2, deer: 1, mouse: 1 } },
      { text: 'A distinguished hat and spectacles', s: { ...Z, owl: 2, bear: 1, badger: 1 } },
      { text: 'An oversized warm cardigan', s: { ...Z, bear: 2, deer: 1, hedgehog: 1 } },
    ],
  },
  {
    q: 'Pick your favourite tea-time treat:',
    opts: [
      { text: 'Berry scones with clotted cream', s: { ...Z, rabbit: 2, fox: 1, bear: 1 } },
      { text: 'Honey cake with lavender', s: { ...Z, bear: 2, deer: 1, hedgehog: 1 } },
      { text: 'Marmalade on thick toast', s: { ...Z, fox: 2, owl: 1, badger: 1 } },
      { text: 'Chamomile tea and biscuits', s: { ...Z, deer: 2, rabbit: 1, mouse: 1 } },
    ],
  },
  {
    q: 'How do your friends describe you?',
    opts: [
      { text: 'Clever and charming', s: { ...Z, fox: 2, owl: 1, otter: 1 } },
      { text: 'Kind and thoughtful', s: { ...Z, rabbit: 2, deer: 1, hedgehog: 1 } },
      { text: 'Wise and calm', s: { ...Z, owl: 2, bear: 1, badger: 1 } },
      { text: 'Gentle and dreamy', s: { ...Z, deer: 2, rabbit: 1, mouse: 1 } },
    ],
  },
  {
    q: 'Your ideal holiday cottage would be near…',
    opts: [
      { text: 'A quaint village with cobbled streets', s: { ...Z, fox: 2, rabbit: 1, mouse: 1 } },
      { text: 'A wildflower meadow with a stream', s: { ...Z, deer: 2, rabbit: 1, otter: 1 } },
      { text: 'An ancient library or observatory', s: { ...Z, owl: 2, deer: 1, hedgehog: 1 } },
      { text: 'Deep in the woods, far from everyone', s: { ...Z, bear: 2, badger: 2, deer: 1 } },
    ],
  },
  {
    q: 'Which season speaks to your soul?',
    opts: [
      { text: 'Autumn — golden leaves and wool scarves', s: { ...Z, fox: 2, bear: 1, owl: 1, squirrel: 2 } },
      { text: 'Spring — blossoms and fresh beginnings', s: { ...Z, rabbit: 2, deer: 1, mouse: 1 } },
      { text: 'Winter — quiet nights and candlelight', s: { ...Z, owl: 2, bear: 1, hedgehog: 1 } },
      { text: 'Summer — long walks and warm breezes', s: { ...Z, deer: 2, otter: 2, fox: 1 } },
    ],
  },
  {
    q: "You've been given a small shop. What do you sell?",
    opts: [
      { text: 'Antiques and curiosities', s: { ...Z, fox: 2, owl: 1, badger: 1 } },
      { text: 'Fresh flowers and handmade soaps', s: { ...Z, rabbit: 2, deer: 1, mouse: 1 } },
      { text: 'Rare books and maps', s: { ...Z, owl: 2, hedgehog: 1, deer: 1 } },
      { text: 'Homemade jams and baked goods', s: { ...Z, bear: 2, rabbit: 1, badger: 1 } },
    ],
  },
  {
    q: 'What would you bring to a woodland picnic?',
    opts: [
      { text: 'A wicker hamper with fine cheeses', s: { ...Z, fox: 2, bear: 1, otter: 1 } },
      { text: 'Freshly picked berries and lemonade', s: { ...Z, deer: 2, rabbit: 1, squirrel: 1 } },
      { text: 'A journal and binoculars', s: { ...Z, owl: 2, deer: 1, hedgehog: 1 } },
      { text: 'An enormous blanket and cushions', s: { ...Z, bear: 2, badger: 1, deer: 1 } },
    ],
  },
  {
    q: 'A stranger asks for directions. You…',
    opts: [
      { text: 'Walk them there yourself, making conversation', s: { ...Z, fox: 2, rabbit: 1, otter: 1 } },
      { text: 'Draw a little map on a scrap of paper', s: { ...Z, rabbit: 2, mouse: 1, deer: 1 } },
      { text: 'Give precise, detailed instructions', s: { ...Z, owl: 2, bear: 1, badger: 1 } },
      { text: 'Point them the right way with a warm smile', s: { ...Z, deer: 2, bear: 1, hedgehog: 1 } },
    ],
  },
  {
    q: 'Pick a way to spend an evening:',
    opts: [
      { text: 'Hosting a dinner party for friends', s: { ...Z, fox: 2, rabbit: 1, otter: 1, bear: 1 } },
      { text: 'Tending to your garden by twilight', s: { ...Z, deer: 2, rabbit: 1, hedgehog: 1 } },
      { text: 'Stargazing with a telescope', s: { ...Z, owl: 2, deer: 1, hedgehog: 1 } },
      { text: 'Sitting by a crackling fire with cocoa', s: { ...Z, bear: 2, badger: 1, deer: 1 } },
    ],
  },
  {
    q: 'You receive an unexpected parcel. Inside you hope to find…',
    opts: [
      { text: 'A beautifully tailored garment', s: { ...Z, fox: 2, deer: 1 } },
      { text: 'Seeds for rare cottage flowers', s: { ...Z, rabbit: 2, deer: 1, hedgehog: 1 } },
      { text: 'A first-edition novel', s: { ...Z, owl: 2, fox: 1, hedgehog: 1 } },
      { text: 'A tin of homemade shortbread', s: { ...Z, bear: 2, deer: 1, mouse: 1 } },
    ],
  },
  // ── New questions ──
  {
    q: 'You discover a secret door in an old tree. You…',
    opts: [
      { text: 'Knock politely before entering', s: { ...Z, hedgehog: 2, rabbit: 1, deer: 1 } },
      { text: 'Slip inside to explore immediately', s: { ...Z, fox: 2, squirrel: 1, otter: 1 } },
      { text: 'Examine the runes carved around the frame', s: { ...Z, owl: 2, badger: 1 } },
      { text: 'Set up camp outside and wait for its owner', s: { ...Z, bear: 2, badger: 1, deer: 1 } },
    ],
  },
  {
    q: 'Which superpower would you choose?',
    opts: [
      { text: 'Invisibility — to observe the world unseen', s: { ...Z, owl: 2, hedgehog: 1, mouse: 2 } },
      { text: 'Flight — to feel the wind in your fur', s: { ...Z, squirrel: 2, deer: 1, otter: 1 } },
      { text: 'Talking to plants', s: { ...Z, rabbit: 2, deer: 2, hedgehog: 1 } },
      { text: 'Super strength — but only for hugging', s: { ...Z, bear: 2, badger: 1, otter: 1 } },
    ],
  },
  {
    q: 'Your cottage garden must have…',
    opts: [
      { text: 'A stone birdbath and climbing roses', s: { ...Z, rabbit: 2, deer: 1, hedgehog: 1 } },
      { text: 'A vegetable patch and herb spiral', s: { ...Z, badger: 2, bear: 1, hedgehog: 1 } },
      { text: 'A bubbling water fountain', s: { ...Z, otter: 2, deer: 1, mouse: 1 } },
      { text: 'A tall oak tree with a rope swing', s: { ...Z, squirrel: 2, fox: 1, otter: 1 } },
    ],
  },
  {
    q: 'It\'s your birthday. What\'s the perfect celebration?',
    opts: [
      { text: 'An elegant dinner party with close friends', s: { ...Z, fox: 2, otter: 1, rabbit: 1 } },
      { text: 'A quiet day with cake and no fuss', s: { ...Z, hedgehog: 2, bear: 1, mouse: 2 } },
      { text: 'A surprise adventure to somewhere new', s: { ...Z, otter: 2, squirrel: 1, fox: 1 } },
      { text: 'A long walk followed by a bonfire', s: { ...Z, deer: 2, badger: 1, bear: 1 } },
    ],
  },
  {
    q: 'Choose a musical instrument:',
    opts: [
      { text: 'A violin — elegant and emotional', s: { ...Z, fox: 2, deer: 1, mouse: 1 } },
      { text: 'A flute — light and woodland-y', s: { ...Z, deer: 2, rabbit: 1, squirrel: 1 } },
      { text: 'A cello — deep and thoughtful', s: { ...Z, bear: 2, owl: 1, badger: 1 } },
      { text: 'A banjo — cheerful and surprising', s: { ...Z, otter: 2, squirrel: 1, fox: 1 } },
    ],
  },
  {
    q: 'You spot a shooting star. You wish for…',
    opts: [
      { text: 'Endless curiosity and adventure', s: { ...Z, fox: 2, otter: 1, squirrel: 1 } },
      { text: 'A cozy home for all your loved ones', s: { ...Z, bear: 2, rabbit: 1, badger: 1 } },
      { text: 'The ability to understand all languages', s: { ...Z, owl: 2, hedgehog: 1, mouse: 1 } },
      { text: 'A world where everyone is a little kinder', s: { ...Z, deer: 2, rabbit: 1, hedgehog: 1 } },
    ],
  },
  {
    q: 'What\'s your hidden talent?',
    opts: [
      { text: 'Remembering everyone\'s birthday', s: { ...Z, rabbit: 2, hedgehog: 1, mouse: 1 } },
      { text: 'Finding the best bargains and treasures', s: { ...Z, fox: 2, squirrel: 2, badger: 1 } },
      { text: 'Making anyone laugh', s: { ...Z, otter: 2, fox: 1, squirrel: 1 } },
      { text: 'Staying calm in a crisis', s: { ...Z, badger: 2, bear: 1, owl: 1 } },
    ],
  },
  {
    q: 'Pick a colour palette for your bedroom:',
    opts: [
      { text: 'Deep green and burnished gold', s: { ...Z, fox: 2, owl: 1, badger: 1 } },
      { text: 'Soft pink and ivory', s: { ...Z, rabbit: 2, mouse: 1, deer: 1 } },
      { text: 'Ocean blue and driftwood grey', s: { ...Z, otter: 2, owl: 1, deer: 1 } },
      { text: 'Warm amber and russet brown', s: { ...Z, bear: 2, hedgehog: 1, squirrel: 1 } },
    ],
  },
  {
    q: 'At a village fair you head straight for the…',
    opts: [
      { text: 'Second-hand book stall', s: { ...Z, owl: 2, hedgehog: 1, fox: 1 } },
      { text: 'Cake and preserves tent', s: { ...Z, bear: 2, rabbit: 1, badger: 1 } },
      { text: 'Lucky dip and coconut shy', s: { ...Z, otter: 2, squirrel: 2, fox: 1 } },
      { text: 'Flower arranging competition', s: { ...Z, deer: 2, rabbit: 1, mouse: 1 } },
    ],
  },
  {
    q: 'Your dream profession in another life would be…',
    opts: [
      { text: 'A museum curator', s: { ...Z, owl: 2, badger: 1, fox: 1 } },
      { text: 'A botanical illustrator', s: { ...Z, rabbit: 2, deer: 1, mouse: 1 } },
      { text: 'A ship captain', s: { ...Z, otter: 2, fox: 1, bear: 1 } },
      { text: 'A village baker', s: { ...Z, bear: 2, hedgehog: 1, badger: 1 } },
    ],
  },
  {
    q: 'How do you take your morning tea?',
    opts: [
      { text: 'Earl Grey, black, in a bone china cup', s: { ...Z, fox: 2, owl: 1 } },
      { text: 'Herbal blend with a spoonful of honey', s: { ...Z, deer: 2, rabbit: 1, hedgehog: 1 } },
      { text: 'Builder\'s tea — strong with two sugars', s: { ...Z, badger: 2, bear: 1, otter: 1 } },
      { text: 'Whatever\'s in the pot — I\'m not fussy', s: { ...Z, otter: 2, squirrel: 1, mouse: 1 } },
    ],
  },
  {
    q: 'You\'re organising a woodland concert. Your role?',
    opts: [
      { text: 'Master of ceremonies (naturally)', s: { ...Z, fox: 2, otter: 1 } },
      { text: 'Decorating the stage with wildflowers', s: { ...Z, rabbit: 2, deer: 1, mouse: 1 } },
      { text: 'Working the lights and sound', s: { ...Z, badger: 2, owl: 1, hedgehog: 1 } },
      { text: 'Collecting acorns to throw like confetti', s: { ...Z, squirrel: 2, otter: 1, mouse: 1 } },
    ],
  },
  {
    q: 'What do you collect?',
    opts: [
      { text: 'Vintage postcards and stamps', s: { ...Z, hedgehog: 2, owl: 1, fox: 1 } },
      { text: 'Smooth pebbles and sea glass', s: { ...Z, otter: 2, deer: 1, mouse: 1 } },
      { text: 'Pinecones, acorns, and conkers', s: { ...Z, squirrel: 2, badger: 1, bear: 1 } },
      { text: 'Pressed flowers and dried herbs', s: { ...Z, rabbit: 2, deer: 1, hedgehog: 1 } },
    ],
  },
  {
    q: 'Someone brings you a problem. You…',
    opts: [
      { text: 'Listen carefully and offer wise advice', s: { ...Z, owl: 2, badger: 1, bear: 1 } },
      { text: 'Make them a cup of tea and a snack first', s: { ...Z, bear: 2, hedgehog: 1, rabbit: 1 } },
      { text: 'Come up with three creative solutions', s: { ...Z, fox: 2, otter: 1, squirrel: 1 } },
      { text: 'Sit with them in comfortable silence', s: { ...Z, deer: 2, mouse: 1, hedgehog: 1 } },
    ],
  },
  {
    q: 'Your favourite type of weather is…',
    opts: [
      { text: 'Crisp autumn mornings with mist', s: { ...Z, fox: 2, deer: 1, badger: 1 } },
      { text: 'A soft, steady rainfall on a tin roof', s: { ...Z, hedgehog: 2, bear: 1, mouse: 2 } },
      { text: 'Bright sunshine with a cool breeze', s: { ...Z, otter: 2, squirrel: 1, rabbit: 1 } },
      { text: 'A gentle snowfall at dusk', s: { ...Z, owl: 2, deer: 1, bear: 1 } },
    ],
  },
  {
    q: 'You find a baby bird on the ground. You…',
    opts: [
      { text: 'Build a tiny nest and keep watch', s: { ...Z, rabbit: 2, hedgehog: 1, deer: 1 } },
      { text: 'Research exactly which species it is', s: { ...Z, owl: 2, badger: 1 } },
      { text: 'Gently place it back in the nearest tree', s: { ...Z, bear: 2, deer: 1, badger: 1 } },
      { text: 'Rally the neighbourhood to help', s: { ...Z, otter: 2, fox: 1, squirrel: 1 } },
    ],
  },
  {
    q: 'Choose something for your mantelpiece:',
    opts: [
      { text: 'A tiny bell jar with a dried flower inside', s: { ...Z, mouse: 2, hedgehog: 1, deer: 1 } },
      { text: 'A stack of well-loved novels', s: { ...Z, owl: 2, hedgehog: 1, fox: 1 } },
      { text: 'A carved wooden animal', s: { ...Z, badger: 2, bear: 1, squirrel: 1 } },
      { text: 'A jar of sea shells from your travels', s: { ...Z, otter: 2, fox: 1, deer: 1 } },
    ],
  },
  {
    q: 'You have a free afternoon in a new city. You…',
    opts: [
      { text: 'Wander into every bookshop and café', s: { ...Z, owl: 2, fox: 1, hedgehog: 1 } },
      { text: 'Find the nearest park or river', s: { ...Z, otter: 2, deer: 1, squirrel: 1 } },
      { text: 'Visit the flea market for treasures', s: { ...Z, fox: 2, squirrel: 1, badger: 1 } },
      { text: 'Find a quiet bench and people-watch', s: { ...Z, mouse: 2, hedgehog: 1, deer: 1 } },
    ],
  },
  {
    q: 'Your go-to comfort food is…',
    opts: [
      { text: 'Soup and crusty bread by the stove', s: { ...Z, bear: 2, badger: 1, hedgehog: 1 } },
      { text: 'A cheese board with something bubbly', s: { ...Z, fox: 2, otter: 1 } },
      { text: 'Pancakes with fresh fruit and cream', s: { ...Z, squirrel: 2, rabbit: 1, mouse: 1 } },
      { text: 'Hot chocolate with marshmallows', s: { ...Z, hedgehog: 2, mouse: 1, deer: 1 } },
    ],
  },
  {
    q: 'If you wrote a book, it would be about…',
    opts: [
      { text: 'A grand adventure across uncharted lands', s: { ...Z, otter: 2, fox: 1, squirrel: 1 } },
      { text: 'The secret lives of garden creatures', s: { ...Z, hedgehog: 2, mouse: 1, rabbit: 1 } },
      { text: 'A slow-paced village mystery', s: { ...Z, owl: 2, badger: 1, fox: 1 } },
      { text: 'A cozy story about found family', s: { ...Z, bear: 2, rabbit: 1, deer: 1 } },
    ],
  },
  {
    q: 'At a party you\'re most likely to be…',
    opts: [
      { text: 'Telling stories that have everyone laughing', s: { ...Z, otter: 2, fox: 2, squirrel: 1 } },
      { text: 'In the kitchen helping prepare food', s: { ...Z, bear: 2, badger: 1, rabbit: 1 } },
      { text: 'Quietly chatting with one person in the corner', s: { ...Z, hedgehog: 2, mouse: 2, deer: 1 } },
      { text: 'Making sure everyone has a drink', s: { ...Z, rabbit: 2, deer: 1, badger: 1 } },
    ],
  },
];

function shuffleAndPick(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

const results = {
  fox:      { emoji: '🦊', name: 'The Dapper Fox',        desc: "Clever, charming, and always impeccably dressed. You'd be found in a cozy study wearing a velvet waistcoat, sipping Earl Grey.", bg: 'bg-orange-50' },
  rabbit:   { emoji: '🐰', name: 'The Gentle Rabbit',     desc: "Kind-hearted, creative, and you love tending to your garden. You'd be in a sunny meadow wearing a floral pinafore.", bg: 'bg-pink-50' },
  owl:      { emoji: '🦉', name: 'The Scholarly Owl',      desc: "Wise, observant, and endlessly curious. You'd be in a towering library wearing round spectacles, cataloguing rare editions.", bg: 'bg-indigo-50' },
  bear:     { emoji: '🐻', name: 'The Cozy Bear',          desc: "Warm, dependable, and you love the comforts of home. You'd be in a woodland cottage stirring a pot of honey stew.", bg: 'bg-amber-50' },
  deer:     { emoji: '🦌', name: 'The Dreamy Deer',        desc: "Gentle, graceful, and attuned to nature. You'd be wandering misty trails at dawn, collecting morning dew in a linen shawl.", bg: 'bg-emerald-50' },
  hedgehog: { emoji: '🦔', name: 'The Thoughtful Hedgehog', desc: "Quietly observant and wonderfully self-contained. You'd be in a snug cottage writing letters by candlelight, wrapped in a patchwork quilt.", bg: 'bg-stone-50' },
  badger:   { emoji: '🦡', name: 'The Steadfast Badger',   desc: "Reliable, practical, and fiercely loyal. You'd be the one everyone turns to when something needs doing properly — and you'd never let them down.", bg: 'bg-slate-50' },
  otter:    { emoji: '🦦', name: 'The Spirited Otter',     desc: "Playful, sociable, and endlessly enthusiastic. You'd be splashing through a stream in wellies, inviting everyone along for the ride.", bg: 'bg-sky-50' },
  mouse:    { emoji: '🐭', name: 'The Delicate Mouse',     desc: "Perceptive, gentle, and wonderfully detail-oriented. You'd be arranging tiny wildflowers in a thimble-sized vase, humming softly to yourself.", bg: 'bg-rose-50' },
  squirrel: { emoji: '🐿️', name: 'The Merry Squirrel',     desc: "Energetic, resourceful, and always prepared. You'd be darting between autumn oaks, pockets full of acorns and grand plans for the season ahead.", bg: 'bg-yellow-50' },
};

export default function AnimalQuiz() {
  const [started, setStarted] = useState(false);
  const [qi, setQi] = useState(0);
  const [scores, setScores] = useState({ ...Z });
  const [result, setResult] = useState(null);
  const [picked, setPicked] = useState(null);
  const [seed, setSeed] = useState(0);

  // Pick a random set of questions each time the quiz starts
  const questions = useMemo(() => shuffleAndPick(allQuestions, QUIZ_LENGTH), [seed]);

  const answer = (opt) => {
    setPicked(opt);
    setTimeout(() => {
      const next = { ...scores };
      Object.entries(opt.s).forEach(([k, v]) => { next[k] += v; });
      setScores(next);
      if (qi < questions.length - 1) {
        setQi(qi + 1);
        setPicked(null);
      } else {
        const winner = Object.entries(next).sort((a, b) => b[1] - a[1])[0][0];
        setResult(results[winner]);
      }
    }, 350);
  };

  const restart = () => { setStarted(false); setQi(0); setScores({ ...Z }); setResult(null); setPicked(null); setSeed(s => s + 1); };

  const progress = ((qi + (result ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="w-full max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        {/* START screen */}
        {!started && !result && (
          <motion.div key="start" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center">
            {/* Decorative top flourish */}
            <div className="flex items-center justify-center gap-3 mb-5 text-bark/20">
              <span className="h-px w-10 bg-bark/15" />
              <span className="font-hand text-sm text-bark/40 tracking-wider">a bit of fun</span>
              <span className="h-px w-10 bg-bark/15" />
            </div>

            {/* Organic image frame */}
            <div className="relative w-36 h-36 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sage/20 to-honey/15 blur-md scale-110" />
              <img src={quizImage} alt="Watercolour animals in clothes" className="relative w-full h-full object-cover rounded-full border-2 border-white/60 shadow-lg" />
            </div>

            <h3 className="font-serif text-2xl md:text-3xl font-bold text-bark mb-2 leading-snug">Which Polite Animal<br/>Are You?</h3>
            <p className="font-body text-bark/60 mb-7 text-sm leading-relaxed max-w-xs mx-auto">Answer 7 charming questions and discover your inner woodland creature. Tea and biscuits not included.</p>

            <button onClick={() => setStarted(true)} className="group inline-flex items-center gap-2 bg-forest text-cream px-7 py-3 rounded-full font-body font-semibold text-sm hover:bg-bark transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03]">
              <Sparkles size={16} className="group-hover:rotate-12 transition-transform" /> Take the Quiz
            </button>
          </motion.div>
        )}

        {/* QUESTIONS */}
        {started && !result && (
          <motion.div key={`q${qi}`} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
            {/* Elegant progress track */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 bg-bark/8 rounded-full h-1.5 overflow-hidden">
                <motion.div className="bg-gradient-to-r from-forest to-sage h-full rounded-full" initial={{ width: `${((qi) / questions.length) * 100}%` }} animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: 'easeOut' }} />
              </div>
              <span className="text-xs text-bark/35 font-body tabular-nums whitespace-nowrap">{qi + 1} / {questions.length}</span>
            </div>
            <h4 className="font-serif text-lg md:text-xl font-bold text-bark mb-6 leading-snug">{questions[qi].q}</h4>
            <div className="flex flex-col gap-2.5">
              {questions[qi].opts.map((opt, i) => (
                <motion.button key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  onClick={() => answer(opt)} disabled={picked !== null}
                  className={`group w-full text-left px-5 py-3.5 rounded-2xl font-body text-sm border transition-all duration-250 cursor-pointer
                    ${picked === opt ? 'border-forest/40 bg-forest/10 scale-[1.02] shadow-sm' : 'border-bark/10 bg-white/50 hover:border-sage/40 hover:bg-white/80 hover:shadow-sm'}
                    ${picked && picked !== opt ? 'opacity-30 scale-[0.98]' : ''}
                  `}
                >
                  <span className="flex items-center gap-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs transition-colors
                      ${picked === opt ? 'border-forest bg-forest text-cream' : 'border-bark/15 text-bark/30 group-hover:border-sage/50'}`}>
                      {picked === opt ? '✓' : String.fromCharCode(65 + i)}
                    </span>
                    {opt.text}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* RESULT */}
        {result && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-center">
            {/* Elegant result card */}
            <div className="relative rounded-3xl p-8 mb-6 overflow-hidden border border-white/40">
              {/* Soft tinted background */}
              <div className={`absolute inset-0 ${result.bg} opacity-60`} />
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />

              <div className="relative z-10">
                <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  className="text-4xl mb-4 select-none">{result.emoji}
                </motion.div>
                <p className="font-hand text-sm text-bark/40 mb-1">You are…</p>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-bark mb-3 leading-snug">{result.name}</h3>
                <p className="font-body text-bark/60 text-sm leading-relaxed max-w-xs mx-auto">{result.desc}</p>
              </div>
            </div>

            <div className="flex gap-3 justify-center flex-wrap">
              <button onClick={restart} className="group inline-flex items-center gap-2 border border-bark/20 text-bark/70 px-5 py-2.5 rounded-full font-body font-medium text-sm hover:border-forest hover:text-forest transition-all">
                <RotateCcw size={14} className="group-hover:-rotate-180 transition-transform duration-500" /> Try Again
              </button>
              <a href="#shop" className="inline-flex items-center gap-2 bg-forest text-cream px-5 py-2.5 rounded-full font-body font-semibold text-sm hover:bg-bark transition-colors shadow-md hover:shadow-lg">
                Shop Your Animal <ArrowRight size={15} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
