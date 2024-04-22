import { FC } from "react";

import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: FC = () => {
  return (
    <div className={styles.root}>
      <span>😕</span>
      <br />
      <h1>Ничего не найдено</h1>
      <p>К сожалению данная страница отсуствует.</p>
    </div>
  );
};

export default NotFoundBlock;
