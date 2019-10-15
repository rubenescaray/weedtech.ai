import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import QRCode from 'qrcode.react'
import Layout from '../components/layout'
import Link from 'next/link'
import Heading from '../components/heading';
import httpClient from '../config'

function ViewSamples({ auth }) {
  const [loading, setLoading] = useState(true)
  const [samples, setSamples] = useState([{}])

  useEffect(() => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token');
    const fetchData = async () => {
      await httpClient.get(`mySamples/${user_token}`)
        .then(res => {
          console.log(res)
          setSamples(res.data.success)
          setLoading(false)
        })
        .catch(error => {
          console.log(error)
        })
    }
    setTimeout(fetchData(), 2000)
  }, []);

  const splitID = (string) => {
    if (string === undefined) {
      return
    }

    /* const productIndex = products.filter(obj => {
      return obj.productID === string
    }); 

    const id = productIndex[0]._id; */

    return <Link href="sampleDetails/[sid]" as={`sampleDetails/${string}`}>
      <p className="table-link">{`${string.slice(0,4)}-${string.slice(4,8)}-${string.slice(8,13)}`}</p>
    </Link>;
  }

  const createdTime = (createdAt) => {
    return new Date(createdAt).toLocaleDateString("en-US");
  }

  const columns = [{
    Header: 'QR Code',
    accessor: 'sampleID',
    Cell: props => <QRCode value={props.value ? props.value : 'ABCDEFGHIJK'} size="50" />,
  }, {
    Header: 'Sample ID',
    accessor: 'sampleID',
    Cell: props => splitID(props.value),
  }, {
    Header: 'State',
    accessor: 'productState',
    Cell: props => <p>{props.value}</p>,
  }, {
    Header: 'Notes',
    accessor: 'productNotes',
    Cell: props => <p>{props.value}</p>,
  }, {
    Header: 'Created',
    accessor: 'timestamp',
    Cell: props => <p>{createdTime(props.value)}</p>,
  }, {
    Header: 'Delete Sample',
    Cell: props => <a>Delete</a>,
  }, {
    Header: 'Transfer Sample',
    Cell: props => <a>Transfer</a>,
  }]

  return (
    <Layout title="View Samples">
      <Heading heading="My Samples" />
      <div className="viewSamples" >
        <h2 className="heading-2">Available Samples</h2>
        <ReactTable
          loading={loading}
          data={samples}
          columns={columns}
          minRows={0}
        />
      </div>
      <style jsx>{`
      .viewSamples {

      }
      `}</style>
    </Layout>
  )
}

const mapState = state => {
  return {
    auth: state.auth,
  }
}

export default connect(mapState)(ViewSamples);