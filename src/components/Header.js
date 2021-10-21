import Button from './Button';
import { useLocation } from 'react-router';

const Header = ({ title, onAddClick, showAddTaskValue }) => {
  const location = useLocation();

  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === '/' && (
        <Button
          color={showAddTaskValue ? 'red' : 'green'}
          text={showAddTaskValue ? 'Close' : 'Add'}
          onClick={onAddClick}
        />
      )}
    </header>
  );
};

export default Header;
