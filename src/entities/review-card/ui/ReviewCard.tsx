import { memo } from 'react';

import styles from './ReviewCard.module.scss';

export const ReviewCard = memo(({ text }: { text: string }) => {
	return (
		<div
			className={styles.card}
			dangerouslySetInnerHTML={{ __html: text }}
		/>
	);
});

ReviewCard.displayName = 'ReviewCard';
