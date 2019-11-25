import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import ReactLoading from "react-loading";
import ReactTable from 'react-table'
import QRCode from 'qrcode.react'
import DeleteModal from '../components/modals/deleteModal'
import TransferModel from '../components/modals/transferModal'
import AddToBatchModal from '../components/modals/addToBatchModal'
import Layout from '../components/layout'
import Link from 'next/link'
import Select from 'react-select'
import Heading from '../components/heading';
import httpClient, { selectStyles, options, selectTheme } from '../config'

function Products({ auth }) {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([{}])
  const [batches, setBatches] = useState([{}])
  const [deleteModal, setDelModal] = useState(false)
  const [destroyModal, setDesModal] = useState(false)
  const [transferModal, setTransferModal] = useState(false)
  const [addToBatch, setAddToBatch] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState('')
  const [selectedBatch, setSelectedBatch] = useState('')

  useEffect(() => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token');
    
    const fetchData = async () => {
      await httpClient.get(`myProducts/${user_token}`)
        .then(res => {
          setProducts(res.data.success)
        })
        .catch(error => {
          console.log(error)
        })

        await httpClient.get(`findBatchesDetails/${user_token}`)
        .then(res => {

          setBatches(formatBatches(res.data))
          //setBatches(res.data)
        })
        .catch(error => {
          console.log(error)
        }) 

        setLoading(false)
    }
    setTimeout(fetchData(), 2000)
  }, []);

  const splitID = (string) => {
    if (string === undefined) {
      return
    }

    const productIndex = products.filter(obj => {
      return obj.productID === string
    });

    const id = productIndex[0]._id;

    return <Link href='/productDetails/[pid]' as={`/productDetails/${string}`}>
      <p className="table-link">{`${string.slice(0,4)}-${string.slice(4,8)}-${string.slice(8,13)}`}</p>
    </Link>
  }

  const productNotes = (notes) => {
    if (notes === [] || notes === undefined) {
      return <li></li>
    }
    return notes.map(
      note => <li>*{note}</li>
    )
  }

  const createdTime = (createdAt) => {
    return new Date(createdAt).toLocaleDateString("en-US");
  }

  const formatBatches = (batches) => {
    let formattedBatches = []

    batches.map(batch => {
      formattedBatches.push({
        value: batch.batchID,
        label: batch.batchName,
      })
    })

    return formattedBatches
  }

  const onChangeSelect = (data) => {
    setSelectedBatch(data.value)
  }

  const deleteProduct = (productId) => {
    setSelectedProduct(productId)
    toggleDelModal()
  }

  const destroyProduct = (productId) => {
    setSelectedProduct(productId)
    toggleDesModal()
  }

  const transferProduct = (productId) => {
    setSelectedProduct(productId)
    toggleTransModal()
  }

  const addProductToBatch = (productId) => {
    setSelectedProduct(productId)
    toggleAddModal()
  }

  const toggleTransModal = () => {
    setTransferModal(!transferModal)
  }

  const toggleDelModal = () => {
    setDelModal(!deleteModal)
  }

  const toggleDesModal = () => {
    setDesModal(!destroyModal)
  }

  const toggleAddModal = () => {
    setAddToBatch(!addToBatch)
  }

  const deleteCallback = () => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token');
    const newProducts = products.filter(product => product.productID != selectedProduct)

    setProducts(newProducts)
    httpClient.get(`deleteProduct/${user_token}/${selectedProduct}`)
      .then(res => {
        console.log(res)
        toggleDelModal()
      })
      .catch(error => {
        console.log(error)
      })
  }

  const destroyCallback = () => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token');
    const newProducts = products.filter(product => product.productID != selectedProduct)

    setProducts(newProducts)
    httpClient.get(`productDestroy/${user_token}/${selectedProduct}`)
      .then(res => {
        console.log(res)
        toggleDesModal()
      })
      .catch(error => {
        console.log(error)
      })
  }

  const transferCallback = (newOwner) => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token');
    console.log(user_token)
    console.log(newOwner)
    console.log(selectedProduct)

    /* httpClient.get(`productDestroy/${user_token}/${selectedProduct}`)
      .then(res => {
        console.log(res)
        toggleDesModal()
      })
      .catch(error => {
        console.log(error)
      }) */
  }

  const addToBatchCallback = () => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token');

    console.log(user_token)
    console.log(selectedBatch)
    console.log(selectedProduct)

    httpClient.get(`addToBatch/${user_token}/${selectedBatch}/${selectedProduct}`)
      .then(res => {
        console.log(res)
        toggleAddModal()
      })
      .catch(error => {
        console.log(error)
        toggleAddModal()
      })
  }

  const columns = [{
    Header: 'QR Code',
    accessor: 'productID',
    Cell: props => <QRCode value={props.value ? props.value : 'ABCDEFGHIJK'} size={window.innerWidth > 600 ? "50" : "25"} />,
  },{
    Header: 'Product ID',
    accessor: 'productID',
    Cell: props => splitID(props.value),
  }, {
    Header: 'Name',
    accessor: 'productName',
    Cell: props => <p>{props.value}</p>,
  }, {
    Header: 'State',
    accessor: 'productState',
    Cell: props => <p>{props.value}</p>,
  },  {
    Header: 'Notes',
    accessor: 'productNotes',
    Cell: props => <ul style={{display: 'block', paddingLeft: '5px'}}>{productNotes(props.value)}</ul>,
  },{
    Header: 'Location (Name/ID)',
    accessor: 'notes',
    Cell: props => <p>Not set</p>,
  }, {
    Header: 'Created',
    accessor: 'timestamp',
    Cell: props => <p>{createdTime(props.value)}</p>,
  }, {
    Header: 'Delete',
    accessor: 'productID',
    Cell: props => 
      <button 
        onClick={() => deleteProduct(props.value)} 
        className="submit-button w-button inside-box-btn">
        Delete
      </button>,
  }, {
    Header: 'Destroy',
    accessor: 'productID',
    Cell: props => 
      <button 
        onClick={() => destroyProduct(props.value)} 
        className="submit-button w-button inside-box-btn">
        Destroy
      </button>,
  }, {
    Header: 'Transfer',
    accessor: 'productID',
    Cell: props => 
      <button 
        onClick={() => transferProduct(props.value)} 
        className="submit-button w-button inside-box-btn">
        Transfer
      </button>,
  }, {
    Header: 'Add to batch',
    accessor: 'productID',
    Cell: props => 
      <button 
        onClick={() => addProductToBatch(props.value)} 
        className="submit-button w-button inside-box-btn">
        Add
      </button>,
  }]

  return (
    <Layout noContent title={'My Products'}>
      <DeleteModal show={deleteModal} typeOf='product' cancel={toggleDelModal} accept={deleteCallback} />
      <DeleteModal show={destroyModal} typeOf='product' cancel={toggleDesModal} accept={destroyCallback} destroy={true} />
      <AddToBatchModal show={addToBatch} cancel={toggleAddModal} accept={addToBatchCallback} 
        selectedBatch={selectedBatch == '' ? false : true} />
      <TransferModel show={transferModal} cancel={toggleTransModal} accept={transferCallback} />
      <Heading heading={'My Products'}/>
      <div className="products">
        <h2 className="heading-2">My Products</h2>
        {!loading && <h3 className="products-heading">Choose an active batch here</h3>}
        {!loading && <div className="select-product">
          <Select 
            options={batches} 
            styles={selectStyles} 
            theme={selectTheme}
            onChange={onChangeSelect}
          />
        </div>}
        {loading ? <div className="loading-div">
          <ReactLoading type={'spin'} color={'#478978'} />
        </div> :
        <ReactTable
          
          loading={loading}
          data={products}
          columns={columns}
          minRows={0}
        />}
      </div>
      <style jsx>{`
        .products {
          text-align: center;
        }
        
        .products-heading {
          margin-bottom: 30px;
        }
        .select-product {
          margin-bottom: 30px;
        }
        .ReactTable {
          margin-right: -100px !important;
          margin-left: -100px !important;
        }

        @media only screen and (max-width: 600px) {
          .products-heading {
            font-size: 1rem;
          }
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

export default connect(mapState)(Products);