'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const ScrollToTopOnRouteChange = () => {
	const pathname = usePathname();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);
	return null;
};
