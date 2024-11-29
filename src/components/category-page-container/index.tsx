import { ReactNode } from 'react';

interface CategoryPageContainerProps {
  children: ReactNode;
  title: string;
}

const CategoryPageContainer = ({
  children,
  title,
}: CategoryPageContainerProps) => {
  return (
    <div className="pt-20">
      <h1 className="text-2xl font-bold mb-6 text-slate-900">{title}</h1>
      {children}
    </div>
  );
};

export default CategoryPageContainer;
