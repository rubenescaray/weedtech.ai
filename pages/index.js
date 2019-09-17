import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'
import Layout from '../components/layout'
import Features from '../components/features'

function Home() {

  return (
    <Layout title="Home" tab={0}>
      <div className="background-home">
        <div className="hero-text-home">
          <img
            src="/static/images/WeedTechLogo_Light1x.png"
            width="650" 
            srcSet="/static/images/WeedTechLogo_Light1x-p-500.png 500w,
            /static/images/WeedTechLogo_Light1x-p-800.png 800w,
            /static/images/WeedTechLogo_Light1x-p-1080.png 1080w,
            /static/images/WeedTechLogo_Light1x-p-1600.png 1600w,
            /static/images/WeedTechLogo_Light1x-p-2000.png 2000w, 
            /static/images/WeedTechLogo_Light1x-p-2600.png 2600w,
            /static/images/WeedTechLogo_Light1x.png 3200w"
            sizes="60vw"
            alt="" 
            className="image"
          />
          <h1 className="heading">Seed-to-Sale for Everyone</h1>
          <a href="/signup" className="button w-button">SIGNUP</a>
        </div>
      </div>
      <div style={{paddingBottom: '160px'}} className="content-section">
        <div className="content-box">
          <h2 className="heading-2">Simple, Compliant and Affordable.</h2>
          <img
            src="/static/images/green-bar.png"
            width="250"
            height="33"
            srcSet="/static/images/green-bar-p-500.png 500w,
            /static/images/green-bar-p-800.png 800w,
            /static/images/green-bar-p-1080.png 1080w,
            /static/images/green-bar.png 1600w"
            sizes="(max-width: 479px) 90vw, 250px"
            alt="" 
            className="underline-bar" />
          <div className="sub-text-sale">Seed-to-Sale starting at $50/month</div>
          <div className="text">
            <p>
              <span className="four-hundred">
                The Unity Bill is upon us, 
                and the new law says we have to have seed-to-sale tracking software. 
                So, naturally, everyone raised their prices and started gouging us. 
                They all started charging $300 a month (or more) for seed-to-sale software from some of the larger companies, 
                plus a set up fee.
              </span>
            </p>
            <p>&nbsp;</p>
            <p>
              <span className="quick-speech">
                We didn’t like that. Neither did you.
              </span>
            </p>
            <p>&nbsp;</p>
            <p>
              <span className="four-hundred">
                We have a grow out here in Lawton (you can check it out right here) 
                and those prices pissed us off.
              </span>
              <span className="four-hundred"><br/></span>
              <span className="four-hundred"><br/></span>
              <span className="four-hundred">
                We weren’t going to pay those outrageous prices, 
                so we made our own system. 
                Now, we’re grinding as hard as we can to bring it to everyone for far less than anyone else. 
                We don't want to be taken advantage of by software developers 
                trying to make a quick buck off of our industry, 
                and we'd like to give all the Okies out here that same chance.
              </span>
            </p>
            <p>&nbsp;</p>
            <p>
              <span className="quick-speech">
                I'll give you the ultra short and quick version of the speech:
              </span>
            </p>
            <ul className="speech-list">
              <li className="landing-list-item four-hundred">
                <span>We're totally OMMA compliant for grows, dispensaries, and processors.</span>
              </li>
              <li className="landing-list-item four-hundred">
                <span>
                  We have a lot of quality of life stuff in the works,
                  all of which is going to be free. 
                  This includes iOS and Android apps so you can do everything right from your phone.
                </span>
              </li>
              <li className="landing-list-item four-hundred">
                <span>
                  The first 400 people to subscribe are locked in at 50 per month for as long as 
                  you have a subscription with us. Even if our costs go up, yours do not.
                </span>
              </li>
              <li className="landing-list-item four-hundred">
                <span>
                  Speaking of which, we're keeping our costs low so we can keep your costs low.
                </span>
              </li>
            </ul>
            <p>&nbsp;</p>
            <p>
              <span className="four-hundred">
                Do NOT overpay for OMMA compliance.&nbsp;
              </span>
            </p>
            <p>
              <span className="four-hundred">
                The answer is right here, at WeedTech.
              </span>
            </p>
          </div>
          <div className="_3colum w-row">
            <h3 className="heading-3">Testimonials</h3>
            <div className="testimonials">
              <div className="column w-col w-col-4">
                <div className="text colum">
                  “We are a commercial grow and we have WeedTech for our Seed to Sale. 
                  Pretty easy, pretty straight forward, 
                  not a lot of extra stuff but keep in mind they are still finishing up with getting 
                  it all put out there. The guys are super nice and very helpful. 
                  <br/>— Shannon
                </div>
              </div>
              <div className="w-col w-col-4">
                <div className="text colum" style={{align: 'left'}}>
                  “We've been looking for an affordable seed to sale system for months. 
                  WeedTech provides just what we need in a user friendly format with more features coming soon. 
                  We are satisfied with the product so far.”
                  <br/>— Trap House Grower<br/><br/>
                </div>
              </div>
              <div className="w-col w-col-4">
                <div className="text colum">
                  "Pretty much what I was looking for was a good software that would do exactly 
                  what we needed and not be to expensive plus my dad hasn’t ever really used phones 
                  or computers so it helps that y’all program is easy to use so I can teach it to him lol"
                  <br/> — Austin
                </div>
              </div>
            </div>
        
        </div>
          <div className="_3colum w-row">
            <div className="w-col w-col-4">
              <h3 className="heading-3"></h3>
              <div className="text colum"></div>
            </div>
            <div className="column w-col w-col-4">
              <h3 className="heading-3">WeedTech Community</h3>
              <div className="text colum">Join our growing community of over 200 Okie growers! 
                <br/><br/>
                <a href="https://discord.gg/tRB6qn7">
                  Discord (Live Support)
                </a>
                <br/><br/>
                Give us a call!
                <br/><br/>
                <a style={{marginBottom: '100px'}} href="tel:1-866-WEED-309">
                  1-866-WEED-309
                </a>
              </div>
            </div>
            <div className="w-col w-col-4">
              <h3 className="heading-3"></h3>
                <div className="text colum">
                </div>
            </div>
          </div>
        </div>
      </div>
      <Features />
      <style jsx>{`
        .background-home {
          width: 100%;  
          height: 650px;
          background-position: 0 0,50% 50%;
          background-size: auto,cover;
          background-repeat: repeat,no-repeat;
          background-image: linear-gradient(180deg,rgba(0,0,0,.53),rgba(0,0,0,.53)),url(/static/images/weed-grower-bg-p-1600.png);
        }
        .hero-text-home {
          padding-top: 200px;
          padding-bottom: 0;
          display: flex;
          width: 60%;
          margin-right: auto;
          margin-left: auto;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          flex-direction: column;
          -webkit-box-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          align-items: center;
        }
        .image {
          display: block;
          margin-right: auto;
          margin-left: auto;
          border: 0;
          max-width: 100%;
          vertical-align: middle;
          z-index: 10;
        }
        .heading {
          font-family: Montserrat,sans-serif;
          color: #fff;
          font-weight: 400;
          text-align: center;
        }
        h1 {
          font-size: 38px;
          line-height: 44px;
          margin-top: 20px;
          margin-bottom: 10px;
          margin: 0.67em 0;
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
          border-color: #fff;
          border-radius: 7.5px;
          background-color: #478978;
          font-size: 18px;
          font-weight: 400;
          text-align: center;
        }
        .content-section {
          font-size: 18px;
        }
        .content-box {
          width: 70%;
          margin-right: auto;
          margin-bottom: 50px;
          margin-left: auto;
          padding-top: 50px;
          padding-bottom: 50px;
        }
        .heading-2 {
          font-family: Montserrat, sans-serif;
          color: #478978;
          font-weight: 600;
          text-align: center;
        }
        h2 {
          font-size: 32px;
          line-height: 36px;
          margin-top: 20px;
          margin-top: 10px;
        }
        .underline-bar {
          margin-top: -24px;
          margin-right: 19%;
          float: right;
        }
        img {
          max-width: 100%;
          vertical-align: middle;
          display: inline-block;
        }
        .sub-text-sale {
          margin-top: 50px;
          font-family: Montserrat,sans-serif;
          color: #000;
          font-size: 20px;
          text-align: center;
        }
        .four-hundred {
          font-weight: 400;
        }
        .text {
          margin-top: 25px;
          padding-right: 25px;
          padding-left: 25px;
          font-family: Montserrat,sans-serif;
          color: #333;
          line-height: 28px;
          text-align: center;
        }
        .quick-speech {
          font-weight: 700;
          font-size: 20px;
        }
        .speech-list {
          text-align: initial;
          margin-left: 55px;
        }
        .landing-list-item {
          margin-bottom: 5px;
        }
        ul, ol {
          margin-top: 0px;
          margin-bottom: 10px;
          padding-left: 40px;
        }
        ._3colum {
          margin-top: 50px;
        }
        .w-row:before {
          content: " ";
          display: table;
          grid-column-start: 1;
          grid-row-start: 1;
          grid-column-end: 2;
          grid-row-end: 2;
        }
        .column {
          font-family: Montserrat, sans-serif;
          color: #478978;
        }

        .w-col-4 {
          width: 33.33333333%;
        }
        .w-col {
          position: relative;
          float: left;
          width: 100%;
          min-height: 1px;
          padding-left: 10px;
          padding-right: 10px;
        }
        .heading-3 {
          font-family: Montserrat, sans-serif;
          color: #478978;
          font-weight: 600;
          text-align: center;
        }
        h3 {
          font-size: 24px;
          line-height: 30px;
          margin-top: 20px;
        }
        .testimonials {
          display: flex;
        } 
      `}</style>
    </Layout>
  )
}


export default Home
