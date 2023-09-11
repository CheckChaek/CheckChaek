import { ReactNode } from 'react';

interface CardPros {
  children: ReactNode;
  width: string;
  height: string;
}

function Card({ children, width, height }: CardPros) {
  return (
    <div className={`flex justify-center mt-8 ${height}`}>
      <div className={`${width} rounded-2xl overflow-hidden shadow-2xl p-16`}>
        {children}
      </div>
    </div>
  );
}

export default Card;
