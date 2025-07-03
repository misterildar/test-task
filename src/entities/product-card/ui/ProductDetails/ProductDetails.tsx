'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Button, CounterButton } from '@/shared/ui';
import { useProduct } from '../../model/useProduct';
import { ProductDetailsProps } from '../../model/types';
import { Basket, useOrderStore } from '@/entities/basket';
import { PLACEHOLDER_IMAGE } from '@/shared/lib';
import { ModalDetails } from '../ModalDetails/ModalDetails';
import { CARD_MESSAGES } from '@/entities/product-card/consts/messages';

import styles from './ProductDetails.module.scss';

export const ProductDetails = ({ productId }: ProductDetailsProps) => {
	const { product, status, setStatus } = useProduct(productId);

	const { id, title, price, image_url, description } = product;

	const [src, setSrc] = useState<string | null>(null);

	useEffect(() => {
		if (image_url && image_url.trim() !== '') {
			setSrc(image_url);
		} else {
			setSrc(null);
		}
	}, [image_url]);

	const setCart = useOrderStore((state) => state.setCart);

	const cart = useOrderStore((state) => state.cart);

	const handleAddToCart = () => {
		setCart({ id, title, price, quantity: 1 });
	};

	const showCounter = cart.length > 0;

	const isModalOpen = ['isLoading', 'error'].includes(status);

	const handleCloseModal = () => {
		setStatus('ready');
	};

	return (
		<div className={styles.detailsContainer}>
			<Basket />
			<div className={styles.card}>
				<div className={styles.container}>
					{src ? (
						<Image
							src={src}
							alt={title || CARD_MESSAGES.altImage}
							width={481}
							height={566}
							onError={() => setSrc(PLACEHOLDER_IMAGE)}
							className={styles.image}
							unoptimized
							priority={true}
						/>
					) : (
						<div className={styles.imagePlaceholder}>{CARD_MESSAGES.imageNotFound}</div>
					)}
					<div className={styles.textContainer}>
						<h2 className={styles.title}>{title}</h2>
						<p className={styles.description}>{description}</p>
						<p className={styles.price}>
							{CARD_MESSAGES.price} {price} ₽
						</p>
					</div>
				</div>
				<div className={styles.buttonContainer}>
					{showCounter ? (
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
			</div>
			<ModalDetails
				status={status}
				onClose={handleCloseModal}
				isModalOpen={isModalOpen}
			/>
		</div>
	);
};
