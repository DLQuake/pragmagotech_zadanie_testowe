import './Lake.css';
import Frog from '../Frog/Frog';

const Lake = ({ frogs, onSelectFrog, onSelectEmptyField, selectedCells }) => {
    const lakeRows = 6;
    const lakeCols = 10;

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
            <table id="lake" className='table is-fullwidth is-bordered'>
                <thead>
                    <tr>
                        <th colSpan={lakeCols}>Lake</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(lakeRows)].map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {[...Array(lakeCols)].map((_, colIndex) => {
                                const frog = frogs.find(f => f.row === rowIndex && f.col === colIndex);
                                const isSelected = selectedCells.some(cell => cell.row === rowIndex && cell.col === colIndex);

                                return (
                                    <td key={`${rowIndex}-${colIndex}`} className="has-text-centered">
                                        {frog ? (
                                            <Frog
                                                id={frog.id}
                                                type={frog.type}
                                                isSelected={isSelected}
                                                onSelect={() => handleCellSelect(rowIndex, colIndex)}
                                                characteristics={frog.characteristics}
                                            />
                                        ) : (
                                            <label className={`cell ${isSelected ? 'selected' : ''}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => handleCellSelect(rowIndex, colIndex)}
                                                />
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