import { Menu as MuiMenu, MenuProps as MuiMenuProps } from '@mui/material'
import PropTypes from 'prop-types'
import { Fragment, ReactElement, cloneElement, useState } from 'react'

interface MenuProps extends Omit<MuiMenuProps, 'open'> {
  children: ReactElement[]
  openElement: JSX.Element
  open?: boolean
}

function Menu({ children, openElement, ...props }: MenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const Button = cloneElement(openElement, { onClick: handleClick })

  return (
    <Fragment>
      {Button}
      <MuiMenu {...props} open={open} id='basic-menu' onClose={handleClose} anchorEl={anchorEl}>
        {children?.map((item, idx) => {
          return cloneElement(item, {
            key: idx,
            onClick: () => {
              handleClose()
              if (item.props.onClick) item.props.onClick()
            }
          })
        })}
      </MuiMenu>
    </Fragment>
  )
}

Menu.propTypes = {
  openElement: PropTypes.element.isRequired
}

Menu.defaultProps = {
  openElement: null
}

export default Menu
