import Frog from '../Frog/Frog';
import './Legend.css';

const Legend = () => {
    return (
        <div className="legend">
            <h3 className='title is-size-4'>Legend</h3>
            <ul>
                <li>
                    <Frog type="male" showTooltip={false} />
                    <strong>Frog Male</strong>
                </li>
                <li>
                    <Frog type="female" showTooltip={false} />
                    <strong>Frog Female</strong>
                </li>
            </ul>
        </div>
    );
};

export default Legend;
