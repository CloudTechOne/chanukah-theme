/* Chanukah Landing Page for ChabadOne - v2.0.0
   Lights the hero menorah night by night, fills the countdown, and badges tonight.
   If this file is blocked, the page still shows a fully lit menorah. */
(function () {
    var MENORAH = '<svg viewBox="0 0 360 230" role="img" aria-label="Menorah" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="chGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbe3a1" /><stop offset="0.5" stop-color="#e2b44f" /><stop offset="1" stop-color="#a8741a" /></linearGradient><radialGradient id="chFlame" cx="0.5" cy="0.72" r="0.65"><stop offset="0" stop-color="#fffbe6" /><stop offset="0.4" stop-color="#ffd36b" /><stop offset="1" stop-color="#ff7a1a" /></radialGradient><radialGradient id="chGlowGrad"><stop offset="0" stop-color="#ffbe5a" stop-opacity="0.7" /><stop offset="1" stop-color="#ffbe5a" stop-opacity="0" /></radialGradient></defs><g stroke="url(#chGold)" stroke-width="5" stroke-linecap="round" fill="none"><path d="M180 182L40 76M180 182L320 76M180 160L75 76M180 160L285 76M180 138L110 76M180 138L250 76M180 116L145 76M180 116L215 76" /></g><g fill="url(#chGold)"><rect x="176" y="52" width="8" height="154" rx="3" /><path d="M140 224L220 224L206 204L154 204Z" /><rect x="30" y="70" width="20" height="6" rx="2" /><rect x="65" y="70" width="20" height="6" rx="2" /><rect x="100" y="70" width="20" height="6" rx="2" /><rect x="135" y="70" width="20" height="6" rx="2" /><rect x="205" y="70" width="20" height="6" rx="2" /><rect x="240" y="70" width="20" height="6" rx="2" /><rect x="275" y="70" width="20" height="6" rx="2" /><rect x="310" y="70" width="20" height="6" rx="2" /><rect x="170" y="46" width="20" height="6" rx="2" /></g><g fill="#fbf3e0"><rect x="36" y="42" width="8" height="28" rx="2" /><rect x="71" y="42" width="8" height="28" rx="2" /><rect x="106" y="42" width="8" height="28" rx="2" /><rect x="141" y="42" width="8" height="28" rx="2" /><rect x="211" y="42" width="8" height="28" rx="2" /><rect x="246" y="42" width="8" height="28" rx="2" /><rect x="281" y="42" width="8" height="28" rx="2" /><rect x="316" y="42" width="8" height="28" rx="2" /><rect x="176" y="24" width="8" height="22" rx="2" /></g><g class="light shamash" data-n="0"><circle class="glow" cx="180" cy="12" r="18" fill="url(#chGlowGrad)" /><path class="flame" d="M180 22C174 18 175 10 180 0C185 10 186 18 180 22Z" fill="url(#chFlame)" /></g><g class="light" data-n="1"><circle class="glow" cx="320" cy="30" r="17" fill="url(#chGlowGrad)" /><path class="flame" d="M320 40C314 36 315 28 320 18C325 28 326 36 320 40Z" fill="url(#chFlame)" /></g><g class="light" data-n="2"><circle class="glow" cx="285" cy="30" r="17" fill="url(#chGlowGrad)" /><path class="flame" d="M285 40C279 36 280 28 285 18C290 28 291 36 285 40Z" fill="url(#chFlame)" /></g><g class="light" data-n="3"><circle class="glow" cx="250" cy="30" r="17" fill="url(#chGlowGrad)" /><path class="flame" d="M250 40C244 36 245 28 250 18C255 28 256 36 250 40Z" fill="url(#chFlame)" /></g><g class="light" data-n="4"><circle class="glow" cx="215" cy="30" r="17" fill="url(#chGlowGrad)" /><path class="flame" d="M215 40C209 36 210 28 215 18C220 28 221 36 215 40Z" fill="url(#chFlame)" /></g><g class="light" data-n="5"><circle class="glow" cx="145" cy="30" r="17" fill="url(#chGlowGrad)" /><path class="flame" d="M145 40C139 36 140 28 145 18C150 28 151 36 145 40Z" fill="url(#chFlame)" /></g><g class="light" data-n="6"><circle class="glow" cx="110" cy="30" r="17" fill="url(#chGlowGrad)" /><path class="flame" d="M110 40C104 36 105 28 110 18C115 28 116 36 110 40Z" fill="url(#chFlame)" /></g><g class="light" data-n="7"><circle class="glow" cx="75" cy="30" r="17" fill="url(#chGlowGrad)" /><path class="flame" d="M75 40C69 36 70 28 75 18C80 28 81 36 75 40Z" fill="url(#chFlame)" /></g><g class="light" data-n="8"><circle class="glow" cx="40" cy="30" r="17" fill="url(#chGlowGrad)" /><path class="flame" d="M40 40C34 36 35 28 40 18C45 28 46 36 40 40Z" fill="url(#chFlame)" /></g></svg>';
    function pad(n) { return (n < 10 ? "0" : "") + n; }
    function run() {
        var slot = document.querySelector(".ch-menorah-slot");
        if (slot) { slot.innerHTML = MENORAH; slot.className += " live"; }
        var src = document.querySelector(".ch-start-date");
        var box = document.querySelector(".chl-countdown-slot");
        if (!src || !box) { return; }
        var m = (src.textContent || "").replace(/^\s+|\s+$/g, "").match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[ T](\d{1,2}):(\d{2}))?/);
        if (!m) { return; }
        var start = new Date(+m[1], +m[2] - 1, +m[3], +(m[4] || 16), +(m[5] || 0));
        var lights = document.querySelectorAll(".ch-menorah-slot .light");
        var nights = document.querySelectorAll(".ch-night");
        box.innerHTML = '<div class="chl-cd"><div class="chl-cd-label">Until the first candle</div>' +
            '<span><b class="cd-d">00</b><i>Days</i></span><span><b class="cd-h">00</b><i>Hours</i></span>' +
            '<span><b class="cd-m">00</b><i>Min</i></span><span><b class="cd-s">00</b><i>Sec</i></span></div>';
        box.className += " ready";
        var u = { d: box.querySelector(".cd-d"), h: box.querySelector(".cd-h"), m: box.querySelector(".cd-m"), s: box.querySelector(".cd-s") };
        function light(n) {
            for (var i = 0; i < lights.length; i++) {
                if (+lights[i].getAttribute("data-n") > n) { lights[i].classList.add("out"); } else { lights[i].classList.remove("out"); }
            }
        }
        function tonight(n) {
            for (var i = 0; i < nights.length; i++) {
                if (nights[i].classList.contains("n" + n)) { nights[i].classList.add("is-tonight"); } else { nights[i].classList.remove("is-tonight"); }
            }
        }
        var timer, mode = "";
        function tick() {
            var now = new Date(), diff = start - now;
            if (diff > 0) {
                var s = Math.floor(diff / 1000);
                u.d.innerHTML = pad(Math.floor(s / 86400));
                u.h.innerHTML = pad(Math.floor(s % 86400 / 3600));
                u.m.innerHTML = pad(Math.floor(s % 3600 / 60));
                u.s.innerHTML = pad(s % 60);
                light(0); tonight(0);
                return;
            }
            var night = Math.floor((now - start) / 86400000) + 1;
            if (night > 8) { light(8); tonight(0); box.innerHTML = ""; box.className = "chl-countdown-slot"; clearInterval(timer); return; }
            light(night); tonight(night);
            if (mode !== "n" + night) {
                mode = "n" + night;
                box.innerHTML = '<div class="chl-live">Happy Chanukah! Tonight we light <b>' + night + '</b> candle' + (night > 1 ? "s" : "") + '</div>';
            }
        }
        tick();
        timer = setInterval(tick, 1000);
    }
    if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", run); } else { run(); }
})();
