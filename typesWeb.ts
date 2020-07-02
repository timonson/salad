export function createHtmlTemplate(html: string) {
  const template = document.createElement("template")
  template.innerHTML = html.trim()
  return template
}
