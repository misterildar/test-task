import { ProductDetails } from '@/entities/product-card/ui/ProductDetails/ProductDetails';

interface Props {
	params: Promise<{
		id: string;
	}>;
}

const ProductPage = async ({ params }: Props) => {
	const resolvedParams = await params;

	return <ProductDetails productId={resolvedParams.id} />;
};

export default ProductPage;
