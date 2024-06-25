import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './CartPage.scss';
import Vec_light_left from '../../images/homePage/Vec_light_left.svg';
import Cross from '../../images/cartImages/Cross.svg';
import Minus from '../../images/cartImages/Minus.svg';
import Plus from '../../images/cartImages/Plus.svg';
import { TabAccessPhone } from '../../types/tabAccessPhones';
import { actions } from '../../features/cartSlice';
import { useEffect, useState } from 'react';

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const { cartProducts } = useAppSelector(state => state.cartItems);
  const [error, setError] = useState<string>('');

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    prod: TabAccessPhone,
  ) => {
    event.preventDefault();

    dispatch(actions.removeProduct(prod));
  };

  function countProduct(product: TabAccessPhone) {
    return cartProducts.filter((pr) => pr.id === product.id).length
  }

  const handlePlus = (product: TabAccessPhone) => {
    dispatch(actions.addProduct(product));
  };

  const handleMinus = (product: TabAccessPhone) => {
    dispatch(actions.removeLastProduct(product));
  };

  useEffect(() => {
    if (cartProducts.length === 0) {
      setError('There are no products in the cart yet') ;
    }
  }, [cartProducts])

  const uniq = [...new Set(cartProducts)];

  return !error ? (
    <div className="cartProduct">
      <div className="cartProduct__constrain">
        <div className="cartProduct__breadcrumbs">
          <NavLink to="/" className="cartProduct__home-link">
            <img
              src={Vec_light_left}
              alt="Vector_light_right"
              className="cartProduct__arrow-right"
            />
            <div className="cartProduct__back">Back</div>
          </NavLink>
        </div>
        <h1 className="cartProduct__header">Cart</h1>
        <div className="cartProduct__box">
          <div className="cartProduct__container">
            {uniq && uniq.map((product: TabAccessPhone, index) => {
              return (
                <div
                  key={index}
                  className="cartProduct__itemCard"
                >
                  <div className="cartProduct__containerItem">
                    <div className="cartProduct__item">
                      <NavLink
                        to={`/${product.category}/${product.id}`}
                        className="cartProduct__navLink"
                      >
                        <button
                          className="cartProduct__buttonCross"
                          onClick={event =>
                            handleDelete(event, product)
                          }
                        >
                          <img
                            src={Cross}
                            alt="Cross"
                            className="cartProduct__cross"
                          />
                        </button>
                        <div className="cartProduct__image">
                          <img
                            src={`https://hanna-balabukha.github.io/react_phone-catalog/${product.images[0]}`}
                            alt={product.category}
                            className="cartProduct__image__link"
                          />
                        </div>
                        <div className="cartProduct__name">
                          {product.name}
                        </div>
                      </NavLink>
                      <div className="cartProduct__countPrice">
                        <div className="cartProduct__count">
                          <button
                            className="cartProduct__count__box"
                            onClick={() => handleMinus(product)}
                          >
                            <img
                              src={Minus}
                              alt="Minus"
                              className="cartProduct__count__num"
                            />
                          </button>
                          <div className="cartProduct__count__quantity">
                            {countProduct(product)}
                          </div>
                          <button
                            className="cartProduct__count__box"
                            onClick={() => handlePlus(product)}
                          >
                            <img
                              src={Plus}
                              alt="Plus"
                              className="cartProduct__count__num"
                            />
                          </button>
                        </div>
                        <div className="cartProduct__price">
                          {`$${product.priceDiscount}`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          }
          </div>
          <div className="cartProduct__checkout">
            <div className="cartProduct__checkBlock">
              <div className="cartProduct__toPay">{`$${1234}`}</div>
              <div className="cartProduct__totalItems">
                Total for three items
              </div>
            </div>
            <button className="cartProduct__payButton">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>{error}</div>
  );
};
