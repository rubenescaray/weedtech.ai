import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import ReactLoading from "react-loading"
import { useRouter } from 'next/router'
import Layout from '../../../components/layout'
import Heading from '../../../components/heading'
import httpClient  from '../../../config'

function ProductDetails({ auth }) {
  const [loading, setLoading] = useState(true)
  const [productInfo, setProductInfo] = useState({})
  const [eventsLength, setEventsLength] = useState(0)

  const router = useRouter()
  const { pid } = router.query;

  useEffect(() => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token');

    const fetchData = async () => {
      await httpClient.get(`checkProduct/${user_token}/${pid}`)
        .then(res => {
          const events = formatEvents(res.data.events)
          const response = Object.assign({}, res.data, {
            events: events,
          })

          setEventsLength(events.length)
          setProductInfo(response)
          setLoading(false)
        })
        .catch(error => {
          console.log(error)
        })
    }
    setTimeout(fetchData(), 2000)
  }, []);

  const formatEvents = (events) => {
    const formattedEvents = [];

    events.map((event) => {
      if (!(Array.isArray(event))) {
        formattedEvents.push(event)
      }

      formattedEvents.push(event[0])
    })

    return formattedEvents.filter(el => el != null)
  }

  if (loading) {
    return (
      <Layout title="Product Details" >
        <Heading whereTo="/products" heading={'My Products > Product Details'} />
        <h2 className="heading-2">Product Information</h2>
        <div className="loading-div">
          <ReactLoading type={'spin'} color={'#478978'} />
        </div>
      </Layout>
    )
  }

  const noteColumns = [{
    Header: 'Note',
    id: 'note',
    accessor: index => index,
    Cell: props => <p>{props.value}</p>,
  },{
    Header: 'Product ID',
    Cell: props => <p className="table-link">Delete Note</p>,
  }]

  const eventColumns = [{
    Header: 'Type',
    accessor: 'type',
    Cell: props => <p>{props.value}</p>,
  }, {
    Header: 'Time',
    accessor: 'time',
    Cell: props => <p>{new Date(props.value).toGMTString()}</p>,
  }, {
    Header: 'Event',
    accessor: 'value',
    Cell: props => <p>{props.value}</p>,
  }]

  return (
    <Layout title="Product Details" >
      <Heading whereTo="/products" heading={'My Products > Product Details'} />
      <h2 className="heading-2">Product Information</h2>
      <div className="panel-group">

        <div className="panel panel-default">
          <div className="panel-heading">Plant Name</div>
          <div className="panel-body">{productInfo.productName}</div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">Plant ID</div>
          <div className="panel-body">{pid}</div>
        </div>

        <div className="panel panel-primary">
          <div className="panel-heading">Product State </div>
          <div className="panel-body">{productInfo.productState}</div>
        </div>

        <div className="panel panel-default">
		      <div className="panel-heading">Product Location</div>
					<div className="panel-body">
            {productInfo.productLocation == null ? 'Not Set' : productInfo.productLocation}
          </div>
				</div>

        <div className="panel panel-success">
          <div className="panel-heading">Product Notes</div>
          <div className="panel-body">
            {productInfo.productNotes.length < 1 
              ? 
              <p>No Notes added</p>
              :
              <ReactTable
                data={productInfo.productNotes}
                columns={noteColumns}
                minRows={0}
                showPagination={false}
              />
            }
          </div>
        </div>

        <div className="panel panel-info">
          <div className="panel-heading">Time Created</div>
          <div className="panel-body">{new Date(productInfo.timestamp).toLocaleDateString("en-US")}</div>
        </div>

        <div className="panel panel-info">
		      <div className="panel-heading">Event Log</div>
		        <div className="panel-body">
            <br/><br/>
            <center>
              <h3>{eventsLength} Events Found</h3>
              <br/><br/>
              <ReactTable
                data={productInfo.events}
                columns={eventColumns}
                minRows={0}
                showPagination={false}
              />
            </center>
          </div>
			  </div>
      </div>
      <input
        style={{
          float: 'left',
          marginTop: '0px',
          width: '15%'
        }}
        type="submit" 
        value="Edit" 
        data-wait="Please wait..." 
        className="submit-button w-button" 
      />
      <style jsx>{`
      
      `}</style>
    </Layout>
  )
}

const mapState = state => {
  return {
    auth: state.auth,
  }
}

export default connect(mapState)(ProductDetails);