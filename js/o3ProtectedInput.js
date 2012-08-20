/* 
 * O3 Protected Input JQuery Plugin
 * Ozone Solutions, Inc.
 * Created Aug 10, 2012
 * Author: Daniel Mahaffy
 * Url: http://www.ozonesolutions.com/programming/
 */

/**
Copyright (c) 2012 Daniel Mahaffy, Ozone Solutions Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy 
of this software and associated documentation files (the "Software"), to deal 
in the Software without restriction, including without limitation the rights 
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
SOFTWARE.
*/

(function($){
    $.fn.o3ProtectedInput = function(options) {        
        
        var settings = {
            linkText:'Click To Edit',
            backgroundImage: '../images/stripe.png',
            backgroundColor: 'white'
        };
        if (options) {
            $.extend(settings, options);
        }
        
        return this.each(function(){            
            var input = $(this);
            input.attr('readonly','readonly');
            input.attr('tabindex','-1');
            var div = $('<div class="hardToEditDiv" ></div>');
            var div2 = $('<div class="hardToEditDiv" ></div>');
            var link = $('<a class="javascriptLink">'+settings.linkText+'</a>');
            link.click(function(){
                div.remove();
                div2.remove();
                input.removeAttr('readonly');
                input.removeAttr('tabindex');
            })
            div2.append(link);
            link.css({
                padding: '2px',
                borderRadius: '4px',
                backgroundColor: '#dedede'
            });
            div.css({
                display: 'none',
                position: 'absolute',
                backgroundColor: settings.backgroundColor,
                backgroundImage: "url('"+settings.backgroundImage+"')",
                opacity: .8,
                zIndex: 1,
                textAlign: 'center'
            });
            div2.css({
                    display: 'none',
                    position: 'absolute',
                    zIndex: 2,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '10px',
                    padding: '4px',
                    fontFamily: 'Verdana,Arial,sans-serif'
            });
            function positionDivs(){
                //These settings are made later just in case post load changes happen to the inputs.
                div.css({
                    top:input.position().top,
                    left: input.position().left,
                    marginTop: input.css('marginTop'),
                    marginBottom: input.css('marginBottom'),
                    marginLeft: input.css('marginLeft'),
                    marginRight: input.css('marginRight'),
                    width: input.outerWidth(),
                    height: input.outerHeight()
                });
                div2.css({
                    top: input.position().top,
                    left: input.position().left,
                    marginTop: input.css('marginTop'),
                    marginBottom: input.css('marginBottom'),
                    marginLeft: input.css('marginLeft'),
                    marginRight: input.css('marginRight'),
                    width: input.outerWidth(),
                    height: input.outerHeight()
                });
            }
            $(this).parent().append(div);
            $(this).parent().append(div2);
            $(this).off('mouseover.hardToEdit').on('mouseover.hardToEdit',function(){
                positionDivs();
                div.show();
                div2.show();
            });
            $(div).off('mouseout.hardToEdit').on('mouseout.hardToEdit',function(){
                div.hide();
                div2.hide();//div needs to be moved so that it fully covers the input.  Currently this is causing problems if you move off the top of the div.
            });
            $(div2).off('mouseout.hardToEdit').on('mouseout.hardToEdit',function(){
                div.hide();
                div2.hide();//div needs to be moved so that it fully covers the input.  Currently this is causing problems if you move off the top of the div.
            });
        });
    }
})(jQuery);