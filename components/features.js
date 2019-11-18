import React from 'react'

function Features() {
  return (
    <div className="features">
      <div className="content-blox">
        <div style={{display: 'flex'}} className="features-list w-row">
          <div className="feature w-col w-col-4">
            <img 
              src="/static/images/mobile-apps.png" 
              width="100" 
              height="100" 
              alt="" 
              className="feature-img" />
            <h3 className="heading-3 white">
              Easy to use Mobile Apps
            </h3>
            <div className="text white column">
              Forget the expensive equipment, 
              download our app on your Android or IOS smartphone.
            </div>
            <a href="/signup" className="button w-button">
              SIGNUP
            </a>
          </div>
          <div className="feature w-col w-col-4">
            <img 
              src="/static/images/no-fees.png" 
              width="100" 
              height="100" 
              alt="" 
              className="image-2" 
            />
            <h3 className="heading-3 white">
              No Setup Fees
            </h3>
            <div className="text white column setup-fees">
              No Setup fee and our signup process is so easy we don't need to hold your hand to get setup.
            </div>
            <a href="/signup" className="button w-button">
              SIGNUP
            </a>
          </div>
          <div className="feature w-col w-col-4">
            <img
              src="/static/images/target-price.png"
              width="100"
              height="100"
              alt="" 
              className="image-3" 
            />
            <h3 className="heading-3 white">
              Priced for YOUR Business
            </h3>
            <div className="text white column">
              With plans starting at $50/month, we have a subscription that's right for you.
            </div>
            <a href="/signup" id="priced-signed" className="button w-button">
              SIGNUP
            </a>
          </div>
        </div>
      </div>
      <style jsx>{`
        .features {
          height: 500px;
          padding-top: 50px;
          padding-bottom: 50px;
          background-color: transparent;
          background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(71, 137, 120, 0.45)), to(rgba(71, 137, 120, 0.45))), url(../images/green-leaf-bg.png);
          background-image: linear-gradient(180deg, rgba(71, 137, 120, 0.45), rgba(71, 137, 120, 0.45)), url(/static/images/green-leaf-bg.png);
          background-position: 0px 0px, 50% 50%;
          background-size: auto, cover;
          background-repeat: repeat, no-repeat;
          margin-top: 80px;
        }
        .content-blox {
          width: 70%;
          margin-right: auto;
          margin-bottom: 50px;
          margin-left: auto;
          padding-top: 50px;
          padding-bottom: 50px;
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
        img {
          max-width: 100%;
          vertical-align: middle;
          display: inline-block;
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
        .w-col {
          position: relative;
          float: left;
          min-height: 1px;
          padding-left: 10px;
          padding-right: 10px;
        }
        .w-col-4 {
          width: 33.33333333%;
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
        ._features {
          display: flex;
        } 
        .feature-img {
          display: block;
          margin-right: auto;
          margin-left: auto;
          text-align: left;
        }
        .heading-3.white {
          color: #fff;
          font-weight: 600;
        }
        .text.white {
          color: #fff;
        }
        .text.white.column {
          margin-top: 25px;
        }
        .image-2 {
          display: block;
          margin-right: auto;
          margin-left: auto;
        }
        .image-3 {
          display: block;
          margin-right: auto;
          margin-left: auto;
        }
        #priced-signed {
          margin-top: 64px;
        }

        @media only screen and (max-width: 600px) {
          .features {
            height: auto;
            margin-top: 0;
          }

          .content-blox {
            width: 100vw;
          }

          .features-list {
            flex-direction: column;
          }

          .feature {
            width: 50vw;
            margin: auto;
            margin-bottom: 2em;
          }

          .button {
            width: 50vw;
            margin-left: -5px;
          }
          .text, .white, .column {
            padding: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default Features;