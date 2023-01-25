import { useDispatch, useSelector } from "react-redux"; // useSeletor: useState와 같은 값 변경 메서드
import { increaseCnt, decreaseCnt } from "../../reducer/counter";

// const [value, setValue] = useState(0);

const Counter = () => {
  // dispatch를 사용하기 위한 준비
  const dispatch = useDispatch();

  // store에 접근하여 state 가져오기
  const { count } = useSelector((state) => state.counter);

  const increase = () => {
    // store에 있는 state를 바꾸는 함수 실행
    dispatch(increaseCnt());
  };
  const decrease = () => {
    // store에 있는 state를 바꾸는 함수 실행
    dispatch(decreaseCnt());
  };

  return (
    <div>
      {count}
      <button onClick={increase}>증가</button>
      <button onClick={decrease}>감소</button>
    </div>
  );
};

export default Counter;

/**
    redux의 함수는 무조건 동기적으로 데이터가 흘러갑니다.
    그러나 웹은 언제나 비동기로 사용자 경험을 높이는 것이 중요합니다.
    그래서 나온것이 redux-saga입니다.
    redux을 사용하면서 redux-saga도 동시에 사용함으로 비동기의 유연함도 같이 가져갈 수 있습니다.
    다음 포스팅에서 redux-saga (opens new window)에 대해 알아보겠습니다.
 */
