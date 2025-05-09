import React, { createContext, useContext, useState } from 'react';

interface QuizContextProps {
  quizData: any; // Dados do quiz (você pode tipar melhor aqui)
  setQuizData: React.Dispatch<React.SetStateAction<any>>;
  submitQuiz: (quizData: any) => void; // Função para enviar o quiz
}

const QuizContext = createContext<QuizContextProps | undefined>(undefined);

export const QuizProvider = ({ children }: { children: React.ReactNode }) => {
  const [quizData, setQuizData] = useState<any>(null);

  const submitQuiz = (quizData: any) => {
    // Aqui você pode adicionar a lógica para enviar o quiz para o backend ou processá-lo
    console.log("Submetendo quiz", quizData);
  };

  return (
    <QuizContext.Provider value={{ quizData, setQuizData, submitQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
