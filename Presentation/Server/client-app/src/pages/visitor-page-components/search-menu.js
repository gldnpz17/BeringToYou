import { useEffect, useRef, useState } from "react";
import { CardColumns, Col, Row, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import CustomButton from "../../components/custom-button";
import SearchTextBox from "../../components/search-textbox";
import ShopCard from "../../components/shop-card"
import responsiveBreakpoints from "../../helpers/responsive-breakpoints";
import ShopFilterModal from "../../modals/shop-filter-modal";
import ShopOffCanvas from "./shop-offcanvas";
import fetchAllShopCategories from '../../use-cases/common/fetch-all-shop-categories';
import fetchAllOnlineShopPlatforms from '../../use-cases/common/fetch-all-online-shop-platforms';
import fetchAllShops from '../../use-cases/common/fetch-all-shops';
import websiteConfiguration from "../../config";
import LoadingAnimation from "../../components/loading-animation";
import fetchShopDetails from "../../use-cases/common/fetch-shop-details";

const Container = styled.div`
  height: 100%;

  overflow-x: hidden;
  overflow-y: scroll;
`;

const SearchContainer = styled.div`
  @media(min-width: ${responsiveBreakpoints.large}) {
    width: 50%;
  }
`;

const StyledCardColumns = styled(CardColumns)`
  @media (min-width: ${responsiveBreakpoints.small}) {
    -webkit-column-count: 2;
    -moz-column-count: 2;
    column-count: 2;  
  }

  @media (min-width: ${responsiveBreakpoints.medium}) {
    -webkit-column-count: 3;
    -moz-column-count: 3;
    column-count: 3;  
  }

  @media (min-width: ${responsiveBreakpoints.large}) {
    -webkit-column-count: 4;
    -moz-column-count: 4;
    column-count: 4;  
  }

  @media (min-width: ${responsiveBreakpoints.xLarge}) {
    -webkit-column-count: 5;
    -moz-column-count: 5;
    column-count: 5;  
  }

  @media (min-width: ${responsiveBreakpoints.xxLarger}) {
    -webkit-column-count: 6;
    -moz-column-count: 6;
    column-count: 6;  
  }
`;

const SearchMenu = ({ history }) => {
  const [shopOffcanvasShow, setShopOffcanvasShow] = useState(false);
  const [shopToShow, setShopToShow] = useState(null);
  const [filterModalShow, setFilterModalShow] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const [searchEndReached, setSearchEndReached] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreResults = async () => {
    let params = new URLSearchParams(window.location.search);
    params.set('start', searchResults.length);
    params.set('count', websiteConfiguration.shopSearchLoadCount);

    setIsLoading(true);
    let fetchedResults = await fetchAllShops(params.toString());
    
    if (fetchedResults.length < websiteConfiguration.shopSearchLoadCount) {
      setSearchEndReached(true);
    }

    setSearchResults([...searchResults, ...fetchedResults]);
    setIsLoading(false);
  };

  const executeSearch = async () => {
    setSearchResults([]);
    setSearchEndReached(false);
    setIsLoading(false);

    await loadMoreResults();
  };

  const queryParamsChanged = (current, previous, keys) => {
    let currentParams = new URLSearchParams(current);
    let previousParams = new URLSearchParams(previous);
    
    let mismatch = false;
    keys.forEach(key => {
      if (currentParams.get(key) !== previousParams.get(key)) {
        mismatch = true;
      }
    });

    return mismatch;
  }

  useEffect(() => {
    executeSearch();
    viewShop();
    window.localStorage.setItem('shop-search-last-query', window.location.search);

    let unlisten = history.listen(() => {
      let previousQuery = window.localStorage.getItem('shop-search-last-query');

      if (queryParamsChanged(
        previousQuery, 
        window.location.search, 
        ['category', 'onlineshop', 'minprice', 'maxprice'])
      ) {
        executeSearch();
      }

      if (queryParamsChanged(
        previousQuery, 
        window.location.search, 
        ['viewshop'])
      ) {
        viewShop();
      }

      window.localStorage.setItem('shop-search-last-query', window.location.search);
    });

    return function cleanup() {
      unlisten();
    }
  }, []);

  const setQueryParam = (searchParams, paramName, paramContent) => {
    if (paramContent) {
      searchParams.set(paramName, paramContent);
    } else {
      searchParams.delete(paramName);
    }
  };

  const setFilterParameters = (selectedCategory, selectedPlatforms, minPrice, maxPrice) => {
    var searchParams = new URLSearchParams(window.location.search);

    setQueryParam(searchParams, 'category', selectedCategory);
    setQueryParam(searchParams, 'onlineshop', selectedPlatforms.join(' '));
    setQueryParam(searchParams, 'minprice', minPrice);
    setQueryParam(searchParams, 'maxprice', maxPrice);

    history.push(window.location.pathname + '?' + searchParams.toString());    
  };

  const setKeywords = () => {
    let keywords = document.getElementById('shop-search-input').value;

    var searchParams = new URLSearchParams(window.location.search);

    setQueryParam(searchParams, 'keywords', keywords);

    history.push(window.location.pathname + '?' + searchParams.toString());  
  };

  const loadMoreResultOnScroll = (event) => {
    let containerElement = event.target;

    if(!isLoading && !searchEndReached && containerElement.scrollTop + containerElement.offsetHeight >= containerElement.scrollHeight - 25) {
      loadMoreResults();
    }
  };

  const viewShop = async () => {
    let params = new URLSearchParams(window.location.search);

    if (params.get('viewshop')) {
      setShopToShow(await fetchShopDetails(params.get('viewshop')));
      setShopOffcanvasShow(true);
    } else {
      setShopToShow(null);
      setShopOffcanvasShow(false);
    }
  };

  const setViewShopUrl = async (shopId) => {
    let params = new URLSearchParams(window.location.search);

    if (shopId) {
      params.set('viewshop', shopId);
    } else {
      params.delete('viewshop');
    }

    history.push(window.location.pathname + '?' + params.toString());
  }

  return (
    <Container onScroll={loadMoreResultOnScroll}>
      <ShopFilterModal
        show={filterModalShow}
        setShow={setFilterModalShow}
        onApply={setFilterParameters}
      />
      <ShopOffCanvas 
        shop={shopToShow}
        showBackground={true} 
        visible={shopOffcanvasShow} 
        setVisible={setShopOffcanvasShow}
        onDismiss={() => setViewShopUrl(null)}
        canJumpToLocation={true}
      />
      <SearchContainer className='px-3 py-2 d-flex flex-row'>
        <SearchTextBox className='mr-2' id='shop-search-input' defaultValue={new URLSearchParams(window.location.search).get('keywords')} onClick={setKeywords}/>
        <CustomButton onClick={() => setFilterModalShow(true)}>Filter</CustomButton>
      </SearchContainer>
      {(() => {
        if (!isLoading && searchResults?.length === 0) {
          return (<p className='text-center'>Hasil pencarian kosong.</p>)
        } else {
          return (
            <StyledCardColumns className='d-flex justify-content-center mx-2 mb-4'>
              {searchResults?.map(shop => {
                return (
                  <Col className='p-2'>
                    <ShopCard 
                      onClick={() => setViewShopUrl(shop?.id)}
                      shop={shop}
                    />
                  </Col>
                );
              })}
            </StyledCardColumns>
          );
        }
      })()}
      <div className='mb-5'>
        <LoadingAnimation 
          loaderCount={5}
          isLoading={isLoading}
        />
        {searchEndReached && searchResults.length > 0 ? <p className='text-center'>Tidak ada hasil lagi untuk ditampilkan.</p> : null}
      </div>
    </Container>
  );
};

export default withRouter(SearchMenu);