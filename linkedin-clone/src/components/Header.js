import { connect } from 'react-redux';
import styled from 'styled-components';
import { signOutAPI } from '../actions';

const Header = (props) => {
  return (
    <Container>
      <Content>
        <Logo>
          <a href='/home'>
            <img src='/images/home-logo.svg' alt='Header Logo' />
          </a>
        </Logo>
        <Search>
          <div>
            <input type='text' placeholder='Search' />
          </div>
          <SearchIcon>
            <img src='/images/search-icon.svg' alt='SearchIcon' />
          </SearchIcon>
        </Search>
        <Nav>
          <NavListWrap>
            <NavList className='active'>
              <a>
                <img src='/images/nav-home.svg' alt='icon' />
                <span>Home</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src='/images/nav-network.svg' alt='icon' />
                <span>My Network</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src='/images/nav-jobs.svg' alt='icon' />
                <span>Jobs</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src='/images/nav-messaging.svg' alt='icon' />
                <span>Messaging</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src='/images/nav-notifications.svg' alt='icon' />
                <span>Notifications</span>
              </a>
            </NavList>

            <User>
              <a>
                {props.user && props.user.photoURL ? (
                  <img src={props.user.photoURL} alt='user' />
                ) : (
                  <img src='/images/user.svg' alt='user' />
                )}
                <span>
                  Me
                  <img src='images/down-icon.svg' alt='icon' />
                </span>
              </a>

              <SignOut onClick={() => props.signOut()}>
                <a>Sign Out</a>
              </SignOut>
            </User>

            <Work>
              <a>
                <img src='/images/nav-work.svg' alt='icon' />
                <span>
                  Work
                  <img src='/images/down-icon.svg' alt='icon' />
                </span>
              </a>
            </Work>
          </NavListWrap>
        </Nav>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 80px;
  width: 100vw;

  z-index: 100;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-right: 220px;
  min-height: 100%;
  max-width: 960px;
`;

const Logo = styled.span`
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  margin-top: 5px;
  font-size: 50px;
`;

const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;

  & > div {
    max-width: 280px;

    & > input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
    }
  }
`;

const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Nav = styled.nav`
  margin-left: auto;
  display: block;

  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;
  }
`;

const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;

  .active {
    span:after {
      content: '';
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
    }
  }
`;

const NavList = styled.li`
  display: flex;
  align-items: center;

  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 52px;
    min-width: 80px;
    position: relative;
    text-decoration: none;
    cursor: pointer;

    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
    }
    @media (max-width: 768px) {
      min-width: 70px;
    }
  }

  &:hover,
  &:active {
    a {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
`;

const SignOut = styled.div`
  position: absolute;
  top: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0 0 5px 5px;
  width: 100px;
  height: 40px;
  font-size: 16px;
  transition-duration: 167ms;
  text-align: center;
  display: none;
  cursor: pointer;
  z-index: 100;
`;

const User = styled(NavList)`
  cursor: pointer;
  a > svg {
    width: 24px;
    border-radius: 50%;
  }

  a > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  span {
    display: flex;
    align-items: center;
  }

  &:hover {
    ${SignOut} {
      align-items: center;
      display: flex;
      justify-content: center;
      background-color: #0a66c2;
      color: white;
      border-radius: 5px;
    }
  }

  @media (max-width: 768px) {
    span {
      visibility: hidden;
    }
    a > img {
      width: 30px;
      height: 30px;
      margin-top: 15px;
    }

    ${SignOut} {
      position: absolute;
      top: -25px;
      right: 20px;
      border-radius: 5px;
      &:hover {
        background-color: #0a66c2;
      }
    }
  }
`;

const Work = styled(User)`
  cursor: pointer;
  border-left: 1px solid rgba(0, 0, 0, 0.08);
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
