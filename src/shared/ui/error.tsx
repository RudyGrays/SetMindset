export const Error = ({ error }: { error?: { message?: string } }) => {
  return (
    <>{error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}</>
  );
};
