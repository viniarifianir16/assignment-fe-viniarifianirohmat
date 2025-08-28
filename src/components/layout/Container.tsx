interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <div className="mx-5 my-8 lg:mx-10">
      <div>{children}</div>
    </div>
  );
}
