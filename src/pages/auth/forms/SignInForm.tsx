
const SignInForm = () => {

  return (
    <div className="signInForm">
      <form className="signInForm__container">
        <h2 className="signInForm__title">Sign In</h2>

        <label className="signInForm__label">Email</label>
        <input
          type="email"
          name="email"
          className="signInForm__input"
          placeholder="Enter your email"
          required
        />

        <label className="signInForm__label">Password</label>
        <input
          type="password"
          name="password"
          className="signInForm__input"
          placeholder="Enter your password"
          required
        />

        <button type="submit" className="signInForm__button">
          Sign In
        </button>

      </form>
    </div>
  );
};

export default SignInForm;
