import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedAdminRoute = ({ isAdmin, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAdmin) {
                    return (
                        <Component />
                    )
                }
                else {
                    return (
                        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                    )
                }
            }}
        />
    )
}

export default ProtectedAdminRoute