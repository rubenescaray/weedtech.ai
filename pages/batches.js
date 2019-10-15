import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import QRCode from 'qrcode.react'
import ReactTable from 'react-table'
import Link from 'next/link'
import Layout from '../components/layout'
import Heading from '../components/heading'
import httpClient from '../config'

function viewBatches({ auth }) {
  const [loading, setLoading] = useState(true)
  const [batches, setBatches] = useState([{}])

  useEffect(() => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token');
    const fetchData = async () => {
      await httpClient.get(`findBatches/${user_token}`)
        .then(res => {
          console.log(res)
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
      <p className="table-link">{batchDetails}</p>
    </Link>;
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
    Cell: props => <p><a>Create Manifest</a></p>,
  },{
    Header: 'Delete',
    Cell: props => <p><a>Delete</a></p>,
  }]

  return(
    <Layout>
      <Heading heading="My Batches"/>
      <h2 className="heading-2">Current Batches</h2>
      {loading ? 
        <p align="center">Loading...</p> 
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