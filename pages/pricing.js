import { useState } from 'react'
import Layout from '../components/layout'

function Pricing() {
  return (
    <Layout title="Plans" tab={2}>
      <h2 className="heading-2">Plan Pricing</h2>
      <div className="subscriptions">
        <div className="plan">
          <div>
            <h3 style={{textAlign: 'center', fontWeight: '400'}}>Basic Subscription</h3>
            <h3 style={{textAlign: 'center'}}>$79 per month</h3>
            <p className="plan-desc">
              Access to software and technical support. <br/>
              This includes (but is not limited to) the following improvements that are not yet operational:
            </p>
          </div>
          <hr style={{marginTop:'58px'}} />
          <div>
            <p className="plan-desc">
              -Mobile and Desktop Apps <br />
              -Tracking Statistics <br />
              -OMMA ID Lookup Tool <br />
              -Easy Printing of Labels, Directly From Our Site <br />
              -Test Mode <br />
            </p>
            <a href="/signup" className="button w-button">
              SIGNUP
            </a>
          </div>
        </div>
        <div className="plan">
        <div>
            <h3 style={{textAlign: 'center', fontWeight: '400'}}>Yearly Subscription</h3>
            <h3 style={{textAlign: 'center'}}>$849 per year</h3>
            <p className="plan-desc">
            Includes everything included in the Basic Subscription for a lower overall cost. <br />
            Access to software and technical support. <br />
            This includes (but is not limited to) the following improvements 
            that are not yet operational: <br />
            </p>
          </div>
          <hr />
          <div>
            <p className="plan-desc">
              -Mobile and Desktop Apps <br />
              -Tracking Statistics <br />
              -OMMA ID Lookup Tool <br />
              -Easy Printing of Labels, Directly From Our Site <br />
              -Test Mode <br />
            </p>
            <a href="/signup" className="button w-button">
              SIGNUP
            </a>
          </div>
        </div>
        <div className="plan">
          <h3 style={{textAlign: 'center', fontWeight: '400'}}>Coming Soon!</h3>
          <p  style={{textAlign:'center', marginTop: '60px'}} className="plan-desc">More plans to fit every business</p>
        </div>
      </div>
      <style jsx global>{`
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
        .subscriptions {
          display: flex;
        }
        .plan {
          width: 33.3333%;
          margin-right: 2em;
        }
        h3 {
          font-size: 28px;
          margin-top: 5px;
          margin-bottom: 5px;
        }
        hr {
          margin-top: 20px;
          margin-bottom: 20px;
          border: 0;
          border-top: 1px solid #eee;
        }
        .plan-desc {
          text-align: left; 
          color: rgb(71, 137, 120);
          font-size: 16px;
        }
        .w-button {
          display: inline-block;
          padding: 9px 15px;
          background-color: #3898EC;
          color: #478978; 
          border: 0;
          line-height: inherit;
          text-decoration: none;
          cursor: pointer;
          border-radius: 0;
        }
        .button {
          position: static;
          display: block;
          width: 200px;
          margin-top: 35px;
          margin-right: auto;
          margin-left: auto;
          padding-top: 12px;
          padding-bottom: 12px;
          border-style: solid;
          border-width: 3px;
          border-color: #478978; 
          border-radius: 7.5px;
          background-color: #fff;
          font-size: 18px;
          font-weight: 400;
          text-align: center;
        }

        @media only screen and (max-width: 600px) {
          .content-blox {
            width: 80vw;
          }

          .subscriptions {
            flex-direction: column;
          }
          .plan {
            width: 80vw;
            margin-right: 0 !important;
            margin-bottom: 4em;
          }

          .plan-desc {
            text-align: center;
          }
        }
      `}</style>
    </Layout>
  )
}

export default Pricing;