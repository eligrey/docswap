const XHR = XMLHttpRequest;

export const replaceDocumentWithURL = (uri: string) => {
	const { origin, pathname } = new URL(uri);
	if (location.origin === origin) {
		history.replaceState(null, "", pathname);
	}
	const xhr = new XHR();
	xhr.responseType = 'document';
	xhr.addEventListener('load', () => {
		replaceDocument(xhr.response as Document);
	});
	xhr.open('GET', uri);
	xhr.send();
}
  
  export const replaceDocument = (doc: Document) => {
	const doctype = document.doctype;
	const root = document.documentElement;
	const resDoctype = doc.doctype;
	const resRoot = doc.documentElement;
  
	if (doctype && resDoctype) {
		document.replaceChild(resDoctype, doctype);
	} else if (resDoctype) {
		document.insertBefore(resDoctype, root);
	} 
	if (resRoot) {
		document.replaceChild(resRoot, root);
	}
  
	const scripts = doc.querySelectorAll('script');
	
	scripts.forEach((script: HTMLScriptElement) => {
	  const parent = script.parentNode;
	  if (parent) {
		parent.replaceChild(doc.importNode(script, true), script);
	  }
	})
  };