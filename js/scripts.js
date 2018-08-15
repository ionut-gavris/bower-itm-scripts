////////////////////////////////////////////////////////////////////////////////
$(window).on("load", function () {
    $(".itm-loader").fadeOut("slow");
});
////////////////////////////////////////////////////////////////////////////////
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