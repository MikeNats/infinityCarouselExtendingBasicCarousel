/* 
------------------------------------------|
------------------------------------------|
Module: Basic Responsive Carousel.
Author: Michalis Tsougkranis.
Technique:[Augmenting Modules] OOP-Module-Pattern && Object literal .
Special Thenx to: GEORGE BARDIS
-------------------------------------------|
-------------------------------------------|
*/
var basicResposiveCarousel = (function($,window, document, undefined ) { 
  var rCarousel = {
      // Private
      viewPortWidth:parseInt($( window ).width()),
      nodeWidth :$('.carousel').width(),
      nodeHeight :$('.carousel').height(),
      carousel : $('.carousel'),
      carouselUl : $('.carousel > ul'),
      carouselUlLi : $('.carousel > ul li'),
      carouselUlLiFirts : $('.carousel > ul li:first'),
      carouselUlLiLast : $('.carousel > ul li:last'),
      animationVelocity : 1000,
      timeout: 0,

      trigerBasicFunctionality: function(){//Triger functionality
          rCarousel.clickPrev();
          rCarousel.clickNext();      
      },
      initializeBasicCarousel: function(){
        rCarousel.appendArrows(); //append navigation arrows
        rCarousel.setCarouselUlWidth();// set carousel Ul dimentions
        rCarousel.setCarouselLiDim();//set carousel Li dementions 
        rCarousel.setFirstLastClasses();//set First Last Class
        rCarousel.windowResize(); 
        rCarousel.clickPrev();
        rCarousel.clickNext();             
      },
      clickPrev: function(){
        $('.prev').click(function(){//Prev Click 
            rCarousel.executePrevSlide();
        });
      },
      windowResize: function(){
        $( window ).resize(function() { //recalculate dimentions and margins
          rCarousel.setCarouselLiDim();
          rCarousel.onResizeRecalculateUlMargin();      
        });
      },
      clickNext: function(){
         $('.next').click(function(){ //Next Click 
            rCarousel.executeNextSlide();
        });        
      },
      executeNextSlide: function(){
          if (rCarousel.timeout==0 ){ 
            if(!(rCarousel.isLast() == 'lastActive')){
              rCarousel.timeout = 1; 
              rCarousel.setNextActive();
              rCarousel.slideNext(); //slide Next
            }
          }
      },
      executePrevSlide: function(){
          if (rCarousel.timeout==0 ){
              if(!(rCarousel.isFirst() == 'firstActive')){
                rCarousel.timeout = 1; 
                rCarousel.setPrevActive();
                rCarousel.slidePrev(); //slide Prev
              } 
          }  
      },
      setCarouselLiDim : function(){ // set LI Width
        $('.carousel > ul li').css('width', rCarousel.carousel.width());
      },

      setCarouselUlWidth : function(){ // set UL Dimentions
        rCarousel.carouselUl.css('width',  rCarousel.nodeNumber() * 200+"%");
      },
      setFirstLastClasses : function(){//initialize class's
        rCarousel.carouselUlLiFirts.addClass('first');
        rCarousel.carouselUlLiFirts.addClass('active');
        rCarousel.carouselUlLiLast.addClass('last');
      },
      isLast: function(){
        if($('.last').hasClass('active'))
          {return  'lastActive';}
      },
      isFirst: function(){
        if($('.first').hasClass('active'))
          {return  'firstActive';}
      },      
      nodeNumber : function(){ // returns the number of list items
        var i=0;
        rCarousel.carouselUlLi.each(function(){
          i++;
        });
        return i;
      }, 
      appendArrows: function(){//appends navigation arrows
        rCarousel.carousel.append('<div class="nav-arrows"><ul><li class="prev">prev</li> <li class="next">next</li> </ul></div>');
      },
      slideNext : function(){// Slide Left
        rCarousel.carouselUl.animate({ marginLeft:(parseInt(rCarousel.carouselUl.css('marginLeft'))-parseInt($('.carousel > ul li').css('width')))},{duration: rCarousel.animationVelocity, complete:function(){ rCarousel.timeout = 0;}});
      },
      setNextActive: function(){ //set next active
        var activeNode = $('.carousel ul li.active');
        if(!activeNode.hasClass('last')){
            activeNode.removeClass('active').next().addClass('active');
            return 1;
        }
        return 0;
      },
      slidePrev : function(){// Slide Prev
        rCarousel.carouselUl.animate({ marginLeft:(parseInt(rCarousel.carouselUl.css('marginLeft'))+parseInt($('.carousel > ul li').css('width')))},{duration: rCarousel.animationVelocity, complete:function(){ rCarousel.timeout = 0;}});
      },
      setPrevActive: function(){ // set perv active
        var activeNode = $('.carousel ul li.active');
        if(!activeNode.hasClass('first')){
          activeNode.removeClass('active').prev().addClass('active');
            return 1;
        }
        return 0;
      },  
      onResizeRecalculateUlMargin : function(){//reset UL margin on window resize
        if(!$('.carousel ul li.first').hasClass('active')){
          rCarousel.carouselUl.css('marginLeft', - rCarousel.carousel.width()*rCarousel.returnNumerOfActiveNode());
     
        }       console.log(rCarousel.returnNumerOfActiveNode());
      },
      returnNumerOfActiveNode : function(){//return's the the nth active LI
        var n=0;
        $('.carousel > ul li').each(function(){   
        n++; 
        if($(this).hasClass('active')){     
             return false;
          }
        });
        return n-1;
      }
  }
  return rCarousel;
   
})( jQuery, window, document);

//RESPONSIVE IMPLEMENTATION

var infinity = (function(basicResposiveCarousel) { 
    // The below methos are been overide from the initial object basicResposiveCarousel
    //Private methos

    basicResposiveCarousel.setActiveNode = function(){
      $('.carousel > ul li:first-child').addClass('active');
    }
    basicResposiveCarousel.clickNext = function(){ 
         $('.next').click(function(){ //Next Click 
            basicResposiveCarousel.executeNextSlide();
        });        
    },
    basicResposiveCarousel.executeNextSlide = function(){
      if (basicResposiveCarousel.timeout==0 ){ 
        basicResposiveCarousel.timeout = 1; 
        basicResposiveCarousel.setNextActive();
        basicResposiveCarousel.slideNext(); //slide Next
      }
    },
    basicResposiveCarousel.setNextActive = function(){
      var activeNode = $('.carousel ul li.active');
      if(activeNode.is(':last-child')){
        basicResposiveCarousel.infinityNext();    
      }
      activeNode.removeClass('active').next().addClass('active');
    },
    basicResposiveCarousel.infinityNext = function(){
      basicResposiveCarousel.cloneFirst();
      basicResposiveCarousel.deletFirstNode();
      basicResposiveCarousel.setCarouselLiDim();
      basicResposiveCarousel.resetCarouselNextPosition();
    },
    basicResposiveCarousel.resetCarouselNextPosition = function(){
      var newMargin = parseInt($('.carousel > ul').css('marginLeft')) + (  parseInt($('.carousel > ul li').width()) );
      $('.carousel > ul').css('marginLeft',newMargin);
    },
    basicResposiveCarousel.cloneFirst = function(){
        basicResposiveCarousel.carouselUl.append('<li>'+ $('.carousel > ul li:first-child').html()+'</li>');
    },
    basicResposiveCarousel.deletFirstNode= function(){
      $('.carousel > ul li:first-child').remove();
    },
    basicResposiveCarousel.clickPrev = function(){ // method override
      $('.prev').click(function(){ //Next Click 
        basicResposiveCarousel.executePrevSlide();
      });        
    },
    basicResposiveCarousel.executePrevSlide = function(){
      if (basicResposiveCarousel.timeout==0 ){ 
        basicResposiveCarousel.timeout = 1; 
        basicResposiveCarousel.setPrevActive();
        basicResposiveCarousel.slidePrev(); //slide Next
      }
    },
    basicResposiveCarousel.setPrevActive = function(){
      var activeNode = $('.carousel ul li.active');
      if(activeNode.is(':first-child')){
        basicResposiveCarousel.infinityPrev();    
      }
      activeNode.removeClass('active').prev().addClass('active');
    },
    basicResposiveCarousel.infinityPrev = function(){
      basicResposiveCarousel.cloneLast();
      basicResposiveCarousel.deleteLastNode();
      basicResposiveCarousel.setCarouselLiDim();
      basicResposiveCarousel.resetCarouselPrevPosition();
    },
    basicResposiveCarousel.resetCarouselPrevPosition = function(){
      var newMargin = parseInt($('.carousel > ul').css('marginLeft')) - (  parseInt($('.carousel > ul li').width()) );
      $('.carousel > ul').css('marginLeft',newMargin);
    },
    basicResposiveCarousel.cloneLast = function(){
        basicResposiveCarousel.carouselUl.prepend('<li>'+ $('.carousel > ul li:last-child').html()+'</li>');
    },
    basicResposiveCarousel.deleteLastNode= function(){
      $('.carousel > ul li:last-child').remove();
    }

    return{ // Public Method
      initializeInfinityCarousel : function(){
        basicResposiveCarousel.appendArrows(); //append navigation arrows
        basicResposiveCarousel.setCarouselUlWidth();// set carousel Ul dimentions
        basicResposiveCarousel.setCarouselLiDim();//set carousel Li dementions 
        basicResposiveCarousel.windowResize(); 
        basicResposiveCarousel.setActiveNode();
        basicResposiveCarousel.clickPrev();
        basicResposiveCarousel.clickNext(); 
    },

  }    
})(basicResposiveCarousel || {});

 infinity.initializeInfinityCarousel(); 





