export default function InputField({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  rows = 5,
}) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}<span className="req">*</span>
      </label>

      {type === "textarea" ? (
        <textarea
          id={id}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={error ? "error" : ""}
        />
      ) : (
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={error ? "error" : ""}
        />
      )}

      {error && (
        <span className="field-error">
          <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd" />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
}
