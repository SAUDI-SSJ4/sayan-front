import { Spinner } from "react-bootstrap";

export const MainSpinner = ({css = 'vh-100'}) => {
  return (
    <div className={`d-flex justify-content-center align-items-center ${css}`}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};
