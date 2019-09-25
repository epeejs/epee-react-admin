import React from 'react';
import styles from './NewPage.module.scss';

interface NewPageProps {
  [key: string]: any;
}

export default function NewPage(props: NewPageProps) {
  return <div className={styles.wrap}>New Page</div>;
}
