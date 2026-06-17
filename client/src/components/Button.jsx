export default function Button({
  label,
  onClick,
  variant = "primary",
  disabled = false,
  loading = false,
  icon,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn btn-${variant}`}
    >
      {loading ? (
        <>
          <span className="spinner" />
          Generating...
        </>
      ) : (
        <>
          {icon && icon}
          {label}
        </>
      )}
    </button>
  );
}
