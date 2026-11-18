from pathlib import Path
from html import escape
import shutil
from xml.etree import ElementTree
root=Path(__file__).resolve().parents[1]
parts=[]
def p(x,y,z=0):return (760+(x-y)*42,335+(x+y)*18-z*56)
def pts(v):return ' '.join(f'{p(*q)[0]:.1f},{p(*q)[1]:.1f}' for q in v)
def poly(v,fill,stroke='#59798e',sw=.8):return f'<polygon points="{pts(v)}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="round"/>'
def line(a,b,color='#7397ad',w=1):
 a,b=p(*a),p(*b)
 return f'<path d="M{a[0]},{a[1]}L{b[0]},{b[1]}" fill="none" stroke="{color}" stroke-width="{w}"/>'
def box(x,y,z,w,d,h,top='#c1d0d9',front='#879daa',side='#597182'):
 return poly([(x,y+d,z),(x+w,y+d,z),(x+w,y+d,z+h),(x,y+d,z+h)],front)+poly([(x+w,y,z),(x+w,y+d,z),(x+w,y+d,z+h),(x+w,y,z+h)],side)+poly([(x,y,z+h),(x+w,y,z+h),(x+w,y+d,z+h),(x,y+d,z+h)],top)
def group(cls,items): return f'<g class="{cls}">{"".join(items)}</g>'
# Large fixed-camera axonometric house. Each piece is independent for assembly.
grid=[]
for i in range(-5,20):
 grid+=[line((i,-5,0),(i,18,0),'#213947',.6),line((-5,i,0),(19,i,0),'#213947',.6)]
parts.append(group('site-grid',grid).replace('<g class="site-grid"','<g data-layout-ignore="" class="site-grid"'))
parts.append(group('survey',[poly([(-.7,-.7,0),(13.5,-.7,0),(13.5,11.5,0),(-.7,11.5,0)],'#102b3a','#3f738e',1.4)]))
foot=[]
for x in [1,4,7,10,12]:
 for y in [1,5.8,9]:foot.append(group('footing',[box(x-.25,y-.25,-.16,.5,.5,.27,'#819cae','#4d6678','#365062')]))
parts.append(group('foundations',foot))
parts.append(group('slab',[box(.5,.5,0,12,9,.18,'#a8bbc7','#647e90','#4b6679')]))
# Patio and pool are outside the footprint, shown at finish stage.
steel=[]
for x,y in [(1,1),(5,1),(8.5,1),(12,1),(1,5.8),(5,5.8),(8.5,5.8),(12,5.8),(1,9),(5,9),(8.5,9),(12,9)]:
 steel.append(group('column',[box(x-.055,y-.055,.18,.11,.11,3.05,'#b5d4e4','#75a6bd','#456d87')]))
for y in [1,5.8,9]:steel.append(group('beam',[box(.9,y-.05,3.2,11.2,.13,.16,'#a8c7d7','#7598ae','#3d6179')]))
for x in [1,5,8.5,12]:steel.append(group('beam',[box(x-.05,.9,3.2,.13,8.2,.16,'#a8c7d7','#7598ae','#3d6179')]))
parts.append(group('frame',steel))
# Volumes left rear and garage, concrete façades and visible panel joints.
walls=[]
walls.append(group('wall',[box(.95,.95,.18,11.1,.19,3.05,'#d2dee5','#b8cbd6','#879eaf')]))
walls.append(group('wall',[box(.95,1.14,.18,.18,7.9,3.05,'#d2dee5','#b8cbd6','#879eaf')]))
walls.append(group('wall',[box(4.85,5.65,.18,.18,3.35,3.05,'#d2dee5','#b8cbd6','#879eaf')]))
walls.append(group('wall',[box(.95,8.84,.18,3.9,.18,3.05,'#d2dee5','#b8cbd6','#879eaf')]))
walls.append(group('wall',[box(11.86,1.1,.18,.18,4.65,3.05,'#d2dee5','#b8cbd6','#879eaf')]))
walls.append(group('wall',[box(8.4,1.12,.18,.17,2.7,3.05,'#d2dee5','#b8cbd6','#879eaf')]))
# Fine concrete board joints, clipped geometrically to the two exposed faces.
for z in [.55,1,1.45,1.9,2.35,2.8]:
 walls.append(group('wall-joint',[line((1,9.03,z),(4.83,9.03,z),'#91a9b9',.6),line((12.05,1.1,z),(12.05,5.7,z),'#728d9f',.6)]))
parts.append(group('envelope',walls))
glass=[]
for x in [5.05,6.18,7.31,8.44,9.57,10.70]:
 glass.append(group('pane',[poly([(x,5.78,.24),(x+1.07,5.78,.24),(x+1.07,5.78,3.12),(x,5.78,3.12)],'#35617b','#b0d9e9',1),poly([(x+.08,5.79,.38),(x+.16,5.79,.38),(x+.98,5.79,3.02),(x+.8,5.79,3.02)],'#7ea8c0','none')]))
for y in [1.25,2.38,3.51,4.64]:
 glass.append(group('pane',[poly([(12.07,y,.27),(12.07,y+1.04,.27),(12.07,y+1.04,3.13),(12.07,y,3.13)],'#254a65','#719fbb',1)]))
# Window into front wing.
glass.append(group('pane',[poly([(1.45,9.04,1.1),(4.3,9.04,1.1),(4.3,9.04,2.6),(1.45,9.04,2.6)],'#335c76','#2c4a60',4)]))
for x in [2.4,3.35]:glass.append(group('mullion',[line((x,9.06,1.1),(x,9.06,2.6),'#163244',2)]))
parts.append(group('glazing',glass))
# Two flat slab roof planes with overhangs and slender edge trims.
roofs=[group('roof-piece',[box(.45,.45,3.28,12.2,5.85,.18,'#d8e4eb','#95abbc','#496a82')]),group('roof-piece',[box(.45,6.3,3.28,5,3.2,.18,'#c6d6e2','#809aaf','#496a82')]),group('roof-piece',[box(8.1,6.3,3.28,4.55,3.2,.18,'#b4c9d8','#7693a8','#3c5e79')])]
for y in [1,2,3,4,5]: roofs.append(group('roof-seam',[line((.55,y,3.47),(12.5,y,3.47),'#aac1d1',.65)]))
parts.append(group('roofs',roofs))
land=[]
land.append(group('patio',[box(5.5,6.3,.2,2.3,4,.08,'#718d9f','#547183','#385970')]))
for y in [6.7,7.5,8.3,9.1,9.9]:land.append(group('paver',[box(5.6,y,.3,2.1,.55,.04,'#c2d1d9','#819aaa','#4d6a7d')]))
land.append(group('pool',[box(8.2,9.8,.1,4.5,1.4,.09,'#77b8cd','#47788e','#33576e')]))
# Planters, native trees in steel blue desaturated vegetation.
for x,y in [(0,9.5),(13.1,5.2),(-.1,3.5)]:
 tree=box(x-.28,y-.28,.14,.56,.56,.38,'#667e8c','#4b6578','#314b61')
 a,b=p(x,y,.5); tree+=f'<path d="M{a},{b}v-90" stroke="#688c9f" stroke-width="5"/>'
 for dx,dy,r in [(-18,-95,24),(15,-91,29),(0,-118,22)]:tree+=f'<circle cx="{a+dx}" cy="{b+dy}" r="{r}" fill="#426776" stroke="#7594a1" stroke-width="1"/>'
 land.append(group('tree',[tree]))
parts.append(group('landscape',land))
# Architectural dimensioning.
dim=[]
for a,b in [((.5,11.9,0),(12.5,11.9,0)),((14,1,0),(14,9,0))]:
 dim.append(line(a,b,'#91cee3',1))
 for q in [a,b]:dim.append(line((q[0]-.12,q[1]-.12,.12),(q[0]+.12,q[1]+.12,-.12),'#91cee3',1))
parts.append(group('dimensions',dim))
svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-label="Architectural axonometric of a completed modern concrete and glass home" id="house-svg"><g id="house-world" data-layout-allow-overflow="">'+''.join(parts)+'</g></svg>'
ElementTree.fromstring(svg)  # Standalone SVG is XML, including data attributes.
(root/'assets'/'house.svg').write_text(svg)
# The composition is one uninterrupted scene: phases accumulate as the house builds.
html='''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=1600,height=900"><title>From ground to home — ACCP</title>
<script src="../assets/gsap.min.js"></script><style>
@font-face{font-family:Inter;src:url(../assets/inter.woff2)}
*{box-sizing:border-box}html,body{margin:0;width:1600px;height:900px;overflow:hidden;background:#081622;color:#f1f5f7;font-family:Inter,sans-serif}
#root{width:100%;height:100%;position:relative;overflow:hidden}.scene-content{width:100%;height:100%;padding:54px 64px;display:flex;flex-direction:column;justify-content:space-between;position:relative;z-index:2;pointer-events:none}
.topline,.bottomline{display:flex;justify-content:space-between;align-items:center;gap:32px;font-size:24px;letter-spacing:.06em}.topline span:last-child{color:#a9b8c3}.bottomline p{margin:0;font-size:22px;letter-spacing:0}.bottomline small{font-size:23px;color:#a9b8c3}.film-title{margin:12px 0 0;font-size:60px;letter-spacing:-.04em;line-height:1.1;max-width:850px}.accent{color:#91cee3}#house-svg{position:absolute;inset:0;width:100%;height:100%}.progress-rail{position:absolute;left:64px;right:64px;bottom:113px;height:1px;background:#345064}.progress{height:2px;width:100%;background:#91cee3;transform-origin:left}.phase-labels{display:flex;gap:30px}.phase-labels span{font-size:23px;color:#a9b8c3}
</style></head><body><div id="root" data-composition-id="construction" data-start="0" data-duration="18" data-width="1600" data-height="900">
'''+svg+'''
<div class="scene-content"><div><div class="topline"><span id="film-brand">ACCP / CONSTRUCTION</span><span id="film-category">BUILT IN PRECISION</span></div><h1 class="film-title" id="film-title">From ground. <span class="accent">To home.</span></h1></div>
<div class="bottomline"><div class="phase-labels"><span id="ph1">Site</span><span id="ph2">Foundation</span><span id="ph3">Structure</span><span id="ph4">Envelope</span><span id="ph5">Finish</span></div><small id="film-note">Illustrative construction study</small></div></div><div class="progress-rail" aria-hidden="true"><div class="progress"></div></div></div>
<script>
window.__timelines=window.__timelines||{};
const tl=gsap.timeline({paused:true});
tl.from('#film-brand',{opacity:0,y:8,duration:.4,ease:'power3.out'},.15);
tl.from('#film-category',{opacity:0,duration:.45,ease:'sine.out'},.2);
tl.from('#film-title',{opacity:0,y:12,duration:.6,ease:'expo.out'},.3);
tl.from('#film-note',{opacity:0,duration:.5,ease:'sine.out'},.4);
tl.from('.phase-labels span',{opacity:0,y:6,stagger:.06,duration:.3,ease:'power2.out'},.4);
tl.from('.site-grid',{opacity:0,duration:1.2,ease:'sine.out'},.2);
tl.from('.survey',{opacity:0,duration:1.1,ease:'power2.out'},.4);
tl.from('.footing',{opacity:0,y:12,stagger:.055,duration:.5,ease:'power3.out'},1.3);
tl.from('.slab',{opacity:0,y:12,duration:.7,ease:'expo.out'},2.7);
tl.from('.column',{opacity:0,y:-18,stagger:.1,duration:.65,ease:'power3.out'},4);
tl.from('.beam',{opacity:0,y:-12,stagger:.085,duration:.6,ease:'power2.out'},5.1);
tl.from('.wall',{opacity:0,y:18,stagger:.22,duration:.7,ease:'power3.out'},6.7);
tl.from('.wall-joint',{opacity:0,stagger:.05,duration:.6,ease:'sine.out'},8.3);
tl.from('.pane',{opacity:0,y:8,stagger:.13,duration:.65,ease:'sine.out'},9);
tl.from('.mullion',{opacity:0,duration:.3,ease:'power2.out'},10.5);
tl.from('.roof-piece',{opacity:0,y:-24,stagger:.3,duration:.8,ease:'power3.out'},11);
tl.from('.roof-seam',{opacity:0,stagger:.08,duration:.4,ease:'sine.out'},12);
tl.from('.patio,.paver,.pool',{opacity:0,y:5,stagger:.085,duration:.55,ease:'power2.out'},12.8);
tl.from('.tree',{opacity:0,y:10,stagger:.2,duration:.75,ease:'power3.out'},13.6);
tl.from('.dimensions',{opacity:0,duration:.7,ease:'sine.out'},14.4);
tl.from('.progress',{scaleX:0,duration:15.5,ease:'none'},.2);
['#ph1','#ph2','#ph3','#ph4','#ph5'].forEach((s,i)=>tl.to(s,{color:'#f1f5f7',duration:.3,ease:'sine.out'},[.5,1.3,4,6.7,12.8][i]));
window.__timelines.construction=tl;
</script></body></html>'''
(root/'motion'/'assets').mkdir(exist_ok=True)
for asset in ['gsap.min.js','inter.woff2']:
 shutil.copy2(root/'assets'/asset,root/'motion'/'assets'/asset)
(root/'motion'/'index.html').write_text(html.replace('../assets/', 'assets/'))
print('Built house.svg and 18-second HyperFrames composition')
