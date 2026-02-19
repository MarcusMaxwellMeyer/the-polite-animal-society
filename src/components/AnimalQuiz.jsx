import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, ArrowRight } from 'lucide-react';

const QUIZ_LENGTH = 5;

const allQuestions = [
  {
    q: "It's a rainy Sunday afternoon. What are you up to?",
    opts: [
      { text: 'Baking something delightful', s: { fox: 2, rabbit: 1, owl: 0, bear: 1, deer: 0 } },
      { text: 'Curled up with a good book', s: { fox: 0, rabbit: 0, owl: 2, bear: 1, deer: 1 } },
      { text: 'Painting or crafting', s: { fox: 1, rabbit: 2, owl: 0, bear: 0, deer: 1 } },
      { text: 'Napping by the fireplace', s: { fox: 0, rabbit: 0, owl: 0, bear: 2, deer: 1 } },
    ],
  },
  {
    q: 'You find a lost letter on a forest path. What do you do?',
    opts: [
      { text: 'Investigate who it belongs to', s: { fox: 2, rabbit: 0, owl: 1, bear: 0, deer: 0 } },
      { text: 'Take it to the nearest post box', s: { fox: 0, rabbit: 2, owl: 0, bear: 0, deer: 1 } },
      { text: 'Read it — just a tiny peek', s: { fox: 1, rabbit: 0, owl: 2, bear: 0, deer: 0 } },
      { text: 'Bring it home and think about it', s: { fox: 0, rabbit: 0, owl: 1, bear: 2, deer: 1 } },
    ],
  },
  {
    q: "What's your ideal outfit?",
    opts: [
      { text: 'A cozy scarf and waistcoat', s: { fox: 2, rabbit: 1, owl: 0, bear: 0, deer: 0 } },
      { text: 'A pretty pinafore or dress', s: { fox: 0, rabbit: 2, owl: 0, bear: 0, deer: 1 } },
      { text: 'A distinguished hat and spectacles', s: { fox: 0, rabbit: 0, owl: 2, bear: 1, deer: 0 } },
      { text: 'An oversized warm cardigan', s: { fox: 0, rabbit: 0, owl: 0, bear: 2, deer: 1 } },
    ],
  },
  {
    q: 'Pick your favourite tea-time treat:',
    opts: [
      { text: 'Berry scones with clotted cream', s: { fox: 1, rabbit: 2, owl: 0, bear: 1, deer: 0 } },
      { text: 'Honey cake with lavender', s: { fox: 0, rabbit: 0, owl: 0, bear: 2, deer: 1 } },
      { text: 'Marmalade on thick toast', s: { fox: 2, rabbit: 0, owl: 1, bear: 0, deer: 0 } },
      { text: 'Chamomile tea and biscuits', s: { fox: 0, rabbit: 1, owl: 1, bear: 0, deer: 2 } },
    ],
  },
  {
    q: 'How do your friends describe you?',
    opts: [
      { text: 'Clever and charming', s: { fox: 2, rabbit: 0, owl: 1, bear: 0, deer: 0 } },
      { text: 'Kind and thoughtful', s: { fox: 0, rabbit: 2, owl: 0, bear: 0, deer: 1 } },
      { text: 'Wise and calm', s: { fox: 0, rabbit: 0, owl: 2, bear: 1, deer: 0 } },
      { text: 'Gentle and dreamy', s: { fox: 0, rabbit: 1, owl: 0, bear: 0, deer: 2 } },
    ],
  },
  {
    q: 'Your ideal holiday cottage would be near…',
    opts: [
      { text: 'A quaint village with cobbled streets', s: { fox: 2, rabbit: 1, owl: 0, bear: 0, deer: 0 } },
      { text: 'A wildflower meadow with a stream', s: { fox: 0, rabbit: 1, owl: 0, bear: 0, deer: 2 } },
      { text: 'An ancient library or observatory', s: { fox: 0, rabbit: 0, owl: 2, bear: 0, deer: 1 } },
      { text: 'Deep in the woods, far from everyone', s: { fox: 0, rabbit: 0, owl: 0, bear: 2, deer: 1 } },
    ],
  },
  {
    q: 'Which season speaks to your soul?',
    opts: [
      { text: 'Autumn — golden leaves and wool scarves', s: { fox: 2, rabbit: 0, owl: 1, bear: 1, deer: 0 } },
      { text: 'Spring — blossoms and fresh beginnings', s: { fox: 0, rabbit: 2, owl: 0, bear: 0, deer: 1 } },
      { text: 'Winter — quiet nights and candlelight', s: { fox: 0, rabbit: 0, owl: 2, bear: 1, deer: 0 } },
      { text: 'Summer — long walks and warm breezes', s: { fox: 1, rabbit: 0, owl: 0, bear: 0, deer: 2 } },
    ],
  },
  {
    q: 'You\'ve been given a small shop. What do you sell?',
    opts: [
      { text: 'Antiques and curiosities', s: { fox: 2, rabbit: 0, owl: 1, bear: 0, deer: 0 } },
      { text: 'Fresh flowers and handmade soaps', s: { fox: 0, rabbit: 2, owl: 0, bear: 0, deer: 1 } },
      { text: 'Rare books and maps', s: { fox: 0, rabbit: 0, owl: 2, bear: 0, deer: 1 } },
      { text: 'Homemade jams and baked goods', s: { fox: 0, rabbit: 1, owl: 0, bear: 2, deer: 0 } },
    ],
  },
  {
    q: 'What would you bring to a woodland picnic?',
    opts: [
      { text: 'A wicker hamper with fine cheeses', s: { fox: 2, rabbit: 0, owl: 0, bear: 1, deer: 0 } },
      { text: 'Freshly picked berries and lemonade', s: { fox: 0, rabbit: 1, owl: 0, bear: 0, deer: 2 } },
      { text: 'A journal and binoculars', s: { fox: 0, rabbit: 0, owl: 2, bear: 0, deer: 1 } },
      { text: 'An enormous blanket and cushions', s: { fox: 0, rabbit: 0, owl: 0, bear: 2, deer: 1 } },
    ],
  },
  {
    q: 'A stranger asks for directions. You…',
    opts: [
      { text: 'Walk them there yourself, making conversation', s: { fox: 2, rabbit: 1, owl: 0, bear: 0, deer: 0 } },
      { text: 'Draw a little map on a scrap of paper', s: { fox: 0, rabbit: 2, owl: 0, bear: 0, deer: 1 } },
      { text: 'Give precise, detailed instructions', s: { fox: 0, rabbit: 0, owl: 2, bear: 1, deer: 0 } },
      { text: 'Point them the right way with a warm smile', s: { fox: 0, rabbit: 0, owl: 0, bear: 1, deer: 2 } },
    ],
  },
  {
    q: 'Pick a way to spend an evening:',
    opts: [
      { text: 'Hosting a dinner party for friends', s: { fox: 2, rabbit: 1, owl: 0, bear: 1, deer: 0 } },
      { text: 'Tending to your garden by twilight', s: { fox: 0, rabbit: 1, owl: 0, bear: 0, deer: 2 } },
      { text: 'Stargazing with a telescope', s: { fox: 0, rabbit: 0, owl: 2, bear: 0, deer: 1 } },
      { text: 'Sitting by a crackling fire with cocoa', s: { fox: 0, rabbit: 0, owl: 0, bear: 2, deer: 1 } },
    ],
  },
  {
    q: 'You receive an unexpected parcel. Inside you hope to find…',
    opts: [
      { text: 'A beautifully tailored garment', s: { fox: 2, rabbit: 0, owl: 0, bear: 0, deer: 1 } },
      { text: 'Seeds for rare cottage flowers', s: { fox: 0, rabbit: 2, owl: 0, bear: 0, deer: 1 } },
      { text: 'A first-edition novel', s: { fox: 1, rabbit: 0, owl: 2, bear: 0, deer: 0 } },
      { text: 'A tin of homemade shortbread', s: { fox: 0, rabbit: 0, owl: 0, bear: 2, deer: 1 } },
    ],
  },
];

function shuffleAndPick(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

const results = {
  fox:    { emoji: '🦊', name: 'The Dapper Fox', desc: "Clever, charming, and always impeccably dressed. You'd be found in a cozy study wearing a velvet waistcoat, sipping Earl Grey.", bg: 'bg-orange-50' },
  rabbit: { emoji: '🐰', name: 'The Gentle Rabbit', desc: "Kind-hearted, creative, and you love tending to your garden. You'd be in a sunny meadow wearing a floral pinafore.", bg: 'bg-pink-50' },
  owl:    { emoji: '🦉', name: 'The Scholarly Owl', desc: "Wise, observant, and endlessly curious. You'd be in a towering library wearing round spectacles, cataloguing rare editions.", bg: 'bg-indigo-50' },
  bear:   { emoji: '🐻', name: 'The Cozy Bear', desc: "Warm, dependable, and you love the comforts of home. You'd be in a woodland cottage stirring a pot of honey stew.", bg: 'bg-amber-50' },
  deer:   { emoji: '🦌', name: 'The Dreamy Deer', desc: "Gentle, graceful, and attuned to nature. You'd be wandering misty trails at dawn collecting morning dew.", bg: 'bg-emerald-50' },
};

export default function AnimalQuiz() {
  const [started, setStarted] = useState(false);
  const [qi, setQi] = useState(0);
  const [scores, setScores] = useState({ fox: 0, rabbit: 0, owl: 0, bear: 0, deer: 0 });
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

  const restart = () => { setStarted(false); setQi(0); setScores({ fox: 0, rabbit: 0, owl: 0, bear: 0, deer: 0 }); setResult(null); setPicked(null); setSeed(s => s + 1); };

  const progress = ((qi + (result ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="w-full max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        {/* START screen */}
        {!started && !result && (
          <motion.div key="start" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center">
            <div className="text-6xl mb-5 animate-float">🎭</div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-bark mb-3">Which Polite Animal Are You?</h3>
            <p className="font-body text-bark/60 mb-8 text-sm md:text-base leading-relaxed">Answer 5 charming questions and discover your inner woodland creature. Tea and biscuits not included.</p>
            <button onClick={() => setStarted(true)} className="inline-flex items-center gap-2 bg-forest text-cream px-7 py-3.5 rounded-full font-body font-semibold text-base hover:bg-bark transition-colors shadow-md">
              <Sparkles size={18} /> Take the Quiz
            </button>
          </motion.div>
        )}

        {/* QUESTIONS */}
        {started && !result && (
          <motion.div key={`q${qi}`} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
            {/* Progress */}
            <div className="w-full bg-warm/30 rounded-full h-2 mb-8">
              <motion.div className="bg-forest h-2 rounded-full" initial={{ width: `${((qi) / questions.length) * 100}%` }} animate={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-bark/40 font-body mb-2">Question {qi + 1} of {questions.length}</p>
            <h4 className="font-serif text-xl md:text-2xl font-bold text-bark mb-8">{questions[qi].q}</h4>
            <div className="flex flex-col gap-3">
              {questions[qi].opts.map((opt, i) => (
                <motion.button key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  onClick={() => answer(opt)} disabled={picked !== null}
                  className={`w-full text-left px-5 py-4 rounded-xl font-body text-sm md:text-base border-2 transition-all duration-200
                    ${picked === opt ? 'border-forest bg-forest/10 scale-[1.02]' : 'border-warm/30 bg-white/60 hover:border-sage hover:bg-white/90'}
                    ${picked && picked !== opt ? 'opacity-40' : ''}
                  `}
                >
                  {opt.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* RESULT */}
        {result && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-center">
            <div className={`${result.bg} rounded-2xl p-10 mb-8`}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }} className="text-7xl mb-5">{result.emoji}</motion.div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-bark mb-3">You are {result.name}!</h3>
              <p className="font-body text-bark/70 text-sm md:text-base leading-relaxed">{result.desc}</p>
            </div>
            <div className="flex gap-3 justify-center flex-wrap">
              <button onClick={restart} className="inline-flex items-center gap-2 border-2 border-forest text-forest px-5 py-2.5 rounded-full font-body font-semibold text-sm hover:bg-forest hover:text-cream transition-colors">
                <RotateCcw size={15} /> Try Again
              </button>
              <a href="#shop" className="inline-flex items-center gap-2 bg-forest text-cream px-5 py-2.5 rounded-full font-body font-semibold text-sm hover:bg-bark transition-colors shadow-md">
                Shop Your Animal <ArrowRight size={15} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
