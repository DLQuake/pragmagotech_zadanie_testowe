import Frog from '../Frog/Frog';
import './Lake.css';

const Lake = ({ frogs, onSelectFrog, onSelectEmptyField, selectedCells }) => {
    const lakeCols = 10;
    const lakeRows = 6;

    const handleCellSelect = (row, col) => {
        const frog = frogs.find(f => f.row === row && f.col === col);
        if (frog) {
            onSelectFrog(frog);
        } else {
            onSelectEmptyField(row, col);
        }
    };

    return (
        <div className="table-container">
            <table className="table is-bordered is-striped is-fullwidth is-narrow" id="lake">
                <thead>
                    <tr>
                        <th colSpan={lakeCols} className="has-text-centered">Lake</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(lakeRows)].map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {[...Array(lakeCols)].map((_, colIndex) => {
                                const frog = frogs.find(f => f.row === rowIndex && f.col === colIndex);
                                const isSelected = selectedCells.some(cell => cell.row === rowIndex && cell.col === colIndex);

                                return (
                                    <td key={`${rowIndex}-${colIndex}`} className={`has-text-centered ${isSelected ? 'selected' : ''}`}>
                                        {frog ? (
                                            <Frog
                                                type={frog.type}
                                                isSelected={isSelected}
                                                onSelect={() => handleCellSelect(rowIndex, colIndex)}
                                            />
                                        ) : (
                                            <label className={`cell ${isSelected ? 'selected' : ''}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => handleCellSelect(rowIndex, colIndex)}
                                                />
                                                <span className={`checkbox ${isSelected ? 'is-checked' : ''}`}></span>
                                            </label>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Lake;
