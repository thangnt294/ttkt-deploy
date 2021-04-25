import React, {useState} from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export const Tab = ({ tabName, value, onChange }) => {
    const [selectedValue, setSelectedValue] = useState(value);

    const handleChange = value => {
        setSelectedValue(value);
        if (onChange) onChange(value);
    };

    return (
        <div className="tr__tab text-center">
            {tabName.map((name,idx) => {
                return (<div style={{width: 100 / tabName.length + '%'}} className={`tr__tab__button ${selectedValue === name ? 'active' : ''}`} key={idx} onClick={() => handleChange(name)}>{name}</div>)
            })}
        </div>
    )
};

Tab.propTypes = {
    tabName: PropTypes.array,
    value: PropTypes.string,
    onChange: PropTypes.func,
};
