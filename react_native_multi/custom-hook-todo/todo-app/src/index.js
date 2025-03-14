// React 및 ReactDOM 라이브러리 가져오기
import React from "react";
import ReactDOM from "react-dom/client";

// App 컴포넌트 가져오기
import App from "./App";

// React 애플리케이션을 렌더링할 루트 요소를 선택하여 root 객체 생성
const root = ReactDOM.createRoot(document.getElementById("root"));

// React 애플리케이션 렌더링
root.render(
  // StrictMode는 개발 중 잠재적인 문제를 감지하는 도구로, 실제 동작에는 영향을 주지 않음
  <React.StrictMode>
    <App /> {/* 최상위 App 컴포넌트 렌더링 */}
  </React.StrictMode>
);
