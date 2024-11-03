import './Frog.css';

const Frog = ({ id, type, isSelected, onSelect, characteristics = [], showTooltip = true }) => {
    return (
        <label
            className={`frog ${type} ${isSelected ? 'selected' : ''}`}
            title={showTooltip ? `ID: ${id}\nType: ${type}\nCharacteristics: ${characteristics.join(', ')}` : ''}
        >
            <input
                type="checkbox"
                checked={isSelected}
                onChange={onSelect}
            />
            <span className={`frog-indicator ${type}`}></span>
        </label>
    );
};

export default Frog;
