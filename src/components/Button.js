const Button = ({ color, text }) => {
  return (
    <div>
      <button className="btn" style={{ backgroundColor: color }}>
        {text}
      </button>
    </div>
  );
};

export default Button;
