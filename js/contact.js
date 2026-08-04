/* דף צור קשר — לשוניות ושליחה בוואטסאפ */
(function () {
  'use strict';

  var WHATSAPP_NUMBER = '972527000030';

  var tabs = {
    individual: {
      tab: document.getElementById('tab-individual'),
      form: document.getElementById('form-individual'),
      subtitle: 'אתקשר אליכם בהקדם ונדבר על הדרך הטובה ביותר להתחיל יחד.'
    },
    org: {
      tab: document.getElementById('tab-org'),
      form: document.getElementById('form-org'),
      subtitle: 'אתקשר אליכם בהקדם ונדבר על הדרך הטובה ביותר להביא את התהליך לארגון שלכם.'
    }
  };
  var subtitle = document.getElementById('contact-subtitle');

  function selectTab(key) {
    Object.keys(tabs).forEach(function (k) {
      var active = k === key;
      tabs[k].tab.setAttribute('aria-selected', active ? 'true' : 'false');
      if (active) { tabs[k].form.removeAttribute('hidden'); } else { tabs[k].form.setAttribute('hidden', ''); }
    });
    if (subtitle) { subtitle.textContent = tabs[key].subtitle; }
  }

  tabs.individual.tab.addEventListener('click', function () { selectTab('individual'); });
  tabs.org.tab.addEventListener('click', function () { selectTab('org'); });

  /* בחירת לשונית לפי כתובת: contact.html?type=org או #org */
  var params = new URLSearchParams(window.location.search);
  var type = params.get('type') || window.location.hash.replace('#', '');
  if (type === 'org' || type === 'organizations') { selectTab('org'); }

  /* שליחה: בניית הודעת וואטסאפ מהשדות */
  function fieldValue(form, name) {
    var el = form.querySelector('[name="' + name + '"]');
    return el && el.value ? el.value.trim() : '';
  }

  function buildMessage(form, kind) {
    var lines = [];
    lines.push(kind === 'org' ? 'שלום תומר, פנייה מארגון דרך האתר:' : 'שלום תומר, פנייה חדשה דרך האתר:');
    var name = fieldValue(form, 'name');
    if (name) { lines.push('שם: ' + name); }
    if (kind === 'org') {
      var role = fieldValue(form, 'role');
      var company = fieldValue(form, 'company');
      if (role) { lines.push('תפקיד: ' + role); }
      if (company) { lines.push('ארגון: ' + company); }
    }
    var phone = fieldValue(form, 'phone');
    if (phone) { lines.push('טלפון: ' + phone); }
    var email = fieldValue(form, 'email');
    if (email) { lines.push('דוא״ל: ' + email); }
    var interest = fieldValue(form, 'interest');
    if (interest) { lines.push('מתעניין ב: ' + interest); }
    var message = fieldValue(form, 'message');
    if (message) { lines.push('הודעה: ' + message); }
    return lines.join('\n');
  }

  function handleSubmit(form, kind) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) { return; }
      var text = buildMessage(form, kind);
      window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
    });
    /* required מופעל ידנית כי הטופס עם novalidate */
    form.querySelectorAll('[required]').forEach(function (el) {
      el.addEventListener('invalid', function () { el.setCustomValidity('נא למלא שדה זה'); });
      el.addEventListener('input', function () { el.setCustomValidity(''); });
    });
  }

  handleSubmit(tabs.individual.form, 'individual');
  handleSubmit(tabs.org.form, 'org');
})();
