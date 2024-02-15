import React, { useEffect, useState } from 'react'
import "./Home.css"
import { useDispatch, useSelector } from 'react-redux'
import { filterProductCategoryAsync, getProductAsync, setSearchTerm } from '../../Redux-rtk/Slice/ProductSlice/ProductSlice'
import { Link } from 'react-router-dom'

const Home = () => {
  const dispatch = useDispatch()
  const product = useSelector((state) => state.products.productList)
  const isloading = useSelector((state) => state.products.isLoading)

  const getData = () => {
    try {
      dispatch(getProductAsync())
    } catch (error) {
      console.log(error)
    }
  }
  const filterChangeByCategory = (e) => {
    const value = e.target.value
    if (value === "All") {
      dispatch(getProductAsync())
    } else {
      dispatch(filterProductCategoryAsync(value))
    }
  }
  const productSearch = (e) => {
    let value = e.target.value
    if (value.length > 0) {
      dispatch(setSearchTerm(value))
    } else {
      dispatch(setSearchTerm(value))
    }

  }
  useEffect(() => {
    getData()

  }, [])
  return (
    <div className="home">
      <div className="container">
        <div className="row">
          <div className="filter">

            <div className="row mt-3">
              <div className="col col-md-9 col-sm-7">
                <div className='ms-2 me-3'>
                  <input onChange={productSearch} type="search" className='p-2 form-control search-input' placeholder='Search Product ..' />
                </div>
              </div>
              <div className="col col-md-3 col-sm-4">
                <div>
                  <select class=" p-2 filter-btn" onChange={filterChangeByCategory}
                    aria-label="Default select example">
                    <option selected>Filter</option>
                    <option value="All">All</option>
                    <option value="women">women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                    <option value="accessories">Accessories</option>
                    <option value="footwere">Footwere</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {
            isloading ?
              <div className="container d-flex vh-100 justify-content-center align-items-center">

                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div> : null
          }
          {
            product.map((item) => (

              <div className="col-lg-3 col-md-6 col-sm-12 mt-5">
                <div className="card">
                  <div className='image-container'>
                    <Link to={`/productdetail/${item.id}`}>
                      <img src={item.productimg} className="img-thumbnail" alt="product image" /></Link>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{item.productname}</h5>
                    <p className="card-text">{item.brand}</p>
                    <span className="card-text text-decoration-line-through"> Price :$  {item.price}</span>
                    <span className="card-text ms-3"> Price : ${item.discountprice}</span>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>


  )
}

export default Home