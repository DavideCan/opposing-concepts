import React, { useState, useEffect } from 'react';
import questionsIt from './questions_it.json';
import questionsEn from './questions_en.json';

const questionsData = questionsIt.map((q, idx) => ({
  leftIt: q.left,
  rightIt: q.right,
  leftEn: questionsEn[idx].left,
  rightEn: questionsEn[idx].right,
}));
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [questions, setQuestions] = useState([...questionsData]);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  useEffect(() => {
    drawCard();
  }, []);

  const drawCard = () => {
    let currentDeck = questions;
    if (currentDeck.length === 0) {
      currentDeck = [...questionsData];
    }
    const idx = Math.floor(Math.random() * currentDeck.length);
    setCurrentQuestion(currentDeck[idx]);
    setQuestions(currentDeck.filter((_, i) => i !== idx));
  };

  if (!currentQuestion) return null;

  return (
    <div className="fullscreen-card-container" onClick={drawCard}>
      <div className="card-half left-half">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentQuestion.leftIt}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <h1>{currentQuestion.leftIt}</h1>
            <p style={{ opacity: 0.8, fontSize: 'clamp(1rem, 2.8vw, 2.8rem)', marginTop: '0.5rem', fontWeight: 600 }}>{currentQuestion.leftEn}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="card-center-decorator">
        <motion.div
           key={currentQuestion.left + 'vs'} /* Animate the icon twist too */
           initial={{ rotate: -90, scale: 0.5 }}
           animate={{ rotate: 0, scale: 1 }}
           transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          VS
        </motion.div>
      </div>

      <div className="card-half right-half">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentQuestion.rightIt}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <h1>{currentQuestion.rightIt}</h1>
            <p style={{ opacity: 0.8, fontSize: 'clamp(1rem, 2.8vw, 2.8rem)', marginTop: '0.5rem', fontWeight: 600 }}>{currentQuestion.rightEn}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Help Overlay text */}
      <div className="absolute bottom-4 left-0 right-0 text-center opacity-50 pointer-events-none" style={{ color: 'white', fontFamily: 'var(--font-body)'}}>
        Tap anywhere to draw next card
      </div>
    </div>
  );
}
