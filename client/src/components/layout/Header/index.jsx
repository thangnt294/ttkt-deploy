import React, {useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom';

import './index.scss';
import {AuthContext, HomeContext, MemberContext, ModalContext} from 'contexts';
import {DeleteConfirmation, Dropdown, Sidebar, UserDropdown} from 'components';
import {homeLinks, removeAll, userOptions,} from 'utils';
import {ACTIVE_SHIPMENTS_URL, LOGIN_URL} from 'actions';
import bg from 'assets/images/authentication-bg.png';
import avatar from 'assets/images/avatar.png';

export const Header = () => {
  const history = useHistory();
  // const { userInfo, setUserInfo, setLoggedInUser } = useContext(AuthContext);
  const {userInfo} = useContext(AuthContext);
  const {signOut, setSignOut, setNoResultSearch} = useContext(ModalContext);
  const {
    setSeachParamActive,
    setIsSearchingShipment,
    setIdTemplate,
    searchTerm,
    setSearchTerm
  } = useContext(HomeContext);
  const {doGetMember} = useContext(MemberContext);

  const onInput = (searchValue) => {
    setSeachParamActive(searchValue);
    history.push(ACTIVE_SHIPMENTS_URL);
  }

  const handleChangeRoute = option => {
    if (option.key === 3) {
      const {_id} = userInfo;
      doGetMember(_id);
    }
    if (option.key === 5) {
      setSignOut(true);
    } else if (option.key === 6) {
      // setUserInfo(null);
      // setLoggedInUser(null);

      removeAll();
      if (window) window.location = '/';
      else if (option.path) {
        history.push(option.path);
      }
    } else {
      if (option.path) history.push(option.path);
    }
  }

  return (
    <div className="tr__header--wrapper">
      <div className="tr__header">
        <div className="tr__header--logo text-center">
          <NavLink to="/teams">
            <img src={bg} alt="Logo here" />
          </NavLink>
        </div>
        <div className="tr__header--menu">
          <Sidebar
            links={homeLinks}
            setIsSearchingShipment={setIsSearchingShipment}
            setSearchTerm={setSearchTerm}
            setSeachParamActive={setSeachParamActive}
            setIdTemplate={setIdTemplate}
            setNoResultSearch={setNoResultSearch}
          />
        </div>
        <div className="tr__header--user d-flex">
          <Dropdown
            mode="icon"
            options={userOptions}
            dropdownPosition="right"
            onChange={handleChangeRoute}
            render={(options, onChange) => <UserDropdown
              options={options}
              onChange={onChange}
              onOrgSelect={org => console.log(org)}
            />
            }
          >
            {userInfo && (
              <>
                <img src={userInfo.avatar || avatar} alt="Avatar"/>
                <p>{userInfo.name}</p>
              </>
            )}
            <i className="icon-chevron-down"/>
          </Dropdown>

        </div>
      </div>

      <DeleteConfirmation
        open={signOut}
        onCancel={() => setSignOut(false)}
        onSubmit={() => handleChangeRoute({
          key: 6,
          path: LOGIN_URL
        })}
        title="Sign Out"
        message={`Are you sure you want to sign out?`}
      />
    </div>
  );
};
