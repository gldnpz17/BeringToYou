const NextIcon = ({ style, className, onClick }) => {
  return (
    <svg style={style} viewBox="0 0 24 24" className={className} onClick={onClick}>
      <path fill="currentColor" d="M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,18L16,12L10,6L8.6,7.4L13.2,12L8.6,16.6L10,18Z" />
    </svg>
  );
};

export default NextIcon;