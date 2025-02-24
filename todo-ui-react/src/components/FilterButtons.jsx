import styles from "../styles/FilterButtons.module.css";

const FilterButtons = ({ filter, setFilter }) => {
  return (
    <div className={styles.filterContainer}>
      <button
        className={`${styles.filterButton} ${styles.all}`}
        onClick={() => setFilter("all")}
      >
        전체
      </button>
      <button
        className={`${styles.filterButton} ${styles.active}`}
        onClick={() => setFilter("active")}
      >
        진행중
      </button>
      <button
        className={`${styles.filterButton} ${styles.completed}`}
        onClick={() => setFilter("completed")}
      >
        완료
      </button>
    </div>
  );
};

export default FilterButtons;
