/* ============================================================
   LeadZen — Nav & Footer Templates
   Inject with: NavFooter.render()
   ============================================================ */

const NavFooter = (() => {
  const navHTML = (activePage = '') => `
<nav class="nav">
  <div class="nav-left">
    <a class="nav-brand" href="index.html">
      <div class="nav-logo-mark">⚡</div>
      <span class="nav-wordmark">Lead<span>Zen</span></span>
    </a>
    <div class="nav-links" id="navLinks">
      <a href="index.html"     class="nav-link ${activePage==='home'?'active':''}">Home</a>
      <a href="analyze.html"   class="nav-link ${activePage==='analyze'?'active':''}">Analyze</a>
      <a href="dashboard.html" class="nav-link ${activePage==='dashboard'?'active':''}">Dashboard</a>
      <a href="about.html"     class="nav-link ${activePage==='about'?'active':''}">About</a>
    </div>
  </div>
  <div class="nav-right">
    <div class="stat-chip">
      <span class="stat-chip-dot"></span>
      <span class="stat-chip-live">Live · 91.5% Accuracy</span>
    </div>
    <button class="theme-toggle" title="Toggle theme">☀️</button>
    <button class="nav-hamburger" aria-label="Menu" id="navBurger">
      <span></span><span></span><span></span>
    </button>
    <a href="analyze.html" class="nav-cta">Try Free →</a>
  </div>
</nav>`;

  const footerHTML = () => `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-brand-name">Lead<span>Zen</span></div>
        <div class="footer-desc">AI-powered lead intelligence for modern sales teams. Score, prioritize, and convert leads with 91.5% accuracy.</div>
        <div class="footer-badges mt-3">
          <span class="badge badge-success">✓ XGBoost Model</span>
          <span class="badge badge-brand">91.5% Accuracy</span>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Product</div>
        <ul class="footer-links">
          <li><a href="analyze.html">Analyze Leads</a></li>
          <li><a href="dashboard.html">Dashboard</a></li>
          <li><a href="about.html#how">How It Works</a></li>
          <li><a href="about.html#model">Model Specs</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Resources</div>
        <ul class="footer-links">
          <li><a href="about.html">About</a></li>
          <li><a href="about.html#cohorts">Cohort Guide</a></li>
          <li><a href="about.html#accuracy">Accuracy Report</a></li>
          <li><a href="#" onclick="return false">API Docs</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Tech Stack</div>
        <ul class="footer-links">
          <li><a href="#" onclick="return false">XGBoost</a></li>
          <li><a href="#" onclick="return false">Flask API</a></li>
          <li><a href="#" onclick="return false">scikit-learn</a></li>
          <li><a href="#" onclick="return false">Python 3.12</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div>© ${new Date().getFullYear()} LeadZen · AI Automation Agency · Built with XGBoost + Flask</div>
      <div>Trained on 10,000+ leads · 91.5% Overall Accuracy</div>
    </div>
  </div>
</footer>`;

  function render(activePage = '') {
    const navTarget = document.getElementById('nav-placeholder');
    const footerTarget = document.getElementById('footer-placeholder');
    if (navTarget) navTarget.outerHTML = navHTML(activePage);
    if (footerTarget) footerTarget.outerHTML = footerHTML();
  }

  return { render };
})();
