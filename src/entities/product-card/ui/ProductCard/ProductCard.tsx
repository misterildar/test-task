import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

import { useOrderStore } from '@/entities/basket';
import { Button, CounterButton } from '@/shared/ui';
import { CARD_MESSAGES } from '../../consts/messages';
import { PLACEHOLDER_IMAGE } from '@/shared/lib';
import { Product } from '@/entities/product-card/model/types';

import styles from './ProductCard.module.scss';

export const ProductCard = ({
	id,
	title,
	price,
	image_url,
	description,
	priority = false,
}: Product) => {
	const [src, setSrc] = useState(image_url);

	const setCart = useOrderStore((state) => state.setCart);

	const cart = useOrderStore((state) => state.cart);

	const isInCart = cart.some((item) => item.id === id);

	const handleAddToCart = () => {
		setCart({ id, title, price, quantity: 1 });
	};

	return (
		<div className={styles.card}>
			<Link
				href={`/product-page/${id}`}
				target='_blank'
				scroll={false}
				className={styles.link}
			>
				<div className={styles.imageWrapper}>
					<Image
						src={src}
						alt={title}
						fill
						style={{ objectFit: 'contain' }}
						onError={() => setSrc(PLACEHOLDER_IMAGE)}
						unoptimized
						priority={priority}
					/>
				</div>
				<h2 className={styles.title}>{title}</h2>
				<p className={styles.description}>{description}</p>
				<p className={styles.price}>
					{CARD_MESSAGES.price} {price} ₽
				</p>
			</Link>
			{isInCart ? (
				<CounterButton
					id={id}
					title={title}
					price={price}
				/>
			) : (
				<Button
					text={CARD_MESSAGES.buy}
					onClick={handleAddToCart}
				/>
			)}
		</div>
	);
};
