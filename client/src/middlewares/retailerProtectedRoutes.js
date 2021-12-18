import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RetailerProtectedRoutes = ({ isAuth, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuth) {
                    return <Component />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/retailer/login',
                                state: { from: props.location },
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default RetailerProtectedRoutes;
