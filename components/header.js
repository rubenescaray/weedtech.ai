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
        width: 100%;
        height: 80px;
        background-color: rgb(34, 34, 34);
      }
      .w-container {
        margin-left: auto;
        margin-right: auto;
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