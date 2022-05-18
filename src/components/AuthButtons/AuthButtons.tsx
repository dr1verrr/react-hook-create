import { Button, ButtonGroup } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import GitHubIcon from '@mui/icons-material/GitHub'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import { signinWithGithubPopup, signinWithGooglePopup, signout } from '../../app/auth'

export default function AuthButtons() {
  return (
    <ButtonGroup size='large'>
      <Button>
        <GoogleIcon onClick={signinWithGooglePopup} />
      </Button>
      <Button>
        <GitHubIcon onClick={signinWithGithubPopup} />
      </Button>
      <Button>
        <PermIdentityIcon onClick={signout} />
      </Button>
    </ButtonGroup>
  )
}
