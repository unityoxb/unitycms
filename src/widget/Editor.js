import React, {useState, useMemo  } from 'react';

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export default function Editor (props) {

  const [content, setValue] = useState(props);

    const onChange = (content) => {
      setValue(content);
    };

    const autofocusNoSpellcheckerOptions = useMemo(() => {
      return {
        autofocus: true,
        spellChecker: false,
      }
    }, []);

    return (
      <SimpleMDE value={content} onChange={onChange} options={autofocusNoSpellcheckerOptions}/>
    )

}