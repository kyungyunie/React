import styles from "../styles/FilterButtons.module.css"; // CSS 모듈을 가져와 스타일 적용

// 필터 버튼 컴포넌트 정의
const FilterButtons = ({ filter, setFilter }) => {
  return (
    <div className={styles.filterContainer}>
      {/* 전체 보기 버튼 */}
      <button
        className={`${styles.filterButton} ${styles.all}`} // 버튼 스타일 적용
        onClick={() => setFilter("all")} // 클릭 시 모든 할 일 표시
      >
        전체
      </button>

      {/* 진행중인 할 일만 표시하는 버튼 */}
      <button
        className={`${styles.filterButton} ${styles.active}`} // 버튼 스타일 적용
        onClick={() => setFilter("active")} // 클릭 시 진행 중인 할 일만 표시
      >
        진행중
      </button>

      {/* 완료된 할 일만 표시하는 버튼 */}
      <button
        className={`${styles.filterButton} ${styles.completed}`} // 버튼 스타일 적용
        onClick={() => setFilter("completed")} // 클릭 시 완료된 할 일만 표시
      >
        완료
      </button>
    </div>
  );
};

export default FilterButtons; // FilterButtons 컴포넌트 내보내기
