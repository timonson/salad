export async function getInnerHtmlFromSrc({
  sourceFile,
  destinationFile,
  element,
  contextPre = "",
  contextPost = "",
}: {
  sourceFile: string | URL;
  destinationFile: string | URL;
  element: string;
  contextPre?: string;
  contextPost?: string;
}) {
  const html = await Deno.readTextFile(sourceFile);
  const openingTag = html.indexOf(`<${element}>`);
  const closingTag = html.indexOf(`</${element}>`);
  const innerHtmlStart = openingTag + `<${element}>`.length;
  const innerHtml = html.slice(innerHtmlStart, closingTag).trim();
  if (openingTag === -1 || closingTag === -1) throw Error("Tag not found");

  return await Deno.writeTextFile(
    destinationFile,
    contextPre + innerHtml + contextPost
  );
}

getInnerHtmlFromSrc({
  sourceFile: "./index.html",
  destinationFile: "newIndex.html",
  element: "universal-footer",
});
