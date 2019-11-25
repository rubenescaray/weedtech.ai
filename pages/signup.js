import React, { useState } from 'react'
import { connect } from 'react-redux'
import ReactLoading from "react-loading"
import FormMessage from '../components/formMessage'
import Layout from '../components/layout'
import httpClient from '../config'
import { shootMessage } from '../redux/actions/messageActions';

function SignUp({ dispatch }) {
  const [loading, setLoading] = useState();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [ommaId, setOmmaId] = useState('')

  const signupUser = (e) => {
    setLoading(true)
    var re = /\S+@\S+\.\S+/;
    let params = new URLSearchParams()
  
    e.preventDefault()

    if (firstName == '' || lastName == '' || email == ''  || password == '' || ommaId == '') {
      setLoading(false)
      return shootMessage(dispatch, 'Please, fill all the required fields', 'default', 4000)
    }

    if (password != password2) {
      setLoading(false)
      return shootMessage(dispatch, 'Please, confirm your password correctly', 'fail', 4000)
    }

    if (!re.test(String(email).toLowerCase())) {
      setLoading(false)
      return shootMessage(dispatch, 'Please, use a valid email', 'fail', 4000)
    }

    params.append('email', email)
    params.append('firstName', firstName)
    params.append('lastName', lastName)
    params.append('ommaid', ommaId)
    params.append('password', password)

    httpClient.post(`signup`, params)
      .then(res => {
        const { data } = res
        setLoading(false)
        if (data.result == 'account exists') {
          return shootMessage(dispatch, 'Email is already in use', 'fail', 4000)
        } else if (data.result == 'success') {
          setTimeout(() => {
            shootMessage(dispatch, 'Please, contact us to continue the subscription process!', 'default', 5000)
          }, 2100)
          return shootMessage(dispatch, 'Account created succesfully!', 'success', 2000)
        }
        console.log(res)
      })
      .catch(e => {
        setLoading(false)
        console.log(e)
      })
  }

  return (
    <Layout title="Sign up" tab={3}>
        <h2 className="heading-2">Signup for our Seed-to-Sale Service</h2>
        <div className="sub-text centered">It's just $79 per month</div>
        <div className="form-box">
          <div className="w-form">
            <form id="email-form" name="email-form" data-name="Email Form">
              <div className="field-col w-row">
                <div className="column-2 w-col w-col-4 w-col-small-small-stack">
                  <label for="name" className="field-label">
                    First Name:
                  </label>
                </div>
                <div className="w-col w-col-8 w-col-small-small-stack">
                  <input
                    onChange={(event) => setFirstName(event.target.value)}
                    type="text" 
                    className="text-field w-input" 
                    maxlength="256"
                  />
                </div>
              </div>
              <div className="field-col w-row">
                <div className="column-2 w-col w-col-4">
                  <label for="name-2" className="field-label">
                    Last Name:
                  </label>
                </div>
                <div className="w-col w-col-8">
                  <input
                    onChange={(event) => setLastName(event.target.value)}
                    type="text" 
                    className="text-field w-input" 
                    maxlength="256" 
                  />
                </div>
              </div>
              <div className="field-col w-row">
                <div className="column-2 w-col w-col-4">
                  <label for="name-3" className="field-label">
                    Email Address:
                  </label>
                </div>
                <div className="w-col w-col-8">
                  <input
                    onChange={(event) => setEmail(event.target.value)}
                    type="email" 
                    className="text-field w-input" 
                    maxlength="256"
                  />
                </div>
              </div>
              <div className="field-col w-row">
                <div className="column-2 w-col w-col-4">
                  <label for="name-3" className="field-label">
                    Password:
                  </label>
                </div>
                <div className="w-col w-col-8">
                  <input
                    onChange={(event) => setPassword(event.target.value)}
                    type="password" 
                    className="text-field w-input" 
                    maxlength="256"
                    id="password"
                  />
                </div>
              </div>
              <div className="field-col w-row">
                <div className="column-2 w-col w-col-4">
                  <label for="name-3" className="field-label">
                    Confirm Password:
                  </label>
                </div>
                <div className="w-col w-col-8">
                  <input
                    onChange={(event) => setPassword2(event.target.value)}
                    type="password" 
                    className="text-field w-input" 
                    maxlength="256"
                    id="confirm_password"
                  />
                </div>
              </div>
              <div className="field-col w-row">
                <div className="column-2 w-col w-col-4">
                  <label for="name-3" className="field-label">
                    OMMA&nbsp;ID:
                  </label>
                </div>
                <div className="w-col w-col-8">
                  <input
                    onChange={(event) => setOmmaId(event.target.value)}
                    type="text" 
                    className="text-field w-input" 
                    maxlength="256"
                    id="omma_id"
                  />
                </div>
              </div>
              <div
                type="submit"
                onClick={signupUser}
                className="submit-button w-button"
              >{!loading ? <div>Submit</div> : <ReactLoading type={'spin'} color={'#fff'} height={25} width={25} />}</div>
            </form>
            <FormMessage />
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
      .sub-text {
        margin-top: 50px;
        font-family: Montserrat, sans-serif;
        color: #000;
        font-size: 20px;
        line-height: 31px;
        text-align: left;
      }
      .sub-text.centered {
        margin-top: 25px;
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
        display: flex;
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
        display: flex;
        width: 300px;
        height: fit-content;
        margin-top: 15px;
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
      .w-form-done {
        display: none;
        padding: 20px;
        text-align: center;
        background-color: #dddddd;  
      }
      .w-form-fail {
        display: none;
        margin-top: 10px;
        padding: 10px;
        background-color: #ffdede;
      }
      `}</style>
    </Layout>
  )
}

const mapState = state => {
  return {
    ...state
  }
}

export default connect(mapState)(SignUp)