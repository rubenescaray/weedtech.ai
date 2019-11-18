import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import ReactLoading from "react-loading"
import ReactTable from 'react-table'
import QRCode from 'qrcode.react'
import DeleteModal from '../components/modals/deleteModal'
import Layout from '../components/layout'
import Link from 'next/link'
import Heading from '../components/heading';
import httpClient from '../config'

function ViewMothers({ auth }) {
  const [loading, setLoading] = useState(true)
  const [mothers, setMothers] = useState([{}])
  const [selectedMother, setSelectedMother] = useState('')
  const [modal, setModal] = useState(false)

  useEffect(() => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token');
    const fetchData = async () => {
      await httpClient.get(`myMothers/${user_token}`)
        .then(res => {
          setMothers(res.data.success)
          setLoading(false)
        })
        .catch(error => {
          console.log(error)
        })
    }
    setTimeout(fetchData(), 2000)
  }, []);

  const motherNotes = (notes) => {
    if (notes === [] || notes === undefined) {
      return <li></li>
    }
    return notes.map(
      note => <li>*{note}</li>
    )
  }

  const splitID = (string) => {
    if (string === undefined) {
      return
    }

    return <Link href="motherDetails/[mid]" as={`motherDetails/${string}`}>
      <p className="table-link">{`${string.slice(0,4)}-${string.slice(4,8)}-${string.slice(8,13)}`}</p>
    </Link>;
  }

  const deleteMother = (motherId) => {
    setSelectedMother(motherId)
    toggleModal()
  }

  const toggleModal = () => {
    setModal(!modal)
  }

  const deleteCallback = () => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token');
    const newMothers = mothers.filter(mother => mother.productID != selectedMother)

    setMothers(newMothers)
    httpClient.get(`deleteProduct/${user_token}/${selectedMother}`)
      .then(res => {
        console.log(res)
        toggleModal()
      })
      .catch(error => {
        console.log(error)
      })
  }

  const columns = [{
    Header: 'QR Code',
    accessor: 'productID',
    Cell: props => <QRCode value={props.value ? props.value : 'ABCDEFGHIJK'} size="50" />,
  }, {
    Header: 'Product ID',
    accessor: 'productID',
    Cell: props => splitID(props.value),
  }, {
    Header: 'State',
    accessor: 'productState',
    Cell: props => <p>{props.value}</p>,
  }, {
    Header: 'Notes',
    accessor: 'productNotes',
    Cell: props => <ul style={{display: 'block', paddingLeft: '5px'}}>{motherNotes(props.value)}</ul>,
  }, {
    Header: 'Created',
    accessor: 'timestamp',
    Cell: props => <p>{new Date(props.value).toLocaleDateString("en-US")}</p>,
  }, {
    Header: 'Delete Mother',
    accessor: 'productID',
    Cell: props => 
      <button 
        onClick={() => deleteMother(props.value)} 
        className="submit-button w-button inside-box-btn">
        Delete
      </button>,
  }, {
    Header: 'Transfer Mother',
    Cell: props => 
      <button 
        onClick={() => console.log(props.value)} 
        className="submit-button w-button inside-box-btn">
        Transfer
      </button>,
  }]

  return (
    <Layout title="View Mothers">
      <DeleteModal show={modal} typeOf='mother' cancel={toggleModal} accept={deleteCallback} />
      <Heading heading="My Mothers" />
      <div className="viewMothers">
        <h2 className="heading-2">Available Mothers</h2>
        {loading ? <div className="loading-div">
            <ReactLoading type={'spin'} color={'#478978'} />
          </div> : <ReactTable 
            data={mothers}
            columns={columns}
            minRows={0}
            showPagination={false}
          />} 
      </div>
      <style jsx>{`
      .viewMothers {

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

export default connect(mapState)(ViewMothers);