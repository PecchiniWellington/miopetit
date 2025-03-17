const BrandNotificationNumber = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={`absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white ${className}`}
    >
      {children}
    </span>
  );
};

export default BrandNotificationNumber;
