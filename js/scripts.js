////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/*
 * Loader for website, when you have an Ajax that run slow you can put this on 
 * website so pleople will know they have to wait.
 * You need an image to run, set the name 'page-loader.gif' and put it in 
 * "../img". If you want another path/name for image, change the url destination
 * in the code from style.css( background: url('../img/page-loader.gif') ...)
 *
 * Example:
 *	- in HTML : 
 *		<div class="itm-loader"></div>
 *		
 *	- in SCRIPTS :
 *		$(window).load(function() {
 *			$(".itm-loader").fadeOut("slow");
 *		});
 *		
 *	- in CSS: 
 *		- take the code from style.css(/itm-scripts/style.css)
 */
	$(window).on("load", function () {
		$(".itm-loader").fadeOut("slow");
	});
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/*
 * Is used when you need a button, which clicked, will scroll to top.
 * After you include in the project the plugin files and you initializate the 
   function you need a specific class itm-scroll-to-top
 * Example:
   - in HTML :  
        <a href="#" class="itm-scroll-to-top">
            <i class="fa fa-angle-up"></i>
        </a>
   - in SCRIPTS : 
        $(document).ready(function(){		
            itmScrollToTop();
        });   
   - in CSS: 
		- take the code from style.css(/itm-scripts/style.css)
*/
function itmScrollToTop()
{
    //Check to see if the window is top if not then display button
    $(window).scroll(function()
    {
        if ($(this).scrollTop() > 100) 
        {
            $('.itm-scroll-to-top').fadeIn();
        } 
        else 
        {
            $('.itm-scroll-to-top').fadeOut();
        }
    });

    //Click event to scroll to top
    $('.itm-scroll-to-top').click(function()
    {
        $('html, body').animate({scrollTop : 0},800);
        return false;
    }); 
}
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/*
 * This script will add height to textarea
 * Example : 
   - In SCRIPTS: 
        $(document).ready(function(){		
            $("textarea").keyup(function(e){
                itmTextareaAutoHeight(this);
            });
        });
 */
function itmTextareaAutoHeight(element) {
    if (!$(element).prop('scrollTop')) {
        do {
            var b = $(element).prop('scrollHeight');
            var h = $(element).height();
            $(element).height(h - 5);
        }
        while (b && (b != $(element).prop('scrollHeight')));
    };
    $(element).height($(element).prop('scrollHeight') + 20);
}
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/*
 * Set a min-height to the content, so the footer can be always in bottom.
 * Example: 
   - in HTML:
        <div class="header">
            header
        </div>
        <div class="itm-content">
            content
        </div>
        <div class="footer">
            footer
        </div>
   - in SCRIPTS:
        $(document).ready(function(){		
            itmContentHeight({
                contentSelector: ".itm-content",
                headerSelector: "#header", //default value is header
                footerSelector: ".footer"  //default value is footer
            });
        });
        $(window).resize(function(){
            itmContentHeight({
                contentSelector: ".itm-content",
                headerSelector: "#header", //default value is header
                footerSelector: ".footer"  //default value is footer
            });
        });
 */
function itmContentHeight(options)
{
    var contentSelector = options.contentSelector;
    var headerSelector = options.headerSelector || 'header';
    var footerSelector = options.footerSelector || 'footer';
    
    var window_height = $(window).height();
    var header_height = $(headerSelector).height();
    var footer_height = $(footerSelector).height();
    var min_height = window_height - header_height - footer_height;
    $(contentSelector).css('min-height',min_height);    
}
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/*
 * Useful when you want to hide and/or show large amount of content
 * When you call the function itm_accordion, selector must have the class/id 
   of parent div (ex: #itm-accordion)  
 * Example:
   - in HTML :  
        <div id="itm-accordion" class="panel-group text-align-left">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">IT Maniax Title 1</h4>
                    <a class="glyphicon glyphicon-minus" href="#collapse1" data-toggle="collapse" data-parent="#accordion">&zwnj;</a>
                </div>
                <div id="collapse1" class="panel-collapse collapse in">
                    <div class="panel-body">
                        <p>Content 1</p>
                        <p>Content 2</p>
                        <p>Content 3</p>
                        <p>Content 4</p>
                    </div>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">IT Maniax Title 2</h4>
                    <a class="glyphicon glyphicon-plus" href="#collapse2" data-toggle="collapse" data-parent="#accordion">&zwnj;</a>
                </div>
                <div id="collapse2" class="panel-collapse collapse">
                    <div class="panel-body">
                        <p>IT Maniax  Content 1</p>
                    </div>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">IT Maniax Title 3</h4>
                    <a class="glyphicon glyphicon-plus" href="#collapse3" data-toggle="collapse" data-parent="#accordion">&zwnj;</a>
                </div>
                <div id="collapse3" class="panel-collapse collapse">
                    <div class="panel-body">
                        <p>ITM Content 1</p>
                    </div>
                </div>
            </div>    
        </div>
   - in SCRIPTS : 
        $(document).ready(function(){		
            itmAccordion({
                selector: "#itm-accordion"
            });
        });   
 */
function itmAccordion(options)
{
    var selector = options.selector;
    
    $(selector).on("click", ".panel-heading a", function()
    {
        $(selector+" .panel").each(function()
        {
            $(this).find(".panel-heading a").removeClass("itm-js-active");
        });

        if($(this).hasClass("glyphicon-plus"))
        {
            $(this).removeClass("glyphicon-plus").addClass("glyphicon-minus").addClass("itm-js-active");
        }
        else
        {
            $(this).removeClass("glyphicon-minus").removeClass("itm-js-active").addClass("glyphicon-plus");
        }

        $(selector+" .panel").each(function()
        {
            if($(this).find(".panel-heading a").hasClass("itm-js-active"))
            {
                $(this).find(".panel-collapse.in").removeClass("in");
            }
            else
            {
                $(this).find(".panel-heading a").removeClass("glyphicon-minus").addClass("glyphicon-plus");
                $(this).find(".panel-collapse.in").removeClass("in");
            }                      
        });
    });  
}
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/*
 * Add an selector and will automatically add itm-js-left/right-column to the 
   first and second child 
 * Classes .first and .second will have an additional class (itm-js-left-column/
   itm-js-right-column )
 * Example:
   - in HTML :  
        <div class="item">
            <div class="first">
                <p> Content ITM </p>
            </div>
            <div class="second">
                <p> Content ITM </p>
            </div>
        </div>
   - in SCRIPTS : 
        $(document).ready(function(){
            itmContentOutOfBox({
                selector: '.item',
                maxWidth: 1400,
                leftColumnWidth: '40%',
                rightColumnWidth: '60%',
                responsivePadding: '30px',
            });
        });  
 */
function itmContentOutOfBox(options)
{
    var window_width = $(window).width();
  
    //LEFT COLUMN
    $(options.selector + '>:nth-child(1)').addClass('itm-js-left-column');
    $('.itm-js-left-column').css({
            'width':options.leftColumnWidth
        });

    //RIGHT COLUMN
    $(options.selector + '>:nth-child(2)').addClass('itm-js-right-column');        
    $('.itm-js-right-column').css({
            'width':options.rightColumnWidth
        });

        $('.itm-js-left-column, .itm-js-right-column').css({
            'display': 'inline-block',
            'float': 'left',
            'height': '100%'
        });

    if(window_width > options.maxWidth)
    {
        var padding = (window_width - options.maxWidth)/2;
        
        $('.itm-js-left-column').css({
                'padding-left':padding,
            });
        
        $('.itm-js-right-column').css({
                'padding-right':padding,
            });
    }
    else
    {
        $('.itm-js-left-column').css({
                'padding-left':options.responsivePadding,
            });
        
        $('.itm-js-right-column').css({
                'padding-right':options.responsivePadding,
            });
    }
}
////////////////////////////////////////////////////////////////////////////////
//////////////////////// ITM ACCORDION MENU ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/*
 *  Ex:

    $(document).on('ready', function(){
        itmAccordionMenu({
            menu_selector: "#menu_sidebar_menu",
            submenu_selector: ".sub-menu",
            current_menu_item_selector: ".current-menu-item",
            fa_plus_icon:"fa-plus-circle",
            fa_minus_icon:"fa-minus-circle",
            has_children_selector:".menu-item-has-children",
        });
    });
    
    <ul id="menu-sidebar-menu" class="menu">
        <li id="menu-item-128" class="menu-item menu-item-type-post_type menu-item-object-page page-item-120 current_page_item menu-item-has-children menu-item-128"><a href="http://roeffe.itmaniax.eu/usi-industriale-sectionale/">Usi industriale sectionale</a>
            <ul class="sub-menu">
                <li id="menu-item-227" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-227"><a href="http://roeffe.itmaniax.eu/usi-industriale-ba-se/">Usi industriale BA SE+</a></li>
                <li id="menu-item-226" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-226"><a href="http://roeffe.itmaniax.eu/usi-industriale-din-aluminiu-alu/">Usi industriale din aluminiu ALU+</a></li>
                <li id="menu-item-225" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-225"><a href="http://roeffe.itmaniax.eu/usi-industriale-alm/">Usi industriale ALM+</a></li>
                <li id="menu-item-224" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-224"><a href="http://roeffe.itmaniax.eu/automatizari-usi-industriale/">Automatizari usi industriale</a></li>
                <li id="menu-item-223" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-223"><a href="http://roeffe.itmaniax.eu/sisteme-de-sine/">Sisteme de sine</a></li>
                <li id="menu-item-222" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-222"><a href="http://roeffe.itmaniax.eu/accesorii/">Accesorii</a></li>
                <li id="menu-item-221" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-221"><a href="http://roeffe.itmaniax.eu/usi-de-acces/">Usi de acces</a>
                <ul class="sub-menu">
                    <li id="menu-item-233" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-233  page_item"><a href="http://roeffe.itmaniax.eu/usi-pietonale-incorporate/">Usi pietonale incorporate</a></li>
                    <li id="menu-item-232" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-232"><a href="http://roeffe.itmaniax.eu/usi-de-acces-laterale__trashed/">Usi de acces laterale</a></li>
                </ul>
            </li>
                <li id="menu-item-220" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-220"><a href="http://roeffe.itmaniax.eu/burdufuri-de-izolare/">Burdufuri de izolare</a></li>
            </ul>
        </li>
        <li id="menu-item-127" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-127"><a href="http://roeffe.itmaniax.eu/grilaje-metalice-si-usi-rulou/">Grilaje metalice si usi rulou</a></li>
        <li id="menu-item-126" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-126"><a href="http://roeffe.itmaniax.eu/usi-rapide/">Usi rapide</a></li>
        <li id="menu-item-156" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-156"><a href="http://roeffe.itmaniax.eu/usi-de-sticla-si-sisteme-de-sticla/">Usi de sticla si sisteme de sticla</a></li>
        <li id="menu-item-157" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-157"><a href="http://roeffe.itmaniax.eu/control-acces/">Control acces</a>
        <ul class="sub-menu">
            <li id="menu-item-782" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-782"><a href="http://roeffe.itmaniax.eu/control-acces/contact-acces-test/">contact-acces-test</a></li>
        </ul>
        </li>
        <li id="menu-item-158" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-158"><a href="http://roeffe.itmaniax.eu/fatade-cladiri-sticla-si-bond/">Fatade cladiri – sticla si bond</a></li>
        <li id="menu-item-159" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-159"><a href="http://roeffe.itmaniax.eu/usi-metalice-multifunctionale/">Usi metalice multifunctionale</a></li>
        <li id="menu-item-160" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-160"><a href="http://roeffe.itmaniax.eu/rulouri-exterioare-aluminiu/">Rulouri exterioare aluminiu</a></li>
        <li id="menu-item-161" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-161"><a href="http://roeffe.itmaniax.eu/automatizari-porti/">Automatizari porti</a></li>
        <li id="menu-item-162" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-162"><a href="http://roeffe.itmaniax.eu/usi-de-hangar/">Usi de hangar</a></li>
        <li id="menu-item-163" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-163"><a href="http://roeffe.itmaniax.eu/usi-pentru-industria-alimentara/">Usi pentru industria alimentara</a></li>
        <li id="menu-item-164" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-164"><a href="http://roeffe.itmaniax.eu/usi-pentru-sectorul-medical/">Usi pentru sectorul medical</a></li>
        <li id="menu-item-165" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-165"><a href="http://roeffe.itmaniax.eu/usi-antifonice-de-mari-dimensiuni/">Usi antifonice de mari dimensiuni</a></li>
    </ul>
    
    !NOTE:      menu_selector: The main menu selector.
                sub-menu: The sub-menu selector.
                current_menu_item_selector: current option selector.
                fa_plus_icon: Font-awesome class for plus icon.
                fa_minus_icon: Font-awesome class for minus icon.
                has_children_selector: A selector for those elements that have children.
 */

function itmAccordionMenu(options)
{
    //select the main menu
    var menuSelector = $(options.menu_selector);

    //hide all submenus
    $(options.submenu_selector).hide();

    //show all submenus above the current menu option
    $(options.current_menu_item_selector).parents(options.submenu_selector).show();

    //add plus icon to all menu options that have children
    $(options.has_children_selector).children('a').after($('<i class="fa itm-plus-circle ' + options.fa_plus_icon + '" aria-hidden="true"></i>'));

    //handle click event for plus icons
    $('.itm-plus-circle').click(function(){
        //if it has plus icon, show submenu
        if ($(this).hasClass(options.fa_plus_icon))
         {
            //hides all submenus from the same level
            $(this).parent().siblings(options.has_children_selector).children(options.submenu_selector).hide();

            //makes the icon from submenus from the same level, to be minus icon
            $(this).parent().siblings(options.has_children_selector).children('.itm-plus-circle').removeClass(options.fa_minus_icon).addClass(options.fa_plus_icon);

            //* show sub-menu when the plus-icon is clicked
            $(this).siblings(options.submenu_selector).show();

            //* show minus icon
            $(this).removeClass(options.fa_plus_icon).addClass(options.fa_minus_icon);
        }
        //if it has minus icon, hide submenu
        else
        {
            //* hide sub-menu
            $(this).siblings(options.submenu_selector).hide();
            //* show plus icon
            $(this).removeClass(options.fa_minus_icon).addClass(options.fa_plus_icon);
        }
    });
}
 
////////////////////////////////////////////////////////////////////////////////
//////////////////////// ITM BXSLIDER //////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/* You need the bxslider plugin to use this function
 *
 * Ex:
 
    <script>
        $(document).ready(function()
        {
            itmBxslider({
                selector: '#bxslider-homepage-teasers',
                showBxsliderForWidth:
                    {
                        condition: "smallerThan", //smallerThan,biggerThan
                        width:768,
                    },
                bxsliderOptions:
                    {
                        speed: 1200, //all bxslider library options
                    },
            });
        });
    </script>
 
    <div id="homepage-section-3">
            <div class="container">
                <h2 class="title">Totul e gata in 4 pasi</h2>
                <ul id="bxslider-homepage-teasers" class="row">               
                    <li class="col-md-3 col-sm-6 col-xs-12 text-center">
                        <p><i class="fa fa-folder-open icon-font" aria-hidden="true"></i></p>
                        <h3>Pasul 1</h3>
                        <p>Gaseste tipul de asigurare de 
                            care ai nevoie</p>
                    </li>
                    <li class="col-md-3 col-sm-6 col-xs-12 text-center ">
                        <p><i class="fa fa-thumbs-o-up icon-font" aria-hidden="true">    </i></p>
                         <h3>Pasul 2</h3>
                        <p>Completeaza rapid toate datele necesare in formularul asigurarii dorite</p>
                    </li>
                    <li class="col-md-3 col-sm-6 col-xs-12 text-center ">
                        <p><i class="fa fa-check-square-o icon-font" aria-hidden="true"></i></p>
                        <h3>Pasul 3</h3>
                        <p>Revenim în maxim 24h pe email cu cele mai avantajoase oferte
                        </p>
                    </li>
                    <li class="col-md-3 col-sm-6 col-xs-12 text-center ">
                        <p><i class="fa fa-trophy icon-font" aria-hidden="true"></i></p>
                        <h3>Pasul 4</h3>
                        <p>Platesti online direct la 
                            asiguratorul ales</p>
                    </li>
                </ul>
            </div>
        </div>
 */
 
function itmBxslider(options)
{
    var slider = {};
    var uniqId = Date.now();
    
    $(document).on('ready', function()
    {
        if(itmCheckCondition(options))
        {
            slider[uniqId] = $(options.selector).bxSlider(options.bxsliderOptions);            
        }
    });
    $(window).resize( function()
    {
        if(itmCheckCondition(options))
        {
            //if bxslider is not initialized => iniatialized it NOW
            if(!$(options.selector).parent().hasClass('bx-viewport'))
            {
                slider[uniqId] = $(options.selector).bxSlider(options.bxsliderOptions);   
            }
        }
        else
        {
            //if bxslider is already initialized => delete it
            if($(options.selector).parent().hasClass('bx-viewport'))
            {
                slider[uniqId].destroySlider();
            }
        }
    });
}

function itmCheckCondition(options)
{
    var operation = options.showBxsliderForWidth.condition.toLowerCase();
    var condition;
    
    if(operation == 'smallerthan')
    {
        condition = $(window).width() < options.showBxsliderForWidth.width;
    }
    else
    {
        condition = $(window).width() > options.showBxsliderForWidth.width;
    }
    return condition;
}

////////////////////////////////////////////////////////////////////////////////
//////////////////////// ITM FLIPCLOCK /////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/* You need the flipclock plugin to use this function
 *
 * Ex:
 *
 *  <script>
        $(document).ready(function() 
        {
            itmInitFlipClock({
                selector: "#time-left-clock",
                finalDatetime: "December 01, 2018 00:00:00",
            });
        });
    </script>
 *
 *  <div id="time-left-clock"></div>
 */

function itmInitFlipClock(options)
{
    var clockSelector = $(options.selector);
    var secondsLeft = getSecondsLeft(options.finalDatetime);
    var countDown = true;
    var theMessage = ''; 

    if(secondsLeft < 0)
    {     
        countDown = false;       
    }          

    var clock = clockSelector.FlipClock(unsignedSecondsLeft(secondsLeft), 
         {
             clockFace: 'DailyCounter',
             countdown: countDown
         });

    clockSelector.before(theMessage);       
}

function getSecondsLeft(finalDatetime)
{
    var currentDate = new Date($.now());       
    var targetDate = new Date(finalDatetime);
    var difference = targetDate.getTime() - currentDate.getTime();
    var secondsLeft = 0;
    
    //DIFFERENCE is calculated in miliseconds
    secondsLeft = Math.ceil(difference / 1000);
    return secondsLeft;
}

function unsignedSecondsLeft(seconds)
{
    return Math.abs(seconds);
}

////////////////////////////////////////////////////////////////////////////////
//////////////////////// ITM MATRIX ////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/* 
 * Ex:
 *
 *  <script>
        $(document).ready(function() 
        {
            itmMatrixEffect({
                color: "white", //white, #0F0, random, default
                charset: "binary", //alphanumeric, numeric, alpha, binary, default
                speed: "slow", //fast, normal, slow, default
                opacity: "", // 0,0 -> 1,0
            });
        });
    </script>
 *
 *  <canvas id="itmMatrix" width="1000px" height="700px"></canvas>
 */

function itmMatrixEffect(options)
{
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    $("canvas#itmMatrix").css("opacity", options.opacity || "0.5");
    $("canvas#itmMatrix").css("height", $(window).height());
    $("canvas#itmMatrix").css("width", $(window).width());
    
    var s=window.screen;
    var width = itmMatrix.width=s.width;
    var height = itmMatrix.height;
    var yPositions = Array(300).join(0).split('');
    var ctx=itmMatrix.getContext('2d');
 
    var draw = function () 
    {
        ////////////////////////////////////////////////////////////////////////
        ctx.fillStyle='rgba(0,0,0,.05)';
        ctx.fillRect(0,0,width,height);
        ctx.font = '10pt Georgia';
        ////////////////////////////////////////////////////////////////////////
        var optionColor = options.color || 'default';
        
        if(optionColor == "default")
        {
            ctx.fillStyle='#0F0';
        }            
        else if(optionColor == "random")
        {
            ctx.fillStyle='#'+Math.floor((Math.random()*10))+Math.floor((Math.random()*10))+Math.floor((Math.random()*10));
        }
        else
        {
            ctx.fillStyle= optionColor;            
        }
        ////////////////////////////////////////////////////////////////////////
        var optionCharset = options.charset || 'default';
        ////////////////////////////////////////////////////////////////////////        
        yPositions.map(function(y, index)
        {
            switch(optionCharset)
            {
                case "alphanumeric": 
                    text = String.fromCharCode(1e2+Math.random()*33);
                    break;
                case "alpha": 
                    if(Math.floor((Math.random()*2)) == 1)
                    {
                        text = String.fromCharCode(Math.floor((Math.random()*26)+65));
                    }
                    else
                    {
                        text = String.fromCharCode(Math.floor((Math.random()*26)+97));                        
                    }
                    break;
                case "numeric": 
                    text = Math.floor((Math.random()*10));
                    break;
                case "binary": 
                    text = Math.floor((Math.random() * 2));
                    break;
                default: 
                    text = String.fromCharCode(1e2+Math.random()*33);
                    break;
            }
            
            x = (index * 10)+10;
            itmMatrix.getContext('2d').fillText(text, x, y);
          
            if(y > 100 + Math.random()*1e4)
            {
                yPositions[index]=0;
            }
            else
            {
                yPositions[index] = y + 10;
            }
        });
    };

    var optionSpeed = options.speed || 'default';
    var delayValue;
    switch(optionSpeed)
    {
        case "fast": 
            delayValue = 15;
            break;
        case "normal": 
            delayValue = 33;
            break;
        case "slow": 
            delayValue = 60;
            break;
        default: 
            delayValue = 33;
            break;
    }
    
    //START INFINIT RUNNING MATRIX
    if(typeof Game_Interval != "undefined") 
        clearInterval(Game_Interval);      
    
    Game_Interval = setInterval(draw, delayValue);
}