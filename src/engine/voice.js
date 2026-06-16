// Voice input/output using browser-native Web Speech API. Fully offline-capable.

export function speak(text, lang = "en-IN") {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}

export function startListening({ onResult, onError, lang = "en-IN" }) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    onError?.("Speech recognition not supported in this browser. Try Chrome.");
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = lang;
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };
  recognition.onerror = (event) => onError?.(event.error);

  recognition.start();
  return recognition;
}

export const LANGUAGE_CODES = {
  English: "en-IN",
  Hindi: "hi-IN",
  Marathi: "mr-IN",
  Kannada: "kn-IN",
};
