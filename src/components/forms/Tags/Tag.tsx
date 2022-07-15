import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Chip, ChipProps, Grid } from '@mui/material'
import { memo } from 'react'

interface TagProps extends Omit<ChipProps, 'id' | 'label'> {
  id: number
  label: string
  onDelete: (id: number) => void
}

function TagView({ id, label, onDelete, ...chipProps }: TagProps) {
  return (
    <Grid item>
      <Chip
        color='primary'
        label={label}
        variant='outlined'
        deleteIcon={<HighlightOffIcon />}
        onDelete={() => onDelete(id)}
        {...chipProps}
      />
    </Grid>
  )
}
export default memo(TagView)
