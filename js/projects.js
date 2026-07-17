/* ==========================================================================
   PROJECTS PAGE — filter by tech/client, search, expandable case studies
   ========================================================================== */
(function(){
  "use strict";
  document.addEventListener('DOMContentLoaded', function(){
    var grid = document.getElementById('projectsGrid');
    if(!grid) return;
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.project-card'));
    var searchInput = document.getElementById('projectSearch');
    var noResults = document.getElementById('noResults');
    var resultsCount = document.getElementById('resultsCount');
    var state = { tech:'all', client:'all', year:'all', q:'' };

    function applyFilters(){
      var visible = 0;
      var q = state.q.trim().toLowerCase();
      cards.forEach(function(card){
        var techOk = state.tech === 'all' || (card.getAttribute('data-tech') || '').split(' ').indexOf(state.tech) > -1;
        var clientOk = state.client === 'all' || card.getAttribute('data-client') === state.client;
        var yearOk = state.year === 'all' || card.getAttribute('data-year') === state.year;
        var searchOk = !q || (card.getAttribute('data-search') || '').toLowerCase().indexOf(q) > -1;
        var show = techOk && clientOk && yearOk && searchOk;
        card.style.display = show ? '' : 'none';
        if(show) visible++;
      });
      if(noResults){ noResults.style.display = visible === 0 ? 'block' : 'none'; }
      if(resultsCount){ resultsCount.textContent = '// showing ' + visible + ' of ' + cards.length + ' projects'; }
    }

    document.querySelectorAll('.pill-filter').forEach(function(pill){
      pill.addEventListener('click', function(){
        var group = pill.getAttribute('data-group');
        var value = pill.getAttribute('data-value');
        state[group] = value;
        document.querySelectorAll('.pill-filter[data-group="' + group + '"]').forEach(function(p){
          p.classList.toggle('active', p === pill);
        });
        applyFilters();
      });
    });

    if(searchInput){
      searchInput.addEventListener('input', function(){
        state.q = searchInput.value;
        applyFilters();
      });
    }

    document.querySelectorAll('[data-expand]').forEach(function(btn){
      btn.addEventListener('click', function(){
        var card = btn.closest('.project-card');
        var opening = !card.classList.contains('expanded');
        card.classList.toggle('expanded');
        btn.firstChild.nodeValue = opening ? 'Hide case study ' : 'View case study ';
      });
    });

    applyFilters();

    // Pre-filter if arriving from clients.html with ?client=slug
    try{
      var params = new URLSearchParams(window.location.search);
      var clientParam = params.get('client');
      if(clientParam){
        var targetPill = document.querySelector('.pill-filter[data-group="client"][data-value="' + clientParam + '"]');
        if(targetPill){ targetPill.click(); }
      }
    }catch(e){}
  });
})();
