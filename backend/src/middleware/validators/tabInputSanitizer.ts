const tabSanitizer = (obj) => {
  const { dataPoints } = obj
  const selection = dataPoints[0];
  const text = dataPoints[1];

  if (selection.options === "" || !selection.options) {
    const e = new Error('options is required in the selection body')
    e.name = 'ParseError';
    throw e
  }

  if (text.placeholder === "" || !text.placeholder) {
    const e = new Error('placeholder is required in the text body')
    e.name = 'ParseError';
    throw e
  }
};

export default tabSanitizer;