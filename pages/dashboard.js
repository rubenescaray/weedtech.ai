import React, { useState } from 'react';
import Layout from "../components/layout";
import Features from "../components/features";
import Banner from "../components/banner";
import Tool from '../components/tool';

function Dashboard() {  
  return (
    <Layout>
      <Banner />
      <div className="content-section">
        <div className="container content-blox">
          <div>
            <h2 className="heading-2">Dashboard</h2>
            <h3 style={{fontSize: '95%', fontWeight: '300'}} className="heading-2">This will be updated on Mondays</h3>
          </div>
          <hr/>
          <div className="tool-section">
            <h2 className="product-title">Product Tools</h2>
            <div className="tool-segment">
              <Tool toolName="My Product IDs" toolButton="v" toolImage="0" />
              <Tool toolName="Create Product ID" toolButton="c" toolImage="1" />
              <Tool toolName="Coming Soon" toolButton="v" toolImage="6" />
            </div>
            <hr />
            <h2 className="product-title">User Tools</h2>
            <div className="tool-segment">
              <Tool toolName="Edit Profile" toolButton="v" toolImage="8" />
              <Tool toolName="Create Mobile User" toolButton="c" toolImage="8" />
              <Tool toolName="View Mobile Users" toolButton="v" toolImage="8" />
            </div>
            <hr />
            <h2 className="product-title">Location Tools</h2>
            <div className="tool-segment">
              <Tool toolName="Create Locations IDs" toolButton="c" toolImage="4" />
              <Tool toolName="View Locations" toolButton="v" toolImage="0" />
              <Tool toolName="Coming Soon" toolButton="v" toolImage="6" />
            </div>
            <hr />
            <h2 className="product-title">Samples Tools</h2>
            <div className="tool-segment">
              <Tool toolName="Create Samples" toolButton="c" toolImage="3" />
              <Tool toolName="View Samples" toolButton="v" toolImage="3" />
              <Tool toolName="Coming Soon" toolButton="v" toolImage="6" />
            </div>
            <hr />
            <h2 className="product-title">Mother Plant Tools</h2>
            <div className="tool-segment">
              <Tool toolName="Create Mother IDs" toolButton="c" toolImage="5" />
              <Tool toolName="View Mothers" toolButton="v" toolImage="5" />
              <Tool toolName="Coming Soon" toolButton="v" toolImage="6" />
            </div>
            <hr />
            <h2 className="product-title">Batch Management Tools</h2>
            <div className="tool-segment">
              <Tool toolName="Create Product Batch" toolButton="c" toolImage="7" />
              <Tool toolName="Batch Actions" toolButton="v" toolImage="7" />
              <Tool toolName="View Batches" toolButton="v" toolImage="7" />
            </div>
            <hr />
            <h2 className="product-title">Other Tools</h2>
            <div className="tool-segment">
              <Tool toolName="Monthly Report" toolButton="v" toolImage="6" />
              <Tool toolName="Downloads" toolButton="v" toolImage="0" />
              <Tool toolName="View destroyed" toolButton="v" toolImage="0" />
            </div>
            <hr />
          </div>
        </div>
      </div>
      <Features/>
      <style jsx>{`
      .container {
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
      }
      .product-title {
        text-align: center;
        font-weight: 400;
      }
      .tool-section {

      }
      .tool-segment {
        justify-content: space-around;
        display: flex;
        margin-bottom: 15px;
        margin-top: 15px;
      }
      `}</style>
    </Layout>
  )
}

export default Dashboard