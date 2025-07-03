import { useEffect, useState } from 'react';

import styles from './ScrollToTopButton.module.scss';

export const ScrollToTopButton = () => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const onScroll = () => setVisible(window.scrollY > 300);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

	if (!visible) return null;

	return (
		<button
			aria-label='Наверх'
			onClick={scrollToTop}
			className={styles.button}
		>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='32'
				height='32'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			>
				<path d='M12 23V5' />
				<path d='M5 12l7-7 7 7' />
			</svg>
		</button>
	);
};
