// FilterButtons 컴포넌트에서 스타일을 가져옴
import styles from "../styles/FilterButtons.module.css";

// 필터 버튼을 렌더링하는 컴포넌트
// filter: 현재 선택된 필터 상태값
// setFilter: 필터 상태를 변경하는 함수
const FilterButtons = ({ filter, setFilter }) => {
  return (
    // 필터 버튼을 감싸는 컨테이너
    <div className={styles.filterContainer}>
      {/* 전체 보기 버튼 */}
      <button
        className={`${styles.filterButton} ${styles.all}`} // 스타일 적용
        onClick={() => setFilter("all")} // 클릭 시 필터를 "all"로 변경
      >
        전체
      </button>

      {/* 진행중 버튼 */}
      <button
        className={`${styles.filterButton} ${styles.active}`} // 스타일 적용
        onClick={() => setFilter("active")} // 클릭 시 필터를 "active"로 변경
      >
        진행중
      </button>

      {/* 완료 버튼 */}
      <button
        className={`${styles.filterButton} ${styles.completed}`} // 스타일 적용
        onClick={() => setFilter("completed")} // 클릭 시 필터를 "completed"로 변경
      >
        완료
      </button>
    </div>
  );
};

// FilterButtons 컴포넌트를 외부에서 사용할 수 있도록 내보내기
export default FilterButtons;
