import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import { authenticate, deauthenticate } from '../redux/actions/authActions'

function Header(props) {
  const { tab, isLoggedIn } = props
  const router = useRouter();
  let token = null;

  const logout = () => {
    localStorage.removeItem('token');
    props.dispatch(deauthenticate())
  }

  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      token = localStorage.getItem('token');
      props.dispatch(authenticate(token))
    }
  })

  return (
    <div className="menu">
      <div className="w-container">
        <Link href="/">
          <a href="#" className="w-brand-nav">
            <img 
              src="/static/images/logo-light1x.png"
              alt="my image"
              width="60"
              height="60"
            />
          </a>
        </Link>
        <nav className="nav-menu">
          <Link href="/">
            <div className="nav-item">
              <a className="nav-link"
                style={{
                  color: tab == 0 ? 'rgb(0, 130, 243)' : 'rgb(183, 183, 183)',
                }}>
                Home
              </a>
            </div>
          </Link>
          <Link href="/hardware">
            <div className="nav-item">
              <a
                className="nav-link"
                style={{
                  color: tab == 1 ? 'rgb(0, 130, 243)' : 'rgb(183, 183, 183)',
                }}>
                Hardware
              </a>
            </div>
          </Link>
          <Link href="/pricing">
            <div className="nav-item">
            <a
                className="nav-link"
                style={{
                  color: tab == 2 ? 'rgb(0, 130, 243)' : 'rgb(183, 183, 183)',
                }}>
                Plans
              </a>
            </div>
          </Link>
        </nav>
        {!isLoggedIn && <div className="w-div-clearfix">
          <Link href="/signup">
            <div className="nav-item linkbox">
              <a
                className="nav-link"
                style={{
                  color: tab == 3 ? 'rgb(0, 130, 243)' : 'rgb(183, 183, 183)',
                }}>
                Signup
              </a>
            </div>
          </Link>
          <Link  href="/login">
            <div className="nav-item linkbox">
              <a
                className="nav-link"
                style={{
                  color: tab == 4 ? 'rgb(0, 130, 243)' : 'rgb(183, 183, 183)',
                }}>
                Login
              </a>
            </div>
          </Link>
        </div>}
        {isLoggedIn && <div className="w-div-clearfix">
          <Link>
            <div onClick={logout} className="nav-item linkbox">
              <a className="nav-link">
                Logout
              </a>
            </div>
          </Link>
          <Link href="/dashboard">
            <div className="nav-item linkbox">
              <a className="nav-link">
                Dashboard
              </a>
            </div>
          </Link>
        </div>}
        <div className="menu-wrap">
          <input type="checkbox" className="toggler" />
          <div className="hamburger"><div></div></div>
          <div className="menu" style={{backgroundColor: 'rgba(0,0,0,.5)'}}>
            <div>
              <div>
                <ul style={{flexDirection: 'column', display: 'flex'}}>
                  <li>
                    <Link href="/">
                      <a className="nav-link" style={{ color: tab == 0 ? 'rgb(0, 130, 243)' : 'rgb(183, 183, 183)' }}>
                        Home
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/hardware">
                      <a className="nav-link" style={{ color: tab == 1 ? 'rgb(0, 130, 243)' : 'rgb(183, 183, 183)' }}>
                        Hardware
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing">
                      <a className="nav-link" style={{ color: tab == 2 ? 'rgb(0, 130, 243)' : 'rgb(183, 183, 183)' }}>
                        Plans
                      </a>
                    </Link>
                  </li>
                  {!isLoggedIn && <li>
                    <Link href="/signup">
                      <a className="nav-link" style={{ color: tab == 3 ? 'rgb(0, 130, 243)' : 'rgb(183, 183, 183)' }}>
                        Signup
                      </a>
                    </Link></li>}
                  {!isLoggedIn && <li>
                    <Link  href="/login">
                      <a className="nav-link" style={{ color: tab == 4 ? 'rgb(0, 130, 243)' : 'rgb(183, 183, 183)' }}>
                        Login
                      </a>
                    </Link>
                  </li>}
                  {isLoggedIn && <li>
                    <Link>
                      <a onClick={logout} className="nav-link">
                        Logout
                      </a>
                    </Link>
                  </li>}
                  {isLoggedIn && <li>
                    <Link href="/dashboard">
                      <a className="nav-link">
                        Dashboard
                      </a>
                    </Link>
                  </li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
      .menu {
        position: fixed;
        z-index: 25;
        width: 100%;
        height: 80px;
        background-color: rgb(34, 34, 34);
      }
      .w-container {
        margin-left: auto;
        margin-right: auto;
        width: 100vw;
        max-width: 940px;
        display: block;
        height: 80px;
      }
      .w-brand-nav {
        margin-top: 10px;
        margin-right: 25px;
        position: relative;
        float: left;
        color: rgb(51, 51, 51);
        text-decoration: none;
      }
      .nav-menu {
        position: relative;
        z-index: auto;
        float: left;
        clear: none;
      }
      .nav-item {
        position: relative;
        display: inline-block;
        vertical-align: top;
        text-align: left;
        margin-left: auto;
        margin-right: auto;
        padding: 30px 20px;
        height: 20px;
      }
      .nav-item:hover {
        background-color: rgb(8,8,8);
        cursor: pointer;
      }
      .nav-link {
        margin-top: 10px;
        font-family: "Varela Round", sans-serif;
        color: rgb(183, 183, 183);
        font-size: 16px;
        font-weight: 400;
        text-decoration: none;
      }
      .w-div-clearfix {
        width: 350px;
        height: 80px;
        float: right;
      }
      .linkbox {
        float: right;
      }

      @media only screen and (min-width: 700px) {
        .menu-wrap * {
          display: none;
        }
      }

      @media only screen and (max-width: 600px) {
        .nav-item {
          display: none
        }

        .w-brand-nav {
          margin-left: 2em;
        }

        .menu-wrap {
          position: fixed;
          top: 0;
          right: 0;
          z-index: 1004;
        }
        .menu-wrap .toggler {
          position: absolute;
          top: 0;
          right: 0;
          z-index: 1005;
          cursor: pointer;
          width: 3em;
          height: 60px;
          margin-right: 2.5em;
          margin-top: .7em;
          opacity: 0;
        }
        .menu-wrap .hamburger {
          position: absolute;
          top: 0;
          right: 0;
          z-index: 1004;
          width: 2.5em;
          height: 60px;
          padding-right: 2em;
          padding-top: .7em;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .menu-wrap .hamburger > div {
          position: relative;
          flex: none;
          width: 100%;
          height: 2px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s ease;
        }
        /* Hamburger Lines - Top & Bottom */
        .menu-wrap .hamburger > div::before,
        .menu-wrap .hamburger > div::after {
          content: '';
          position: absolute;
          z-index: 1;
          top: -10px;
          width: 100%;
          height: 2px;
          background: inherit;
        }

        /* Moves Line Down */
        .menu-wrap .hamburger > div::after {
          top: 10px;
        }

        /* Toggler Animation */
        .menu-wrap .toggler:checked + .hamburger > div {
          transform: rotate(135deg);
        }

        /* Turns Lines Into X */
        .menu-wrap .toggler:checked + .hamburger > div:before,
        .menu-wrap .toggler:checked + .hamburger > div:after {
          top: 0;
          transform: rotate(90deg);
        }

        /* Rotate On Hover When Checked */
        .menu-wrap .toggler:checked:hover + .hamburger > div {
          transform: rotate(225deg);
        }

        /* Show Menu */
        .menu-wrap .toggler:checked ~ .menu {
          visibility: visible;
        }

        .menu-wrap .toggler:checked ~ .menu > div {
          transform: scale(1);
          transition-duration: .75s;
        }

        .menu-wrap .toggler:checked ~ .menu > div > div {
          opacity: 1;
          transition:  opacity 0.4s ease 0.4s;
        }

        .menu-wrap .menu {
          position: fixed;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          visibility: hidden;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .menu-wrap .menu > div {
          background: rgba(0, 0, 0, 0.4);
          border-radius: 50%;
          width: 200vw;
          height: 200vh;
          display: flex;
          flex: none;
          align-items: center;
          justify-content: center;
          transform: scale(0);
          transition: all 0.4s ease;
        }

        .menu-wrap .menu > div > div {
          text-align: center;
          max-width: 90vw;
          max-height: 100vh;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .menu-wrap .menu > div > div > ul > li {
          list-style: none;
          color: #fff;
          font-size: 1.5rem;
          padding: 1rem;
        }

        .menu-wrap .menu > div > div > ul > li > a {
          color: inherit;
          text-decoration: none;
          transition: color 0.4s ease;
          font-size: 1.5rem;
        }
      }
    `}</style>
    </div>
  )
}

const mapState = state => {
  return {
    isLoggedIn: state.auth.token != null,
  }
}

export default connect(mapState)(Header);