import { useContext } from 'react'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import { CartContext } from '../../contexts/cart.context'

import './cart-icon.styles.scss'

// import { CartContext } from '../../contexts/cart.context'

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartItemCount } = useContext(CartContext)

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

    return (
        <div className="cart-icon-container">
            <ShoppingIcon 
                className='shopping-icon'
                onClick={toggleIsCartOpen}
            />
            <span className='item-count'>{cartItemCount}</span>
        </div>
    )
}

export default CartIcon;