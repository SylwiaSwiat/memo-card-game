import './Level.scss';

type LevelProps = {
    handleLevel: (chosenLevel: string) => void;
    chosenLevel: string,
}

const Level = ({handleLevel, chosenLevel}: LevelProps) => {
    return ( 
        <button className='lvlButton' onClick={() => handleLevel(chosenLevel)}>{chosenLevel}</button>
     );
}
 
export default Level;