import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {Categories, SortPopup, PizzaBlock, PizzaLoadingBlock} from '../components';
import {setCategory, setSortBy} from '../redux/action/filters';
import {fetchPizzas} from '../redux/action/pizzas';
import {addPizzaToCart } from '../redux/action/cart';


const categoryNamse = [
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые'
];
const sortNames= [
  {name: 'популярности', type: 'popular', order:'desc'},
  {name:'цене', type: 'price', order:'desc'},
  {name: 'алфавиту', type: 'name', order:'asc'}
];

function Home(){

  const dispatch = useDispatch();

  const items = useSelector(({pizzas}) => pizzas.items);
  const cartItems = useSelector(({cart}) => cart.items);
  const isLoaded = useSelector(({pizzas}) => pizzas.isLoaded);
  const {category, sortBy} = useSelector(({filters}) => filters);


  React.useEffect(()=>{
   dispatch(fetchPizzas(sortBy, category));
  }, [sortBy, category]);



  const onSelectCategory = React.useCallback((index) =>{
    dispatch(setCategory(index));
  },[]);

  const onSelectSortType = React.useCallback((type) =>{
    dispatch(setSortBy(type));
  },[]);

  const handleAddPizzaToCart = obj => {
    dispatch(addPizzaToCart(obj));
  }

    return(
        <div className="container">
          <div className="content__top">
            <Categories
              aciveCategory={category}
              onClickCategory={onSelectCategory}
              items={categoryNamse}/>
            <SortPopup
              onClickSortType = {onSelectSortType}
              activeSortType = {sortBy.type}
              items={sortNames}
            />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoaded 
              ? items.map((obj) => (<PizzaBlock onClickAddPizza={handleAddPizzaToCart} key={obj.id} addedCount = {cartItems[obj.id] && cartItems[obj.id].items.length} {...obj} />))
              : Array(12).fill(0).map((_, index ) => <PizzaLoadingBlock key={index} />)
              }
          </div>
      </div>
    )
}
export default Home;