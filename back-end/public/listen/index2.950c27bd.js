function e(e){return e&&e.__esModule?e.default:e}var t=globalThis,n={},r={},s=t.parcelRequire94c2;null==s&&((s=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var s={id:e,exports:{}};return n[e]=s,t.call(s.exports,s,s.exports),s.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){r[e]=t},t.parcelRequire94c2=s),s.register;var i=s("iM5HV"),o=s("fYo6y"),a=s("b2S2j"),i=s("iM5HV"),o=s("fYo6y"),l=s("3gKTU"),c=s("2Efon"),u=s("b8C0m");const d=e(l).get("conversationId")||"",h=e(l).get("conversationName")||"",f=e(l).get("whispererName")||"",p=e(l).get("clientId")||"";let g=e(l).get("clientName")||"";d&&f&&p&&h||(window.location.href="/subscribe404.html");const v=new u.Realtime.Promise({clientId:p,authUrl:"/api/v2/listenTokenRequest",echoMessages:!1});function m(t){let[n,r]=(0,o.useState)(t.name);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("h1",{children:"Advisory"}),(0,i.jsx)("p",{children:"By entering your name below, you are agreeing to receive messages sent by another user (the Whisperer) in a remote location.  Your name and agreement will be remembered in this browser for all conversations with all Whisperers until you clear your browser's cookies for this site."}),(0,i.jsx)("h2",{children:"Please provide your name to the Whisperer:"}),(0,i.jsx)("input",{name:"listenerName",id:"listenerName",type:"text",value:n.valueOf(),onChange:function(e){r(g=e.target.value)}}),(0,i.jsx)("button",{id:"updateButton",type:"button",onClick:function(){t.setName(g),e(l).set("clientName",g,{expires:365})},children:"Agree & Save Name"})]})}function x(){return console.log("Closing all connections"),v.close(),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("h1",{children:["The conversation with ",f," has ended"]}),(0,i.jsxs)("p",{children:["You can close this window or ",(0,i.jsx)("a",{href:window.location.href,children:"click here to listen again"}),"."]})]})}function j(e){let[t,n]=(0,o.useState)("initial"),{channel:r}=(0,c.useChannel)(`${d}:control`,t=>(function(e,t,n,r){let s=p.toUpperCase(),i=e.name.toUpperCase();if(i!=s&&"ALL"!=i)return;let o=function(e){let t=e.split("|"),n=function(e){switch(e){case"-20":return"whisperOffer";case"-21":return"listenRequest";case"-22":return"listenAuthYes";case"-23":return"listenAuthNo";case"-24":return"joining";case"-25":return"dropping";case"-26":return"listenOffer";case"-40":return"requestReread";default:return}}(t[0]);if(7==t.length&&n)return{offset:n,conversationId:t[1],conversationName:t[2],clientId:t[3],profileId:t[4],username:t[5],contentId:t[6]}}(e.data);if(!o){console.error(`Ignoring invalid control packet: ${e.data}`),n("Ignoring an invalid packet; see log for details");return}switch(o.offset){case"dropping":console.log("Whisperer is dropping this client"),r();break;case"listenAuthYes":console.log(`Received content id: ${o.contentId}`),o.contentId.match(/^[A-Za-z0-9-]{36}$/)?n(o.contentId):(console.error(`Invalid content id: ${o.contentId}`),alert("Communication error: invalid channel id!"),r());break;case"listenAuthNo":console.log("Whisperer refused listener presence"),n("denied"),setTimeout(r,1e3);break;case"whisperOffer":console.log("Received Whisper offer, sending request"),n("requesting"),console.log(`Received whisper offer from ${o.clientId}, sending listen request`);let a=$("listenRequest"),l=`${a}|${d}|${o.conversationName}|${p}|${p}|${g}|`;t.publish(o.clientId,l)}})(t,r,n,e.terminate));return(y(()=>(function(e){console.log("Sending listen offer");let t=`${$("listenOffer")}|${d}||${p}|${p}||`;e.publish("whisperer",t).then()})(r),"initialOffer",1),t.match(/^[A-Za-z0-9-]{36}$/))?(0,i.jsx)(b,{contentId:t,reread:()=>(function(e){if(R)return;console.log("Requesting resend of live text..."),R=!0;let t=`${$("requestReread")}|live`;e.publish("whisperer",t).then()})(r)}):(0,i.jsx)(w,{status:t})}function w(e){let t;switch(e.status){case"initial":t="Starting to connect...";break;case"requesting":t="Requesting permission to join the conversation...";break;case"aborted":t="Conversation terminated at user request";break;case"denied":t="Whisperer refused entry into the conversation";break;default:t="Connection complete, starting to listen..."}return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("h1",{children:["Conversation “",h,"” with ",f]}),(0,i.jsx)("form",{children:(0,i.jsx)("textarea",{rows:1,id:"status",value:t})})]})}function b(e){let[t,n]=(0,o.useState)({live:"",past:""});return(0,c.useChannel)(`${d}:${e.contentId}`,t=>(function(e,t,n){let r=p.toUpperCase(),s=e.name.toUpperCase(),i=e.data;if(s==r||"ALL"==s){if(i.startsWith("-7|"))console.warn(`Received request to play ${i.substring(3)} sound, but can't do that`);else if(R)i.startsWith("-4|")?(console.log("Received reset acknowledgement from whisperer, resetting live text"),t(e=>({live:"",past:e.past}))):k(i)?console.log("Ignoring diff chunk because a read is in progress"):i.startsWith("-1|")||i.startsWith("-2|")?console.log("Received unexpected past line chunk, ignoring it"):i.startsWith("-3|")&&(console.log("Receive live text chunk, update is over"),t(e=>({live:i.substring(3),past:e.past})),R=!1);else if(k(i)){if(i.startsWith("0|"))t(e=>({live:i.substring(2),past:e.past}));else if(i.startsWith("-1|"))console.log("Prepending live text to past line"),t(e=>({live:"",past:e.live+"\n"+e.past}));else{let[e,r]=i.split("|",2),s=parseInt(e);t(e=>!s||s>e.live.length?(n(),e):{live:e.live.substring(0,s)+r,past:e.past})}}else console.log("Ignoring non-diff chunk because no read in progress")}})(t,n,e.reread)),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("h1",{children:["Conversation “",h,"” with ",f]}),(0,i.jsx)("form",{children:(0,i.jsx)(I,{text:t,reread:e.reread})})]})}function I(e){return y(e.reread,"initialRead",1),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("textarea",{id:"liveText",rows:10,value:e.text.live}),(0,i.jsx)("textarea",{id:"pastText",rows:30,readOnly:!0,value:e.text.past})]})}let R=!1;function $(e){switch(e){case"whisperOffer":return"-20";case"listenRequest":return"-21";case"listenAuthYes":return"-22";case"listenAuthNo":return"-23";case"joining":return"-24";case"dropping":return"-25";case"listenOffer":return"-26";case"requestReread":return"-40";default:return}}function k(e){return e.startsWith("-1")||!e.startsWith("-")}const q={};function y(e,t,n){let r=q[t]||0;r<n&&(q[t]=r+1,e())}(0,a.createRoot)(document.getElementById("root")).render((0,i.jsx)(o.StrictMode,{children:(0,i.jsx)(function(){let[e,t]=(0,o.useState)(!0),[n,r]=(0,o.useState)(g);return n?e?(0,i.jsx)(c.AblyProvider,{client:v,children:(0,i.jsx)(j,{terminate:()=>t(!1)})}):(0,i.jsx)(x,{}):(0,i.jsx)(m,{name:n,setName:r})},{})}));