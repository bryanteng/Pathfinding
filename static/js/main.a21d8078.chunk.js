(this.webpackJsonpPathfinding=this.webpackJsonpPathfinding||[]).push([[0],[,,,function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAA9ElEQVRIie3VPUoDQRQA4E/SKVhapc8B7CQ5gF7Au9hkQQvBQiw8h62CYG6gIAqiQsDaUlL5U8yMxEWLZV6s8uCxzOzu92b27bIsOHoBxhgn6OMObwHmdzT4xA3e8YrtaLzJ4z7Oc6HqIgW/as33MJF2slGLl2xa5wf4wH4E/leRW1xH4e0i5bpxJF5y4vcdheAlF7LyJR6HjzriTRccjvGIXTxF4yuY4iiP13EZhcNmvnlrbm5N+uyrcTjADKut+Z0IHO4zciGtfIhDqSed35Z2DPx8DLN8nEqNH9XgsDeHP0v/2KHU+KoowClecIaHWvRf4wvexKl5mWfsbQAAAABJRU5ErkJggg=="},,,,,,,function(t,e,a){"use strict";a.r(e);var n=a(1);e.default=function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;Object(n.a)(this,t),this.parent=e,this.pos=a,this.f=0,this.g=0,this.h=0,this.dist=r}},,function(t,e,a){t.exports=a(19)},,,,,function(t,e,a){},function(t,e,a){},function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),o=a(11),l=a.n(o),i=(a(17),a(18),a(8)),c=a(1),s=a(4),u=a(6),d=a(5),h=a(7),v=a(3),p=a.n(v),f=a(2),g=a(10).default;function m(t,e,a){for(var n=new g(void 0,e),r=new g(void 0,a),o=[n],l=[[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1]],i=t.length,c=t[0].length,s=function(t,e){return t>=0&&t<i&&e>=0&&e<c};o.length;){var u=o.shift(),d=u.parent,h=Object(f.a)(u.pos,2),v=h[0],p=h[1],m=u.dist;if(v==r.pos[0]&&p==r.pos[1]){for(var b=new g(d,[v,p],m),y=[];b;)console.log(b.pos),y.push(b.pos),b=b.parent;var E=!0,A=!1,k=void 0;try{for(var C,O=o[Symbol.iterator]();!(E=(C=O.next()).done);E=!0){var S=C.value;t[S.pos[0]][S.pos[1]]="x"}}catch(P){A=!0,k=P}finally{try{E||null==O.return||O.return()}finally{if(A)throw k}}for(var w=0,x=y;w<x.length;w++){var j=x[w];t[j[0]][j[1]]="O"}return t}var B=!0,H=!1,N=void 0;try{for(var _,Q=l[Symbol.iterator]();!(B=(_=Q.next()).done);B=!0){var z=Object(f.a)(_.value,2),D=z[0],I=z[1],J=v+D,R=p+I;if(s(J,R)&&0===t[J][R]){var L=new g(u,[J,R],m+1);o.push(L),t[J][R]="x"}}}catch(P){H=!0,N=P}finally{try{B||null==Q.return||Q.return()}finally{if(H)throw N}}}return-1}var b=a(10).default;function y(t,e,a){for(var n=new b(void 0,e),r=new b(void 0,a),o=[n],l=[],i=t.length,c=t[0].length,s=function(){var e=o[0],a=0;o.forEach((function(t,n){t.f<e.f&&(e=t,a=n)}));o.splice(a,1)[0];if(l.push(e),e.pos[0]==r.pos[0]&&e.pos[1]==r.pos[1]){for(var n=[],s=e;s;)n.push(s.pos),s=s.parent;var u=!0,d=!1,h=void 0;try{for(var v,p=o[Symbol.iterator]();!(u=(v=p.next()).done);u=!0){var g=v.value;t[g.pos[0]][g.pos[1]]="x"}}catch(V){d=!0,h=V}finally{try{u||null==p.return||p.return()}finally{if(d)throw h}}for(var m=0,y=n;m<y.length;m++){var E=y[m];t[E[0]][E[1]]="O"}return{v:t}}for(var A,k,C=[],O=0,S=[[0,-1],[0,1],[-1,0],[1,0],[-1,-1],[-1,1],[1,-1],[1,1]];O<S.length;O++){var w=Object(f.a)(S[O],2),x=w[0],j=w[1],B=e.pos[0]+x,H=e.pos[1]+j;if(k=H,(A=B)>=0&&A<i&&k>=0&&k<c&&0==t[B][H]){var N=new b(e,[B,H]);C.push(N)}}for(var _=0,Q=C;_<Q.length;_++){var z=Q[_];console.log(z,"child");var D=!0,I=!1,J=void 0;try{for(var R,L=l[Symbol.iterator]();!(D=(R=L.next()).done);D=!0){var P=R.value;if(z.pos[0]!=P.pos[0]||z.pos[1]!=P.pos[1]){z.g=e.g+1,z.h=Math.pow(z.pos[0]-r.pos[0],2)+Math.pow(z.pos[1]-r.pos[1],2),z.f=z.g+z.h;var F=!0,U=!1,G=void 0;try{for(var K,M=o[Symbol.iterator]();!(F=(K=M.next()).done);F=!0){var T=K.value;z==T&&(z.g,T.g)}}catch(V){U=!0,G=V}finally{try{F||null==M.return||M.return()}finally{if(U)throw G}}o.push(z),t[e.pos[0]][e.pos[1]]=1}}}catch(V){I=!0,J=V}finally{try{D||null==L.return||L.return()}finally{if(I)throw J}}}};o.length>0;){var u=s();if("object"===typeof u)return u.v}return!1}var E=function(t){function e(){return Object(c.a)(this,e),Object(u.a)(this,Object(d.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){var t=this.props,e=t.key,a=t.loc,n=t.block;if(n){var o="";"O"==n?o="LimeGreen":"x"==n&&(o="#C80003")}return r.a.createElement("td",{className:"block",key:e,loc:a,style:{backgroundColor:o||null},onClick:this.props.onClick},n)}}]),e}(n.Component),A=function(t){function e(){var t,a;Object(c.a)(this,e);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(u.a)(this,(t=Object(d.a)(e)).call.apply(t,[this].concat(r)))).state={x_coord:10,y_coord:10,start:"1,1",editStart:!1,end:"7,7",editEnd:!1,selectedOption:"aStar",boardState:[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]},a.change_coord=function(t){var e=t.target.validity.valid?t.target.value:a.state[t.target.id];a.setState(Object(i.a)({},t.target.id,+e),(function(){var t=a.cleanBoard();a.setState({boardState:t})}))},a.clickedCell=function(t){a.state.editStart?a.setState({start:t.target.getAttribute("loc"),editStart:!1}):a.state.editEnd&&a.setState({end:t.target.getAttribute("loc"),editEnd:!1})},a.buttonClick=function(t){a.setState(Object(i.a)({},t.target.id,!a.state[t.target.id]))},a.solveClick=function(t){var e,n=a.state.start.split(",").map((function(t){return+t})),r=a.state.end.split(",").map((function(t){return+t}));"aStar"==a.state.selectedOption?e=y(a.cleanBoard(),n,r):"BFS"==a.state.selectedOption&&(e=m(a.cleanBoard(),n,r)),console.log(e),a.setState({boardState:e})},a.resetClick=function(){var t=a.cleanBoard();a.setState({boardState:t})},a.cleanBoard=function(){var t="0".repeat(a.state.y_coord).split("").map((function(t){return+t}));return Array.from({length:a.state.x_coord}).map((function(e){return t.slice()})).slice()},a.optionChange=function(t){console.log(t.target.value),a.setState({selectedOption:t.target.value})},a}return Object(h.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){var t=this;return console.log(this.state),r.a.createElement("div",null,r.a.createElement("h1",null," Pathfinding "),r.a.createElement("label",null,"number of rows: "),r.a.createElement("input",{type:"text",pattern:"[0-9]*",value:this.state.x_coord,id:"x_coord",onChange:this.change_coord}),r.a.createElement("img",{src:p.a,alt:"website logo"}),r.a.createElement("label",null,"number of columns: "),r.a.createElement("input",{type:"text",pattern:"[0-9]*",value:this.state.y_coord,id:"y_coord",onChange:this.change_coord}),r.a.createElement("img",{src:p.a,alt:"website logo"}),r.a.createElement("label",null,"start:[",this.state.start,"]"),r.a.createElement("button",{id:"editStart",onClick:this.buttonClick},this.state.editStart?"click a cell":"click to edit start"),r.a.createElement("img",{src:p.a,alt:"website logo"}),r.a.createElement("label",null,"end:[",this.state.end,"]"),r.a.createElement("button",{id:"editEnd",onClick:this.buttonClick},this.state.editEnd?"click a cell":"click to edit end"),r.a.createElement("img",{src:p.a,alt:"website logo"}),r.a.createElement("form",null,r.a.createElement("div",{className:"radio"},r.a.createElement("label",null,r.a.createElement("input",{type:"radio",value:"aStar",onChange:this.optionChange,checked:"option1"===this.state.selectedOption}),"A* algorithm")),r.a.createElement("div",{className:"radio"},r.a.createElement("label",null,r.a.createElement("input",{type:"radio",value:"BFS",onChange:this.optionChange,checked:"option2"===this.state.selectedOption}),"Breadth first Search Algorithm"))),r.a.createElement("button",{id:"solve",onClick:this.solveClick},"solve path"),r.a.createElement("button",{id:"reset",onClick:this.resetClick},"reset board"),r.a.createElement("table",{className:"maze"},r.a.createElement("tbody",null,this.state.boardState.map((function(e,a){return r.a.createElement("tr",{key:a,className:"line"},e.map((function(e,n){return r.a.createElement(E,{key:n,loc:[a,n],style:{backgroundColor:e||null},onClick:t.clickedCell.bind(t),block:e})})))})))))}}]),e}(n.Component);var k=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(A,null))};l.a.render(r.a.createElement(k,null),document.getElementById("root"))}],[[12,1,2]]]);
//# sourceMappingURL=main.a21d8078.chunk.js.map