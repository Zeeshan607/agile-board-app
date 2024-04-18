const FormRowBoardsSelect = ({ name, list, defaultValue = "", onChange }) => {
  return (
    <div className="form-row">
      <select
        name={name}
        id={name}
        className="form-select"
       defaultValue={"--select Board--"}
        onChange={onChange}
      >
         {/* <option value={null} disabled>
           --select Boards--
          </option> */}
        {list.length ? (
          list.map((itemValue) => {
            return (
              <option key={itemValue.id} value={itemValue.id}>
                {itemValue.name}
              </option>
            );
          })
        ) : (
          <option value={null} disabled>
            0 board found
          </option>
        )}
      </select>
    </div>
  );
};
export default FormRowBoardsSelect;
