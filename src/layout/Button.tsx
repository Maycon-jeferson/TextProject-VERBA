export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`p-4 m-4 mt-2 px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed ${props.className || ""}`}
      {...props}
    >
      {props.children}
    </button>
  );
}
