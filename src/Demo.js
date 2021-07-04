import React from 'react'
import ReactMarkdown from 'react-markdown'
import {render} from 'react-dom'


export default function Demo () {
  const markdown = `A paragraph with *emphasis* and **strong importance**.

  > A block quote with ~strikethrough~ and a URL: https://reactjs.org.

  * Lists
  * [ ] todo
  * [x] done

  A table:

  | a | b |
  | - | - |
  `
  return (
    <ReactMarkdown children={markdown} />
  )
}
