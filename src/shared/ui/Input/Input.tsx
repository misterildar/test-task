import clsx from 'clsx';
import React, { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react';

import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	tagType?: string;
	className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ tagType = 'input', placeholder, className, onChange, ...props }, ref) => {
		return (
			<input
				ref={ref}
				type={tagType}
				placeholder={placeholder}
				onChange={onChange}
				{...props}
				className={clsx(styles.input, className)}
			/>
		);
	}
);

Input.displayName = 'Input';
