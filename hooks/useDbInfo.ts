import useSWR from "swr";
import { DbInfo } from "../pages/api/db-utils/db-info";

export default function useDbInfo() {
  const { data: dbInfo } = useSWR<DbInfo>("/api/db-utils/db-info");

  return { dbInfo };
}
