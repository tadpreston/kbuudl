import { Menu, Container, Image, Icon, Dropdown } from 'semantic-ui-react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { handleLogout } from "../../utils/auth";

function Header({ user }) {
  const router = useRouter();

  function isActive(route) {
    return route === router.pathname
  }

  return (
    <Menu stackable fluid id="menu" inverted>
      <Container text>
        <Link href="/">
          <Menu.Item header active={isActive('/')}>
            <Image
              size="mini"
              src="logo.svg"
              style={{ marginRight: '1em' }}
            />
            Kbuudl
          </Menu.Item>
        </Link>

        <Link href="/about">
          <Menu.Item header active={isActive('/about')}>
            <Icon
              name="globe"
              size="large"
            />
            About
          </Menu.Item>
        </Link>

        { user ?  (<>
          <Dropdown item text={user.name}>
            <Dropdown.Menu>
              <Link href="/user">
                <Dropdown.Item header>
                  <Icon
                    name="user"
                    size="large"
                  />
                  Profile
                </Dropdown.Item>
              </Link>
              <Link href="/organization">
                <Dropdown.Item header>
                  <Icon
                    name="globe"
                    size="large"
                  />
                  Organization
                </Dropdown.Item>
              </Link>
              <Dropdown.Item onClick={handleLogout} header>
                <Icon
                  name="sign out"
                  size="large"
                />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>) :
        (<>
          <Link href="/login">
            <Menu.Item header active={isActive('/login')}>
              <Icon
                name="sign in"
                size="large"
              />
              Login
            </Menu.Item>
          </Link>

          <Link href="/signup">
            <Menu.Item header active={isActive('/signup')}>
              <Icon
                name="signup"
                size="large"
              />
              Sign Up
            </Menu.Item>
          </Link>
        </>)}
      </Container>
    </Menu>
  )
}

export default Header
