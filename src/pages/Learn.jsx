import { useState } from "react";
import { useUser } from "../context/UserContext";
import { getMatchedSchemes } from "../data/schemes";
import { Landmark, CheckCircle2, BookOpen, Award } from "lucide-react";

const QUIZ = [
  {
    q: "What % of income should you ideally save each month?",
    options: ["0-5%", "15-20%", "50%", "100%"],
    answer: 1,
  },
  {
    q: 'A caller asks for your OTP to "verify your account." What should you do?',
    options: [
      "Share it quickly",
      "Never share it",
      "Share only the first 3 digits",
      "Ask them to call back",
    ],
    answer: 1,
  },
  {
    q: "What is an emergency fund for?",
    options: [
      "Buying gold",
      "Unexpected expenses like medical bills",
      "Vacation",
      "Paying off all debt instantly",
    ],
    answer: 1,
  },
];

export default function Learn() {
  const { user, setUser } = useUser();
  const schemes = getMatchedSchemes(user || {});
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (i) => {
    if (selected !== null) return;
    setSelected(i);
    const correct = i === QUIZ[quizIndex].answer;
    if (correct) setScore((s) => s + 1);

    setTimeout(() => {
      if (quizIndex + 1 < QUIZ.length) {
        setQuizIndex((q) => q + 1);
        setSelected(null);
      } else {
        setFinished(true);
        const bonus = Math.round(
          ((score + (correct ? 1 : 0)) / QUIZ.length) * 10,
        );
        setUser({
          ...user,
          financialHealthScore: Math.min(
            100,
            (user.financialHealthScore || 50) + bonus,
          ),
        });
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
          <Landmark size={20} className="text-emerald-600" /> Schemes for You
        </h1>
        <p className="text-sm text-gray-500 mb-3">
          Based on your profile, you may qualify for:
        </p>
        <div className="space-y-2">
          {schemes.length === 0 && (
            <p className="text-sm text-gray-400">
              No specific matches yet — complete your profile for better
              results.
            </p>
          )}
          {schemes.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
            >
              <p className="font-medium text-gray-800 text-sm">{s.name}</p>
              <p className="text-sm text-gray-500 mt-1">{s.description}</p>
              <p className="text-xs text-emerald-700 bg-emerald-50 rounded-lg p-2 mt-2">
                {s.applyHint}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
          <BookOpen size={18} className="text-purple-600" /> Quick Quiz
        </h2>
        {!finished ? (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-400 mb-1">
              Question {quizIndex + 1} of {QUIZ.length}
            </p>
            <p className="font-medium text-gray-800 mb-3">
              {QUIZ[quizIndex].q}
            </p>
            <div className="space-y-2">
              {QUIZ[quizIndex].options.map((opt, i) => {
                const isSelected = selected === i;
                const isCorrect = i === QUIZ[quizIndex].answer;
                let style = "border-gray-300 text-gray-700";
                if (selected !== null && isSelected) {
                  style = isCorrect
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-red-500 bg-red-50 text-red-700";
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className={`w-full text-left px-3 py-2 rounded-lg border text-sm ${style}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center">
            <Award className="text-amber-500 mx-auto mb-2" size={32} />
            <p className="font-semibold text-gray-800">
              Quiz complete! Score: {score}/{QUIZ.length}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Your Financial Health Score has been updated.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
