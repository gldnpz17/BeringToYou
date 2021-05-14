const NavMenuItem = ({ href, name, children, className }) => {
  return (
    <a href={href} className={className}>
      <div className='d-flex flex-row align-items-center mb-4'>
        {children}
        <p className='m-0 ms-2'>{name}</p>
      </div>
    </a>
  );
};

export default NavMenuItem;