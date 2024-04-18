
const FormTextarea = ({ type, name, labelText, defaultValue, onChange }) => {
    return (
      <div className="form-group">
        
            <label htmlFor={name} className='form-label'>
              {labelText || name}
            </label>
            <textarea
              id={name}
              name={name}
              className='form-control'
              defaultValue={defaultValue || ''}
              onChange={onChange}
              required
            ></textarea>
       
      </div>
    
    );
  };
  export default FormTextarea ;
  