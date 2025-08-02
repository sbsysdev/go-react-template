/* theme */
import { ThemeSchemeProvider } from '@ui/contexts/theme';
import { ThemeSchemeLayout } from '@ui/layouts/theme';
/* hooks */
import { useLocalStorage } from '@utilities/hooks';
/* types */
import type { ThemePreference } from '@ui/types';
/* layouts */
import { BaseLayout } from './infrastructure/layouts/base';

export default function App() {
  const [preference, updatePreference] = useLocalStorage<ThemePreference>('preference', 'system');

  return (
    <ThemeSchemeProvider preference={preference} updatePreference={updatePreference}>
      <ThemeSchemeLayout>
        <BaseLayout />
      </ThemeSchemeLayout>
    </ThemeSchemeProvider>
  );
}
