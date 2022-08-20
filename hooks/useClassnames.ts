import { useEffect, useState } from "react";

export const useClassnamesAdvanced = <T>(
  id: string,
  idClassnames: { [key: string]: T }
) => {
  const [currentClassnames, setCurrentClassnames] = useState(idClassnames[id]);

  useEffect(() => {
    setCurrentClassnames(idClassnames[id]);
  }, [id, idClassnames]);

  return currentClassnames;
};

export const useClassnames = (
  id: string,
  idClassnames: { [key: string]: string }
) => useClassnamesAdvanced<string>(id, idClassnames);
