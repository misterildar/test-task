import { memo } from 'react';
import { ReviewCardProps } from '../model/types';

import styles from './ReviewCard.module.scss';

export const ReviewCard = memo(({ text }: ReviewCardProps) => {
	return (
		<div
			className={styles.card}
			dangerouslySetInnerHTML={{ __html: text }}
		/>
	);
});

ReviewCard.displayName = 'ReviewCard';
