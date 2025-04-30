import { useParams } from 'react-router-dom';

export default function GameDetailsPage() {
  const { id } = useParams();

  return (
    <div style={{ padding: 20 }}>
      <h1>Detalhes do Jogo</h1>
      <p>ID do jogo: {id}</p>
      {/* Em breve: buscar dados do jogo pela API */}
    </div>
  );
}
