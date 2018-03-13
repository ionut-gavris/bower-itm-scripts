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
////////////////////////////////////////////////////////////////////////////////
/*
 * 
 */
 
 
 
 