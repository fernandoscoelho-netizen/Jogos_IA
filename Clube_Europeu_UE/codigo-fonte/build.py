"""Junta os ficheiros desta pasta num único index.html (na pasta acima).
Uso: python build.py
"""
import base64, pathlib
d = pathlib.Path(__file__).parent
h = (d / 'app.html').read_text(encoding='utf-8')
logo = 'data:image/png;base64,' + base64.b64encode((d / 'assets' / 'logo-agrupamento.png').read_bytes()).decode()
h = (h.replace('/*LOGO*/', logo)
      .replace('/*MAPA*/', (d / 'mapdata.js').read_text(encoding='utf-8'))
      .replace('/*CONTEUDO*/', (d / 'content.js').read_text(encoding='utf-8'))
      .replace('/*CENAS*/', (d / 'scenes.js').read_text(encoding='utf-8'))
      .replace('/*APP*/', (d / 'app.js').read_text(encoding='utf-8')))
(d.parent / 'index.html').write_text(h, encoding='utf-8')
print('index.html atualizado')
