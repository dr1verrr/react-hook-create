import { Button, ButtonGroup } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import GitHubIcon from '@mui/icons-material/GitHub'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'

export default function AuthButtons() {
  return (
    <ButtonGroup size='large'>
      <Button>
        <GoogleIcon />
      </Button>
      <Button>
        <GitHubIcon />
      </Button>
      <Button>
        <PermIdentityIcon />
      </Button>
    </ButtonGroup>
  )
}
