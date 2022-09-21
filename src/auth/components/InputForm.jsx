export const InputForm = ({
  value,
  type = "text",
  onInputChange,
  errorMessage,
  isSubmit,
  name,
  placeholder = "",
}) => {
  return (
    <div className="form-group mb-2">
      <input
        type={type}
        className={`form-control ${errorMessage && isSubmit && 'is-invalid'}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onInputChange}
      />
      <span
        style={{
          display: (errorMessage && isSubmit) ? "block" : "none",
          color: '#fff'
        }}
      >
        {errorMessage}
      </span>
    </div>
  );
};
