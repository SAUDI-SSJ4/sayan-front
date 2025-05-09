import CategoriesCard from "./CategoriesCard";


const CategoriesCardContainer = ({ setCheckedKeys, checkedKeys, data }) => {

  const handleCheck = (item) => {
    if (checkedKeys.some((i) => i === item)) {
      setCheckedKeys(checkedKeys.filter((i) => i !== item));
    } else {
      setCheckedKeys([...checkedKeys, item]);
    }
  };

  console.log(data)

  return (
    <div style={{ backgroundColor: "white" }}>
      <div className="row g-3">
        {data?.map((item, index) => {
          return (
            <div className="col-12 col-md-6 col-lg-4 col-xl-4" key={index}>
              <CategoriesCard
                image={item?.image}
                onCheck={() => handleCheck(item)}
                checked={checkedKeys.some((i) => i === item)}
                user={"نور مدحت"}
                active={item.isActive == "active"}
                title={item?.title}
                content={item?.content}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesCardContainer;
