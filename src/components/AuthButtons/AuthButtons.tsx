import { Button, ButtonGroup } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import GitHubIcon from '@mui/icons-material/GitHub'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import { signinWithGithubPopup, signinWithGooglePopup } from 'app/auth'
import { errorHandler } from 'utils'
import { signAsGuest } from 'app/auth'

export default function AuthButtons() {
  return (
    <ButtonGroup size='large'>
      <Button onClick={() => errorHandler(signinWithGooglePopup)}>
        <GoogleIcon />
      </Button>
      <Button onClick={() => errorHandler(signinWithGithubPopup)}>
        <GitHubIcon />
      </Button>
      <Button onClick={() => errorHandler(signAsGuest)}>
        <PermIdentityIcon />
      </Button>
    </ButtonGroup>
  )
}
