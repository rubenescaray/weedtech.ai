import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import QRCode from 'qrcode.react'
import Layout from '../components/layout'
import Link from 'next/link'
import Select from 'react-select'
import Heading from '../components/heading';
import httpClient, { selectStyles, options, selectTheme } from '../config'

function Products({ auth }) {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([{}])

  useEffect(() => {
    const user_token = auth.token !== null ? auth.token : localStorage.getItem('token');
    const fetchData = async () => {
      await httpClient.get(`myProducts/${user_token}`)
        .then(res => {
          console.log(res)
          setProducts(res.data.success)
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

  const columns = [{
    Header: 'QR Code',
    accessor: 'productID',
    Cell: props => <QRCode value={props.value ? props.value : 'ABCDEFGHIJK'} size="50" />,
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
    Cell: props => <p><a>Delete</a></p>,
  }, {
    Header: 'Destroy',
    Cell: props => <p><a>Destroy</a></p>,
  }, {
    Header: 'Transfer',
    Cell: props => <p><a>Transfer</a></p>,
  }, {
    Header: 'Add to batch',
    Cell: props => <button>Add to batch</button>,
  }]

  return (
    <Layout title={'My Products'}>
      <Heading heading={'My Products'}/>
      <div className="products">
        <h3 className="products-heading">Choose an active batch here</h3>
        <div className="select-product">
          <Select 
            options={options} 
            styles={selectStyles} 
            theme={selectTheme}
          />
        </div>
        <h2 className="heading-2">My Products</h2>
        <ReactTable
          style={{
            marginLeft: '-100px',
            marginRight: '-100px'
          }}
          loading={loading}
          data={products}
          columns={columns}
          minRows={0}
        />
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