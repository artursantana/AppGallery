

import * as C from './Style'

type Props = {
    url: string
    name: string
}

const Index = ({url, name}: Props) => {
  return (
    <div>
      <C.Container>
        <img src={url} alt={name} />
        {name}
      </C.Container>
    </div>
  )
}

export default Index
