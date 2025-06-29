import { IMaskInput } from 'react-imask';
import React, { forwardRef, Ref } from 'react';
import clsx from 'clsx';
import { Input } from '@/shared/ui';
import inputStyles from '@/shared/ui/Input/Input.module.scss';

interface InputMaskProps {
	onChange: (value: string) => void;
	name: string;
	value: string;
	disabled?: boolean;
	className?: string;
	placeholder?: string;
}

export const PhoneMask = forwardRef<HTMLInputElement, InputMaskProps>(
	({ onChange, className, ...props }, ref) => {
		return (
			<IMaskInput
				className={clsx(inputStyles.input, className)}
				{...props}
				mask='+{7} (000) 000-00-00'
				radix='.'
				unmask={true}
				onAccept={(value) => onChange(value as string)}
				overwrite
				inputRef={ref as Ref<HTMLInputElement>}
				// @ts-expect-error IMaskInput doesn't properly type the 'as' prop with custom components
				as={Input}
			/>
		);
	}
);

PhoneMask.displayName = 'PhoneMask';
