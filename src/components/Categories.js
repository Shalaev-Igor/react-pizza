import React from "react";


const Categories = React.memo(function Categories({aciveCategory, items, onClickCategory}){

    return(
        <div className="categories">
            <ul>
                <li 
                    className={aciveCategory === null ? 'active' : ''}
                    onClick={()=>onClickCategory(null)}>
                    Все
                </li>
                {items && items.map((name, index)=>(
                    <li 
                        className={aciveCategory === index ? 'active' : ''}
                        onClick={()=>onClickCategory(index)}
                        key={`${name}_${index}}`}>
                        {name}
                    </li>
               ))}
            </ul>
        </div>
    )
})

export default Categories;