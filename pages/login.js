import React, { useState } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import httpClient  from '../config'
import { authenticate } from '../redux/actions/authActions'

function Login(props) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signin = async () => {
    console.log(email)
    console.log(password)
    event.preventDefault();
    await httpClient.get(`/login/${email}/${password}`)
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.token)
        props.dispatch(authenticate(res.data.token))
        Router.push('/dashboard')
      })
      .catch(error => {
        alert(error)
      })
  }

  return (
    <Layout title="Login" tab={4}>
      <h2 className="heading-2">Customer Login</h2>
      <div className="form-box">
        <div className="w-form">
          <form id="email-form" name="email-form" data-name="Email Form" action="/login" method="post">
            <div style={{display: 'flex'}} className="field-col w-row">
              <div className="column-2 w-col w-col-4">
                <label className="field-label">Email Address:</label>
              </div>
              <div className="w-col w-col-8">
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)} 
                  className="text-field w-input" 
                  maxLength="256"
                  name="username"
                  required 
                />
              </div>
            </div>
            <div style={{display: 'flex'}} className="field-col w-row">
              <div className="column-2 w-col w-col-4">
                <label className="field-label">Password:</label>
              </div>
              <div className="w-col w-col-8">
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  className="text-field w-input"
                  maxLength="256"
                  name="password"
                  data-name="password"
                  id="password" 
                  required 
                />
              </div>
            </div>
              <input
                onClick={(event) => {
                    event.preventDefault()
                    signin()
                  }}
                type="submit" 
                value="Login" 
                data-wait="Please wait..." 
                className="submit-button w-button" 
              />
          </form>
        </div>
      </div>
      <style jsx>{`
        .content-section {
          font-size: 18px;
        }
        .content-blox {
          width: 70%;
          margin-right: auto;
          margin-bottom: 50px;
          margin-left: auto;
          padding-top: 50px;
          padding-bottom: 50px;
        }
        h2 {
          font-size: 32px;
          line-height: 36px;
          margin-top: 20px;
        }
      .heading-2 {
        font-family: Montserrat, sans-serif;
        color: #478978;
        font-weight: 600;
        text-align: center;
      }
      .form-box {
        width: 80%;
        margin: 50px auto;
        padding: 50px 25px;
        background-color: #f9f9f9;
      }
      .w-form {
        margin: 0 0 15px;
      }
      .field-col {
        width: 80%;
        margin-right: auto;
        margin-left: auto;
      }
      .w-row {
        content: " ";
        display: table;
        grid-column-start: 1;
        grid-row-start: 1;
        grid-column-end: 2;
        grid-row-end: 2;
      }
      .w-col {
        position: relative;
        float: left;
        width: 100%;
        min-height: 1px;
        padding-left: 10px;
        padding-right: 10px;
      }
      .w-col-4 {
        width: 33.33333333%;
      }
      .column-2 {
        display: flex;
        height: 37px;
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: flex-end;
        -webkit-box-align: center;
        align-items: center;
      }
      label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }
      .field-label {
        display: flex;
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: flex-end;
        -webkit-box-align: end;
        align-items: flex-end;
        font-family: Montserrat, sans-serif;
        font-size: 17px;
        font-weight: 500;
      }
      .w-col-8 {
        width: 66.66666667%;
      }
      .w-button {
        display: inline-block;
        padding: 9px 15px;
        background-color: #3898EC;
        color: white;
        border: 0;
        line-height: inherit;
        text-decoration: none;
        cursor: pointer;
        border-radius: 0;
      }
      .submit-button {
        display: block;
        width: 300px;
        height: 45px;
        margin-top: 35px;
        margin-right: auto;
        margin-left: auto;
        border-radius: 7.5px;
        background-color: #478978;
        font-family: Montserrat, sans-serif;
        font-size: 22px;
        font-weight: 500;
        text-transform: uppercase;
      }
      .w-input, .w-select {
        display: block;
        width: 100%;
        height: 25px;
        padding: 8px 12px;
        margin-bottom: 10px;
        font-size: 14px;
        line-height: 1.428571429;
        color: #333333;
        vertical-align: middle;
        background-color: #ffffff;
        border: 1px solid #cccccc;
      }
      .text-field {
        width: 350px;
      }
      `}</style>
    </Layout>
  )
}

const mapState = state => {
  return {
    auth: state.auth,
  }
}

export default connect(mapState)(Login);