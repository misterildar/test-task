import { useOrderStore } from '../../model/store';
import { TABLE_MESSAGES } from '../../consts/messages';
import { basketTableColumns } from '../../consts/basketTableColumns';

import styles from './TableGoods.module.scss';

export const TableGoods = () => {
	const basketStore = useOrderStore((store) => store.cart);

	const sumTotal = basketStore.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<div className={styles.tableWrapper}>
			<table className={styles.table}>
				<thead>
					<tr>
						{basketTableColumns.map(({ key, label }) => (
							<th key={key}>{label}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{basketStore.map((item) => (
						<tr key={item.id}>
							{basketTableColumns.map(({ key, render }) => (
								<td key={key}>{render(item)}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<div className={styles.total}>
				<h2>{TABLE_MESSAGES.totalLabel}</h2>
				<h2>{sumTotal}</h2>
			</div>
		</div>
	);
};
