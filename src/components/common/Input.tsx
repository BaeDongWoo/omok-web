interface inputProps {
  title: string;
  typed: string;
  className: string;
  value: string;
  onChangeEvent: any;
}

const Input = ({
  title,
  typed,
  className,
  value,
  onChangeEvent,
}: inputProps) => {
  return (
    <div className="form-group">
      <label htmlFor={className}>{title}</label>
      <input
        type={typed}
        className={className}
        value={value}
        onChange={(e: any) => onChangeEvent(e.target.value)}
        required
      />
    </div>
  );
};
export default Input;
