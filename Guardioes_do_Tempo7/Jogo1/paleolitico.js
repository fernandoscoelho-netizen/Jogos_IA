// Ilustração educativa original. As figuras gravadas não copiam um sítio real.
function desenharPaleolitico(p,tempo){
  p.push();p.noStroke();
  // Vale, água e vegetação: um ambiente aberto, com abrigo rochoso.
  p.background('#d8e4df');
  p.fill('#f9efd1');p.circle(110,60,48);
  p.fill('#a6bcaf');p.triangle(-70,170,150,30,345,170);p.triangle(160,170,355,60,520,170);
  p.fill('#c1d0bf');p.triangle(150,30,112,83,178,72);
  p.fill('#91ad98');p.ellipse(300,250,1100,240);
  p.fill('#a8c1b0');p.ellipse(80,250,800,170);
  p.fill('#83aaa7');p.beginShape();[[0,186],[150,170],[280,182],[340,203],[250,208],[145,191],[0,212]].forEach(v=>p.vertex(...v));p.endShape(p.CLOSE);
  p.stroke('#d7e6db');p.strokeWeight(2);p.line(10,191,115,183);p.line(190,185,255,190);p.noStroke();
  function pin(x,y,s){p.fill('#6f8061');p.rect(x-3*s,y-10*s,6*s,50*s);p.fill('#537862');p.triangle(x-30*s,y+15*s,x,y-66*s,x+30*s,y+15*s);p.fill('#66876b');p.triangle(x-24*s,y-12*s,x,y-80*s,x+24*s,y-12*s);}
  pin(35,143,.8);pin(80,138,.65);pin(395,142,.55);pin(490,138,.6);pin(545,150,.85);
  p.fill('#c5c6a0');p.ellipse(380,435,1200,440);
  p.fill('#dcd2ac');p.ellipse(255,345,650,200);
  // Abrigo e face rochosa para a gravura.
  p.fill('#a49378');p.beginShape();[[570,250],[588,105],[643,48],[741,31],[850,72],[913,165],[913,302],[825,286],[766,257]].forEach(v=>p.vertex(...v));p.endShape(p.CLOSE);
  p.fill('#baaa8d');p.beginShape();[[596,224],[615,113],[657,66],[742,53],[827,88],[855,239],[770,253]].forEach(v=>p.vertex(...v));p.endShape(p.CLOSE);
  p.fill('#756e5c');p.beginShape();[[834,267],[837,191],[857,149],[883,136],[908,159],[923,270]].forEach(v=>p.vertex(...v));p.endShape(p.CLOSE);
  p.fill('#3f4c43');p.ellipse(885,226,66,101);
  p.stroke('#92846d');p.strokeWeight(2);p.line(637,98,621,154);p.line(621,154,640,193);p.line(789,75,801,108);p.line(801,108,790,137);p.line(602,208,633,216);p.noStroke();
  // Figura animal gravada: contorno legível, cor de ocre e sulco claro.
  p.push();p.translate(718,160);p.stroke('#805342');p.strokeWeight(4);p.strokeJoin(p.ROUND);p.noFill();
  p.beginShape();[[-66,-4],[-52,-28],[-21,-35],[16,-29],[36,-16],[54,-17],[67,-7],[66,5],[48,8],[40,22],[15,29],[-25,26],[-50,13],[-66,-4]].forEach(v=>p.vertex(...v));p.endShape();
  p.line(-45,17,-46,47);p.line(-46,47,-33,48);p.line(-15,28,-9,50);p.line(-9,50,2,49);p.line(22,27,32,45);p.line(32,45,43,44);p.line(43,17,49,37);p.line(-64,0,-81,-14);p.line(45,-17,42,-34);p.line(42,-34,52,-28);p.line(55,-18,60,-32);p.point(59,-3);
  p.stroke('#dec09a');p.strokeWeight(1);p.line(-50,-25,-22,-31);p.line(-40,21,-18,24);p.pop();
  // Pequena mão em negativo, identificável como motivo ilustrativo.
  p.push();p.translate(801,219);p.stroke('#99684c');p.strokeWeight(5);p.line(0,0,0,-20);p.line(7,0,9,-23);p.line(14,2,17,-17);p.line(-7,4,-9,-10);p.line(-11,12,-21,3);p.noStroke();p.fill('#99684c');p.ellipse(3,10,30,30);p.pop();
  // Fogueira: troncos cruzados, pedras, brasas e chamas de contorno orgânico.
  p.fill('#ac9b7230');p.ellipse(170,248,190,65);
  p.push();p.translate(170,224);p.rotate(-.22);p.fill('#6d4c34');p.rect(-58,-2,116,15,7);p.fill('#a17d4c');p.ellipse(53,5,10,14);p.pop();
  p.push();p.translate(170,228);p.rotate(.3);p.fill('#805a39');p.rect(-55,-1,110,14,6);p.fill('#b8925e');p.ellipse(-50,6,10,12);p.pop();
  p.fill('#c06c37');p.ellipse(170,228,74,18);
  p.fill('#cb6f39');p.beginShape();[[132,222],[126,201],[140,183],[145,159],[158,177],[173,130+Math.sin(tempo*2)*3],[187,164],[202,175],[209,200],[200,226]].forEach(v=>p.vertex(...v));p.endShape(p.CLOSE);
  p.fill('#edab53');p.beginShape();[[145,224],[143,204],[157,183],[166,163],[177,185],[186,178],[196,205],[188,226]].forEach(v=>p.vertex(...v));p.endShape(p.CLOSE);
  p.fill('#ffe09b');p.beginShape();[[158,226],[155,213],[169,190],[181,210],[181,227]].forEach(v=>p.vertex(...v));p.endShape(p.CLOSE);
  for(let i=0;i<10;i++){let a=i/10*Math.PI*2;p.fill(i%2?'#8d8e79':'#a6a68d');p.ellipse(170+Math.cos(a)*68,236+Math.sin(a)*19,24,16);}
  // Instrumentos sobre uma pele, sem confundir uma pedra com um machado moderno.
  p.fill('#967e57');p.beginShape();[[357,181],[378,160],[410,170],[452,158],[490,176],[533,181],[525,215],[539,245],[499,256],[458,246],[423,260],[382,244],[349,220]].forEach(v=>p.vertex(...v));p.endShape(p.CLOSE);
  p.fill('#c9b386');p.beginShape();[[365,185],[381,172],[414,180],[449,169],[488,187],[519,189],[513,219],[524,238],[493,245],[457,235],[421,249],[387,234],[361,215]].forEach(v=>p.vertex(...v));p.endShape(p.CLOSE);
  // Biface de sílex com faces de lascagem.
  p.stroke('#505a55');p.strokeWeight(2);p.fill('#737e78');p.beginShape();[[402,229],[390,212],[394,189],[408,159],[425,174],[435,198],[431,220],[416,232]].forEach(v=>p.vertex(...v));p.endShape(p.CLOSE);
  p.fill('#a5b0a4');p.triangle(408,160,398,200,419,189);p.fill('#59665f');p.triangle(419,189,432,199,417,225);p.fill('#89988c');p.triangle(398,200,417,225,402,226);p.line(408,166,418,188);p.line(398,200,417,207);p.noStroke();
  // Raspador e ponta de pedra, ao lado de um instrumento de osso.
  p.fill('#727b73');p.beginShape();[[447,225],[443,209],[450,197],[466,198],[477,210],[472,225],[459,232]].forEach(v=>p.vertex(...v));p.endShape(p.CLOSE);p.fill('#a9b2a4');p.triangle(451,202,472,211,456,223);
  p.stroke('#ede2bb');p.strokeWeight(8);p.line(482,225,506,197);p.noStroke();p.fill('#eee4c4');p.ellipse(507,196,14,10);
  p.stroke('#6d5237');p.strokeWeight(5);p.line(375,152,516,145);p.noStroke();p.fill('#65736b');p.triangle(512,140,512,151,537,143);
  // Pequenos tufos de erva situam os objetos no terreno.
  p.stroke('#7d9164');p.strokeWeight(2);for(let x of [50,290,555,830]){p.line(x,326,x-5,311);p.line(x,326,x+3,305);p.line(x,326,x+9,314);}p.noStroke();
  p.pop();
}
