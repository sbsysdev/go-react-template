/* react */
import { useState } from 'react';
/* props */
import type { BaseLayoutProps } from './base.props';
/* components */
import { Header } from '../../components/header';
import { Sidebar } from '../../components/sidebar';
import { Footer } from '../../components/footer';
/* utils */
import { classNames, content } from '@ui/utils';
/* styles */
import styles from './base.module.css';

export default function BaseLayout({ className, children, ...props }: BaseLayoutProps) {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  return (
    <div className={classNames(styles.base, className)} {...props}>
      {showSidebar ? <Sidebar className={styles.sidebar} /> : <></>}

      <div className={styles.container}>
        <Header toggleSidebar={() => setShowSidebar(current => !current)} />

        <div className={styles.scroll}>
          <div className={styles.content}>{content(children)}</div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
