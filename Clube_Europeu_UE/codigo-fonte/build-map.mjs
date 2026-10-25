import fs from 'fs';
import { feature } from 'topojson-client';
import { geoConicConformal, geoPath } from 'd3-geo';

const topo = JSON.parse(fs.readFileSync('node_modules/world-atlas/countries-50m.json', 'utf8'));
const countries = feature(topo, topo.objects.countries).features;

const EU = {
  '040': 'Áustria', '056': 'Bélgica', '100': 'Bulgária', '191': 'Croácia', '196': 'Chipre',
  '203': 'Chéquia', '208': 'Dinamarca', '233': 'Estónia', '246': 'Finlândia', '250': 'França',
  '276': 'Alemanha', '300': 'Grécia', '348': 'Hungria', '372': 'Irlanda', '380': 'Itália',
  '428': 'Letónia', '440': 'Lituânia', '442': 'Luxemburgo', '470': 'Malta', '528': 'Países Baixos',
  '616': 'Polónia', '620': 'Portugal', '642': 'Roménia', '703': 'Eslováquia', '705': 'Eslovénia',
  '724': 'Espanha', '752': 'Suécia'
};

const W = 1000, H = 860;
const frame = {
  type: 'Feature',
  geometry: { type: 'MultiPoint', coordinates: [[-12, 35], [36, 35], [-12, 66], [36, 66], [12, 71], [12, 34]] }
};
const proj = geoConicConformal().rotate([-12, 0]).parallels([35, 65]).fitExtent([[10, 10], [W - 10, H - 10]], frame);
proj.clipExtent([[-40, -40], [W + 40, H + 40]]);
const path = geoPath(proj).digits(1);

const out = [];
for (const f of countries) {
  const d = path(f);
  if (!d || d.length < 8) continue;
  // skip countries entirely out of frame
  const b = path.bounds(f);
  if (b[1][0] < -30 || b[0][0] > W + 30 || b[1][1] < -30 || b[0][1] > H + 30) continue;
  const id = f.id || '';
  out.push({ id, n: EU[id] || f.properties.name, eu: !!EU[id], d });
}

const cities = {
  porto: [-8.6291, 41.1579], lisboa: [-9.1393, 38.7223], paris: [2.3522, 48.8566], bruxelas: [4.3525, 50.8467],
  haia: [4.3007, 52.0705], maastricht: [5.691, 50.8514], luxemburgo: [6.1319, 49.6116],
  estrasburgo: [7.7521, 48.5734], frankfurt: [8.6821, 50.1109], praga: [14.4378, 50.0755],
  varsovia: [21.0122, 52.2297], zagreb: [15.9819, 45.815], roma: [12.4964, 41.9028]
};
const cxy = {};
for (const [k, ll] of Object.entries(cities)) {
  const p = proj(ll);
  cxy[k] = [Math.round(p[0] * 10) / 10, Math.round(p[1] * 10) / 10, ll[1], ll[0]];
}
// graticule-ish ocean labels
const labels = {
  atl: proj([-17, 47]), med: proj([16, 37.2]), nor: proj([3, 58]), bal: proj([19.5, 57.5])
};
fs.writeFileSync('mapdata.js', 'const MAPA=' + JSON.stringify({ W, H, paises: out, cidades: cxy, mares: labels }) + ';');
console.log(out.length, 'países', (fs.statSync('mapdata.js').size / 1024).toFixed(0) + ' KB');
console.log(out.filter(o => o.eu).length, 'UE');
console.log(cxy);
