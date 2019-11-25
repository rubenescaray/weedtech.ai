import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Layout from '../components/layout'
import ReactLoading from "react-loading"
import Link from 'next/link'
import Heading from '../components/heading'
import httpClient from '../config'

function Profile({ auth }) {
  const [loading, setLoading] = useState(true)
  const [submit, setSubmit] = useState(false)
  const [profile, setProfile] = useState([{}])

  useEffect(() => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token');
    
    const fetchData = async () => {
      await httpClient.get(`editProfile/${user_token}`)
        .then(res => {
          setProfile(res.data)
          setLoading(false)
        })
        .catch(error => {
          console.log(error)
        })
    }

    setTimeout(fetchData(), 1000)
  }, []);

  const submitProfile = () => {
    setSubmit(true)
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token')
    let params = new URLSearchParams()
    
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    params.append('userID', profile.userID)
    params.append('emailAddress', profile.emailAddress)
    params.append('firstName', profile.firstName)
    params.append('lastName', profile.lastName)
    params.append('ommaid', profile.ommaid)
    params.append('password', profile.password)
    
    httpClient.post(`editProfile/${user_token}`, params)
      .then(res => {
        console.log(res)
        setSubmit(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  if (loading) {
    return (
      <Layout title={'Edit Profile'}>
        <Heading heading="Edit Profile" />
        <div className="profile">
          <h2 style={{marginBottom: '2em'}} className="heading-2">Edit Profile</h2>
          <div className="loading-div">
            <ReactLoading type={'spin'} color={'#478978'} />
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title={'Edit Profile'}>
      <Heading heading="Edit Profile" />
      <div className="profile">
        <h2 style={{marginBottom: '2em'}} className="heading-2">Edit Profile</h2>
        <div className="panel-group">
          <div className="panel panel-default">
            <div className="panel-heading">First Name</div>
            <div className="panel-body">
              <input
                type="text"
                onChange={(e) => {
                  let newProfile = Object.assign({}, profile, {
                    firstName: e.target.value
                  })
                  setProfile(newProfile)
                }}
                value={profile.firstName}
                className="text-field w-input fit-content" 
                maxlength="256"
              />
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">Last Name</div>
            <div className="panel-body">
              <input
                type="text"
                onChange={(e) => {
                  let newProfile = Object.assign({}, profile, {
                    lastName: e.target.value
                  })
                  setProfile(newProfile)
                }}
                value={profile.lastName}
                className="text-field w-input fit-content" 
                maxlength="256"
              />
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">Email Address (Login)</div>
            <div className="panel-body">
              <input
                type="text"
                onChange={(e) => {
                  let newProfile = Object.assign({}, profile, {
                    emailAddress: e.target.value
                  })
                  setProfile(newProfile)
                }}
                value={profile.emailAddress}
                className="text-field w-input fit-content" 
                maxlength="256"
              />
            </div>
          </div>
          <div className="panel panel-primary">
            <div className="panel-heading">Password</div>
            <div className="panel-body">
              <input
                type="password"
                onChange={(e) => {
                  let newProfile = Object.assign({}, profile, {
                    password: e.target.value
                  })
                  setProfile(newProfile)
                }}
                value={profile.password}
                className="text-field w-input fit-content" 
                maxlength="256"
              />
            </div>
          </div>
          <div className="panel panel-primary">
            <div className="panel-heading">OMMA ID</div>
            <div className="panel-body">
              <input
                type="text"
                onChange={(e) => {
                  let newProfile = Object.assign({}, profile, {
                    ommaid: e.target.value
                  })
                  setProfile(newProfile)
                }}
                value={profile.ommaid}
                className="text-field w-input fit-content" 
                maxlength="256"
              />
            </div>
          </div>
        </div>
        <input
          type="submit"
          onClick={submitProfile}
          value="Save" 
          data-wait="Please wait..." 
          className="submit-button w-button"
        />
      </div>
      <style jsx>{`
      .profile {

      }
      .panel-group {
        margin-bottom: 1em;
      }
      .panel {
        margin-bottom: 1em;
        background-color: #fff;
        border: 1px solid transparent;
        border-radius: 4px;
        -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
        box-shadow: 0 1px 1px rgba(0,0,0,.05);
      }
      .panel-default {
        border-color: #ddd;
      }
      .panel-group .panel {
        margin-bottom: 0.5em;
        border-radius: 4px;
      }
      .panel-heading {
        padding: 0.5em 0.7em;
        border-bottom: 1px solid transparent;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
      }
      .panel-group .panel-heading {
        border-bottom: 0;
      }
      .panel-default>.panel-heading {
        color: #333;
        background-color: #f5f5f5;
        border-color: #ddd;
      }
      .panel-body {
        padding: 0.7em;
      }
      .panel-primary {
        border-color: rgba(68, 132, 115, 0.5);
      }
      .panel-group .panel+.panel {
        margin-top: 0.3em;
      }
      .panel-primary>.panel-heading {
        color: #fff;
        background-color: rgba(68, 132, 115, 0.5);
        border-color: rgba(68, 132, 115, 0.5);
      }
      .submit-button {
        margin-right: 0;
        margin-left: 0;
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

export default connect(mapState)(Profile);