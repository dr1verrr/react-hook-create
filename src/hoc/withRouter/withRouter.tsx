import PropTypes from 'prop-types'
import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function withRouter<T>(Component: FC<T>) {
  return (props: T) => {
    const location = useLocation()
    const navigate = useNavigate()
    return <Component {...props} navigate={navigate} location={location} />
  }
}

withRouter.propTypes = {
  children: PropTypes.node
}

export default withRouter
