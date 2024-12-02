import { useState } from 'react';

function Select({ type, category, setCat }) {
  const [input, setInput] = useState({
    mainCategory: category.categories[0].id,
    subCategory: category.categories[0].subCategories[0].id
  });

  const handleCatChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => {
      if (name === 'mainCategory') {
        // 메인 카테고리가 변경되면 해당 카테고리의 첫 번째 서브 카테고리로 설정
        const firstSubCategory = category.categories.find((cat) => cat.id === value)
          ?.subCategories[0].id;
        console.log('input: ', input);
        // setCat이 적용되지 않는 문제
        setCat(input);
        return {
          ...prev,
          [name]: value,
          subCategory: firstSubCategory
        };
      }
      return {
        ...prev,
        [name]: value
      };
    });
  };

  console.log('메인 카테고리: ', input.mainCategory, '\n서브 카테고리: ', input.subCategory);

  return (
    <div className="d-flex gap-3 col-lg-4 col-md-8 col-sm-8">
      <select
        className="form-select"
        key="selMainCategory"
        name="mainCategory"
        onChange={handleCatChange}
        value={input.mainCategory}
      >
        {category.type === type
          ? category.categories.map((item) => (
              // type이 01인지 확인
              <option key={`selMainCategory${item.id}`} value={item.id}>
                {item.name}
              </option>
            ))
          : null}
      </select>
      <select
        className="form-select"
        key="selSubCategory"
        name="subCategory"
        onChange={handleCatChange}
        value={input.subCategory}
      >
        {input.mainCategory
          ? category.categories
              .find((cat) => cat.id === input.mainCategory)
              ?.subCategories.map((item) => (
                <option key={`selSubCategory${item.id}`} value={item.id}>
                  {item.name}
                </option>
              ))
          : null}
      </select>
    </div>
  );
}

export default Select;
