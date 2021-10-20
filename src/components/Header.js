import Button from './Button';

const Header = ({ title, onAddClick, showAddTaskValue }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        color={showAddTaskValue ? 'red' : 'green'}
        text={showAddTaskValue ? 'Close' : 'Add'}
        onClick={onAddClick}
      />
    </header>
  );
};

export default Header;
