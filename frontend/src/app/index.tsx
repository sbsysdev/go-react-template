/* contexts */
import { ThemeSchemeProvider } from '@ui/contexts/theme';
/* layouts */
import { ThemeSchemeLayout } from '@ui/layouts/theme';
import { BaseLayout } from './infrastructure/layouts/base';
/* hooks */
import { useLocalStorage } from '@utilities/hooks';
/* types */
import type { ThemePreference } from '@ui/types';

export default function App() {
  const [preference, updatePreference] = useLocalStorage<ThemePreference>('preference', 'system');

  return (
    <ThemeSchemeProvider preference={preference} updatePreference={updatePreference}>
      <ThemeSchemeLayout>
        <BaseLayout>{/* routes */}</BaseLayout>
      </ThemeSchemeLayout>
    </ThemeSchemeProvider>
  );
}
