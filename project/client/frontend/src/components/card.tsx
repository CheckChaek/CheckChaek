import { ReactNode } from 'react';

interface CardPros {
  children: ReactNode;
}

function Card({ children }: CardPros) {
  return (
    <div className="flex justify-center mt-16 min-h-[80vh]">
      <div className=" w-3/4 rounded-2xl overflow-hidden shadow-lg ">
        {children}
      </div>
    </div>
  );
}

export default Card;
