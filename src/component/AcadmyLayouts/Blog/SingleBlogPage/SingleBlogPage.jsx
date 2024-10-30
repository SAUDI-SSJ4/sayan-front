import AcademyHeaderContainer from "../../AcademyHeaderContainer/AcademyHeaderContainer";

import SingleBlogImage from "../../../../assets/images/SingleBlogImage.png";
import AcademyFooter from "../../Footer/Footer";
const SingleBlogPage = () => {
  return (
    <div>
      <AcademyHeaderContainer LayOut2 />
      <div>
        <img src={SingleBlogImage} />
      </div>

     
      <AcademyFooter />
    </div>
  );
};

export default SingleBlogPage;
