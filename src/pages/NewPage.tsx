import { Button } from 'antd';
import classNames from 'classnames';
import _ from 'lodash';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { useEffectOnce } from 'react-use';
import { useUpdateTime } from 'src/hooks/useUpdateTime';
import styles from './NewPage.module.scss';

interface NewPageProps {
  [key: string]: any;
}

let top = 0;
const loadDate = moment();

export default function NewPage(props: NewPageProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffectOnce(() => {
    if (ref.current) {
      ref.current.scrollTop = top;
    }

    return () => {
      if (ref.current) {
        top = ref.current.scrollTop;
      }
    };
  });
  useUpdateTime();

  return (
    <div className={styles.wrap} ref={ref}>
      <Button
        onClick={() => {
          setHidden(value => !value);
        }}
      >
        显示/隐藏
      </Button>
      <p className={classNames([styles.tip, hidden && styles.hidden])}>
        距上次更新时间：{loadDate.fromNow()}
      </p>
      <ul>
        {_.range(200).map(v => (
          <li key={v}>{v}</li>
        ))}
      </ul>
    </div>
  );
}
