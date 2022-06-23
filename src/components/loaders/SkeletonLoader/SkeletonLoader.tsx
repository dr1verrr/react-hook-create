import { Skeleton, SkeletonProps } from '@mui/material'
import PropTypes from 'prop-types'

interface Props extends SkeletonProps {
  show: boolean
}

function SkeletonLoader({ show, children, ...props }: Props): JSX.Element | null {
  return <>{show ? <Skeleton {...props}>{children}</Skeleton> : children}</>
}

SkeletonLoader.propTypes = {
  show: PropTypes.bool.isRequired
}

SkeletonLoader.defaultProps = {
  show: true
}
export default SkeletonLoader
