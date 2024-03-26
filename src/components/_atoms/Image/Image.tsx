import { ImageType } from '../../../types'
import icon from '../3135715.png'

const Image = ({className}: ImageType) => {
  return <img className={className} src={icon} alt="" />
}

export default Image