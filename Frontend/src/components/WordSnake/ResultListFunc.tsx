import { useLocation } from 'react-router-dom';
import GameoverBoard from './GameoverBoard';

type ResultListProps = {
  wordList: string[];
}

const ResultListFunc: React.FC<ResultListProps> = (props) => {
  const location = useLocation();
  const { wordList } = location.state;
  return(
    <div>
                {/* <div>
                    <ul>
                        {wordList.map((word: string, index: number) => (
                            <li key={index}>{word}</li>
                        ))}
                    </ul>
                </div> */}
        <GameoverBoard wordList={wordList}/>
    </div>
  );
};

export default ResultListFunc;

