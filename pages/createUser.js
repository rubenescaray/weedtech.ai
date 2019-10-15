import React, { useState } from 'react'
import Layout from '../components/layout';
import Heading from '../components/heading';

function createUser() {
  return (
    <Layout title="Create User" hideFeatures>
      <div className="createUser">
        <Heading heading="Create New User" />
        <h2 className="heading-2">Generate New User</h2>
        <div className="form-box">
          <div className="w-form">
            <form action="/addUserPost" method="post" id="email-form" name="email-form" data-name="Email Form">
              <div className="field-col w-row">
                <div className="column-2 w-col w-col-4 w-col-small-small-stack">
                  <label for="name" className="field-label">Number of Users:</label>
                </div>
                <div className="w-col w-col-8 w-col-small-small-stack">
                  <input 
                    type="text" 
                    className="text-field w-input" 
                    maxlength="256" 
                    name="plantCount" 
                    data-name="plantCount" 
                    id="plantCount" 
                    required 
                  />
                </div>
              </div>
              <div className="field-col w-row">
                <div className="column-2 w-col w-col-4">
                  <label for="name-2" className="field-label">Name:</label>
                </div>
                <div className="w-col w-col-8">
                  <input 
                    type="text" 
                    className="text-field w-input" 
                    maxlength="256" 
                    name="strainName" 
                    data-name="strainName" 
                    id="strainName" 
                    required 
                  />
                </div>
              </div>
              <div className="field-col w-row">
                <div className="column-2 w-col w-col-4">
                  <label for="name-3" className="field-label">User Origin</label>
                </div>
                <div className="w-col w-col-8">
                  <input 
                    type="text" 
                    className="text-field w-input" 
                    maxlength="256" 
                    name="plantOrigin" 
                    data-name="plantOrigin" 
                    id="plantOrigin" 
                    required 
                  />
                </div>
              </div>
              <input 
                type="submit" 
                value="Get New IDs" 
                data-wait="Please wait..." 
                className="submit-button w-button"
              />
            </form>
            <div className="w-form-done">
              <div>Thank you! Your submission has been received!</div>
            </div>
            <div className="w-form-fail">
              <div>Oops! Something went wrong while submitting the form.</div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
      .createUser {

      }
      `}</style>
    </Layout>
  );
}

export default createUser