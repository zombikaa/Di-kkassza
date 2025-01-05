import { Loader } from 'lucide-react'

interface Props {
  color?: string;
}

const LoadingStateIcon = ({ color }: Props) => {
  return (
    <Loader className='animate-spin' color={color || '#dda802'}/>
  )
}

export default LoadingStateIcon