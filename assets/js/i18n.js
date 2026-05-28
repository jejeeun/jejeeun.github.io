(function () {
  // Korean originals are already in the HTML; we only store English translations.
  // Each entry: { selector, [index], [attr], [html], text }
  //   selector  – CSS selector
  //   index     – nth match (0-based, default 0)
  //   html      – if true, set innerHTML instead of textContent
  //   text      – the English replacement

  var defined = typeof window !== 'undefined';
  if (!defined) return;

  /* ──────────────────────────── Korean data (for restoring) ──────────────────────────── */
  var ko = {};

  /* ──────────────────────────── English translations ──────────────────────────── */
  var en = {
    /* ── Header ── */
    '.header-left h1': 'Jeeun Lee',

    /* ── About Me ── */
    '#about-me': 'Summary',
    '.intro-container .col-sm-8 p': [
      'Backend engineer with 4 years of experience building <mark>Java</mark> / <mark>Spring</mark> services in fintech and public-sector domains. Passionate about identifying root causes over quick fixes — designed a unified cache library that eliminated duplicated config across an entire multi-module platform.<br><br>' +
      'Proven track record in high-throughput API systems, distributed logging, observability, and zero-downtime CI/CD in air-gapped environments. Thrive in cross-functional teams where a positive, ownership-driven mindset turns complex problems into shipped solutions.'
    ],

    /* ── Section headings ── */
    '#work-experience': 'Experience',
    '#projects': 'Projects',
    '#skills': 'Skills',
    '#certificates': 'Certifications',
    '#education': 'Education',

    /* ── Future Wiz ── */
    '#future-wiz ~ p .quote, #future-wiz-quote': null,
    'futurewiz-quote': '#1 securities-solution fintech. Partnered with Dunamu to build and operate the Upbit back-office system.',
    'futurewiz-project1': 'Upbit HR & Attendance System',
    'futurewiz-bullet-1-title': '<strong>Approver Workflow</strong> \u2015 Re-architected legacy approval chain with event-driven HR integration',
    'futurewiz-bullet-1-sub1': 'Automated approver resolution via org-tree traversal; handled concurrent-position and dispatch edge cases',
    'futurewiz-bullet-1-sub2': 'Built approver lifecycle logic (create / update / revoke / audit trail) keyed to HR event types',
    'futurewiz-bullet-2-title': '<strong>Clock-in/out</strong> \u2015 GPS & IP-based attendance verification',
    'futurewiz-bullet-2-sub1': 'Developed geofence radius validation and real-time attendance state machine',

    /* ── Asset Chain ── */
    'assetchain-quote': 'Financial IT solutions for securities firms. Joined as founding member of the Web Infrastructure team; helped win the company\u2019s first OpenAPI contract.',
    'assetchain-project1': 'Securities OpenAPI Platform (2024.04 \u2013 2025.06)',
    'assetchain-project1-desc': 'Led end-to-end development of a Spring Boot multi-module OpenAPI platform — cache layer, API gateway, distributed logging, observability, CI/CD, security, and Vue 3 front-end.<br><br>',
    'assetchain-cache-title': '<strong>Cache Abstraction</strong> \u2015 Unified caching strategy across modules with pluggable backends',
    'assetchain-cache-sub1': 'Designed a Proxy-pattern cache library with centralized TTL and serialization config',
    'assetchain-cache-sub2': 'Implemented transparent DB fallback on cache miss with consistent error handling',
    'assetchain-cache-sub3': 'Enabled one-line YAML switch between Redis \u2194 Hazelcast; <strong>eliminated 100%</strong> of duplicated cache config',
    'assetchain-perf-title': '<strong>Performance</strong> \u2015 Optimized gateway throughput and removed bottlenecks',
    'assetchain-perf-sub1': 'Integrated Reactive caching (Hazelcast / Redis) into a WebFlux gateway for fully non-blocking request flow',
    'assetchain-perf-sub2': 'Load-tested with <strong>1,000 concurrent users</strong> across 5 JMeter nodes',
    'assetchain-perf-sub3': 'Achieved 3,500 / 2,000 / 300 TPS (queries / market data / ledger) at <strong>0% error rate</strong>',
    'assetchain-log-title': '<strong>Distributed Logging</strong> \u2015 Real-time log pipeline that eliminated file I/O bottlenecks',
    'assetchain-log-sub1': 'Built async log pipeline on Hazelcast Ringbuffer for non-blocking ingestion',
    'assetchain-log-sub2': 'Enabled centralized log streaming with zero direct file access on app servers',
    'assetchain-log-sub3': 'Removed WAS file <strong>I/O bottleneck</strong>; cut incident response time by <strong>70%</strong>',
    'assetchain-mon-title': '<strong>Observability</strong> \u2015 End-to-end distributed tracing with OpenTelemetry',
    'assetchain-mon-sub1': 'Adopted OpenTelemetry to replace log-based monitoring, enabling cross-service trace correlation',
    'assetchain-mon-sub2': 'Deployed OTel Java Agent across multi-module services for automatic trace-ID propagation',
    'assetchain-mon-sub3': 'Added manual SDK instrumentation for critical business workflows',
    'assetchain-mon-sub4': 'Reduced root-cause analysis time from <strong>hours to minutes</strong>',
    'assetchain-infra-title': '<strong>Infrastructure</strong> \u2015 Zero-downtime CI/CD and security hardening in air-gapped networks',
    'assetchain-infra-sub1': 'Built Jenkins Blue-Green deployment pipeline for seamless rolling releases',
    'assetchain-infra-sub2': 'Configured NGINX WAF (ModSecurity + OWASP CRS) and CSP nonce-based content policy',
    'assetchain-infra-sub3': 'Achieved <strong>0 High/Medium vulnerabilities</strong> (OWASP ZAP); maintained <strong>zero-second</strong> deploy downtime',
    'assetchain-fe-title': '<strong>Frontend</strong> \u2015 Admin tools and API test console',
    'assetchain-fe-sub1': 'Built Vue 3 admin dashboard with automated TR-spec Excel upload workflow',
    'assetchain-fe-sub2': 'Developed WebSocket / HTTP test console for live API verification and error reproduction',
    'assetchain-fe-sub3': 'Cut operator task time by <strong>90%</strong>; reduced client onboarding <strong>error rate</strong>',

    'assetchain-project2': 'Hanwha Securities Monitoring (2024.01 \u2013 2024.06)',
    'assetchain-project2-desc': 'Led observability overhaul for a major securities firm as first project at Asset Chain.<br><br>',
    'assetchain-monit-title': '<strong>Monitoring</strong> \u2015 Unified observability for 6 core trading systems',
    'assetchain-monit-sub1': 'Integrated trading, settlement, and relay systems into Prometheus + Grafana dashboards',
    'assetchain-monit-sub2': 'Introduced Pushgateway for batch-job metrics with schedule-based collection',
    'assetchain-monit-sub3': 'Defined alert thresholds and deployed AlertManager-based <strong>auto-alerting</strong> to cut response delays',

    /* ── Ejsoft ── */
    'ejsoft-quote': 'Vehicle-emission enforcement solution provider. #1 domestic market share with deployments across 9 local governments.',
    'ejsoft-project1': 'Vehicle Driving Restriction System (2021.06 \u2013 2023.12)',
    'ejsoft-batch-title': '<strong>Batch Optimization</strong> \u2015 Tuned large-scale batch jobs processing <strong>1 billion records</strong>',
    'ejsoft-batch-sub1': 'Redesigned composite indexes, simplified predicates, introduced chunk processing, and isolated transactions',
    'ejsoft-batch-sub2': 'Cut batch runtime from <strong>10 hours to 1 hour</strong>',
    'ejsoft-batch-sub3': 'Delivered <strong>10x throughput gain</strong>; stabilized nightly batch window and daily processing capacity',
    'ejsoft-admin-title': '<strong>Gov Admin Portal</strong> \u2015 Scaled legacy platform to support new municipal regulations',
    'ejsoft-admin-sub1': 'Extended interfaces for Daegu day-of-week and Busan / Gwangju / Sejong / Ulsan seasonal restrictions',
    'ejsoft-admin-sub2': 'Developed web admin systems with JSP, jQuery, MyBatis, and AJAX',
    'ejsoft-admin-sub3': 'Rolled out to <strong>6 municipalities</strong>, directly contributing to business expansion and <strong>revenue growth</strong>',

    'ejsoft-project2': 'CCTV License Plate Auto-Inspection (2023.01 \u2013 2023.12)',
    'ejsoft-lpr-title': '<strong>LPR Pipeline</strong> \u2015 Built end-to-end license-plate recognition from data labeling to inference',
    'ejsoft-lpr-sub1': 'Labeled <strong>10,867 images</strong> across <strong>6 regions</strong>; iteratively refined model through training-data feedback loops',
    'ejsoft-lpr-sub2': 'Designed a Python recognition algorithm handling single/double-row plates with <strong>7\u201310 character</strong> variations',
    'ejsoft-lpr-sub3': 'Achieved <strong>99% accuracy</strong>; boosted regional recognition by <strong>0.5 pp</strong>; built a dataset <strong>2x</strong> public benchmarks',

    /* ── Projects: Koape ── */
    'koape-project': 'Koape \u2014 Neighborhood Membership Platform for Apartment Residents',
    'koape-bullet-title': '<strong>Architecture Migration</strong> \u2015 Firebase \u2192 Spring Boot + PostgreSQL',
    'koape-bullet-sub1': 'Migrated serverless backend to cut <strong>operational costs</strong> and unlock <strong>feature scalability</strong>',
    'koape-bullet-sub2': 'Replaced Firebase Cloud Functions with Spring Boot REST API, converting <strong>variable per-call fees to fixed infra costs</strong>',
    'koape-bullet-sub3': 'Executed <strong>incremental NoSQL \u2192 PostgreSQL migration</strong> to support complex search and filtering',
    'koape-bullet-sub4': 'Applied <strong>JSONB + GIN indexes</strong> for full-text search; rebuilt real-time layer on <strong>WebSocket</strong>',

    /* ── Skills ── */
    'skills-backend': 'Backend',
    'skills-backend-java': 'Java 8/17/21, Spring Boot 3.2, MyBatis (3+ yrs)',
    'skills-backend-java-desc': 'Fintech & public-sector API systems, multi-module backend architecture',
    'skills-backend-db': 'MySQL 8.0, MariaDB 11, PostgreSQL 15',
    'skills-backend-db-desc': 'Schema design, high-volume batch queries, query performance tuning',
    'skills-backend-cache': 'Redis 7.x, Hazelcast 5.x',
    'skills-backend-cache-desc': 'Distributed cache & Pub/Sub with pluggable backend switching',
    'skills-backend-batch': 'Spring Batch',
    'skills-backend-batch-desc': 'File-parsing batch jobs with Redis / Hazelcast cache loading',
    'skills-backend-python': 'Python 3.8',
    'skills-backend-python-desc': 'OpenAPI Python SDK development',
    'skills-devops': 'DevOps & Infra',
    'skills-devops-docker': 'Docker, Jenkins, GitLab, Nexus',
    'skills-devops-docker-desc': 'Air-gapped RHEL provisioning, CI/CD pipelines, zero-downtime deployment',
    'skills-devops-otel': 'OpenTelemetry, Prometheus, Grafana, Elasticsearch, Logstash, Zipkin',
    'skills-devops-otel-desc': 'Distributed tracing & monitoring architecture for brokerage APIs',
    'skills-devops-nginx': 'Nginx',
    'skills-devops-nginx-desc': 'SSL, WebSocket proxy, WAF (ModSecurity + OWASP CRS) on API Gateway',
    'skills-frontend': 'Frontend',
    'skills-fe-vue': 'Vue 3, JavaScript (ES6+)',
    'skills-fe-vue-desc': 'Admin dashboard & testbed UI with WebSocket real-time log viewer',
    'skills-fe-jsp': 'JSP, jQuery',
    'skills-fe-jsp-desc': 'eGovFrame-based legacy system maintenance & feature development',
    'skills-aiml': 'AI / ML',
    'skills-aiml-item': 'Python, YOLOv5, OpenCV',
    'skills-aiml-desc': 'Large-scale image dataset construction & annotation',

    /* ── Certificates ── */
    'cert-th-name': 'Certification',
    'cert-th-number': 'Reg. No.',
    'cert-th-issuer': 'Issuer',
    'cert-th-date': 'Acquired',
    'cert-name-1': 'Certified Investment Manager',
    'cert-issuer-1': 'Korea Financial Investment Association',
    'cert-name-2': 'Engineer Information Processing',
    'cert-issuer-2': 'HRD Korea',
    'cert-name-3': 'SQL Developer',
    'cert-issuer-3': 'Korea Data Agency (KDATA)',

    /* ── Education ── */
    'edu-university': 'Hongik University',
    'edu-degree': 'B.S. Computer Science & Engineering',

    /* ── Footer ── */
    'footer-text': null // handled specially
  };

  /* ──────────────────────────── DOM mapping ──────────────────────────── */

  // Saves original Korean innerHTML for every element we will touch.
  // Called once on DOMContentLoaded.
  function buildMap() {
    var map = [];

    function q(sel, idx) {
      var els = document.querySelectorAll(sel);
      return els[idx || 0] || null;
    }

    function add(el, enKey, useHTML) {
      if (!el) return;
      map.push({ el: el, ko: el.innerHTML, en: en[enKey], html: useHTML !== false });
    }

    function addText(el, enKey) {
      if (!el) return;
      map.push({ el: el, ko: el.textContent, en: en[enKey], html: false });
    }

    // Header
    add(q('.header-left h1'), '.header-left h1', false);

    // About Me
    addText(q('#about-me'), '#about-me');
    var aboutP = q('.intro-container .col-xs-12.col-sm-8 p') || q('.intro-container .col-sm-8 p');
    if (aboutP) {
      map.push({ el: aboutP, ko: aboutP.innerHTML, en: en['.intro-container .col-sm-8 p'][0], html: true });
    }

    // Section headings
    addText(q('#work-experience'), '#work-experience');
    addText(q('#projects'), '#projects');
    addText(q('#skills'), '#skills');
    addText(q('#certificates'), '#certificates');
    addText(q('#education'), '#education');

    // ── Work Experience: Future Wiz ──
    var layouts = document.querySelectorAll('.layout-left');
    var futurewiz = layouts[0];
    var assetchain = layouts[1];
    var ejsoft = layouts[2];
    // Depending on page structure, projects section may also have layout-left
    var projectLayouts = document.querySelectorAll('#projects ~ .row.layout-left, #projects + div .layout-left');

    if (futurewiz) {
      var fwQuote = futurewiz.querySelector('.quote');
      if (fwQuote) add(fwQuote, 'futurewiz-quote', true);
      var fwStrongs = futurewiz.querySelectorAll('.content p strong');
      if (fwStrongs[0]) add(fwStrongs[0], 'futurewiz-project1', false);

      var fwLis = futurewiz.querySelectorAll('.content > ul > li');
      if (fwLis[0]) {
        // First top-level bullet
        setNodeParts(map, fwLis[0], 'futurewiz-bullet-1-title');
        var fwSub1 = fwLis[0].querySelectorAll('ul li');
        if (fwSub1[0]) addText(fwSub1[0], 'futurewiz-bullet-1-sub1');
        if (fwSub1[1]) addText(fwSub1[1], 'futurewiz-bullet-1-sub2');
      }
      if (fwLis[1]) {
        setNodeParts(map, fwLis[1], 'futurewiz-bullet-2-title');
        var fwSub2 = fwLis[1].querySelectorAll('ul li');
        if (fwSub2[0]) addText(fwSub2[0], 'futurewiz-bullet-2-sub1');
      }
    }

    // ── Work Experience: Asset Chain ──
    if (assetchain) {
      var acQuote = assetchain.querySelector('.quote');
      if (acQuote) add(acQuote, 'assetchain-quote', true);

      var acPs = assetchain.querySelectorAll('.content > p');
      var acUls = assetchain.querySelectorAll('.content > ul');

      // Project 1 title + desc
      var pIdx = 0;
      for (var i = 0; i < acPs.length; i++) {
        var s = acPs[i].querySelector('strong');
        if (s && pIdx === 0) {
          add(s, 'assetchain-project1', false);
          pIdx++;
        } else if (!s && pIdx === 1 && !acPs[i].classList.contains('quote')) {
          add(acPs[i], 'assetchain-project1-desc', true);
          pIdx++;
          break;
        }
      }

      // First UL (OpenAPI system bullets)
      if (acUls[0]) {
        var acTopLis = acUls[0].querySelectorAll(':scope > li');
        var acBulletKeys = [
          ['assetchain-cache-title', ['assetchain-cache-sub1', 'assetchain-cache-sub2', 'assetchain-cache-sub3']],
          ['assetchain-perf-title', ['assetchain-perf-sub1', 'assetchain-perf-sub2', 'assetchain-perf-sub3']],
          ['assetchain-log-title', ['assetchain-log-sub1', 'assetchain-log-sub2', 'assetchain-log-sub3']],
          ['assetchain-mon-title', ['assetchain-mon-sub1', 'assetchain-mon-sub2', 'assetchain-mon-sub3', 'assetchain-mon-sub4']],
          ['assetchain-infra-title', ['assetchain-infra-sub1', 'assetchain-infra-sub2', 'assetchain-infra-sub3']],
          ['assetchain-fe-title', ['assetchain-fe-sub1', 'assetchain-fe-sub2', 'assetchain-fe-sub3']]
        ];
        acTopLis.forEach(function (li, idx) {
          if (!acBulletKeys[idx]) return;
          setNodeParts(map, li, acBulletKeys[idx][0]);
          var subs = li.querySelectorAll('ul li');
          acBulletKeys[idx][1].forEach(function (key, si) {
            if (subs[si]) add(subs[si], key, true);
          });
        });
      }

      // Project 2 title + desc
      var foundP2 = false;
      for (var j = 0; j < acPs.length; j++) {
        var s2 = acPs[j].querySelector('strong');
        if (s2 && !foundP2 && acPs[j] !== acPs[0] && s2.textContent.indexOf('한화') >= 0) {
          add(s2, 'assetchain-project2', false);
          foundP2 = true;
          // next sibling p
          if (acPs[j + 1] && !acPs[j + 1].querySelector('strong')) {
            add(acPs[j + 1], 'assetchain-project2-desc', true);
          }
        }
      }

      // Second UL (Hanwha monitoring)
      if (acUls[1]) {
        var acMon = acUls[1].querySelectorAll(':scope > li');
        if (acMon[0]) {
          setNodeParts(map, acMon[0], 'assetchain-monit-title');
          var monSubs = acMon[0].querySelectorAll('ul li');
          if (monSubs[0]) add(monSubs[0], 'assetchain-monit-sub1', true);
          if (monSubs[1]) add(monSubs[1], 'assetchain-monit-sub2', true);
          if (monSubs[2]) add(monSubs[2], 'assetchain-monit-sub3', true);
        }
      }
    }

    // ── Work Experience: Ejsoft ──
    if (ejsoft) {
      var ejQuote = ejsoft.querySelector('.quote');
      if (ejQuote) add(ejQuote, 'ejsoft-quote', true);

      var ejPs = ejsoft.querySelectorAll('.content > p');
      var ejUls = ejsoft.querySelectorAll('.content > ul');

      // Project 1
      if (ejPs[0] && ejPs[0].querySelector('strong')) {
        add(ejPs[0].querySelector('strong'), 'ejsoft-project1', false);
      }

      // UL 1
      if (ejUls[0]) {
        var ejLis1 = ejUls[0].querySelectorAll(':scope > li');
        if (ejLis1[0]) {
          setNodeParts(map, ejLis1[0], 'ejsoft-batch-title');
          var bs = ejLis1[0].querySelectorAll('ul li');
          if (bs[0]) add(bs[0], 'ejsoft-batch-sub1', true);
          if (bs[1]) add(bs[1], 'ejsoft-batch-sub2', true);
          if (bs[2]) add(bs[2], 'ejsoft-batch-sub3', true);
        }
        if (ejLis1[1]) {
          setNodeParts(map, ejLis1[1], 'ejsoft-admin-title');
          var as = ejLis1[1].querySelectorAll('ul li');
          if (as[0]) add(as[0], 'ejsoft-admin-sub1', true);
          if (as[1]) add(as[1], 'ejsoft-admin-sub2', true);
          if (as[2]) add(as[2], 'ejsoft-admin-sub3', true);
        }
      }

      // Project 2
      for (var k = 0; k < ejPs.length; k++) {
        var s3 = ejPs[k].querySelector('strong');
        if (s3 && s3.textContent.indexOf('CCTV') >= 0) {
          add(s3, 'ejsoft-project2', false);
          break;
        }
      }

      // UL 2
      if (ejUls[1]) {
        var ejLis2 = ejUls[1].querySelectorAll(':scope > li');
        if (ejLis2[0]) {
          setNodeParts(map, ejLis2[0], 'ejsoft-lpr-title');
          var ls = ejLis2[0].querySelectorAll('ul li');
          if (ls[0]) add(ls[0], 'ejsoft-lpr-sub1', true);
          if (ls[1]) add(ls[1], 'ejsoft-lpr-sub2', true);
          if (ls[2]) add(ls[2], 'ejsoft-lpr-sub3', true);
        }
      }
    }

    // ── Projects: Koape ──
    // Find the layout-left inside #projects container
    var projContainer = document.querySelector('#projects');
    var koapeLayout = projContainer ? projContainer.parentElement.querySelector('.layout-left') : null;
    if (koapeLayout) {
      var kpStrongs = koapeLayout.querySelectorAll('.content p strong');
      if (kpStrongs[0]) add(kpStrongs[0], 'koape-project', false);

      var kpUl = koapeLayout.querySelector('.content > ul');
      if (kpUl) {
        var kpLi = kpUl.querySelectorAll(':scope > li');
        if (kpLi[0]) {
          setNodeParts(map, kpLi[0], 'koape-bullet-title');
          var kpSubs = kpLi[0].querySelectorAll('ul li');
          if (kpSubs[0]) add(kpSubs[0], 'koape-bullet-sub1', true);
          if (kpSubs[1]) add(kpSubs[1], 'koape-bullet-sub2', true);
          if (kpSubs[2]) add(kpSubs[2], 'koape-bullet-sub3', true);
          if (kpSubs[3]) add(kpSubs[3], 'koape-bullet-sub4', true);
        }
      }
    }

    // ── Skills ──
    var skillsContainer = document.querySelector('#skills');
    if (skillsContainer) {
      var skillsDiv = skillsContainer.parentElement.querySelector('.col-md-12');
      if (skillsDiv) {
        // Category headers
        var skillStrongs = skillsDiv.querySelectorAll('p strong');
        var skillKeys = ['skills-backend', 'skills-devops', 'skills-frontend', 'skills-aiml'];
        skillStrongs.forEach(function (s, i) {
          if (skillKeys[i]) addText(s, skillKeys[i]);
        });

        // Use :scope > ul to get only top-level uls (not nested ones)
        var topUls = skillsDiv.querySelectorAll(':scope > ul');
        var skillItemKeys = [
          // [parentTextKey, descKey] per li
          [
            ['skills-backend-java', 'skills-backend-java-desc'],
            ['skills-backend-db', 'skills-backend-db-desc'],
            ['skills-backend-cache', 'skills-backend-cache-desc'],
            ['skills-backend-batch', 'skills-backend-batch-desc'],
            ['skills-backend-python', 'skills-backend-python-desc']
          ],
          [
            ['skills-devops-docker', 'skills-devops-docker-desc'],
            ['skills-devops-otel', 'skills-devops-otel-desc'],
            ['skills-devops-nginx', 'skills-devops-nginx-desc']
          ],
          [
            ['skills-fe-vue', 'skills-fe-vue-desc'],
            ['skills-fe-jsp', 'skills-fe-jsp-desc']
          ],
          [
            ['skills-aiml-item', 'skills-aiml-desc']
          ]
        ];

        topUls.forEach(function (ul, ui) {
          if (!skillItemKeys[ui]) return;
          var lis = ul.querySelectorAll(':scope > li');
          lis.forEach(function (li, li_i) {
            if (!skillItemKeys[ui][li_i]) return;
            var keys = skillItemKeys[ui][li_i];
            // Parent li text (e.g. "Java 8/17/21, Spring Boot 3.2, Mybatis (3년 이상)")
            if (keys[0]) setNodeParts(map, li, keys[0]);
            // Sub-description
            var subUl = li.querySelector('ul');
            if (subUl && keys[1]) {
              var subLi = subUl.querySelector('li');
              if (subLi) addText(subLi, keys[1]);
            }
          });
        });
      }
    }

    // ── Certificates ──
    var certTable = document.querySelector('.cert-table');
    if (certTable) {
      var ths = certTable.querySelectorAll('th');
      if (ths[0]) addText(ths[0], 'cert-th-name');
      if (ths[1]) addText(ths[1], 'cert-th-number');
      if (ths[2]) addText(ths[2], 'cert-th-issuer');
      if (ths[3]) addText(ths[3], 'cert-th-date');

      var trs = certTable.querySelectorAll('tbody tr');
      if (trs[0]) {
        var tds0 = trs[0].querySelectorAll('td');
        if (tds0[0]) addText(tds0[0], 'cert-name-1');
        if (tds0[2]) addText(tds0[2], 'cert-issuer-1');
      }
      if (trs[1]) {
        var tds1 = trs[1].querySelectorAll('td');
        if (tds1[0]) addText(tds1[0], 'cert-name-2');
        if (tds1[2]) addText(tds1[2], 'cert-issuer-2');
      }
      if (trs[2]) {
        var tds2 = trs[2].querySelectorAll('td');
        if (tds2[2]) addText(tds2[2], 'cert-issuer-3');
      }
    }

    // ── Education ──
    var eduLine = document.querySelector('.education-line');
    if (eduLine) {
      var eduStrong = eduLine.querySelector('strong');
      var eduDegree = eduLine.querySelector('.degree');
      if (eduStrong) addText(eduStrong, 'edu-university');
      if (eduDegree) addText(eduDegree, 'edu-degree');
    }

    // ── Footer ──
    var footerP = document.querySelector('.footer-container p');
    if (footerP) {
      map.push({
        el: footerP,
        ko: footerP.innerHTML,
        en: footerP.innerHTML
          .replace('이제은', 'Jeeun Lee')
          .replace('References on request', 'References on request'),
        html: true
      });
    }

    return map;
  }

  // For top-level <li> that starts with <strong>Title</strong> ― text,
  // we need to replace only the leading text node + strong, not the child <ul>.
  function setNodeParts(map, li, enKey) {
    // Save original innerHTML of the li (before the nested ul)
    map.push({
      el: li,
      ko: null, // will be captured on first call
      en: en[enKey],
      html: true,
      isLiTitle: true
    });
  }

  /* ──────────────────────────── Apply language ──────────────────────────── */

  var domMap = null;

  function setLanguage(lang) {
    if (!domMap) domMap = buildMap();

    domMap.forEach(function (entry) {
      if (!entry.el || entry.en == null) return;

      if (entry.isLiTitle) {
        // For <li> with nested <ul>, replace only the title portion
        // and preserve the actual child <ul> DOM node so sub-item references stay valid.
        var childUl = entry.el.querySelector('ul');
        if (entry.ko === null) {
          if (childUl) {
            var clone = entry.el.cloneNode(true);
            var cloneUl = clone.querySelector('ul');
            if (cloneUl) cloneUl.remove();
            entry.ko = clone.innerHTML;
          } else {
            entry.ko = entry.el.innerHTML;
          }
        }

        var newTitle = lang === 'en' ? entry.en : entry.ko;
        if (childUl) {
          // Detach the real <ul>, replace title, re-attach the same node
          entry.el.removeChild(childUl);
          entry.el.innerHTML = newTitle;
          entry.el.appendChild(childUl);
        } else {
          entry.el.innerHTML = newTitle;
        }
        return;
      }

      var value = lang === 'en' ? entry.en : entry.ko;
      if (entry.html) {
        entry.el.innerHTML = value;
      } else {
        entry.el.textContent = value;
      }
    });

    // Update toggle button state
    var btnKo = document.getElementById('btn-ko');
    var btnEn = document.getElementById('btn-en');
    if (btnKo && btnEn) {
      btnKo.classList.toggle('active', lang === 'ko');
      btnEn.classList.toggle('active', lang === 'en');
    }

    // Update html lang attribute
    document.documentElement.lang = lang === 'en' ? 'en' : 'ko';

    // Persist
    try { localStorage.setItem('resume-lang', lang); } catch (e) {}
  }

  // Expose globally
  window.setLanguage = setLanguage;

  // Apply saved language on load
  document.addEventListener('DOMContentLoaded', function () {
    var saved = null;
    try { saved = localStorage.getItem('resume-lang'); } catch (e) {}
    if (saved === 'en') {
      setLanguage('en');
    }
    // If 'ko' or nothing, do nothing — page is already in Korean
  });
})();
