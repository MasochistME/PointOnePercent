import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showLoginModal, logOutUser } from '../../store/modules/Login';
import { changeTab } from '../../store/modules/Tabs';
import login_button from '../../../shared/images/steam_login.png';

export default function Login(): JSX.Element {
  const dispatch = useDispatch();
  const logged = useSelector((state: any) => state.logged);
  const username = useSelector((state: any) => state.username);

  const showLogin = (): void => {
    dispatch(showLoginModal());
  };
  const showProfile = (): void => {
    logged ? dispatch(changeTab('profile')) : alert('You are not logged in!');
  };
  const logOut = () => dispatch(logOutUser());

  return (
    <div>
      {!logged ? (
        <img
          className="button"
          src={login_button}
          alt="Login via Steam"
          onClick={showLogin}></img>
      ) : (
        <div className="flex-row">
          <div
            className="button flex-row"
            style={{ borderLeft: 'none' }}
            onClick={showProfile}>
            <p>{username}</p>
          </div>
          <div className="button flex-row" onClick={logOut}>
            <p>Log out</p>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      )}
    </div>
  );
}
