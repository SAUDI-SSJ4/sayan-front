import { useEffect } from "react";
import VideoCard from "./VideoCard";
import { mockUsers } from "./mock";
const data = mockUsers(8);
const VideoCardContainer = ({
  setCheckedKeys,
  checkedKeys,
  setData,
  acadmey
}) => {
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
    <div style={{ backgroundColor: "white", padding: "30px 0" }}>
      <div className="row g-3">
        {data.map((item, index) => {
          return (
            <div className="col-12 col-md-6 col-lg-4 col-xl-4" key={index}>
              <VideoCard
                acadmey={acadmey}
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

export default VideoCardContainer;
