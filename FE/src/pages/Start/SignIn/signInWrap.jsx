import "./signInWrap.css";

function SignInWrap({
  showSignInModal,
  showSignUpModal,
  signInModal,
  signUpModal,
}) {
  return (
    <div
      className="SIModalWrap"
      onMouseDown={() => {
        if (signInModal === true) {
          showSignInModal();
        } else if (signUpModal === true) {
          showSignUpModal();
        }
      }}
    >
      나와라
    </div>
  );
}

export default SignInWrap;
