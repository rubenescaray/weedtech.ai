import { useState } from 'react'
import Head from 'next/head'
import Header from './header'
import Footer from './footer'

function Layout({ title, children, tab }) {
  return (
    <div>
      <Head>
        <title>
          {title ? title : 'Weedtech.ai'}
        </title>
      </Head>
      <Header tab={tab}/>
        {children}
      <Footer />
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
          width: 33.3333%
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
      `}</style>
    </div>
  )
}

export default Layout