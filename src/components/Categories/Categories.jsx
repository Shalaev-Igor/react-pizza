import React from 'react';

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
]

function Categories({value, onChangeCategory}) {
    return (
    <div className="categories">
        <ul>
          {categories.map((categorie,index)=>(
            <li 
              key={index} 
              className={value === index ? 'active' : ''}
              onClick={()=>onChangeCategory(index)}
              >
                {categorie}
            </li>
          ))}
        </ul>
    </div>
    );
}

export default Categories;