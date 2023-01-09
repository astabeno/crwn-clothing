import ProductCard from '../product-card/product-card.component'

import {CategoryPreviewContainer, Title, Preview} from './category-preview.styles';
import useWindowDimensions from '../../utils/viewportDimension'

const CategoryPreview = ({title, products}) => {

    const { width } = useWindowDimensions();

    const numItem = () => {
        if (width > 1060) return 4;
        if (width < 1060 && width > 570 ) return 2;
        if (width < 570 ) return 1;
    }

    return (
        <CategoryPreviewContainer>
            <h2>
                <Title to={`/shop/${title}`}>{title.toUpperCase()}</Title>
            </h2>
            <Preview>
                {   
                    products.filter((_, idx) => idx < numItem() )
                    .map((product => 
                        <ProductCard key={product.id} product={product} />
                ))}
            </Preview>
        </CategoryPreviewContainer>
)}

export default CategoryPreview;