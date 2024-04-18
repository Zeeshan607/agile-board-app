


const FormRow = ({ type, name, labelText, defaultValue, onChange }) => {
  return (
    <div className="form-group">
      
          <label htmlFor={name} className='form-label'>
            {labelText || name}
          </label>
          <input
            type={type}
            id={name}
            name={name}
            className='form-control'
            defaultValue={defaultValue || ''}
            onChange={onChange}
            required
          />
     
    </div>
  
  );
};
export default FormRow;
