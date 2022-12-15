import { useState } from "react";
// https://www.kindacode.com/article/react-typescript-making-a-custom-context-menu/

const useClipboard = (
  copyFn: (event: React.ClipboardEvent<any>) => any,
  cutFn: (event: React.ClipboardEvent<any>) => any,
  pasteFn: (event: React.ClipboardEvent<any>) => any,
) => {
  const [text, setText] = useState("");

  // onCopy
  const copyHandler = (event: React.ClipboardEvent<any>) => {
    copyFn(event);
  };

  // onCut
  const cutHandler = (event: React.ClipboardEvent<any>) => {
    cutFn(event);
    setText("");
  };

  // onPaste
  const pasteHandler = (event: React.ClipboardEvent<any>) => {
    pasteFn(event)

    console.log(event.clipboardData.getData("text"));

    // Transform the copied/cut text to upper case
    event.currentTarget.value = event.clipboardData.getData("text")

    event.preventDefault();
  };

  return {
    onCopy: copyHandler,
    onCut: cutHandler,
    onPaste: pasteHandler,
    text: text
  }
}

export default useClipboard;