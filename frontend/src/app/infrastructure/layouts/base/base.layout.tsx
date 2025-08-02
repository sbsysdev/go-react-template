/* react */
import { useState } from 'react';
/* components */
import { Icon } from '@ui/components/icon';
/* assets */
import { mdiMenu } from '@mdi/js';
/* styles */
import styles from './base.module.css';

export default function BaseLayout() {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  return (
    <div className={styles.base}>
      {showSidebar ? <aside className={styles.sidebar}></aside> : <></>}

      <div className={styles.container}>
        <header>
          <button type="button" onClick={() => setShowSidebar(current => !current)}>
            <Icon path={mdiMenu} size="xl" />
          </button>
        </header>

        <div className={styles.content}>CONTENT</div>

        <footer>FOOTER</footer>
      </div>
    </div>
  );
}
