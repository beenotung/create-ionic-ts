export function querySelector<T extends HTMLElement>(
  selector: string,
  parent: ParentNode = document,
) {
  let element = parent.querySelector<T>(selector)
  if (!element) {
    throw new Error(
      'failed to locate element, selector: ' + JSON.stringify(selector),
    )
  }
  return element
}

export function querySelectorAll<T extends HTMLElement>(
  selector: string,
  parent: ParentNode = document,
) {
  let elements = parent.querySelectorAll<T>(selector)
  return elements
}
