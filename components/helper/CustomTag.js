import React from 'react'

export function Div({children, tag = 'div', ...props})
{
    return React.createElement(
        tag,
        props,
        children
      )
}