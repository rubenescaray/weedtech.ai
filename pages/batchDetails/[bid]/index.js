import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import ReactLoading from "react-loading"
import QRCode from 'qrcode.react'
import DeleteModal from '../../../components/modals/deleteModal'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../components/layout'
import Heading from '../../../components/heading'
import httpClient  from '../../../config'

function BatchDetails(props) {
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [batchDetails, setBatchDetails] = useState([{}])
  const [events, setEvents] = useState([{}])
  const [eventsLength, setEventsLength] = useState(0)
  const [product, setProduct] = useState('')
  const [productsLength, setProductsLength] = useState(0)

  const { auth } = props
  const router = useRouter()
  const { bid } = router.query;

  useEffect(() => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token');
    
    const fetchData = async () => {
      await httpClient.get(`viewBatch/${user_token}/${bid}`)
        .then(res => {
          console.log(res.data[0])
          const response = Object.assign({}, res.data[0], {
            events: formatEvents(res.data[0].events),
            productIDs: formatProducts(res.data[0].productIDs)
          })

          // console.log(response.productIDs)
          setEventsLength(response.events.length)
          setProductsLength(response.productIDs.length)
          setBatchDetails(response)
          setLoading(false)
        })
        .catch(error => {
          console.log(error)
        })
    }
    setTimeout(fetchData(), 1000)
  }, [])

  const formatEvents = (events) => {
    const formattedEvents = [];

    events.map((event) => {

      if (!(Array.isArray(event))) {
        formattedEvents.push(event)
      }

      formattedEvents.push(event[0])
    })

    return formattedEvents.filter(el => el != undefined)
  }

  const formatProducts = (products) => {
    let newProducts = []

    products.map(p => {
      newProducts.push({
        productID: p
      })
    })
    console.log('newProducts')
    console.log(newProducts)
    return newProducts
  }

  const splitID = (string) => {
    if (string === undefined) {
      return ''
    }

    return <Link href='/productDetails/[pid]' as={`/productDetails/${string}`}>
      <p className="table-link">{`${string.slice(0,4)}-${string.slice(4,8)}-${string.slice(8,13)}`}</p>
    </Link>
  }

  const removeFromBatch = (productId) => {
    setProduct(productId)
    toggleModal()
  }

  const toggleModal = () => {
    setModal(!modal)
  }

  const deleteCallback = () => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token');
    const { batchID } = batchDetails

    httpClient.get(`removeFromBatch/${user_token}/${batchID}/${product}`)
      .then(res => {
        console.log(res)
        toggleModal()
      })
      .catch(error => {
        console.log(error)
      })
  }

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

  const productColumns = [{
    Header: 'QR Code',
    accessor: 'productID',
    Cell: props => <QRCode value={props.value ? props.value : 'ABCDEFGHIJK'} size="50" />,
  }, {
    Header: 'Product ID',
    accessor: 'productID',
    Cell: props => splitID(props.value),
  }, {
    Header: 'Remove from Batch',
    accessor: 'productID',
    Cell: props => 
      <button 
        onClick={() => removeFromBatch(props.value)} 
        className="submit-button w-button inside-box-btn">
        Remove
      </button>,
  }]

  if (loading) {
    return (
      <Layout title="Batch Details">
        <Heading whereTo="/batches" heading="My Batches > Batch Details" />
        <h2 className="heading-2">Batch Details</h2>
        <div className="loading-div">
          <ReactLoading type={'spin'} color={'#478978'} />
        </div>
      </Layout>
    )
  }

  return(
    <Layout title="Batch Details">
      <DeleteModal show={modal} typeOf='product from this batch' cancel={toggleModal} accept={deleteCallback} />
      <Heading whereTo="/batches" heading="My Batches > Batch Details" />
      <h2 className="heading-2">Batch Details</h2>
      <div className="panel panel-primary">
        <div className="panel-heading">Batch Name</div>
        <div className="panel-body">
          {batchDetails.batchName}
        </div>
      </div>
      <div className="panel panel-info">
        <div className="panel-heading">Products contained</div>
          <div className="panel-body">
            <h4 style={{margin: '1em auto'}}>{productsLength} {productsLength > 1 ? 'products' : 'product'} found</h4>
            <center>
              <ReactTable
                data={batchDetails.productIDs}
                columns={productColumns}
                minRows={2}
                showPagination={false}
              />
            </center>
        </div>
      </div>
      <div className="panel panel-info">
        <div className="panel-heading">Event Log</div>
          <div className="panel-body">
            <h4 style={{margin: '1em auto'}}>{eventsLength} {eventsLength > 1 ? 'events' : 'event'} Found</h4>
            <center>
              <ReactTable
                data={batchDetails.events}
                columns={eventColumns}
                minRows={2}
                showPagination={false}
              />
            </center>
        </div>
      </div>
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

export default connect(mapState)(BatchDetails);