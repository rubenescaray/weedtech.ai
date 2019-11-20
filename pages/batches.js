import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import QRCode from 'qrcode.react'
import ReactLoading from "react-loading"
import ReactTable from 'react-table'
import Link from 'next/link'
import Layout from '../components/layout'
import Heading from '../components/heading'
import httpClient from '../config'

function viewBatches({ auth }) {
  const [loading, setLoading] = useState(true)
  const [batches, setBatches] = useState([{}])

  useEffect(() => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token')

    const fetchData = async () => {
      await httpClient.get(`findBatchesDetails/${user_token}`)
        .then(res => {
          setBatches(res.data)
          setLoading(false)
        })
        .catch(error => {
          console.log(error)
        })
    }
    setTimeout(fetchData(), 2000)
  }, []);

  const viewBatch = (batchId) => {
    if (batchId === undefined) {
      return
    }

    return <Link href="batchDetails/[bid]" as={`batchDetails/${batchId}`}>
      <p className="table-link">{batchId}</p>
    </Link>;
  }

  const downloadBatch = (data) => {
    console.log(data)
    
    httpClient.get(`batchDownload/${data}`)
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          console.log(error)
        })
  }

  const columns = [{
    Header: 'QR Code',
    accessor: '_id',
    Cell: props => <QRCode value={props.value ? props.value : 'ABCDEFGHIJK'} size="50" />,
  },{
    Header: 'Batch ID',
    accessor: 'batchID',
    Cell: props => viewBatch(props.value),
  }, {
    Header: 'Batch Name',
    accessor: 'batchName',
    Cell: props => <p>{props.value}</p>,
  }, {
    Header: 'Batch Origin',
    accessor: 'batchOrigin',
    Cell: props => <p>{props.value}</p>,
  }, {
    Header: 'Create Manifest',
    accessor: 'batchID',
    Cell: props => 
      <button 
        onClick={() => console.log(props.value)} 
        className="submit-button w-button inside-box-btn">
        Create
      </button>,
  },{
    Header: 'Delete',
    accessor: 'batchID',
    Cell: props => 
      <button 
        onClick={() => console.log(props.value)} 
        className="submit-button w-button inside-box-btn">
        Delete
      </button>,
  },{
    Header: 'Download',
    accessor: 'batchID',
    Cell: props => 
      <button 
        onClick={() => downloadBatch(props.value)} 
        className="submit-button w-button inside-box-btn">
        Download
      </button>,
  }]

  return(
    <Layout title={'View Batches'}>
      <Heading heading="My Batches"/>
      <h2 className="heading-2">Current Batches</h2>
      {loading ? 
        <div className="loading-div">
          <ReactLoading type={'spin'} color={'#478978'} />
        </div>
        :
        <ReactTable
          loading={loading}
          data={batches}
          columns={columns}
          minRows={0}
        />}
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

export default connect(mapState)(viewBatches);