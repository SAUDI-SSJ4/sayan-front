import { useEffect } from "react";
import BlogCard from "./blogCard";
import { mockUsers } from "./mock";
const data = mockUsers(8);
const BlogCardContainer = ({ setCheckedKeys, checkedKeys, setData }) => {
  const handleCheck = (item) => {
    if (checkedKeys.some((i) => i === item)) {
      setCheckedKeys(checkedKeys.filter((i) => i !== item));
    } else {
      setCheckedKeys([...checkedKeys, item]);
    }
  };
  useEffect(() => {
    setData(data);
  }, []);
  return (
    <div
      className="all-cards-blogs"
      style={{ backgroundColor: "white", padding: "30px 10px" }}
    >
      <div className="row g-3">
        {data.map((item, index) => {
          return (
            <div className="col-12 col-md-6 col-lg-4 col-xl-4" key={index}>
              <BlogCard
                image={item.user.image}
                onCheck={() => handleCheck(item)}
                checked={checkedKeys.some((i) => i === item)}
                user={item.user}
                active={item.isActive == "active"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogCardContainer;
