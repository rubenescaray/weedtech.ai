import { useState } from 'react'
import Head from 'next/head'
import Header from './header'
import Footer from './footer'
import Banner from './banner'
import Features from './features'

function Layout({ title, children, tab, hideBanner, hideFeatures, noContent }) {
  return (
    <div>
      <Head>
        <title>
          {title ? title : 'Weedtech.ai'}
        </title>
      </Head>
      <Header tab={tab}/>
        {!hideBanner && <Banner />}
        <div className={noContent ? null : "content-section"}>
          <div className={noContent ? null : "content-blox"}>
            {children}
          </div>
        </div>
        {!hideFeatures && <Features />}
      <Footer />
      
      <style jsx global>{`
        .content-section {
          font-size: 1.5rem;
        }
        .content-blox {
          width: 70%;
          margin-right: auto;
          margin-bottom: 50px;
          margin-left: auto;
          padding-top: 1.7em;
          padding-bottom: 1.7em;
        }
        h2 {
          font-size: 2rem;
          line-height: 36px;
          margin-top: 1em;
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
          margin-top: 1em;
          margin-bottom: 1em;
          border: 0;
          border-top: 1px solid #eee;
        }
        .plan-desc {
          text-align: left; 
          color: rgb(71, 137, 120);
          font-size: 1.2rem;
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
        .text {
          margin-top: 25px;
          padding-right: 25px;
          padding-left: 25px;
          font-family: Montserrat,sans-serif;
          color: #333;
          line-height: 28px;
          text-align: center;
        }
        .text.left {
          margin-top: 25px;
          font-size: 14px;
          text-align: left;
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
        padding: 50px 25px 25px 35px;
        background-color: #f9f9f9;
        border-radius: 10px;
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
        display: block;
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
        justify-content: center;
        align-items: center;
        display: flex;
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
      .message-visible {
        padding: 10px;
        text-align: center;
        width: 50%;
        margin: 2em auto 0 auto;
        border-radius: 5px;
        font-size: 1rem;
        visibility: visible;
        opacity: 1;
        transition: opacity 0.5s linear;
      }
      .message-hidden {
        padding: 10px;
        text-align: center;
        width: 50%;
        margin: 2em auto 0 auto;
        border-radius: 5px;
        font-size: 1rem;
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s 0.5s, opacity 0.5s linear;
      }
      .w-form-done {
        margin-top: 20px;
        padding: 20px;
        text-align: center;
        background-color: #dddddd;  
      }
      .w-form-fail {
        margin-top: 20px;
        padding: 10px;
        text-align: center;
        background-color: #ffdede;
      }
      .ReactTable .rt-tbody .rt-td {
        text-align: center;
      }
      .ReactTable * {
        font-size: 0.9rem;
      }
      .panel-group {
        margin-bottom: 20px;
      }
      .panel {
        margin-bottom: 20px !important;
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
        margin-bottom: 0;
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
        border-color: #337ab7;
      }
      .panel-primary>.panel-heading {
        color: #fff;
        background-color: #337ab7;
        border-color: #337ab7;
      }
      .panel-success {
        border-color: #d6e9c6;
      }
      .panel-success>.panel-heading {
        color: #3c763d;
        background-color: #dff0d8;
        border-color: #d6e9c6;
      }
      .panel-info {
        border-color: #bce8f1;
      }
      .panel-info>.panel-heading {
        color: #31708f;
        background-color: #d9edf7;
        border-color: #bce8f1;
      }
      .table-link {
        color: #067df7;
        cursor: pointer;
      }
      .loading-div {
        margin: 3em auto;
        width: 10vh;
      }
      .inside-box-btn {
        display: flex;
        width: 70%;
        font-size: 0.7rem;
        margin: 1em auto;
      }
      .inside-modal-btn {
        display: flex;
        width: 30%;
        font-size: 1rem;
        margin: auto;
        background-color: #478978c2;
      }
      .red-button {
        background-color: #ff0000a3;
      }
      .css-yk16xz-control {
        font-size: 1rem;
      }

      @media only screen and (max-width: 600px) {
        .content-blox {
          width: 95vw;
        }

        .heading-2 {
          font-size: 1rem;
        }

        .text-field {
          width: 100%;
        }

        .fit-content {
          width: fit-content;
        }
      }
      `}</style>
    </div>
  )
}

export default Layout