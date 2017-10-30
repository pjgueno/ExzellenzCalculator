      
    var map;
    var tiles;
    var heat;
    
    var matieres = [];
    var positions = [];
    var hochschulen = [];
    

    var hexahmtest = false;
    var options;
    var selector ='keine';
//    var hmhexafilter=[];

    var options;

    window.onload = function () {  
 
        
        
          
    d3.queue()
        .defer(d3.json,"data/positions.js")
        .defer(d3.json,"data/hochschulen.js")
        .defer(d3.json,"data/matieres.js")
        .awaitAll(ready);  
        
    
            map.on('moveend', function() { 
//        arraySum = [];

         
         console.log(hexahmtest);
         
       if(hexahmtest == true){hexagonheatmap.data(hmhexa);};    

});
        
        
        
    };

map = L.map('map').setView([50.859046 , 10.087890 ], 6);


tiles = L.tileLayer('https://{s}.tiles.madavi.de/{z}/{x}/{y}.png',{
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 18}).addTo(map);





function ready (error,data){
    
    positions = data[0];
    hochschulen = data[1];
    matieres = data[2];
    
    hmhexa = positions
    
    matieres.forEach(function(i){
        document.getElementById('tags').innerHTML += '<option value=\"'+i.label+'\">'    
        
    });
    
        
    
        if(hexahmtest == false){
                    hexahmtest = true;
                    hexagonheatmap = L.hexbinLayer(options).addTo(map);
                    hexagonheatmap.data(hmhexa);
            
                };  
    
};



function switcher (value){
    
    console.log(value);
    selector = value;
    
if(hexahmtest == true){hexagonheatmap.data(hmhexa);};    
    
};

      
    function reset() {        
    location.reload();
    };      
      
          
    function matiereSearch() {
        
            var options = document.getElementById("tags").options;
        
            var result = document.getElementById("tag").value;
        console.log(result);        
        
        for (i = 0; i < options.length; i++) {
            
        if(options[i].value == result ){
                
                filterRedraw (options[i].value);
                break;   
            };
            
            if (i == options.length){ hmhexa = positions;
                                    reload(hmhexa);
                                    };
            
        }; 
        
        
    };
        
        
        
        
    function filterRedraw (val){
        
        console.log('filterRedraw');
        
        console.log(positions);
        
        
        
        
        
                    
             var hmhexafilter = positions.filter(function(item){if(item.l.includes(val)){return item}});
            
            hmhexa = hmhexafilter;
        
        reload(hmhexafilter); 
            
     
        
        
        
//        
//        var filter = new Promise(function(resolve, reject) {
//            
//             hmhexafilter = positions.filter(function(item){if(item.l.includes(val)){return item}});
//            
//            resolve(hmhexafilter);
//            
//        });
//    
//   
//        filter.then(function(valeur){
//        hmhexa = hmhexafilter;
//        reload(hmhexafilter); 
//            
//        });
//        
      
};
        
        
        
function reload (data){
    hexagonheatmap.initialize(this.options);
    
    console.log(data);
        hexagonheatmap.data(data);    
    
};  
        
        