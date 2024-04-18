import { useNavigation } from 'react-router-dom';
const SubmitBtn = ({ formBtn, onClick, text }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <div className="row mx-0 mt-3">
      <div className="col-12 text-end">
          <button
          type='button'
          className={`btn btn-block btn-primary ${formBtn && 'form-btn'} `}
          disabled={isSubmitting}
          onClick={onClick}
        >
          {isSubmitting ? 'submitting' : text}
        </button>
      </div>
    </div>
   
  );
};
export default SubmitBtn;
