import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
import { itemTotal } from './cartHelpers';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#ff9900' };
    } else {
        return { color: '#ffffff' };
    }
}

const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-primary">

            {/* HOME */}
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
            </li>

            {/* SHOP */}
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/shop')} to="/shop">Shop</Link>
            </li>

            {/* CART */}
            <li className="nav-item">
                <Link className="nav-link"
                    style={isActive(history, '/cart')}
                    to="/cart">Cart
                <sup className="cart">
                        <small>
                            {itemTotal()}
                        </small>
                    </sup>
                </Link>
            </li>

            {/* DASHBOARD USER */}
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/user/dashboard')} to="/user/dashboard">Dashboard</Link>
                </li>
            )}

            {/* DASHBOARD ADMIN */}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
                </li>
            )}

            {/* SIGN IN/UP */}
            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Sing In</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">Sign Up</Link>
                    </li>
                </Fragment>
            )}

            {/* SIGN OUT */}
            {isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <span className="nav-link"
                            style={{ cursor: 'pointer', color: '#ffffff' }}
                            onClick={() => signout(() => {
                                history.push('/')
                            })}>Sign Out</span>
                    </li>
                </Fragment>
            )}



        </ul>
    </div>
)

export default withRouter(Menu);