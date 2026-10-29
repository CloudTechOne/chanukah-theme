/* Chanukah Landing Page for ChabadOne - v2.1.1
   - Before Chanukah the menorah is fully lit; over the last 8 days one candle
     burns down per day, so only the shamash remains when Chanukah begins.
   - During Chanukah the candles light again, night by night.
   - Hero card: countdown before Chanukah; during Chanukah shows tonight's night,
     candle count, and the time + date typed into that night's box in the schedule,
     plus the city from the schedule's editable City field.
   - Badges tonight's box in the schedule.
   Preview any moment by adding ?chl_now=2026-12-06T18:00 to the page URL.
   If this file is blocked, the page still shows a fully lit menorah. */
(function () {
    var MENORAH = '<svg viewBox="0 0 360 230" role="img" aria-label="Menorah" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="chGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbe3a1" /><stop offset="0.5" stop-color="#e2b44f" /><stop offset="1" stop-color="#a8741a" /></linearGradient><radialGradient id="chFlame" cx="0.5" cy="0.72" r="0.65"><stop offset="0" stop-color="#fffbe6" /><stop offset="0.4" stop-color="#ffd36b" /><stop offset="1" stop-color="#ff7a1a" /></radialGradient><radialGradient id="chGlowGrad"><stop offset="0" stop-color="#ffbe5a" stop-opacity="0.7" /><stop offset="1" stop-color="#ffbe5a" stop-opacity="0" /></radialGradient></defs><g stroke="url(#chGold)" stroke-width="5" stroke-linecap="round" fill="none"><path d="M180 182L40 76M180 182L320 76M180 160L75 76M180 160L285 76M180 138L110 76M180 138L250 76M180 116L145 76M180 116L215 76" /></g><g fill="url(#chGold)"><rect x="176" y="52" width="8" height="154" rx="3" /><path d="M140 224L220 224L206 204L154 204Z" /><rect x="30" y="70" width="20" height="6" rx="2" /><rect x="65" y="70" width="20" height="6" rx="2" /><rect x="100" y="70" width="20" height="6" rx="2" /><rect x="135" y="70" width="20" height="6" rx="2" /><rect x="205" y="70" width="20" height="6" rx="2" /><rect x="240" y="70" width="20" height="6" rx="2" /><rect x="275" y="70" width="20" height="6" rx="2" /><rect x="310" y="70" width="20" height="6" rx="2" /><rect x="170" y="46" width="20" height="6" rx="2" /></g><g fill="#fbf3e0"><rect x="36" y="42" width="8" height="28" rx="2" /><rect x="71" y="42" width="8" height="28" rx="2" /><rect x="106" y="42" width="8" height="28" rx="2" /><rect x="141" y="42" width="8" height="28" rx="2" /><rect x="211" y="42" width="8" height="28" rx="2" /><rect x="246" y="42" width="8" height="28" rx="2" /><rect x="281" y="42" width="8" height="28" rx="2" /><rect x="316" y="42" width="8" height="28" rx="2" /><rect x="176" y="24" width="8" height="22" rx="2" /></g><g class="light shamash" data-n="0"><circle class="glow" cx="180" cy="12" r="18" fill="url(#chGlowGrad)" /><path class="flame" d="M180 22C174 18 175 10 180 0C185 10 186 18 180 22Z" fill="url(#chFlame)" /></g><g class="light" data-n="1"><circle class="glow" cx="320" cy="30" r="17" fill="url(#chGlowGrad)" /><path class="flame" d="M320 40C314 36 315 28 320 18C325 28 326 36 320 40Z" fill="url(#chFlame)" /></g><g class="light" data-n="2"><circle class="glow" cx="285" cy="30" r="17" fill="url(#chGlowGrad)" /><path class="flame" d="M285 40C279 36 280 28 285 18C290 28 291 36 285 40Z" fill="url(#chFlame)" /></g><g class="light" data-n="3"><circle class="glow" cx="250" cy="30" r="17" fill="url(#chGlowGrad)" /><path class="flame" d="M250 40C244 36 245 28 250 18C255 28 256 36 250 40Z" fill="url(#chFlame)" /></g><g class="light" data-n="4"><circle class="glow" cx="215" cy="30" r="17" fill="url(#chGlowGrad)" /><path class="flame" d="M215 40C209 36 210 28 215 18C220 28 221 36 215 40Z" fill="url(#chFlame)" /></g><g class="light" data-n="5"><circle class="glow" cx="145" cy="30" r="17" fill="url(#chGlowGrad)" /><path class="flame" d="M145 40C139 36 140 28 145 18C150 28 151 36 145 40Z" fill="url(#chFlame)" /></g><g class="light" data-n="6"><circle class="glow" cx="110" cy="30" r="17" fill="url(#chGlowGrad)" /><path class="flame" d="M110 40C104 36 105 28 110 18C115 28 116 36 110 40Z" fill="url(#chFlame)" /></g><g class="light" data-n="7"><circle class="glow" cx="75" cy="30" r="17" fill="url(#chGlowGrad)" /><path class="flame" d="M75 40C69 36 70 28 75 18C80 28 81 36 75 40Z" fill="url(#chFlame)" /></g><g class="light" data-n="8"><circle class="glow" cx="40" cy="30" r="17" fill="url(#chGlowGrad)" /><path class="flame" d="M40 40C34 36 35 28 40 18C45 28 46 36 40 40Z" fill="url(#chFlame)" /></g></svg>';
    function pad(n) { return (n < 10 ? "0" : "") + n; }
    function txt(el) { return el ? (el.textContent || "").replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "") : ""; }
    function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
    function nowDate() {
        var q = /[?&]chl_now=([^&]+)/.exec(location.search);
        if (q) { var d = new Date(decodeURIComponent(q[1])); if (!isNaN(d)) { var off = d - new Date(); return function () { return new Date(Date.now() + off); }; } }
        return function () { return new Date(); };
    }
    function run() {
        var slot = document.querySelector(".ch-menorah-slot");
        if (slot) { slot.innerHTML = MENORAH; slot.className += " live"; }
        var src = document.querySelector(".ch-start-date");
        var box = document.querySelector(".chl-countdown-slot");
        if (!src || !box) { return; }
        var m = txt(src).match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[ T](\d{1,2}):(\d{2}))?/);
        if (!m) { return; }
        var start = new Date(+m[1], +m[2] - 1, +m[3], +(m[4] || 16), +(m[5] || 0));
        var now = nowDate();
        var lights = document.querySelectorAll(".ch-menorah-slot .light");
        var nights = document.querySelectorAll(".ch-night");
        var city = txt(document.querySelector(".chl-city .co_editable, .chl-city span")) || txt(document.querySelector(".chl-city")).replace(/^Candle lighting times for\s*/i, "");

        function nightInfo(n) {
            var el = document.querySelector(".ch-night.n" + n);
            return { date: txt(el && el.querySelector(".chl-nd")), time: txt(el && el.querySelector(".chl-nt")) };
        }
        function flames(n) { var s = ""; for (var i = 0; i < n; i++) { s += "<i></i>"; } return '<div class="chl-tn-flames">' + s + "</div>"; }
        /* n = candles fully lit; fade (0-1) = brightness of candle n+1, which is going out */
        function light(n, fade) {
            for (var i = 0; i < lights.length; i++) {
                var k = +lights[i].getAttribute("data-n");
                if (k <= n) { lights[i].classList.remove("out"); lights[i].style.opacity = ""; }
                else if (k === n + 1 && fade > 0) { lights[i].classList.remove("out"); lights[i].style.opacity = (0.15 + 0.85 * fade).toFixed(2); }
                else { lights[i].classList.add("out"); lights[i].style.opacity = ""; }
            }
        }
        /* Before Chanukah: full menorah until the last 8 days, then one candle burns down each day.
           The leftmost (newest) candle goes out first, so night 1's candle is the last one standing. */
        var DIM_DAYS = 8;
        function preLight(msLeft) {
            var days = msLeft / 86400000;
            if (days >= DIM_DAYS) { light(8, 0); return; }
            var whole = Math.floor(days);
            light(whole, days - whole);
        }
        function tonight(n) {
            for (var i = 0; i < nights.length; i++) {
                if (nights[i].classList.contains("n" + n)) { nights[i].classList.add("is-tonight"); } else { nights[i].classList.remove("is-tonight"); }
            }
        }
        var cityLine = city ? '<div class="chl-tn-city">' + esc(city) + "</div>" : "";
        var first = nightInfo(1);
        box.className = "chl-countdown-slot ready";
        var mode = "", u = {}, timer;

        function renderCountdown() {
            box.innerHTML = '<div class="chl-tn chl-tn-cd">' +
                '<div class="chl-tn-label">Until the first candle</div>' +
                '<div class="chl-cd"><span><b class="cd-d">00</b><i>Days</i></span><span><b class="cd-h">00</b><i>Hours</i></span>' +
                '<span><b class="cd-m">00</b><i>Min</i></span><span><b class="cd-s">00</b><i>Sec</i></span></div>' +
                '<div class="chl-tn-foot"><b>Night 1</b> &#183; ' + esc(first.date) + (first.time ? " &#183; " + esc(first.time) : "") + "</div>" + cityLine + "</div>";
            u = { d: box.querySelector(".cd-d"), h: box.querySelector(".cd-h"), m: box.querySelector(".cd-m"), s: box.querySelector(".cd-s") };
        }
        function renderNight(n) {
            var info = nightInfo(n);
            box.innerHTML = '<div class="chl-tn chl-tn-live">' +
                '<div class="chl-tn-label">Tonight &#183; Night ' + n + " of 8</div>" +
                flames(n) +
                '<div class="chl-tn-big">Light ' + n + " candle" + (n > 1 ? "s" : "") + "</div>" +
                '<div class="chl-tn-foot">' + esc(info.date) + (info.time ? " &#183; <b>" + esc(info.time) + "</b>" : "") + "</div>" + cityLine + "</div>";
        }
        function tick() {
            var t = now(), diff = start - t;
            if (diff > 0) {
                if (mode !== "cd") { mode = "cd"; renderCountdown(); }
                var s = Math.floor(diff / 1000);
                u.d.innerHTML = pad(Math.floor(s / 86400));
                u.h.innerHTML = pad(Math.floor(s % 86400 / 3600));
                u.m.innerHTML = pad(Math.floor(s % 3600 / 60));
                u.s.innerHTML = pad(s % 60);
                preLight(diff); tonight(0);
                return;
            }
            var night = Math.floor((t - start) / 86400000) + 1;
            if (night > 8) {
                light(8); tonight(0);
                box.innerHTML = '<div class="chl-tn chl-tn-live"><div class="chl-tn-label">' + esc(txt(document.querySelector(".chl-title")) || "Chanukah") + '</div><div class="chl-tn-big">Thank you for celebrating with us!</div>' + cityLine + "</div>";
                clearInterval(timer); return;
            }
            light(night); tonight(night);
            if (mode !== "n" + night) { mode = "n" + night; renderNight(night); }
        }
        tick();
        timer = setInterval(tick, 1000);
    }
    if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", run); } else { run(); }
})();
