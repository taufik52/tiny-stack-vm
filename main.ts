import{mkdirSync,readdirSync,readFileSync as f,writeFileSync as w}from"node:fs";
let o;
function R(p,q){
 let D=new Int32Array(256),C=[],M=[],n=p.length,pc=0,ip=0,sp=0,cp=0,st=0,a,b,r,s,x;
 o=[];
 for(;;){
  if(st==1e6)return 10;
  if(pc<0||pc>=n)return 9;
  let k=p[pc];
  if(k>83||k==31||(k>7&&k<16)||(k>34&&k<48)||(k>52&&k<64)||(k>65&&k<80))return 5;
  let m=k==1?1:k==2?4:k>=48&&k<52?2:0;
  if(pc+m>=n)return 9;
  st++;x=pc+1+m;pc=x;
  if(k>=16&&k<=34&&k!=23&&k!=27){
   if(sp<2)return 2;
   b=D[--sp];a=D[sp-1];
   if(b==0&&k>=19&&k<=22)return 4;
   D[sp-1]=[a+b,a-b,Math.imul(a,b),a/b,a%b,(a>>>0)/(b>>>0),(a>>>0)%(b>>>0),0,a&b,a|b,a^b,0,a<<b,a>>b,a>>>b,0,a==b?1:0,a<b?1:0,(a>>>0)<(b>>>0)?1:0][k-16];
   continue;
  }
  switch(k){
   case 0:return 0;
   case 1:case 2:case 82:
    if(sp>255)return 3;
    D[sp++]=k==1?(p[x-1]<<24)>>24:k==2?p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24:ip<q.length?q[ip++]:-1;
    break;
   case 3:if(sp<1)return 2;sp--;break;
   case 4:if(sp<1)return 2;if(sp>255)return 3;D[sp]=D[sp-1];sp++;break;
   case 5:if(sp<2)return 2;r=D[sp-1];D[sp-1]=D[sp-2];D[sp-2]=r;break;
   case 6:if(sp<2)return 2;if(sp>255)return 3;D[sp]=D[sp-2];sp++;break;
   case 7:if(sp<3)return 2;r=D[sp-3];D[sp-3]=D[sp-2];D[sp-2]=D[sp-1];D[sp-1]=r;break;
   case 23:case 27:if(sp<1)return 2;D[sp-1]=k==23?-D[sp-1]:~D[sp-1];break;
   case 48:case 49:case 50:
    r=((p[x-2]|p[x-1]<<8)<<16)>>16;
    if(k>48){if(sp<1)return 2;a=D[--sp];if((a==0)!=(k==49))break;}
    pc=x+r;break;
   case 51:if(cp>63)return 7;C[cp++]=x;pc=p[x-2]|p[x-1]<<8;break;
   case 52:if(cp==0)return 8;pc=C[--cp];break;
   case 64:if(sp<1)return 2;a=D[sp-1];if(a<0||a>255)return 6;D[sp-1]=M[a]||0;break;
   case 65:if(sp<2)return 2;a=D[sp-1];if(a<0||a>255)return 6;M[a]=D[sp-2];sp-=2;break;
   case 80:if(sp<1)return 2;s=""+D[sp-1];if(o.length+s.length>65536)return 11;sp--;o.push(...Buffer.from(s));break;
   case 81:if(sp<1)return 2;if(o.length>65535)return 11;o.push(D[--sp]&255);break;
   case 83:if(sp<1)return 2;return D[--sp]&255;
  }
 }
}
const I=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output";
for(let d of readdirSync(I).sort()){
 let c=R(f(I+"/"+d+"/program.bin"),f(I+"/"+d+"/input.bin"));
 mkdirSync(O+"/"+d,{recursive:true});
 w(O+"/"+d+"/stdout.bin",Buffer.from(o));
 w(O+"/"+d+"/exit.txt",c+"\n");
}
