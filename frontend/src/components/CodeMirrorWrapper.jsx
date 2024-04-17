import React from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/python/python";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/javascript/javascript";
import { Controlled as CodeMirror } from "react-codemirror2";

class CodeMirrorWrapper extends React.Component {
  handleChange = (editor, data, value) => {
    this.props.onChange(value);
  };

  render() {
    const { value, onChange, options, ...restProps } = this.props;
    return (
      <CodeMirror
        value={value}
        onBeforeChange={this.handleChange}
        options={{
          ...options,
          indentWithTabs: true,
          smartIndent: true,
          lineNumbers: true,
          matchBrackets: true,
          autofocus: true,
        }}
        {...restProps}
      />
    );
  }
}

export default CodeMirrorWrapper;
