import{j as e,r as o,u as c,s as i,d,b as p,g as u,l as x,E as l,m,k as g,L as h,n as j}from"./index-e16e30f8.js";import{I as f}from"./index-a8b10be9.js";const v=({imageData:a})=>{const[s,r]=o.useState(!1),t=c();return e.jsxs("div",{className:"image--container",onMouseEnter:()=>r(!s),onMouseLeave:()=>r(!s),onClick:()=>{t(i(!0)),t(d({targetImage:a.date}))},children:[e.jsx(p.LazyLoadImage,{src:a.url,placeholderSrc:"/vite.svg",alt:"Image Alt",effect:"blur"}),s&&e.jsx("div",{className:"image--cover",children:e.jsx("p",{children:a.explanation})})]})},E=({imageData:a})=>e.jsx("div",{className:"image--block",children:a.map(s=>e.jsx(v,{imageData:s},s.date))});const L=()=>{const{images:a,status:s}=u(t=>t.exploreReducer),r=c();return o.useEffect(()=>{r(x(12));const t=()=>r(j());return()=>{t()}},[r]),e.jsxs(e.Fragment,{children:[(s===l.Ready||s===l.Adding)&&e.jsx("div",{id:"scrollableDivExplore",className:"explore--container",children:e.jsx(f,{scrollableTarget:"scrollableDivExplore",className:"infinite--scroll",dataLength:a.length/3,next:()=>{r(m(6))},hasMore:!0,loader:e.jsx("span",{className:"loader--icon",children:e.jsx(g,{})}),endMessage:e.jsx(e.Fragment,{}),children:a.map((t,n)=>(n+1)%3===0?e.jsx(E,{imageData:a.slice(n-2,n+1)},n):null)})}),s===l.Loading&&e.jsx(h,{})]})};export{L as default};
