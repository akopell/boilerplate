import React from 'react';
import { signUp } from '../store';
import { connect } from 'react-redux';

const LocalSignUpForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className='flex column'>
        <div className='flex column m1'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' className='input' />
        </div>
        <div className='flex column m1'>
          <label htmlFor='email'>Password</label>
          <input type='password' name='password' className='input' />
        </div>
        <div className='m1'>
          <button type='submit' className='btn bg-blue white p1 rounded'>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    async handleSubmit(evt) {
      evt.preventDefault();
      // trigger thunk (AJAX login request)
      const thunk = signUp({
        email: evt.target.email.value,
        password: evt.target.password.value,
      });
      await dispatch(thunk);
      // once that is complete, change the URL to /home
      ownProps.history.push('/home');
    },
  };
};

export default connect(null, mapDispatchToProps)(LocalSignUpForm);
