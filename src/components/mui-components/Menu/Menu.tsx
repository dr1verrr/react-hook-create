import { Menu as MuiMenu, MenuProps as MuiMenuProps } from '@mui/material'
import PropTypes from 'prop-types'
import { Fragment, ReactElement, cloneElement, useState } from 'react'

type MenuProps = {
  children: ReactElement[]
  MenuButton: JSX.Element
  menuProps: MuiMenuProps
}

function Menu({ children, MenuButton, menuProps }: MenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const Button = cloneElement(MenuButton, { onClick: handleClick })

  return (
    <Fragment>
      {Button}
      <MuiMenu {...menuProps} open={open} id='basic-menu' onClose={handleClose} anchorEl={anchorEl}>
        {children.map((item, idx) => {
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
  MenuButton: PropTypes.element.isRequired,
  menuProps: PropTypes.object
}

Menu.defaultProps = {
  MenuButton: null,
  menuProps: {}
}

export default Menu
