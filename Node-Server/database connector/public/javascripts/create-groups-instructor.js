function createGroups() {
      console.log("Test");
}


// Just testing something here
(function(d) {

      var c, groups = d.querySelectorAll('.hide');
      d.querySelector('#form').reset();
   
      d.querySelector('#number-of-groups').addEventListener('change',
         function() {
           for (c = 0; c < groups.length; c++) {
                  groups[c].classList.add('hide');
            }
           for (c = 0; c < this.value; c++) {
                 groups[c].classList.remove('hide');
            }
         }, false);
    }(document));
    