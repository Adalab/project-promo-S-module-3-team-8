function Input({ htmlFor, placeholder, data, pattern, text, handleInput }) {

  const elementPattern = pattern === undefined ? '' : { pattern }
  console.log(pattern);
  return (
    <label htmlFor={htmlFor} className="sectionForm__form__project--label">{text}
      <input
        className="sectionForm__form__project--input"
        type="text"
        placeholder={placeholder}
        name={htmlFor}
        id={htmlFor}
        value={data.name}
        onChange={handleInput}
        pattern={elementPattern}
      />
    </label>
  )
}

export default Input;