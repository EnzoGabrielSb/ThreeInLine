export const Square = ({ children, updateBoard, index, isSelected }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
    console.log("Click en casilla numero: " + index);
  };

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  );
};
