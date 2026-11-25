/* Display-only translations. Never changes form values, IDs or learner writing. */
window.ExpressoInstallEnglish = function installEnglish(doc, dictionary) {
  const normal = s => s.replace(/\s+/g, ' ').trim();
  const escape = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const templates = Object.entries(dictionary).filter(([s]) => s.includes('§'))
    .sort((a,b) => b[0].replaceAll('§','').length-a[0].replaceAll('§','').length)
    .map(([s,t]) => [new RegExp('^'+s.split('§').map(escape).join(s==='§ de §'?'(\\d+)':'(.+?)')+'$'), t,s==='§ Agora podes carimbar o passaporte.']);
  function translate(value) {
    const key=normal(String(value));
    const wrap=text=>String(value).match(/^\s*/)[0]+text+String(value).match(/\s*$/)[0];
    if (Object.hasOwn(dictionary,key)) return wrap(dictionary[key]);
    for (const [re,target,translateFeedback] of templates) {
      const match=key.match(re);
      if(match){let i=0;return wrap(target.replaceAll('§',()=>{const text=match[++i];return translateFeedback&&i===1?translate(text):text;}));}
    }
    return value;
  }
  const skip='script,style,textarea,input,code,pre,[translate="no"],[data-user-content],.c-nome,.mrz,.expr b[lang],.ola button [lang]';
  function update(node) {
    if(node.nodeType===3){
      if(!node.parentElement||node.parentElement.closest(skip))return;
      const value=translate(node.data);if(value!==node.data)node.data=value;
      return;
    }
    if(node.nodeType!==1)return;
    for(const attribute of ['aria-label','placeholder','title']){
      if(node.hasAttribute(attribute)){const value=node.getAttribute(attribute),next=translate(value);if(value!==next)node.setAttribute(attribute,next);}
    }
    if(node.matches(skip))return;
    for(const child of [...node.childNodes])update(child);
  }
  doc.documentElement.lang='en-GB';
  const observer=new MutationObserver(records=>{
    for(const r of records){
      if(r.type==='characterData'||r.type==='attributes')update(r.target);
      else for(const node of r.addedNodes)update(node);
    }
  });
  observer.observe(doc.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder']});
  update(doc.documentElement);
  // Three.js draws place labels onto canvases before uploading their textures.
  if(typeof CanvasRenderingContext2D!=='undefined'){
    for(const name of ['fillText','strokeText','measureText']){
      const original=CanvasRenderingContext2D.prototype[name];
      CanvasRenderingContext2D.prototype[name]=function(text,...args){return original.call(this,translate(text),...args);};
    }
  }
  return {translate,disconnect:()=>observer.disconnect()};
};
