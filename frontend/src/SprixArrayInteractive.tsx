import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================
// SPRIX CODING LAB: LISTS & 2D ARRAYS (CHAPTERS 15 & 16)
// Interactive visual pedagogy for 2nd Secondary & Sprix learners
// Zero icons, zero emojis — pure visual cards, memory boxes & code
// ============================================================

export default function SprixArrayInteractive() {
  const navigate = useNavigate();

  // ── Tab: '1D_LISTS' (Chapter 15) vs '2D_MATRICES' (Chapter 16) vs 'CHALLENGES'
  const [activeTab, setActiveTab] = useState<'1D_LISTS' | '2D_MATRICES' | 'CHALLENGES'>('1D_LISTS');

  // ──────────────────────────────────────────────────────────
  // CHAPTER 15 STATE: 1D LIST
  // ──────────────────────────────────────────────────────────
  const [listItems, setListItems] = useState<string[]>(['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [newItemValue, setNewItemValue] = useState('');
  const [editValue, setEditValue] = useState('Apple');

  // Loop Stepper State
  const [loopIndex, setLoopIndex] = useState<number | null>(null);
  const [loopConsole, setLoopConsole] = useState<string[]>([]);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  // Sync editValue when selectedIndex changes
  useEffect(() => {
    if (selectedIndex >= 0 && selectedIndex < listItems.length) {
      setEditValue(listItems[selectedIndex]);
    }
  }, [selectedIndex, listItems]);

  // Auto-play loop stepper
  useEffect(() => {
    let timer: any;
    if (isAutoPlaying) {
      timer = setTimeout(() => {
        handleStepForward();
      }, 1200);
    }
    return () => clearTimeout(timer);
  }, [isAutoPlaying, loopIndex, listItems]);

  const handleStepForward = () => {
    if (loopIndex === null) {
      setLoopIndex(0);
      setLoopConsole([`>>> for item in fruits:`, `Iteration 1: item = "${listItems[0]}" at index [0]`]);
    } else if (loopIndex < listItems.length - 1) {
      const nextIdx = loopIndex + 1;
      setLoopIndex(nextIdx);
      setLoopConsole(prev => [
        ...prev,
        `Iteration ${nextIdx + 1}: item = "${listItems[nextIdx]}" at index [${nextIdx}]`,
      ]);
    } else {
      setIsAutoPlaying(false);
      setLoopConsole(prev => [...prev, `Loop finished! Traversed all ${listItems.length} elements.`]);
    }
  };

  const handleResetLoop = () => {
    setIsAutoPlaying(false);
    setLoopIndex(null);
    setLoopConsole([]);
  };

  const handleAddItem = () => {
    if (!newItemValue.trim()) return;
    if (listItems.length >= 8) {
      alert('Maximum 8 items allowed for optimal screen visualization.');
      return;
    }
    setListItems(prev => [...prev, newItemValue.trim()]);
    setNewItemValue('');
  };

  const handleRemoveItem = (idxToRemove: number) => {
    if (listItems.length <= 1) {
      alert('Keep at least 1 element to maintain the list structure.');
      return;
    }
    setListItems(prev => prev.filter((_, i) => i !== idxToRemove));
    if (selectedIndex >= listItems.length - 1) {
      setSelectedIndex(Math.max(0, listItems.length - 2));
    }
    handleResetLoop();
  };

  const handleUpdateItem = () => {
    if (!editValue.trim()) return;
    setListItems(prev => {
      const next = [...prev];
      next[selectedIndex] = editValue.trim();
      return next;
    });
  };

  // ──────────────────────────────────────────────────────────
  // CHAPTER 16 STATE: 2D MATRIX (GRID)
  // ──────────────────────────────────────────────────────────
  const [matrixData] = useState<number[][]>([
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90],
  ]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number }>({ row: 0, col: 0 });

  // ──────────────────────────────────────────────────────────
  // CHALLENGES STATE
  // ──────────────────────────────────────────────────────────
  const [challengeStep, setChallengeStep] = useState<number>(1);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [challengeFeedback, setChallengeFeedback] = useState<{ correct: boolean; message: string } | null>(null);

  const checkChallenge = () => {
    if (challengeStep === 1) {
      // Question: What is the index of 'Cherry' in ['Apple', 'Banana', 'Cherry', 'Date']?
      if (userAnswer.trim() === '2') {
        setChallengeFeedback({ correct: true, message: 'CORRECT! "Cherry" is at index [2] because indexing starts at 0 (0: Apple, 1: Banana, 2: Cherry).' });
      } else {
        setChallengeFeedback({ correct: false, message: 'INCORRECT. Remember zero-based indexing: 0 is first, 1 is second, 2 is third.' });
      }
    } else if (challengeStep === 2) {
      // Question: If len(data) == 5, what is the index of the last element?
      if (userAnswer.trim() === '4') {
        setChallengeFeedback({ correct: true, message: 'EXCELLENT! The last valid index is always len(data) - 1, which is 5 - 1 = 4.' });
      } else {
        setChallengeFeedback({ correct: false, message: 'Remember: Length is 5, but indices are 0, 1, 2, 3, 4. So the last element is at index 4.' });
      }
    } else if (challengeStep === 3) {
      // Question: In matrix = [[1, 2], [3, 4]], how do you access value 4?
      const clean = userAnswer.replace(/\s+/g, '');
      if (clean === 'matrix[1][1]' || clean === '[1][1]') {
        setChallengeFeedback({ correct: true, message: 'PERFECT! Row 1 (second row) and Column 1 (second column) accesses matrix[1][1] = 4.' });
      } else {
        setChallengeFeedback({ correct: false, message: 'Hint: Row index comes first, column index comes second: matrix[row][col]. Both are index 1.' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 font-sans">
      {/* ── TOP NAV HEADER ── */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 hover:text-white transition-colors border border-slate-700 cursor-pointer"
            >
              Back to Dashboard
            </button>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                Sprix Programming Curriculum
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-black bg-slate-800 text-slate-300 border border-slate-700">
                Chapters 15 & 16
              </span>
            </div>
          </div>

          <h1 className="text-xl sm:text-3xl font-black mb-1.5 tracking-tight">
            Interactive Array & List Visualizer
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm font-medium max-w-3xl leading-relaxed">
            Hands-on visual laboratory explaining zero-based indexing, list memory structure, <code className="text-sky-300 font-mono font-bold">for</code> loop traversal, <code className="text-sky-300 font-mono font-bold">len()</code> boundaries, and 2D matrices.
          </p>

          {/* Module Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 mt-6">
            <button
              onClick={() => setActiveTab('1D_LISTS')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                activeTab === '1D_LISTS'
                  ? 'bg-sky-600 text-white border-sky-500 shadow-md shadow-sky-600/30'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              Chapter 15: 1D Lists & For Loops
            </button>
            <button
              onClick={() => setActiveTab('2D_MATRICES')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                activeTab === '2D_MATRICES'
                  ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/30'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              Chapter 16: 2D Arrays & Matrices
            </button>
            <button
              onClick={() => setActiveTab('CHALLENGES')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                activeTab === 'CHALLENGES'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              Interactive Practice Challenges
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN WORKSPACE ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* ══════════════════════════════════════════════════════ */}
        {/* MODULE 1: CHAPTER 15 — 1D LISTS & LOOPS               */}
        {/* ══════════════════════════════════════════════════════ */}
        {activeTab === '1D_LISTS' && (
          <div className="space-y-8">

            {/* Section 1: The Core Mental Model */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-lg text-xs font-black bg-blue-100 text-blue-900 border border-blue-200 uppercase">
                  Lesson 1: What is a List?
                </span>
                <span className="text-xs font-bold text-slate-500 font-mono">
                  Syntax: variable_name = [item0, item1, item2, ...]
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                1. The "Lockers" Mental Model & Zero-Based Indexing
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed mb-6">
                Instead of creating separate variables (<code className="text-blue-700 font-mono font-bold">item1, item2, item3</code>), a List stores multiple values inside a single continuous block in memory. Each locker has an address called an <strong>Index</strong>.
              </p>

              {/* ── Interactive Memory Visualization Strip ── */}
              <div className="p-6 rounded-2xl bg-slate-900 text-white mb-6 overflow-x-auto shadow-inner">
                <div className="text-xs font-mono font-bold text-slate-400 mb-3 flex items-center justify-between">
                  <span>MEMORY VISUALIZATION (CLICK ANY LOCKER TO INSPECT OR EDIT)</span>
                  <span className="text-sky-400">Total Length len(fruits) = {listItems.length}</span>
                </div>

                {/* Lockers Grid in a Single Row */}
                <div className="flex items-center gap-3 min-w-max pb-2">
                  {listItems.map((val, idx) => {
                    const isSelected = selectedIndex === idx;
                    const isLoopActive = loopIndex === idx;

                    let boxClass = 'bg-slate-800 border-slate-700 text-slate-200 hover:border-slate-500';
                    if (isLoopActive) {
                      boxClass = 'bg-amber-500/20 border-amber-400 text-amber-200 ring-2 ring-amber-400';
                    } else if (isSelected) {
                      boxClass = 'bg-sky-600/30 border-sky-400 text-sky-100 ring-2 ring-sky-400 shadow-md';
                    }

                    return (
                      <div key={idx} className="flex flex-col items-center">
                        {/* Index Header Pill */}
                        <div className="mb-2 flex flex-col items-center">
                          <span className={`text-[11px] font-mono font-black px-2 py-0.5 rounded-md border ${
                            isSelected ? 'bg-sky-500 text-slate-950 border-sky-400 font-black' : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}>
                            Index [{idx}]
                          </span>
                          <span className="text-[10px] text-slate-500 mt-0.5 font-mono">
                            {idx === 0 ? 'First (0)' : idx === listItems.length - 1 ? 'Last (len-1)' : `Slot ${idx + 1}`}
                          </span>
                        </div>

                        {/* Locker Value Box */}
                        <button
                          onClick={() => setSelectedIndex(idx)}
                          className={`w-28 h-24 rounded-2xl border-2 flex flex-col items-center justify-center p-2 transition-all cursor-pointer relative ${boxClass}`}
                        >
                          <span className="text-sm font-black font-mono tracking-tight text-center truncate w-full">
                            "{val}"
                          </span>
                          <span className="text-[10px] text-slate-400 mt-2 font-mono">
                            fruits[{idx}]
                          </span>

                          {/* Close delete button */}
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              handleRemoveItem(idx);
                            }}
                            title="Remove element"
                            className="absolute top-1.5 right-1.5 w-5 h-5 rounded-md bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white text-[10px] font-bold flex items-center justify-center border border-rose-500/30 transition-colors cursor-pointer"
                          >
                            X
                          </button>
                        </button>
                      </div>
                    );
                  })}

                  {/* Out of bounds ghost box for teaching IndexError */}
                  <div className="flex flex-col items-center opacity-40 ml-2">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-rose-950 text-rose-300 border border-rose-800 mb-2">
                      Index [{listItems.length}] (OUT OF BOUNDS!)
                    </span>
                    <div className="w-28 h-24 rounded-2xl border-2 border-dashed border-rose-500 bg-rose-950/20 flex flex-col items-center justify-center p-2 text-rose-300">
                      <span className="text-xs font-mono font-bold text-center">IndexError</span>
                      <span className="text-[10px] text-rose-400 text-center mt-1">Out of range!</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Interactive Inspector & Modifier Bar ── */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                {/* Modifier for Selected Locker */}
                <div>
                  <span className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                    Inspect / Modify Selected Slot: fruits[{selectedIndex}]
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 font-mono text-xs font-bold bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <button
                      onClick={handleUpdateItem}
                      className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-black transition-colors cursor-pointer"
                    >
                      Update Value
                    </button>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 mt-1.5 block">
                    Code: fruits[{selectedIndex}] = "{editValue}"
                  </span>
                </div>

                {/* Append New Locker */}
                <div>
                  <span className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                    Append New Element to End of List:
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newItemValue}
                      onChange={e => setNewItemValue(e.target.value)}
                      placeholder='e.g. "Fig"'
                      className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 font-mono text-xs font-bold bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      onClick={handleAddItem}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-colors cursor-pointer"
                    >
                      fruits.append()
                    </button>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 mt-1.5 block">
                    Code: fruits.append("{newItemValue || 'item'}")
                  </span>
                </div>
              </div>
            </div>

            {/* Section 2: For Loop Traversal Simulation (Sprix Lesson 3) */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-lg text-xs font-black bg-purple-100 text-purple-900 border border-purple-200 uppercase">
                  Lesson 3: Lists & For Loops
                </span>
                <span className="text-xs font-bold text-slate-500 font-mono">
                  Syntax: for item in list:
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                2. Live Step-by-Step For Loop Traversal
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed mb-6">
                A <code className="text-purple-700 font-mono font-bold">for</code> loop acts like a robotic scanner. In each repetition (iteration), it retrieves one element from left to right, loads it into the loop variable, and executes your code.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Code Editor Preview */}
                <div className="rounded-2xl bg-slate-950 p-5 text-white font-mono text-xs border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block mb-3 border-b border-slate-800 pb-2">
                      Python Source Code
                    </span>
                    <pre className="text-slate-300 leading-loose">
                      <span className="text-slate-500"># 1. Define the list</span>{'\n'}
                      <span className="text-sky-400">fruits</span> = [{listItems.map(x => `"${x}"`).join(', ')}]{'\n\n'}
                      <span className="text-slate-500"># 2. Iterate using a for loop</span>{'\n'}
                      <span className={`block px-2 py-1 rounded transition-colors ${loopIndex !== null ? 'bg-purple-900/60 border border-purple-500 text-purple-200' : ''}`}>
                        <span className="text-purple-400">for</span> <span className="text-amber-300">item</span> <span className="text-purple-400">in</span> <span className="text-sky-400">fruits</span>:
                      </span>
                      <span className={`block px-2 py-1 rounded transition-colors ${loopIndex !== null ? 'bg-purple-950/80 text-emerald-300' : 'text-slate-400'}`}>
                        {'    '}<span className="text-yellow-400">print</span>(<span className="text-amber-300">item</span>)
                      </span>
                    </pre>
                  </div>

                  {/* Stepper Controls */}
                  <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2 mt-4">
                    <button
                      onClick={handleStepForward}
                      disabled={loopIndex === listItems.length - 1}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-black transition-colors cursor-pointer"
                    >
                      {loopIndex === null ? 'Start Loop (Iteration 1)' : 'Step Forward (Next Item)'}
                    </button>
                    <button
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-black transition-colors border border-slate-700 cursor-pointer"
                    >
                      {isAutoPlaying ? 'Pause Auto-Play' : 'Auto-Play Loop'}
                    </button>
                    <button
                      onClick={handleResetLoop}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors border border-slate-700 cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                {/* Real-time Output Terminal */}
                <div className="rounded-2xl bg-slate-900 p-5 text-white font-mono text-xs border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">
                        Virtual Terminal Console Output
                      </span>
                      {loopIndex !== null && (
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black">
                          Pointer: index [{loopIndex}]
                        </span>
                      )}
                    </div>

                    <div className="min-h-40 max-h-48 overflow-y-auto space-y-1.5 text-xs text-slate-300">
                      {loopConsole.length === 0 ? (
                        <span className="text-slate-500 italic">Press "Start Loop" to watch elements execute step-by-step.</span>
                      ) : (
                        loopConsole.map((line, lIdx) => (
                          <div key={lIdx} className="font-mono text-emerald-400">
                            {line}
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                    Active Variable: <strong className="text-amber-300">item = {loopIndex !== null ? `"${listItems[loopIndex]}"` : 'None'}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: The Golden Rules for Students */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl border-t-4 border-t-blue-600 bg-blue-50/70 border border-blue-200">
                <span className="w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-black flex items-center justify-center mb-2">1</span>
                <h4 className="text-sm font-black text-blue-950 mb-1">Index Always Starts at 0</h4>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  In computer science, indexing starts at <code className="font-bold">0</code>, not 1. The first element is always accessed via <code className="font-bold">list[0]</code>.
                </p>
              </div>

              <div className="p-5 rounded-2xl border-t-4 border-t-amber-500 bg-amber-50/70 border border-amber-200">
                <span className="w-6 h-6 rounded-lg bg-amber-500 text-white text-xs font-black flex items-center justify-center mb-2">2</span>
                <h4 className="text-sm font-black text-amber-950 mb-1">The Last Index is len() - 1</h4>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  If <code className="font-bold">len(data) == 5</code>, the valid indices are 0, 1, 2, 3, and 4. Accessing <code className="font-bold">data[5]</code> will crash your program with an <code className="font-bold">IndexError</code>!
                </p>
              </div>

              <div className="p-5 rounded-2xl border-t-4 border-t-emerald-600 bg-emerald-50/70 border border-emerald-200">
                <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white text-xs font-black flex items-center justify-center mb-2">3</span>
                <h4 className="text-sm font-black text-emerald-950 mb-1">Lists are Mutable</h4>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  Unlike strings or tuples, you can change individual elements inside a list anytime using reassignment: <code className="font-bold">list[index] = new_value</code>.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════ */}
        {/* MODULE 2: CHAPTER 16 — 2D ARRAYS & MATRICES          */}
        {/* ══════════════════════════════════════════════════════ */}
        {activeTab === '2D_MATRICES' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-lg text-xs font-black bg-purple-100 text-purple-900 border border-purple-200 uppercase">
                  Chapter 16: Two-Dimensional Arrays (Matrices)
                </span>
                <span className="text-xs font-bold text-slate-500 font-mono">
                  Syntax: matrix[row][column]
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                Understanding 2D Grids: Rows and Columns
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed mb-6">
                A 2D array is simply a <strong>List of Lists</strong> (like an Excel sheet or a chessboard). Every cell is addressed by two indices: first the <strong>Row index</strong>, then the <strong>Column index</strong>.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* 2D Matrix Table Grid */}
                <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col items-center">
                  <span className="text-[11px] font-mono font-bold text-slate-400 mb-4 tracking-wider">
                    CLICK ANY CELL TO VIEW ITS TWO COORDINATES
                  </span>

                  {/* Matrix Header Columns */}
                  <div className="grid grid-cols-3 gap-3 mb-2 w-64 text-center">
                    <span className="text-[11px] font-mono text-purple-400 font-black">Col [0]</span>
                    <span className="text-[11px] font-mono text-purple-400 font-black">Col [1]</span>
                    <span className="text-[11px] font-mono text-purple-400 font-black">Col [2]</span>
                  </div>

                  {/* Rows */}
                  <div className="space-y-3">
                    {matrixData.map((row, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-3">
                        <span className="w-14 text-[11px] font-mono text-sky-400 font-black text-end">
                          Row [{rIdx}]
                        </span>

                        <div className="grid grid-cols-3 gap-3 w-64">
                          {row.map((val, cIdx) => {
                            const isCellSelected = selectedCell.row === rIdx && selectedCell.col === cIdx;
                            return (
                              <button
                                key={cIdx}
                                onClick={() => setSelectedCell({ row: rIdx, col: cIdx })}
                                className={`h-16 rounded-2xl border-2 font-mono text-sm font-black transition-all cursor-pointer flex flex-col items-center justify-center ${
                                  isCellSelected
                                    ? 'bg-purple-600 text-white border-purple-400 ring-2 ring-purple-300 shadow-lg scale-105'
                                    : 'bg-slate-800 text-slate-200 border-slate-700 hover:border-slate-500'
                                }`}
                              >
                                <span>{val}</span>
                                <span className="text-[9px] text-slate-400 mt-1">
                                  [{rIdx}][{cIdx}]
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coordinates & Code Inspector */}
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200">
                    <span className="text-xs font-black text-purple-900 uppercase block mb-1">
                      Active Selected Cell Coordinates:
                    </span>
                    <h3 className="text-xl font-mono font-black text-purple-950 mb-2">
                      matrix[{selectedCell.row}][{selectedCell.col}] = {matrixData[selectedCell.row][selectedCell.col]}
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-700">
                      <div className="p-2.5 rounded-xl bg-white border border-purple-100">
                        <span className="block font-bold text-sky-800">1st Index: Row</span>
                        <span>Row {selectedCell.row + 1} (index [{selectedCell.row}])</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-purple-100">
                        <span className="block font-bold text-purple-800">2nd Index: Column</span>
                        <span>Column {selectedCell.col + 1} (index [{selectedCell.col}])</span>
                      </div>
                    </div>
                  </div>

                  {/* Nested Loop Code Template */}
                  <div className="p-5 rounded-2xl bg-slate-950 text-white font-mono text-xs border border-slate-800">
                    <span className="text-slate-400 text-[10px] font-black uppercase block mb-2">
                      How to Traverse a 2D Array with Nested Loops:
                    </span>
                    <pre className="text-slate-300 leading-relaxed">
                      <span className="text-purple-400">for</span> row <span className="text-purple-400">in</span> matrix:{'\n'}
                      {'    '}<span className="text-purple-400">for</span> cell <span className="text-purple-400">in</span> row:{'\n'}
                      {'        '}<span className="text-yellow-400">print</span>(cell, end=<span className="text-emerald-400">" "</span>){'\n'}
                      {'    '}<span className="text-yellow-400">print</span>()
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════ */}
        {/* MODULE 3: INTERACTIVE CHALLENGES                     */}
        {/* ══════════════════════════════════════════════════════ */}
        {activeTab === 'CHALLENGES' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              {/* Challenge Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-slate-100 pb-3">
                <span className="px-3 py-1 rounded-lg text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-200 uppercase">
                  Sprix Mastery Check: Level {challengeStep} of 3
                </span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3].map(step => (
                    <button
                      key={step}
                      onClick={() => {
                        setChallengeStep(step);
                        setUserAnswer('');
                        setChallengeFeedback(null);
                      }}
                      className={`w-8 h-8 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                        challengeStep === step
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {step}
                    </button>
                  ))}
                </div>
              </div>

              {/* Challenge 1 */}
              {challengeStep === 1 && (
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 mb-2">
                    Challenge 1: Zero-Based Element Lookup
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium mb-4">
                    Consider the following list: <code className="bg-slate-100 px-2 py-1 rounded font-bold font-mono text-blue-700">fruits = ["Apple", "Banana", "Cherry", "Date"]</code>.
                    What is the numerical index to access <strong>"Cherry"</strong>?
                  </p>
                </div>
              )}

              {/* Challenge 2 */}
              {challengeStep === 2 && (
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 mb-2">
                    Challenge 2: The Length Boundary Rule
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium mb-4">
                    If a list contains 5 items (<code className="bg-slate-100 px-2 py-1 rounded font-bold font-mono text-amber-700">len(scores) == 5</code>), what is the index of the <strong>last</strong> element in this list?
                  </p>
                </div>
              )}

              {/* Challenge 3 */}
              {challengeStep === 3 && (
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 mb-2">
                    Challenge 3: 2D Matrix Cell Coordinates
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium mb-4">
                    Given <code className="bg-slate-100 px-2 py-1 rounded font-bold font-mono text-purple-700">matrix = [[10, 20], [30, 40]]</code>.
                    Write the exact Python expression to retrieve value <strong>40</strong> (which is in the 2nd row and 2nd column):
                  </p>
                </div>
              )}

              {/* Answer Input */}
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={e => setUserAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="px-4 py-2.5 rounded-xl border border-slate-300 font-mono text-xs sm:text-sm font-bold bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64"
                />
                <button
                  onClick={checkChallenge}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-colors cursor-pointer shadow-sm"
                >
                  Verify My Answer
                </button>
              </div>

              {/* Feedback Alert */}
              <AnimatePresence>
                {challengeFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className={`mt-4 p-4 rounded-2xl border text-xs sm:text-sm font-bold leading-relaxed ${
                      challengeFeedback.correct
                        ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
                        : 'bg-rose-50 text-rose-950 border-rose-300'
                    }`}
                  >
                    {challengeFeedback.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
