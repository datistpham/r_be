import React from 'react'
import ReactMarkdown from 'react-markdown'

const markdown= `### Hello`
const MenuAdmin = () => {
  return (
    <div className={"home"} style={{padding: 20}}>
      <ReactMarkdown children={markdown}>
        
      </ReactMarkdown>
    </div>
  )
}

export default MenuAdmin