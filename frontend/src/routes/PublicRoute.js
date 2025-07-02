import React from 'react';
import {Route, Redirect} from 'react-router-dom';

export const PublicRoute = ({
                                component: Component,
                                redirect: pathname,
                                restricted,
                                ...rest
                            }) => {

    return (
        <Route
            {...rest}
            render={(props) =>
                restricted ? <Redirect to={{pathname}}/> : <Component {...props} />
            }
        />
    )
}

export default PublicRoute