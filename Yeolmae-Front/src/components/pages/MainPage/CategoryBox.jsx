import styled from 'styled-components';
import Categories from '../../Common/Categories';

function CategoryBox() {
  return (
    <div
      key="selParentCategory"
      name="parentCategory"
      onChange={onChange}
      value={input.parentCategory}
    >
      {Categories.map((item) =>
        item.parntCateId === '00' ? (
          <option key={`selParentCategory${item.cateId}`} value={item.cateId}>
            {item.cateName}
          </option>
        ) : null
      )}
    </div>
  );
}

export default CategoryBox;
