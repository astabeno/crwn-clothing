import { useContext } from 'react'

//import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import { CartContext } from '../../contexts/cart.context'

import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles'

// import { CartContext } from '../../contexts/cart.context'

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartItemCount } = useContext(CartContext)

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

    return (
        <CartIconContainer>
            <ShoppingIcon onClick={toggleIsCartOpen} />
            <ItemCount>{cartItemCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;