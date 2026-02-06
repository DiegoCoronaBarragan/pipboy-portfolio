export default function PipBoyFrame({ children }) {
  return (
    <div className="pipboy-frame flicker">
      <div className="pipboy-screen distort">
        {children}
      </div>
    </div>
  );
}

