// pages/Quiz.tsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

interface Option {
  answer: string;
  value: string | number;
  image?: string;
}

interface Question {
  question: string;
  min_length: number;
  required: boolean;
  tag: string;
  type: 'SINGLE_CHOICE' | 'MULTI_CHOICE';
  options: Option[];
}

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [quizRes, gamesRes] = await Promise.all([
          api.get<Question[]>('/quiz/template'),
          api.get<{ data: Option[] }>('/games/quiz/template')
        ]);

        const quizData = quizRes.data.map((q) => {
          if (q.tag === 'FAVORITE_GAMES') {
            return {
              ...q,
              options: gamesRes.data.data
            };
          }
          return q;
        });

        setQuestions(quizData);
      } catch (error) {
        console.error('Erro ao carregar quiz:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (tag: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [tag]: value }));
  };

  const handleCheckboxChange = (tag: string, value: string | number) => {
    setAnswers((prev) => {
      const current = prev[tag] || [];
      return {
        ...prev,
        [tag]: current.includes(value)
          ? current.filter((v: any) => v !== value)
          : [...current, value]
      };
    });
  };
  const navigate = useNavigate();
  
  const handleSubmit = async () => {
    try {
      await api.post('/quiz', answers);
      alert('Quiz enviado com sucesso!');
      navigate('/recomendacoes'); // redireciona após o envio
    } catch (err) {
      console.error('Erro ao enviar quiz:', err);
      alert('Erro ao enviar quiz');
    }
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: 40 }}>Carregando...</div>;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FCFCFC', padding: '20px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#2C003E', marginBottom: 20 }}>
        Responda o Quiz
      </h1>

      <div style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: 10 }}>
        {questions.map((q, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#fff',
              borderRadius: 16,
              padding: 16,
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              marginBottom: 20
            }}
          >
            <h2 style={{ fontSize: '18px', color: '#2C003E', marginBottom: 12 }}>{q.question}</h2>

            {q.type === 'SINGLE_CHOICE' ? (
              <div>
                {q.options.map((opt, i) => (
                  <label
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: 8,
                      cursor: 'pointer',
                      color: '#2C003E'
                    }}
                  >
                    <input
                      type="radio"
                      name={q.tag}
                      value={opt.value.toString()}
                      checked={answers[q.tag] === opt.value.toString()}
                      onChange={() => handleChange(q.tag, opt.value.toString())}
                      style={{ marginRight: 8 }}
                    />
                    {opt.answer}
                  </label>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {q.options.map((opt, i) => (
                  <label
                    key={i}
                    style={{
                      backgroundColor: '#F1F5F9',
                      borderRadius: 12,
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      flex: '0 0 calc(33% - 8px)',
                      color: '#2C003E'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={answers[q.tag]?.includes(opt.value) || false}
                      onChange={() => handleCheckboxChange(q.tag, opt.value)}
                      style={{ marginRight: 8 }}
                    />
                    {opt.image && (
                      <img
                        src={opt.image}
                        alt={opt.answer}
                        style={{ width: 50, height: 50, objectFit: 'cover', marginRight: 8, borderRadius: 6 }}
                      />
                    )}
                    <span>{opt.answer}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        style={{
          marginTop: 20,
          width: '100%',
          padding: '12px 0',
          backgroundColor: '#59B2FF',
          color: 'white',
          fontWeight: '600',
          border: 'none',
          borderRadius: 12,
          cursor: 'pointer'
        }}
      >
        Enviar Quiz
      </button>
    </div>
  );

};

export default Quiz;
