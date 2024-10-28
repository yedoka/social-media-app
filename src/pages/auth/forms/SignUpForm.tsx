
const SignUpForm = () => {

  return (
    <form className="signUpForm__container">
      <h2 className="signUpForm__title">Sign Up</h2>
        
      <label className="signUpForm__label">Email</label>
      <input
        type="email"
        name="email"
        className="signUpForm__input"
        placeholder="Enter your email"
        required
      />

      <label className="signUpForm__label">Password</label>
      <input
        type="password"
        name="password"
        className="signUpForm__input"
        placeholder="Enter your password"
        required
      />

      <button type="submit" className="signUpForm__button">
          Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
