import { useCallback, useEffect, useEffectEvent, useState } from "react";

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  refetch: () => void;
}

function toErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Error desconocido";
}

/**
 * Ejecuta `fetcher` al montar y expone `refetch` para reintentar.
 *
 * - Ignora respuestas que llegan después de desmontar o de un refetch
 *   posterior (evita condiciones de carrera).
 * - `fetcher` se lee con `useEffectEvent`, así que no hace falta memoizarlo.
 */
export function useApi<T>(fetcher: () => Promise<T>): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });
  const [requestId, setRequestId] = useState(0);
  const runFetcher = useEffectEvent(() => fetcher());

  useEffect(() => {
    let ignore = false;

    runFetcher().then(
      (data) => {
        if (!ignore) setState({ data, loading: false, error: null });
      },
      (error: unknown) => {
        if (!ignore) setState({ data: null, loading: false, error: toErrorMessage(error) });
      },
    );

    return () => {
      ignore = true;
    };
  }, [requestId]);

  const refetch = useCallback(() => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    setRequestId((id) => id + 1);
  }, []);

  return { ...state, refetch };
}
