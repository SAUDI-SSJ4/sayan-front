import { Spinner, SubmitButton } from "../../../utils/styles";

export const ButtonSpinner = ({ titel ='إضافة',isPending, bgColor='#0062ff', isDisabled=false, addStyle="" }) => {
  return (
    <SubmitButton type="submit" bgColor={bgColor} disabled={isDisabled}>
      {isPending && <Spinner />}
      <span> {titel}</span>
    </SubmitButton>
  );
};
