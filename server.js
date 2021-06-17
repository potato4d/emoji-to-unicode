const express = require('express')

const app = express()

function emojiToUnicode (emoji) {
    var comp;
    if (emoji.length === 1) {
        comp = emoji.charCodeAt(0);
    }
    comp = (
        (emoji.charCodeAt(0) - 0xD800) * 0x400
      + (emoji.charCodeAt(1) - 0xDC00) + 0x10000
    );
    if (comp < 0) {
        comp = emoji.charCodeAt(0);
    }
    return comp.toString("16");
};

app.get('/', (req, res) => {
  res.send('Please access to `/decode/:emoji`. ')
  return
})

app.get('/decode/:emoji', (req, res) => {
  const { emoji } = req.params
  
  if (!emoji) {
    res.status(400)
    res.send('Error')
    return
  }
  const code = emojiToUnicode(emoji)
  res.send(code);
  return
})


app.listen(process.env.PORT)
