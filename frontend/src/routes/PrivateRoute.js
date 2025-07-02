import React from 'react';
import {Route, Redirect} from 'react-router-dom';

 const PrivateRoute = ({
                          isAuthenticated,
                          component: Component,
                           redirect: pathname = "/login",
                           restricted,
                           ...rest

                      }) => {

    //localStorage.setItem('lastPath', rest.location.pathname);
    return (
        <Route {...rest} component={(props) => (
            (isAuthenticated)
                ? (<Component {...props} />)
                : (<Redirect to={pathname}/>)
        )}

        />
    )
}

export default PrivateRoute