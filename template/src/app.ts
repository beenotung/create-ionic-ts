import { storage } from './storage'
import { querySelector } from './ui'

let counterButton = querySelector('#counter-button')

counterButton.addEventListener('click', () => {
  let count = parseInt(counterButton.textContent || '0')
  count++
  counterButton.textContent = count.toString()
  storage.set('counter', count.toString())
})

async function main() {
  counterButton.textContent = (await storage.get('counter')) || '0'
}
main().catch(error => {
  console.error(error)
})
