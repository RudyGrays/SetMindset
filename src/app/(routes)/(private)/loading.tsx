import { Spinner } from "@/shared/ui/spinner";

const loading = () => {
  <div className="flex h-full w-full items-center justify-center">
    Загрузка...
    <Spinner />
  </div>;
};

export default loading;
