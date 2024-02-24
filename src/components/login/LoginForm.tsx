import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//

const LoginForm = () => {
  const nav = useNavigate();
  const [userEmail, setUserEmail] = useState();
  const [password, setPassword] = useState();
  const loginHandeler = (e: any) => {
    e.preventDefault();
  };
  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h2>지금 바로 일정을 등록해 보세요!</h2>
        <form method="post" id="login-form" onSubmit={loginHandeler}>
          <input
            type="text"
            placeholder="이메일을 입력해 주세요"
            value={userEmail}
            onChange={(e: any) => {
              setUserEmail(e.target.value);
            }}
          ></input>
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
          ></input>
          <input type="submit" value="로그인"></input>
          <input
            type="button"
            value="회원가입"
            onClick={() => nav('/signUp')}
          ></input>
        </form>
        <hr className="hr-text" data-content="OR"></hr>
        <p id="sns-login-exp">sns로 간편 로그인하기</p>
      </div>
    </div>
  );
};
export default LoginForm;
