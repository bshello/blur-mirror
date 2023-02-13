import { useEffect } from "react";

export const useCustomHook = () => {
  useEffect(() => {
    alert("렌더링!");
  }, []);
};
/**
 * useEffect를 사용하여 페이지가 처음 렌더링되었을 때, alert를 띄우는 커스텀 훅이다.
 * 이 커스텀 훅을 통하여, 서로 다른 페이지에 동일하게 최초 렌더링 시 같은 함수를 실행할 수 있다.
 * 커스텀 훅이 반환하는 값은 없을 수도 있다.
 */
