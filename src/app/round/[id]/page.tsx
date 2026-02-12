import { McqView } from '@/components/rounds/mcq-view';
import { DebuggingView } from '@/components/rounds/debugging-view';
import { FinalRoundView } from '@/components/rounds/final-round-view';

type RoundPageProps = {
  params: {
    id: string;
  };
};

export default function RoundPage({ params }: RoundPageProps) {
  const { id } = params;

  const renderRound = () => {
    switch (id) {
      case '1':
        return <McqView />;
      case '2':
        return <DebuggingView />;
      case '3':
        return <FinalRoundView />;
      default:
        return <div>Round not found</div>;
    }
  };

  return <div className="min-h-screen bg-gray-900">{renderRound()}</div>;
}
