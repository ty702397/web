+( function(){
    'use strict' ;

    var fixedIco    =   document.querySelector( '#fixedIco' ),
        head        =   document.querySelector( '#head' ),
        closeBtn    =   document.querySelector( '#closeBtn' ),

        CLA_NAME    =   'active',
        timer       =   null ;

    head.addEventListener( 'click', function(){
        fixedIco.className = 'fixedIco ' + CLA_NAME ;
        closeBtn.className = 'closeBtn ' + CLA_NAME ;
    }, false ) ;
    
    closeBtn.addEventListener( 'click', function(){
        fixedIco.className = 'fixedIco' ;
        closeBtn.className = 'closeBtn' ;

    }, false ) ;


}() ) ;