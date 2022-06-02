import GitHubIcon from '@mui/icons-material/GitHub'
import GoogleIcon from '@mui/icons-material/Google'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import { Button, ButtonGroup } from '@mui/material'
import { toast } from 'react-toastify'

import { signinWithGithubPopup, signinWithGooglePopup } from 'app/auth'
import { signAsGuest } from 'app/auth'
import { errorHandler } from 'handlers'

export default function AuthButtons() {
  const onSuccess = (message: string) => toast(message, { icon: '🙌' })

  return (
    <ButtonGroup size='large'>
      <Button
        onClick={() => {
          errorHandler(signinWithGooglePopup, () => onSuccess('Signed in via Google provider.'))
        }}
      >
        <GoogleIcon />
      </Button>
      <Button
        onClick={() => {
          errorHandler(signinWithGithubPopup, () => onSuccess('Signed in via Github provider.'))
        }}
      >
        <GitHubIcon />
      </Button>
      <Button
        onClick={() => {
          errorHandler(signAsGuest, () => onSuccess('Signed in anonymously.'))
        }}
      >
        <PermIdentityIcon />
      </Button>
    </ButtonGroup>
  )
}
