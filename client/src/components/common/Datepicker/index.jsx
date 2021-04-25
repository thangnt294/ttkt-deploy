import React, { useState, forwardRef, useRef, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import './index.scss';
import { Input } from 'components';
import { EMPTY } from 'actions';

export const Datepicker = ({
    className,
    name, label,
    start, end, 
    minDate = new Date(),
    maxDate,
    icon="icon-calendar", 
    placeholder = 'Choose a date', 
    render, 
    refs = () => {},
    defaultValue,
    onDatesChange = () => {},
    error,
    errorMessage,
    range = false, 
    disabled = false,
    ...rest}) => {
    const [startDate, setStartDate] = useState(start);
    const [endDate, setEndDate] = useState(end);
    const [inputValue, setInputValue] = useState();
    const calendarRef = useRef(null);
    let datesInput = createRef();

    /*eslint-disable */
    useEffect(() => {
        if (start && !startDate) setStartDate(start);
    }, [start])

    useEffect(() => {
        if (end && !endDate) setEndDate(end);
    }, [end])

    useEffect(() => {
        if ((range && startDate && endDate) || (!range && startDate)) {
            const selectedDates = getStringDates(startDate);
            setInputValue(selectedDates.str);
        } else {
            setInputValue('');
        }
    }, [startDate, endDate])

    useEffect(() => {
        if (defaultValue === EMPTY) {
            setStartDate(null);
            setEndDate(null);
            setInputValue('');
        }
    }, [defaultValue])
    /*eslint-enable */

    const getStringDates = value => {
        const val = range ? {
            start: startDate ? moment(startDate).format('DD MMM YYYY') : '',
            end: endDate ? moment(endDate).format('DD MMM YYYY') : ''
        } : (value ? moment(new Date(value)).format('DD MMM YYYY') : '');
        return {
            val,
            str: range ? (!val.start || !val.end ? '' : (val.start === val.end ? val.start : `${val.start} - ${val.end}`)) : val
        };
    }

    const InputElement = forwardRef(({ value, onClick }, ref) => {
        const selectedDates = getStringDates(value);

        return render ? render(selectedDates.val, onClick, setStartDate) : (
            <div onClick={disabled ? null : onClick}>
                <Input
                    name={name}
                    icon={icon}
                    refs={r => {
                        datesInput = r;
                        if (refs) refs(r);
                    }}
                    autoComplete="off"
                    iconPosition="right"
                    placeholder={placeholder}
                    value={defaultValue === EMPTY ? '' : selectedDates.str}
                    onKeyDown={e => {
                        if (e.which === 8 || e.which === 46) {
                            handleDatesChange(null);
                        }
                    }}
                    onChange={e => {
                        const currentValue = e.target.value;
                        if (!currentValue) {
                            handleDatesChange(null);
                        }
                    }}
                />    
            </div>
        )
    });

    const triggerDirtyInput = () => {
        let event = new Event('input', { bubbles: true });
        datesInput.dispatchEvent(event);
    }

    const handleDateChange = date => {
        if (!date) {
            setStartDate(null);
            setEndDate(null);
            return;
        }
        setStartDate(date);
        triggerDirtyInput();
        
        if (onDatesChange) onDatesChange(date);
    }

    const handleDatesChange = dates => {
        if (!dates) {
            setStartDate(null);
            setEndDate(null);
            if (onDatesChange) onDatesChange(null);
            return;
        }
        const [start, end] = dates;
        if (!end && calendarRef && calendarRef.current) {
            setTimeout(() => calendarRef.current.setOpen(true), 0);
        }
        setStartDate(start);
        setEndDate(end);
        triggerDirtyInput();
        
        if (onDatesChange) onDatesChange(dates);
    }

    return (
        <div className={`${className} tr__datepicker ${disabled ? 'disabled' : ''}`}>
            {label && (
                <label htmlFor={name}>{label}</label>
            )}
            <DatePicker
                ref={calendarRef}
                minDate={minDate}
                maxDate={maxDate}
                selected={startDate}
                startDate={startDate}
                endDate={range ? endDate : null}
                onChange={range ? handleDatesChange : handleDateChange}
                customInput={<InputElement />}
                selectsRange={range}
                {...rest}
            />
            <p
                className={`error ${error && errorMessage && !inputValue ? 'active' : ''}`}
            >{errorMessage}</p>
        </div>
    )
};

Datepicker.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    render: PropTypes.func,
    range: PropTypes.bool,
    icon: PropTypes.string,
    start: PropTypes.any,
    end: PropTypes.any,
    refs: PropTypes.func,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    onDatesChange: PropTypes.func,
    minDate: PropTypes.any,
    maxDate: PropTypes.any,
    placement: PropTypes.string,
    disabled: PropTypes.bool
}