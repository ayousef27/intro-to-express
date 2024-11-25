const express = require('express')

const app = express()

app.get('/greetings/:username', (req, res)=> {
  const username = req.params.username
  res.send(`What a delight it is to see you once more, ${username}.`)
})

app.get('/roll/:number', (req, res) => {
  const number = req.params.number

  
  if (isNaN(number)) {
    return res.send('You must specify a number.')
  }

  
  const max = Number(number)
  const roll = Math.floor(Math.random() * (max + 1))

  
  res.send(`You rolled a ${roll}.`)
})


const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
]

app.get('/collectibles/:index', (req, res) => {
  const index = req.params.index

  if(index < 0 || index > collectibles.length){
    return res.send('This item is not yet in stock. Check back soon!')
  }

  const item = collectibles[index];
  res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`)

})

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
]

app.get('/shoes', (req, res) => {
  const result = []
  
  
  for (let i = 0; i < shoes.length; i++) {
    const shoe = shoes[i];
    let includeShoe = true

    
    if (req.query['min-price']) {
      const minPrice = req.query['min-price']
      if (shoe.price < minPrice) {
        includeShoe = false
      }
    }

    
    if (req.query['max-price']) {
      const maxPrice = req.query['max-price']
      if (shoe.price > maxPrice) {
        includeShoe = false
      }
    }

    
    if (req.query['type'] && shoe.type !== req.query['type']) {
      includeShoe = false
    }

    
    if (includeShoe) {
      result.push(shoe)
    }
  }

  res.json(result)
  
})



app.listen(3000, () => {
  console.log('Listening on port 3000')
})