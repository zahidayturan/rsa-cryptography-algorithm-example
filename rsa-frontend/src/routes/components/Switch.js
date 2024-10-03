import React from 'react';
import '../css/switch.css';

const Switch = ({ isOn, handleToggle ,id}) => {
    return (
        <>
            <input
                checked={isOn}
                onChange={handleToggle}
                className="react-switch-checkbox"
                id={id}
                type="checkbox"
            />
            <label
                className="react-switch-label"
                htmlFor={id}
                style={{borderColor :isOn ? 'var(--green-color-1)' : 'rgb(184,184,184)'}}
            >
                <span className={`react-switch-button`} style={{
                    background: isOn ? 'var(--green-color-1)' : 'rgb(184,184,184)',
                }} />
            </label>
        </>
    );
};

export default Switch;
