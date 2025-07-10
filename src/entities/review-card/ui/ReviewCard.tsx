import { ReviewCardProps } from '../model/types';

import styles from './ReviewCard.module.scss';

export const ReviewCard = ({ text }: ReviewCardProps) => {
	return (
		<div
			className={styles.card}
			dangerouslySetInnerHTML={{ __html: text }}
		/>
	);
};

ReviewCard.displayName = 'ReviewCard';
