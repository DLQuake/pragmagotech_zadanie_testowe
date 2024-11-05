import "./Controls.css"

const Controls = ({ onJump, onReproduce }) => {
    return (
        <div className="mt-5">
            <h3 className="title is-size-4">Actions</h3>
            <div className="buttons">
                <button className="button is-primary" onClick={onJump}>Jump</button>
                <button className="button is-info" onClick={onReproduce}>Reproduce</button>
            </div>
        </div>
    );
};

export default Controls;
