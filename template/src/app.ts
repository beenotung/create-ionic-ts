import { storage } from './storage'
import { querySelector } from './ui'

let refreshButton = querySelector('#refresh-button')

let descText = querySelector('#desc-text')
let itemsList = querySelector('#items-list')
let itemTemplate = querySelector('ion-item', itemsList)

itemTemplate.remove()

let items = [
  { title: 'Apple', count: 0 },
  { title: 'Banana', count: 0 },
  { title: 'Cherry', count: 0 },
]

refreshButton.addEventListener('click', () => {
  items = [
    { title: 'Apple', count: 0 },
    { title: 'Banana', count: 0 },
    { title: 'Cherry', count: 0 },
  ]
  main()
})

async function main() {
  descText.textContent = `Total ${items.length} items.`
  itemsList.innerHTML = ''
  for (let item of items) {
    item.count = parseInt(
      (await storage.get(`item.${item.title}.count`)) || '0',
    )

    let itemNode = itemTemplate.cloneNode(true) as HTMLElement
    let labelNode = querySelector('ion-label', itemNode)
    let titleNode = querySelector('.item-title', labelNode)
    let countNode = querySelector('.item-count', labelNode)

    let increaseButton = querySelector('.item-increase-button', itemNode)
    let deleteButton = querySelector('.item-delete-button', itemNode)

    titleNode.textContent = item.title
    countNode.textContent = item.count.toString()

    increaseButton.addEventListener('click', () => {
      item.count++
      countNode.textContent = item.count.toString()
      storage.set(`item.${item.title}.count`, item.count.toString())
    })

    deleteButton.addEventListener('click', () => {
      let index = items.indexOf(item)
      items.splice(index, 1)
      descText.textContent = `Total ${items.length} items.`
      itemNode.remove()
    })

    itemsList.appendChild(itemNode)
  }
}
main().catch(error => {
  console.error(error)
})
