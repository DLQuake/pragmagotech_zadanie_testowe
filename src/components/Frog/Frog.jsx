import './Frog.css';

const Frog = ({ type, isSelected, onSelect }) => {
    return (
        <label className={`frog ${type} ${isSelected ? 'selected' : ''}`}>
            <input
                type="checkbox"
                checked={isSelected}
                onChange={onSelect}
            />
        </label>
    );
};

export default Frog;
