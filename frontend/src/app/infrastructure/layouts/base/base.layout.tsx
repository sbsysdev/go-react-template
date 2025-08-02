/* react */
import { useState } from 'react';
/* components */
import { Header } from '../../components/header';
import { Sidebar } from '../../components/sidebar';
/* styles */
import styles from './base.module.css';

export default function BaseLayout() {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  return (
    <div className={styles.base}>
      {showSidebar ? <Sidebar className={styles.sidebar} /> : <></>}

      <div className={styles.container}>
        <Header toggleSidebar={() => setShowSidebar(current => !current)} />

        <div className={styles.content}>CONTENT</div>

        <footer>FOOTER</footer>
      </div>
    </div>
  );
}
