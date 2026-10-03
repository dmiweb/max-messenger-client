import styles from './ChatAvatar.module.css';

interface Props {
  name: string;
}

export const ChatAvatar = ({ name }: Props) => {
  return <div className={styles.avatar}>{name.slice(0, 2)}</div>;
}