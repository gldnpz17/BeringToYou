const FailSafeImg = ({src, altsrc, ...props}) => {
  return (
    <img src={src}
      onError={event => {
        event.target.onerror=null; 
        event.target.src=altsrc;
      }} 
      {...props}
    />
  );
};

export default FailSafeImg;