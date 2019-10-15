import React, { useState } from 'react'
import Layout from '../components/layout'
import Link from 'next/link'
import Heading from '../components/heading'

function Profile() {
  return (
    <Layout title={'Edit Profile'}>
      <Heading heading="Edit Profile" />
      <div className="profile">
        <h2 style={{marginBottom: '55px'}} className="heading-2">Edit Profile</h2>
        <div className="panel-group">
          <div className="panel panel-default">
            <div className="panel-heading">First Name</div>
            <div className="panel-body">
              <input type="text" id="firstName" value="Ruben" required="" autocomplete="off" />
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">Last Name</div>
            <div className="panel-body">
              <input type="text" id="lastName" value="Escaray" required="" autocomplete="off" />
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">Email Address (Login)</div>
            <div className="panel-body">
              <input type="text" id="emailAddress" value="escarayruben@gmail.com" required="" autocomplete="off" />
            </div>
          </div>
          <div className="panel panel-primary">
            <div className="panel-heading">Password</div>
            <div className="panel-body">
              <input type="password" id="password" value="ruben123" required="" autocomplete="off" />
            </div>
          </div>
          <div className="panel panel-primary">
            <div className="panel-heading">OMMA ID</div>
            <div className="panel-body">
              <input type="text" id="ommaid" value="25339519" required="" autocomplete="off" />
            </div>
          </div>
        </div>
        <input
          type="submit" 
          value="Submit" 
          data-wait="Please wait..." 
          className="submit-button w-button"
        />
      </div>
      <style jsx>{`
      .profile {

      }
      .panel-group {
        margin-bottom: 20px;
      }
      .panel {
        margin-bottom: 20px;
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
        margin-bottom: 10px;
        border-radius: 4px;
      }
      .panel-heading {
        padding: 10px 15px;
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
        padding: 15px;
      }
      .panel-primary {
        border-color: rgba(68, 132, 115, 0.5);
      }
      .panel-group .panel+.panel {
        margin-top: 5px;
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

export default Profile;