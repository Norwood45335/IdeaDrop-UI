interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const PageLayout = ({ children, className = '' }: PageLayoutProps) => {
  return (
    <div className={`min-h-screen py-6 px-4 ${className}`}>
      <div className="container mx-auto max-w-6xl">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
