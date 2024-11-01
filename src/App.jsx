import { useState } from 'react';
import Controls from './components/Controls/Controls';
import TaskContent from './components/TaskContent/TaskContent';
import Legend from './components/Legend/Legend';
import Lake from './components/Lake/Lake';

function App() {
	const [selectedCells, setSelectedCells] = useState([]);
	const [selectedFrog, setSelectedFrog] = useState(null);
	const [frogs, setFrogs] = useState([
		{ id: 1, row: 0, col: 0, type: 'male', characteristics: ['tall', 'slim'] },
		{ id: 2, row: 0, col: 1, type: 'female', characteristics: ['short', 'fat'] },
	]);

	const handleSelectFrog = (frog) => {
		setSelectedFrog(frog);
		setSelectedCells([{ row: frog.row, col: frog.col, frog }]);
	};

	const handleSelectEmptyField = (row, col) => {
		if (selectedFrog) {
			setSelectedCells((prevSelectedCells) => [...prevSelectedCells, { row, col }]);
		}
	};

	const updateFrogPosition = (oldRow, oldCol, newRow, newCol) => {
		setFrogs((prevFrogs) =>
			prevFrogs.map(frog =>
				frog.row === oldRow && frog.col === oldCol
					? { ...frog, row: newRow, col: newCol }
					: frog
			)
		);
	};

	const isValidJump = (frog, from, to) => {
		const rowDiff = Math.abs(from.row - to.row);
		const colDiff = Math.abs(from.col - to.col);

		// Męska żaba: może skakać maksymalnie 3 pola (w tym po przekątnej)
		if (frog.type === 'male') {
			return (rowDiff <= 3 && colDiff <= 3) &&
				(rowDiff === colDiff || rowDiff === 0 || colDiff === 0 || (rowDiff + colDiff <= 3)) &&
				(rowDiff <= 1 || colDiff <= 1); // Upewnij się, że to sąsiadujące pola
		}
		// Żeńska żaba: może skakać maksymalnie 2 pola (w tym po przekątnej)
		else if (frog.type === 'female') {
			return (rowDiff <= 2 && colDiff <= 2) &&
				(rowDiff === colDiff || rowDiff === 0 || colDiff === 0 || (rowDiff + colDiff <= 2)) &&
				(rowDiff <= 1 || colDiff <= 1); // Upewnij się, że to sąsiadujące pola
		}
		return false;
	};


	const handleJump = () => {
		if (selectedCells.length === 2) {
			const [from, to] = selectedCells;
			const oldRow = from.row;
			const oldCol = from.col;

			if (from.frog && isValidJump(from.frog, from, to)) {
				const targetFrog = frogs.find(frog => frog.row === to.row && frog.col === to.col);
				if (!targetFrog) {
					updateFrogPosition(oldRow, oldCol, to.row, to.col);
				} else {
					console.log('Nie można skoczyć na zajętą komórkę.');
				}
			} else {
				console.log('Nie można wykonać skoku.');
			}
		}
		setSelectedCells([]);
		setSelectedFrog(null);
	};

	const handleReproduce = () => {
		console.log('Rozmnażanie: wybrano komórki:', selectedCells);
		setSelectedCells([]);
	};

	return (
		<section className="section">
			<div className="container">
				<h1 className="title has-text-centered">Lake Frogs Game</h1>
				<TaskContent />
				<div className="columns centerColumns">
					<div className="column">
						<Lake
							frogs={frogs}
							onSelectFrog={handleSelectFrog}
							onSelectEmptyField={handleSelectEmptyField}
							selectedCells={selectedCells}
						/>
					</div>

					<div className="column is-flex is-flex-direction-column">
						<Legend />
						<Controls onJump={handleJump} onReproduce={handleReproduce} />
					</div>
				</div>

			</div>
		</section>
	);
}

export default App;