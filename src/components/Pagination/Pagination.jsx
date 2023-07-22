import React from 'react';
import ReactPaginate from 'react-paginate';
import { setPage } from '../../redux/slices/filterSlice';
import { useDispatch } from 'react-redux';

import style from './Pagination.module.scss'

function Pagination() {
  const dispatch = useDispatch()
    return (
        <ReactPaginate
        className={style.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event)=>dispatch(setPage(event.selected+1))}
        pageRangeDisplayed={5}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    );
}

export default Pagination;