const EmploymentType = props => {
  const {list, onClickFullTime} = props
  const {employmentTypeId, label} = list
  const changeCheckbox = () => {
    onClickFullTime(employmentTypeId)
  }
  return (
    <>
      <button
        type="button"
        onClick={changeCheckbox}
        className="checkbox-button"
      >
        <input
          type="checkbox"
          id={employmentTypeId}
          name={employmentTypeId}
          value={employmentTypeId}
        />
        <label htmlFor={employmentTypeId}> {label}</label>
      </button>
      <br />
    </>
  )
}

export default EmploymentType
