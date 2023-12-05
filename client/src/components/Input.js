const InputField = ({ label, value, onChange, name, type = 'number', options, setInputs }) => {
  const inputProps = {
    value,
    onChange,
    className: "w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="mb-4">
      <label className="block mb-2">{label}:</label>
      {type === 'select' ? (
        <select {...inputProps} onChange={handleInputChange} name={name}>
          {options.map((opt) => (
            <option key={opt} value={opt} >
              {opt}
            </option>
          ))}
        </select>
      ) : type === 'number' ? (
        <input type={type} min={0} max={name === "age" ? 100 : name === "weight" ? 400 : 250} {...inputProps} name={name} />
      ) : (
        <input type={type} {...inputProps} name={name} />
      )}
    </div>
  );
};

export default InputField;
