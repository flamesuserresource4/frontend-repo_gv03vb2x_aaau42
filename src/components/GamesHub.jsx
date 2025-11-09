import { useEffect, useMemo, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = useMemo(() => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (const [a,b,c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
    }
    return null;
  }, [board]);

  const handleClick = (i) => {
    if (winner || board[i]) return;
    const next = board.slice();
    next[i] = xIsNext ? 'X' : 'O';
    setBoard(next);
    setXIsNext(!xIsNext);
  };

  const reset = () => { setBoard(Array(9).fill(null)); setXIsNext(true); };

  useEffect(() => {
    if (winner) {
      fetch(`${API_BASE}/games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: 'demo-user', type: 'tictactoe', result: winner })
      }).catch(()=>{});
    }
  }, [winner]);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2 w-48">
        {board.map((cell, i) => (
          <button key={i} onClick={() => handleClick(i)} className="h-16 w-16 rounded-xl bg-white border border-slate-300 text-2xl font-semibold text-slate-800 shadow-sm">
            {cell}
          </button>
        ))}
      </div>
      <div className="text-sm text-slate-600">{winner ? `Winner: ${winner}` : `Turn: ${xIsNext ? 'X' : 'O'}`}</div>
      <button onClick={reset} className="text-xs text-indigo-600 hover:underline">Reset</button>
    </div>
  );
}

export default function GamesHub() {
  return (
    <div id="games" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Games Hub</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <div className="font-medium text-slate-700 mb-2">Tic-Tac-Toe</div>
          <TicTacToe />
        </div>
        <div className="rounded-xl border border-dashed border-slate-200 p-4 text-slate-500 text-sm">
          More games coming soon: Sudoku and a Daily Puzzle.
        </div>
      </div>
    </div>
  );
}
