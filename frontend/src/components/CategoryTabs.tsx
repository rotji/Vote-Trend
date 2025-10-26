import React from 'react';
import styles from '../styles/components/navbar.module.css';

const categories = [
  'All',
  'Sports',
  'Politics',
  'Entertainment',
  'Health',
  'Tech',
  'Education',
  'Others',
];

interface CategoryTabsProps {
  activeCategory: string;
  onSelect: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeCategory, onSelect }) => {
  return (
    <div className={styles.categoryTabs}>
      {categories.map((cat) => (
        <button
          key={cat}
          className={cat === activeCategory ? styles.activeTab : styles.tab}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
