import clsx from 'clsx';
import styles from './Button.module.scss';

interface ButtonProps {
	text: string;
	onClick?: () => void;
	disabled?: boolean;
	loading?: boolean;
	className?: string;
	type?: 'button' | 'reset' | 'submit';
}

export const Button = ({
	text,
	onClick,
	disabled,
	loading,
	className,
	type = 'button',
}: ButtonProps) => {
	const disabledClass = disabled ? styles.disabled : '';

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={clsx(className, disabledClass, styles.button)}
		>
			{loading ? (
				<div
					className={styles.spinner}
					aria-label='loading'
				/>
			) : (
				<p>{text}</p>
			)}
		</button>
	);
};
