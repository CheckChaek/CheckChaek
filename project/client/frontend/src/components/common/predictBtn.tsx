import { ReactNode } from 'react';

interface BtnInfo {
  width: string;
  height: string;
  defaultColor: string;
  selectedColor: string;
  fontColor: string;
  action: () => void;
  children: ReactNode;
}

function PredictBtn({
  width,
  height,
  defaultColor,
  selectedColor,
  fontColor,
  action,
  children,
}: BtnInfo) {
  return (
    <button
      type="button"
      className={`${width} ${height} hover:${selectedColor} hover:shadow-none ${defaultColor}  rounded-2xl shadow-lg shadow-BACKGROUND-600`}
      onClick={action}>
      <p className={`${fontColor}`}>{children}</p>
    </button>
  );
}
export default PredictBtn;
