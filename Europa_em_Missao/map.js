'use strict';
let explorer={x:450,y:320},destination=null;
window.moveToStation=i=>{explorer.x=MISSIONS[i].x;explorer.y=MISSIONS[i].y+65;destination=null};
function stepExplorer(dx,dy){explorer.x=Math.max(35,Math.min(965,explorer.x+dx));explorer.y=Math.max(60,Math.min(535,explorer.y+dy));destination=null}
function nearby(){const d=MISSIONS.map((m,i)=>({i,d:Math.hypot(explorer.x-m.x,explorer.y-m.y)})).sort((a,b)=>a.d-b.d)[0];if(d.d<110)visit(d.i);else announce('Aproxima-te de um edifício ou escolhe um destino no passaporte.')}
document.querySelectorAll('[data-move]').forEach(b=>b.onclick=()=>{stepExplorer(...b.dataset.move.split(',').map(Number));announce('Usa Investigar quando estiveres junto de um edifício.')});
$('investigate').onclick=nearby;
$('map').addEventListener('keydown',e=>{if(!state.started||dialog.open)return;const keys={ArrowUp:[0,-18],ArrowDown:[0,18],ArrowLeft:[-18,0],ArrowRight:[18,0]};if(keys[e.key]){e.preventDefault();stepExplorer(...keys[e.key])}if(e.key==='Enter'){e.preventDefault();nearby()}});
new p5(p=>{
 let canvas,scale=1;
 p.setup=()=>{canvas=p.createCanvas(1000,580);canvas.parent('map');canvas.elt.setAttribute('aria-label','Praça ilustrada com seis edifícios, caminhos e um explorador. Usa os botões do passaporte para aceder a todos os desafios.');canvas.elt.setAttribute('role','img');p.pixelDensity(1);resize();p.frameRate(30)};
 function resize(){const w=$('map').clientWidth;scale=w/1000;p.resizeCanvas(w,w*.58)}
 p.windowResized=resize;
 function tree(x,y,s=1){p.push();p.translate(x,y);p.scale(s);p.noStroke();p.fill('#728c7033');p.ellipse(5,16,44,15);p.fill('#7e7151');p.rect(-3,-5,6,25,2);p.fill('#80a982');p.ellipse(0,-17,39,45);p.fill('#a5bf8f');p.ellipse(-8,-24,23,28);p.pop()}
 function star(x,y,r){p.beginShape();for(let j=0;j<10;j++){let a=-Math.PI/2+j*Math.PI/5,rr=j%2?r*.4:r;p.vertex(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}p.endShape(p.CLOSE)}
 function euFlag(x,y,w=54){p.stroke('#5c766f');p.strokeWeight(2);p.line(x,y,x,y+85);p.noStroke();p.fill('#164879');p.rect(x,y,w,w*2/3,2);p.fill('#f6ce50');for(let j=0;j<12;j++){let a=j*Math.PI/6;star(x+w/2+Math.sin(a)*w*.21,y+w/3-Math.cos(a)*w*.21,w*.045)}}
 function building(m,i){let x=m.x,y=m.y,done=state.done.includes(i),locked=i===5&&state.done.length<5;
 p.push();p.translate(x,y);p.noStroke();p.fill('#264e4830');p.ellipse(7,38,162,35);
 p.fill('#d2c5a6');p.rect(-77,24,154,11,4);p.fill('#f3edd9');p.rect(-65,-37,130,69,5);p.fill(m.color);p.rect(-70,-49,140,17,4);
 if(i===1){p.triangle(-78,-50,0,-88,78,-50);p.fill('#e9e3d0');for(let k=-47;k<=47;k+=31)p.rect(k,-27,9,53,1)}
 else if(i===2){p.rect(-25,-90,50,48,3);p.fill('#f4edd5');p.circle(0,-68,27);p.stroke('#776449');p.strokeWeight(2);p.line(0,-68,0,-77);p.line(0,-68,8,-65);p.noStroke()}
 else if(i===5){p.arc(0,-45,139,100,p.PI,0);p.fill('#f3d069');star(0,-64,12)}
 else if(i===0){p.fill('#fff2db');p.triangle(-70,-50,0,-82,70,-50);p.fill(m.color);p.rect(-62,-39,124,12);for(let a=-42;a<=42;a+=42){p.fill(a===-42?'#547d91':a===0?'#f2db86':'#b5675d');p.rect(a-10,-19,20,26,2)}}
 else if(i===3){p.fill('#f4e5d5');p.triangle(-76,-50,0,-78,76,-50);p.fill('#b76877');p.circle(0,-57,18)}
 else if(i===4){p.fill('#93b9a1');p.triangle(-73,-50,0,-85,73,-50);p.stroke('#dae5cc');p.strokeWeight(3);p.line(0,-85,0,-50);p.line(-35,-67,-35,-50);p.line(35,-67,35,-50);p.noStroke()}
 p.fill('#365a68');p.rect(-12,0,24,33,8,8,0,0);if(i!==0&&i!==1){p.fill('#aed4d5');p.rect(-48,-21,22,27,3);p.rect(26,-21,22,27,3);p.stroke('#f8f2dc');p.strokeWeight(2);p.line(-37,-21,-37,6);p.line(37,-21,37,6);p.noStroke()}
 p.fill(done?'#2c7862':locked?'#7c8a85':'#173e56');p.circle(64,-51,28);p.fill('#fff');p.textAlign(p.CENTER,p.CENTER);p.textSize(13);p.textStyle(p.BOLD);p.text(done?'✓':String(i+1),64,-51);
 p.textStyle(p.NORMAL);p.fill('#f9fcf4');p.rect(-105,47,210,29,8);p.fill('#294955');p.textSize(13);p.text(m.name,0,61);p.pop();
 }
 p.draw=()=>{p.push();p.scale(scale);p.background('#e8eee2');p.noStroke();
 // Jardins, rio e caminhos da praça fictícia.
 p.fill('#d7e5d4');p.ellipse(480,310,960,560);p.fill('#cbdcc7');p.ellipse(150,110,300,200);p.ellipse(890,450,300,280);
 p.noFill();p.stroke('#a8d0d5');p.strokeWeight(57);p.bezier(-20,300,200,200,280,660,1050,285);p.stroke('#c3e4e3');p.strokeWeight(33);p.bezier(-20,300,200,200,280,660,1050,285);
 p.stroke('#e4d7b7');p.strokeWeight(36);p.strokeCap(p.ROUND);p.line(175,230,225,460);p.line(175,230,490,200);p.line(490,200,790,250);p.line(490,200,555,475);p.line(225,460,555,475);p.line(555,475,835,485);p.line(790,250,835,485);p.line(490,200,450,320);
 p.stroke('#f2e8ce');p.strokeWeight(25);p.line(175,230,490,200);p.line(490,200,790,250);p.line(490,200,555,475);p.line(225,460,555,475);p.line(555,475,835,485);p.line(790,250,835,485);
 p.stroke('#a78964');p.strokeWeight(5);p.line(302,425,367,464);p.line(297,439,362,478);p.noStroke();
 [[70,100,1],[65,445,1.2],[355,125,.9],[350,535,.8],[655,91,.9],[900,110,1],[930,305,1.1],[680,335,.9],[420,420,.7],[90,525,.8],[715,525,.7],[320,325,.8],[920,535,.8],[70,205,.7]].forEach(a=>tree(...a));
 p.fill('#b8cfa6');for(let j=0;j<30;j++){let x=35+(j*137)%930,y=70+(j*79)%455;p.ellipse(x,y,5,3)}
 p.fill('#d9d8c3');p.ellipse(450,310,120,70);p.fill('#f4ecda');p.ellipse(450,305,102,57);p.fill('#8cb8c0');p.ellipse(450,305,75,38);p.fill('#cbe4e2');p.ellipse(450,303,55,26);p.fill('#ede7cf');p.rect(445,279,10,23,3);p.ellipse(450,279,35,10);
 euFlag(620,230);
 MISSIONS.forEach(building);
 if(destination&&!dialog.open){let dx=destination.x-explorer.x,dy=destination.y-explorer.y,d=Math.hypot(dx,dy);if(d>4){explorer.x+=dx/d*4;explorer.y+=dy/d*4}else destination=null}
 p.push();p.translate(explorer.x,explorer.y);p.fill('#1d414c30');p.ellipse(2,15,29,10);p.stroke('#173f55');p.strokeWeight(5);p.line(-5,9,-6,17);p.line(5,9,6,17);p.noStroke();p.fill('#e6b447');p.rect(-10,-11,20,24,7);p.fill('#f1c7a2');p.circle(0,-19,19);p.fill('#194a65');p.arc(0,-22,23,17,p.PI,0);p.rect(-13,-23,26,4,2);p.fill('#fff5d4');p.circle(0,-4,5);p.pop();
 p.fill('#284f60');p.textAlign(p.RIGHT);p.textSize(10);p.text('PRAÇA DA COOPERAÇÃO',966,558);p.pop();
 };
 p.mousePressed=()=>{if(dialog.open||p.mouseX<0||p.mouseY<0||p.mouseX>p.width||p.mouseY>p.height)return;let x=p.mouseX/scale,y=p.mouseY/scale;const i=MISSIONS.findIndex(m=>Math.abs(x-m.x)<110&&y>m.y-95&&y<m.y+78);if(i>=0)visit(i);else if(state.started){destination={x,y};$('map').focus()}};
},'map');
