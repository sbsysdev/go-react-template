/* react */
import { useState, useEffect } from 'react';
/* utils */
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setIntoLocalStorage,
} from '@utilities/functions';

export function useLocalStorage<T>(key: string, defaultValue?: T) {
  const [value, setValue] = useState<T | undefined>(() => getFromLocalStorage(key, defaultValue));

  useEffect(() => {
    if (!value) {
      removeFromLocalStorage(key);
      return;
    }
    setIntoLocalStorage(key, value);
  }, [key, value]);

  const remove = () => {
    setValue(undefined);
  };

  return [value, setValue, remove] as const;
}
