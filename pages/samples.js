import React, { useState, useEffect } from 'react'
import ReactLoading from "react-loading"
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import QRCode from 'qrcode.react'
import DeleteModal from '../components/modals/deleteModal'
import TransferModel from '../components/modals/transferModal'
import Layout from '../components/layout'
import Link from 'next/link'
import Heading from '../components/heading';
import httpClient from '../config'

function ViewSamples({ auth }) {
  const [loading, setLoading] = useState(true)
  const [samples, setSamples] = useState([{}])
  const [deleteModal, setDelModal] = useState(false)
  const [transferModal, setTransferModal] = useState(false)
  const [selectedSample, setSelectedSample] = useState('')

  useEffect(() => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token');
    const fetchData = async () => {
      await httpClient.get(`mySamples/${user_token}`)
        .then(res => {
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

  const deleteSample = (sampleId) => {
    setSelectedSample(sampleId)
    toggleDelModal()
  }

  const transferSample = (productId) => {
    setSelectedProduct(productId)
    toggleTransModal()
  }

  const toggleDelModal = () => {
    setDelModal(!deleteModal)
  }

  const toggleTransModal = () => {
    setTransferModal(!transferModal)
  }

  const deleteCallback = () => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token')
    const newSamples = samples.filter(sample => sample.sampleID != selectedSample)
    
    setSamples(newSamples)
    httpClient.get(`deleteSample/${user_token}/${selectedSample}`)
      .then(res => {
        console.log(res)
        toggleDelModal()
      })
      .catch(error => {
        console.log(error)
      })
  }

  const transferCallback = (newOwner) => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token');
    console.log(user_token)
    console.log(newOwner)
    console.log(selectedSample)

    /* httpClient.get(`productDestroy/${user_token}/${selectedProduct}`)
      .then(res => {
        console.log(res)
        toggleDesModal()
      })
      .catch(error => {
        console.log(error)
      }) */
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
    accessor: 'sampleID',
    Cell: props => 
      <button 
        onClick={() => deleteSample(props.value)} 
        className="submit-button w-button inside-box-btn">
        Delete
      </button>,
  }, {
    Header: 'Transfer Sample',
    accessor: 'sampleID',
    Cell: props => 
      <button 
        onClick={() => transferSample(props.value)} 
        className="submit-button w-button inside-box-btn">
        Transfer
      </button>,
  }]

  return (
    <Layout title="View Samples">
      <DeleteModal show={deleteModal} typeOf='sample' cancel={toggleDelModal} accept={deleteCallback} />
      <TransferModel show={transferModal} cancel={toggleTransModal} accept={transferCallback} />
      <Heading heading="My Samples" />
      <div className="viewSamples" >
        <h2 className="heading-2">Available Samples</h2>
        {loading ? <div className="loading-div">
            <ReactLoading type={'spin'} color={'#478978'} />
          </div> : <ReactTable
          loading={loading}
          data={samples}
          columns={columns}
          minRows={0}
        />}
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