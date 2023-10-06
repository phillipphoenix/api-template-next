export type ApiError = {
  status: number;
  statusMessage: string;
};

export const NewApiError = (
  status: number,
  statusMessage: string,
): ApiError => ({ status, statusMessage });
