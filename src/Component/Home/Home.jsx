import React, { useEffect } from 'react'
import "./Home.css"
import { useDispatch, useSelector } from 'react-redux'
import { filterProductCategoryAsync, getProductAsync } from '../../Redux-rtk/Slice/ProductSlice/ProductSlice'
import { Link } from 'react-router-dom'

const Home = () => {
  const dispatch = useDispatch()
  const product = useSelector((state) => state.products.productList)
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
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="home">

      <div className="row">
        <div className="filter">

          <div className="row mt-3">
            <div className="col-lg-10 col-md-12 col-sm-12">
              <input className="search-btn" type="search" placeholder='Start Typing To Search...' /><span className='search-span'><i class="bi bi-search"></i></span>
            </div>
            <div className="col-lg-1 col-lg-2 col-lg-2">
              <select class=" p-1" onChange={filterChangeByCategory}
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
        {
          product.map((item) => (
            <div className="col-lg-3 col-md-6 col-sm-12 text-center">
              <div class="card mt-4" >
                <Link to={`/productdetail/${item.id}`}>
                <img src={item.productimg} class="card-img-top" alt="..." /></Link>
                <div class="card-body">
                  <h5 class="card-title">{item.productname}</h5>
                  <p class="card-text">{item.brand}</p>
                  <p class="card-text">{item.productdescription}</p>
                  <span class="card-text text-decoration-line-through">$ {item.price}</span>
                  <span class="card-text ms-3">$ {item.discountprice}</span>
                </div>
                
              </div>
            </div>
          ))
        }
      </div>
    </div>


  )
}

export default Home