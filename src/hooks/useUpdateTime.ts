import { useInterval, useUpdate } from 'ahooks';

export function useUpdateTime() {
  const update = useUpdate();

  useInterval(update, 30 * 1000);
}
