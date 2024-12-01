import { Spinner, SubmitButton } from "../../../utils/styles";

export const ButtonSpinner = ({ titel ='إضافة',isPending, bgColor='#0062ff' }) => {
  return (
    <SubmitButton type="submit" bgColor={bgColor}>
      {isPending && <Spinner />}
      <span> {titel}</span>
    </SubmitButton>
  );
};
