'use client';

import { Cards } from '@/widgets/cards';
import { Basket } from '@/entities/basket';
import { Reviews } from '@/widgets/reviews';
import { ScrollToTopButton } from '@/shared/ui';
import { HOME_MESSAGES } from '../consts/messages';

import styles from './HomePage.module.scss';
import Link from 'next/link';

export const HomePage = () => {
	return (
		<div className={styles.section}>
			<div className={styles.title}>
				<h1 className={styles.h1}>{HOME_MESSAGES.title}</h1>
			</div>
			<Link href='/new-page'>To new page</Link>
			<Reviews />
			<Basket />
			<Cards />
			<ScrollToTopButton />
		</div>
	);
};
