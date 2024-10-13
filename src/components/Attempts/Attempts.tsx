import './Attempts.scss';

type AttemptsProps = {
    attempts: number;
  };
  
  const Attempts = ({ attempts }: AttemptsProps) => {
    return <p>Attempts: {attempts}</p>;
  };
  
  export default Attempts;
  