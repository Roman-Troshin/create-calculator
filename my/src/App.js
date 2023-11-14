import styles from './App.module.css';
import { useState } from 'react';

export const App = () => {
	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

	const [value, setValue] = useState(0);
	const [resultColor, setResultColor] = useState(false);

	const countResult = (expression) => {
		if (expression.length) {

			const actions = expression
				.split(' ')
				.filter((symbol) => isFinite(symbol) === false);

				const onlyNumbers = expression
				.split(' ')
				.filter((symbol) => isFinite(symbol) === true)
				.map((number) => Number(number));

				actions.forEach((act) => {
				if (act === '-') {
					const result = onlyNumbers[0] - onlyNumbers[1];
					onlyNumbers.splice(0, 2, result);
				} else {
					const result = onlyNumbers[0] + onlyNumbers[1];
					onlyNumbers.splice(0, 2, result);
				}
			});

			setResultColor(resultColor ? null : !resultColor);
			return onlyNumbers[0];
		} else {
			setResultColor(resultColor ? !resultColor : null);
			return 0;
		}
	};

	const addDigit = (event) => {
		const li = event.target.closest('li');

		if (li) {
			setResultColor(resultColor ? !resultColor : null);
			setValue((updatedValue) =>
				updatedValue === 0 ? li.textContent : (updatedValue += li.textContent),
			);
		}
	}

	const doOperation = (event) => {
		const act = event.target.closest('li');
						if (act.textContent !== '=') {
							setResultColor(resultColor ? !resultColor : null);
							setValue(
								act.textContent === '-'
									? `${value} - `
									: act.textContent === '+'
									? `${value} + `
									: act.textContent === 'C'
									? 0
									: null,
							);
						} else if (act.textContent === '=') {
							setValue(() => countResult(value));
						}
	}

	return (
		<div className={styles.сontainer}>
			<div className={resultColor ? styles.result : styles.screen}>{value}</div>
			<div className={styles.gridContainer}>
				<ul
					className={styles.numbers}
					onClick={(evt) => {addDigit(evt)}}
				>
					{numbers.map((number) => (
						<li className={styles.li} key={number}>
							{number}
						</li>
					))}
				</ul>
				<ul
					className={styles.actions}
					onClick={(evt) => {doOperation(evt)}}
				>
					<li className={styles.li} key="-">
						-
					</li>
					<li className={styles.li} key="+">
						+
					</li>
					<li className={styles.li} key="=">
						=
					</li>
					<li className={styles.li} key="C">
						C
					</li>
				</ul>
			</div>
		</div>
	);
};
