/* Signing out shows a short "Signing out…" screen first (an instant swap looked like a glitch), on every page with a
   #account-signout-btn or a game panel's #sign-out button.
   One "Sign in" button: on customer pages the old "Sign in with Google" / "Sign in with email code" pair becomes a single
   Sign in button that opens /signin.html (choose Google or an email code there), then comes back to this page.
   VoxSignIn() does the same from code (game panels, the guest email check). */
(function(){
  function go(){ location.href = '/signin.html?next=' + encodeURIComponent(location.pathname + location.search + location.hash); }
  window.VoxSignIn = go;
  var st = document.createElement('style');
  st.textContent = '#email-code-btn{display:none!important}';
  (document.head || document.documentElement).appendChild(st);
  // the page's own Google handler never runs; a click from code (e.g. the guest email check) lands here too
  document.addEventListener('click', function(e){
    var b = e.target && e.target.closest && e.target.closest('#google-signin-btn');
    if (!b) return;
    e.preventDefault(); e.stopImmediatePropagation(); go();
  }, true);
  function relabel(){
    var b = document.getElementById('google-signin-btn');
    if (b && !b.dataset.vxSignin){ b.dataset.vxSignin = '1'; b.innerHTML = '<svg class="ico" width="1em" height="1em" aria-hidden="true"><use href="/icons.svg#user"/></svg> Sign in'; }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', relabel); else relabel();

  // ---- first sign-in: every account needs a full name; anyone signed in without one goes to /signin.html to set it ----
  function nameCheck(){
    if (/^\/signin(\.html)?$/.test(location.pathname)) return;
    var tok = null;
    try { tok = JSON.parse(localStorage.getItem('sb-paycasfatsakidsriwqt-auth-token') || 'null'); } catch (e) {}
    var uid = tok && tok.user && tok.user.id;
    if (!uid || !tok.access_token) return;
    try { if (localStorage.getItem('vx-has-name') === uid) return; } catch (e) {}
    fetch('https://paycasfatsakidsriwqt.supabase.co/rest/v1/customer_profiles?select=full_name&id=eq.' + encodeURIComponent(uid), {
      headers: { apikey: 'sb_publishable_Yk3l_-tXm4qtaRnrfw54pw_Awel9tCv', Authorization: 'Bearer ' + tok.access_token }
    }).then(function(r){ return r.ok ? r.json() : null; }).then(function(rows){
      if (!Array.isArray(rows)) return;   // couldn't check: leave it
      var n = rows[0] && (rows[0].full_name || '').trim();
      if (n && n.split(/\s+/).length >= 2){ try { localStorage.setItem('vx-has-name', uid); } catch (e) {} return; }
      go();
    }, function(){});
  }
  // after a Google redirect the session is saved a moment after the page loads
  setTimeout(nameCheck, 1500); setTimeout(nameCheck, 5000);


  var outCss = document.createElement('style');
  outCss.textContent =
    '#vx-signout-ov{position:fixed;inset:0;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;' +
      'background:rgba(13,17,23,.55);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);color:#e6edf3;' +
      'font:600 15px -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;opacity:0;transition:opacity .2s ease}' +
    '#vx-signout-ov.on{opacity:1}' +
    '#vx-signout-ov i{width:30px;height:30px;border-radius:50%;border:3px solid rgba(255,255,255,.25);border-top-color:#4493f8;animation:vxspin .7s linear infinite}' +
    '@keyframes vxspin{to{transform:rotate(360deg)}}';
  (document.head || document.documentElement).appendChild(outCss);
  var passing = false;
  document.addEventListener('click', function(e){
    var b = e.target && e.target.closest && e.target.closest('#account-signout-btn, #sign-out, #cz-ban-out');
    if (!b || passing || b.disabled) return;
    e.preventDefault(); e.stopImmediatePropagation();
    var ov = document.createElement('div'); ov.id = 'vx-signout-ov'; ov.setAttribute('role', 'status');
    ov.innerHTML = '<i></i><span>Signing out…</span>';
    document.body.appendChild(ov);
    requestAnimationFrame(function(){ ov.classList.add('on'); });
    setTimeout(function(){
      passing = true; try { b.click(); } finally { passing = false; }
      setTimeout(function(){ ov.classList.remove('on'); setTimeout(function(){ ov.remove(); }, 250); }, 500);
    }, 900);
  }, true);
})();
