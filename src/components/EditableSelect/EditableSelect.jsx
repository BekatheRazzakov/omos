import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as SelectArrow } from "../../assets/select-arrow.svg";

const EditableSelect = ({
  label, type, name, value, onSubmit, required, loading, children, open,
}) => {
  const inputRef = useRef(null);
  const [state, setState] = useState('');
  
  useEffect(() => {
    setState(value);
  }, [value, open]);
  
  const onFocus = () => inputRef.current.focus();
  
  return (
    <form
      className='select-container'
      onClick={onFocus}
      onSubmit={e => onSubmit(e, state)}
    >
      <input type={type || 'text'}
        className='select-input'
        name={name}
        value={state}
        placeholder={label}
        ref={inputRef}
        required={required}
        autoComplete='off'
        onChange={e => setState(e.target.value)}
      />
      <div className='select-toggler'>
        <div className='select-arrow'><SelectArrow/></div>
      </div>
      <div className='select-options'>
        {loading ? <div
          className='select-option'
        >
          Загрузка...
        </div> : children.map((item) => (
          <div
            className={item.props?.className}
            value={item.props?.value}
            onMouseDown={() => {
              setState(item.props?.children);
              onSubmit(null, item.props?.children)
            }}
          >
            {item.props?.children}
          </div>
        ))}
      </div>
    </form>
  );
};

export default EditableSelect;