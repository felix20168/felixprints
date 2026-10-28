[38;2;85;247;212m                           [39m[49m    felixm@felix-20w8001yau
[49m[38;2;85;247;212m       _,met$$$$$gg.       [39m[49m    -----------------------
[49m[38;2;85;247;212m    ,g$$$$$$$$$$$$$$$P.    [39m[49m    OS: Debian GNU/Linux forky/sid (forky) x86_64
[49m[38;2;85;247;212m  ,g$$P"        """Y$$.".  [39m[49m    Host: 20W8001YAU (ThinkPad X13 Yoga Gen 2)
[49m[38;2;152;232;193m ,$$P'              `$$$.  [39m[49m    Kernel: Linux 7.2.11+deb14-amd64
[49m[38;2;152;232;193m',$$P       ,ggs.     `$$b:[39m[49m    Uptime: 6 days, 2 hours, 45 mins
[49m[38;2;152;232;193m`d$$'     ,$P"'   .    $$$ [39m[49m    Packages: 4143 (dpkg), 81 (flatpak)
[49m[38;2;152;232;193m $$P      d$'     ,    $$P [39m[49m    Shell: hyfetch
[49m[38;2;255;255;255m $$:      $$.   -    ,d$$' [39m[49m    Display (eDP-1): 1920x1200 [Built-in]
[49m[38;2;255;255;255m $$;      Y$b._   _,d$P'   [39m[49m    Desktop Environment: KDE Plasma 6.7.4
[49m[38;2;255;255;255m Y$$.    `.`"Y$$$$P"'      [39m[49m    Window Manager: KDE (Wayland)
[49m[38;2;123;173;226m `$$b      "-.__           [39m[49m    Theme: Breeze (PinkWolf) [Qt], Breeze [GTK2/3/4]
[49m[38;2;123;173;226m  `Y$$                     [39m[49m    Icons: breeze [Qt], breeze [GTK2/3/4]
[49m[38;2;123;173;226m   `Y$$.                   [39m[49m    Font: Noto Sans (10pt) [Qt], Noto Sans (10pt) [GTK2/3/4]
[49m[38;2;123;173;226m     `$$b.                 [39m[49m    Cursor: breeze (24px)
[49m[38;2;151;108;223m       `Y$$b.              [39m[49m    Terminal: kitty 0.48.2
[49m[38;2;151;108;223m          `"Y$b._          [39m[49m    CPU: 11th Gen Intel(R) Core(TM) i5-1135G7 (8) @ 4.20 GHz
[49m[38;2;151;108;223m              `"""         [39m[49m    GPU: Intel Iris Xe Graphics @ 1.30 GHz [Integrated]
[49m[38;2;151;108;223m                           [39m[49m    Memory: 6.30 GiB / 15.35 GiB (41%)
                               Swap: 943.43 MiB / 16.89 GiB (5%)
                               Disk (/): 172.34 GiB / 216.76 GiB (80%) - ext4 [Read-only]
                               Battery (5B11A13107): 21% [AC Connected, Charging]
                               Locale: C.UTF-8
                               
                               [40m   [41m   [42m   [43m   [44m   [45m   [46m   [47m   [m
                               [5m[100m   [101m   [102m   [103m   [104m   [105m   [106m   [107m   [m
const cart=[];const drawer=document.querySelector('#cartDrawer'),scrim=document.querySelector('#scrim');const money=n=>`$${n}`;function renderCart(){const items=document.querySelector('#cartItems');document.querySelector('#cartCount').textContent=cart.length;document.querySelector('#cartTotal').textContent=money(cart.reduce((sum,item)=>sum+item.price,0));if(!cart.length){items.innerHTML='<p class="empty-cart">Your bag is waiting for something beautiful.</p>';return}items.innerHTML=cart.map((item,i)=>`<div class="cart-line"><span>${item.name}</span><strong>${money(item.price)} <button aria-label="Remove ${item.name}" data-remove="${i}">×</button></strong></div>`).join('');items.querySelectorAll('[data-remove]').forEach(btn=>btn.addEventListener('click',()=>{cart.splice(Number(btn.dataset.remove),1);renderCart() }))}function toggleCart(open){drawer.classList.toggle('open',open);scrim.classList.toggle('open',open)}document.querySelectorAll('.add-btn').forEach(btn=>btn.addEventListener('click',()=>{cart.push({name:btn.dataset.name,price:Number(btn.dataset.price)});renderCart();toggleCart(true)}));document.querySelector('#cartButton').addEventListener('click',()=>toggleCart(true));document.querySelector('#closeCart').addEventListener('click',()=>toggleCart(false));scrim.addEventListener('click',()=>toggleCart(false));document.querySelectorAll('.filter').forEach(filter=>filter.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));filter.classList.add('active');const value=filter.dataset.filter;document.querySelectorAll('.product').forEach(product=>product.style.display=value==='all'||product.dataset.category===value?'block':'none')}));document.querySelector('#newsletterForm').addEventListener('submit',event=>{event.preventDefault();document.querySelector('#formMessage').textContent='You’re on the list — welcome to Felixprints.';event.target.querySelector('input').value=''});
