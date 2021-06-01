// Temporarily unused.

const ExpandIcon = (props) => {
  return (
    <svg {...props} viewBox="0 0 24 24">
      <path fill='currentColor' id='current-expand-state' d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" />
      <path id='expand-path' style={{visibility: 'hidden'}} d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" />
      <path id='hide-path' style={{visibility: 'hidden'}} d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />       
    </svg>
  );
}

export default ExpandIcon;