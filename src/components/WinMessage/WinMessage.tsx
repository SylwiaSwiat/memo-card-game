import './WinMessage.scss';

type WinMessageProps = {
  onClose: () => void;
}

const WinMessage = ({ onClose }: WinMessageProps) => {
  return (
    <div className="winMessageOverlay" onClick={onClose}>
      <div className="winMessage" onClick={(e) => e.stopPropagation()}>
        <h2>Congratulations!</h2>
        <p>You've won the game!</p>
      </div>
    </div>
  );
};

export default WinMessage;
