import React from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
//import { SearchContext } from '../App';
import {
  filterSelector,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { useNavigate, Link } from 'react-router-dom';

import Categories from '../components/Categories.tsx';
import Pagination from '../components/Pagination/index.tsx';
import PizzaBlock from '../components/PizzaBlock/index.tsx';
import Skeleton from '../components/PizzaBlock/Skeleton.tsx';
import Sort, { sortList } from '../components/Sort.tsx';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzasSlice';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(filterSelector);

  //const [items, setItems] = React.useState([]);
  //const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizza = () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

    dispatch(
      // @ts-ignore
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      }),
    );
  };

  //   axios
  //     .get(
  //       `https://626d16545267c14d5677d9c2.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,
  //     )
  //     .then((res) => {
  //       setItems(res.data);
  //       setIsLoading(false);
  //     });

  // ???????? ???????????????? ?????????????????? ?? ?????? ???????????? ????????????
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`/?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  // ???????? ?????? ???????????? ????????????, ???? ?????????????????? URl-?????????????????? ?? ?????????????????? ?? ??????????????
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj:any) => obj.sortProperty === params.sortBy);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // ???????? ?????? ???????????? ????????????, ???? ?????????????????????? ??????????
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizza();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">?????? ??????????</h2>
      {status === 'error' ? (
        <div>
          <h2>?????????????????? ???????????? ????</h2>
          <p>???? ?????????????? ???????????????? ??????????.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
