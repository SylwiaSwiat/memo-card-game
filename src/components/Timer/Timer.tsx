type TimerProps = {
    seconds: number;
  };
  
  const Timer = ({ seconds }: TimerProps) => {
    const formatTime = (totalSeconds: number) => {
      const minutes = Math.floor(totalSeconds / 60);
      const remainingSeconds = totalSeconds % 60;
      return `${minutes > 0 ? `${minutes} min ` : ''}${remainingSeconds} sec`;
    };
  
    return <p>Time Elapsed: {formatTime(seconds)}</p>;
  };
  
  export default Timer;
  