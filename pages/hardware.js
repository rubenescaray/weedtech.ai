import { useState } from 'react'
import Layout from '../components/layout'
import Features from '../components/features'
import Banner from '../components/banner'

function Hardware() {
  return (
    <Layout title="Hardware" tab={1}>
      <h2 className="heading-2">
        Recommended Hardware
      </h2>
      <div className="sub-text centered">
        This will be updated as needed
      </div>
      <div style={{display: 'flex'}} className="_3colum w-row hardware-list">
        <div className="column w-col w-col-4 indv-hardware">
          <img src="/static/images/41BrqcTc81L._SL250_.jpg" alt="" className="hardware-img" />
          <div className="text colum">
            <a target="_blank" 
              href="https://www.amazon.com/gp/product/B01MTWGMRR/ref=as_li_tl?ie=UTF8&amp;camp=1789&amp;creative=9325&amp;creativeASIN=B01MTWGMRR&amp;linkCode=as2&amp;tag=weedtechai-20&amp;linkId=df8d4827b08ff7a1efcdb365d3c5a750">
                Brother QL-810W Ultra-Fast Label Printer with Wireless Networking
              </a>
            </div>
        </div>
        <div className="w-col w-col-4 indv-hardware">
          <img src="/static/images/311EBlHY2IL._SL250_.jpg" alt="" className="hardware-img" />
          <div className="text colum">
            <a target="_blank" 
              href="https://www.amazon.com/gp/product/B01D2OPJAQ/ref=as_li_tl?ie=UTF8&amp;camp=1789&amp;creative=9325&amp;creativeASIN=B01D2OPJAQ&amp;linkCode=as2&amp;tag=weedtechai-20&amp;linkId=7c8c79a59e227c227604e6b21c4f2296">
                Zebra Technologies ZD41H22-D01E00EZ Series ZD410 Direct Thermal Healthcare Desktop Printer, 
                203 DPI, 2", US Power Cord, USB 2.0, USB Host, BTLE, Ethernet Module, EZPL
            </a>
          </div>
        </div>
        <div className="w-col w-col-4 indv-hardware">
          <img 
            style={{paddingTop: '70px', paddingBottom: '70px'}} 
            src="/static/images/Refresh.png" 
            alt="" 
            className="hardware-img icon"
          />
          <div className="text colum">
            New Hardware will be added as we test it!
          </div>
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
      .heading-2 {
        font-family: Montserrat, sans-serif;
        color: #478978;
        font-weight: 600;
        text-align: center;
        margin-top: 60px;
      }
      h2 {
        font-size: 32px;
        line-height: 36px;
        margin-top: 20px;
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
      ._3colum {
        margin-top: 50px;
      }
      .w-row {
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
        width: 100%;
        min-height: 1px;
        padding-left: 10px;
        padding-right: 10px;
      }
      .w-col-4 {
        width: 33.33333333%;
      }
      .text {
        margin-top: 25px;
        padding-right: 25px;
        padding-left: 25px;
        font-family: Montserrat, sans-serif;
        color: #333;
        line-height: 28px;
        text-align: center;
      }
      .text.colum {
        margin-top: 25px;
        line-height: 28px;
      }
      img {
        max-width: 100%;
        vertical-align: middle;
        display: inline-block;
        border: 0;
      }
      .hardware-img {
        display: block;
        margin-top: 0px;
        margin-right: auto;
        margin-left: auto;
        padding-top: 0px;
        padding-bottom: 0px;
      }

      @media only screen and (max-width: 600px) {
        .hardware-list {
          display: flex;
          flex-direction: column;
        }

        .content-blox {
          width: 100vw;
        }

        .indv-hardware {
          width: 50vw;
          margin: auto;
          margin-bottom: 2em;
        }
      }
      `}</style>
    </Layout>
  )
}

export default Hardware;