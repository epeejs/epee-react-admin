import { useInterval, useUpdate } from 'react-use';

export function useUpdateTime() {
  const update = useUpdate();

  useInterval(update, 30 * 1000);
}
