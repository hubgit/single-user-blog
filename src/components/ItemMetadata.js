import React from 'react'
import Moment from 'react-moment'

const ItemMetadata = ({ item }) => (
  <span>
    <span>
      {item.published ? 'Published ' : 'Created '}
    </span>

    <Moment format="YYYY-MM-DD">
      {item.published || item.created}
    </Moment>
  </span>
)

export default ItemMetadata