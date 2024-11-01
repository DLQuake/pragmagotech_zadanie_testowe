import Frog from '../Frog/Frog';
import './Legend.css';

const Legend = () => {
    return (
        <div className="legend">
            <h3 className='title is-size-4'>Legend</h3>
            <ul>
                <li>
                    <Frog type="male" />
                    <strong>Male Frog</strong>
                </li>
                <li>
                    <Frog type="female" />
                    <strong>Female Frog</strong>
                </li>
            </ul>
        </div>
    );
};

export default Legend;
