import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: Props) => {
  return (
    <div className={styles.search}>
      <Search size={18} />
      <input
        type="text"
        placeholder="Поиск"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}