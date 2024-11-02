import Controls from './components/Controls/Controls';
import TaskContent from './components/TaskContent/TaskContent';
import Legend from './components/Legend/Legend';
import Lake from './components/Lake/Lake';
import './App.css';
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher';
import useFrogGame from './hooks/useFrogGame';

function App() {
	const {
		selectedCells,
		frogs,
		handleSelectFrog,
		handleSelectEmptyField,
		handleJump,
		handleReproduce,
	} = useFrogGame();

	return (
		<section className="section">
			<div className="container">
				<h1 className="title has-text-centered">Lake Frogs Game</h1>
				<ThemeSwitcher />
				<TaskContent />
				<div className="columns p-3">
					<div className="column box notification m-0">
						<Lake
							frogs={frogs}
							onSelectFrog={handleSelectFrog}
							onSelectEmptyField={handleSelectEmptyField}
							selectedCells={selectedCells}
						/>
					</div>

					<div className="column box notification is-2">
						<Legend />
						<Controls onJump={handleJump} onReproduce={handleReproduce} />
					</div>
				</div>
			</div>
		</section>
	);
}

export default App;