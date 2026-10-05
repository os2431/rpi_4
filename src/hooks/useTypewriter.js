import { useState, useEffect } from 'react';

/**
 * Кастомный React-хук для эффекта печатной машинки (Typewriter effect)
 * 
 * @param {string[]} words - Массив слов/фраз для циклической печати
 * @param {Object} options - Настройки скорости и задержек
 * @param {number} [options.typingSpeed=80] - Скорость печати символа (мс)
 * @param {number} [options.deletingSpeed=40] - Скорость стирания символа (мс)
 * @param {number} [options.pauseDuration=1600] - Пауза перед стиранием напечатанного слова (мс)
 * @returns {{ currentText: string, isDeleting: boolean }}
 */
export function useTypewriter(words = [], {
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 1600,
} = {}) {
  const [currentText, setCurrentText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const currentWord = words[wordIndex % words.length];

    let timer;

    if (!isDeleting) {
      // Печать текста посимвольно
      if (currentText.length < currentWord.length) {
        timer = setTimeout(() => {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        // Слово напечатано целиком — пауза перед стиранием
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Стирание текста посимвольно
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(currentWord.slice(0, currentText.length - 1));
        }, deletingSpeed);
      } else {
        // Слово стёрто — переходим к следующему слову
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return { currentText, isDeleting };
}

export default useTypewriter;
