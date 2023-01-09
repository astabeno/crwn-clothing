import {CartItemContainer,
        ItemPicture,
        ItemDetails,
        ItemName,
} from './cart-item.styles'

const CartItem = ({ cartItem }) => {

    const { imageUrl, price, name, quantity } = cartItem;
    
    return(
        <CartItemContainer>
            <ItemPicture src={imageUrl} alt={name} />
            <ItemDetails>
                <ItemName> {name} </ItemName>
                <span className='price'> {quantity} x ${price}</span>
            </ItemDetails>
        </CartItemContainer>
    )
}

export default CartItem;