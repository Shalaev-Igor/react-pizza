import React,{useState, useEffect, useContext} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from'qs'
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories/Categories';
import Sort, { sortList } from "../components/Sort/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Sceleton from "../components/PizzaBlock/Sceleton";
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App'; 
import { fetchPizzas } from '../redux/slices/pizzasSlice';
import { setCategoryId, setSortType, setFilters } from '../redux/slices/filterSlice';

function Home() {

  const navigate = useNavigate();
  const dispatch=useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const categoryId = useSelector(state=>state.filter.categoryId)
  const sort = useSelector(state=>state.filter.sort)
  const page = useSelector(state=>state.filter.page)
  const {items, status} = useSelector(state=>state.pizza)
  const {searchValue} = useContext(SearchContext)
  
  const [error, setError] = useState(false)

  //Если был первый рендер, проверяем УРЛ-параметры и сохраняем в редаксе
  useEffect(() => {
    if(window.location.search){
      const params = qs.parse(window.location.search.substring(1))
      const sort = sortList.find(obj=>obj.sortProperty === params.sortProperty)

      dispatch(
        setFilters({
          ...params,
          sort
        })
      )
      isSearch.current = true;
    }
  },[])

  //Изменили параметны после первого рендера
  useEffect(()=>{
    if(isMounted.current){
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        page
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, page])

  async function getPizzas() {

    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const category = categoryId === 0 ? '' : categoryId
    const sortBy = sort.sortProperty.replace('-','')

    dispatch(
      fetchPizzas({
        order,
        category,
        sortBy,
        page
      }))
    window.scrollTo(0, 0)
  }


  useEffect(() => {
    getPizzas()
    isSearch.current = false;
  }, [categoryId, sort, page])

    const pizzas = items.filter(pizza => pizza.title.toLowerCase().includes(searchValue.toLowerCase())).map(pizza =>( status === 'loading' ? <Sceleton/> : <PizzaBlock key={pizza.id} item={pizza}/>))
    const sceleton = [...new Array(4)].map((_,index)=><Sceleton key={index}/>)

    return (
        <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories value={categoryId} onChangeCategory={(id)=>dispatch(setCategoryId(id))}/>
            <Sort value={sort} onChangeSort={(id)=>dispatch(setSortType(id))} />
          </div>
          { error && <h2 className="content__title text-center">{error}</h2>}

          {!error && <h2 className="content__title text-center">{status === 'loading' ? 'Пиццы загружаются...' : 'Наши пиццы'}</h2> }
          
          <div className="content__items">
            { !error &&
              <>
              { status === 'loading' ? sceleton : pizzas}
              </>
            }
          </div>
          <Pagination/>
        </div>
      </div>
    );
}

export default Home;