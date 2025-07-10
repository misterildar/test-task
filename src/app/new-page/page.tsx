'use client';

const NewPage = () => {
	return (
		<div>
			page
			<button onClick={() => window.history.back()}>back</button>
		</div>
	);
};

export default NewPage;
