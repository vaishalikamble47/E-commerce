import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./ProductDetail.css"
import { useDispatch, useSelector } from 'react-redux'
import { getSingleProductAsync } from '../../Redux-rtk/Slice/ProductSlice/ProductSlice'
import { createCartAsync, getCartDataAsync, getCartDatabyUseridAsync } from '../../Redux-rtk/Slice/CartSlice/CartSlice'
const ProductDetail = () => {
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1)
    const { id } = useParams()

    const dispatch = useDispatch()
    const product = useSelector((state) => state.products.singleProduct)

    const decreaseCount = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }
    const increaseCount = () => {
        setQuantity(quantity + 1)
    }

    const addToCart = () => {
        const user = localStorage.getItem('user')
        const data = JSON.parse(user)
        if (data) {
            const cartdata={
                userid:data.id,
                productid:product.id,
                image:product.productimg,
                productname:product.productname,
                brand:product.brand,
                category:product.category,
                productdescription:product.productdescription,
                productbrief:product.productbrief,
               price:product.price,
                discountprice:product.discountprice,
                quantity:quantity,
            }
            dispatch(createCartAsync(cartdata))
            dispatch((getCartDataAsync()))
            const user = localStorage.getItem('user')
            const dataUser = JSON.parse(user)
            dispatch(getCartDatabyUseridAsync(dataUser.id))
        } else {
            navigate('/login')
        }

    }
    useEffect(() => {
        dispatch(getSingleProductAsync(id))
    }, [id])

    return (
        <div>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-lg-6 col-md-6 col-sm-12 p-img mt-5 ">
                        <img src={product.productimg} alt="" />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mt-5  text-start  p-detail">

                        <h5 class="card-title">{product.productname}</h5>
                        <p class="card-text">{product.brand}</p>
                        <p class="card-text product-brief"> {product.productbrief}</p>
                        <span class="card-text text-decoration-line-through">Price : ${product.price}</span><br />
                        <span class="card-text ">Discount Price :${product.discountprice}</span>
                        <div className='p-quntity' >Quantity :
                            <span onClick={decreaseCount}><i class="bi bi-dash"></i> </span>
                            <input type="number" value={quantity} />
                            <span onClick={increaseCount}><i class="bi bi-plus-lg" ></i></span></div>
                        <button type="button" class="btn btn-success" onClick={addToCart}>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail